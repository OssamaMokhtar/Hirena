# Hirena — Scoring engine

> Status: AUTHORED · Updated 2026-09-23 · Owner: Ossama Mokhtar

`computeAssessmentResult()` in `src/lib/scoring-engine.ts` is a pure function: the same input gives the same result (unit-tested).

1. **Skill level.** The self-rating (0–5), replaced by the AI-suggested level only for skills where the user wrote evidence.
2. **Pillar score.** The average level per pillar: Strategy, Discovery, Delivery, Analytics, AI, Leadership.
3. **Overall score (0–100).** A weighted average of pillar scores divided by 5. Weights depend on the target role: for example Associate PM weights Discovery 30%, while VP Product and CPO weight Strategy 40% and Leadership 25%.
4. **Gaps.** Each skill is compared with the expected level for its pillar at the target role. A skill at least 1 level above target is a strength; 1–2 below is a gap (2 below is "important"); 3 or more below is a missing skill.
5. **Roadmap buckets.** Gaps are sorted into immediate, intermediate and long-term actions.

**Not validated:** the weights and expected levels are product judgement. The planned check compares results with manager ratings for 15 PMs (GAPS #1).
