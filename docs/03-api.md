# Hirena — API

> Status: AUTHORED · Updated 2026-09-23 · Owner: Ossama Mokhtar

| Route | Method | Purpose |
|---|---|---|
| `/api/assess` | POST | Body: `AssessmentInput`. Runs text-evidence inference (GPT-4o or the labelled fallback), then deterministic scoring; saves to Supabase if a user is signed in. Returns `{ success, result }` |
| `/api/auth/*` | POST/GET | Sign-up, sign-in, sign-out, current user (Supabase; optional) |
| `/api/preferences` | GET / PATCH | AI mode, language, region |
| `/api/share/[id]` | GET | Decode a share link |
| `/api/facial/analyze`, `/api/voice/analyze` | any | **410 Gone.** Emotion inference removed (EU AI Act Art. 5(1)(f)) |
| `/api/verify-env`, `/api/test-env` | GET | **410 Gone.** Leaked the OpenAI key prefix; removed |

Removed on 23 Sep 2026 and deleted outright: `/api/interview/session`, `/api/interview/analyze`, `/api/fusion/result`, and the preference toggle for facial analysis. The pre-removal reference is in [`archive/api-reference.md`](archive/api-reference.md).
