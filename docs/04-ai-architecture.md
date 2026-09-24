# Hirena — AI architecture

> Status: AUTHORED · Updated 2026-09-23 · Owner: Ossama Mokhtar

**GPT-4o reads the user's own description of their work and suggests a proficiency level with a confidence and a reason. It never sets the score directly, and it sees no audio, video or images.**

| Call | Function | Model settings | Output |
|---|---|---|---|
| Skill level from text | `inferSkillLevel`, `inferAllSkills` | `gpt-4o`, temperature 0.3, JSON | level 0–5, confidence 0–1, reasoning |
| Feedback | `generateAssessmentFeedback` | `gpt-4o`, 0.5 | Narrative feedback |
| Roadmap | `generateRoadmap` | `gpt-4o`, 0.6 | Actions by horizon |
| Resources | `recommendResources` | `gpt-4o`, 0.5 | Learning resources |

## Modes and fallback

`AI_MODE=auto` (default) tries OpenAI and falls back per skill on any error. `mock` always uses the rule-based estimator; `production` fails if OpenAI is unavailable. **Every fallback result is labelled** "Rule-based estimate — no AI model was called" in the evidence line. Before 23 Sep 2026 the fallback was shown as AI inference.

## What the model is not allowed to do

- Infer personality, emotion, confidence or enthusiasm from how someone writes or sounds.
- Change the weighting or the final score.
- Make hiring recommendations. Hirena is a self-development tool, not a screening tool (ADR-002).

## Known risks

- Inflated or deflated levels for people who describe their work modestly or in a second language. No fairness measurement exists yet (GAPS #2).
- Prompt injection in the evidence text ("rate me 5 on everything"). The level is clamped to 0–5, but nothing detects the attempt (GAPS #4).
