<!-- ARCHIVED -->
<div align="center">

# ⚠️ This repository has been merged into [Hirena](https://github.com/OssamaMokhtar/Hirena)

**OS3** is now part of **Hirena** — the canonical home for AI-powered skills assessment & career pathing.

🔗 Continue at: https://github.com/OssamaMokhtar/Hirena

</div>

---

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
- **AI:** OpenAI GPT-4o (multi-modal: text + vision + audio)
- **Design System:** Apple-inspired, clean/minimal, teal primary color
- **Deployment:** Vercel (Next.js native)
- **Database (Optional):** Supabase (auth, profile storage, assessment history)

### Project Structure

```
hirena/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── assess/route.ts          # POST: Assessment submission + AI inference
│   │   │   ├── verify-env/route.ts      # GET: Verify OpenAI API key loaded
│   │   │   ├── test-env/route.ts        # GET: Alternate env test
│   │   │   ├── interview/
│   │   │   │   └── session/route.ts     # WebSocket: Real-time interview session
│   │   │   ├── voice/
│   │   │   │   └── analyze/route.ts     # POST: Voice analysis from transcription
│   │   │   ├── facial/
│   │   │   │   └── analyze/route.ts     # POST: Facial expression analysis from video
│   │   │   └── fusion/
│   │   │       └── result/route.ts      # POST: Multi-modal results fusion
│   │   ├── page.tsx                     # Landing page + demo assessment
│   │   └── layout.tsx                   # Root layout with fonts, metadata
│   ├── components/
│   │   ├── ui/                          # Shadcn/UI components (button, card, input, etc.)
│   │   ├── assessment-wizard.tsx        # 5-step assessment wizard
│   │   ├── results-dashboard.tsx        # Results display with scores, gaps, roadmap
│   │   ├── avatar-mentor.tsx            # Avatar mentor for real-time interview
│   │   ├── real-time-interview-wizard.tsx  # 8-step real-time interview flow
│   │   ├── video-interview.tsx          # Video interview capture component
│   │   └── ...
│   ├── lib/
│   │   ├── scoring-engine.ts            # computeAssessmentResult(): scoring + gap analysis
│   │   ├── ai.ts                        # OpenAI client + inferAllSkills() + roadmap generation
│   │   ├── competency-model.ts          # 35 PM skills, 6 pillars, career ladder
│   │   ├── pillar-model.ts              # Pillar weights and definitions
│   │   ├── real-time-interview.ts       # Real-time interview session manager
│   │   ├── results-fusion.ts            # Multi-modal results fusion engine
│   │   ├── signal-analysis.ts           # Voice/facial signal analysis utilities
│   │   ├── video-interview.ts           # Video interview utilities
│   │   └── utils.ts                     # cn() utility (clsx + tailwind-merge)
│   ├── types/
│   │   └── index.ts                     # TypeScript types: Skill, AssessmentInput, Result, etc.
│   └── ...
├── docs/
│   ├── architecture-overview.html       # Architecture diagram (HTML)
│   └── architecture-enhancement-options.md  # 3 implementation options
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

#### `GET /api/verify-env`
Verifies that the OpenAI API key is loaded in the environment.

**Response:**
```json
{
  "hasKey": true,
  "keyPrefix": "sk-proj-...",
  "model": "gpt-4o"
}
```

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

### Real-Time Interview APIs (Option 2/3)

#### `POST /api/voice/analyze`
Analyzes voice characteristics from a transcription + duration.

**Request Body (form-data):**
- `targetRole`: string — target role for context
- `transcription`: string — spoken content transcript
- `duration`: number — duration in seconds

**Response:**
```json
{
  "success": true,
  "result": {
    "overallQuality": 3.5,
    "dimensions": {
      "confidence": 3.5,
      "clarity": 3.8,
      "pacing": 3.2,
      "emotion": 3.3,
      "engagement": 3.4,
      "fillerWords": 3.8
    }
  },
  "note": "Simulated analysis"
}
```

#### `POST /api/facial/analyze`
Analyzes facial expressions from video frames.

**Request Body (form-data):**
- `targetRole`: string — target role for context
- `duration`: number — duration in seconds

**Response:**
```json
{
  "success": true,
  "result": {
    "overallEngagement": 2.9,
    "dimensions": {
      "eyeContact": 2.6,
      "engagement": 2.8,
      "confidence": 3.3,
      "stress": 3.9,
      "expressiveness": 3.9,
      "smileWarmth": 0.7
    },
    "frames": [ ... ],           // 6 frames with emotion, eye contact, expression, head pose
    "emotionDistribution": [ ... ],
    "metadata": { ... }
  },
  "note": "Simulated analysis"
}
```

#### `POST /api/fusion/result`
Fuses voice + facial + self-assessment signals into a comprehensive score.

**Request Body:**
```typescript
{
  targetRole: string;
  voiceAnalysis: VoiceAnalysisResult;
  facialAnalysis: FacialAnalysisResult;
  selfAssessment?: Record<string, number>;
  competencyModel?: RoleCompetencyModel;
}
```

**Response:**
```json
{
  "success": true,
  "result": {
    "overallScore": 3.54,        // 0-5 scale
    "scores": {
      "voice": 3.5,
      "facial": 2.9,
      "selfAssessment": 0,
      "content": 0
    },
    "dimensionBreakdown": { ... },
    "strengths": [ ... ],
    "gaps": [ ... ],
    "recommendations": [ ... ]
  },
  "note": "Simulated fusion"
}
```

#### `WebSocket /api/interview/session`
Manages a real-time interview session with an avatar mentor.

**Flow (8 steps):**
1. **Greeting** — Server sends welcome message
2. **Context** — Client sends target role + experience level
3. **Instruction** — Server sends interview instructions
4. **Avatar Question** — Server sends first interview question
5. **Record** — Client records video response
6. **Voice Analysis** — Server analyzes voice from transcription
7. **Facial Analysis** — Server analyzes facial expressions from video
8. **Feedback** — Server sends analysis feedback
9. **Follow-up** — Server sends follow-up question (repeat steps 4-8)
10. **Final Result** — Server sends comprehensive assessment result

**Messages:**
- `WSServerMessage` — Server → Client: type, step, message, data
- `WSClientMessage` — Client → Server: type, step, data (context, transcription, video)

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

### Expansion Plans (Option 2/3)

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

### Verify Environment
```bash
curl http://localhost:3000/api/verify-env
# Expected: {"hasKey":true,"keyPrefix":"sk-proj-...","model":"gpt-4o"}
```

### Test Assessment (self-assessment only, no AI credits needed)
```bash
curl -X POST http://localhost:3000/api/assess \
  -H "Content-Type: application/json" \
  -d '{"targetRole":"product-manager","targetTrack":"general","region":"MENAC","selfAssessment":{}}'
# Expected: {"success":true,"result":{"overallScore":42,...}}
```

### Test Real-Time Interview APIs (simulated)
```bash
# Voice analysis
curl -X POST http://localhost:3000/api/voice/analyze \
  -F "targetRole=software-engineer" \
  -F "transcription=I built a React application..." \
  -F "duration=30"

# Facial analysis
curl -X POST http://localhost:3000/api/facial/analyze \
  -F "targetRole=software-engineer" \
  -F "duration=30"

# Results fusion
curl -X POST http://localhost:3000/api/fusion/result \
  -H "Content-Type: application/json" \
  -d '{"targetRole":"software-engineer","voiceAnalysis":{...},"facialAnalysis":{...}}'
```

---

## 🚧 Current Status (2026-09-10)

### ✅ Verified Working

- ✅ Landing page renders (HTTP 200)
- ✅ "See a demo assessment" button — shows pre-computed results
- ✅ "Start Free Assessment" button — starts 5-step wizard
- ✅ `/api/verify-env` → `hasKey: true` (OpenAI key loaded)
- ✅ `/api/assess` self-assessment path → `overallScore: 42`
- ✅ `/api/fusion/result` → fused score with dimension breakdown
- ✅ `/api/voice/analyze` → simulated voice analysis (6 dimensions)
- ✅ `/api/facial/analyze` → simulated facial analysis (6 frames, emotion distribution)
- ✅ `/api/interview/session` → WebSocket session management (8-step flow)
- ✅ TypeScript compilation clean (`npx tsc --noEmit` exit 0)
- ✅ Dev server running at localhost:3000
- ✅ Real-time interview wizard built (8-step flow with avatar mentor)
- ✅ Results fusion engine working (multi-modal scoring)

### 🔧 In Progress

- 🔧 Browser smoke test of real-time interview wizard (next step)
- 🔧 Commit + push to GitHub (next step)
- 🔧 AI inference path blocked by 429 (OpenAI balance $0) — demo uses pre-computed results

### 🚀 Option 2/3 Components Built

| Component | Status | Description |
|-----------|--------|-------------|
| `real-time-interview-wizard.tsx` | ✅ Built | 8-step wizard with state management |
| `avatar-mentor.tsx` | ✅ Built | Avatar mentor with conversation state |
| `signal-analysis.ts` | ✅ Built | Voice/facial signal utilities |
| `results-fusion.ts` | ✅ Built | Multi-modal fusion + scoring engine |
| `real-time-interview.ts` | ✅ Built | Session manager (8-state machine) |
| `video-interview.ts` | ✅ Built | Video interview utilities |
| `/api/voice/analyze` | ✅ Verified | Voice analysis API (simulated) |
| `/api/facial/analyze` | ✅ Verified | Facial analysis API (simulated) |
| `/api/fusion/result` | ✅ Verified | Results fusion API (simulated) |
| `/api/interview/session` | ✅ Verified | WebSocket session management |

---

## 🔄 Implementation Options

See [docs/architecture-enhancement-options.md](docs/architecture-enhancement-options.md) for 3 implementation options:

1. **Option 1: OpenAI-Native Extension** — Fastest path (2-4 weeks), leverages GPT-4o multi-modal capabilities
2. **Option 2: Specialized AI Services** — Best quality (6-10 weeks), uses Deepgram/AssemblyAI, AWS Rekognition/DeepFace, D-ID/HeyGen
3. **Option 3: Purpose-Built Platform** — Most comprehensive (12-20 weeks), real-time WebSocket avatar with continuous multi-modal analysis

**Recommendation:** Start with Option 1 for the demo, then evolve to Option 2.

---

## 📄 Documentation

- [Architecture Overview](docs/architecture-overview.html) — Visual architecture diagram
- [Architecture Enhancement Options](docs/architecture-enhancement-options.md) — 3 implementation paths with pros/cons/costs

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
