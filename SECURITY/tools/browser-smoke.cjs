const { chromium } = require(process.argv[2]);

(async () => {
  const browser = await chromium.launch({ headless: true, ...(process.argv[3] ? { executablePath: process.argv[3] } : {}) });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const failures = [];
  page.on("pageerror", (error) => failures.push(error.message));
  page.on("console", (message) => { if (message.type() === "error" && !/Failed to load resource/.test(message.text())) failures.push(message.text()); });
  page.on("response", (response) => {
    if (response.status() >= 400 && !response.url().endsWith("/favicon.ico")) failures.push(`${response.status()} ${response.url()}`);
  });

  const files = [
    "01-security-is-policy-under-pressure.html",
    "08-sql-injection-data-becomes-code.html",
    "24-jwt-and-token-systems.html",
    "47-authenticated-encryption.html",
    "55-core-appsec-and-security-engineering-capstone.html",
    "57-direct-and-indirect-prompt-injection.html",
    "63-security-evals-and-red-teaming.html",
    "67-secure-ai-architecture-capstone.html"
  ];

  for (const file of files) {
    await page.goto(`http://127.0.0.1:8766/SECURITY/lessons/${file}`, { waitUntil: "load" });
    if (await page.locator(".secviz").count() !== 1) failures.push(`${file}: visualization missing`);
    if (file >= "56-" && await page.locator(".aiviz").count() !== 1) failures.push(`${file}: AI attack-path visualization missing`);
    if (await page.locator(".quiz-q").count() < 4) failures.push(`${file}: quiz did not render`);
    const initial = await page.locator(".secviz-progress").textContent();
    await page.locator(".secviz-controls button").last().click();
    const advanced = await page.locator(".secviz-progress").textContent();
    if (initial === advanced) failures.push(`${file}: animation did not advance`);
    if (file >= "56-") {
      const aiInitial = await page.locator(".aiviz-progress").textContent();
      await page.locator(".aiviz-controls button").last().click();
      if (aiInitial === await page.locator(".aiviz-progress").textContent()) failures.push(`${file}: AI animation did not advance`);
    }
    const font = await page.locator("body").evaluate((node) => getComputedStyle(node).fontFamily);
    if (!/Palatino|Georgia|serif/i.test(font)) failures.push(`${file}: shared course typography missing`);
    await page.locator(".quiz-options button").first().click();
    if (!/1 of|Done:/.test(await page.locator(".quiz-score").textContent())) failures.push(`${file}: quiz feedback did not update`);
  }

  await browser.close();
  if (failures.length) {
    console.error(failures.join("\n"));
    process.exit(1);
  }
  console.log(`Browser-smoked ${files.length} representative lessons: CSS, animations, quizzes, and console clean.`);
})();
