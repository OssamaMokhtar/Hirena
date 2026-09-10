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

## Option 3: Purpose-Built Interview Platform (Most Comprehensive, ~12-20 weeks)

**Philosophy:** Build a dedicated interview platform with real-time avatar interaction, continuous multi-modal analysis, and a comprehensive software role competency framework. This is the "full vision" implementation.

### Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                       Frontend (Next.js + WebRTC)                │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                    Interview Session View                    ││
│  │  ┌──────────────────┐    ┌──────────────────────────────┐  ││
│  │  │  Avatar Mentor   │    │  Candidate Video (self-view) │  ││
│  │  │  (3D/2D + TTS +  │    │  (WebRTC + MediaRecorder)    │  ││
│  │  │   lip-sync)      │    │                              │  ││
│  │  │                  │    │                              │  ││
│  │  │  "Tell me about  │    │  [Recording indicator]       │  ││
│  │  │   a time you..." │    │                              │  ││
│  │  └──────────────────┘    └──────────────────────────────┘  ││
│  │                             │                              ││
│  │  ┌──────────────────────────────────────────────────────┐  ││
│  │  │  Real-time feedback overlay (optional):              │  ││
│  │  │  - Confidence indicator                              │  ││
│  │  │  - Speaking pace                                    │  ││
│  │  │  - Suggested follow-up (after answer)               │  ││
│  │  └──────────────────────────────────────────────────────┘  ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                    │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                    Assessment Dashboard                      ││
│  │  (existing, extended for multi-role + video analysis)       ││
│  └─────────────────────────────────────────────────────────────┘│
└──────────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────────────────────┐
│                    Real-Time Conversation Engine                  │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────────────┐ │
│  │ LLM (GPT-4o/   │  │ TTS (Eleven- │  │ Lip-sync / Avatar     │ │
│  │ Claude/LLM)    │  │ Labs/OpenAI) │  │ Renderer (WebGL/      │ │
│  │ - Generates    │  │ - Converts   │  │ CSS/Canvas/Sonalize)  │ │
│  │   questions    │  │   text to    │  │ - Receives audio +    │ │
│  │ - Follow-ups   │  │   speech     │  │   text, animates      │ │
│  │ - Evaluates   │  │              │  │   facial mesh /       │ │
│  │   answer vs   │  │              │  │   sprite             │ │
│  │   rubric       │  │              │  │                      │ │
│  └────────┬───────┘  └──────┬───────┘  └──────────┬──────────┘ │
│           │                  │                      │            │
│           └──────────────────┴──────────────────────┘            │
│                          │                                       │
│                    WebSocket (live session)                      │
└───────────────────────────┼───────────────────────────────────────┘
                            │
┌───────────────────────────┼──────────────────────────────────────┐
│              Analysis Engine (Server-Side)                       │
│  ┌──────────────────┐  ┌──────────────────┐  ┌───────────────┐ │
│  │ Voice Analysis   │  │ Facial Analysis  │  │ Content       │ │
│  │ (Deepgram/       │  │ (OpenAI Vision/  │  │ Analysis      │ │
│  │  AssemblyAI/     │  │  AWS Rekognition/│  │ (LLM +        │ │
│  │  custom model)   │  │  DeepFace)       │  │  competency   │ │
│  │ - Emotion        │  │ - Expression     │  │  model scoring)│
│  │ - Tone           │  │ - Eye contact    │  │ - Answer      │ │
│  │ - Pacing         │  │ - Engagement     │  │   quality     │ │
│  │ - Clarity        │  │ - Stress signs   │  │ - Relevance   │ │
│  │ - Filler words   │  │ - Confidence     │  │ - Depth       │ │
│  └────────┬─────────┘  └────────┬─────────┘  └───────┬───────┘ │
│           │                     │                      │         │
│           └─────────────────────┼──────────────────────┘         │
│                                 ▼                                │
│                    ┌──────────────────────┐                     │
│                    │ Results Fusion +     │                     │
│                    │ Scoring Engine       │                     │
│                    │ - Merge 3 signals    │                     │
│                    │ - Weight by signal   │                     │
│                    │ - Score vs rubric    │                     │
│                    │ - Generate report    │                     │
│                    └──────────┬───────────┘                     │
│                               │                                  │
│                               ▼                                  │
│                    ┌──────────────────────┐                     │
│                    │ Competency Models    │                     │
│                    │ (10+ software roles) │                     │
│                    │ - Skills per role    │                     │
│                    │ - Levels 0-7         │                     │
│                    │ - Career ladders     │                     │
│                    │ - Expected levels    │                     │
│                    │ - Role-specific rubric│                    │
│                    └──────────────────────┘                     │
└──────────────────────────────────────────────────────────────────┘
```

### What Changes

| Area | Change |
|------|--------|
| **Real-time avatar interview** | WebSocket-based live session. Avatar asks question → candidate responds → analysis runs (voice + face + content) → avatar generates next question or follow-up. Full conversation loop with ~2-5 sec latency per turn. |
| **Avatar** | Two tracks: (a) **3D avatar** — ReadyPlayerMe avatar + Three.js/WebGL renderer in browser, TTS audio streamed to client, lip-sync via phoneme extraction from audio. (b) **2D animated avatar** — Sprite-based or Canvas-rendered character with mouth animation synced to audio waveform. (c) **Sonalize / Live avatar SDK** — if budget allows, use a real-time avatar streaming SDK. |
| **Continuous voice analysis** | Audio streamed during interview → analyzed in near-real-time (or batched post-interview). Emotion, tone, pacing, confidence, filler words, clarity scored continuously. |
| **Continuous facial analysis** | Video frames analyzed during or after interview. Expression tracking, eye contact, engagement, stress indicators, confidence signals. |
| **Content analysis** | LLM evaluates each answer against role-specific rubric. Scores: relevance, depth, structure, specificity, confidence-in-content. |
| **Multi-modal fusion** | Results from voice + facial + content merged with weights. E.g., voice confidence 30%, facial engagement 20%, content quality 50%. Final score per competency. |
| **Competency models (10+ roles)** | Full expansion: |

### Full Software Role Competency Models

```
┌─────────────────────────────────────────────────────────────────┐
│                    SOFTWARE INDUSTRY COMPETENCY FRAMEWORK        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ROLE                  SKILLS  PILLARS        LEVELS  LADDER    │
│  ─────────────────────────────────────────────────────────────  │
│  Data Analyst          25-30  5 pillars      0-7     Jr→Sr→Ld  │
│  Business Analyst      20-25  4 pillars      0-7     Jr→Sr→Ld  │
│  QA Engineer           20-25  5 pillars      0-7     Jr→Sr→Ld  │
│  Tester (Manual)       15-20  3 pillars      0-5     Jr→Sr     │
│  Software Architect    30-35  6 pillars      0-7     Sr→Princ  │
│  Software Engineer    30-35  6 pillars      0-7     Jr→Sr→Ld   │
│  Frontend Engineer     25-30  5 pillars      0-7     Jr→Sr→Ld  │
│  Backend Engineer      25-30  5 pillars      0-7     Jr→Sr→Ld  │
│  Full-Stack Engineer   30-35  6 pillars      0-7     Jr→Sr→Ld  │
│  DevOps Engineer       20-25  5 pillars      0-7     Jr→Sr→Ld  │
│  UX/UI Designer        20-25  4 pillars      0-7     Jr→Sr→Ld  │
│  Engineering Manager   20-25  5 pillars      0-7     Mgr→Dir   │
│  Tech Lead             25-30  6 pillars      0-7     Sr→TL→Princ│
│  Product Manager       35     6 pillars      0-5     APM→CPO   │
│  Scrum Master          15-20  3 pillars      0-5     Jr→Sr     │
│  Data Engineer         25-30  5 pillars      0-7     Jr→Sr→Ld  │
│  ML Engineer           25-30  5 pillars      0-7     Jr→Sr→Ld  │
│                                                                 │
│  Total: ~15 roles × ~25 skills avg = ~375 skills               │
│  Plus cross-cutting skills (communication, collaboration, etc.)│
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Example — QA Engineer competency model:**
```typescript
const QA_ENGINEER_MODEL: RoleCompetencyModel = {
  role: "qa-engineer",
  skills: [
    // Testing fundamentals
    { id: "test-design", name: "Test Case Design", category: "testing-fundamentals", description: "..." },
    { id: "test-coverage", name: "Test Coverage Analysis", category: "testing-fundamentals", description: "..." },
    { id: "boundary-testing", name: "Boundary Value Analysis", category: "testing-fundamentals", description: "..." },
    { id: "equivalence-partitioning", name: "Equivalence Partitioning", category: "testing-fundamentals", description: "..." },
    { id: "exploratory-testing", name: "Exploratory Testing", category: "testing-fundamentals", description: "..." },
    // Automation
    { id: "selenium", name: "Selenium / WebDriver", category: "test-automation", description: "..." },
    { id: "playwright", name: "Playwright / Cypress", category: "test-automation", description: "..." },
    { id: "api-testing", name: "API Testing (Postman/RestAssured)", category: "test-automation", description: "..." },
    { id: "bdd-cucumber", name: "BDD (Cucumber/SpecFlow)", category: "test-automation", description: "..." },
    { id: "ci-test-automation", name: "CI Test Automation", category: "test-automation", description: "..." },
    // Performance
    { id: "load-testing", name: "Load / Performance Testing", category: "performance", description: "..." },
    { id: "stress-testing", name: "Stress Testing", category: "performance", description: "..." },
    // Security
    { id: "security-testing", name: "Security Testing Basics", category: "security", description: "..." },
    { id: "owasp", name: "OWASP Top 10 Awareness", category: "security", description: "..." },
    // Tools
    { id: "jira", name: "Jira / Issue Tracking", category: "tools", description: "..." },
    { id: "test-management", name: "Test Management Tools", category: "tools", description: "..." },
    { id: "sql-for-qa", name: "SQL for QA", category: "tools", description: "..." },
    // Process
    { id: "test-planning", name: "Test Planning", category: "process", description: "..." },
    { id: "bug-reporting", name: "Bug Reporting & Triage", category: "process", description: "..." },
    { id: "risk-analysis", name: "Risk-Based Testing", category: "process", description: "..." },
    // Collaboration
    { id: "dev-collaboration", name: "Developer Collaboration", category: "collaboration", description: "..." },
    { id: "communication", name: "Communication", category: "collaboration", description: "..." },
  ],
  pillars: [
    { name: "Testing Fundamentals", weight: 25, skills: [...] },
    { name: "Test Automation", weight: 30, skills: [...] },
    { name: "Performance & Security", weight: 15, skills: [...] },
    { name: "Tools & Infrastructure", weight: 15, skills: [...] },
    { name: "Process & Collaboration", weight: 15, skills: [...] },
  ],
  levels: [
    { level: 0, name: "No Experience", description: "..." },
    { level: 1, name: "Basic", description: "..." },
    { level: 2, name: "Intermediate", description: "..." },
    { level: 3, name: "Competent", description: "..." },
    { level: 4, name: "Advanced", description: "..." },
    { level: 5, name: "Expert", description: "..." },
    { level: 6, name: "Master", description: "..." },
    { level: 7, name: "Authority", description: "..." },
  ],
  careerLadder: [
    { title: "Junior QA Engineer", minLevel: 0, expected: { testingFundamentals: 1, testAutomation: 1, ... } },
    { title: "QA Engineer", minLevel: 2, expected: { ... } },
    { title: "Senior QA Engineer", minLevel: 3, expected: { ... } },
    { title: "Lead QA Engineer", minLevel: 4, expected: { ... } },
    { title: "QA Architect", minLevel: 5, expected: { ... } },
  ],
};
```

### Pros
- **Most impressive demo** — real-time avatar conversation with live analysis is visually and functionally impressive
- **Complete solution** — covers every requirement fully: video, voice, face, avatar, multi-role, all levels
- **Real-time interaction** — candidate gets live feedback during interview; avatar adapts follow-ups based on responses
- **Defensible differentiation** — purpose-built platform is harder to replicate than a thin integration layer
- **Scalable architecture** — services are independent; can start with async and add real-time later

### Cons
- **Longest timeline** — 12-20 weeks for full implementation; 6-10 weeks for a reduced version (async interview + post-analysis)
- **Highest cost** — avatar SDK/3D rendering + multiple AI services + WebSocket infrastructure + more engineering hours
- **Most complex** — real-time WebSocket + avatar rendering + multi-modal analysis + results fusion is a significant engineering effort
- **Avatar engineering is hard** — realistic lip-sync, facial animation, real-time TTS streaming is non-trivial; either pay for SDK or invest heavily in building it
- **Risk of over-engineering** — full real-time avatar may be overkill for MVP; async + post-analysis interview may suffice for initial demo

### Cost Estimate (per interview, real-time)
- Voice analysis (streaming): ~$1-3
- Facial analysis (continuous frames): ~$5-15
- Content analysis (LLM per answer): ~$2-5
- Avatar rendering (if SDK): ~$0.50-2 per session or subscription
- TTS (ElevenLabs, ~500 words): ~$0.50-1
- **Total: ~$9-26 per interview** (real-time, with avatar SDK); **~$7-15** (real-time, custom avatar)

---

## Comparison Matrix

| Criteria | Option 1 (OpenAI Native) | Option 2 (Specialized Services) | Option 3 (Purpose-Built Platform) |
|----------|--------------------------|--------------------------------|-----------------------------------|
| **Timeline** | 2-4 weeks | 6-10 weeks | 12-20 weeks |
| **Engineering effort** | Low-Medium | Medium | High |
| **Video interview** | Record → upload → analyze (async) | Record → upload → analyze (async) or real-time | Real-time WebSocket + live avatar |
| **Voice analysis** | GPT-4o/Whisper (indirect) | Deepgram/AssemblyAI (dedicated, better) | Deepgram + custom model (best) |
| **Facial analysis** | GPT-4o Vision (frame snapshots) | OpenAI Vision / AWS Rekognition / DeepFace | Continuous tracking + multiple signals |
| **Avatar** | CSS/SVG + TTS (basic) or avatar API (D-ID) | Avatar API (D-ID/HeyGen) or custom 2D + TTS | 3D avatar (Three.js) or SDK + real-time TTS + lip-sync |
| **Avatar conversation** | Async: LLM generates questions, avatar "speaks" via TTS | Async or near-real-time via WebSocket | Real-time conversation loop with live analysis |
| **Multi-role competency** | Add 5-8 roles, 20-30 skills each | Add 10-15 roles, 20-35 skills each | Add 10-15 roles, full 0-7 levels, career ladders |
| **Analysis quality** | Good (GPT-4o is capable) | Better (dedicated services) | Best (continuous + multi-signal fusion) |
| **Cost per interview** | $5-25 | $8-19 | $9-26 |
| **Infrastructure complexity** | Low (Next.js + OpenAI) | Medium (4-6 services) | High (WebSocket + avatar + multiple services) |
| **Demo impressiveness** | Moderate (async, basic avatar) | Good (better analysis, decent avatar) | Excellent (real-time, live avatar) |
| **Risk** | Low (leverages existing stack) | Medium (more integrations) | High (avatar engineering, real-time complexity) |

---

## Recommendation

### Start with Option 1 (OpenAI Native) for the demo — then evolve to Option 2.

**Why:**

1. **You have an active OpenAI account and key already configured.** GPT-4o's multi-modal capabilities (vision + audio) mean you can implement video analysis, voice analysis, and avatar conversation without adding new vendors initially.

2. **The demo is the immediate goal.** Option 1 gives you a working video interview + avatar mentor + multi-role assessment in 2-4 weeks. The avatar will be basic (CSS/SVG + TTS or D-ID API), but it demonstrates the concept.

3. **Option 1 → Option 2 is a natural evolution.** Once the demo validates the concept, you can swap GPT-4o voice analysis for Deepgram, GPT-4o vision for AWS Rekognition or DeepFace, and upgrade the avatar from CSS/SVG to D-ID or a custom 3D avatar. Each swap is independent.

4. **Option 3 is overkill for now.** Real-time WebSocket avatar with continuous multi-modal analysis is a major engineering effort. Save it for when you have validated demand and funding.

### Suggested implementation sequence

**Phase 1 (Option 1, weeks 1-4): MVP with OpenAI-native approach**
- Add video interview capture (MediaRecorder) to the assessment wizard
- Add avatar mentor (start with CSS/SVG animated character + ElevenLabs TTS or OpenAI TTS)
- Add GPT-4o Vision analysis of video frames (facial expressions)
- Add Whisper/GPT-4o audio analysis (voice characteristics)
- Expand competency models from PM-only to 5-8 software roles
- Keep async flow: candidate records interview → upload → analyze → results

**Phase 2 (Option 2, weeks 5-10): Upgrade analysis quality**
- Swap GPT-4o voice analysis for Deepgram or AssemblyAI
- Swap GPT-4o vision for AWS Rekognition or DeepFace (or keep GPT-4o if cost-effective)
- Upgrade avatar from CSS/SVG to D-ID/HeyGen API for realistic talking head
- Add results fusion (merge voice + facial + content signals)
- Expand to 10-15 roles with full competency models

**Phase 3 (Option 3, weeks 11-20): Real-time avatar interview (optional)**
- Add WebSocket-based live interview session
- Implement real-time avatar with lip-sync (Three.js + TTS streaming, or avatar SDK)
- Continuous voice + facial analysis during interview
- Real-time feedback to candidate (optional overlay)

---

## What Stays the Same

- **Next.js + TypeScript + Tailwind + Shadcn/UI** — frontend stack is solid
- **Assessment wizard concept** — extend from 5-step to include video interview step
- **Scoring engine** — extend to accept video/voice/facial analysis results alongside self-assessment + AI text inference
- **Design system** — Apple-inspired, clean/minimal, teal #0D9488, bilingual AR/EN
- **Bilingual support** — Arabic/English for all roles, not just PM
- **MENA-first positioning** — regional benchmarks for software roles in MENA market

---

## Open Questions for You

1. **Real-time vs async interview?** Do you want the avatar to talk to the candidate live (WebSocket, ~2-5 sec delay per exchange), or is async fine (candidate records responses, avatar questions are pre-recorded or TTS-generated, analysis happens after)?

2. **Avatar fidelity?** Basic (CSS/SVG character + TTS audio), mid (D-ID/HeyGen API — realistic talking head, per-minute cost), or high (custom 3D avatar with lip-sync — significant engineering)?

3. **Role priority?** Which software roles are most important for the initial launch? (e.g., Software Engineer + QA + Data Analyst first, then expand?)

4. **Budget for AI services?** D-ID/HeyGen/Synthesia have per-minute or subscription costs. Deepgram/AssemblyAI have per-second costs. Are you comfortable with ~$10-25 per interview in AI service costs, or do you need a lower-cost path?

5. **Video storage?** Do you need to store interview videos (for review, compliance, re-analysis), or is temporary processing enough?

