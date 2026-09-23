# Hirena

**AI-Powered Skills Assessment Platform for the MENA Region**

Hirena is a Next.js 15 web application that helps professionals assess their skills, identify gaps, and build personalized learning roadmaps. Built for the MENA market with bilingual Arabic/English support.

## 🚀 What is Hirena?

Hirena is an AI-powered skills assessment platform that combines:

- **Self-Assessment** — Rate your skills on a 0-5 scale across 35 product management competencies
- **AI Inference** — Describe your experience, and GPT-4o infers your actual proficiency levels
- **Competency Scoring** — Weighted pillar scoring across 6 dimensions: Strategy, Discovery, Delivery, Analytics, AI, Leadership
- **Gap Analysis** — Identify strengths, gaps, and missing skills with priority rankings
- **Roadmap Generation** — Personalized learning actions (immediate, intermediate, long-term) and resources

### Target Audience

- **B2C Freemium** — Individual professionals seeking career development
- **B2B Expansion** — Companies seeking to assess and develop their teams

### Market Positioning

- **MENA-first** — Regional benchmarks for MENA, APAC, NA, EMEA
- **Bilingual** — Arabic/English, RTL support ready
- **Apple-inspired Design** — Clean, minimal, teal (#0D9488) brand color

---

## 🏗️ Architecture

### Tech Stack

- **Frontend:** Next.js 15 + TypeScript + Tailwind CSS + Shadcn/UI + Radix UI
- **Backend:** Next.js App Router API routes (serverless)
- **AI:** OpenAI GPT-4o (text inference)
- **Design System:** Apple-inspired, clean/minimal, teal primary color
- **Deployment:** Vercel (Next.js native)
- **Database (Optional):** Supabase (auth, profile storage, assessment history)

### Current Scope

Hirena's production scope is **self-assessment + AI text inference + competency scoring**. Voice and facial analysis were explored as Option 2/3 enhancements but **are not in scope for the production release** (see STOP SHIP below).

### Project Structure

```
hirena/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── assess/route.ts          # POST: Assessment submission + AI inference
│   │   │   ├── auth/                     # Auth routes (future)
│   │   │   ├── preferences/             # User preference routes
│   │   │   ├── share/                   # Share/link routes
│   │   │   ├── interview/
│   │   │   │   └── session/route.ts     # WebSocket: Real-time interview session (text-based)
│   │   │   └── fusion/
│   │   │       └── result/route.ts      # POST: Multi-modal results fusion (self-assessment only)
│   │   ├── page.tsx                     # Landing page + demo assessment
│   │   └── layout.tsx                   # Root layout with fonts, metadata
│   ├── components/
│   │   ├── ui/                          # Shadcn/UI components (button, card, input, etc.)
│   │   ├── assessment-wizard.tsx        # 5-step assessment wizard
│   │   ├── results-dashboard.tsx        # Results display with scores, gaps, roadmap
│   │   ├── avatar-mentor.tsx            # Avatar mentor for real-time interview
│   │   ├── real-time-interview-wizard.tsx  # 8-step real-time interview flow (text)
│   │   └── ...
│   ├── lib/
│   │   ├── scoring-engine.ts            # computeAssessmentResult(): scoring + gap analysis
│   │   ├── ai.ts                        # OpenAI client + inferAllSkills() + roadmap generation
│   │   ├── competency-model.ts          # 35 PM skills, 6 pillars, career ladder
│   │   ├── pillar-model.ts              # Pillar weights and definitions
│   │   ├── real-time-interview.ts       # Real-time interview session manager (text)
│   │   ├── results-fusion.ts            # Self-assessment fusion engine
│   │   ├── video-interview.ts           # Video interview utilities (DEPRECATED)
│   │   └── utils.ts                     # cn() utility (clsx + tailwind-merge)
│   ├── types/
│   │   └── index.ts                     # TypeScript types: Skill, AssessmentInput, Result, etc.
│   └── ...
├── docs/
│   ├── architecture-overview.html       # Architecture diagram (HTML)
│   ├── architecture-enhancement-options.md  # 3 implementation options
│   └── STOP-SHIP.md                     # Mandatory fixes before any deployment
├── public/
│   └── ...
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── README.md
```

---

## 📡 API Endpoints

### Assessment APIs

#### `POST /api/assess`
Submits an assessment for scoring. Accepts self-assessment ratings and optional AI inference inputs.

**Request Body:**
```typescript
{
  targetRole: string;           // e.g., "product-manager"
  targetTrack: string;          // e.g., "general"
  region: string;               // e.g., "MENAC"
  selfAssessment: Record<string, number>;  // { skillId: 0-5, ... }
  aiInferenceInputs?: {         // Optional: experience descriptions for AI inference
    skillId: string;
    description: string;
  }[];
}
```

**Response:**
```json
{
  "success": true,
  "result": {
    "userId": "demo-user",
    "overallScore": 42,          // 0-100
    "competencyScores": { ... }, // Per-pillar scores
    "skillRanking": [ ... ],     // All 35 skills ranked
    "strengths": [ ... ],        // Top 5 strengths
    "gaps": [ ... ],             // Top 5 gaps
    "missingSkills": [ ... ],    // Skills not self-assessed
    "roadmapActions": { ... },   // immediate / intermediate / long-term
    "learningResources": [ ... ]
  }
}
```

### Real-Time Interview APIs

#### `WebSocket /api/interview/session`
Manages a real-time text-based interview session with an avatar mentor.

**Flow (8 steps, text-only):**
1. **Greeting** — Server sends welcome message
2. **Context** — Client sends target role + experience level
3. **Instruction** — Server sends interview instructions
4. **Avatar Question** — Server sends first interview question
5. **Response** — Client sends text response
6. **AI Analysis** — Server analyzes response content via GPT-4o
7. **Feedback** — Server sends analysis feedback
8. **Follow-up** — Server sends follow-up question (repeat steps 4-7)
9. **Final Result** — Server sends comprehensive assessment result

**Messages:**
- `WSServerMessage` — Server → Client: type, step, message, data
- `WSClientMessage` — Client → Server: type, step, data (context, text response)

### Deprecated Endpoints (STOP SHIP — removed)

The following endpoints have been **removed** from the codebase and must not be restored:

| Endpoint | Reason | Status |
|---|---|---|
| `GET /api/verify-env` | Leaked OpenAI API key prefix in HTTP response — security risk | **Removed** (410) |
| `GET /api/test-env` | Leaked OpenAI API key prefix in HTTP response — security risk | **Removed** (410) |
| `POST /api/voice/analyze` | Voice analysis from transcription — explored, not in production scope | **Removed** (410) |
| `POST /api/facial/analyze` | Facial expression analysis from video — violates EU AI Act Art. 5(1)(f) | **Removed** (410) |

All four endpoints now return HTTP 410 (Gone) with an explanation. If you see them listed in documentation or code references anywhere, treat that as outdated.

---

## 🎯 Competency Model

### Current: Product Management (35 skills, 6 pillars)

| Pillar | Weight | Skills |
|--------|--------|--------|
| Strategy | 20% | Product vision, Strategic planning, Market analysis, Competitive analysis, Roadmap strategy, Business case development, Stakeholder management |
| Discovery | 20% | User research, Customer interviews, Problem framing, Opportunity assessment, Discovery workshops, Prototyping, Usability testing |
| Delivery | 25% | Agile/Scrum, Sprint planning, Backlog management, Release planning, Feature prioritization, MVP definition, Cross-functional leadership |
| Analytics | 15% | Data analysis, A/B testing, Metrics definition, Funnel analysis, Cohort analysis, SQL basics, Experiment design |
| AI | 10% | AI/ML fundamentals, AI product design, Prompt engineering, AI ethics, Data privacy, AI roadmap integration, LLM application design |
| Leadership | 10% | Team leadership, Mentoring, Communication, Influence without authority, Conflict resolution, Decision-making, Executive presentation |

### Career Ladder

- **APM (Associate Product Manager)** → Level 0-2
- **PM (Product Manager)** → Level 2-3
- **Senior PM** → Level 3-4
- **Group PM** → Level 4-5
- **Director of Product** → Level 5
- **CPO (Chief Product Officer)** → Level 5+

### Expansion Plans (Option 2/3 — not in scope)

- **Software Industry Roles:** Data Analyst, BA, QA Engineer, Tester, Software Architect, Software Engineer, Frontend Engineer, Backend Engineer, Full-Stack Engineer, DevOps Engineer, UX/UI Designer, Engineering Manager, Tech Lead
- **~15 roles × ~25 skills avg = ~375 skills**
- **Proficiency Levels:** 0-7 scale (expanded from 0-5)
- **Career Ladders:** Role-specific ladders (e.g., Jr → Sr → Lead → Principal)

---

## 🎨 Design System

- **Primary Color:** Teal `#0D9488` (Hirena brand)
- **Typography:** System font stack (Inter fallback)
- **Style:** Clean, minimal, Apple-inspired
- **Dark Mode:** Supported via CSS variables + `prefers-color-scheme`
- **Bilingual:** Arabic/English, RTL support ready
- **Components:** Shadcn/UI + Radix UI primitives (Button, Card, Input, Select, Progress, Badge, Separator)

---

## 🧪 Demo

The demo bypasses the OpenAI API entirely by pre-computing assessment results at module load time using seed data.

**To use the demo:**
1. Run `npm run dev`
2. Open `http://localhost:3000`
3. Click "See a demo assessment"
4. View the pre-computed results dashboard

**Why this works without API credits:** The OpenAI account balance is $0, causing a 429 error when `inferAllSkills()` is called. The demo uses pre-computed AI inference results embedded in the page bundle.

---

## 📦 Installation & Running

```bash
# Install dependencies
npm install

# Set up environment variables
echo "OPENAI_API_KEY=sk-proj-..." > .env.local

# Run development server
npm run dev

# Open browser
open http://localhost:3000
```

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | OpenAI API key (sk-proj-...) | For AI inference |
| `SUPABASE_URL` | Supabase project URL | Optional (future) |
| `SUPABASE_ANON_KEY` | Supabase anon key | Optional (future) |

---

## 🧪 Testing

### Test Assessment (self-assessment only, no AI credits needed)

```bash
curl -X POST http://localhost:3000/api/assess \
  -H "Content-Type: application/json" \
  -d '{"targetRole":"product-manager","targetTrack":"general","region":"MENAC","selfAssessment":{}}'
# Expected: {"success":true,"result":{"overallScore":42,...}}
```

### Check Deprecated Endpoints

```bash
# All four deprecated endpoints return HTTP 410 (Gone)
curl http://localhost:3000/api/verify-env
curl http://localhost:3000/api/test-env
curl -X POST http://localhost:3000/api/voice/analyze \
  -F "targetRole=software-engineer" -F "transcription=hello" -F "duration=30"
curl -X POST http://localhost:3000/api/facial/analyze \
  -F "targetRole=software-engineer" -F "duration=30"
```

---

## 🚧 Current Status

### ✅ Verified Working

- ✅ Landing page renders (HTTP 200)
- ✅ "See a demo assessment" button — shows pre-computed results
- ✅ "Start Free Assessment" button — starts 5-step wizard
- ✅ `/api/assess` self-assessment path → `overallScore: 42`
- ✅ `/api/fusion/result` → self-assessment fused score
- ✅ `/api/interview/session` → WebSocket session management (text-based, 8-step flow)
- ✅ TypeScript compilation clean (`npx tsc --noEmit` exit 0)
- ✅ Dev server running at localhost:3000
- ✅ Real-time interview wizard built (8-step flow with avatar mentor, text-based)
- ✅ Results fusion engine working (self-assessment scoring)

### 🚫 Deprecated / Removed (STOP SHIP)

The following were explored as Option 2/3 enhancements but are **not in scope** for production and have been **removed from the codebase**:

- ❌ `/api/verify-env` — **Removed** (leaked API key prefix)
- ❌ `/api/test-env` — **Removed** (leaked API key prefix)
- ❌ `/api/voice/analyze` — **Removed** (not in production scope)
- ❌ `/api/facial/analyze` — **Removed** (EU AI Act Art. 5(1)(f) violation)
- ❌ `video-interview.ts` / `video-interview.tsx` — **Deprecated** (video capture component)
- ❌ `signal-analysis.ts` — **Deprecated** (voice/facial signal utilities)
- ❌ `facial-analysis.ts` — **Deprecated** (facial analysis types)

All deprecated code has been replaced with clear 410 responses. Do not restore.

### 🔧 In Progress

- 🔧 Browser smoke test of real-time interview wizard (next step)
- 🔧 AI inference path blocked by 429 (OpenAI balance $0) — demo uses pre-computed results

### 🚀 Option 2/3 Components (Explored — not in scope)

| Component | Status | Reason |
|-----------|--------|--------|
| `real-time-interview-wizard.tsx` | ✅ Built | Text-based interview wizard (in scope) |
| `avatar-mentor.tsx` | ✅ Built | Avatar mentor with conversation state (text-based, in scope) |
| `signal-analysis.ts` | ❌ Deprecated | Voice/facial signal utilities — removed |
| `results-fusion.ts` | ✅ Built | Self-assessment fusion engine (in scope) |
| `real-time-interview.ts` | ✅ Built | Session manager (text-based, in scope) |
| `video-interview.ts` | ❌ Deprecated | Video interview utilities — removed |
| `/api/voice/analyze` | ❌ Removed | Voice analysis — not in scope |
| `/api/facial/analyze` | ❌ Removed | Facial analysis — EU AI Act violation |
| `/api/fusion/result` | ✅ Built | Self-assessment fusion (in scope) |
| `/api/interview/session` | ✅ Built | WebSocket session management (in scope) |

---

## 🔄 Implementation Options

See [docs/architecture-enhancement-options.md](docs/architecture-enhancement-options.md) for 3 implementation options:

1. **Option 1: OpenAI-Native Extension** — Fastest path (2-4 weeks), leverages GPT-4o multi-modal capabilities
2. **Option 2: Specialized AI Services** — Best quality (6-10 weeks), uses Deepgram/AssemblyAI, AWS Rekognition/DeepFace, D-ID/HeyGen
3. **Option 3: Purpose-Built Platform** — Most comprehensive (12-20 weeks), real-time WebSocket avatar with continuous multi-modal analysis

**Recommendation:** Start with Option 1 for the demo, then evolve to Option 2.

**Note:** Option 2 and Option 3 included voice and facial analysis. These are **not in scope** for production due to EU AI Act constraints and lack of LLMVision API access. Focus on text-based interview analysis via GPT-4o.

---

## 🛑 STOP SHIP — Mandatory Fixes

These must be resolved before any deployment:

1. **SS-1: Remove facial analysis** — Biometric categorization is prohibited under EU AI Act Art. 5(1)(f). Facial analysis endpoints (`/api/facial/analyze`) and related code (`video-interview.ts`, `signal-analysis.ts`, `facial-analysis.ts`) have been removed. **Status: DONE** (2026-09-23).

2. **SS-2: Restore OpenAI API credit or remove AI inference from demo** — Current OpenAI balance is $0, causing 429 errors. Either restore credit or make demos fully offline. **Status: OPEN**.

3. **SS-3: Remove verify-env and test-env routes** — These leaked the OpenAI API key prefix in HTTP responses. Both endpoints have been removed (410 Gone). **Status: DONE** (2026-09-23).

4. **SS-4: (Youna repo)** Fix Youna README Privacy section — say localStorage, not encrypted. **Status: DONE** (2026-09-23, in Youna repo).

---

## 📄 Documentation

- [Architecture Overview](docs/architecture-overview.html) — Visual architecture diagram
- [Architecture Enhancement Options](docs/architecture-enhancement-options.md) — 3 implementation paths with pros/cons/costs
- [STOP SHIP](docs/STOP-SHIP.md) — Mandatory fixes before deployment (see above)

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is private and proprietary.

---

## 📧 Contact

**Ossama Mokhtar**  
AI Product Manager  
Dubai, UAE  
[github.com/OssamaMokhtar](https://github.com/OssamaMokhtar)
