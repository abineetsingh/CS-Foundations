import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const lessonDir = path.join(root, "lessons");
const lessons = fs.readdirSync(lessonDir).filter((file) => /^\d{2}-.+\.html$/.test(file)).sort();
const errors = [];
const assert = (condition, message) => { if (!condition) errors.push(message); };

assert(lessons.length === 67, `expected 67 lessons, found ${lessons.length}`);
lessons.forEach((file, index) => assert(file.startsWith(String(index + 1).padStart(2, "0") + "-"), `sequence mismatch: ${file}`));

const classList = () => ({ add() {}, remove() {}, toggle() {}, contains() { return false; } });
function element(tag = "div") {
  const value = {
    tagName: tag.toUpperCase(), children: [], dataset: {}, classList: classList(), style: {}, disabled: false,
    appendChild(child) { this.children.push(child); child.parentNode = this; return child; },
    addEventListener() {}, setAttribute() {}, querySelectorAll() { return []; }, querySelector() { return null; },
    textContent: "", className: "", parentNode: null
  };
  return value;
}

const quizJs = fs.readFileSync(path.join(root, "assets", "quiz.js"), "utf8");
const vizJs = fs.readFileSync(path.join(root, "assets", "secviz.js"), "utf8");
const aiVizJs = fs.readFileSync(path.join(root, "assets", "aiviz.js"), "utf8");
const containers = new Map();
const context = {
  console, Math,
  document: {
    createElement: (tag) => element(tag),
    createTextNode: (text) => ({ textContent: text }),
    getElementById: (id) => { if (!containers.has(id)) containers.set(id, element()); return containers.get(id); }
  }
};
vm.createContext(context);
vm.runInContext(quizJs, context, { filename: "quiz.js" });
vm.runInContext(vizJs, context, { filename: "secviz.js" });
vm.runInContext(aiVizJs, context, { filename: "aiviz.js" });
const renderQuiz = context.renderQuiz;
context.renderQuiz = (id, questions) => {
  questions.forEach((question, questionIndex) => {
    const counts = question.options.map((option) => option.trim().split(/\s+/).length);
    assert(new Set(counts).size === 1, `${context.currentLesson}: question ${questionIndex + 1} option word counts differ (${counts.join(", ")})`);
  });
  return renderQuiz(id, questions);
};

for (const file of lessons) {
  const full = path.join(lessonDir, file);
  const html = fs.readFileSync(full, "utf8");
  assert(html.includes("renderSecurityFlow("), `${file}: missing animation`);
  assert(html.includes("renderQuiz("), `${file}: missing quiz`);
  assert(html.includes("Primary source:"), `${file}: missing primary source`);
  assert(/ask your teacher/i.test(html), `${file}: missing teacher reminder`);
  assert(html.includes("../00-table_of_contents.html"), `${file}: missing table of contents link`);
  assert(html.includes("Authored by: Abineet Singh | July 2026"), `${file}: missing authorship stamp`);
  if (file >= "56-") {
    assert(html.includes("renderAIPipeline("), `${file}: missing AI attack-path animation`);
    assert(html.includes("../reference/ai-security-runbook.html"), `${file}: missing AI security runbook link`);
  }
  assert(html.length > 6000, `${file}: unexpectedly thin (${html.length} bytes)`);
  const promptCount = (html.match(/prompt:/g) || []).length;
  assert(promptCount >= 4, `${file}: expected at least four quiz questions, found ${promptCount}`);

  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const target = match[1];
    if (/^(?:https?:|#)/.test(target)) continue;
    const [relative, anchor] = target.split("#");
    const resolved = path.resolve(path.dirname(full), relative);
    assert(fs.existsSync(resolved), `${file}: broken local link ${target}`);
    if (anchor && fs.existsSync(resolved) && resolved.endsWith(".html")) {
      const linked = fs.readFileSync(resolved, "utf8");
      assert(linked.includes(`id="${anchor}"`), `${file}: missing anchor ${target}`);
    }
  }

  const inlineScripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((match) => match[1]);
  containers.clear();
  context.currentLesson = file;
  try {
    inlineScripts.forEach((script, index) => vm.runInContext(script, context, { filename: `${file}:inline-${index}` }));
  } catch (error) {
    errors.push(`${file}: widget runtime failed: ${error.stack}`);
  }
  assert(containers.has("flow") || file.startsWith("01-"), `${file}: flow did not initialize`);
  assert(containers.has("quiz"), `${file}: quiz did not initialize`);
}

const references = ["glossary.html", "security-review-runbook.html", "vulnerability-matrix.html", "threat-model-worksheet.html", "crypto-decision-guide.html", "interview-runbook.html", "ai-security-runbook.html"];
references.forEach((file) => assert(fs.existsSync(path.join(root, "reference", file)), `missing reference ${file}`));

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
const aiLessons = lessons.filter((file) => file >= "56-").length;
console.log(`Verified ${lessons.length} lessons, ${references.length} references, ${lessons.length + aiLessons} animations, and ${lessons.reduce((sum, file) => sum + ((fs.readFileSync(path.join(lessonDir, file), "utf8").match(/prompt:/g) || []).length), 0)} quiz questions.`);
