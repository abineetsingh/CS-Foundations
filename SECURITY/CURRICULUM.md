# Curriculum — Application Security & Security Engineering Mastery Path

Dependency-ordered path from security beginner to interview-ready secure-software practitioner. The course follows one repeated loop: **model the intended policy → observe the system → reproduce the failure in an authorized lab → repair the root cause → prevent recurrence → verify the control**.

Hands-on work follows the repository's [`LABS.md`](./LABS.md) contract: a hosted isolated target, a course-owned local sandbox bound to `127.0.0.1`, or a minimal code microscope. Every lab declares scope, stop conditions, repair criteria, regression evidence, and cleanup.

OWASP [ASVS 5.0.0](https://owasp.org/www-project-application-security-verification-standard/) is the verification spine; [Top 10:2025](https://owasp.org/Top10/) supplies awareness vocabulary; [PortSwigger Web Security Academy](https://portswigger.net/web-security/learning-paths) supplies isolated offensive labs; [NIST SSDF](https://csrc.nist.gov/pubs/sp/800/218/final) anchors production practice. Phase 8 adds the Datadog production AI-security model, official OpenAI and Anthropic guidance, OWASP LLM Top 10, NIST AI RMF, MITRE ATLAS, and MCP security guidance. Each lesson is designed for ~25–35 minutes plus an optional 30–60 minute lab. At three lessons per week, the 67-lesson path is roughly 22 weeks.

**Status (2026-07-22): all 67 lessons are authored.** Filenames `01`–`67` in `./lessons/` match this curriculum. Every lesson contains one scoped skill, primary-source grounding, a step-through security-boundary animation, immediate-feedback quiz, authorized practice contract, verification strategy, and course navigation. Phase 8 lessons add an AI attack-path animation; prompt injection, agent tools, and evals add deterministic browser sandboxes. Lessons `02` onward interleave the current topic with spaced review. Reference documents compress the course into review, vulnerability, threat-model, cryptography, interview, and AI-security runbooks.

Open [`00-table_of_contents.html`](./00-table_of_contents.html) to browse and launch every lesson as a book.

## Phase 0 — The security lens (weeks 1–2)

1. **Security is a policy under pressure** — assets, actors, intended policy, adversarial input, and the builder/breaker/defender loop — `01`
2. **Rules of engagement and a safe lab** *(hands-on)* — authorization, scope, evidence, stop conditions; browser devtools, curl, Python requests, Burp Community; test only local/academy targets
3. **Trust boundaries and data-flow diagrams** — processes, stores, flows, entry points; trace one web/mobile-backed request without assuming the client is trusted
4. **Threat modeling with four questions** — what are we building, what can go wrong, what will we do, did we do enough; lightweight misuse cases
5. **Risk without theater** — likelihood, impact, exploitability, blast radius, assumptions; severity vs priority; why CVSS cannot decide business risk alone
6. **Security requirements and verification** — ASVS levels and requirement identifiers; turn “secure auth” into falsifiable controls and abuse tests

**Milestone:** Draw a small service's data flow, mark trust boundaries, state its assets and intended policy, identify three plausible abuse cases, and convert each mitigation into a test.

## Phase 1 — Server-side vulnerability mechanics (weeks 3–5)

7. **HTTP as an attacker-controlled message** *(hands-on)* — methods, headers, cookies, encodings, duplicate parameters, proxies; intercept and modify a lab request
8. **SQL injection: data becomes code** *(Python + PortSwigger lab)* — query structure, parameterization, safe proof, remediation, regression test
9. **OS command injection** *(Python + lab)* — subprocess boundaries, argument arrays, allowlists, escaping's limits, eliminating the shell
10. **Path traversal and filesystem boundaries** *(lab)* — canonicalization, indirect references, safe file roots, archive extraction
11. **Server-side request forgery** *(lab)* — URL parsing, metadata endpoints, DNS rebinding intuition, egress controls, destination allowlists
12. **File uploads as hostile programs and data** *(lab)* — content/type mismatch, storage isolation, generated names, scanning, image/document processing
13. **Unsafe deserialization and object construction** — data-only formats, gadget chains conceptually, schema validation, trusted-type boundaries
14. **Server-side template injection** *(lab)* — template context, expression execution, sandbox limits, separating code/templates/data
15. **Information disclosure and exceptional conditions** *(hands-on)* — stack traces, debug modes, backups, verbose errors, fail-open vs fail-closed
16. **Business logic and race conditions** *(lab)* — state machines, invariant violations, TOCTOU, idempotency, atomic transitions

**Milestone:** Given a vulnerable Python handler, trace untrusted bytes to a dangerous interpreter or resource, demonstrate the flaw in a lab, remove the dangerous data/code transition, and add a regression test.

## Phase 2 — Identity, sessions, and authorization (weeks 6–8)

17. **Authentication is a lifecycle** — enrollment, proof, recovery, revocation, reauthentication; identities vs authenticators vs sessions
18. **Password storage with maintained libraries** *(Python + JS)* — salts, work factors, Argon2id, migration, timing-safe verification; never invent a scheme
19. **Sessions and secure cookies** *(hands-on)* — opaque identifiers, rotation, fixation, expiry, Secure/HttpOnly/SameSite, server-side invalidation
20. **Authorization: every action on every object** *(lab)* — deny by default, ownership/tenant checks, BOLA/IDOR, centralized policy and query scoping
21. **Roles, attributes, relationships, and capabilities** — RBAC/ABAC/ReBAC tradeoffs, policy composition, privilege creep, testing the matrix
22. **MFA, passkeys, and account recovery** — phishing resistance, step-up auth, backup/recovery threats, recovery as the real authentication perimeter
23. **OAuth 2.0 and OpenID Connect** — delegated authorization vs identity, authorization-code flow with PKCE, state/nonce, redirect URI discipline
24. **JWTs and token systems** *(lab)* — signatures are not encryption, claim validation, audience/issuer/expiry, key rotation, revocation tradeoffs, opaque alternatives

**Milestone:** Design and test identity for a multi-tenant API: password/passkey login, sessions or tokens, recovery, object/function authorization, revocation, and step-up controls—with failure cases explicit.

## Phase 3 — Browser and client-side security (weeks 8–10)

25. **The browser security model** — origins, sites, navigation, DOM, storage, sandboxing; treat every distributed client as inspectable and modifiable
26. **Cross-site scripting by output context** *(JS + lab)* — stored/reflected/DOM XSS, HTML/attribute/URL/JS contexts, framework escaping, safe sinks
27. **Content Security Policy and Trusted Types** — containment vs root-cause repair, nonces, strict CSP, reporting, migration strategy
28. **Cross-site request forgery** *(lab)* — ambient authority, SameSite, anti-CSRF tokens, origin checks, reauthentication for dangerous actions
29. **CORS and cross-origin data access** *(lab)* — preflight, credentials, allow-origin mistakes, why CORS is not authentication
30. **Clickjacking, postMessage, and client trust boundaries** — framing policy, target-origin checks, hostile extensions/clients, server-enforced invariants

**Milestone:** Explain exactly which browser principal can read or send what, exploit and repair XSS/CSRF/CORS flaws in labs, and layer browser defenses without treating headers as magic.

## Phase 4 — API and production application security (weeks 10–12)

31. **API attack-surface mapping** *(hands-on)* — routes, versions, schemas, shadow APIs, mobile/web clients, machine identities, third parties
32. **Object, property, and function authorization** *(API lab)* — BOLA/BOPLA/BFLA, mass assignment, response filtering, tenant isolation
33. **Resource consumption and sensitive business flows** — quotas, cost amplification, pagination, file/decompression bombs, anti-automation without breaking users
34. **Schema validation and safe parsing** *(Python + JS)* — structural vs semantic validation, unknown fields, coercion, JSON/GraphQL edge cases
35. **Webhooks and service-to-service trust** *(hands-on)* — signature verification, freshness, replay defense, idempotency, outbound callbacks
36. **Unsafe upstreams and dependency boundaries** — third-party APIs are untrusted, timeouts/size limits/schema checks, confused deputies, SSRF at integrations
37. **Multi-tenant data and production architecture drill** — tenancy models, scoped queries, cache/object-store keys, queues, analytics exports, admin paths

**Milestone:** Threat-model a stack-agnostic backend serving web and mobile clients, enumerate its API inventory, and defend tenant isolation and expensive workflows across synchronous, async, cache, and storage paths.

## Phase 5 — Secure delivery and verification (weeks 12–14)

38. **Secure SDLC as an engineering system** — NIST SSDF, ownership, paved roads, security champions, feedback latency, usable guardrails
39. **Security code review** *(Python + JS drill)* — source-to-sink tracing, privilege checks, state transitions, error paths, evidence and false positives
40. **Security testing layers** — unit/abuse tests, SAST, DAST, SCA, IAST, manual review; what each can and cannot prove
41. **Fuzzing and property-based security tests** *(Python hands-on)* — invariants, parsers, stateful workflows, shrinking, regression corpora
42. **Dependencies and software supply chain** — inventory/SBOM, pinning, provenance, malicious packages, update strategy, reachability and exposure
43. **CI/CD and artifact integrity** — least-privilege jobs, ephemeral credentials, protected branches, isolated builds, signing/attestation concepts, deployment gates
44. **Findings, remediation, and vulnerability management** — reproduce, rate in context, propose durable fixes, verify closure, prevent recurrence; write reports developers act on

**Milestone:** Review a pull request, identify a real security defect, prove it with the smallest safe test, repair it, add prevention, and write a concise finding with affected asset, exploit path, impact, and verification evidence.

## Phase 6 — Practical cryptography for builders (weeks 15–16)

45. **Cryptographic decisions, not cryptographic invention** — threat before primitive; encoding vs hashing vs MAC vs encryption vs signature; choose maintained APIs
46. **Randomness, hashes, and MACs** *(Python + Web Crypto)* — CSPRNGs, token generation, integrity/authenticity, timing-safe comparison
47. **Authenticated encryption** *(hands-on)* — AEAD, nonce uniqueness, associated data, envelope format, misuse-resistant library interfaces
48. **Public keys, signatures, and key agreement** *(hands-on)* — identity and distribution, signing vs encryption, verification, rotation; practical Ed25519/X25519 concepts
49. **TLS, certificates, and PKI** — authenticated channels, certificate chains, hostname verification, termination boundaries, mTLS tradeoffs
50. **Key and secrets lifecycle** — generation, storage, access, rotation, revocation, audit, KMS/HSM boundaries; passwords are not encryption keys

**Milestone:** Select a vetted construction and maintained library for password storage, tokens, encrypted records, signed messages, and transport security—and name the key/nonce/lifecycle failures that would still break each design.

## Phase 7 — Cloud, containers, secure architecture, and interviews (weeks 16–19)

51. **IAM as executable authorization** *(policy lab)* — principals, actions, resources, conditions, trust policies, temporary credentials, least privilege
52. **Cloud security boundaries** — control vs data plane, account/project isolation, public exposure, metadata/identity endpoints, managed-service shared responsibility
53. **Container hardening** *(Docker hands-on)* — minimal images, non-root users, read-only filesystems, capabilities, seccomp, secrets, patching and provenance
54. **Kubernetes workload security** *(manifest review)* — service accounts/RBAC, Pod Security Standards, network policy, admission, secret delivery, workload identity
55. **Core AppSec and security engineering capstone** — integrate phases 0–7 through scope → assets/adversaries → architecture/trust → abuse cases → investigation → layered design → verification; assess and harden a production-shaped Python/JS service, then defend the design in a mock interview

**Phases 0–7 checkpoint:** In an unfamiliar non-AI application, move fluently from architecture to attack surface, reproduce and explain a flaw safely, implement and verify a durable repair, and defend a production-grade security design under interview questioning. This establishes the ordinary AppSec and platform foundations required by Phase 8; it is not the final course milestone.

## Phase 8 — AI and LLM security engineering (weeks 20–23)

56. **Threat modeling AI and LLM systems** — interfaces, context, models, harnesses, tools, supply chain, providers, infrastructure, and identities as one production system
57. **Direct and indirect prompt injection** *(interactive sandbox)* — user intent vs untrusted instructions, context isolation, deterministic policy, constrained effects, outcome-based testing
58. **Agent tools, MCP, and excessive agency** *(interactive sandbox)* — typed capabilities, OAuth audience, no token passthrough, argument policy, scoped identity, exact-effect approval, audit
59. **RAG security: retrieval, poisoning, and access** — ingestion and retrieval authorization, tenant filtering, provenance, freshness, poisoned documents, citation evidence
60. **Model output is untrusted application input** — structured parsing, semantic validation, safe rendering, domain authorization, no direct code or business effects
61. **Sensitive data, privacy, and memory** — minimization, provider retention choices, embeddings, caches, traces, feedback, session memory, deletion, egress
62. **Guardrails as layered controls** — input/context/tool/output controls, deterministic vs probabilistic enforcement, failure modes, utility, latency, and fallback
63. **Security evals and red teaming** *(interactive sandbox)* — threat-derived datasets, held-out/adaptive attacks, attack success, false blocks, severity-weighted loss, release gates
64. **AI supply chain: models, data, and code** — artifact identity, safe formats/loading, signatures, provenance, poisoned data, hallucinated packages, behavioral baselines
65. **AI infrastructure, credentials, and resource abuse** — workload identity, endpoint discovery, LLM jacking, public clusters, token/tool/cost budgets, egress, rotation
66. **AI observability and security evidence** — correlated privacy-aware traces for prompts, retrieval, guardrails, tools, identity, models, cost, policy, and outcomes
67. **Secure AI architecture capstone** — threat-model, attack safely, harden, evaluate, and defend a production-shaped multi-tenant RAG agent

**Final milestone = mission success:** Deliver an AI system data-flow model, threat register, synthetic prompt-injection or tool-abuse proof, policy-gated repair, adaptive eval report, privacy-aware evidence trail, release decision, and interview defense. The model remains fallible; application controls contain the consequences.

## Ongoing practice

- **Spaced retrieval:** quizzes mix the current skill with difficult questions from 1–3 prior lessons; retake missed questions after one day and one week.
- **Authorized labs:** use only local deliberately vulnerable apps and Web Security Academy targets. Record scope before every test and stop when the learning objective is proven.
- **Interleaving:** from phase 2 onward, include one “mystery” review where the vulnerability class is not named.
- **Portfolio artifacts:** retain sanitized threat models, secure code diffs, regression tests, ASVS mappings, and findings reports from course-owned labs.
- **Wisdom:** periodically take one design or remediation question to an OWASP/OpenSSF/PortSwigger community, then record what working practitioners challenged.
