# Hirena — Evaluation

> Status: AUTHORED · Updated 2026-09-23 · Owner: Ossama Mokhtar

| Test (CI, every push) | n | What it proves |
|---|---|---|
| Scoring determinism, ordering, AI-inferred labelling | 3 | The engine is reproducible and labels AI-changed skills |
| Fallback labelling | 1 | Rule-based results can't be shown as AI output |
| Removed endpoints return 410 without key material | 4 | The leak and the emotion endpoints stay gone |
| No emotion, eye-contact or facial scoring in any source file; deleted modules absent; no route slices an API key | 3 | Compliance regressions fail the build |

Source: `src/__tests__/`. Run: `npm test`.

## Not validated

| Question | Plan | Pass bar |
|---|---|---|
| Does the score mean anything? | 15 PMs: Hirena vs manager rating vs plain self-report | Hirena correlates with the manager rating better than self-report does |
| Is AI inference fair across writing styles and languages? | Same experience written two ways (modest vs assertive, EN vs AR) | Level difference ≤ 1 on at least 90% of pairs |
| Is AI inference accurate? | 50 evidence texts labelled by two senior PMs | Within ±1 level on at least 80% |
