# CS Fundamentals for Software Engineers

This repository contains self-paced courses for practicing data structures and algorithms, systems design, application security, and security engineering. It is intended for software engineers preparing for interviews who also want a stronger understanding of how these concepts apply to production systems.

Lessons are standalone HTML pages that can be opened directly in a browser. They combine concise explanations with diagrams, step-by-step animations, quizzes, and spaced review. Each course builds on earlier lessons, so it is best to complete them in sequence.

## Courses

### Data Structures and Algorithms

The `DSA/` course contains 45 lessons covering:

- Complexity analysis and problem-solving foundations
- Arrays, strings, linked lists, stacks, and queues
- Trees, heaps, recursion, and backtracking
- Graph traversal and graph algorithms
- Dynamic programming and greedy techniques
- Interview communication and practice strategy

Browse the [DSA table of contents](./DSA/00-table_of_contents.html) or read [DSA/CURRICULUM.md](./DSA/CURRICULUM.md).

### Systems Design

The `SYSTEMS/` course contains 46 lessons covering:

- How a single backend processes requests
- Databases, indexes, caching, and storage
- Distributed systems and partial failure
- Messaging, consistency, coordination, and reliability
- Production infrastructure and observability
- Architecture interviews and AI system design

Browse the [Systems table of contents](./SYSTEMS/00-table_of_contents.html) or read [SYSTEMS/CURRICULUM.md](./SYSTEMS/CURRICULUM.md).

### Application Security and Security Engineering

The `SECURITY/` course contains 67 lessons across nine phases. It begins with security fundamentals and progresses through application security, secure software development, cloud security, and AI and LLM security.

Topics include:

- Security policies, threat modeling, trust boundaries, and risk
- Server-side vulnerabilities such as injection, SSRF, unsafe file handling, and race conditions
- Authentication, sessions, authorization, OAuth, and token security
- Browser security, XSS, CSRF, CORS, and client trust boundaries
- API security, multi-tenant isolation, webhooks, and resource abuse
- Secure development, code review, testing, supply-chain security, and CI/CD
- Practical cryptography using maintained libraries
- IAM, cloud boundaries, container hardening, and Kubernetes security
- Prompt injection, RAG security, agent tools, MCP, guardrails, security evals, and AI infrastructure

Every Security lesson includes a security-boundary animation, an immediate-feedback quiz, a practice exercise, source material, and links to reference documents. Phase 8 adds AI-specific attack-path diagrams and deterministic browser simulations for prompt injection, agent tool authorization, and guardrail evaluation.

The Security course is grounded in OWASP, NIST, PortSwigger, OpenSSF, official cloud and platform documentation, and production AI security guidance from Datadog, OpenAI, Anthropic, MCP, MITRE, and the OWASP GenAI project.

Browse the [Security table of contents](./SECURITY/00-table_of_contents.html) or read [SECURITY/CURRICULUM.md](./SECURITY/CURRICULUM.md). The course mission is documented in [SECURITY/MISSION.md](./SECURITY/MISSION.md), and the full source catalog is in [SECURITY/RESOURCES.md](./SECURITY/RESOURCES.md).

#### Security labs

Hands-on work currently uses three formats:

- External, disposable PortSwigger Web Security Academy labs for applicable web vulnerabilities
- Small code or architecture exercises included in the lesson pages
- Deterministic browser simulations embedded in selected AI security lessons

## Using the repository

No application server or package installation is required for the lessons themselves.

1. Choose a course and open its `00-table_of_contents.html` page.
2. Start with lesson `01` or select another lesson from the table of contents.
3. Work through the explanation and animation before answering the quiz.
4. Complete the practice exercise when one is provided.
5. Use the previous, table of contents, curriculum, and next links in each lesson footer to move through the course.
6. Revisit missed quiz concepts after one day and again after one week.

Lesson filenames use two-digit numbers: `01` through `09`, followed by `10`, `11`, and so on. Every lesson footer includes the author and the month and year it was written.

You can open a lesson from Finder or with a command such as:

```bash
open SECURITY/lessons/01-security-is-policy-under-pressure.html
```

The courses are designed for regular practice rather than a single pass. A pace of one lesson per day leaves enough time for spaced repetition for better understanding and learning outcomes. 

## Repository structure

```text
.
├── DSA/
│   ├── 00-table_of_contents.html
│   ├── CURRICULUM.md
│   ├── lessons/
│   └── assets/
├── SYSTEMS/
│   ├── 00-table_of_contents.html
│   ├── CURRICULUM.md
│   ├── lessons/
│   └── assets/
└── SECURITY/
    ├── 00-table_of_contents.html
    ├── CURRICULUM.md
    ├── LABS.md
    ├── MISSION.md
    ├── RESOURCES.md
    ├── assets/
    ├── lessons/
    ├── reference/
    └── labs/
```

Course directories may also contain working notes and learning records used to preserve teaching decisions and track changes to the material.

## Future Enhancements

- Build a focused set of runnable local security labs with synthetic data, vulnerable and repaired behavior, automated tests, and deterministic cleanup
- Add progress tracking and a simple spaced-review schedule across all three courses as a local checklist etc.
- Add more interview drills that combine DSA, systems design, and security decisions in one scenario
- Expand automated checks for lesson navigation, quizzes, accessibility, and browser rendering
- Improve keyboard navigation, small-screen layouts, and print-friendly reference pages
- Add optional cloud and container exercises that can run safely within strict cost and permission limits
- Create capstone projects that produce portfolio-ready architecture diagrams, tests, and written design reviews
- AI prompts to reproduce high fidelity outputs from a variety of models for given tasks 
- Suggested libraries or dependencies section for further research or in assistance of code generation  
