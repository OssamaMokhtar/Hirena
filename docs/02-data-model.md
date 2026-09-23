# Hirena — Data model

> Status: AUTHORED · Updated 2026-09-23 · Owner: Ossama Mokhtar

| Entity | Shape (from `src/types/index.ts`) | Stored |
|---|---|---|
| Skill | id, name, description, category (pillar), level 0–5, `isAiInferred`, `aiConfidence`, evidence | In code (`competency-model.ts`) |
| AssessmentInput | targetRole, targetTrack, region, `selfAssessment` (skill → 0–5), `aiInferenceInputs` (skill → text) | Request body only |
| AssessmentResult | overallScore 0–100, competency scores per pillar, skill ranking, strengths, gaps, missing skills, roadmap (immediate / intermediate / long-term), resources | Browser (demo), Supabase `assessments` if configured |
| Profile / preferences | display name, language, region, AI mode | Supabase `profiles`, else localStorage `hirena-preferences` |
| Share payload | Summary of a result | Encoded in the share URL |

**Personal data held:** email and display name (only with accounts), self-ratings, and the free text the user writes about their experience. No audio, video or images.
