# Working Notes — SECURITY

## User preferences
- Level at start (2026-07-22): security beginner; has Python, JavaScript, and web fundamentals
- Cadence: 1–2 hours/day
- Priority: interview fundamentals first; real secure-software capability is the durable goal
- Scope: AppSec core, followed by security-engineering fundamentals—secure architecture, practical cryptography with trusted libraries, cloud/IAM, and container hardening
- Learn vulnerabilities bidirectionally: controlled exploit → root cause → repair → prevention → verification
- Keep principles stack-agnostic and applicable to web apps, mobile-backed systems, APIs, services, and production platforms
- Deprioritize organization-specific incident-response playbooks
- Match DSA/SYSTEMS style: short but thorough HTML lessons, animations, immediate-feedback quizzes, spaced retrieval, reference sheets, and hands-on work

## Course conventions
- `CURRICULUM.md` is the dependency-ordered path; lesson numbers match it.
- OWASP ASVS 5.0.0 is the control/verification backbone. OWASP Top 10:2025 is an awareness map, not the syllabus.
- PortSwigger Web Security Academy supplies isolated offensive practice where it fits. Never direct exercises at real systems.
- Every vulnerability lesson uses the loop: model → observe → exploit safely → fix → prevent → verify.
- Every lesson links a primary source and reminds the learner to ask the teacher questions.
- Quiz options within each question should have equal word counts where practical and are shuffled by `quiz.js`.
- Reuse `assets/course.css`, `assets/quiz.js`, and `assets/secviz.js`; do not inline reusable widget engines.
- Every hands-on security exercise follows `LABS.md`: hosted Academy target, isolated local sandbox, or code microscope; exact scope/start/stop/repair/verify/cleanup instructions are mandatory.
- Learning records represent demonstrated understanding, not material merely covered.

## Teaching plan
The full 67-lesson path is authored and mapped in `CURRICULUM.md`. At three lessons per week it is about 22 weeks, with PortSwigger or local labs folded into practice time. The sequence is fixed; adapt individual lesson depth, examples, and lab volume as quiz and practice evidence arrives.

## Session log
- 2026-07-22: Mission established. User prioritized AppSec/security-engineering interviews, secure-by-design production skill, safe penetration-testing practice, practical cryptography, cloud/container hardening, and IAM. Full curriculum and resource spine created; lesson 0001 authored.
- 2026-07-22: User requested the complete course up front. Lessons 0002–0055 authored with shared `secviz` animation and shuffled retrieval quizzes; authorized labs use the `LABS.md` contract. Added review, vulnerability, threat-model, cryptography, interview, and expanded glossary references. Future teaching should revise lessons from demonstrated misses rather than generate more breadth by default.
- 2026-07-22: Added Phase 8, lessons 0056–0067, for production AI/LLM security using the supplied Datadog guide plus official OpenAI, Anthropic, MCP, OWASP, NIST, and MITRE sources. Added AI attack-path animations, deterministic prompt-injection/tool-policy/eval sandboxes, an AI security runbook, AI lab constraints, and updated course totals.
- 2026-07-22: Reframed lesson 0055 as the Core AppSec and Security Engineering Capstone and phases 0–7 checkpoint. Lesson 0067 is now the only final whole-course capstone and mission-success milestone.
