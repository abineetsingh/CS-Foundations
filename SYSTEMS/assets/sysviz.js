/* sysviz.js — reusable request-flow animator for SYSTEMS lessons.
 *
 * Draws labeled boxes (client, LB, servers, DB, cache, queue, …) in one or
 * two rows and plays a sequence of steps. Each step either animates a packet
 * from one box to another, or highlights one or more boxes, with a caption.
 *
 * Usage in a lesson:
 *   <div id="flow"></div>
 *   <script src="../assets/sysviz.js"></script>
 *   <script>
 *     renderFlow("flow", {
 *       nodes: [
 *         { id: "client", label: "Browser", sub: "the client" },        // row 0
 *         { id: "lb",     label: "Load balancer" },
 *         { id: "s1",     label: "Server A", row: 1 },                  // row 1 = lower
 *         { id: "s2",     label: "Server B", row: 1 },
 *       ],
 *       links: [["client","lb"], ["lb","s1"], ["lb","s2"]],  // optional; default =
 *                                                            // adjacent row-0 pairs
 *       steps: [
 *         { from: "client", to: "lb", packet: "GET /", caption: "…" },
 *         { at: "lb", caption: "…" },              // highlight one box
 *         { at: ["s1","s2"], caption: "…" },       // highlight several
 *       ],
 *     });
 *   </script>
 *
 * Controls: reset / back / play-pause / next. Extend this file for new needs
 * rather than inlining engine code in lessons.
 */

function renderFlow(containerId, spec) {
  var SVGNS = "http://www.w3.org/2000/svg";
  var W = 660, BOX_W = 138, BOX_H = 58;
  var container = document.getElementById(containerId);
  container.classList.add("sysviz");

  var nodes = spec.nodes, steps = spec.steps;
  var rows = [[], []];
  nodes.forEach(function (n) { rows[n.row === 1 ? 1 : 0].push(n); });
  var twoRows = rows[1].length > 0;
  var H = twoRows ? 250 : 150;
  var rowY = twoRows ? [62, 188] : [H / 2, H / 2];

  var centers = {};
  rows.forEach(function (rowNodes, r) {
    var span = W / Math.max(rowNodes.length, 1);
    rowNodes.forEach(function (n, i) {
      centers[n.id] = { x: span * (i + 0.5), y: rowY[r] };
    });
  });

  var svg = document.createElementNS(SVGNS, "svg");
  svg.setAttribute("viewBox", "0 0 " + W + " " + H);
  container.appendChild(svg);

  // Point on the boundary of the box at `c`, in the direction of point p.
  function edgePoint(c, p) {
    var dx = p.x - c.x, dy = p.y - c.y;
    var len = Math.sqrt(dx * dx + dy * dy) || 1;
    var tx = dx !== 0 ? (BOX_W / 2) / Math.abs(dx) : Infinity;
    var ty = dy !== 0 ? (BOX_H / 2) / Math.abs(dy) : Infinity;
    var t = Math.min(tx, ty, 1);
    return { x: c.x + dx * t, y: c.y + dy * t };
  }

  // Faint tracks. Default: adjacent row-0 pairs (backward compatible).
  var links = spec.links;
  if (!links) {
    links = [];
    for (var i = 0; i < rows[0].length - 1; i++) {
      links.push([rows[0][i].id, rows[0][i + 1].id]);
    }
  }
  links.forEach(function (pair) {
    var a = centers[pair[0]], b = centers[pair[1]];
    var pa = edgePoint(a, b), pb = edgePoint(b, a);
    var track = document.createElementNS(SVGNS, "line");
    track.setAttribute("x1", pa.x); track.setAttribute("y1", pa.y);
    track.setAttribute("x2", pb.x); track.setAttribute("y2", pb.y);
    track.setAttribute("class", "sysviz-track");
    svg.appendChild(track);
  });

  var boxEls = {};
  nodes.forEach(function (n) {
    var c = centers[n.id];
    var g = document.createElementNS(SVGNS, "g");
    var rect = document.createElementNS(SVGNS, "rect");
    rect.setAttribute("x", c.x - BOX_W / 2); rect.setAttribute("y", c.y - BOX_H / 2);
    rect.setAttribute("width", BOX_W); rect.setAttribute("height", BOX_H);
    rect.setAttribute("rx", 8);
    rect.setAttribute("class", "sysviz-box");
    g.appendChild(rect);
    var label = document.createElementNS(SVGNS, "text");
    label.setAttribute("x", c.x); label.setAttribute("y", n.sub ? c.y - 2 : c.y + 5);
    label.setAttribute("class", "sysviz-label");
    label.textContent = n.label;
    g.appendChild(label);
    if (n.sub) {
      var sub = document.createElementNS(SVGNS, "text");
      sub.setAttribute("x", c.x); sub.setAttribute("y", c.y + 16);
      sub.setAttribute("class", "sysviz-sub");
      sub.textContent = n.sub;
      g.appendChild(sub);
    }
    svg.appendChild(g);
    boxEls[n.id] = rect;
  });

  // Packet: a dot with a label, shown only mid-step.
  var packetG = document.createElementNS(SVGNS, "g");
  packetG.setAttribute("visibility", "hidden");
  var dot = document.createElementNS(SVGNS, "circle");
  dot.setAttribute("r", 7);
  dot.setAttribute("class", "sysviz-dot");
  packetG.appendChild(dot);
  var packetLabel = document.createElementNS(SVGNS, "text");
  packetLabel.setAttribute("class", "sysviz-packet-label");
  packetLabel.setAttribute("y", -14);
  packetLabel.setAttribute("x", 0);
  packetG.appendChild(packetLabel);
  svg.appendChild(packetG);

  // Controls + caption.
  var controls = document.createElement("div");
  controls.className = "sysviz-controls no-print";
  var btnReset = mkBtn("⟲ Reset"), btnBack = mkBtn("◀ Back"),
      btnPlay = mkBtn("▶ Play"), btnNext = mkBtn("Next ▶");
  var counter = document.createElement("span");
  counter.className = "sysviz-counter";
  [btnReset, btnBack, btnPlay, btnNext].forEach(function (b) { controls.appendChild(b); });
  controls.appendChild(counter);
  container.appendChild(controls);
  var caption = document.createElement("div");
  caption.className = "sysviz-caption";
  container.appendChild(caption);

  function mkBtn(txt) {
    var b = document.createElement("button");
    b.type = "button"; b.textContent = txt;
    return b;
  }

  var current = -1;       // index of last completed step; -1 = before start
  var playing = false, animFrame = null, playTimer = null;

  function clearHighlights() {
    Object.keys(boxEls).forEach(function (id) {
      boxEls[id].classList.remove("sysviz-box-active");
    });
  }

  function highlight(ids) {
    (Array.isArray(ids) ? ids : [ids]).forEach(function (id) {
      boxEls[id].classList.add("sysviz-box-active");
    });
  }

  function setCaption() {
    if (current < 0) {
      caption.textContent = "Press ▶ Play (or Next) to follow one request through the system.";
      counter.textContent = "";
    } else {
      caption.textContent = steps[current].caption;
      counter.textContent = "Step " + (current + 1) + " of " + steps.length;
    }
  }

  function movePacket(x, y) {
    packetG.setAttribute("transform", "translate(" + x + "," + y + ")");
  }

  // Show step i. If animate, fly the packet; else snap to its end state.
  function showStep(i, animate, done) {
    cancelAnim();
    clearHighlights();
    current = i;
    setCaption();
    if (i < 0) { packetG.setAttribute("visibility", "hidden"); if (done) done(); return; }
    var s = steps[i];
    if (s.at) {
      packetG.setAttribute("visibility", "hidden");
      highlight(s.at);
      if (done) done();
      return;
    }
    var a = centers[s.from], b = centers[s.to];
    highlight([s.from, s.to]);
    packetLabel.textContent = s.packet || "";
    packetG.setAttribute("visibility", "visible");
    var rest = { x: b.x, y: b.y - BOX_H / 2 - 12 };
    if (!animate) { movePacket(rest.x, rest.y); if (done) done(); return; }
    var p0 = edgePoint(a, b), p1 = edgePoint(b, a);
    var t0 = null, DUR = 700;
    function tick(ts) {
      if (t0 === null) t0 = ts;
      var t = Math.min((ts - t0) / DUR, 1);
      var ease = t * (2 - t); // ease-out
      movePacket(p0.x + (p1.x - p0.x) * ease, p0.y + (p1.y - p0.y) * ease);
      if (t < 1) { animFrame = requestAnimationFrame(tick); }
      else {
        movePacket(rest.x, rest.y);
        animFrame = null;
        if (done) done();
      }
    }
    movePacket(p0.x, p0.y);
    animFrame = requestAnimationFrame(tick);
  }

  function cancelAnim() {
    if (animFrame) { cancelAnimationFrame(animFrame); animFrame = null; }
    if (playTimer) { clearTimeout(playTimer); playTimer = null; }
  }

  function stopPlaying() {
    playing = false;
    btnPlay.textContent = "▶ Play";
    cancelAnim();
  }

  function playLoop() {
    if (!playing) return;
    if (current >= steps.length - 1) { stopPlaying(); return; }
    showStep(current + 1, true, function () {
      playTimer = setTimeout(playLoop, 1100);
    });
  }

  btnNext.onclick = function () {
    stopPlaying();
    if (current < steps.length - 1) showStep(current + 1, true);
  };
  btnBack.onclick = function () {
    stopPlaying();
    if (current > -1) showStep(current - 1, false);
  };
  btnReset.onclick = function () { stopPlaying(); showStep(-1, false); };
  btnPlay.onclick = function () {
    if (playing) { stopPlaying(); return; }
    if (current >= steps.length - 1) current = -1;
    playing = true;
    btnPlay.textContent = "⏸ Pause";
    playLoop();
  };

  showStep(-1, false);
}
