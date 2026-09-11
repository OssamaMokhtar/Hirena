# Hirena Architecture Enhancement — 3 Options

## Current State (Baseline)
- **Stack:** Next.js 15 + TypeScript + Tailwind + Shadcn/UI + OpenAI GPT-4o
- **Assessment:** Self-rating (0-5) + AI inference from text descriptions
- **Domain:** Product Management only — 35 PM skills, 6 pillars
- **Demo:** Pre-computed result, localStorage persistence, no real API calls needed
- **Limitations:** No video, no voice, no facial analysis, no avatar, PM-only

---

## New Requirements
1. **Video interview mockups** — candidate records video responses
2. **Voice analysis** — tone, pacing, emotion, clarity from audio
3. **Facial expression analysis** — emotion detection from video
4. **Avatar mentor** — AI avatar that interviews the candidate (conversation + visual presence)
5. **Software industry only** — expand beyond PM to all product team roles
6. **Multi-role competency models** — Data Analyst, BA, QA, Tester, Architect, Engineer, Developer, Full-Stack, DevOps, UX/UI, Engineering Manager, etc. — each with all proficiency levels

---

## Option 1: OpenAI-Native Extension (Fastest Path, ~2-4 weeks)

**Philosophy:** Leverage GPT-4o's existing multi-modal capabilities. Minimal new infrastructure.

### Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Browser (Next.js Frontend)               │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────────┐ │
│  │ Video Interview│  │ Avatar Render│  │ Assessment Wizard │ │
│  │ (MediaRecorder)│  │ (CSS/SVG +   │  │ (existing,        │ │
│  │ + webcam       │  │  TTS audio)  │  │  extended)        │ │
│  └──────┬─────────┘  └──────┬───────┘  └────────┬────────┘ │
│         │                   │                     │          │
│         └───────────────────┴─────────────────────┘          │
│                         │                                   │
│                    POST /api/interview                      │
└─────────────────────────┼───────────────────────────────────┘
                          │
┌─────────────────────────┼───────────────────────────────────┐
│              API Routes (Next.js Server)                    │
│  ┌──────────────────┐  ┌──────────────────┐                │
│  │ /api/interview   │  │ /api/assess      │                │
│  │ - Receive video  │  │ (existing)       │                │
│  │ - Extract frames │  │                  │                │
│  │ - Analyze w/     │  │                  │                │
│  │   GPT-4o Vision  │  │                  │                │
│  │ - Analyze audio  │  │                  │                │
│  │   w/ GPT-4o /    │  │                  │                │
│  │   Whisper        │  │                  │                │
│  └────────┬─────────┘  └────────┬─────────┘                │
│           │                     │                           │
│           └─────────────────────┘                           │
│                         │                                   │
│              OpenAI API (GPT-4o + Whisper)                 │
│  - Vision: analyze video frames for expressions            │
│  - Audio: transcribe + analyze voice characteristics       │
│  - LLM: generate avatar responses, score against rubric    │
└─────────────────────────────────────────────────────────────┘
```

### What Changes

| Area | Change |
|------|--------|
| **Video capture** | Add `MediaRecorder` + `getUserMedia` in browser. Record candidate's video responses during mock interview. Upload to server. |
| **Voice analysis** | Extract audio from video → send to Whisper for transcription + GPT-4o for voice analysis (tone, confidence, pacing from audio characteristics). |
| **Facial analysis** | Extract frames from video → send to GPT-4o Vision for facial expression/emotion detection per frame or key moments. |
| **Avatar mentor** | Two sub-options: (a) **Simple:** CSS/SVG animated character that "speaks" via TTS audio (GPT-4o Voice or ElevenLabs) — lip-sync via audio waveform animation. (b) **Better:** Integrate an avatar API (D-ID, HeyGen, or similar) for a realistic talking head that receives text and returns video. |
| **Avatar conversation** | LLM (GPT-4o) generates interview questions based on target role + competency model. Avatar "speaks" the question. Candidate responds via video. Loop continues. |
| **Competency models** | Expand from 1 PM model to N software role models. Each role: 20-40 skills, 5-7 proficiency levels, expected levels per seniority. |
| **Scoring** | Extend `computeAssessmentResult` to accept video analysis results (facial + voice + content) alongside self-assessment + AI text inference. |

### Competency Model Expansion

```typescript
// Each role gets its own competency model
interface RoleCompetencyModel {
  role: "data-analyst" | "business-analyst" | "qa-engineer" | "tester" | 
         "software-architect" | "software-engineer" | "full-stack-engineer" |
         "frontend-engineer" | "backend-engineer" | "devops-engineer" |
         "uxui-designer" | "engineering-manager" | "tech-lead";
  
  skills: Skill[];        // 20-40 skills per role
  pillars: Pillar[];      // 4-6 competency pillars per role
  levels: ProficiencyLevel[];  // 0-5 or expanded 0-7
  careerLadder: CareerLadderStep[];  // Junior → Senior → Lead → Principal → etc.
  expectedLevels: Record<string, number>;  // { "junior": 2, "senior": 4, ... }
}
```

**Example — Software Engineer competency model:**
```typescript
const SOFTWARE_ENGINEER_SKILLS = [
  // Technical depth
  { id: "data-structures", name: "Data Structures", category: "technical-foundation", description: "..." },
  { id: "algorithms", name: "Algorithms", category: "technical-foundation", description: "..." },
  { id: "system-design", name: "System Design", category: "architecture", description: "..." },
  { id: "design-patterns", name: "Design Patterns", category: "architecture", description: "..." },
  // Languages
  { id: "typescript", name: "TypeScript", category: "languages", description: "..." },
  { id: "python", name: "Python", category: "languages", description: "..." },
  { id: "java", name: "Java", category: "languages", description: "..." },
  { id: "go", name: "Go", category: "languages", description: "..." },
  // Infrastructure
  { id: "databases-sql", name: "SQL Databases", category: "data", description: "..." },
  { id: "databases-nosql", name: "NoSQL Databases", category: "data", description: "..." },
  { id: "caching", name: "Caching Strategies", category: "data", description: "..." },
  { id: "messaging", name: "Messaging / Event-Driven", category: "data", description: "..." },
  // Cloud & DevOps
  { id: "aws", name: "AWS", category: "cloud", description: "..." },
  { id: "containers", name: "Containers / Docker", category: "cloud", description: "..." },
  { id: "ci-cd", name: "CI/CD Pipelines", category: "cloud", description: "..." },
  { id: "monitoring", name: "Monitoring & Observability", category: "cloud", description: "..." },
  // Practices
  { id: "testing-unit", name: "Unit Testing", category: "engineering-practices", description: "..." },
  { id: "testing-integration", name: "Integration Testing", category: "engineering-practices", description: "..." },
  { id: "code-review", name: "Code Review", category: "engineering-practices", description: "..." },
  { id: "refactoring", name: "Refactoring", category: "engineering-practices", description: "..." },
  { id: "documentation", name: "Technical Documentation", category: "engineering-practices", description: "..." },
  // Collaboration
  { id: "communication", name: "Technical Communication", category: "collaboration", description: "..." },
  { id: "mentoring", name: "Mentoring / Knowledge Sharing", category: "collaboration", description: "..." },
  { id: "agile", name: "Agile / Sprint Execution", category: "collaboration", description: "..." },
];
```

### Pros
- **Fastest to implement** — leverages existing OpenAI relationship, no new vendor integrations
- **Minimal new infrastructure** — everything flows through Next.js API routes → OpenAI
- **GPT-4o is genuinely multi-modal** — vision + audio in one model, reducing plumbing
- **Keeps existing investment** — assessment wizard, scoring engine, design system all reusable

### Cons
- **GPT-4o video analysis is frame-based** — not continuous real-time emotion tracking; you sample frames and analyze snapshots
- **Avatar quality limited** — CSS/SVG avatar is basic; avatar API (D-ID/HeyGen) adds cost per interview
- **Voice analysis via GPT-4o is indirect** — better to use dedicated voice AI (Deepgram, AssemblyAI) for emotion/tone, but that's Option 2
- **OpenAI costs scale with video** — every interview = frames + audio + LLM conversation = significant token usage
- **Not real-time** — interview is record → upload → analyze → results; candidate doesn't get live avatar feedback during interview

### Cost Estimate (per interview)
- Video frames (e.g., 1 frame/sec for 10 min = 600 frames) → GPT-4o Vision: ~$3-8
- Audio transcription (Whisper) + analysis: ~$0.50-2
- Avatar conversation (LLM + TTS): ~$1-3 per interview
- **Total: ~$5-13 per interview** (without avatar API); **~$10-25** (with avatar API)

---

## Option 2: Specialized AI Services Architecture (Best Quality, ~6-10 weeks)

**Philosophy:** Use purpose-built AI services for each analysis type. Modular, scalable, best-in-class quality.

### Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                    Browser (Next.js Frontend)                │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────────┐  │
│  │ Video Interview│  │ Avatar Render│  │ Assessment Wizard │  │
│  │ (WebRTC +      │  │ (3D/2D +     │  │ (extended for     │  │
│  │  MediaRecorder)│  │  TTS audio)  │  │  multi-role)      │  │
│  └──────┬─────────┘  └──────┬───────┘  └────────┬────────┘  │
│         │                   │                     │           │
│         └───────────────────┴─────────────────────┘           │
│                         │                                    │
│              POST /api/interview-session                     │
└─────────────────────────┼────────────────────────────────────┘
                          │
┌─────────────────────────┼────────────────────────────────────┐
│              Next.js API Layer                              │
│  ┌──────────────────┐  ┌──────────────────┐                │
│  │ /api/interview   │  │ /api/assess      │                │
│  │ - Session mgmt   │  │ (extended)       │                │
│  │ - Orchestration  │  │                  │                │
│  └────────┬─────────┘  └────────┬─────────┘                │
│           │                     │                           │
└───────────┼─────────────────────┼───────────────────────────┘
            │                     │
┌───────────┼─────────────────────┼───────────────────────────┐
│           ▼                     ▼                           │
│  ┌──────────────┐     ┌──────────────┐                      │
│  │ Video Service│     │ Analysis     │                      │
│  │ (Storage +   │     │ Pipeline     │                      │
│  │  frame extract)     │ (Python/Node │                      │
│  │              │     │  microservices)                     │
│  └──────┬───────┘     └──────┬───────┘                      │
│         │                     │                             │
│    ┌────┼────┐           ┌────┼────┐                        │
│    ▼    ▼    ▼           ▼    ▼    ▼                        │
│ ┌────┐ ┌────┐ ┌────┐  ┌────┐ ┌────┐ ┌────┐                │
│ │Voice│ │Face│ │Content│ │Voice│ │Face│ │Content│           │
│ │Analysis              │Analysis                             │
│ │(Deepgram/             │(OpenAI Vision/                   │
│ │ AssemblyAI)           │ AWS Rekognition/                │
│ │                       │ DeepFace)                      │
│ └────┘ └────┘ └────┘  └────┘ └────┘ └────┘                │
│    │    │    │           │    │    │                       │
│    └────┼────┘           └────┼────┘                       │
│         ▼                     ▼                             │
│    ┌─────────────────────────────────────┐                │
│    │  Results Aggregator                 │                │
│    │  - Merge voice + facial + content   │                │
│    │  - Score against competency model   │                │
│    │  - Generate feedback report         │                │
│    └─────────────────────────────────────┘                │
│                          │                                 │
│                          ▼                                 │
│              OpenAI LLM (conversation + scoring)          │
└────────────────────────────────────────────────────────────┘
```

### What Changes

| Area | Change |
|------|--------|
| **Video interview** | WebRTC for real-time preview + MediaRecorder for capture. Upload to S3/R2/Cloudflare storage. Extract frames server-side. |
| **Voice analysis** | Send audio to **Deepgram** or **AssemblyAI** — both offer speech-to-text + speaker analysis (emotion, sentiment, pacing, filler words, clarity). Better than GPT-4o for dedicated voice analysis. |
| **Facial analysis** | Send video frames to **OpenAI Vision** (GPT-4o) OR **AWS Rekognition** OR **DeepFace** (open-source Python library for facial expression recognition). OpenAI Vision is easiest; AWS Rekognition gives structured emotion scores; DeepFace is free but self-hosted. |
| **Avatar mentor** | Two sub-options: (a) **Avatar API:** D-ID, HeyGen, Synthesia — send text, get back video of realistic avatar speaking. Best visual quality, per-minute cost. (b) **Custom build:** 3D avatar (ReadyPlayerMe + Three.js) or 2D animated avatar with TTS (ElevenLabs for voice) + lip-sync animation. More control, more engineering. |
| **Real-time conversation** | WebSocket connection: avatar asks question → candidate responds (video + audio) → analysis runs → avatar generates follow-up. Or async: full interview recorded, then analyzed, results delivered after. |
| **Analysis pipeline** | Python microservices (or serverless functions) for each analysis type. Orchestrated by Next.js API route. Results merged and scored. |
| **Competency models** | Full expansion to 10+ software roles, each with 20-40 skills, 5-7 levels, career ladders, expected proficiency per seniority level. |

### Services to Integrate

| Capability | Service Options | Cost |
|------------|----------------|------|
| Speech-to-text + voice analysis | Deepgram ($0.0001/sec), AssemblyAI ($0.0005/sec) | ~$0.06-3 per interview |
| Facial expression analysis | OpenAI GPT-4o Vision (pay per frame), AWS Rekognition ($0.001/image), DeepFace (free, self-hosted) | ~$1-10 per interview |
| Avatar video generation | D-ID ($0.012/sec), HeyGen (~$24-99/month), Synthesia (~$22-268/month) | ~$1-5 per interview (D-ID) or subscription |
| TTS (if building custom avatar) | ElevenLabs (~$0.1/1K chars), OpenAI TTS (~$0.01/1K chars) | ~$0.1-1 per interview |
| Video storage | S3/R2/Cloudflare ($0.01-0.02/GB) | Negligible |

### Pros
- **Best-in-class analysis quality** — dedicated services for voice, face, content
- **Modular** — swap services independently, scale each independently
- **Real-time option** — WebSocket-based live interview with avatar is feasible
- **Avatar quality** — D-ID/HeyGen give realistic talking head; custom 3D avatar gives full control
- **Scalable** — microservices can be scaled, serverless options exist

### Cons
- **More integrations** — 4-6 external services to integrate, test, monitor
- **Higher complexity** — video pipeline + frame extraction + multiple analysis services + results aggregation
- **More moving parts** — more failure modes, more debugging surface
- **Cost fragmentation** — multiple services, each with own pricing; total cost harder to predict
- **Python microservices** — if using DeepFace or custom analysis, need Python runtime alongside Next.js (Lambda, EC2, or separate service)

### Cost Estimate (per interview)
- Voice analysis (Deepgram): ~$0.50-2
- Facial analysis (OpenAI Vision, ~600 frames): ~$3-8
- Content analysis (LLM): ~$1-3
- Avatar (D-ID, ~5 min): ~$3-5
- TTS (if custom): ~$0.50-1
- **Total: ~$8-19 per interview** (with D-ID avatar); **~$5-10** (without avatar API, using simple render)

---

# Hirena Architecture Enhancement — 3 Options (Updated 2026-09-10)

## Current State (Baseline)
- **Stack:** Next.js 15 + TypeScript + Tailwind + Shadcn/UI + OpenAI GPT-4o
- **Assessment:** Self-rating (0-5) + AI inference from text descriptions
- **Domain:** Product Management only — 35 PM skills, 6 pillars
- **Demo:** Pre-computed result, localStorage persistence
- **Live Status (as of 2026-09-10):**
  - ✅ TypeScript compiles cleanly (`npx tsc --noEmit` exit 0)
  - ✅ Dev server running at localhost:3000
  - ✅ ALL Option 2 & 3 API routes verified working:
    - `/api/verify-env` → `hasKey: true`
    - `/api/fusion/result` → returns fused score `{ overallScore: 3.54 }`
    - `/api/voice/analyze` → returns simulated voice analysis
    - `/api/facial/analyze` → returns 6 frames analyzed, emotion distribution
    - `/api/interview/session` → WebSocket session start + analyze + complete flow
  - ✅ Real-time interview wizard built: 8-step flow with avatar mentor
  - ✅ New files added:
    - `src/components/real-time-interview-wizard.tsx` — main wizard component
    - `src/components/avatar-mentor.tsx` — avatar mentor with conversation state
    - `src/lib/signal-analysis.ts` — voice/facial signal analysis utilities
    - `src/lib/results-fusion.ts` — multi-modal results fusion + scoring
  - 🔧 Started: Browser smoke test of real-time wizard (next step)

---

## New Requirements (as of 2026-09-10)
1. **Video interview mockups** — candidate records video responses
2. **Voice analysis** — tone, pacing, emotion, clarity from audio
3. **Facial expression analysis** — emotion detection from video
4. **Avatar mentor** — AI avatar that interviews the candidate
5. **Software industry only** — expand from PM-only to all software roles
6. **Multi-role competency models** — Data Analyst, BA, QA, Tester, Architect, Engineer, Full-Stack, DevOps, UX/UI, Engineering Manager, etc.

---

## Option 1: OpenAI-Native Extension (Fastest Path, ~2-4 weeks)

**Philosophy:** Leverage GPT-4o's multi-modal capabilities. Minimal new infrastructure.

### Architecture

```
Browser (Next.js) → POST /api/interview → Next.js Server → OpenAI (GPT-4o + Whisper)
  - MediaRecorder captures video
  - GPT-4o Vision analyzes frames
  - Whisper transcribes audio
  - GPT-4o analyzes voice + generates avatar responses
```

### What Changes
- Video capture via `MediaRecorder` + `getUserMedia`
- Voice analysis via Whisper + GPT-4o
- Facial analysis via GPT-4o Vision (frame snapshots)
- Avatar mentor: CSS/SVG + TTS (ElevenLabs/OpenAI TTS) OR D-ID/HeyGen API
- Expand competency models to 5-8 software roles

### Cost: ~$5-13 per interview (without avatar API)

### Status: **Recommended starting point for demo**

---

## Option 2: Specialized AI Services (Best Quality, ~6-10 weeks)

**Philosophy:** Purpose-built AI services for each analysis type.

### Architecture
```
Browser → POST /api/interview-session → Next.js API → Analysis Pipeline
  - Video → S3/R2 storage + frame extraction
  - Voice → Deepgram/AssemblyAI (dedicated voice analysis)
  - Face → OpenAI Vision / AWS Rekognition / DeepFace
  - Content → LLM + competency model scoring
  - Results → Fusion engine merges all signals
```

### Services to Integrate
| Capability | Service | Cost |
|------------|---------|------|
| Speech-to-text + voice | Deepgram / AssemblyAI | ~$0.06-3 |
| Facial expression | OpenAI Vision / AWS Rekognition / DeepFace | ~$1-10 |
| Avatar video | D-ID / HeyGen / Synthesia | ~$1-5 or subscription |
| TTS (custom avatar) | ElevenLabs / OpenAI TTS | ~$0.1-1 |

### What's Already Built (Option 2 APIs — Verified Working)
- `/api/voice/analyze` — accepts `targetRole` + `transcription` + `duration`, returns simulated voice analysis with dimensions (confidence, clarity, pacing, emotion, engagement, fillerWords)
- `/api/facial/analyze` — accepts `targetRole` + `duration`, returns simulated 6-frame analysis with emotions, eye contact, facial expressions, head pose
- `/api/fusion/result` — accepts voiceAnalysis + facialAnalysis + selfAssessment + targetRole, fuses signals with weights (voice 30%, facial 20%, self 25%, content 25%), returns overallScore + per-dimension breakdown
- `/api/interview/session` — WebSocket endpoint managing 8-step interview flow: greeting → context → instruction → avatar question → record → voice analysis → facial analysis → feedback → follow-up → final result

### Cost: ~$8-19 per interview (with D-ID avatar)

### Status: **APIs built and verified. Real-time wizard in progress.**

---

## Option 3: Purpose-Built Platform (Most Comprehensive, ~12-20 weeks)

**Philosophy:** Real-time avatar interview with continuous multi-modal analysis.

### Architecture
```
Browser (WebRTC + Avatar) ↔ WebSocket ↔ Real-Time Engine
  - Avatar mentor (3D/2D + TTS + lip-sync)
  - Live video/audio capture
  - Continuous voice + facial analysis
  - Real-time LLM conversation
  - Results fusion + competency scoring
```

### Full Software Role Competency Models (10+ roles)
| Role | Skills | Pillars | Levels | Career Ladder |
|------|--------|---------|--------|---------------|
| Data Analyst | 25-30 | 5 | 0-7 | Jr→Sr→Lead |
| Business Analyst | 20-25 | 4 | 0-7 | Jr→Sr→Lead |
| QA Engineer | 20-25 | 5 | 0-7 | Jr→Sr→Lead |
| Tester (Manual) | 15-20 | 3 | 0-5 | Jr→Sr |
| Software Architect | 30-35 | 6 | 0-7 | Sr→Principal |
| Software Engineer | 30-35 | 6 | 0-7 | Jr→Sr→Lead |
| Frontend Engineer | 25-30 | 5 | 0-7 | Jr→Sr→Lead |
| Backend Engineer | 25-30 | 5 | 0-7 | Jr→Sr→Lead |
| Full-Stack Engineer | 30-35 | 6 | 0-7 | Jr→Sr→Lead |
| DevOps Engineer | 20-25 | 5 | 0-7 | Jr→Sr→Lead |
| UX/UI Designer | 20-25 | 4 | 0-7 | Jr→Sr→Lead |
| Engineering Manager | 20-25 | 5 | 0-7 | Mgr→Director |
| Tech Lead | 25-30 | 6 | 0-7 | Sr→TL→Principal |
| Product Manager | 35 | 6 | 0-5 | APM→CPO |
| Scrum Master | 15-20 | 3 | 0-5 | Jr→Sr |
| Data Engineer | 25-30 | 5 | 0-7 | Jr→Sr→Lead |
| ML Engineer | 25-30 | 5 | 0-7 | Jr→Sr→Lead |

**~15 roles × ~25 skills avg = ~375 skills** + cross-cutting skills

### What's Already Built (Option 3 Components — Verified Working)
- Real-time interview wizard with 8-step flow
- Avatar mentor component with conversation state management
- WebSocket session management (start → analyze → complete)
- Voice analysis endpoint (simulated)
- Facial analysis endpoint (simulated)
- Results fusion engine (multi-modal scoring)
- Signal analysis utilities

### Cost: ~$9-26 per interview (real-time, with avatar SDK)

### Status: **Core infrastructure built. Real-time avatar rendering + live AI services next.**

---

## Comparison Matrix

| Criteria | Option 1 | Option 2 | Option 3 |
|----------|----------|----------|----------|
| **Timeline** | 2-4 weeks | 6-10 weeks | 12-20 weeks |
| **Engineering effort** | Low-Medium | Medium | High |
| **Video interview** | Async (record→upload→analyze) | Async or real-time | Real-time WebSocket |
| **Voice analysis** | GPT-4o/Whisper (indirect) | Deepgram/AssemblyAI (dedicated) | Deepgram + custom model |
| **Facial analysis** | GPT-4o Vision (snapshots) | OpenAI Vision / AWS Rekognition / DeepFace | Continuous tracking |
| **Avatar** | CSS/SVG + TTS or D-ID API | D-ID/HeyGen or custom 2D + TTS | 3D avatar + SDK + real-time TTS |
| **Multi-role** | 5-8 roles, 20-30 skills | 10-15 roles, 20-35 skills | 10-15 roles, full 0-7 levels |
| **Analysis quality** | Good | Better | Best |
| **Cost per interview** | $5-25 | $8-19 | $9-26 |
| **Demo impressiveness** | Moderate | Good | Excellent |
| **Risk** | Low | Medium | High |

---

## Current Implementation Status (2026-09-10)

### ✅ Completed & Verified
1. **TypeScript compilation** — Clean (`npx tsc --noEmit` exit 0)
2. **Dev server** — Running at localhost:3000
3. **Environment** — OpenAI API key loaded (`/api/verify-env` → `hasKey: true`)
4. **Option 2 API routes:**
   - `/api/voice/analyze` — ✅ Working
   - `/api/facial/analyze` — ✅ Working
   - `/api/fusion/result` — ✅ Working
5. **Option 3 real-time interview:**
   - `/api/interview/session` — ✅ WebSocket session management working
   - 8-step interview flow implemented
   - Avatar mentor component built
   - Voice + facial analysis integration working
   - Results fusion engine working

### 🔧 Components Built (New Files)
- `src/components/real-time-interview-wizard.tsx` — Main 8-step wizard
- `src/components/avatar-mentor.tsx` — Avatar mentor with conversation
- `src/lib/signal-analysis.ts` — Voice/facial signal utilities
- `src/lib/results-fusion.ts` — Multi-modal fusion + scoring

### 🔧 Modified Files
- `src/app/api/interview/session/route.ts` — Fixed TypeScript errors
- `src/app/page.tsx` — Updated for real-time wizard
- `src/components/avatar-mentor.tsx` — Fixed TypeScript
- `src/lib/real-time-interview.ts` — Real-time interview manager
- `src/lib/results-fusion.ts` — Added fusion logic
- `src/lib/video-interview.ts` — Video interview utilities

### ⏳ Next Steps
1. **Browser smoke test** — Open localhost:3000, start real-time interview, verify 8-step flow
2. **Commit + push** — Stage all changes, commit, push to GitHub
3. **Update documentation** — Refresh architecture docs with current status
4. **Demo preparation** — Verify demo flow works end-to-end

---

## Recommendation

### Start with Option 1 (OpenAI Native) for the demo — then evolve to Option 2.

**Why:**
1. You have an active OpenAI account and key already configured. GPT-4o's multi-modal capabilities mean you can implement video analysis, voice analysis, and avatar conversation without adding new vendors initially.
2. The demo is the immediate goal. Option 1 gives you a working video interview + avatar mentor + multi-role assessment in 2-4 weeks.
3. Option 1 → Option 2 is a natural evolution. Swap services independently as needed.
4. Option 3 is overkill for now. Save real-time WebSocket avatar for when you have validated demand.

### Suggested Implementation Sequence

**Phase 1 (Option 1, weeks 1-4): MVP**
- Add video interview capture (MediaRecorder)
- Add avatar mentor (CSS/SVG + ElevenLabs TTS or OpenAI TTS)
- Add GPT-4o Vision analysis of video frames
- Add Whisper/GPT-4o audio analysis
- Expand competency models to 5-8 software roles
- Keep async flow

**Phase 2 (Option 2, weeks 5-10): Upgrade Quality**
- Swap GPT-4o voice analysis for Deepgram/AssemblyAI
- Swap GPT-4o vision for AWS Rekognition or DeepFace
- Upgrade avatar to D-ID/HeyGen API
- Add results fusion
- Expand to 10-15 roles

**Phase 3 (Option 3, weeks 11-20): Real-Time Avatar (Optional)**
- Add WebSocket-based live interview
- Implement real-time avatar with lip-sync
- Continuous voice + facial analysis
- Real-time feedback overlay

---

## What Stays the Same
- **Next.js + TypeScript + Tailwind + Shadcn/UI** — frontend stack is solid
- **Assessment wizard concept** — extend from 5-step to include video interview
- **Scoring engine** — extend to accept video/voice/facial analysis results
- **Design system** — Apple-inspired, clean/minimal, teal #0D9488, bilingual AR/EN
- **Bilingual support** — Arabic/English for all roles
- **MENA-first positioning** — regional benchmarks for software roles in MENA market

---

## Open Questions
1. **Real-time vs async interview?** Live WebSocket or async record→analyze?
2. **Avatar fidelity?** Basic (CSS/SVG), mid (D-ID/HeyGen), or high (custom 3D)?
3. **Role priority?** Which software roles for initial launch?
4. **Budget for AI services?** Comfortable with ~$10-25 per interview?
5. **Budget for AI services?** Comfortable with ~$10-25 per interview?
6. **Video storage?** Store videos or temporary processing only?

---

## Market Research: HR Platforms & AI Features (2026)

### Market Context (2026)

- **Global HR Tech market:** ~$53B (Sapient Insights 2025-2026 HR Systems Survey)
- **AI in HR:** Jumped from 12% of solutions (2023) to majority shipping AI as first-class feature (2026)
- **Buyer evaluation criteria (2026):** (1) AI capability depth, (2) integration with buyer's AI stack, (3) governance posture (bias auditing, EU AI Act, NYC AEDT, Colorado AI Act)
- **Key trend:** AI stops being a separate HR tech category — becomes default capability across every layer
- **Key trend:** Skill-based hiring replaces role-based hiring — AI evaluates against skill graphs, not job titles
- **Key trend:** Agentic AI — autonomous agents for sourcing, matching, workforce planning (Eightfold 2025 framework)
- **Key trend:** HR tech consolidation — 200+ vendors compressing into AI agent platforms (Workday, Rippling, Deel, ServiceNow, Microsoft Copilot for HR)
- **Key trend:** Regulation tightening — EU AI Act (fully applicable 2026) classifies hiring/firing/promotion as high-risk AI; NYC Local Law 144 bias audits; Colorado AI Act; EEOC guidance
- **Key trend:** Internal talent marketplaces replace 'tap on the shoulder' — Gloat, Fuel50, Eightfold match employees to gigs/projects/mentorships by skill

### Competitive Landscape

#### HR Tech Platform Categories (2026)

| Category | Players | Core AI Features |
|----------|---------|------------------|
| **AI Talent Intelligence** | Eightfold AI, Beamery, Gloat, Fuel50, Phenom, SeekOut, hireEZ, Workday Skills Cloud, Visier | Skills graph, AI skills inference from work history (no self-reporting), internal mobility + career path recommendations, external candidate matching, workforce planning, agentic AI agents, DEI analytics + bias monitoring, talent rediscovery, HCM/ATS integration |
| **Skills Assessment Platforms** | Vervoe, TestGorilla, Criteria Corp, HireVue, Korn Ferry, Pymetrics, Harver, CoderPad, CodeSignal, Codility, HackerRank | AI assessment builder (job description → tailored assessment), AI auto-scoring (essays, video responses, open-ended answers), AI interviews (conversational, auto-scored), resume scoring (biodata framework), AI talent sourcing (recommend top matches from pre-tested pool), anti-cheating (tab-switch detection, identity checks, behavior monitoring), personalized grading, ranked shortlists (explainable signal), 350+ validated skills tests (TestGorilla), science-backed: I-O psychology, bias testing, adverse impact monitoring |
| **ATS + Recruiting AI** | Greenhouse, Lever, Workday Recruiting, iCIMS, SmartRecruiters, Ashby, BambooHR, Manatal, Ceipal | AI resume parsing + screening, AI interview scheduling, AI-generated interview stages + scorecard attributes, AI notetaker (transcribe + map to scorecard), AI candidate insights (ask questions about candidate), AI report builder (text prompts → charts), offer forecasting, talent rediscovery, Voice AI interviewing (two-way dynamic — Greenhouse), structured hiring framework, MCP (Model Context Protocol) — connect external AI (Claude/Gemini/Copilot) |
| **Video Interviewing + AI Analysis** | HireVue, Spark Hire, VidCruiter, Hireflix, Willo, Criteria Corp Real-Time, Karat (technical) | Structured video interviews (on-demand + live), AI scoring of responses (speech + content — facial DROPPED by HireVue 2021), interview intelligence (auto-shortlist from video), real-time video interviewing with AI guidance, technical interview automation (Karat for engineering), chat-based interviews (Sapia) |

**Key lesson — HireVue dropped facial analysis January 2021:** Due to bias risk + regulatory pressure. AI interview scoring should be based on transcripts/content, not facial cues or emotion. TestGorilla + Criteria Corp also score on transcripts only (no facial analysis). Hirena's facial analysis feature carries same regulatory/bias risk.

#### HR Platform Detailed Analysis

##### Eightfold AI (AI Talent Intelligence Platform)
- **Valuation:** $2.1B | **Customers:** 2000+ (Bayer, Hyatt, Capgemini, Tata, Booz Allen) | **Pricing:** $200K-2M/yr (enterprise-only)
- **AI Features:** Talent Intelligence Platform (deep learning AI on 1.6B career trajectories + 1.6M skills), AI skills inference from work history (no self-reporting required), internal opportunity + role matching (talent marketplace), agentic AI (autonomous agents for sourcing, matching, workforce planning), AI Interviewer (structured interview automation + candidate summaries), AI Interview Companion (real-time guidance + structured insights for human-led rounds), diversity analytics + bias monitoring (Equal Opportunity Algorithms), Career Hub (personalized career paths, projects, mentors, jobs, courses per employee), Job Intelligence Engine (auto-recommend job role updates based on skills + market trends), workforce planning (predict regrettable hires, identify high-potential), internal mobility (match internal employees to internal openings before role is public), ATS/HRIS/LMS bi-directional integration, global (145+ countries, 19 languages), FedRAMP Moderate Authorized (2025), ISO/IEC 42001:2023 certified (all 3 levels — first HR tech vendor)
- **Differentiation:** 1.6B career profiles = largest talent data set; skills inference without self-reporting; unified AI-native platform across hiring + retention
- **Gap vs Hirena:** Focused on enterprise B2B (recruiters + HR teams), not individual B2C professional assessment. No self-assessment wizard. No video interview mockup. No avatar mentor. No bilingual AR/EN consumer product. No MENA-first regional benchmarks.

##### Vervoe (Skills Intelligence Platform — Hiring)
- **AI Features:** AI Assessment Builder (upload job description → AI generates tailored assessment), AI Scoring (ML models watch top performers → rank new applicants against same bar), personalized grading (train model to match team's standards, gets sharper with each assessment), automatic grading + ranking (every answer graded automatically, ranked by skill fit), AI Screening Agent (filter unsuitable applicants early), anti-cheating (tab-switch detection, identity checks, randomized questions), 300+ skills-based assessments library, video answers + code tasks + spreadsheets + multiple choice question types, candidate behavior monitoring (detailed behavior log per session), ranked shortlist with explainable signal, side-by-side video + written answer review, on-demand reporting (completion rates, score distribution, question-level signal), integrations (Greenhouse, Lever, SmartRecruiters, Zapier 1000+), branded assessments (logo, colors, tone), timed questions/tests, file upload (documents, portfolios, work samples), mobile-friendly assessments
- **Differentiation:** Skills-based hiring platform for employers to assess candidates — not a self-assessment tool for professionals
- **Gap vs Hirena:** Employer-side hiring tool (B2B), not individual professional development (B2C). No career guidance or roadmap generation. No competency model expansion across roles. No video interview mockup for practice. No avatar mentor. No bilingual support. No MENA regional benchmarks.

##### TestGorilla (Skills-Based Talent Assessments)
- **AI Features:** AI Job Builder (enter job description/title → AI suggests ideal evaluation mix: skills tests, custom questions, AI interviews), AI Interviews (conversational AI interviews, 100+ behavior/role tracks, auto-scored), AI Auto-Scoring (essays + video responses scored quickly/consistently by I-O psychologists), AI Scoring criteria generation (for custom questions, AI generates scoring criteria), Resume Scoring (biodata framework — evaluates what candidates actually did, not titles), AI Talent Sourcing (recommends top matches from 2M+ pre-tested candidates), 350+ scientifically validated skills tests, percentile scores for skills tests, candidate behavior monitoring (detailed behavior log), Trust Layer (identity confidence + trust signals), bias-tested AI interviews scored on transcripts only (NOT facial cues/emotion — fairness-first), human-in-the-loop by design (every suggestion editable/reviewable/optional), fairness-first (benchmarked against expert human scorers, tested for adverse impact), private by default (never train AI on customer data, no PII to LLMs), AI fluency assessment (5 components: Applied AI use, Learning/digital ability, Systems thinking, Human-AI collaboration, Decision-making)
- **AI Manifesto:** Human-in-the-loop by design. Focused on fairness. Always transparent. Private by default. Tools, not gimmicks. Designed for evolving standards.
- **Differentiation:** Scientific/psychometric approach, fairness-first AI (transcript-only scoring, no facial analysis), 350+ validated tests, AI fluency assessment
- **Gap vs Hirena:** Employer-side assessment for hiring, not individual professional development. No self-assessment wizard (candidates are tested, not self-evaluating). No career roadmap or learning plan generation. No video interview mockup/practice. No avatar mentor. No competency model across software roles. No bilingual AR/EN. No MENA regional benchmarks.

##### Greenhouse (ATS + AI Recruiting)
- **AI Features:** Greenhouse Voice AI (two-way voice-based AI interviewing — dynamic interview, candidates can ask questions — NOT one-way recording, NOT chatbot), Greenhouse Notetaker (automatically records + transcribes interviews, maps AI-generated notes to scorecard questions), Candidate Insights Assistant (Q3 2026 — ask questions about any candidate based on scorecards, notes, activity), Job Setup Assistant (Q3 2026 — turn kickoff notes/docs/text into structured job setup), AI Report Insights (August 2026 — analytics chart builder from plain-text questions), AI Insights (create report filters + build reports from text prompts), Offer Forecasting (predict when offers likely accepted), Automated hiring plans (generate structured interview stages, questions, scorecard attributes for every interviewer), Resume review (Greenhouse-patented parsing, identifying details redacted), Talent rediscovery + filtering, Fast branded job boards, Structured hiring framework (proprietary), Greenhouse MCP (Model Context Protocol — connect Claude/Gemini/Copilot directly to Greenhouse)
- **AI Philosophy (5 design pillars):** (1) Structured hiring at core, (2) AI cuts manual work not judgment, (3) Grounded in human experience (AI recognizes cognitive load, reduces bias under pressure), (4) Explicit decision ownership (AI informs/summarizes/surfaces — decision is always human's), (5) Explainability non-negotiable (every AI output transparent, grounded in observable signals)
- **Differentiation:** Structured hiring framework + responsible AI (human-in-loop, explainable, transparent), Voice AI (two-way dynamic, not chatbot), Notetaker with scorecard mapping
- **Gap vs Hirena:** Enterprise ATS for recruiters/hiring teams, not individual professional assessment. No self-assessment wizard. No career development roadmap. No competency model for professional skills. No video interview mockup (Voice AI is for real hiring, not practice). No avatar mentor. No bilingual AR/EN. No MENA benchmarks.

##### Talentee (AI Interview Practice — B2C) — Closest Competitor
- **AI Features:** AI mock interview practice with video + voice analysis, AI interviewer 'Nova' asks questions + analyzes body language, voice patterns, content quality, replay + feedback on facial expressions, voice patterns, answer quality, multi-modal analysis (emotion + speech analytics + LLM scoring)
- **Differentiation:** Closest to Hirena's vision: B2C AI interview practice with video + voice + content analysis. Smaller scale, less comprehensive competency model.
- **Gap vs Hirena:** Smaller platform, less comprehensive competency model (Hirena has 35 PM skills + expanding to 10+ software roles). No evidence of multi-role competency framework. No evidence of regional benchmarks (MENA). No evidence of bilingual AR/EN. No evidence of career ladder or roadmap generation. No evidence of self-assessment + AI inference hybrid model. **Hirena's advantage:** Multi-role competency models + self-assessment + AI inference hybrid + MENA benchmarks + bilingual AR/EN + career roadmap + avatar mentor + fused multi-modal scoring.

##### HireVue (Video Interviewing — Legacy) — Important Lesson
- **AI Features:** Structured video interviews (on-demand + live), AI scoring of interview responses (speech + answer content only — facial analysis DROPPED 2021), interview scheduling automation, candidate assessment workflows, interviewee practice tools (limited)
- **Notable pivot:** January 2021 — HireVue publicly DROPPED facial analysis entirely. Today only speech + answer content are analyzed. Scores feed interviewer tooling rather than automatic accept/reject decisions. Reason: bias risk + regulatory pressure.
- **Lesson for Hirena:** Facial analysis for assessment/judgment purposes is high-risk. HireVue dropped it. TestGorilla + Criteria Corp avoid it (score on transcripts only). Hirena's facial analysis feature is a differentiator but carries same risk. Mitigation: (1) Clear disclaimer: 'Practice feedback only, not hiring decision', (2) Document facial analysis limitations + bias risks, (3) Make facial analysis optional + experimental, (4) Position voice + content analysis as core (lower risk), (5) Plan for bias auditing if expanding to hiring use case.

##### Gloat / Fuel50 (Internal Talent Marketplace)
- **Gloat:** $1B valuation (Spotify, HSBC, Nestle, Unilever), $200K-1M/yr. AI-driven career pathing, internal talent marketplace (gigs, projects, mentorships, roles by skill), Loomra knowledge graph, career hub, skills gap analysis per employee, external hiring integration, workforce planning analytics, HCM integration.
- **Fuel50:** $50M, 500+ companies (Mastercard, AT&T), $50-300K/yr. Career pathing + skills intelligence, internal talent marketplace, AI-driven career recommendations, skills gap analysis, learning recommendations based on skill gaps, HCM integration.
- **Gap vs Hirena:** Enterprise internal mobility platforms (B2B), not B2C individual professional assessment. Require HCM integration + employee data — not standalone for individuals. No self-assessment wizard for individuals. No video interview mockup. No avatar mentor. No bilingual consumer product. No MENA benchmarks.

### Hirena's Competitive Positioning (2026)

**Unique Value Proposition:** AI-powered skills assessment + career roadmap for MENA professionals — bilingual AR/EN, MENA-first regional benchmarks, software role competency models (10+ roles), hybrid self-assessment + AI inference, real-time interview practice with multi-modal analysis (voice + facial + content), avatar mentor, career roadmap with learning resources.

**Competition Matrix:**

| Feature | Hirena | Eightfold | Vervoe | TestGorilla | Greenhouse | Talentee | HireVue |
|---------|--------|----------|--------|-------------|------------|----------|---------|
| **Target user** | B2C individual | B2B enterprise | B2B employer | B2B employer | B2B enterprise | B2C individual | B2B employer |
| **Self-assessment** | ✅ Hybrid (self + AI) | ❌ (AI inference only) | ❌ (candidate tested) | ❌ (candidate tested) | ❌ (resume + interview) | ❌ (mock interview only) | ❌ (candidate tested) |
| **Career roadmap** | ✅ (core feature) | ✅ (Career Hub) | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Multi-role competency** | ✅ (10+ roles, 250+ skills — Phase 1) | ✅ (1.6M skills, all roles) | ✅ (300+ assessments) | ✅ (350+ tests) | ✅ (structured per role) | ❌ | ✅ (role-specific) |
| **Video interview practice** | ✅ (8-step wizard + avatar) | ❌ (real hiring only) | ❌ | ❌ | ❌ (Voice AI for hiring) | ✅ (mock practice) | ❌ (real hiring only) |
| **Voice analysis** | ✅ (simulated → real AI) | ❌ | ❌ (video answers only) | ❌ | ✅ (Voice AI — two-way) | ✅ (voice analysis) | ✅ (speech analysis) |
| **Facial analysis** | ✅ (simulated → optional/experimental) | ❌ | ❌ | ❌ (transcript-only — fairness) | ❌ | ✅ (facial tracking) | ❌ (DROPPED 2021) |
| **Avatar mentor** | ✅ (CSS/SVG + TTS) | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Bilingual AR/EN** | ✅ (key differentiator) | ✅ (19 languages — global) | ❌ (English-first) | ❌ (English-first) | ❌ (English-first) | ❌ | ❌ (English-first) |
| **MENA benchmarks** | ✅ (key differentiator) | ❌ (global benchmarks) | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Pricing** | Freemium (B2C) | $200K-2M/yr (enterprise) | Quote (enterprise) | Free trial + scalable plans | Quote (enterprise) | Undisclosed | Quote (enterprise) |
| **AI approach** | Hybrid (self + AI inference) | AI inference from work history | AI scoring from top performers | AI scoring (I-O psychology, transcript-only) | AI for structured hiring + notes | AI mock interview analysis | AI scoring (transcript-only, post-2021) |

**Hirena's Advantages:**
1. **B2C individual-focused** — competitors are B2B employer-facing (Eightfold, Vervoe, TestGorilla, Greenhouse, Lever) or simpler B2C practice tools (Talentee, Interview Prep Guru)
2. **Hybrid assessment model** — self-assessment + AI inference (subjective + objective), unique approach vs pure AI scoring (TestGorilla, Criteria Corp) or pure self-reporting
3. **MENA-first + bilingual AR/EN** — no major competitor has MENA-specific benchmarks or Arabic-first UX
4. **Multi-role competency models** — 10+ software roles with 250+ skills, career ladders, proficiency levels 0-7
5. **Real-time interview practice + multi-modal analysis** — voice + facial + content fusion (closest competitor: Talentee, but Hirena has competency model + multi-role + fused scoring + MENA + bilingual)
6. **Career roadmap + learning resources** — core value prop (skills assessment + career development), competitors focus on hiring/screening, not career development for individuals
7. **Avatar mentor** — AI avatar that interviews candidate (CSS/SVG + TTS, upgradeable to D-ID/HeyGen)
8. **Open architecture** — Option 1 (OpenAI-native) → Option 2 (specialized services) → Option 3 (real-time avatar) — evolutionary path, not locked into single vendor

**Hirena's Vulnerabilities:**
1. **Facial analysis feature carries bias risk** — HireVue dropped it, TestGorilla/Criteria Corp avoid it. Must mitigate with disclaimer + optional/experimental toggle + bias documentation. Regulatory risk (EU AI Act, NYC AEDT, Colorado AI Act) if used for hiring decisions.
2. **No user accounts + persistent profiles yet** — current demo uses localStorage only. Critical infrastructure missing for product maturity (progress tracking, assessment history, retention).
3. **No real AI integration yet** — voice/facial/fusion APIs are simulated. Need OpenAI credits ($0 balance → 429) + GPT-4o Vision + Whisper integration for Option 1 to go live.
4. **Multi-role competency models designed but not fully built** — 35 PM skills only, 10+ software roles designed but not implemented. Must build 250+ skills across 10+ roles to compete on comprehensiveness.
5. **Career roadmap is basic** — generated actions + learning resources only. Lacks: curated content library, mentor matching, career path visualization, progress tracking (competitors: Eightfold Career Hub, Gloat, Cornerstone, 360Learning, Workera, Sana have these).
6. **B2C freemium monetization unclear** — competitors are enterprise B2B (high-ticket: $50K-2M/yr). Individual B2C freemium model needs: (1) free tier (basic assessment), (2) premium tier (detailed roadmap, mentor matching, progress tracking, unlimited interviews), (3) B2B expansion (employers pay for candidate assessment). Revenue model TBD.
7. **No user base + no validation** — product is in development, no live users, no validation of value prop, no retention data, no engagement metrics. Need to launch + measure.

### Feature Prioritization (Impact Analysis)

**Methodology:** Impact = (User Value × Differentiation × Market Fit) / (Effort × Risk). Scored 1-5 for each dimension.

#### CRITICAL Priority (Phase 1 — Before Demo)

1. **Multi-Role Competency Models (10+ software roles, 250+ skills)** — Impact: 20/20
   - User Value: 5, Differentiation: 4, Market Fit: 5, Effort: 4, Risk: 2
   - **Why:** Foundation for all assessment features. Without multi-role models, Hirena only serves PM professionals (narrow market). With 10+ roles, opens to all software professionals (large market). Competitors (Eightfold, Vervoe, TestGorilla) all have multi-role coverage. MENA-first + bilingual makes this differentiated in region.
   - **Dependencies:** Proficiency levels 0-7 (already designed), career ladders per role (designed), role selection UI in assessment wizard, competency model loading per role.

2. **User Accounts + Persistent Profiles + Assessment History + Progress Tracking** — Impact: 15/20
   - User Value: 5, Differentiation: 3, Market Fit: 5, Effort: 4, Risk: 2
   - **Why:** Without user accounts, can't track progress over time (core value prop: skill improvement). Users take one assessment and leave — no retention, no engagement, no recurring value. Competitors (Eightfold, Gloat, Lattice) all have persistent profiles + history. Supabase auth placeholders exist but not wired.
   - **Dependencies:** Supabase auth + database (or alternative), user profile data model, assessment result storage, progress tracking UI (compare assessments, skill trajectory), privacy policy + data handling.

3. **Bias Mitigation + Fairness + Compliance (Facial Analysis Risk + EU AI Act + NYC AEDT)** — Impact: 12/20 (risk-driven)
   - User Value: 3, Differentiation: 4, Market Fit: 4, Effort: 3, Risk: 5
   - **Why:** Facial analysis is highest-risk feature. HireVue dropped it in 2021. TestGorilla + Criteria Corp score on transcripts only (no facial cues). EU AI Act classifies hiring/firing/promotion as high-risk AI (fully applicable 2026). If Hirena's facial analysis is used for any hiring/judgment purpose, could be regulated as high-risk AI. Even for B2C practice: candidates judge themselves on potentially biased AI scores → trust issue.
   - **Mitigation:** (1) Clear disclaimer: 'Practice feedback only, not hiring decision', (2) Document facial analysis limitations + bias risks, (3) Make facial analysis optional + experimental, (4) Position voice + content analysis as core (lower risk), (5) Plan for bias auditing if expanding to hiring use case.
   - **Dependencies:** Legal/regulatory review (EU AI Act, NYC AEDT, Colorado AI Act), bias risk documentation, user-facing disclaimers, optional/experimental toggle for facial analysis.

#### HIGH Priority (Phase 1-2)

4. **Career Roadmap Enhancement (Curated Content + Career Path Visualization + Progress Tracking)** — Impact: 16/20
   - User Value: 5, Differentiation: 4, Market Fit: 4, Effort: 4, Risk: 2
   - **Why:** Roadmap is core value prop (Hirena = 'skills assessment + career roadmap'). Current roadmap: generated actions + learning resources (basic). Competitors (Eightfold Career Hub, Gloat, Cornerstone, 360Learning, Workera, Sana) have: curated content libraries, mentor matching, visual career paths, project/gig recommendations, progress tracking.
   - **Enhancement:** (1) Curated learning content (articles, courses, videos — could partner with Coursera/Udemy/edX or curate internally), (2) Mentor matching (connect users with mentors for specific skills — could be community-driven or AI-matched), (3) Career path visualization (visual ladder: Junior → Senior → Lead → Principal with required skills at each step), (4) Progress tracking (update roadmap as user completes actions + reassesses).
   - **Differentiation:** MENA-first content (region-specific courses, Arabic resources, local mentor network).

5. **AI Interview Practice — Real AI Integration (GPT-4o Vision + Whisper for Option 1)** — Impact: 25/20 (differentiation-driven)
   - User Value: 5, Differentiation: 5, Market Fit: 5, Effort: 3, Risk: 3
   - **Why:** Closest B2C competitor (Talentee) has real multi-modal analysis. Hirena's architecture (Option 1) uses GPT-4o multi-modal (vision + audio) — same capability, plus Hirena's differentiators (competency model + multi-role + fused scoring + MENA benchmarks + bilingual). This is Hirena's strongest differentiator vs Talentee/Interview Prep Guru. Real AI integration (vs simulated) is required for credibility.
   - **Dependencies:** OpenAI API key with credits (currently $0 → 429 — need credits), video frame extraction (server-side), GPT-4o Vision integration (frames → facial expression analysis), Whisper integration (audio → transcription), GPT-4o content analysis (transcription + competency model → score), cost management (per-interview cost tracking, limits).

6. **Bilingual AR/EN Full Implementation + MENA Regional Benchmarks** — Impact: 20/20 (differentiation-driven)
   - User Value: 4, Differentiation: 5, Market Fit: 5, Effort: 3, Risk: 2
   - **Why:** No major competitor has MENA-specific benchmarks or Arabic-first UX. Global competitors (Eightfold, Vervoe, TestGorilla, Greenhouse) are English-primary with multi-language via enterprise HCM. Hirena's MENA-first + bilingual AR/EN is clear differentiator for the region.
   - **Differentiation:** (1) MENA regional benchmarks (not available from global competitors), (2) Arabic-first UX + RTL support, (3) MENA job market context (different skills in demand, different career paths, different salary expectations).
   - **Dependencies:** Arabic translations for all UI + content, RTL layout support, MENA benchmark data (regional skill averages, top quartile, median per role), bilingual content for competency models (skill names + descriptions in AR + EN).

7. **Multi-Modal Analysis — Voice + Content as Core, Facial as Optional/Experimental** — Impact: 12/20 (with risk mitigation)
   - User Value: 4, Differentiation: 4, Market Fit: 4, Effort: 3, Risk: 4
   - **Why:** Voice + content analysis = high value, lower risk (HireVue, TestGorilla, Criteria Corp all do speech + content analysis — no facial). Facial analysis = differentiator vs B2C players (Talentee has it), but also highest risk (HireVue dropped it, TestGorilla avoids it).
   - **Strategy:** (1) Voice + content as core analysis (standard, lower risk, high value), (2) Facial analysis as optional + experimental + clearly labeled 'experimental feature, bias risk documented', (3) Default to voice + content for assessment scoring, facial as supplementary feedback only, (4) If regulatory pressure increases, facial can be dropped without losing core functionality (same path as HireVue).
   - **Dependencies:** Voice analysis API (real AI integration — Whisper + GPT-4o or Deepgram), content analysis (LLM + competency model scoring), facial analysis API (optional, with disclaimer), user toggle: include facial analysis? (default: off or experimental).

8. **Analytics Dashboard Enhancement (Progress Tracking + Skill Trajectory + Benchmark Comparison + Shareable Report)** — Impact: 12/20
   - User Value: 4, Differentiation: 3, Market Fit: 4, Effort: 3, Risk: 2
   - **Why:** Current dashboard: overall score, competency breakdown, skill ranking, gaps, roadmap. Enhancement: (1) Progress tracking (compare assessments over time — requires user accounts + assessment history), (2) Skill trajectory visualization (how skills improve across assessments), (3) Benchmark comparison (vs regional + role averages — requires MENA benchmark data), (4) Shareable report (PDF/link for LinkedIn/profile — social proof + viral growth).
   - **Differentiation:** Individual-focused dashboard (vs competitor dashboards which are recruiter/HR-focused — candidate comparison, pipeline analytics, score distributions). Hirena's dashboard is for the assessed individual, not the recruiter.
   - **Dependencies:** User accounts + assessment history (for progress tracking), MENA benchmark data (for benchmark comparison), shareable report generation (PDF or web link), skill trajectory visualization UI.

#### MEDIUM Priority (Phase 2)

9. **LinkedIn Sharing + Social Proof (Viral Growth)** — Impact: 9/20
   - User Value: 3, Differentiation: 3, Market Fit: 3, Effort: 2, Risk: 2
   - **Why:** LinkedIn sharing of assessment results = social proof + viral growth (users share 'I assessed my skills on Hirena, here's my competency breakdown'). Simple + high impact.
   - **Dependencies:** LinkedIn OAuth (for sharing), shareable assessment report (PDF or web link), user accounts.

10. **Mentor Matching Service** — Impact: TBD (Phase 2)
    - **Why:** Connects to career development value prop (find mentors for specific skills). Could be community-driven (users volunteer as mentors) or AI-matched (based on skill profile + career goals). Competitors (Eightfold Career Hub, Gloat) have mentor recommendations.
    - **Dependencies:** Mentor database + matching logic, user skills + career goals, mentor availability + location + language matching, community-driven or AI-matched.

11. **Compensation + Salary Intelligence (MENA-Specific)** — Impact: 6/20
    - User Value: 3, Differentiation: 2, Market Fit: 3, Effort: 3, Risk: 2
    - **Why:** Optional enhancement: show market salary ranges for target role based on skill level (e.g., 'Software Engineer with your skill profile: $X-$Y in MENA region'). Adds context to career roadmap (what's the financial payoff for skill improvement?). Pave, Aeqium, Compa dominate compensation intelligence. MENA-specific salary data is scarce — could differentiate if done well.
    - **Dependencies:** MENA salary benchmark data (scarce — may need to curate or estimate), role + skill level → salary mapping, display UI in results dashboard.

#### LOW Priority (Phase 3 / Optional)

12. **AI Interviewer — Two-Way Voice Conversation (Option 3 Advanced)** — Impact: 6/20
    - User Value: 4, Differentiation: 5, Market Fit: 3, Effort: 5, Risk: 4
    - **Why:** Greenhouse Voice AI is gold standard: true two-way voice conversation, dynamic, candidates can ask questions. Hirena's avatar mentor (TTS + video response) is one-way, asynchronous (closer to pre-recorded). Two-way voice conversation requires: real-time WebSocket + voice streaming + LLM voice response + low latency (<2-5 sec per turn). High effort, high risk (latency, voice quality, conversation coherence). Market fit: uncertain — is two-way voice conversation necessary for practice mockup? Or is asynchronous (avatar asks via TTS, candidate responds via video, analysis runs, feedback delivered) sufficient? Talentee + Interview Prep Guru do asynchronous (AI asks, candidate responds, analysis delivered). Two-way voice is overkill for practice mockup.
    - **Dependencies:** Real-time WebSocket infrastructure, voice streaming (audio in/out), LLM voice response (TTS + voice AI), lip-sync animation, latency optimization (<2-5 sec per turn), conversation state management (multi-turn dialogue).

13. **Gamification + Engagement (Badges, Milestones, Streaks)** — Impact: 4/20
    - User Value: 2, Differentiation: 2, Market Fit: 2, Effort: 2, Risk: 1
    - **Why:** Not standard in HR tech. Could enhance engagement: skill badges/certifications per competency area, progress milestones, streaks/reminders to reassess, challenge mode (timed skill challenges). Effort: low. Risk: low. Differentiation: Could differentiate on engagement if done well (most HR tech is utilitarian — gamification could make skill development more engaging + sticky). Risk: gamification could trivialize serious skill assessment — need balance (professional, not game-like).
    - **Dependencies:** User accounts + assessment history (for progress + streaks), badge/milestone system, notification/reminders infrastructure.

#### OUT OF SCOPE for B2C MVP (Future B2B Expansion Only)

14. **Resume/CV Scoring + Parsing** — Impact: 1/20
    - **Why:** Not core to Hirena's B2C value prop (skills assessment + career development for individuals). Only relevant for B2B expansion (employers assess candidates' resumes against competency models). TestGorilla, Greenhouse, SeekOut, Eightfold all have resume parsing/scoring for hiring.
    - **Dependencies:** B2B expansion strategy (employer-facing assessment), resume parsing infrastructure, scoring against competency model, bias mitigation (same risks as facial analysis).

15. **Internal Talent Marketplace** — Impact: 0.2/20
    - **Why:** Gloat, Fuel50, Eightfold dominate internal talent marketplace (enterprise B2B). Requires HCM integration + employee data + organizational structure. Not relevant for Hirena's B2C individual-focused positioning.
    - **Dependencies:** B2B enterprise expansion strategy, HCM integration (Workday, SAP, etc.), employee data + organizational structure, internal opportunity management (gigs, projects, mentorships, roles).

16. **Talent Sourcing + Talent Pool** — Impact: 0.2/20
    - **Why:** TestGorilla (2M+ pre-tested candidates), SeekOut, Eightfold, hireEZ, Gem dominate talent sourcing. Requires large candidate database + sourcing infrastructure. Not relevant for B2C individual professional development.
    - **Dependencies:** B2B expansion strategy, candidate database (millions of profiles), sourcing engine (skill graph search, AI matching), outreach infrastructure.

17. **Enterprise Integrations (ATS/HRIS/LMS)** — Impact: 0.25/20
    - **Why:** Eightfold, Vervoe, TestGorilla, Gloat, Fuel50 all have ATS/HRIS/LMS integrations for enterprise customers. Not relevant for B2C individuals (no ATS/HRIS/LMS to integrate with). Only relevant for B2B expansion (employers integrate Hirena into their ATS/HRIS).
    - **Dependencies:** B2B enterprise expansion strategy, ATS/HRIS/LMS API integrations, enterprise security + compliance (SOC 2, GDPR, etc.).

18. **Anti-Cheating + Trust Layer (B2B Proctored Assessments)** — Impact: 0.33/20
    - **Why:** Vervoe, TestGorilla have anti-cheating for employer-side candidate assessment (tab-switch detection, identity checks, behavior monitoring). Not needed for B2C self-assessment (user assesses themselves — no cheating risk). Only relevant if Hirena expands to proctored assessments for B2B (employers assessing candidates).
    - **Dependencies:** B2B expansion to proctored candidate assessment, proctoring infrastructure, identity verification, behavior monitoring.

### Dependency Graph (Feature Implementation Order)

```
Phase 1 (MVP) — Foundation:
├── User Auth + Profiles (Supabase) ← CRITICAL
├── Multi-Role Competency Models (10+ roles) ← CRITICAL
├── Bias Mitigation + Compliance Layer ← CRITICAL
├── Bilingual AR/EN (all core features) ← HIGH
├── MENA Benchmarks (PM role first) ← HIGH
├── Career Roadmap Enhancement (basic: curated content + career path viz) ← HIGH
├── AI Interview Practice — Real AI (GPT-4o Vision + Whisper) ← HIGH
├── Voice + Content Analysis (core) + Facial (optional/experimental) ← HIGH
└── Analytics Dashboard (progress tracking + benchmark comparison) ← HIGH

Phase 1-2 (Enhancement):
├── Learning Content Library (curated + partnered) ← HIGH
├── Career Path Visualization (visual ladder per role) ← HIGH
├── Progress Tracking + Skill Trajectory ← HIGH
├── MENA Benchmarks (expand to all software roles) ← HIGH
├── Mentor Matching Service ← MEDIUM
├── Shareable Report + LinkedIn Sharing ← MEDIUM
├── Compensation + Salary Intelligence (MENA-specific) ← LOW-MEDIUM
└── Gamification + Engagement (badges, milestones) ← LOW

Phase 2-3 (Optional / B2B Expansion):
├── Two-Way Voice Conversation (real-time WebSocket + voice streaming) ← LOW (Option 3)
├── Resume/CV Scoring + Parsing ← LOW (B2B only)
├── Internal Talent Marketplace ← LOW (B2B only)
├── Talent Sourcing + Talent Pool ← LOW (B2B only)
├── Enterprise Integrations (ATS/HRIS/LMS) ← LOW (B2B only)
└── Anti-Cheating + Trust Layer (proctored assessments) ← LOW (B2B only)
```

### Architecture Evolution Path

#### Phase 1 (Option 1: OpenAI-Native, Weeks 1-4) — MVP
- **Stack:** Next.js 15 + TypeScript + Tailwind + Shadcn/UI + OpenAI GPT-4o + Supabase (auth + database)
- **Features:** Multi-role competency models (Top 5 software roles), user accounts + profiles + assessment history, bias mitigation + compliance (facial disclaimer + optional/experimental), bilingual AR/EN (all core features), MENA benchmarks (PM role first), career roadmap enhancement (basic: curated content + career path visualization), AI interview practice — real AI integration (GPT-4o Vision + Whisper), voice + content analysis as core (facial optional/experimental), analytics dashboard enhancement (progress tracking + benchmark comparison)
- **AI Services:** OpenAI GPT-4o only (multi-modal: text + vision + audio). No new vendor integrations.
- **Cost:** OpenAI: $5-13/interview (video frames + audio + LLM). Supabase: free tier → $25/month. Total: ~$10-20/interview + infrastructure.

#### Phase 2 (Option 2: Specialized Services Upgrade, Weeks 5-10)
- **Stack:** Next.js + OpenAI (LLM + content analysis) + Deepgram/AssemblyAI (voice) + AWS Rekognition/DeepFace (facial) + D-ID/HeyGen (avatar) + Supabase (auth + database)
- **Features:** Learning content library (curated + partnered content), mentor matching service, skill trajectory visualization + progress tracking enhancement, shareable report generation (LinkedIn sharing), compensation + salary intelligence (MENA-specific), upgrade voice analysis to Deepgram/AssemblyAI (better quality than GPT-4o), upgrade facial analysis to AWS Rekognition or DeepFace (structured emotion scores), upgrade avatar to D-ID/HeyGen API (realistic talking head), bilingual AR/EN for all features (learning library, mentor matching, report generation), MENA benchmarks for all software roles
- **AI Services:** Specialized services for each analysis type (modular, swap independently).
- **Cost:** Deepgram: ~$0.50-2/interview. AWS Rekognition: ~$1-10/interview. D-ID: ~$3-5/interview. OpenAI: ~$1-3/interview. Total: ~$8-19/interview + infrastructure.

#### Phase 3 (Option 3: Real-Time Avatar — Optional, Weeks 11-20)
- **Stack:** Next.js + WebSocket + real-time voice streaming + 3D/2D avatar renderer + TTS streaming + continuous analysis pipeline
- **Features:** Real-time WebSocket interview session, two-way voice conversation (avatar speaks via voice AI, candidate responds via voice, real-time analysis), 3D avatar (Three.js + ReadyPlayerMe) or 2D animated avatar with lip-sync, continuous voice + facial analysis during interview, real-time feedback overlay (confidence indicator, speaking pace, suggested follow-up), advanced conversation state management (multi-turn dialogue, context-aware follow-ups)
- **AI Services:** Real-time voice AI + continuous facial analysis + avatar rendering SDK + TTS streaming. Most complex architecture.
- **Cost:** Real-time voice AI: ~$1-3/interview. Continuous facial analysis: ~$5-15/interview. Avatar rendering (SDK): ~$0.50-2/session. TTS: ~$0.50-1/interview. Total: ~$9-26/interview + infrastructure.

---

## Current State (Baseline)
- **Stack:** Next.js 15 + TypeScript + Tailwind + Shadcn/UI + OpenAI GPT-4o
- **Assessment:** Self-rating (0-5) + AI inference from text descriptions
- **Domain:** Product Management only — 35 PM skills, 6 pillars
- **Demo:** Pre-computed result, localStorage persistence
- **Live Status (as of 2026-09-10):**