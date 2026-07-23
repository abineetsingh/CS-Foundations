/* Reusable immediate-feedback quiz. Options are shuffled so position does not leak answers. */
function renderQuiz(containerId, questions) {
  const container = document.getElementById(containerId);
  container.classList.add("quiz");
  let answered = 0;
  let correct = 0;

  const scoreEl = document.createElement("p");
  scoreEl.className = "quiz-score";
  scoreEl.textContent = "0 of " + questions.length + " answered.";

  questions.forEach(function (q, i) {
    const box = document.createElement("div");
    box.className = "quiz-q";

    const num = document.createElement("div");
    num.className = "q-num";
    num.textContent = "Question " + (i + 1) + " of " + questions.length;
    box.appendChild(num);

    if (q.code) {
      const pre = document.createElement("pre");
      const code = document.createElement("code");
      code.textContent = q.code;
      pre.appendChild(code);
      box.appendChild(pre);
    }

    const prompt = document.createElement("p");
    prompt.textContent = q.prompt;
    box.appendChild(prompt);

    const options = q.options.map(function (text, index) {
      return { text: text, correct: index === q.answer };
    });
    for (let j = options.length - 1; j > 0; j--) {
      const k = Math.floor(Math.random() * (j + 1));
      const temp = options[j]; options[j] = options[k]; options[k] = temp;
    }

    const row = document.createElement("div");
    row.className = "quiz-options";
    const feedback = document.createElement("div");
    feedback.className = "quiz-feedback";

    options.forEach(function (option) {
      const button = document.createElement("button");
      button.textContent = option.text;
      button.addEventListener("click", function () {
        Array.prototype.forEach.call(row.children, function (candidate, index) {
          candidate.disabled = true;
          if (options[index].correct) candidate.classList.add("correct");
        });
        if (!option.correct) button.classList.add("incorrect");

        const verdict = document.createElement("span");
        verdict.className = "verdict " + (option.correct ? "good" : "bad");
        verdict.textContent = option.correct ? "Correct. " : "Not quite. ";
        feedback.appendChild(verdict);
        feedback.appendChild(document.createTextNode(q.explain || ""));
        feedback.classList.add("shown");

        answered += 1;
        if (option.correct) correct += 1;
        scoreEl.textContent = answered === questions.length
          ? "Done: " + correct + " of " + questions.length + " correct." +
            (correct === questions.length ? " Full marks." : " Revisit the misses, then retrieve them tomorrow.")
          : answered + " of " + questions.length + " answered.";
      });
      row.appendChild(button);
    });

    box.appendChild(row);
    box.appendChild(feedback);
    container.appendChild(box);
  });

  container.appendChild(scoreEl);
}
