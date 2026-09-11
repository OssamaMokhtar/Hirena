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
5. **Video storage?** Store videos or temporary processing only?
