/* Step-through security data-flow widget. */
function renderSecurityFlow(containerId, config) {
  const root = document.getElementById(containerId);
  root.classList.add("secviz");

  const stage = document.createElement("div");
  stage.className = "secviz-stage";
  const boundary = document.createElement("div");
  boundary.className = "secviz-boundary";
  const boundaryLabel = document.createElement("span");
  boundaryLabel.textContent = config.boundary || "trust boundary";
  boundary.appendChild(boundaryLabel);
  stage.appendChild(boundary);

  const arrow = document.createElement("div");
  arrow.className = "secviz-arrow";
  stage.appendChild(arrow);

  const nodes = document.createElement("div");
  nodes.className = "secviz-nodes";
  config.nodes.forEach(function (node) {
    const element = document.createElement("div");
    element.className = "secviz-node";
    element.dataset.node = node.id;
    const title = document.createElement("strong");
    title.textContent = node.label;
    const detail = document.createElement("small");
    detail.textContent = node.detail;
    element.appendChild(title);
    element.appendChild(detail);
    nodes.appendChild(element);
  });
  stage.appendChild(nodes);

  const packet = document.createElement("div");
  packet.className = "secviz-packet";
  stage.appendChild(packet);
  root.appendChild(stage);

  const caption = document.createElement("p");
  caption.className = "secviz-caption";
  root.appendChild(caption);

  const controls = document.createElement("div");
  controls.className = "secviz-controls";
  const back = document.createElement("button");
  back.textContent = "← Back";
  const progress = document.createElement("span");
  progress.className = "secviz-progress";
  const next = document.createElement("button");
  next.textContent = "Next →";
  controls.appendChild(back);
  controls.appendChild(progress);
  controls.appendChild(next);
  root.appendChild(controls);

  let index = 0;
  function draw() {
    const step = config.steps[index];
    Array.prototype.forEach.call(nodes.children, function (node) {
      node.classList.toggle("active", node.dataset.node === step.at);
      node.classList.toggle("violated", step.violated === node.dataset.node);
    });
    packet.textContent = step.packet;
    packet.className = "secviz-packet " + (step.position || "") + (step.attack ? " attack" : "");
    caption.textContent = step.caption;
    progress.textContent = "Step " + (index + 1) + " of " + config.steps.length;
    back.disabled = index === 0;
    next.disabled = index === config.steps.length - 1;
  }

  back.addEventListener("click", function () { if (index > 0) { index -= 1; draw(); } });
  next.addEventListener("click", function () { if (index < config.steps.length - 1) { index += 1; draw(); } });
  draw();
}
