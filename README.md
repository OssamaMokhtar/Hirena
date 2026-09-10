# Hirena

> **AI-powered skills assessment & career pathing.**
> Assess your skills against any job description. See your gap. Find your path.
> Bilingual Arabic/English. MENA-first. Global second.

`TypeScript` · `React` · `Vite` · `Tailwind` · `Gemini`

**[Try Hirena →](https://hirena.vercel.app)** *(coming soon)*

---

## The Problem

Career decisions are built on guesswork. People guess their skills, compare themselves to vague job descriptions, and choose career paths based on gut feeling — not evidence.

Hirena replaces guesswork with measurement. You tell Hirena your current position and skillset, paste any job description you're targeting, and Hirena generates:

- **Skills Scale** — your proficiency levels across every skill the role needs
- **Gap Analysis** — exactly what you're missing, what you're overqualified for, what needs development
- **Match Score** — how you stack up against the role, skill by skill
- **Career Path** — your road to the role, with skill acquisition priorities and development roadmap

## What Hirena Does

- **Skills Assessment** — AI measures your skills against any job description, generates proficiency scale and gap analysis
- **Career Pathing** — AI recommends career paths based on your skills + market demand, with skill acquisition roadmap
- **Bilingual AR/EN** — Full Arabic and English support, RTL layout, MENA-first design
- **Self-Assessment** — Input your skills and experience, or upload your CV/resume/LinkedIn for automatic parsing
- **Development Roadmap** — Prioritized skill acquisition plan to close your gaps and reach your target role

## Hirena Skills Scale

Every skill is rated on a 6-level proficiency scale:

| Level | Label | What It Means |
|-------|-------|---------------|
| 0 | No Exposure | You've heard of it, can't use it |
| 1 | Aware | You understand the concept, can't apply it |
| 2 | Basic | You can use it with guidance, simple cases |
| 3 | Intermediate | You can use it independently, common cases |
| 4 | Advanced | You can handle complex cases, mentor others |
| 5 | Expert | You're an authority, can design/architect, teach it |

The Skills Scale shows: your proficiency vs the role's requirement, gap analysis, and priority-ranked development actions.

## Market

**B2C:** Individual professionals assessing their skills, planning career transitions, targeting specific roles. Freemium + Premium ($9.99/month).

**B2B:** Companies offering career development as an employee benefit. HR teams getting skills intelligence for workforce planning. Per-employee pricing.

**MENA-first, Global second.** Bilingual Arabic/English from day one. GCC market undertransformed by HR tech.

## Technology

- **Frontend:** React + Vite + TypeScript + Tailwind CSS
- **Backend:** Node.js + Express (server-side AI proxy)
- **AI:** Gemini (server-side only, API key protected, never exposed to client)
- **Deployment:** Vercel (frontend + serverless functions)
- **Database:** Firebase Firestore (user profiles, assessment history — Phase 2)

## Status

**Active build.** Hirena is being rebuilt from the CareerOracle codebase with a new mission: skills assessment and career pathing, not cognitive assessment and market insights. The architecture (server-side AI, bilingual UI, React + Vite + TypeScript stack) transfers directly. The product surface is being redefined.

**Known Issues**
- Tailwind CSS is currently loaded from CDN. Migration to PostCSS pending.
- Assessment engine being rebuilt — current CareerOracle assessment logic is being replaced with Hirena skills scale logic.
- No user testing yet.

## Documentation

- [Security](SECURITY.md) — architecture security model, data classification, known gaps
- [Privacy](PRIVACY.md) — data collection, storage, UAE PDPL rights
- [CI Workflow](.github/workflows/ci.yml) — repository structure validation + secret scanning

## License

MIT

---

*Built by [Ossama Mokhtar](https://github.com/OssamaMokhtar) — AI Product Manager, Dubai.*
*Hirena — Assess your skills. Find your path.*
