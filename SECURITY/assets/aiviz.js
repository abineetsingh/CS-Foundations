/* Reusable AI/LLM security pipeline and deterministic sandbox widgets. */
function renderAIPipeline(containerId, config) {
  const root = document.getElementById(containerId);
  root.classList.add("aiviz");
  const stage = document.createElement("div");
  stage.className = "aiviz-stage";
  const nodeEls = {};
  config.nodes.forEach(function (node) {
    const el = document.createElement("div");
    el.className = "aiviz-node " + (node.kind || "");
    el.dataset.node = node.id;
    const title = document.createElement("strong"); title.textContent = node.label;
    const detail = document.createElement("small"); detail.textContent = node.detail;
    el.appendChild(title); el.appendChild(detail); stage.appendChild(el); nodeEls[node.id] = el;
  });
  root.appendChild(stage);
  const caption = document.createElement("p"); caption.className = "aiviz-caption"; root.appendChild(caption);
  const controls = document.createElement("div"); controls.className = "aiviz-controls";
  const back = document.createElement("button"); back.textContent = "← Back";
  const progress = document.createElement("span"); progress.className = "aiviz-progress";
  const next = document.createElement("button"); next.textContent = "Next →";
  controls.appendChild(back); controls.appendChild(progress); controls.appendChild(next); root.appendChild(controls);
  let index = 0;
  function draw() {
    const step = config.steps[index];
    Object.keys(nodeEls).forEach(function (id) {
      nodeEls[id].classList.toggle("active", id === step.at);
      nodeEls[id].classList.toggle("violated", id === step.violated);
    });
    caption.textContent = step.caption;
    progress.textContent = "Step " + (index + 1) + " of " + config.steps.length;
    back.disabled = index === 0; next.disabled = index === config.steps.length - 1;
  }
  back.addEventListener("click", function () { if (index > 0) { index -= 1; draw(); } });
  next.addEventListener("click", function () { if (index < config.steps.length - 1) { index += 1; draw(); } });
  draw();
}

function renderPromptInjectionLab(containerId) {
  const root = document.getElementById(containerId); root.classList.add("ai-lab");
  const title = document.createElement("h3"); title.textContent = "Indirect prompt-injection sandbox"; root.appendChild(title);
  const body = document.createElement("div"); body.className = "ai-lab-body";
  const label = document.createElement("label"); label.textContent = "Retrieved document:";
  const select = document.createElement("select");
  ["Quarterly report with ordinary facts", "Vendor document containing hidden instructions", "Support article requesting an external upload"].forEach(function (text, i) {
    const option = document.createElement("option"); option.value = String(i); option.textContent = text; select.appendChild(option);
  });
  label.appendChild(select); body.appendChild(label);
  const hardenedLabel = document.createElement("label");
  const hardened = document.createElement("input"); hardened.type = "checkbox"; hardenedLabel.appendChild(hardened);
  hardenedLabel.appendChild(document.createTextNode(" Use isolated context plus tool policy and approval")); body.appendChild(hardenedLabel);
  const run = document.createElement("button"); run.textContent = "Run deterministic scenario"; body.appendChild(run);
  const result = document.createElement("p"); result.className = "ai-lab-result"; body.appendChild(result); root.appendChild(body);
  function evaluate() {
    const malicious = select.value !== "0";
    result.className = "ai-lab-result " + (malicious && !hardened.checked ? "failed" : "blocked");
    result.textContent = !malicious ? "PASS: retrieved content is treated as evidence and summarized without tool use."
      : hardened.checked ? "CONTAINED: the content is labeled untrusted; its requested action is outside policy and cannot execute. Human approval remains required for release."
      : "FAIL: the pipeline lets retrieved text influence instructions and exposes a privileged action. The model's obedience becomes an authorization bypass.";
  }
  run.addEventListener("click", evaluate); evaluate();
}

function renderToolPolicyLab(containerId) {
  const root = document.getElementById(containerId); root.classList.add("ai-lab");
  const title = document.createElement("h3"); title.textContent = "Agent capability policy sandbox"; root.appendChild(title);
  const body = document.createElement("div"); body.className = "ai-lab-body";
  const action = document.createElement("select");
  [["read_calendar", "Read calendar"], ["send_email", "Send external email"], ["delete_record", "Delete production record"]].forEach(function (pair) {
    const option = document.createElement("option"); option.value = pair[0]; option.textContent = pair[1]; action.appendChild(option);
  });
  const label = document.createElement("label"); label.textContent = "Proposed tool call:"; label.appendChild(action); body.appendChild(label);
  const approvedLabel = document.createElement("label"); const approved = document.createElement("input"); approved.type = "checkbox";
  approvedLabel.appendChild(approved); approvedLabel.appendChild(document.createTextNode(" User approved this exact action and arguments")); body.appendChild(approvedLabel);
  const result = document.createElement("p"); result.className = "ai-lab-result"; body.appendChild(result); root.appendChild(body);
  function decide() {
    const sensitive = action.value !== "read_calendar";
    const allow = !sensitive || approved.checked;
    result.className = "ai-lab-result " + (allow ? "blocked" : "failed");
    result.textContent = allow ? "ALLOW under a scoped identity; record tool, arguments, principal, result, and policy decision."
      : "PAUSE: the model cannot authorize this consequence. Surface exact arguments for human approval or reject the call.";
  }
  action.addEventListener("change", decide); approved.addEventListener("change", decide); decide();
}

function renderEvalLab(containerId) {
  const root = document.getElementById(containerId); root.classList.add("ai-lab");
  const title = document.createElement("h3"); title.textContent = "Guardrail threshold and eval sandbox"; root.appendChild(title);
  const body = document.createElement("div"); body.className = "ai-lab-body";
  const label = document.createElement("label"); label.textContent = "Block when risk score ≥ ";
  const value = document.createElement("strong"); const slider = document.createElement("input"); slider.type = "range"; slider.min = "20"; slider.max = "90"; slider.value = "60";
  label.appendChild(value); label.appendChild(slider); body.appendChild(label);
  const grid = document.createElement("div"); grid.className = "eval-grid"; body.appendChild(grid);
  const note = document.createElement("p"); note.className = "ai-lab-result"; body.appendChild(note); root.appendChild(body);
  const cases = [{score:92, attack:true},{score:81, attack:true},{score:67, attack:false},{score:58, attack:true},{score:43, attack:false},{score:31, attack:false},{score:22, attack:true},{score:12, attack:false}];
  function draw() {
    const threshold = Number(slider.value); value.textContent = String(threshold); let tp=0, fp=0, tn=0, fn=0;
    cases.forEach(function (item) { const blocked=item.score>=threshold; if(item.attack&&blocked)tp++; else if(!item.attack&&blocked)fp++; else if(!item.attack)tn++; else fn++; });
    grid.textContent = "";
    [["TP",tp],["FP",fp],["TN",tn],["FN",fn]].forEach(function(pair){ const cell=document.createElement("div"); cell.className="eval-cell"; const n=document.createElement("strong"); n.textContent=String(pair[1]); const s=document.createElement("small"); s.textContent=pair[0]; cell.appendChild(n); cell.appendChild(s); grid.appendChild(cell); });
    note.textContent = "Attack success after guardrail: " + fn + "/4. Legitimate requests blocked: " + fp + "/4. A threshold is a risk tradeoff, not a universal safety score.";
  }
  slider.addEventListener("input", draw); draw();
}
