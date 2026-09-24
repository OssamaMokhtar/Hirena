# Hirena

**Skills self-assessment and gap analysis for product managers, bilingual Arabic/English and built MENA-first.**

You rate yourself on 35 PM competencies across six pillars, optionally describe your experience in text, and get a weighted score, a gap list and a learning roadmap for your target role.

> **Status (23 Sep 2026): working prototype, not in production, no users.** Hirena is a B2C self-assessment tool. It is **not** a hiring or candidate-screening product, and it has no hiring pipeline or employer customers.

**Architecture docs:** [full set](docs/README.md) · [system architecture](docs/01-system-architecture.md) · [AI architecture](docs/04-ai-architecture.md) · [scoring engine](docs/05-scoring-engine.md) · [evaluation](docs/07-evaluation.md) · [security and compliance](docs/08-security-and-compliance.md) · [decision log](docs/10-decision-log.md) · [gaps](docs/GAPS.md)

---

## How it works

| Step | What happens | Where |
|---|---|---|
| 1. Self-assessment | 0–5 rating per skill, 35 skills, 6 pillars (Strategy, Discovery, Delivery, Analytics, AI, Leadership) | `src/components/assessment-wizard.tsx`, `src/lib/competency-model.ts` |
| 2. Optional text evidence | You describe what you did; GPT-4o proposes a level with a confidence and a reason | `src/lib/ai.ts`, `POST /api/assess` |
| 3. Scoring | Deterministic, role-weighted scoring (e.g. VP Product weights Strategy at 40%) | `src/lib/scoring-engine.ts` |
| 4. Results | Score, strengths, gaps, missing skills, 3-horizon roadmap, resources | `src/components/results-dashboard.tsx` |

**Text only, by design.** Hirena does not analyse video, voice, faces or emotion. An earlier exploration did, and it was removed on 23 Sep 2026: inferring a person's emotions in an education or workplace setting is prohibited by EU AI Act Art. 5(1)(f), and employment assessment is high-risk under Annex III. Tests fail the build if any of that code returns.

**AI honesty.** If the OpenAI call fails or no key is set, a documented rule-based estimator fills in. Those results are labelled "Rule-based estimate — no AI model was called" on the results page. The landing-page demo is a pre-computed sample and is labelled as one.

## What is not validated

- The competency weights are product judgement. No study yet shows the score correlates with manager ratings or job outcomes.
- The AI-proposed levels have no accuracy or fairness measurement.
- The planned check: 15 PMs, comparing Hirena's result against their manager's rating, and passing only if Hirena predicts the manager's rating better than plain self-report does.

## Run it

```bash
npm install
cp .env.example .env.local   # optional: OPENAI_API_KEY, AI_MODE=auto|mock|production
npm run dev                  # http://localhost:3000
npm test
npm run build
```

With no key, `AI_MODE=auto` uses the labelled rule-based fallback.

## API

| Route | Purpose |
|---|---|
| `POST /api/assess` | Score an assessment; optional text-evidence inference |
| `GET/PATCH /api/preferences` | User preferences: AI mode, language, region |
| `GET /api/share/[id]` | Shareable report |
| `/api/facial/analyze`, `/api/voice/analyze`, `/api/verify-env`, `/api/test-env` | **410 Gone.** Removed for compliance and security; kept only so old clients get a clear answer |

Full reference: [`docs/03-api.md`](docs/03-api.md).

## Quality gates (CI, every push and PR)

Typecheck → lint → tests → build → `npm audit` (high and critical fail). The tests cover scoring determinism, that removed endpoints return 410 without key material, that no source file scores emotion or eye contact, and that fallback results are labelled.

## Security

- The `verify-env` and `test-env` routes used to return the first characters of the OpenAI key. Both now return 410, and a test blocks the pattern. **If that key was ever deployed, rotate it.**
- No authentication is required for the core flow; Supabase auth is optional.

## Docs

[Architecture docs](docs/README.md) · [PRD](docs/PRD.md) · [Competency models](docs/competency-models.md) · [Roadmap](docs/roadmap.md) · [STOP SHIP log](docs/STOP-SHIP.md) · [Archive](docs/archive/README.md) (pre-text-only designs)

## Tech

Next.js 15 · TypeScript · Tailwind · shadcn/ui + Radix · OpenAI GPT-4o (text) · Vitest · Supabase (optional)

## Licence

Proprietary. All rights reserved. The source is public for review; it is not open to external contributions.

---

Ossama Mokhtar · Dubai, UAE
