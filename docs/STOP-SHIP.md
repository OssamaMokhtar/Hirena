# Hirena — STOP SHIP (mandatory fixes before any deployment)

> Status: AUTHORED · Updated 2026-09-23 · Owner: Ossama Mokhtar

These must be resolved before Hirena is deployed to any live URL. Items marked **DONE** below have been resolved in this commit. Items marked **OPEN** are still outstanding.

---

## SS-1: Remove facial analysis (EU AI Act Art. 5(1)(f))

**Risk:** EU AI Act Art. 5(1)(f) prohibits AI systems that infer the emotions of a person in the workplace or in education. Hirena's `/api/facial/analyze` endpoint inferred emotions from facial expressions in interview video.

**What was removed:**
- `src/app/api/facial/analyze/route.ts` — replaced with 410 Gone response
- References to facial analysis in README API docs
- `video-interview.ts` and `video-interview.tsx` — video capture utilities (deprecated)
- `signal-analysis.ts` — voice/facial signal utilities (deprecated)
- `facial-analysis.ts` — facial analysis types (deprecated)

**Status: DONE** (2026-09-23), **completed in the audit pass the same day.** The first pass only stubbed the facial endpoint. `/api/voice/analyze` (which scored "confidence", "enthusiasm" and "emotion"), the video interview wizard on the landing page, `/api/interview/session` (which returned `Math.random()` emotion and eye-contact scores), `/api/interview/analyze` (audio transcription of candidates) and the fusion engine were all still live. All are now removed; `src/__tests__/removed-endpoints.test.ts` fails the build if they come back.

---

## SS-2: Restore OpenAI API credit or remove AI inference from demo

**Risk:** Current OpenAI balance is $0, causing 429 errors when `inferAllSkills()` is called. The demo works around this by pre-computing results at module load time. This is fragile — if anyone calls the real inference path, it fails.

**Options:**
1. **Restore credit** — simplest path. Add $5-10 to the OpenAI account.
2. **Remove AI inference from demo** — make the demo fully offline (self-assessment only, no AI path).
3. **Gate AI inference behind a feature flag** — only call GPT-4o when credits are confirmed.

**Status: MITIGATED** (2026-09-23). When the model path fails, results now carry the label "Rule-based estimate — no AI model was called", and the landing-page demo shows a "Sample result" banner. Restoring API credit is still needed before claiming live AI inference.

---

## SS-3: Remove verify-env and test-env routes (security)

**Risk:** Both `/api/verify-env` and `/api/test-env` returned the OpenAI API key prefix (`sk-proj-...`) in every HTTP response. This is a credential leak — any client that hits these endpoints receives part of the API key.

**What was removed:**
- `src/app/api/verify-env/route.ts` — replaced with 410 Gone response
- `src/app/api/test-env/route.ts` — replaced with 410 Gone response
- References to these endpoints in README testing section

**Status: DONE** (2026-09-23)

---

## SS-4: (Youna repo — separate fix)

**Risk:** Youna README claimed "user data is private, encrypted, and under user control" but Phase Two storage is localStorage only — no encryption layer.

**Status: DONE** (2026-09-23, in Youna repo — README updated, `docs/00-architecture-and-status.md` created)

---

## Summary

| Item | Risk | Status |
|------|------|--------|
| SS-1: Emotion inference removal (face, voice, video) | EU AI Act Art. 5(1)(f) | **DONE** |
| SS-2: OpenAI credit / demo honesty | Fallback shown as AI | **MITIGATED** (credit still needed) |
| SS-3: verify-env/test-env removal | Credential leak | **DONE** |
| SS-4: Youna encryption claim | False claim in README | **DONE** (Youna) |

---

Ossama Mokhtar · Dubai, UAE
