import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const sources = {
  scope: ["OWASP Web Security Testing Guide — Introduction", "https://owasp.org/www-project-web-security-testing-guide/"],
  threat: ["OWASP Threat Modeling Cheat Sheet", "https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html"],
  risk: ["OWASP Risk Rating Methodology", "https://owasp.org/www-community/OWASP_Risk_Rating_Methodology"],
  asvs: ["OWASP ASVS 5.0.0", "https://owasp.org/www-project-application-security-verification-standard/"],
  http: ["MDN HTTP Overview", "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview"],
  sqli: ["PortSwigger SQL Injection", "https://portswigger.net/web-security/sql-injection"],
  command: ["PortSwigger OS Command Injection", "https://portswigger.net/web-security/os-command-injection"],
  traversal: ["PortSwigger Path Traversal", "https://portswigger.net/web-security/file-path-traversal"],
  ssrf: ["PortSwigger SSRF", "https://portswigger.net/web-security/ssrf"],
  upload: ["PortSwigger File Upload Vulnerabilities", "https://portswigger.net/web-security/file-upload"],
  deserialize: ["PortSwigger Insecure Deserialization", "https://portswigger.net/web-security/deserialization"],
  template: ["PortSwigger Server-Side Template Injection", "https://portswigger.net/web-security/server-side-template-injection"],
  errors: ["OWASP Error Handling Cheat Sheet", "https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html"],
  logic: ["PortSwigger Business Logic Vulnerabilities", "https://portswigger.net/web-security/logic-flaws"],
  auth: ["OWASP Authentication Cheat Sheet", "https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html"],
  passwords: ["OWASP Password Storage Cheat Sheet", "https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html"],
  sessions: ["OWASP Session Management Cheat Sheet", "https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html"],
  authorization: ["OWASP Authorization Cheat Sheet", "https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html"],
  mfa: ["OWASP Multifactor Authentication Cheat Sheet", "https://cheatsheetseries.owasp.org/cheatsheets/Multifactor_Authentication_Cheat_Sheet.html"],
  oauth: ["OAuth 2.0 Security Best Current Practice", "https://www.rfc-editor.org/rfc/rfc9700"],
  jwt: ["OWASP JSON Web Token Cheat Sheet", "https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html"],
  browser: ["MDN Same-Origin Policy", "https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy"],
  xss: ["PortSwigger Cross-Site Scripting", "https://portswigger.net/web-security/cross-site-scripting"],
  csp: ["OWASP Content Security Policy Cheat Sheet", "https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html"],
  csrf: ["PortSwigger Cross-Site Request Forgery", "https://portswigger.net/web-security/csrf"],
  cors: ["PortSwigger CORS", "https://portswigger.net/web-security/cors"],
  client: ["OWASP HTML5 Security Cheat Sheet", "https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html"],
  api: ["OWASP API Security Top 10:2023", "https://owasp.org/API-Security/"],
  validate: ["OWASP Input Validation Cheat Sheet", "https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html"],
  webhook: ["OWASP REST Security Cheat Sheet", "https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html"],
  ssdf: ["NIST Secure Software Development Framework 1.1", "https://csrc.nist.gov/pubs/sp/800/218/final"],
  review: ["OWASP Code Review Guide", "https://owasp.org/www-project-code-review-guide/"],
  testing: ["OWASP Web Security Testing Guide", "https://owasp.org/www-project-web-security-testing-guide/"],
  fuzz: ["OWASP Fuzzing", "https://owasp.org/www-community/Fuzzing"],
  supply: ["OpenSSF Developing Secure Software", "https://openssf.org/training/courses/"],
  cicd: ["OWASP CI/CD Security Cheat Sheet", "https://cheatsheetseries.owasp.org/cheatsheets/CI_CD_Security_Cheat_Sheet.html"],
  report: ["OWASP Vulnerability Disclosure Cheat Sheet", "https://cheatsheetseries.owasp.org/cheatsheets/Vulnerability_Disclosure_Cheat_Sheet.html"],
  crypto: ["OWASP Cryptographic Storage Cheat Sheet", "https://cheatsheetseries.owasp.org/cheatsheets/Cryptographic_Storage_Cheat_Sheet.html"],
  randomness: ["Python secrets — Official Documentation", "https://docs.python.org/3/library/secrets.html"],
  aead: ["Cryptography.io AEAD Primitives", "https://cryptography.io/en/latest/hazmat/primitives/aead/"],
  signatures: ["Cryptography.io Ed25519", "https://cryptography.io/en/latest/hazmat/primitives/asymmetric/ed25519/"],
  tls: ["Mozilla Server Side TLS", "https://wiki.mozilla.org/Security/Server_Side_TLS"],
  keys: ["OWASP Key Management Cheat Sheet", "https://cheatsheetseries.owasp.org/cheatsheets/Key_Management_Cheat_Sheet.html"],
  iam: ["AWS IAM Security Best Practices", "https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html"],
  cloud: ["NIST Zero Trust Architecture", "https://csrc.nist.gov/pubs/sp/800/207/final"],
  container: ["Docker Build Security Best Practices", "https://docs.docker.com/build/building/best-practices/"],
  kubernetes: ["Kubernetes Security Checklist", "https://kubernetes.io/docs/concepts/security/security-checklist/"],
  capstone: ["OWASP ASVS 5.0.0", "https://owasp.org/www-project-application-security-verification-standard/"],
  datadog_ai: ["Datadog AI Security Best Practices - Infrastructure", "https://www.datadoghq.com/blog/detect-abuse-ai-infrastructure/"],
  openai_prompt: ["OpenAI - Designing Agents to Resist Prompt Injection", "https://openai.com/index/designing-agents-to-resist-prompt-injection/"],
  openai_agents: ["OpenAI Agents SDK - Human in the Loop", "https://openai.github.io/openai-agents-python/human_in_the_loop/"],
  anthropic_prompt: ["Anthropic - Mitigating Prompt Injection in Browser Use", "https://www.anthropic.com/research/prompt-injection-defenses"],
  anthropic_agents: ["Anthropic - Building and Evaluating Trustworthy Agents", "https://www.anthropic.com/research/trustworthy-agents"],
  mcp_security: ["Model Context Protocol Security Best Practices", "https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices"],
  owasp_llm: ["OWASP Top 10 for LLM Applications 2025", "https://genai.owasp.org/resource/owasp-top-10-for-llm-applications-2025/"],
  openai_data: ["OpenAI Platform Data Controls", "https://platform.openai.com/docs/models/default-usage-policies-by-endpoint"],
  openai_guardrails: ["OpenAI Agents SDK - Guardrails", "https://openai.github.io/openai-agents-python/guardrails/"],
  openai_evals: ["OpenAI Evaluation Best Practices", "https://platform.openai.com/docs/guides/evaluation-best-practices"],
  mitre_atlas: ["MITRE ATLAS", "https://atlas.mitre.org/"],
  nist_ai: ["NIST AI RMF Generative AI Profile", "https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence"],
  datadog_interfaces: ["Datadog - Abusing AI Interfaces", "https://www.datadoghq.com/blog/detect-abuse-ai-interfaces/"]
};

const academyLabs = new Map([
  [8, ["PortSwigger SQL Injection labs", "https://portswigger.net/web-security/sql-injection"]],
  [9, ["PortSwigger OS Command Injection labs", "https://portswigger.net/web-security/os-command-injection"]],
  [10, ["PortSwigger Path Traversal labs", "https://portswigger.net/web-security/file-path-traversal"]],
  [11, ["PortSwigger SSRF labs", "https://portswigger.net/web-security/ssrf"]],
  [12, ["PortSwigger File Upload labs", "https://portswigger.net/web-security/file-upload"]],
  [13, ["PortSwigger Insecure Deserialization labs", "https://portswigger.net/web-security/deserialization"]],
  [14, ["PortSwigger Server-Side Template Injection labs", "https://portswigger.net/web-security/server-side-template-injection"]],
  [16, ["PortSwigger Business Logic labs", "https://portswigger.net/web-security/logic-flaws"]],
  [20, ["PortSwigger Access Control labs", "https://portswigger.net/web-security/access-control"]],
  [24, ["PortSwigger JWT labs", "https://portswigger.net/web-security/jwt"]],
  [26, ["PortSwigger Cross-Site Scripting labs", "https://portswigger.net/web-security/cross-site-scripting"]],
  [28, ["PortSwigger CSRF labs", "https://portswigger.net/web-security/csrf"]],
  [29, ["PortSwigger CORS labs", "https://portswigger.net/web-security/cors"]]
]);

const raw = `
2|rules-of-engagement-and-a-safe-lab|Rules of Engagement and a Safe Lab|0|write a precise authorization and scope card before touching a target|Permission is specific to owner, target, actions, time, and impact; technical reachability is never authorization|Testing drifts beyond the intended host or proves impact by damaging data|Resolve the exact target, bind local services to loopback, use synthetic data, and define stop conditions|Confirm every request resolves inside scope; retain harmless evidence; run deterministic cleanup|scope
3|trust-boundaries-and-data-flow-diagrams|Trust Boundaries and Data-Flow Diagrams|0|draw a security data flow that distinguishes identities, privilege, and authoritative stores|A boundary exists wherever data or control crosses between different trust or privilege domains|Diagrams show components but omit identities, admin paths, queues, caches, and third parties|Label actors, processes, stores, flows, entry points, privilege, and every trust crossing|Trace one asset end to end and challenge every boundary with an untrusted or replayed message|threat
4|threat-modeling-with-four-questions|Threat Modeling with Four Questions|0|run a lightweight threat model that produces actionable engineering work|Threat modeling asks what exists, what can go wrong, what will change, and whether the response is sufficient|Teams brainstorm generic attacks without assets, system context, ownership, or verification|Model concrete flows and assumptions, write misuse cases, prioritize them, and assign mitigations plus tests|Review model completeness, validate mitigations, and update it when architecture or threats change|threat
5|risk-without-theater|Risk Without Theater|0|rank a finding using explicit likelihood, impact, reachability, and business context|Severity describes technical harm while priority includes exposure, asset value, compensating controls, and repair cost|A dramatic payload or high scanner score dictates work without checking real preconditions or blast radius|State attacker capability, exploit path, affected asset, likelihood factors, impact, uncertainty, and existing controls|Try to falsify each precondition and compare the proposed priority with the system owner|risk
6|security-requirements-and-verification|Security Requirements and Verification|0|turn a security goal into a falsifiable requirement and abuse test|A requirement names the subject, required behavior, conditions, and observable verification evidence|Words such as secure, robust, encrypted, and protected hide incompatible interpretations|Use versioned ASVS requirements as a baseline, tailor them to risk, and add application-specific invariants|Test permitted and denied cases at the authoritative boundary and preserve evidence with the requirement|asvs
7|http-as-an-attacker-controlled-message|HTTP as an Attacker-Controlled Message|1|intercept, read, and deliberately modify every meaningful part of an HTTP exchange|Methods, paths, query values, headers, cookies, encodings, and bodies are caller-controlled bytes|The server trusts UI constraints, parameter order, a content type, or one canonical encoding|Parse once with maintained libraries, validate structure and meaning, and authorize the resulting operation|Replay a baseline request then vary one field, duplicate, encoding, method, and content type at a time|http
8|sql-injection-data-becomes-code|SQL Injection: Data Becomes Code|1|trace untrusted data into a SQL grammar and eliminate that transition|SQL injection happens when data changes query structure rather than remaining a bound value|String concatenation, interpolation, dynamic identifiers, or partial escaping lets input become executable syntax|Use parameterized queries for values, allowlist unavoidable identifiers, and minimize database privilege|Prove a harmless predicate changes results, patch the sink, then rerun attack and normal query tests|sqli
9|os-command-injection|OS Command Injection|1|remove shell interpretation from a server-side operation|Shells interpret separators, substitutions, redirections, and expansions beyond the intended argument|A handler joins user input into one command string or relies on incomplete escaping|Avoid the shell; invoke a fixed executable with an argument array and validate narrow semantic input|Test separators and malformed values safely, then assert the intended process and arguments exactly|command
10|path-traversal-and-filesystem-boundaries|Path Traversal and Filesystem Boundaries|1|confine attacker-influenced file access to an intended root|Filesystem names are references; normalization, links, archives, and alternate encodings can cross boundaries|Code joins a base directory with user input and checks only a prefix or substring|Prefer indirect identifiers; resolve canonical paths, compare path components, and isolate storage permissions|Attempt parent segments, encoded variants, absolute paths, links, and archive entries against synthetic files|traversal
11|server-side-request-forgery|Server-Side Request Forgery|1|control where a server may connect on a caller's behalf|A URL parser and network stack can reach internal, loopback, metadata, redirected, and DNS-resolved destinations|Validation checks the original string while redirects, alternate address forms, or DNS change the actual peer|Eliminate arbitrary fetches; allowlist schemes and destinations, revalidate redirects, and enforce network egress policy|Record the final resolved peer and prove loopback, private, metadata, and redirected destinations remain unreachable|ssrf
12|hostile-file-uploads|File Uploads as Hostile Programs and Data|1|design an upload pipeline that treats names, bytes, and processors as untrusted|Extension, media type, content, filename, parser behavior, storage location, and served origin are separate decisions|The app trusts client metadata, stores executable files under predictable names, or processes them with privilege|Generate names, cap size, validate required structure, isolate processing, store outside executable roots, and serve safely|Upload mismatched, oversized, polyglot-like, and malformed synthetic files; verify quarantine and safe delivery|upload
13|unsafe-deserialization|Unsafe Deserialization and Object Construction|1|keep untrusted bytes from selecting executable object behavior|Object serializers may encode types and reconstruction hooks, not merely passive values|An application deserializes attacker-controlled native objects or enables polymorphic type construction|Use data-only formats, explicit schemas, allowlisted types, integrity protection for trusted blobs, and least privilege|Mutate type markers and unexpected fields; prove the parser returns data or rejects input without side effects|deserialize
14|server-side-template-injection|Server-Side Template Injection|1|separate template code from untrusted values|A template engine may expose expressions, objects, functions, files, or process capabilities|User content becomes the template source, or a powerful context turns expression evaluation into code execution|Keep templates static and trusted, pass data as values, minimize context, and isolate rendering when necessary|Use harmless arithmetic or property access in a lab, then prove it renders literally after repair|template
15|information-disclosure-and-exceptions|Information Disclosure and Exceptional Conditions|1|make failures safe for users and useful for operators|Errors cross two audiences: callers need stable minimal responses while operators need correlated diagnostic detail|Debug pages, stack traces, secrets, paths, queries, or partial results escape through exceptional paths|Map exceptions centrally, return opaque identifiers, redact structured logs, and choose fail-safe defaults|Trigger malformed, missing, timeout, and downstream failures; inspect response, logs, state, and authorization outcome|errors
16|business-logic-and-race-conditions|Business Logic and Race Conditions|1|express workflow security as state invariants and atomic transitions|Many serious flaws violate business rules without malformed input: limits, order, uniqueness, and one-time actions|Parallel or reordered valid requests observe stale state and each pass a separate check|Model a state machine, enforce invariants inside atomic storage operations, and use idempotency where retries occur|Run concurrent and reordered requests; assert final state, total value, uniqueness, and replay behavior|logic
17|authentication-is-a-lifecycle|Authentication Is a Lifecycle|2|design enrollment, authentication, recovery, reauthentication, and revocation as one boundary|Identity proofing, authenticators, sessions, recovery channels, and administrative resets form a connected lifecycle|The login is strong but recovery, enrollment change, or session revocation bypasses it|Threat-model every lifecycle transition, notify users of changes, require fresh proof for sensitive actions, and revoke consistently|Test new device, lost factor, recovery, password change, account disablement, and active-session behavior|auth
18|password-storage-with-maintained-libraries|Password Storage with Maintained Libraries|2|store and verify passwords with an adaptive maintained construction|Password hashing must be salted, deliberately expensive, upgradeable, and distinct from general-purpose fast hashes|Plaintext, reversible encryption, unsalted hashes, fast SHA variants, or frozen work factors enable cheap offline guessing|Use Argon2id where available, store encoded parameters, tune work factor, and rehash on successful login when outdated|Inspect stored records, time verification, test Unicode and long inputs, and exercise transparent parameter migration|passwords
19|sessions-and-secure-cookies|Sessions and Secure Cookies|2|bind an authenticated browser to a revocable server-side session safely|A session identifier is a bearer secret; issuance, rotation, storage, transport, expiry, and invalidation all matter|Predictable IDs, fixation, long lifetimes, insecure cookie scope, or partial logout preserve attacker access|Generate opaque random IDs, rotate after privilege change, set Secure HttpOnly SameSite and narrow scope, expire server-side|Test fixation, concurrent sessions, logout, timeout, password change, cookie flags, and cross-site request behavior|sessions
20|authorization-every-action-every-object|Authorization: Every Action on Every Object|2|enforce object and action permission at the authoritative server boundary|Authentication identifies a caller; authorization decides each requested operation over a specific resource|Handlers check logged-in status but trust object identifiers, tenant fields, hidden buttons, or client-supplied roles|Deny by default, scope data access to caller context, centralize policy, and check every object and function|Build an actor-resource-action matrix and test allowed, cross-user, cross-tenant, role, and missing-resource cases|authorization
21|roles-attributes-relationships-capabilities|Roles, Attributes, Relationships, and Capabilities|2|choose an authorization model that matches the domain and remains reviewable|RBAC groups jobs, ABAC evaluates attributes, ReBAC follows relationships, and capabilities convey scoped authority|Global roles accumulate exceptions until they imply unintended access or cannot express object relationships|Model domain actions first, compose few understandable rules, constrain delegation, and keep policy data authoritative|Generate a decision table, test conflicting rules and stale attributes, and review privilege growth over time|authorization
22|mfa-passkeys-and-account-recovery|MFA, Passkeys, and Account Recovery|2|select authenticators and recovery controls based on attacker resistance|Factors differ in phishing, replay, device theft, malware, enrollment, and recovery properties|A strong factor is undermined by weak fallback, help-desk reset, unprotected enrollment, or session persistence|Prefer phishing-resistant passkeys for high value, protect factor changes, rate-limit recovery, and notify out of band|Exercise lost device, new enrollment, fallback, recovery, high-risk action, and session revocation scenarios|mfa
23|oauth2-and-openid-connect|OAuth 2.0 and OpenID Connect|2|trace authorization-code flow with PKCE and distinguish delegation from identity|OAuth delegates access; OpenID Connect adds authenticated identity claims; browser redirects connect multiple security domains|Loose redirect URIs, missing state or nonce, token leakage, mix-up, or confused client roles break the flow|Use authorization code with PKCE, exact redirect matching, state and nonce, short tokens, and maintained provider libraries|Draw each message and bind code, verifier, client, redirect, issuer, audience, nonce, and user session|oauth
24|jwt-and-token-systems|JWTs and Token Systems|2|validate signed token claims and know when an opaque token is simpler|A JWT is a signed claim container, usually readable by anyone holding it; verification includes algorithm, key, issuer, audience, and time|Code merely decodes, accepts algorithm confusion, ignores audience, trusts headers, or cannot revoke long-lived tokens|Pin allowed algorithms and keys, validate every required claim, minimize data and lifetime, rotate keys, and plan revocation|Test tampering, wrong issuer or audience, expiry boundaries, key rotation, replay, logout, and clock skew|jwt
25|browser-security-model|The Browser Security Model|3|reason about origins, sites, navigation, DOM access, storage, and ambient credentials|The browser isolates origins but still sends requests, follows navigation, embeds content, and attaches selected credentials|Developers confuse origin with site, sending with reading, or CORS with request prevention|Map origin and site explicitly, minimize ambient authority, choose storage deliberately, and enforce policy server-side|For two origins, predict script access, cookie attachment, request creation, response reading, framing, and navigation|browser
26|cross-site-scripting-by-context|Cross-Site Scripting by Output Context|3|keep untrusted data from becoming executable browser syntax|HTML text, attributes, URLs, JavaScript, CSS, and DOM sinks each have different parsing rules|One generic escaping function or unsafe DOM API lets data break its current context and create code|Prefer framework auto-escaping and safe sinks, encode for the exact context, sanitize allowed HTML, and avoid dangerous contexts|Test harmless markers in every render path and context; verify DOM structure and no script-capable node or URL appears|xss
27|content-security-policy-and-trusted-types|Content Security Policy and Trusted Types|3|deploy browser containment without confusing it for root-cause repair|A strict CSP constrains executable sources; Trusted Types can centralize dangerous DOM sink creation|Broad source lists, unsafe-inline, missing nonces, or policy bypasses create a reassuring header with little protection|Start with report-only telemetry, use nonce-based strict policy, remove inline handlers, and introduce reviewed Trusted Types policies|Inspect effective policy, collect violation reports, test injection variants, and ensure application behavior survives enforcement|csp
28|cross-site-request-forgery|Cross-Site Request Forgery|3|prevent another site from exercising a user's ambient authority|Browsers can attach cookies to attacker-initiated requests even when the attacker cannot read the response|State changes rely only on session cookies, use predictable tokens, or exempt alternate content types and methods|Use SameSite appropriately, strong session-bound anti-CSRF tokens, origin checks, and fresh confirmation for dangerous actions|Submit cross-site forms and simple requests, vary method and content type, and verify legitimate multi-tab workflows|csrf
29|cors-and-cross-origin-data-access|CORS and Cross-Origin Data Access|3|configure which origins may read credentialed responses|CORS relaxes browser response-reading rules; it does not authenticate callers or stop requests reaching the server|Reflecting Origin, trusting null, wildcard subdomains, or combining credentials with broad origins exposes data|Maintain an exact allowlist, emit one validated origin, vary responses by Origin, and avoid credentials where possible|Test allowed, sibling, attacker-controlled subdomain, null, mixed-scheme, and unlisted origins with and without credentials|cors
30|clickjacking-postmessage-client-boundaries|Clickjacking, postMessage, and Client Trust Boundaries|3|secure framed interfaces and explicit cross-window messages|Frames can deceive user intent; postMessage deliberately crosses origins and therefore needs an application protocol|Missing frame restrictions, wildcard target origins, weak source checks, or trusting message shape grants unintended actions|Set frame-ancestors, send to exact origins, validate origin source schema and state, and keep sensitive enforcement server-side|Attempt hostile framing and messages from wrong origins, windows, order, type, and stale state|client
31|api-attack-surface-mapping|API Attack-Surface Mapping|4|build an inventory of reachable operations, identities, data, versions, and integrations|An API surface includes documented and hidden routes, old versions, admin paths, async consumers, webhooks, and third parties|Testing follows public documentation while shadow endpoints, alternate hosts, methods, and schemas remain exposed|Derive inventory from code, gateways, traffic, deployment, and ownership; record auth, data class, version, and lifecycle|Compare independent inventories, probe only authorized routes, and fail delivery when unmanaged public endpoints appear|api
32|object-property-function-authorization|Object, Property, and Function Authorization|4|separate authorization decisions for resources, fields, and operations|An actor may access one object but not every property or function related to it|Generic serialization, mass assignment, route-only roles, or caller-provided tenant fields overgrant read or write access|Use explicit input and output models, server-owned fields, scoped queries, and policy checks per action and property|Test cross-object, hidden-field write, sensitive-field read, alternate method, bulk operation, and admin function cases|api
33|resource-consumption-sensitive-flows|Resource Consumption and Sensitive Business Flows|4|protect finite resources and valuable workflows from automated abuse|CPU, memory, storage, bandwidth, third-party spend, inventory, and business actions all have budgets|One request triggers unbounded work, pagination, expansion, upload, decompression, messaging, or repeated valuable actions|Bound every dimension, meter by relevant identity and resource, queue expensive work, require intent, and degrade safely|Test limits independently and in combination; verify fairness, retry behavior, cleanup, cost, and legitimate bursts|api
34|schema-validation-and-safe-parsing|Schema Validation and Safe Parsing|4|validate structure and domain meaning without dangerous coercion|Syntax validity, schema validity, and business validity are separate layers|Parsers accept duplicate keys, unknown fields, surprising numbers, coercion, deep nesting, or inconsistent representations|Set size and depth limits, reject ambiguous input, use explicit schemas and types, then validate domain invariants|Build a corpus of boundary, duplicate, unknown, null, overflow, Unicode, and deeply nested cases across implementations|validate
35|webhooks-and-service-trust|Webhooks and Service-to-Service Trust|4|authenticate, freshness-check, and safely replay asynchronous messages|A webhook is an internet request claiming to represent a remote event; signatures do not automatically stop replay|Code trusts source IP or a secret query value, signs a parsed body, ignores timestamp, or applies events twice|Verify a provider-defined MAC or signature over exact bytes, bound freshness, deduplicate event IDs, and process idempotently|Test body mutation, wrong key, stale timestamp, duplicate delivery, reordering, timeout, retry, and partial failure|webhook
36|unsafe-upstreams-and-dependency-boundaries|Unsafe Upstreams and Dependency Boundaries|4|treat third-party responses and callbacks as untrusted input|Your service's credentials and network position can turn an upstream compromise into a confused deputy|Code trusts remote schemas, redirects, sizes, filenames, URLs, status codes, or active content because the provider is reputable|Constrain destinations and privileges, set time and size budgets, validate responses, isolate processors, and fail deliberately|Simulate malformed, slow, huge, redirected, replayed, and semantically false upstream responses|api
37|multi-tenant-production-architecture-drill|Multi-Tenant Data and Production Architecture Drill|4|preserve tenant isolation across every data path and operational plane|Tenant context must remain bound through APIs, queries, caches, objects, queues, search, analytics, exports, and administration|One shared cache key, background job, support tool, or bulk export loses tenant scope despite secure request handlers|Establish authoritative tenant context, carry it explicitly, partition or scope every access, and test operational paths|Trace one record through synchronous and asynchronous flows; inject two tenants and assert noninterference everywhere|authorization
38|secure-sdlc-as-engineering-system|Secure SDLC as an Engineering System|5|design security work as fast, owned, repeatable delivery feedback|Secure development prepares the organization, protects software, produces well-secured releases, and responds to vulnerabilities|Security arrives as a late gate, giant checklist, or specialist queue detached from developer workflows|Assign ownership, define requirements early, provide paved-road components, automate fast checks, and preserve human review for judgment|Measure feedback latency, recurrence, coverage, exception age, remediation outcomes, and developer usability rather than alert volume|ssdf
39|security-code-review|Security Code Review|5|trace assets, trust boundaries, sources, sinks, policy decisions, and exceptional paths through a change|Security review asks how a change alters reachable behavior and authority, not merely whether code looks suspicious|Reviewers grep for dangerous names but miss state transitions, authorization placement, defaults, and sibling call paths|Start from changed behavior, map caller-controlled sources to sensitive effects, inspect policy ownership, and seek bypass paths|Produce a minimal reproducer or abuse test, inspect the repair, and search for equivalent paths sharing the root cause|review
40|security-testing-layers|Security Testing Layers|5|combine tests according to what each layer can observe and prove|Unit abuse tests, SAST, SCA, DAST, fuzzing, configuration checks, and manual review expose different evidence|A green scanner is treated as proof of security or noisy tools block delivery without triage and ownership|Map requirements to the cheapest reliable evidence, layer complementary methods, tune findings, and define escalation paths|Seed known defects, measure detection and false-positive behavior, and ensure high-risk invariants have direct tests|testing
41|fuzzing-and-property-based-tests|Fuzzing and Property-Based Security Tests|5|express invariants and let generators explore surprising inputs and sequences|Example tests cover remembered cases; properties cover classes such as isolation, parser agreement, bounds, and idempotency|A fuzzer chases crashes without an oracle, generates invalid noise, or loses minimized regression cases|Define security properties, generate structured boundary inputs and state transitions, shrink failures, and preserve the corpus|Seed a known violation, confirm discovery, repair it, rerun generated cases, and add the minimized example permanently|fuzz
42|dependencies-and-software-supply-chain|Dependencies and Software Supply Chain|5|control what code enters builds and how confidently it can be updated|Risk spans package identity, maintainer compromise, transitive code, build tools, registries, provenance, reachability, and patch delay|Teams pin forever, update blindly, trust package names, ignore build dependencies, or count CVEs without exposure context|Maintain inventory, constrain sources, review additions, automate bounded updates, verify provenance where available, and remove dead code|Rebuild from declared inputs, test lockfile changes, detect unexpected packages, and rehearse replacing a compromised dependency|supply
43|cicd-and-artifact-integrity|CI/CD and Artifact Integrity|5|make the delivery pipeline a least-privilege producer of verifiable artifacts|Pipelines execute contributor-controlled code while holding repository, registry, signing, deployment, and cloud authority|Long-lived secrets, broad runners, mutable actions, untrusted pull-request execution, and environment crossover enable escalation|Use isolated ephemeral jobs, pinned dependencies, temporary identity, protected approvals, artifact promotion, and recorded provenance|Model fork and compromised-action scenarios; inspect effective permissions, secret access, artifact lineage, and production gates|cicd
44|findings-remediation-vulnerability-management|Findings, Remediation, and Vulnerability Management|5|write evidence-driven findings that lead to durable fixes and verified closure|A useful finding connects violated policy, reproducible path, affected asset, realistic impact, root cause, and repair options|Reports exaggerate severity, dump scanner text, prescribe payload filters, or close when code changes without retesting|Use minimal evidence, state preconditions and uncertainty, collaborate on root-cause controls, track owners, and prevent recurrence|Retest the original proof plus variants and legitimate behavior; record exact version, evidence, residual risk, and learning|report
45|cryptographic-decisions-not-invention|Cryptographic Decisions, Not Cryptographic Invention|6|choose a maintained high-level construction from the actual threat model|Encoding, hashing, password hashing, MACs, encryption, signatures, and key agreement solve different problems|Developers invent algorithms, compose primitives, encrypt without authentication, or add cryptography without key lifecycle|State asset and attacker, minimize stored sensitive data, choose a standard high-level API, and design key ownership first|Test tampering, wrong key or identity, replay, rotation, failure behavior, and the exact property claimed|crypto
46|randomness-hashes-and-macs|Randomness, Hashes, and MACs|6|use CSPRNGs for secrets and MACs for keyed authenticity|Random identifiers require unpredictability; hashes detect equality or change; MACs prove integrity to parties sharing a key|General PRNGs generate tokens, bare hashes pretend to authenticate, or ordinary equality leaks timing information|Use secrets or Web Crypto randomness, HMAC through maintained APIs, domain-separated messages, and constant-time verification|Estimate entropy, check uniqueness at scale, mutate every message field, use wrong keys, and verify stable rejection|randomness
47|authenticated-encryption|Authenticated Encryption|6|protect confidentiality and integrity with a high-level AEAD interface|AEAD encrypts plaintext and authenticates ciphertext plus unencrypted associated context under one key|Nonce reuse, unauthenticated CBC or CTR, ignored tag failures, and ambiguous envelope formats destroy guarantees|Use AES-GCM or ChaCha20-Poly1305 through maintained libraries, guarantee nonce rules, version envelopes, and bind context as AAD|Test bit flips, wrong AAD, wrong key, truncated data, nonce strategy, version migration, and failure without plaintext release|aead
48|public-keys-signatures-key-agreement|Public Keys, Signatures, and Key Agreement|6|use modern public-key APIs for identity and shared-secret establishment|Signatures provide origin and integrity; key agreement derives shared secrets; public-key encryption is a separate construction|Signing and encryption are confused, public keys lack authenticated distribution, contexts are omitted, or keys never rotate|Use maintained Ed25519 and X25519-style APIs where appropriate, authenticate key identity, separate purposes, and version formats|Verify wrong message, wrong public key, altered context, malformed signature, key rotation, and downgrade behavior|signatures
49|tls-certificates-and-pki|TLS, Certificates, and PKI|6|place authenticated encrypted channels across real termination boundaries|TLS authenticates endpoints and protects transport; certificates bind names to public keys through a trust chain|Clients disable verification, accept wrong hostnames, use obsolete protocols, or assume traffic stays protected after termination|Use modern defaults, verify names and chains, automate certificate renewal, protect termination-to-service hops according to threat|Inspect handshake and certificate chain, test hostname and expiry failures, map plaintext segments, and rehearse renewal|tls
50|key-and-secrets-lifecycle|Key and Secrets Lifecycle|6|design generation, storage, access, rotation, revocation, audit, and destruction together|Keys and credentials are powerful assets whose lifetime and reachable consumers determine blast radius|Secrets live in code, images, logs, broad environment variables, shared accounts, backups, or undocumented manual rotation|Use managed identity and vaults, short-lived scoped credentials, envelope encryption, access audit, ownership metadata, and rotation plans|Inventory consumers, inspect effective access, rotate in a rehearsal, revoke compromised versions, and scan every delivery stage|keys
51|iam-as-executable-authorization|IAM as Executable Authorization|7|read a cloud policy as principal, action, resource, condition, and trust|Identity policies grant actions while resource and trust policies decide who may assume or access across boundaries|Wildcards, long-lived users, confused trust, ignored conditions, and accumulated grants create invisible privilege|Prefer federation and temporary roles, narrow actions and resources, constrain trust and conditions, and apply permission guardrails|Evaluate effective access for intended and unintended principals, cross-account paths, missing conditions, and privilege escalation chains|iam
52|cloud-security-boundaries|Cloud Security Boundaries|7|map control plane, data plane, identity, network, account, and managed-service responsibility|Cloud moves physical operations to a provider but leaves configuration, identity, data, workload, and many network decisions with the customer|Public exposure, metadata credentials, shared accounts, default networks, or misunderstood managed-service boundaries collapse isolation|Separate environments and high-value workloads, use workload identity, restrict public paths, centralize guardrails, and log control-plane changes|Trace an internet request and an administrator change; test public access, cross-account trust, metadata reachability, and data policy|cloud
53|container-hardening|Container Hardening|7|reduce image, runtime, kernel, credential, and supply-chain attack surface|Containers share a host kernel; image contents, runtime privilege, mounts, capabilities, and orchestration identity define containment|Root processes, mutable broad images, Docker socket mounts, host paths, excess capabilities, embedded secrets, and stale packages enable escape or theft|Use minimal pinned images, non-root users, read-only filesystems, dropped capabilities, seccomp, resource limits, and external identity|Inspect image layers and SBOM, run policy checks, attempt writes and privilege use, scan versions, and verify no host credential mounts|container
54|kubernetes-workload-security|Kubernetes Workload Security|7|review a workload across RBAC, pod policy, network, secrets, admission, and identity|A pod combines code, service account, network reach, mounted data, node kernel, and cluster API controls|Default service tokens, broad RBAC, privileged pods, unrestricted egress, plaintext secrets, and untrusted images create pivot paths|Enforce Restricted Pod Security where feasible, least-privilege workload identity, network policy, admission controls, and safe secret delivery|Review manifests and effective RBAC, inspect tokens and mounts, test network paths, policy rejection, image provenance, and namespace boundaries|kubernetes
55|core-appsec-and-security-engineering-capstone|Core AppSec and Security Engineering Capstone|7|integrate the non-AI foundations from phases 0–7 in a production-shaped assessment and interview defense|Before adding AI-specific uncertainty, a security engineer must connect mission, assets, architecture, adversaries, abuse cases, identity, data, infrastructure, layered controls, and evidence|Candidates recite vulnerability lists, jump to products, ignore assumptions, or reach AI security without mastering the ordinary application and platform boundaries underneath it|Drive scope first, draw data and trust, prioritize concrete paths, investigate one deeply, design prevention and containment, and define verification before proceeding to AI systems|Deliver a threat model, safe proof, repair diff, regression evidence, ASVS mapping, concise finding, and spoken design defense that establishes readiness for phase 8|capstone
56|threat-modeling-ai-systems|Threat Modeling AI and LLM Systems|8|map an AI application across interfaces, context, models, supply chain, tools, and infrastructure|An AI system is not one model call; behavior emerges from the model, harness, context sources, tools, identities, data stores, providers, and execution environment|Teams threat-model only the chat endpoint and miss poisoned retrieval, model artifacts, tool authority, provider retention, credentials, and costly infrastructure|Draw every prompt and data flow, label untrusted content separately from instructions, inventory model and artifact provenance, and bind each tool to a scoped identity|Walk one sensitive asset through interface, context, model, tool, provider, storage, logging, and failure paths; map threats to concrete controls and tests|datadog_ai
57|direct-and-indirect-prompt-injection|Direct and Indirect Prompt Injection|8|distinguish user intent from untrusted instructions embedded in content and contain manipulation impact|Prompt injection is a social-engineering attack on the model: direct input or third-party content attempts to influence decisions beyond the user's authorized intent|A system assumes instruction hierarchy alone reliably separates commands from data, treats retrieved text as trusted, or gives manipulated output immediate authority|Label provenance, isolate untrusted content, constrain available data and actions, require policy checks outside the model, and place approval before consequential effects|Seed direct and indirect attacks across documents, webpages, tool results, encodings, and multi-turn context; measure unauthorized action or disclosure rather than refusal wording|openai_prompt
58|agent-tools-mcp-and-excessive-agency|Agent Tools, MCP, and Excessive Agency|8|turn model-proposed actions into ordinary authenticated and authorized transactions|A model may propose a tool call, but it is neither the resource owner nor the authority that may approve consequences|Tools inherit broad ambient credentials, accept underspecified arguments, trust model-selected destinations, pass tokens through MCP, or execute irreversible calls without review|Expose narrow typed tools, use workload and user delegation correctly, authorize every call and argument, constrain destinations and budgets, and pause for meaningful approval|Generate mistaken and injected tool proposals; assert least-privilege identity, audience validation, argument policy, idempotency, approval binding, and complete audit evidence|mcp_security
59|rag-security-retrieval-poisoning-and-access|RAG Security: Retrieval, Poisoning, and Access|8|preserve source authorization and provenance from ingestion through retrieval and answer generation|RAG moves external documents into model context; retrieval relevance never implies trust, permission, freshness, or factual authority|Pipelines index secrets or hostile instructions, lose tenant ACLs in vector search, trust stale chunks, or let cited content request tools and external disclosure|Authorize before ingestion and again at retrieval, retain source and tenant metadata, isolate untrusted instructions, rank with trust signals, and make citations inspectable|Use two tenants plus a poisoned document; test ingestion policy, filtered retrieval, stale deletion, citation accuracy, instruction isolation, and answer behavior when evidence conflicts|owasp_llm
60|model-output-is-untrusted|Model Output Is Untrusted Application Input|8|validate and safely consume model output before rendering, executing, or making decisions|Model output is probabilistic untrusted data even when the prompt, model, and provider are trusted|Applications render output as HTML, interpolate it into SQL or shell commands, deserialize invented fields, or treat confident text as an approved business decision|Use constrained schemas, deterministic parsers, contextual output handling, domain validation, and explicit authority for every downstream effect|Return malformed, adversarial, oversized, semantically invalid, and high-confidence false outputs; verify rejection, safe rendering, fallback, and no partial effect|owasp_llm
61|sensitive-data-privacy-and-memory|Sensitive Data, Privacy, and Memory|8|minimize which data enters prompts, providers, traces, retrieval stores, memory, and outputs|LLM applications duplicate data across context, embeddings, caches, traces, feedback, provider retention, conversation state, and tool results|Secrets and personal data enter prompts by default, cross tenant boundaries, persist indefinitely, appear in logs, or escape through model and tool output|Classify and minimize data before context assembly, enforce tenant-scoped retrieval, redact telemetry, choose provider retention deliberately, expire memory, and control egress|Plant synthetic secrets and canaries across each storage and context path; inspect provider settings, logs, caches, deletion, cross-user retrieval, and response filters|openai_data
62|guardrails-as-layered-controls|Guardrails as Layered Controls|8|design input, context, tool, and output guardrails with explicit failure costs and bypass assumptions|Guardrails are fallible classifiers or deterministic policies placed at particular boundaries; they reduce risk but do not grant authorization or prove safety|One prompt filter is marketed as complete protection, guardrails share the attacked model's assumptions, fail open, block legitimate users, or omit tool calls and retrieved content|Layer deterministic policy with specialized classifiers, run checks at every privileged boundary, fail safely, preserve appeal and fallback paths, and limit blast radius independently|Measure attack success, false blocks, latency, cost, coverage, fail-open behavior, adaptive variants, and the effect of removing each layer|openai_guardrails
63|security-evals-and-red-teaming|Security Evals and Red Teaming|8|build a threat-driven evaluation set and release gate for AI security controls|AI behavior varies by model, prompt, context, tools, sampling, and attacker adaptation; anecdotes cannot establish a dependable control|Teams celebrate one blocked jailbreak, use only static public prompts, leak the test set into development, ignore utility regressions, or report aggregate accuracy without failure cost|Define system-specific abuse outcomes, create held-out and adaptive cases, label with clear rubrics, run repeated trials, segment results, and gate changes on risk thresholds|Track attack success rate, false-positive rate, severity-weighted loss, tool-policy violations, data leakage, utility, latency, and confidence intervals across versions|openai_evals
64|ai-supply-chain-models-data-and-code|AI Supply Chain: Models, Data, and Code|8|establish provenance and safe loading for models, datasets, prompts, packages, and generated dependencies|AI supply chains include executable model formats, training and evaluation data, adapters, prompts, libraries, registries, and generated code|Hallucinated packages are installed, pickle-like models execute on load, datasets are poisoned, public registries impersonate organizations, or mutable artifacts evade scanners|Use approved registries, immutable digests, signatures and provenance, safe formats, isolated inspection, dataset lineage and sanitization, dependency review, and behavioral baselines|Rebuild from declared inputs, verify digest and signer, load artifacts without code execution, plant poisoned rows, compare behavior, and rehearse revocation and rollback|mitre_atlas
65|ai-infrastructure-credentials-and-resource-abuse|AI Infrastructure, Credentials, and Resource Abuse|8|secure model endpoints and compute against credential theft, LLM jacking, discovery, denial, and cost amplification|AI workloads combine valuable credentials, expensive inference, public APIs, GPU clusters, vector stores, model services, and emerging orchestration components|Long-lived keys leak through notebooks and containers, public clusters expose secrets, attackers discover model APIs with valid calls, or unbounded prompts consume cost and capacity|Use temporary workload identity, private and authenticated control planes, least privilege, per-actor budgets, size and time limits, egress controls, inventory, and anomaly detection|Test stolen-key blast radius, unusual model invocation parameters, quota dimensions, cancellation, queue pressure, cost alarms, public exposure, and credential rotation|datadog_ai
66|ai-observability-detection-and-response-evidence|AI Observability and Security Evidence|8|trace prompts, retrieval, model decisions, guardrails, tools, identities, cost, and outcomes without leaking sensitive content|Security-relevant AI behavior spans multiple probabilistic and deterministic steps; isolated application logs cannot reconstruct cause or consequence|Telemetry records raw secrets but omits provenance, tool arguments, policy decisions, model versions, latency, cost, user identity, or cross-service correlation|Emit privacy-aware structured traces with stable run and tool-call identifiers, content fingerprints, source provenance, policy results, model configuration, cost, and outcome|Reconstruct a synthetic injection from entry through retrieval and blocked tool call; confirm evidence supports detection, triage, replay, and control tuning without exposing payload data|datadog_interfaces
67|secure-ai-architecture-capstone|Secure AI Architecture Capstone|8|threat-model, attack safely, harden, evaluate, and defend a production-shaped RAG agent|A trustworthy AI application combines ordinary AppSec with model uncertainty, untrusted context, probabilistic guardrails, powerful tools, provider boundaries, and continuous evaluation|A polished demo ships with broad data and tool access, undocumented artifacts, no adversarial tests, raw prompt logs, weak budgets, and no safe degradation path|Apply the full course: scoped identities, authorized retrieval, provenance, isolated context, policy-gated tools, approvals, structured output, data minimization, observability, and eval release gates|Deliver an architecture and data-flow model, threat register, deterministic sandbox proof, control implementation, adaptive eval report, residual-risk decision, and interview defense|nist_ai
`;

const lessons = raw.trim().split("\n").map((line) => {
  const [id, slug, title, phase, skill, model, failure, control, verify, source] = line.split("|");
  return { id: Number(id), slug, title, phase: Number(phase), skill, model, failure, control, verify, source };
});

const phases = [
  "The Security Lens", "Server-Side Vulnerability Mechanics", "Identity, Sessions, and Authorization",
  "Browser and Client-Side Security", "API and Production Application Security",
  "Secure Delivery and Verification", "Practical Cryptography for Builders",
  "Cloud, Containers, Secure Architecture, and Interviews", "AI and LLM Security Engineering"
];

const lessonOne = { id: 1, slug: "security-is-policy-under-pressure", title: "Security Is a Policy Under Pressure", phase: 0 };
const all = [lessonOne, ...lessons];
const filename = (lesson) => String(lesson.id).padStart(2, "0") + "-" + lesson.slug + ".html";
const esc = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

function labBlock(lesson) {
  const primary = sources[lesson.source];
  if (lesson.id === 2) {
    return `<div class="safety"><span class="callout-label">Authorized lab · exact local scope</span><p><strong>Permitted target:</strong> exactly <code>http://127.0.0.1:8765/</code>. <strong>Permitted action:</strong> ordinary GET requests with curl. <strong>Prohibited:</strong> every other host, address, and port. <strong>Stop:</strong> after recording one 200 response and one connection failure after shutdown.</p></div>
    <pre><code># Terminal 1 — start a loopback-only, non-vulnerable observation target
python3 -m http.server 8765 --bind 127.0.0.1 --directory .

# Terminal 2 — make the scoped request and retain status/headers only
curl --fail --show-error --verbose http://127.0.0.1:8765/

# Terminal 1 — cleanup
Ctrl-C

# Terminal 2 — verify cleanup; this command should fail to connect
curl --max-time 2 http://127.0.0.1:8765/</code></pre>
    <p>Before the first command, copy the scope card from <a href="../LABS.md">LABS.md</a> and fill every field. Resolve the literal target before sending. If you change the target, the authorization no longer follows automatically.</p>`;
  }
  if (academyLabs.has(lesson.id)) {
    const academy = academyLabs.get(lesson.id);
    return `<div class="safety"><span class="callout-label">Authorized lab · hosted sandbox</span>
    <p><strong>Permitted target:</strong> only the disposable lab instance launched from <a href="${academy[1]}">${academy[0]}</a>. <strong>Objective:</strong> demonstrate the lesson's failure with the smallest harmless proof. <strong>Stop:</strong> once the lab's synthetic marker or intended state change proves the issue. Do not reuse payloads against any other host.</p></div>
    <ol><li>Launch an Apprentice-level lab for this topic and record its unique host in a scope card.</li><li>Capture one legitimate baseline request. Predict the exact field or state transition to change.</li><li>Make one controlled change and explain the resulting policy violation.</li><li>Read the remediation guidance, state the root-cause repair, and write one regression test in pseudocode.</li><li>End the lab instance and retain only sanitized notes—no tokens or cookies.</li></ol>`;
  }
  if (lesson.phase === 8) {
    return `<div class="safety"><span class="callout-label">Authorized AI lab · deterministic sandbox</span>
    <p><strong>Scope:</strong> only the synthetic scenario and browser widget on this page, plus files you create specifically for it. Use fake tenants, canary secrets, documents, identities, and tool effects. <strong>Prohibited:</strong> real provider credentials, third-party agents, live inboxes, production vector stores, and external tool targets. <strong>Stop:</strong> when the synthetic security outcome and its policy decision are observable.</p></div>
    <ol><li>Write the user-authorized goal, protected asset, untrusted content sources, and permitted effects.</li><li>Run the legitimate case and record the expected model proposal and deterministic policy result.</li><li>Introduce one synthetic adversarial variable—prompt, retrieved content, tool argument, artifact, credential, or quota—and predict the violated invariant.</li><li>Apply the lesson control outside the model where enforcement is required; rerun allowed, denied, and failure cases.</li><li>Preserve only sanitized test inputs, decision traces, metrics, and the regression. Delete transient prompts and synthetic secrets when finished.</li></ol>`;
  }
  return `<div class="safety"><span class="callout-label">Practice · code or design microscope</span>
    <p><strong>Scope:</strong> the synthetic scenario on this page and files you create specifically for it. Do not point tools at third-party hosts. <strong>Stop:</strong> when one piece of evidence proves or disproves the stated invariant.</p></div>
    <ol><li>Write the intended invariant in one sentence.</li><li>Construct one valid case and one adversarial or boundary case.</li><li>Trace the decision to the authoritative component; do not rely on UI behavior.</li><li>Apply the control, rerun both cases, and preserve the denied-case regression.</li></ol>`;
}

function implementationBlock(lesson) {
  const examples = {
    8: `<h3>Python: structure stays fixed</h3><pre><code># Vulnerable: SQL syntax is assembled from input
query = f"SELECT id, owner_id FROM notes WHERE id = {note_id}"

# Safe value binding with sqlite3
row = db.execute(
    "SELECT id, owner_id FROM notes WHERE id = ? AND owner_id = ?",
    (note_id, caller_id),
).fetchone()</code></pre><p>Binding protects value grammar; including <code>owner_id</code> in the authoritative query also enforces the object invariant.</p>`,
    9: `<h3>Python: remove the shell</h3><pre><code>import subprocess

# Fixed executable, separate argument, shell disabled by default.
result = subprocess.run(
    ["/usr/bin/file", "--brief", uploaded_path],
    check=True, capture_output=True, text=True, timeout=2,
)</code></pre><p>The remaining work is semantic path confinement and process privilege; an argument array is necessary, not sufficient.</p>`,
    18: `<h3>Python: maintained Argon2 interface</h3><pre><code>python3 -m venv .venv
. .venv/bin/activate
python -m pip install argon2-cffi

from argon2 import PasswordHasher
hasher = PasswordHasher()
stored = hasher.hash(password)
hasher.verify(stored, candidate)
if hasher.check_needs_rehash(stored):
    stored = hasher.hash(candidate)</code></pre><p>The encoded record carries salt and parameters. Tune work factors for your deployment and follow the library's upgrade guidance.</p>`,
    20: `<h3>Bind identity inside the data access</h3><pre><code>def get_note(db, note_id: int, caller_id: int):
    return db.execute(
        "SELECT * FROM notes WHERE id = ? AND owner_id = ?",
        (note_id, caller_id),
    ).fetchone()</code></pre><p>A missing row intentionally does not reveal whether another owner's object exists. Centralize this path instead of remembering a separate check in every handler.</p>`,
    26: `<h3>JavaScript: choose a non-executing sink</h3><pre><code>// Text, not markup. The browser creates one text node.
resultElement.textContent = untrustedDisplayName;

// If intentionally allowing HTML, use a maintained sanitizer
// with a narrow policy before assigning to an HTML sink.</code></pre><p>Framework escaping protects its normal template path; review escape hatches and direct DOM manipulation separately.</p>`,
    35: `<h3>Python: verify exact bytes before parsing</h3><pre><code>import hashlib, hmac

expected = hmac.new(webhook_key, raw_body, hashlib.sha256).hexdigest()
if not hmac.compare_digest(expected, supplied_signature):
    raise Unauthorized()
# Then validate timestamp, deduplicate event id, parse, and apply idempotently.</code></pre><p>Use the provider's documented envelope and signature scheme; do not invent a compatible-looking variant.</p>`,
    46: `<h3>Python and browser CSPRNGs</h3><pre><code># Python bearer token
import secrets
token = secrets.token_urlsafe(32)

// Browser bytes
const bytes = new Uint8Array(32);
crypto.getRandomValues(bytes);</code></pre><p>Do not use language simulation/game PRNGs for credentials. Decide the required entropy and encoding independently.</p>`,
    47: `<h3>Python: high-level AEAD</h3><pre><code>python -m pip install cryptography

import os
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
key = AESGCM.generate_key(bit_length=256)
nonce = os.urandom(12)  # must never repeat under this key
ciphertext = AESGCM(key).encrypt(nonce, plaintext, associated_data)
recovered = AESGCM(key).decrypt(nonce, ciphertext, associated_data)</code></pre><p>Store a versioned envelope containing nonce and ciphertext; keep the key in a managed key boundary, not beside the record.</p>`,
    48: `<h3>Python: Ed25519 signing and verification</h3><pre><code>from cryptography.hazmat.primitives.asymmetric.ed25519 import Ed25519PrivateKey
private_key = Ed25519PrivateKey.generate()
public_key = private_key.public_key()
signature = private_key.sign(message)
public_key.verify(signature, message)  # raises on failure</code></pre><p>Public-key distribution and purpose separation are part of the design; correct math cannot authenticate an untrusted public key.</p>`,
    49: `<h3>Inspect the actual TLS endpoint</h3><pre><code>openssl s_client -connect example.com:443 \\
  -servername example.com -verify_hostname example.com \\
  -verify_return_error &lt;/dev/null</code></pre><p>Use only a host you operate or a public documentation target for ordinary handshake inspection. Record the verified name, issuer chain, protocol, and termination point.</p>`,
    51: `<h3>Read policy as a five-part sentence</h3><pre><code>{
  "Effect": "Allow",
  "Action": "s3:GetObject",
  "Resource": "arn:aws:s3:::reports/tenant-42/*",
  "Condition": {"Bool": {"aws:SecureTransport": "true"}}
}</code></pre><p>Complete the sentence with the principal and trust policy. Then search for other statements whose union expands effective access.</p>`,
    53: `<h3>Container baseline</h3><pre><code>FROM python:3.12-slim
RUN useradd --create-home --uid 10001 app
WORKDIR /app
COPY --chown=app:app . .
USER 10001
CMD ["python", "-m", "service"]</code></pre><p>At runtime, add a read-only filesystem, dropped capabilities, resource limits, and no host or credential mounts. Pin and update the base image through policy.</p>`,
    54: `<h3>Kubernetes workload baseline</h3><pre><code>securityContext:
  runAsNonRoot: true
  seccompProfile: {type: RuntimeDefault}
containers:
- name: api
  securityContext:
    allowPrivilegeEscalation: false
    readOnlyRootFilesystem: true
    capabilities: {drop: ["ALL"]}
automountServiceAccountToken: false</code></pre><p>Add resource limits, Restricted Pod Security enforcement, workload-specific RBAC, network policy, and external secret delivery according to the threat model.</p>`
    ,57: `<h3>Keep policy outside the prompt</h3><pre><code>context = {
    "user_goal": verified_user_goal,
    "untrusted_documents": retrieved_chunks,
    "allowed_actions": policy.allowed_actions(caller),
}
proposal = model.generate(context)
decision = policy.authorize(caller, proposal.tool, proposal.arguments)
if not decision.allowed:
    raise PolicyDenied(decision.reason)</code></pre><p>Delimiters and provenance labels help the model reason, but the deterministic policy gateway—not the model—owns authorization.</p>`,
    58: `<h3>Bind approval to the exact proposed effect</h3><pre><code>proposal = ToolCall(name="send_email", args={"to": target, "body": body})
policy.check_schema_destination_and_budget(caller, proposal)
approval = approvals.require(caller, proposal.digest())
tool_identity = identities.issue_scoped("email.send", target, ttl_seconds=60)
result = tools.execute(proposal, identity=tool_identity, approval=approval)</code></pre><p>Changing tool, arguments, target, or expiry invalidates approval. MCP transport authorization does not replace application authorization.</p>`,
    59: `<h3>Filter retrieval before model context</h3><pre><code>chunks = vector_store.search(query, filters={
    "tenant_id": caller.tenant_id,
    "classification": {"$in": caller.allowed_classes},
    "deleted": False,
})
context = [UntrustedEvidence(text=c.text, source=c.source, acl=c.acl)
           for c in chunks]</code></pre><p>Never retrieve globally and ask the model to hide forbidden chunks. Authorization belongs in the retrieval query and source system.</p>`,
    60: `<h3>Parse structure, then authorize meaning</h3><pre><code>class RefundProposal(BaseModel):
    order_id: int
    amount_cents: int = Field(ge=1, le=50_000)

proposal = RefundProposal.model_validate_json(model_output)
order = orders.get_owned(proposal.order_id, caller.id)
policy.require_refund_allowed(caller, order, proposal.amount_cents)
# Consequential execution remains a separate approved transaction.</code></pre><p>A schema rejects malformed output; domain policy rejects well-formed but unauthorized output.</p>`,
    61: `<h3>Minimize before context assembly</h3><pre><code>safe_record = {
    "case_id": case.id,
    "category": case.category,
    "summary": redact(case.free_text),
}
trace.record(metadata={"case_id": case.id}, content_hash=sha256_json(safe_record))
response = provider.generate(safe_record, store=False)</code></pre><p>Provider flags are only one boundary. Inventory caches, traces, files, feedback stores, vector databases, and session memory separately.</p>`,
    62: `<h3>Layer controls around the privileged effect</h3><pre><code>input_result = input_classifier.check(user_and_retrieved_content)
proposal = model.generate(input_result.labeled_context)
tool_policy.require_allowed(caller, proposal.tool, proposal.arguments)
result = tool.execute(proposal)
safe_output = output_policy.validate_and_redact(result)</code></pre><p>Each layer needs a defined owner, fallback, latency budget, telemetry, and adversarial evaluation. A classifier score is not permission.</p>`,
    63: `<h3>Version the system and the threat set</h3><pre><code>{"id":"indirect-017","source":"retrieved_document",
 "goal":"no external send","severity":5,"expected":"blocked_before_tool"}

metrics = {
  "attack_success_rate": harmful_effects / attack_trials,
  "false_block_rate": blocked_legitimate / legitimate_trials,
  "severity_weighted_loss": weighted_failures / trials,
}</code></pre><p>Store prompts, harness, model snapshot, tools, policies, scorers, seeds, and dataset version so a regression can be reproduced.</p>`,
    64: `<h3>Promote immutable artifacts</h3><pre><code>artifact = registry.resolve("model@sha256:&lt;digest&gt;")
verify_signature(artifact, trusted_signers)
verify_manifest(artifact, approved_license_and_format_policy)
with isolated_no_network_loader() as loader:
    inspected = loader.inspect_without_executable_deserialization(artifact)
behavioral_gate.compare(inspected, approved_baseline)</code></pre><p>Scanning complements—but does not replace—identity, provenance, safe formats, isolated loading, and behavioral evaluation.</p>`,
    65: `<h3>Budget every amplification dimension</h3><pre><code>budget.require(caller, requests=1, input_tokens=input_tokens,
               output_tokens=max_output, tool_calls=max_tools,
               wall_seconds=deadline, estimated_cost=cost)
credential = workload_identity.issue(audience=model_endpoint, ttl=300)
response = gateway.invoke(model, credential, timeout=deadline)</code></pre><p>Per-IP request limits alone miss token, tool, concurrency, storage, third-party spend, and recursive-agent amplification.</p>`,
    66: `<h3>Record decisions, not raw secrets</h3><pre><code>trace.event("tool_policy", run_id=run_id, call_id=call_id,
            principal=caller.id, tool=proposal.name,
            args_fingerprint=sha256_json(proposal.args),
            decision=decision.code, model_version=model_version,
            prompt_template_version=prompt_version)</code></pre><p>Use access-controlled content sampling only when justified. Correlation and provenance usually matter more than logging entire prompts.</p>`,
    67: `<h3>Capstone release gate</h3><pre><code>release = all([
    threat_model.high_risks_have_owners_and_tests(),
    retrieval.tenant_isolation_suite_passes(),
    tools.policy_and_approval_suite_passes(),
    evals.attack_success_rate &lt;= accepted_asr,
    evals.false_block_rate &lt;= accepted_fbr,
    rollback.rehearsed,
])</code></pre><p>Thresholds are explicit residual-risk decisions owned by people—not proof that the agent is universally safe.</p>`
  };
  return examples[lesson.id] ? `<h2>Production implementation shape</h2>${examples[lesson.id]}` : "";
}

const aiNodes = {
  56: [["actor","User / attacker","direct intent","untrusted"],["interface","AI interface","prompt assembly",""],["context","Context / RAG","mixed provenance","untrusted"],["model","Model + harness","probabilistic decision",""],["effect","Tools / infrastructure","real authority","privileged"]],
  57: [["actor","User or document","direct / indirect input","untrusted"],["interface","Context builder","instruction + data",""],["context","Retrieved content","untrusted evidence","untrusted"],["model","Model","influence target",""],["effect","Tool or disclosure","security impact","privileged"]],
  58: [["actor","Model proposal","not authorization","untrusted"],["interface","Tool gateway","typed request",""],["context","Policy + approval","user intent",""],["model","Scoped identity","short-lived authority",""],["effect","Target system","consequence","privileged"]],
  59: [["actor","Source content","tenant + provenance","untrusted"],["interface","Ingestion","classify + authorize",""],["context","Vector store","scoped chunks",""],["model","Retriever + model","evidence, not commands",""],["effect","Answer / tools","cited outcome","privileged"]],
  60: [["actor","Model output","untrusted bytes","untrusted"],["interface","Schema parser","shape validation",""],["context","Domain policy","semantic validation",""],["model","Safe renderer","contextual handling",""],["effect","Application effect","explicit authority","privileged"]],
  61: [["actor","Sensitive source","minimize first","untrusted"],["interface","Context builder","tenant boundary",""],["context","Provider + model","retention choice",""],["model","Memory + traces","expiry + redaction",""],["effect","Output / egress","disclosure boundary","privileged"]],
  62: [["actor","Input","user + content","untrusted"],["interface","Input guardrail","classify / constrain",""],["context","Model + context","still fallible",""],["model","Tool guardrail","policy before effect",""],["effect","Output guardrail","safe delivery","privileged"]],
  63: [["actor","Threat cases","held-out attacks","untrusted"],["interface","System under test","versioned stack",""],["context","Scorers","rubric + labels",""],["model","Metrics","ASR + false blocks",""],["effect","Release gate","risk decision","privileged"]],
  64: [["actor","Model / data / code","external artifact","untrusted"],["interface","Registry","identity + provenance",""],["context","Build / load","safe inspection",""],["model","Runtime baseline","behavior drift",""],["effect","Deployment","signed promotion","privileged"]],
  65: [["actor","Credential / request","cost authority","untrusted"],["interface","AI gateway","auth + budgets",""],["context","Model service","expensive compute",""],["model","Agent runtime","tools + egress",""],["effect","Cloud resources","blast radius","privileged"]],
  66: [["actor","Prompt / content","fingerprinted","untrusted"],["interface","Model + retrieval spans","correlated run",""],["context","Guardrail decisions","reason + score",""],["model","Tool calls","identity + arguments",""],["effect","Signals / outcome","response evidence","privileged"]],
  67: [["actor","Actors + data","assets and intent","untrusted"],["interface","RAG + model","isolated context",""],["context","Policy gateway","guardrails + authz",""],["model","Tools","scoped + approved",""],["effect","Evidence + evals","release decision","privileged"]]
};

function aiSupplement(lesson) {
  if (lesson.phase !== 8) return "";
  const special = lesson.id === 57 ? `<h2>Sandbox: watch indirect injection cross the boundary</h2><div id="prompt-lab"></div>`
    : lesson.id === 58 ? `<h2>Sandbox: policy-gate an agent tool call</h2><div id="tool-lab"></div>`
    : lesson.id === 63 ? `<h2>Sandbox: tune a guardrail against measured failure costs</h2><div id="eval-lab"></div>` : "";
  return `<h2>AI system attack path</h2><p>Step through the full application, not only the model. Dashed nodes contain attacker-influenced content; purple nodes can create real-world consequences.</p><div id="ai-flow"></div>${special}`;
}

function aiInit(lesson) {
  if (lesson.phase !== 8) return "";
  const nodes = aiNodes[lesson.id].map(([id,label,detail,kind]) => ({id,label,detail,kind}));
  const steps = [
    {at:nodes[0].id,caption:"Start with actor capability and provenance. Natural language, documents, model artifacts, and tool results can all carry adversarial influence."},
    {at:nodes[1].id,caption:"The application harness assembles context and makes deterministic choices. This layer is ordinary software and owns enforceable policy."},
    {at:nodes[2].id,caption:"Context may be relevant without being trusted, authorized, current, or safe to treat as instructions."},
    {at:nodes[3].id,violated:nodes[3].id,caption:lesson.failure + "."},
    {at:nodes[4].id,caption:"Impact appears only when output reaches data, a tool, a person, compute, or another security boundary."},
    {at:nodes[2].id,caption:lesson.control + ". Verification: " + lesson.verify + "."}
  ];
  const special = lesson.id === 57 ? `renderPromptInjectionLab("prompt-lab");`
    : lesson.id === 58 ? `renderToolPolicyLab("tool-lab");`
    : lesson.id === 63 ? `renderEvalLab("eval-lab");` : "";
  return `renderAIPipeline("ai-flow", ${JSON.stringify({nodes,steps})});${special}`;
}

function companionReading(lesson) {
  const companions = {
    56: [sources.nist_ai, sources.anthropic_agents],
    57: [sources.anthropic_prompt],
    58: [sources.openai_agents],
    62: [sources.anthropic_prompt],
    63: [sources.anthropic_agents, sources.mitre_atlas],
    65: [["Datadog AI Security Best Practices ebook (supplied)", "/Users/abineetsingh/Documents/eBook-AISecurityBestPractices.pdf"]],
    67: [sources.anthropic_agents]
  };
  const items = companions[lesson.id] || [];
  return items.length ? `<p><strong>Companion source${items.length > 1 ? "s" : ""}:</strong> ${items.map(([label, url]) => `<a href="${url}">${label}</a>`).join(" · ")}</p>` : "";
}

function checkpointNote(lesson) {
  if (lesson.id !== 55) return "";
  return `<div class="note"><span class="callout-label">Phases 0–7 checkpoint</span><p>This is the integration capstone for core application security and security engineering—not the end of the course. Complete it before Phase 8 so AI-specific risks build on established authorization, tenant isolation, cryptography, supply-chain, IAM, cloud, container, and verification skills. Lesson 67 is the final whole-course capstone.</p></div>`;
}

function quiz(lesson, previous, index) {
  const reviewLesson = previous.id === 1 ? lesson : lessons[Math.max(0, index - 1)];
  return `renderQuiz("quiz", [
  { prompt: ${JSON.stringify("Model — " + lesson.model + ". What should you identify next?")}, options: ["Locate the authoritative decision and write its invariant", "Choose a scanner and accept its default severity", "Hide the feature and trust ordinary client behavior", "Add encryption before mapping assets and attacker capabilities"], answer: 0, explain: ${JSON.stringify("The model becomes actionable only when its invariant and authoritative decision are explicit. " + lesson.failure + ".")} },
  { prompt: ${JSON.stringify("Failure — " + lesson.failure + ". Which response addresses the root cause?")}, options: ["Remove the unsafe transition at its authoritative boundary", "Block the demonstrated string at the outer proxy", "Document the risk and rely on careful operators", "Increase logging while preserving the same vulnerable behavior"], answer: 0, explain: ${JSON.stringify(lesson.control + ". Root-cause repair outlives one payload or interface.")} },
  { prompt: ${JSON.stringify("Control — " + lesson.control + ". What evidence should close the work?")}, options: ["Test allowed denied sibling and exceptional behavior together", "Confirm only the original proof now returns failure", "Verify new validation code appears during review today", "Trust the scanner when its warning disappears completely"], answer: 0, explain: ${JSON.stringify(lesson.verify + ". Closure needs behavioral evidence plus preserved legitimate use.")} },
  { prompt: ${JSON.stringify("Spaced review — " + reviewLesson.title + ": " + reviewLesson.verify + ". What kind of evidence is this?")}, options: ["Verification tests behavior across adversarial boundary conditions explicitly", "Prevention removes one exact payload from incoming requests", "Containment replaces all root-cause engineering work permanently today", "Detection proves the vulnerability can never recur again"], answer: 0, explain: "Verification challenges the claimed property under allowed, denied, variant, and failure conditions; it does not merely inspect implementation." }
]);`;
}

function renderLesson(lesson, index) {
  const prev = all[index];
  const next = all[index + 2];
  const source = sources[lesson.source];
  const phase = phases[lesson.phase];
  const prevLink = `<a rel="prev" href="${filename(prev)}">← ${String(prev.id).padStart(2, "0")} ${esc(prev.title)}</a>`;
  const nextLink = next ? `<a rel="next" href="${filename(next)}">${String(next.id).padStart(2, "0")} ${esc(next.title)} →</a>` : `<a href="../00-table_of_contents.html">Course complete</a>`;
  const phaseResource = lesson.phase === 8 ? ` · <a href="../reference/ai-security-runbook.html">AI security runbook</a>` : "";
  const nodes = lesson.phase <= 1 ? ["Untrusted input", "Application decision", "Protected asset"]
    : lesson.phase <= 4 ? ["Actor or client", "Policy boundary", "Authoritative state"]
    : ["Engineering change", "Security control", "Verification evidence"];

  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Lesson ${String(lesson.id).padStart(2, "0")} — ${esc(lesson.title)}</title>
<link rel="stylesheet" href="../assets/course.css"><link rel="stylesheet" href="../assets/secviz.css">${lesson.phase === 8 ? '<link rel="stylesheet" href="../assets/aiviz.css">' : ""}</head><body><main>
<span class="kicker">Lesson ${String(lesson.id).padStart(2, "0")} · ~30 minutes · Phase ${lesson.phase} · ${esc(phase)}</span>
<h1>${esc(lesson.title)}</h1><p class="lede">One skill, learned today: ${esc(lesson.skill)}.</p>
<div class="mission"><span class="callout-label">Mission connection</span><p>This skill supports both sides of the mission: explain the security decision clearly under interview pressure, then apply it to production software in a way that survives different clients, frameworks, and deployment stacks.</p></div>
${checkpointNote(lesson)}

<h2>The security model</h2><p>${esc(lesson.model)}.</p>
<table><tr><th>Question</th><th>Answer to make explicit</th></tr>
<tr><td>What must remain true?</td><td>Write one observable invariant before choosing a tool or payload.</td></tr>
<tr><td>Where is it decided?</td><td>Name the component holding authoritative identity, state, or key material.</td></tr>
<tr><td>What can the adversary vary?</td><td>List reachable inputs, ordering, timing, identity, dependencies, and failure paths.</td></tr>
<tr><td>What proves the control?</td><td>Keep legitimate behavior passing and adversarial behavior failing for the intended reason.</td></tr></table>

<h2>The failure pattern</h2><p>${esc(lesson.failure)}.</p>
<div class="note"><span class="callout-label">Root-cause question</span><p>Do not ask only “which payload works?” Ask: <em>which trusted interpretation, policy decision, state transition, or authority changed because of attacker-controlled data or timing?</em> That answer transfers across Python, JavaScript, web, mobile-backed APIs, services, and cloud platforms.</p></div>

<h2>Watch the decision cross its boundary</h2><div id="flow"></div>
${aiSupplement(lesson)}

<h2>Design the durable control</h2><p>${esc(lesson.control)}.</p>
<p>Prefer controls that make the safe path easy and centralized. Prevention addresses the root transition; containment limits blast radius if prevention fails; detection makes unexpected use visible. These layers should fail independently rather than repeat the same assumption three times.</p>
${implementationBlock(lesson)}

<h2>Verify instead of believing</h2><p>${esc(lesson.verify)}.</p>
<pre><code># Security regression shape
assert legitimate_case().allowed
assert adversarial_case().denied_for_expected_reason
assert sibling_path_case().preserves_same_invariant
assert failure_path_case().fails_safely</code></pre>

<h2>Practice the complete loop</h2>${labBlock(lesson)}

<h2>Check yourself</h2><p>Retrieve the model before selecting an answer. Options are shuffled; explanations complete the feedback loop.</p><div id="quiz"></div>

<h2>Go deeper</h2><p>Primary source: <a href="${source[1]}">${source[0]}</a>. Read the overview and defensive guidance now; use advanced exploitation material only inside its explicit training scope.</p>${companionReading(lesson)}
<footer class="lesson-footer">
  <nav class="lesson-nav" aria-label="Lesson navigation"><p>${prevLink} · <a href="../00-table_of_contents.html">Table of contents</a> · <a href="../CURRICULUM.md">Curriculum</a>${phaseResource} · ${nextLink}</p></nav>
  <p>Questions or something unclear? Ask your teacher before moving on.</p>
  <p class="authorship">Authored by: Abineet Singh | July 2026</p>
</footer>

<script src="../assets/quiz.js"></script><script src="../assets/secviz.js"></script>${lesson.phase === 8 ? '<script src="../assets/aiviz.js"></script>' : ""}<script>
renderSecurityFlow("flow", { boundary: "authoritative security boundary", nodes: [
  {id:"input",label:"${nodes[0]}",detail:"adversary can influence"},{id:"decision",label:"${nodes[1]}",detail:"policy must be explicit"},{id:"asset",label:"${nodes[2]}",detail:"impact becomes real"}], steps: [
  {at:"input",packet:"baseline case",caption:"Begin with intended behavior and record the actor, input, state, and expected result."},
  {at:"decision",packet:"trusted interpretation",position:"middle",caption:"Trace where raw input becomes a parsed value, identity, policy decision, state transition, or privileged operation."},
  {at:"asset",packet:"intended result",position:"end",caption:"The baseline preserves the invariant and reaches the protected asset only under allowed conditions."},
  {at:"input",packet:"adversarial variation",attack:true,caption:"Change one capability at a time: value, encoding, identity, order, timing, dependency response, or failure path."},
  {at:"decision",violated:"decision",packet:"policy violation",position:"middle",attack:true,caption:${JSON.stringify(lesson.failure + ".")}},
  {at:"decision",packet:"control + evidence",position:"middle",caption:${JSON.stringify(lesson.control + ". Verification: " + lesson.verify + ".")}}
]});
${aiInit(lesson)}
${quiz(lesson, prev, index)}
</script></main></body></html>`;
}

fs.mkdirSync(path.join(root, "lessons"), { recursive: true });
lessons.forEach((lesson, index) => {
  fs.writeFileSync(path.join(root, "lessons", filename(lesson)), renderLesson(lesson, index));
});

const labReadme = `# Course Lab Workspace\n\nHands-on lessons use a disposable PortSwigger Web Security Academy instance, a course-owned loopback sandbox, or a synthetic code/design microscope created solely for the lesson. Phase 8 AI labs are deterministic browser simulations with synthetic data: they do not require provider API keys or live models. Follow [../LABS.md](../LABS.md) for authorization, stop, repair, evidence, and cleanup rules.\n\n## Local observation server\n\nLesson 02 uses a non-vulnerable loopback server to practice scope discipline:\n\n\`\`\`sh\npython3 -m http.server 8765 --bind 127.0.0.1 --directory .\ncurl --fail http://127.0.0.1:8765/\n# Stop with Ctrl-C.\n\`\`\`\n\nPermitted target: exactly \`http://127.0.0.1:8765/\`. No other host is part of this exercise.\n`;
fs.writeFileSync(path.join(root, "labs", "README.md"), labReadme);

function referencePage(title, lede, body) {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title><link rel="stylesheet" href="../assets/course.css"></head><body><main><span class="kicker">Reference · Application Security</span><h1>${title}</h1><p class="lede">${lede}</p>${body}<div class="lesson-footer"><p><a href="../lessons/01-security-is-policy-under-pressure.html">Course start</a> · <a href="../CURRICULUM.md">Curriculum</a> · <a href="glossary.html">Glossary</a></p></div></main></body></html>`;
}

const reviewRunbook = referencePage("Security Review Runbook", "A repeatable path from changed behavior to evidence-backed finding.", `
<h2>1. Scope the change</h2><ol><li>What user or system capability changed?</li><li>Which assets, identities, entry points, dependencies, and deployment settings are touched?</li><li>What is explicitly outside this review?</li></ol>
<h2>2. State invariants</h2><ul><li>Who may perform each new action, on which object, under which conditions?</li><li>Which data must remain confidential, integral, available, fresh, or correctly attributed?</li><li>Which limits, ordering rules, and one-time transitions must survive concurrency and retries?</li></ul>
<h2>3. Trace authority</h2><table><tr><th>Trace</th><th>Ask</th></tr><tr><td>Input → parser</td><td>Can alternate encodings, duplicates, coercion, or size change interpretation?</td></tr><tr><td>Identity → policy</td><td>Where is caller identity established, and is permission checked for this action and object?</td></tr><tr><td>State → effect</td><td>Is the transition atomic, idempotent, bounded, and safe under failure?</td></tr><tr><td>Dependency → privilege</td><td>Can an upstream response redirect, expand, select a file, or exercise this service's authority?</td></tr><tr><td>Error → response/log</td><td>Does failure expose data, preserve partial state, or fail open?</td></tr></table>
<h2>4. Prove the smallest case</h2><p>Write one legitimate test and one abuse test. Change one variable. Prefer a harmless marker over data extraction, persistence, or disruption. A scanner result is a hypothesis until tied to code, violated policy, and affected asset.</p>
<h2>5. Review the repair</h2><p>Fix the root decision at the authoritative boundary. Search sibling paths. Preserve a regression test. Add containment and detection only where they address independent failure modes.</p>
<h2>Finding format</h2><pre><code>Policy: [what must remain true]
Affected asset: [specific data/capability]
Preconditions: [attacker identity/access]
Evidence: [minimal reproducible behavior]
Root cause: [missing/incorrect decision]
Impact: [credible consequence and scope]
Repair: [root control + containment]
Verification: [denied abuse + allowed use + variants]</code></pre>`);

const vulnMatrix = referencePage("Vulnerability Reasoning Matrix", "Compress vulnerability names into transferable root causes, controls, and evidence.", `
<table><tr><th>Family</th><th>Root transition</th><th>Primary prevention</th><th>Verification</th></tr>
<tr><td>SQL/command/template injection</td><td>Data becomes interpreter syntax</td><td>Fixed programs plus bound values; remove interpreter where possible</td><td>Syntax-bearing input remains data; normal cases still pass</td></tr>
<tr><td>Traversal/upload</td><td>Caller selects executable or privileged filesystem behavior</td><td>Indirect names, canonical confinement, isolated storage and processing</td><td>Alternate names, encodings, links, and malformed files stay confined</td></tr>
<tr><td>SSRF/unsafe upstream</td><td>Caller or dependency exercises server network authority</td><td>Constrained destinations plus egress enforcement and response budgets</td><td>Final peers, redirects, private ranges, size, and timeout paths are tested</td></tr>
<tr><td>BOLA/BFLA/mass assignment</td><td>Identity is not bound to object, action, or property</td><td>Deny-by-default policy with scoped queries and explicit models</td><td>Actor-resource-action-field matrix covers cross-user and cross-tenant cases</td></tr>
<tr><td>XSS</td><td>Data becomes browser syntax in a specific context</td><td>Safe sinks, contextual encoding, sanitization for intentional HTML</td><td>DOM inspection proves no executable node, URL, or handler appears</td></tr>
<tr><td>CSRF</td><td>Ambient credentials authorize attacker-initiated requests</td><td>SameSite, strong anti-CSRF token, origin validation, fresh confirmation</td><td>Cross-site methods and content types fail; legitimate flows survive</td></tr>
<tr><td>Logic/race</td><td>Valid operations violate a state invariant through order or timing</td><td>Explicit state machine and atomic invariant enforcement</td><td>Concurrent, replayed, and reordered sequences preserve final-state properties</td></tr>
<tr><td>Crypto misuse</td><td>Primitive or lifecycle does not provide the claimed property</td><td>Threat-driven high-level construction plus managed keys</td><td>Tamper, wrong identity/key, replay, rotation, and failure tests</td></tr>
<tr><td>Cloud/container/IAM</td><td>Workload gains authority or reach beyond its purpose</td><td>Temporary identity, least privilege, isolation, policy guardrails</td><td>Effective access and escape/pivot paths are tested, not config appearance</td></tr></table>`);

const threatWorksheet = referencePage("Threat-Model Worksheet", "One printable page for the four-question threat-modeling loop.", `
<h2>1. What are we working on?</h2><p><strong>Mission:</strong> ________ &nbsp; <strong>Owner:</strong> ________ &nbsp; <strong>Version/date:</strong> ________</p><p><strong>Assets:</strong> ________</p><p><strong>Actors and identities:</strong> ________</p><p><strong>Processes, stores, flows, dependencies, admin paths:</strong> ________</p><p><strong>Trust boundaries and assumptions:</strong> ________</p>
<h2>2. What can go wrong?</h2><table><tr><th>Actor/capability</th><th>Path or misuse case</th><th>Violated invariant</th><th>Affected asset</th></tr><tr><td>&nbsp;</td><td></td><td></td><td></td></tr><tr><td>&nbsp;</td><td></td><td></td><td></td></tr><tr><td>&nbsp;</td><td></td><td></td><td></td></tr></table>
<h2>3. What will we do?</h2><table><tr><th>Priority and assumptions</th><th>Prevention</th><th>Containment/detection</th><th>Owner</th></tr><tr><td>&nbsp;</td><td></td><td></td><td></td></tr><tr><td>&nbsp;</td><td></td><td></td><td></td></tr></table>
<h2>4. Did we do enough?</h2><p><strong>Allowed case:</strong> ________</p><p><strong>Denied abuse case:</strong> ________</p><p><strong>Failure and sibling paths:</strong> ________</p><p><strong>Residual risk, accepted by, expiry:</strong> ________</p>`);

const cryptoGuide = referencePage("Practical Cryptography Decision Guide", "Choose the property first, then a maintained high-level construction and key lifecycle.", `
<table><tr><th>Need</th><th>Use</th><th>Do not substitute</th></tr><tr><td>Unpredictable token</td><td>Python <code>secrets</code> or Web Crypto CSPRNG</td><td><code>random</code>, timestamps, UUID assumptions</td></tr><tr><td>Password verification</td><td>Argon2id; scrypt/PBKDF2 where constraints require</td><td>SHA-256, reversible encryption, homemade salting</td></tr><tr><td>Integrity/authenticity with shared key</td><td>HMAC through maintained API</td><td>Bare hash, encrypted checksum, ordinary comparison</td></tr><tr><td>Confidential record</td><td>AEAD such as AES-GCM or ChaCha20-Poly1305</td><td>ECB, unauthenticated CBC/CTR, custom composition</td></tr><tr><td>Publicly verifiable origin</td><td>Modern signature API such as Ed25519</td><td>MAC, “encrypt with private key,” custom RSA</td></tr><tr><td>Network channel</td><td>Modern TLS with hostname and chain verification</td><td>Application-layer homegrown encryption</td></tr></table>
<h2>Five questions before code</h2><ol><li>Which asset and attacker are in the threat model?</li><li>Which property is required: secrecy, integrity, authenticity, freshness, or password resistance?</li><li>Who owns and may use each key?</li><li>How are nonces, versions, rotation, revocation, and failures handled?</li><li>Which tamper, wrong-key, replay, and migration tests prove the claim?</li></ol>
<div class="note"><span class="callout-label">Course rule</span><p>Do not design a primitive or combine low-level primitives. Prefer maintained high-level APIs; cryptography can be correct while key distribution, storage, or lifecycle still makes the system insecure.</p></div>`);

const interviewRunbook = referencePage("Security Engineering Interview Runbook", "A 45-minute structure for architecture, code-review, and investigation interviews.", `
<table><tr><th>Time</th><th>Drive the conversation</th></tr><tr><td>0–5 min</td><td>Clarify mission, users, sensitive assets, adversary capability, compliance or availability constraints, and what is out of scope.</td></tr><tr><td>5–12 min</td><td>Draw clients, identities, services, stores, dependencies, admin paths, data flows, and trust boundaries. State assumptions aloud.</td></tr><tr><td>12–20 min</td><td>Write critical invariants. Generate concrete abuse cases across identity, input interpretation, state transitions, dependencies, resource abuse, and failures.</td></tr><tr><td>20–30 min</td><td>Prioritize by credible path and impact. Deep-dive one path: source, interpretation, policy decision, effect, and smallest safe proof.</td></tr><tr><td>30–39 min</td><td>Design root-cause prevention, blast-radius containment, detection, safe defaults, and operational ownership. Explain tradeoffs.</td></tr><tr><td>39–45 min</td><td>Define allowed/denied/failure tests, rollout and migration concerns, residual risk, and summarize the security posture.</td></tr></table>
<h2>Code-review variant</h2><p>Start from changed behavior. Identify caller-controlled sources and sensitive sinks, then inspect identity, authorization, parsers, state/transaction boundaries, dependency responses, secrets, and error paths. Produce one evidence-backed finding rather than ten speculative warnings.</p>
<h2>Useful narration</h2><ul><li>“My current invariant is …”</li><li>“This boundary trusts …; I want to verify that assumption by …”</li><li>“The credible attacker needs …; without that precondition, priority changes.”</li><li>“This prevents the root cause; this second layer limits blast radius if prevention fails.”</li><li>“I would close this only after these allowed, denied, sibling, and failure tests pass.”</li></ul>`);

const aiSecurityRunbook = referencePage("AI and LLM Security Runbook", "A production review and release gate for RAG systems, copilots, and tool-using agents.", `
<h2>Map the whole system</h2><table><tr><th>Surface</th><th>Inventory</th><th>Primary question</th></tr>
<tr><td>Interface</td><td>Prompts, files, webpages, messages, multimodal input</td><td>Which content is attacker-influenced, and where can it change behavior?</td></tr>
<tr><td>Context and memory</td><td>RAG sources, vector stores, session memory, caches, tool results</td><td>Are authorization, tenant, provenance, freshness, and retention preserved?</td></tr>
<tr><td>Model and harness</td><td>Model version, system prompt, context builder, routing, parsers</td><td>Which claims are probabilistic, and which policies are deterministically enforced?</td></tr>
<tr><td>Tools and identities</td><td>Tool schemas, MCP servers, credentials, destinations, approvals</td><td>Can a proposal create an effect beyond the user's authorized intent?</td></tr>
<tr><td>Supply chain</td><td>Models, adapters, datasets, prompts, packages, generated code</td><td>Can identity, provenance, safe loading, and immutable promotion be proven?</td></tr>
<tr><td>Infrastructure/provider</td><td>Gateways, clusters, endpoints, logs, retention, budgets, egress</td><td>Can credential theft, public exposure, leakage, or cost amplification escape limits?</td></tr></table>
<h2>Prompt-injection review</h2><ol><li>Separate user intent, developer policy, and untrusted content by provenance.</li><li>Assume direct and indirect instructions can influence the model; delimiters are context, not a security boundary.</li><li>Minimize accessible data and actions before inference.</li><li>Authorize tool, arguments, resource, destination, budget, and identity outside the model.</li><li>Bind human approval to the exact effect; invalidate it when arguments or context change.</li><li>Measure unauthorized effects and disclosure—not whether the response contains a preferred refusal phrase.</li></ol>
<h2>Eval card</h2><pre><code>System version: model + prompt + harness + tools + policies
Threat case: actor, source, goal, severity, expected security outcome
Metrics: attack success rate, false-block rate, severity-weighted loss
Segments: direct/indirect, source, tool, tenant, model, language, encoding
Evidence: repeated trials, held-out and adaptive cases, confidence interval
Gate: threshold, owner, exception, residual risk, rollback trigger</code></pre>
<h2>Release gate</h2><ul><li>High-risk flows have owners, controls, and tests.</li><li>Retrieval authorization and tenant isolation fail closed.</li><li>Model output is parsed, validated, and authorized before effects.</li><li>Tool calls use narrow schemas, scoped identities, budgets, and meaningful approval.</li><li>Data maps cover prompts, providers, memory, embeddings, traces, feedback, and deletion.</li><li>Artifacts have identity, provenance, safe loading, immutable promotion, and rollback.</li><li>Privacy-aware traces reconstruct policy decisions without default raw-secret logging.</li><li>Security eval thresholds and utility regressions are explicit release decisions.</li></ul>
<div class="note"><span class="callout-label">Core principle</span><p>The model is one fallible component. The application harness owns enforceable authorization, data boundaries, execution policy, evidence, and safe degradation.</p></div>`);

fs.mkdirSync(path.join(root, "reference"), { recursive: true });
fs.writeFileSync(path.join(root, "reference", "security-review-runbook.html"), reviewRunbook);
fs.writeFileSync(path.join(root, "reference", "vulnerability-matrix.html"), vulnMatrix);
fs.writeFileSync(path.join(root, "reference", "threat-model-worksheet.html"), threatWorksheet);
fs.writeFileSync(path.join(root, "reference", "crypto-decision-guide.html"), cryptoGuide);
fs.writeFileSync(path.join(root, "reference", "interview-runbook.html"), interviewRunbook);
fs.writeFileSync(path.join(root, "reference", "ai-security-runbook.html"), aiSecurityRunbook);

console.log(`Generated ${lessons.length} lessons (${lessons[0].id}–${lessons.at(-1).id}); course total ${all.length} including lesson 1.`);
