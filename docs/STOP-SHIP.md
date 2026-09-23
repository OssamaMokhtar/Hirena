# Hirena — STOP SHIP (mandatory fixes before any deployment)

> Status: AUTHORED · Updated 2026-09-23 · Owner: Ossama Mokhtar

These must be resolved before Hirena is deployed to any live URL. Items marked **DONE** below have been resolved in this commit. Items marked **OPEN** are still outstanding.

---

## SS-1: Remove facial analysis (EU AI Act Art. 5(1)(f))

**Risk:** Biometric categorization of natural persons is prohibited under Article 5(1)(f). Hirena's `/api/facial/analyze` endpoint analyzed facial expressions from video frames — this is exactly the prohibited category.

**What was removed:**
- `src/app/api/facial/analyze/route.ts` — replaced with 410 Gone response
- References to facial analysis in README API docs
- `video-interview.ts` and `video-interview.tsx` — video capture utilities (deprecated)
- `signal-analysis.ts` — voice/facial signal utilities (deprecated)
- `facial-analysis.ts` — facial analysis types (deprecated)

**Status: DONE** (2026-09-23)

---

## SS-2: Restore OpenAI API credit or remove AI inference from demo

**Risk:** Current OpenAI balance is $0, causing 429 errors when `inferAllSkills()` is called. The demo works around this by pre-computing results at module load time. This is fragile — if anyone calls the real inference path, it fails.

**Options:**
1. **Restore credit** — simplest path. Add $5-10 to the OpenAI account.
2. **Remove AI inference from demo** — make the demo fully offline (self-assessment only, no AI path).
3. **Gate AI inference behind a feature flag** — only call GPT-4o when credits are confirmed.

**Status: OPEN** — recommend option 1 (restore credit) as the fastest path.

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
| SS-1: Facial analysis removal | EU AI Act violation | **DONE** |
| SS-2: OpenAI credit / demo fix | 429 errors in AI path | **OPEN** |
| SS-3: verify-env/test-env removal | Credential leak | **DONE** |
| SS-4: Youna encryption claim | False claim in README | **DONE** (Youna) |

---

Ossama Mokhtar · Dubai, UAE
