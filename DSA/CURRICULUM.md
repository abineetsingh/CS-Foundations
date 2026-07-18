# Curriculum — DSA Mastery Path

Full lesson sequence from beginner to interview-ready.
Ordering follows the dependency structure of the [NeetCode roadmap](https://neetcode.io/roadmap), adapted for a Python-only beginner with ML/AI ambitions.

**Status (2026-07-16): all 45 lessons are authored.** Filenames `0001`–`0045` in
`./lessons/` match this list's numbering exactly. Each lesson is ~20–30 min with an
inline quiz (including spaced-review questions from earlier lessons). After most
lessons: 30–60 min of matching problems from
[NeetCode 250](https://neetcode.io/practice/practice/neetcode250).

## Phase 0 — Foundations (week 1)

1. Big-O: reading the cost of code — `0001`
2. Space complexity — the memory side of Big-O; time/space trade-offs
3. Arrays & Python lists under the hood — dynamic arrays, amortized append, why `insert(0)` hurts
4. Strings & immutability — why `+=` in a loop is O(n²); `join`, slicing costs
5. Hash maps & sets — the single most useful interview structure; collisions intuition *(ML link: KV caches)*

**Milestone:** state time & space complexity of any snippet; solve "Contains Duplicate", "Two Sum" unassisted.

## Phase 1 — Linear-structure patterns (weeks 2–4)

6. Two pointers — converging pointers on sorted data (Valid Palindrome, Two Sum II)
7. Sliding window, fixed size — subarray averages, window maximums
8. Sliding window, variable size — longest substring without repeats *(ML link: context windows)*
9. Prefix sums — precompute-then-query *(ML link: cumulative attention masks)*
10. Stacks — matching brackets, monotonic stack intuition
11. Queues & deques — `collections.deque`, when FIFO beats LIFO
12. Linked lists I — nodes, traversal, insertion/deletion
13. Linked lists II — in-place reversal, fast/slow pointers, cycle detection
14. Binary search I — on sorted arrays; the loop-invariant way to never write an off-by-one
15. Binary search II — on answer spaces ("minimum capacity to ship in D days" pattern)
16. Sorting — what interviews need: Timsort's O(n log n), custom keys, "sort first?" as a strategy

**Milestone:** recognize which of these patterns fits a novel easy/medium problem within 5 minutes.

## Phase 2 — Recursion, trees & heaps (weeks 4–7)

17. Recursion I — the call-stack mental model; base case + trust the recursion
18. Recursion II — divide & conquer; merge sort from scratch
19. Binary trees: DFS — preorder/inorder/postorder, recursive and with an explicit stack
20. Binary trees: BFS — level-order with a queue *(ML link: tree search in game-playing agents)*
21. Binary search trees — the sorted-structure invariant; validate/insert/search
22. Tree problems toolkit — depth, diameter, balanced, lowest common ancestor
23. Heaps & priority queues — `heapq` mechanics; top-K pattern *(ML link: beam search)*
24. Two-heap & K-way-merge patterns — find median from stream, merge K sorted lists
25. Tries — prefix trees *(ML link: tokenizer vocabularies)*
26. Backtracking I — subsets, permutations, combinations; the choose/explore/unchoose template
27. Backtracking II — constrained search: combination sum, word search, N-queens

**Milestone:** solve unseen medium tree problems; explain recursion without tracing every call.

## Phase 3 — Graphs (weeks 7–9)

28. Graph representations & traversal — adjacency lists, BFS/DFS, visited sets *(ML link: computation graphs)*
29. Grid graphs — number of islands, flood fill; grids-as-graphs
30. Topological sort — course schedule; dependency ordering *(ML link: autograd execution order)*
31. Union-Find — disjoint sets, connected components
32. Shortest paths — BFS for unweighted, Dijkstra with a heap for weighted
33. (Optional) Minimum spanning trees — Prim/Kruskal; only if time allows, rare in AI-lab screens

**Milestone:** model a word problem as a graph unprompted; pick BFS vs DFS vs Dijkstra correctly.

## Phase 4 — Dynamic programming & friends (weeks 9–11)

34. DP I: memoization — top-down; fib → climbing stairs; "recursion + cache"
35. DP II: tabulation — bottom-up 1-D DP; house robber
36. DP III: 2-D DP — unique paths, longest common subsequence *(ML link: edit distance ↔ sequence alignment)*
37. DP IV: knapsack patterns — 0/1 knapsack, unbounded (coin change)
38. Greedy — when local-best wins; proving greedy is safe vs falling back to DP
39. Intervals — merge intervals, meeting rooms; sort-then-sweep
40. Bit manipulation (short) — XOR tricks, masks; low-frequency but cheap to learn

**Milestone:** derive a DP recurrence for an unseen medium in ~15 minutes.

## Phase 5 — Interview craft & AI-lab specifics (weeks 11–13)

41. The interview loop — a repeatable protocol: clarify → examples → brute force → optimize → code → verify; narrating complexity out loud
42. Python interview toolkit — `collections`, `itertools`, comprehensions, sorting idioms; writing clean code fast
43. Design problems — LRU cache, min stack, insert/delete/getRandom O(1); the "design X" genre
44. AI-lab practical screens — timed build-a-thing practice (rate limiter, in-memory store, simple tokenizer); grounded in interview-experience research (see Gaps in [RESOURCES.md](./RESOURCES.md))
45. Capstone: DSA in ML systems — synthesis lesson connecting everything to the long-term mission: beam search (heaps+graphs), KV caches (hash maps), attention cost (Big-O), autograd (topological sort)

**Milestone (= mission success):** unseen LeetCode mediums in ~30 min with complexity narration; pattern recognition in the first minutes.

## Ongoing, not lessons

- **Spaced review**: each new lesson's quiz retakes the trickiest question from 2–3 lessons back.
- **Problem practice**: ramping from 1–2 easies/day (Phase 0) to 1 medium/day (Phase 2+), interleaved across past topics — interleaving builds the pattern-recognition the mission asks for.
- **Mock interviews**: from week 8, one timed mock/week (self-timed, then human — see communities in [RESOURCES.md](./RESOURCES.md)).
