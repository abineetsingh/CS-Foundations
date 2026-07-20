# Mission: Systems Design & Architecture (Production Backends)

## Why
Pass system design interview rounds at frontier AI labs (OpenAI, Anthropic) — and, beyond interviews, be genuinely able to design and build production-grade backends: application services, enterprise platforms, and the infrastructure underneath (including ML/agentic systems). The interview is the near-term checkpoint; real architectural capability is the actual goal. Companion track to the DSA workspace (`../DSA/`), which covers the algorithmic side of the same interviews.

## Success looks like
- Whiteboard a standard system design question (URL shortener, rate limiter, news feed, chat) in ~45 minutes: requirements → capacity estimates → high-level design → deep dives → tradeoffs, out loud
- Explain and justify core architecture choices: SQL vs NoSQL, cache placement, load balancing, queues vs direct calls, replication vs partitioning — with the failure modes of each
- Build and run a small production-shaped service in Python: API + database + cache + queue, containerized, with basic observability
- Read real-world architecture writeups (engineering blogs, postmortems, DDIA) fluently, including those about LLM serving and agent infrastructure

## Constraints
- 1–2 hours/day total, shared with DSA practice (systems lessons a few times a week, DSA most days)
- Python only for any code
- True beginner on backend/infrastructure: HTTP servers, databases, caching, load balancers are unfamiliar/fuzzy — build from the ground up, no assumed knowledge
- Mixed style: interactive design lessons (diagrams, simulators, quizzes) plus occasional real hands-on exercises run locally

## Out of scope
- DSA/coding-interview material (lives in `../DSA/`)
- Frontend development (HTML/CSS/JS app building)
- Deep vendor certification tracks (AWS/GCP cert prep) — concepts over vendor trivia
- ML modeling/theory itself — ML *systems* (serving, inference infra) are in scope as later case studies
