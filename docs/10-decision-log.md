# Hirena — Decision log

> Status: AUTHORED · Updated 2026-09-23 · Owner: Ossama Mokhtar

## ADR-001 — Text only: no voice, face or video analysis

**Decision:** remove every emotion, voice, facial and video-interview component.
**Rejected:** keeping facial analysis behind an opt-in toggle with a bias disclaimer (the earlier design).
**Why:** inferring emotions in education or workplace settings is prohibited in the EU regardless of consent, and the scores were simulated anyway.
**Reversal trigger:** none. Interview practice, if added, will be text-only rubric grading.

## ADR-002 — Self-development, not candidate screening

**Decision:** Hirena helps an individual see their own gaps. It does not rank or screen people for employers.
**Why:** screening would make it an Annex III high-risk system; the evidence to support that claim doesn't exist.
**Reversal trigger:** a validation study (07) plus an employer partner willing to fund conformity work.

## ADR-003 — The score is deterministic; the model only suggests levels

**Decision:** `computeAssessmentResult()` owns the score; the model's suggestion applies only to skills with user-written evidence, and is labelled.
**Why:** the result is reproducible and explainable to the user.
**Reversal trigger:** the validation study shows model-only scoring predicts manager ratings better.

## ADR-004 — Fallback results must be labelled

**Decision:** any rule-based estimate carries a visible label; the demo result carries a "Sample result" banner.
**Rejected:** silently substituting the fallback (the earlier behaviour while the API account had no credit).
**Reversal trigger:** none.
