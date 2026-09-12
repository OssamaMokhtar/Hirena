# Hirena Documentation Suite

> **Last Updated:** September 12, 2026  
> **Version:** 2.0  
> **Project Lead:** Ossama Mokhtar  
> **Status:** Active Development (MVP Phase)

---

## 📚 Documentation Index

### Product Requirements
| Document | Description |
|----------|-------------|
| [PRD.md](./PRD.md) | Complete Product Requirements Document — vision, scope, feature specs, user journeys, acceptance criteria |

### Architecture
| Document | Description |
|----------|-------------|
| [Architecture Overview](./architecture-overview.html) | Visual HTML architecture diagram with all layers, data flows, and current status |
| [Data Flow Diagrams](./data-flows.md) | Detailed data flow diagrams: assessment, real-time interview, multi-role competency models |

### Market Research & Competition
| Document | Description |
|----------|-------------|
| [Market Research](./market-research.md) | HR tech market context (2026), competitive landscape, full competitor matrix, feature prioritization impact analysis |

### Roadmap
| Document | Description |
|----------|-------------|
| [Roadmap](./roadmap.md) | Complete 3-phase roadmap: Phase 1 (MVP), Phase 2 (Expansion), Phase 3 (Advanced), with dependencies, timeline, and KPIs |

### Impact Analysis
| Document | Description |
|----------|-------------|
| [Impact Analysis](./impact-analysis.md) | Technical impact, business impact, risk analysis, compliance posture |

### Developer Reference
| Document | Description |
|----------|-------------|
| [Competency Models](./competency-models.md) | Multi-role competency model spec, skill structure, career ladders, scoring logic |
| [API Reference](./api-reference.md) | All API endpoints: request/response shapes, flows, status |

---

## 🎯 Quick Links

- **Demo:** [hirena.vercel.app](https://hirena-seven.vercel.app) (or latest Vercel preview)
- **GitHub:** [github.com/OssamaMokhtar/Hirena](https://github.com/OssamaMokhtar/Hirena)
- **Live API Verification:** `GET /api/verify-env` → `hasKey: true`
- **Assessment API:** `POST /api/assess` → returns assessment result
- **Real-Time Interview:** WebSocket at `/api/interview/session`

---

## 🏗️ Architecture at a Glance

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           CLIENT (Browser)                                  │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────────┐     │
│  │ Assessment      │  │ Real-Time       │  │ Results Dashboard       │     │
│  │ Wizard          │  │ Interview       │  │ (Assessment/Interview)  │     │
│  │ (5-step flow)   │  │ Wizard (8-step) │  │                         │     │
│  │                 │  │                 │  │                         │     │
│  │ - Profile       │  │ - Avatar Mentor │  │ - Overall Score         │     │
│  │ - Goal          │  │ - Video Capture │  │ - Competency Breakdown  │     │
│  │ - Self-Rate     │  │ - Voice/Facial  │  │ - Skill Ranking         │     │
│  │ - AI Skill      │  │   Analysis      │  │ - Gap Analysis          │     │
│  │   Analysis      │  │ - Results       │  │ - Roadmap Actions       │     │
│  │ - Review        │  │   Fusion        │  │                         │     │
│  └────────┬────────┘  └────────┬────────┘  └─────────────────────────┘     │
│           │                     │                                           │
│           └─────────────────────┘                                           │
│                                     │                                        │
└─────────────────────────────────────┼────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                        API GATEWAY (Next.js App Router)                     │
│  ┌──────────────────┐  ┌──────────────────┐  ┌─────────────────────────┐  │
│  │ /api/assess      │  │ /api/interview   │  │ /api/fusion/result       │  │
│  │ POST: Submit     │  │ WebSocket: Live  │  │ POST: Fuse voice+facial  │  │
│  │ assessment + AI  │  │ interview session│  │ +self-assessment         │  │
│  │ inference        │  │                  │  │                         │  │
│  └──────────────────┘  └──────────────────┘  └─────────────────────────┘  │
│  ┌──────────────────┐  ┌──────────────────┐                               │
│  │ /api/verify-env  │  │ /api/voice/      │                               │
│  │ GET: Verify API  │  │ /analyze         │                               │
│  │ key loaded       │  │ POST: Voice      │                               │
│  └──────────────────┘  │   analysis       │                               │
│                         └──────────────────┘                               │
│                         ┌──────────────────┐                               │
│                         │ /api/facial/     │                               │
│                         │ /analyze         │                               │
│                         │ POST: Facial     │                               │
│                         │   analysis       │                               │
│                         └──────────────────┘                               │
└─────────────────────────────────────┬────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          SERVER-SIDE SERVICES                                │
│  ┌────────────────────┐  ┌────────────────────┐  ┌──────────────────────┐   │
│  │ Scoring Engine     │  │ Competency Models  │  │ Results Fusion       │   │
│  │ computeAssessment  │  │ 5 roles built:     │  │ Voice + Facial +     │   │
│  │ Result()           │  │ SW, FE, BE, FS, QA │  │ Self → Overall Score │   │
│  │ - Merges AI levels │  │ 9 roles in roadmap │  │ - Weighted scoring    │   │
│  │   over self-assess │  │ PM model: 35 skills │  │ - Dimension breakdown │   │
│  │ - Weighted pillars │  │ Career ladders     │  │ - Strengths/gaps      │   │
│  │ - Gap analysis     │  │ Regional benchmarks│  │                      │   │
│  └────────────────────┘  └────────────────────┘  └──────────────────────┘   │
│  ┌────────────────────┐  ┌────────────────────┐  ┌──────────────────────┐   │
│  │ Real-Time Session  │  │ Signal Analysis    │  │ Video Interview      │   │
│  │ Manager            │  │ (Voice/Facial)     │  │ (MediaRecorder)      │   │
│  │ 8-step state mach. │  │ Utilities          │  │ Utilities            │   │
│  └────────────────────┘  └────────────────────┘  └──────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                         AI & EXTERNAL SERVICES                               │
│  ┌────────────────────┐  ┌────────────────────┐  ┌──────────────────────┐   │
│  │ OpenAI GPT-4o      │  │ Supabase (Future)  │  │ Avatar/TTS (Option 2) │   │
│  │ - AI skill inference│  │ - Auth             │  │ - D-ID / HeyGen      │   │
│  │ - Career guidance   │  │ - User profiles    │  │ - ElevenLabs / OpenAI │   │
│  │ - Assessment scoring│  │ - Assessment hist. │  │   TTS                 │   │
│  │ - Competency model  │  │ - Benchmarks data  │  └──────────────────────┘   │
│  │   training (future) │  └────────────────────┘                               │
│  └────────────────────┘                                                       │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                        INFRASTRUCTURE (Deployment)                          │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ Vercel (Next.js Native Deployment)                                  │    │
│  │ - Serverless API routes                                             │    │
│  │ - Edge functions (future)                                           │    │
│  │ - Automatic HTTPS, CDN, scaling                                     │    │
│  │ - Environment variables (OPENAI_API_KEY)                            │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📊 Project Statistics

| Metric | Value |
|--------|-------|
| **Roles Built** | 5 of 14+ (Software Engineer, Frontend, Backend, Full-Stack, QA Engineer) |
| **Roles in Roadmap** | 9 (DevOps, Data Analyst, Data Engineer, UX/UI, Eng Manager, Tech Lead, Scrum Master, BA, Architect) |
| **Total Skills Built** | 171 skills across 5 roles |
| **Total Skills Target** | 370+ skills across 14+ roles |
| **Pillars Built** | 78 pillars across 5 roles |
| **Pillars Target** | 260+ pillars across 14+ roles |
| **API Endpoints Built** | 7 (verify-env, assess, voice/analyze, facial/analyze, fusion/result, interview/session) |
| **AI Features Built** | Voice analysis ✅, Facial analysis ✅, Results fusion ✅, Real-time interview session ✅ |
| **Competency Models** | PM (35 skills, 6 pillars) + 5 engineering roles (171 skills, 78 pillars) |
| **Career Ladders** | 6 roles with full career progression (Junior→Principal/Manager/Director) |
| **Demo Status** | ✅ Working (pre-computed results, localStorage persistence) |
| **Build Status** | ✅ `tsc --noEmit` clean, `npm run build` passes |
| **Tech Stack** | Next.js 15 + TypeScript + Tailwind + Shadcn/UI + OpenAI GPT-4o + Vercel |

---

## 🔑 Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| **Hybrid assessment (self + AI inference)** | Combines subjective self-rating (0-7) with objective AI inference from experience descriptions — gives more accurate assessment than either alone |
| **Sync scoring engine** | `computeAssessmentResult()` is synchronous; AI calls happen in route handler before passing results to engine — keeps engine pure and testable |
| **AI inference is optional** | Core flow works with self-assessment alone; AI inference adds depth when OpenAI credits available — demo bypasses API entirely via pre-computed results |
| **MENA-first, global-ready** | Regional benchmarks for MENA, APAC, NA, EMEA; bilingual AR/EN from day one |
| **PM vertical is first** | Product Management (35 skills, 6 pillars) is the first competency model — expandable to other tracks |
| **Real-time interview as Option 2/3** | Built as modular upgrade path: Option 1 (OpenAI-native) → Option 2 (specialized services) → Option 3 (real-time avatar conversation) |
| **Multi-role competency models** | 5 of 14+ roles built with full skill catalogs, career ladders, and proficiency levels (0-7) |
| **Type system flexibility** | `Skill.category` is `string` (46 categories), `CareerLadderStep.expected` is `Record<string,number>` — accommodates varied role structures without constant type updates |

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/OssamaMokhtar/Hirena.git
cd Hirena

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Add your OpenAI API key: OPENAI_API_KEY=sk-proj-...

# Run development server
npm run dev

# Build for production
npm run build

# Type-check
npx tsc --noEmit
```

---

*This documentation suite provides comprehensive coverage of the Hirena project: product requirements, architecture, data flows, market research, roadmap, impact analysis, and developer reference. All documents are living artifacts updated as the project evolves.*
