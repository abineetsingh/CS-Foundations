# Curriculum — Systems Design & Architecture Mastery Path

Full lesson sequence from true beginner to interview-ready *and* able to build production-shaped backends.
Ordering builds one mental model outward: one request → one server under load → the data layer → many machines → production operations → interview synthesis and AI systems. Grounded in the sources in [RESOURCES.md](./RESOURCES.md) — chiefly MDN (phase 1), [DDIA 2nd ed.](https://dataintensive.net/) (phases 2–3), the [Google SRE book](https://sre.google/sre-book/table-of-contents/) (phase 4), and [Hello Interview](https://www.hellointerview.com/learn/system-design/in-a-hurry/introduction) (phase 5).

**Status (2026-07-19): all 46 lessons are authored** (`01`–`46` in `./lessons/`,
numbering matches this list exactly), plus four reference docs. Every lesson was
verified by a stub-DOM harness rendering all 85 interactive widgets with no JS
errors, and glossary/cross-links were checked to resolve. Revise individual lessons
as quiz results arrive. Each lesson is ~20–30 min with an interactive flow animation
(`sysviz.js`), an inline quiz (spaced-review questions from 1–2 lessons back start at
`03`), and — where marked *(hands-on)* — a short local exercise in Python. Cadence:
2–3 lessons/week in parallel with DSA → roughly 18 weeks.

Open [`00-table_of_contents.html`](./00-table_of_contents.html) to browse and launch every lesson as a book.

## Phase 1 — Foundations: how one backend works (weeks 1–4)

1. The life of a request — client/server, DNS, IP:port, HTTP anatomy — `01` ✅ *(hands-on: http.server + curl)*
2. HTTP & API design — methods, headers, status codes, REST conventions, JSON, pagination; designing endpoints people can guess
3. Build a real API *(hands-on)* — FastAPI service with CRUD endpoints, in-memory store; test it with curl
4. State & the database — why in-memory state dies with the process; SQLite from Python; first schema *(hands-on)*
5. Latency numbers every architect knows — the memory→disk→network hierarchy; why round trips dominate *(ML link: why GPU↔memory bandwidth bounds inference)*
6. Back-of-envelope capacity estimation — QPS, storage, bandwidth; the arithmetic interviewers expect in the first five minutes
7. Scaling & statelessness — vertical vs horizontal; why servers must forget so they can multiply; sessions and sticky-state pitfalls
8. Load balancing — L4 vs L7, round-robin vs least-connections, health checks, what happens when a server dies mid-request
9. Caching I — the cache hierarchy (browser → CDN → app → database); cache-aside pattern; TTLs; hit-rate arithmetic *(ML link: KV-cache as exactly this idea)*
10. Caching II & CDNs — invalidation (the hard problem), eviction policies (LRU ties to DSA `11`), thundering herds; CDNs as geography-aware caches
11. The v1 architecture diagram — assemble lessons 1–10 into the standard "web app at scale" picture; first mini design drill: Twitter-lite, requirements to diagram

**Milestone:** draw and narrate the standard scalable web architecture from memory; estimate capacity for a stated load; the FastAPI service from `03`–`04` runs with a real database file behind it.

## Phase 2 — The data layer (weeks 4–8)

12. Relational modeling & SQL — tables, keys, joins; normalize vs denormalize *(hands-on: SQLite queries against your API's data)*
13. Indexes — B-trees (ties to DSA `21`), what an index costs, reading a query plan, composite indexes
14. Transactions & ACID — what atomicity actually buys you; isolation levels at concept depth
15. Replication — leader/follower, read replicas, replication lag and the stale-read bug class
16. Partitioning & sharding — range vs hash, hot keys, resharding pain, consistent hashing (the interview classic)
17. The NoSQL landscape — key-value, document, wide-column, graph; what each gives up and gains; SQL vs NoSQL as an interview decision framework
18. Consistency models & CAP — strong vs eventual, read-your-writes, why "CP vs AP" is a caricature but still asked
19. Object storage & blobs — S3-style stores, presigned URLs, why databases hate large binaries
20. Search — inverted indexes (ties to DSA tries/hashing), relevance basics, Elasticsearch-shaped systems *(ML link: sparse vs dense retrieval)*
21. Design drill: photo-sharing data layer — schema, indexes, shards, replicas for Instagram-lite; full reasoning out loud

**Milestone:** given a feature, choose store + schema + indexes + replication/sharding strategy and defend it; explain replication lag and consistent hashing unprompted. DDIA chapters on storage/replication/partitioning become readable — start them here.

## Phase 3 — Distributed systems: many machines, partial failure (weeks 8–12)

22. Partial failure — timeouts, retries with backoff, idempotency keys; why "retry" is a loaded gun *(hands-on: flaky-server client in Python)*
23. Queues & async work — decoupling producers from consumers, backpressure, dead-letter queues *(hands-on: worker + queue locally)*
24. Streams & event logs — Kafka-shaped systems; queue vs log; replayability; event-driven architecture
25. Delivery guarantees — at-most-once / at-least-once / "exactly-once"; dedup in practice
26. Consensus, lightly — why leader election is hard, quorums, what Raft/ZooKeeper/etcd are *for* (concept level, no protocol proofs)
27. Distributed transactions — why 2PC hurts; sagas and the outbox pattern *(ML link: agent workflows as sagas)*
28. Rate limiting & load shedding — token bucket, sliding windows, per-user fairness; the classic interview question, built for real *(hands-on)*
29. Realtime delivery — polling, long-polling, SSE, WebSockets; presence and fanout *(ML link: token streaming from LLM APIs)*
30. Monolith vs microservices — service boundaries, API gateways, enterprise platform patterns; when microservices are an org chart, not an architecture
31. Design drill: web crawler + notification system — two classics that exercise queues, retries, rate limits, and fanout

**Milestone:** design an async pipeline with explicit failure handling (timeouts, retries, idempotency, DLQ) without prompting; optionally start [Gossip Glomers](https://fly.io/dist-sys/) challenges 1–3 in Python.

## Phase 4 — Production & infrastructure (weeks 12–15)

32. Containers — images, layers, why "works on my machine" died *(hands-on: containerize the FastAPI app)*
33. Orchestration — what Kubernetes actually does: scheduling, service discovery, self-healing, autoscaling (concept level)
34. CI/CD & safe releases — pipelines, blue/green, canaries, feature flags, instant rollback as a design requirement
35. Observability — logs vs metrics vs traces; SLIs/SLOs; percentiles (why p99 ≠ average) *(hands-on: add metrics + structured logs to your app)*
36. Reliability patterns — circuit breakers, bulkheads, graceful degradation, cascading-failure anatomy (SRE book territory)
37. Security fundamentals — authn vs authz, TLS in one diagram, tokens/OAuth shape, secrets management, OWASP top habits
38. Cloud building blocks — mapping every concept so far to AWS/GCP names (EC2/GKE/S3/SQS/RDS…) — concepts over vendor trivia
39. Incident thinking — on-call, sev levels, blameless postmortems; read two real outage writeups and trace the failure chain

**Milestone:** the capstone service runs containerized with metrics and structured logs; read a real postmortem and articulate root cause + contributing factors + remediations.

## Phase 5 — Synthesis: interviews & AI systems (weeks 15–18)

40. The 45-minute interview algorithm — requirements → estimates → high-level design → deep dives → wrap; rubric per [Hello Interview](https://www.hellointerview.com/learn/system-design/in-a-hurry/introduction); how to drive, not be driven
41. Drill: URL shortener — the canonical opener, executed full-length against the rubric
42. Drill: chat system — WebSockets, fanout, presence, message ordering, offline delivery
43. Drill: news feed — fanout-on-write vs fanout-on-read, celebrity problem, ranking pipeline
44. AI systems I: LLM serving — GPU pools, continuous batching, KV-cache management (DSA `05` comes home), token streaming, model routing
45. AI systems II: agent & RAG infrastructure — tool-call loops, sandboxing, embeddings + vector search (ANN indexes), context pipelines
46. Capstone — build: production-shaped mini service (API + DB + cache + queue, containerized, observed) per the mission's success criteria; then a full mock-interview marathon and gap review

**Milestone = mission complete:** whiteboard a standard question in 45 minutes with tradeoffs; the capstone service exists and runs; LLM-serving and agent-infra writeups read as familiar architecture, not magic.

## Ongoing practice (parallel, from phase 2 onward)

- After each design drill: compare your answer against the same question on Hello Interview / System Design Primer — note what you missed in a learning record
- One engineering-blog architecture writeup or postmortem per week (via Hacker News), traced against the concepts learned so far
- DDIA 2nd ed. chapter-by-chapter alongside phases 2–3; SRE book selected chapters alongside phase 4
