# Working Notes — SYSTEMS

## User preferences
- Language: Python (only), same as DSA track
- Cadence: parallel with DSA inside 1–2 h/day — systems lessons a few times a week; DSA most days
- Level at start (2026-07-19): true beginner on backends/infra — HTTP servers, databases, caching, load balancers unfamiliar/fuzzy
- Motivation is dual (mirrors DSA): system design interviews at AI labs (near-term) + real ability to build production backends and agentic/ML infrastructure (long-term). Tie lessons to AI/agent examples where natural (e.g., an agent calling an LLM API is client–server; LLM serving is a case study target).
- From the DSA track: user strongly values thorough interactive visuals/animations in every lesson (step-players with play/step controls) and immediate-feedback quizzes.

## Workspace conventions
- Shares look & feel with `../DSA/`: `assets/course.css` and `assets/quiz.js` copied from there — keep visual consistency.
- `assets/sysviz.js` + `assets/sysviz.css`: SYSTEMS-specific flow animator (`renderFlow`) — boxes (client/DNS/server/DB/cache/LB…) with animated packets and step captions. Reuse it in every architecture lesson; extend it rather than inlining new engine code.
- Quiz rule: options within a question have equal word counts so formatting never leaks the answer (quiz.js also shuffles).
- Learning records live in `./learning-records/` (this workspace), not the repo-root `../learning-records/` (that one belongs to the DSA era).

## Teaching plan
Full 46-lesson syllabus lives in CURRICULUM.md (5 phases + ongoing practice, ~18 weeks at 2–3 lessons/week). Author lessons one at a time from that list; adapt order/scope based on learning records. Spaced-review quiz questions from 1–2 lessons back start at lesson 0003.

## Session log
- 2026-07-19: Workspace created. Mission established (interviews + real building, true beginner, mixed style, parallel with DSA). RESOURCES.md seeded from verified web research (DDIA 2nd ed is out as of Dec 2025 — primary book). Built assets/sysviz.js + sysviz.css. Lesson 0001 (The Life of a Request) authored with 8-step request-flow animation, http.server/curl hands-on, 5-question quiz. reference/glossary.html started.
- 2026-07-19 (later): User asked for the full path to completion — CURRICULUM.md written (46 lessons, 5 phases, ~18 weeks).
- 2026-07-19 (later still): User asked to generate ALL lessons up front. Lessons 0002–0046 authored + reference/latency-numbers.html, reference/patterns-cheatsheet.html, reference/interview-runbook.html; glossary.html expanded to all 72 terms across 4 phase sections. Upgraded assets/sysviz.js to support two-row fan-out diagrams (node.row + custom `links` + arbitrary-direction packet tween) — backward compatible with 0001. Every lesson has ≥1 sysviz flow animation + an equal-word-count quiz with spaced review from 0003 on; hands-on lessons: 0003 (FastAPI), 0004 (SQLite), 0012–0014 (SQL/indexes/txns), 0022 (flaky client), 0023 (queue), 0028 (token bucket), 0032 (Docker), 0035 (metrics middleware). Interactive non-quiz widgets: 0005 latency bars, 0006 capacity calculator. Verified via node stub-DOM harness (85 widgets, 0 errors) + Playwright spot-checks (two-row diagram, calculator) + link/anchor resolution checks. When authoring/revising: reuse sysviz.js views, keep quiz option word-counts equal, keep the ML-lab tie-in callout in most lessons (lands well per mission).
