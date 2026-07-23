# Application Security & Security Engineering Resources

## Knowledge

- [Standard: OWASP Application Security Verification Standard (ASVS) 5.0.0](https://owasp.org/www-project-application-security-verification-standard/)
  The course's requirements and verification backbone. Use for: turning security ideas into testable controls and assessing production applications with consistent rigor.
- [Awareness map: OWASP Top 10:2025](https://owasp.org/Top10/)
  Current consensus list of major web-application risk categories. Use for: interview vocabulary and risk orientation, not as a complete curriculum or testing checklist.
- [Testing guide: OWASP Web Security Testing Guide, stable v4.2](https://owasp.org/www-project-web-security-testing-guide/)
  Vendor-neutral testing methodology used by practitioners. Use for: building repeatable assessment checklists and learning how evidence is collected and reported.
- [Hands-on academy: PortSwigger Web Security Academy](https://portswigger.net/web-security/learning-paths)
  Free, continuously maintained explanations and isolated labs. Use for: authorized offensive practice after each matching vulnerability lesson; begin with server-side topics.
- [Framework: NIST SP 800-218, Secure Software Development Framework 1.1](https://csrc.nist.gov/pubs/sp/800/218/final)
  High-level practices for integrating security into any SDLC. Use for: production secure-development workflows, roles, artifacts, verification, and preventing recurrence.
- [Guidance: OWASP Threat Modeling Project](https://owasp.org/www-project-threat-modeling/)
  Method-neutral entry point organized around four questions: what are we building, what can go wrong, what will we do, and did we do enough. Use for: design reviews and architecture drills.
- [Reference: OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)
  Practical defensive guidance for authentication, authorization, sessions, input handling, cryptography, secrets, APIs, logging, and more. Use for: implementation patterns and remediation details.
- [Awareness map: OWASP API Security Top 10:2023](https://owasp.org/API-Security/)
  API-specific risks including object/function authorization, resource consumption, sensitive flows, inventory, SSRF, and unsafe upstream consumption. Use for: phase 4 and as ordinary AppSec groundwork for agent tools.
- [Course: OpenSSF Developing Secure Software (LFD121)](https://openssf.org/training/courses/)
  Free 14–18 hour secure-software course spanning requirements, design, implementation, and verification. Use for: a companion pass through secure-development fundamentals.
- [Guidance: Kubernetes Security Checklist](https://kubernetes.io/docs/concepts/security/security-checklist/)
  Official baseline covering RBAC, Pod Security Standards, secrets, isolation, and auditing. Use for: container-orchestration hardening and review drills.
- [Guidance: AWS IAM security best practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html)
  Concrete official guidance on federation, temporary credentials, MFA, least privilege, policy analysis, and permissions guardrails. Use for: learning cloud IAM principles through one precise implementation; concepts transfer to other clouds.
- [Guidance: OWASP Cryptographic Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cryptographic_Storage_Cheat_Sheet.html)
  Threat-model-driven guidance on vetted algorithms, authenticated encryption, randomness, and key storage. Use for: practical cryptography alongside maintained Python and JavaScript libraries.
- [Guidance: OWASP Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)
  Current password-hashing recommendations and migration considerations. Use for: Argon2id/scrypt/bcrypt/PBKDF2 labs and authentication design.

## AI and LLM security

- [Production guide: Datadog AI Security Best Practices](/Users/abineetsingh/Documents/eBook-AISecurityBestPractices.pdf)
  The supplied production-system spine for Phase 8. It models three connected surfaces: AI infrastructure, AI supply chain, and AI interfaces. Use for: credentials and LLM jacking, RAG exposure, artifact/data poisoning, prompt injection, guardrails, observability, and least-privilege tools.
- [Datadog: Detect abuse of AI infrastructure](https://www.datadoghq.com/blog/detect-abuse-ai-infrastructure/)
  Detection and prevention patterns for public AI infrastructure, leaked credentials, model endpoint discovery, and resource abuse. Use for: lesson 65 and production telemetry.
- [Datadog: Detect abuse of AI interfaces](https://www.datadoghq.com/blog/detect-abuse-ai-interfaces/)
  Direct and indirect injection paths, harmful execution, persistence, data exfiltration, and monitoring patterns. Use for: lessons 57, 61, and 66.
- [OpenAI: Designing agents to resist prompt injection](https://openai.com/index/designing-agents-to-resist-prompt-injection/)
  Official defense-in-depth framing for constraining agent capability and containing prompt-injection consequences. Use for: direct/indirect injection, tool authority, and eval-driven iteration.
- [OpenAI: Understanding prompt injections](https://openai.com/safety/prompt-injections/)
  Official explanation of why prompt injection is a social-engineering problem for models and why layered safeguards remain necessary. Use for: lesson 57's mental model.
- [OpenAI Agents SDK: Guardrails](https://openai.github.io/openai-agents-python/guardrails/)
  Official SDK semantics for input, output, and tool guardrails, including their execution boundaries. Use for: lesson 62; treat SDK hooks as implementation points, not proof of complete safety.
- [OpenAI Agents SDK: Human in the loop](https://openai.github.io/openai-agents-python/human_in_the_loop/)
  Official approval and pause/resume patterns for sensitive tool calls. Use for: lesson 58's exact-effect approval model.
- [OpenAI: Evaluation best practices](https://platform.openai.com/docs/guides/evaluation-best-practices)
  Official guidance for task-specific evals, datasets, graders, and continuous evaluation. Use for: lesson 63's security-outcome metrics and release gates.
- [OpenAI Platform data controls](https://platform.openai.com/docs/models/default-usage-policies-by-endpoint)
  Official endpoint-specific data-use and retention controls. Use for: provider-boundary decisions in lesson 61; verify current settings for the exact endpoint at implementation time.
- [Anthropic: Mitigating prompt injection in browser use](https://www.anthropic.com/research/prompt-injection-defenses)
  Official research on classifiers and layered defenses against indirect injection in an agent interacting with untrusted webpages. Use for: adversarial eval design and defense limitations.
- [Anthropic: Building and evaluating trustworthy agents](https://www.anthropic.com/research/trustworthy-agents)
  Treats an agent as the model plus harness, tools, and environment, with human control and system-level evaluation. Use for: lessons 56, 58, 63, and 67.
- [Model Context Protocol: Security best practices](https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices)
  Official MCP guidance for OAuth 2.1, audience validation, short-lived tokens, consent, and avoiding token passthrough. Use for: lesson 58.
- [OWASP Top 10 for LLM Applications 2025](https://genai.owasp.org/resource/owasp-top-10-for-llm-applications-2025/)
  Community awareness map spanning prompt injection, sensitive information disclosure, supply chain, data/model poisoning, improper output handling, excessive agency, system prompt leakage, vector/embedding weaknesses, misinformation, and unbounded consumption. Use for: coverage checks, not as the sole syllabus.
- [NIST AI RMF Generative AI Profile](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence)
  Cross-sector risk-management profile for generative AI. Use for: governance, measurement, residual-risk ownership, and the Phase 8 capstone release decision.
- [MITRE ATLAS](https://atlas.mitre.org/)
  Evidence-based adversary tactics and techniques for AI-enabled systems. Use for: threat-case discovery, red-team coverage, and supply-chain scenarios.

## Wisdom (Communities)

- [OWASP local chapters and events](https://owasp.org/chapters/)
  Open practitioner community with local and online meetings. Use for: testing a threat model or AppSec-program idea against engineers working in different environments.
- [OWASP Slack](https://owasp.org/slack/invite)
  Project-specific channels for ASVS, SAMM, testing, and threat modeling. Use for: questions about interpreting standards and contributing improvements.
- [PortSwigger Web Security Academy community](https://forum.portswigger.net/)
  Practice-focused discussion around labs and web-security research. Use for: hints after an honest attempt and comparing alternative exploit/fix reasoning.
- [OpenSSF community](https://openssf.org/community/)
  Practitioners working on secure development and software supply chains. Use for: production perspectives on dependency, build, provenance, and open-source security.

## Gaps

- Security-engineering interview formats vary substantially by company and role. Research target-company loops shortly before applications rather than freezing anecdotal formats into the course.
- Mobile-client-specific platform security is intentionally not a core track. The curriculum covers stack-agnostic backends, identity, APIs, storage, and architecture; add MASVS/MASTG modules later only if a mobile-security role becomes a target.
- Cloud labs use local policy/configuration exercises and official examples first. A real cloud sandbox should be selected later based on current free tiers and the learner's target employers.
