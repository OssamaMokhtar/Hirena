# Hirena — Data Flow Diagrams & Workflows

**Version:** 2.0  
**Last Updated:** September 12, 2026  

---

## Table of Contents

1. [Assessment Workflow](#1-assessment-workflow)
2. [Real-Time Interview Workflow](#2-real-time-interview-workflow)
3. [Multi-Role Competency Model Data Flow](#3-multi-role-competency-model-data-flow)
4. [API Request/Response Flows](#4-api-requestresponse-flows)
5. [User Journey Maps](#5-user-journey-maps)

---

## 1. Assessment Workflow

### 1.1 High-Level Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           USER JOURNEY: ASSESSMENT                          │
└─────────────────────────────────────────────────────────────────────────────┘

     ┌──────────┐
     │ 1. LAND  │  User visits hirena.app
     │  ON PAGE │
     └────┬─────┘
          │
          ▼
     ┌────────────────────────────────────┐
     │ 2. VIEW LANDING PAGE               │
     │ • Hero + Vision + How It Works     │
     │ • PM Competency Model preview      │
     │ • Career Ladder visual             │
     │ • "See a demo assessment" CTA      │
     │ • "Start Free Assessment" CTA      │
     └──────────────┬─────────────────────┘
                    │
          ┌────────┴────────┐
          │                │
          ▼                ▼
   ┌──────────────┐  ┌──────────────────┐
   │ 3A. DEMO     │  │ 3B. START        │
   │    PATH      │  │    ASSESSMENT    │
   │              │  │    WIZARD        │
   └──────┬───────┘  └────────┬─────────┘
          │                    │
          ▼                    ▼
   ┌─────────────────┐  ┌─────────────────────────────────┐
   │ Pre-computed    │  │ 4. COMPLETE 5-STEP WIZARD       │
   │ result loaded   │  │    from localStorage or fresh   │
   │ from module     │  │                                 │
   │ load            │  │ Step 1: Profile (role, exp,     │
   │                 │  │         region)                  │
   │ Render results  │  │ Step 2: Goal (target role,      │
   │ dashboard       │  │         track, career goal)     │
   │                 │  │ Step 3: Self-Rate skills        │
   │ Persisted to    │  │         (0-7 scale, grouped by  │
   │ localStorage    │  │         pillar)                 │
   │ (hirena-demo-   │  │ Step 4: AI Skill Analysis        │
   │ result)         │  │         (optional: describe     │
   │                 │  │         experience for rated    │
   │                 │  │         skills → GPT-4o infer)  │
   │                 │  │ Step 5: Review & Submit          │
   └─────────────────┘  └──────────────┬──────────────────┘
                                        │
                                        ▼
                              ┌─────────────────────┐
                              │ 5. SUBMIT ASSESSMENT │
                              │ POST /api/assess     │
                              │ ─────────────────── │
                              │ Body:               │
                              │ {                   │
                              │   targetRole,       │
                              │   targetTrack,      │
                              │   region,           │
                              │   selfAssessment:   │
                              │     { skillId:      │
                              │       level, ... }, │
                              │   aiInferenceInputs:│
                              │     [{ skillId,     │
                              │       description   │
                              │     }, ...]        │
                              │ }                   │
                              └────────┬────────────┘
                                       │
                                       ▼
                              ┌─────────────────────┐
                              │ 6. ROUTE HANDLER    │
                              │ • Validate input    │
                              │ • If aiInference    │
                              │   Inputs present:   │
                              │   → call inferAll   │
                              │   Skills() (GPT-4o) │
                              │   → returns:        │
                              │   { skillId:        │
                              │     { level,        │
                              │       confidence,   │
                              │       reasoning } } │
                              │ • Pass input +      │
                              │   aiInferenceResults│
                              │   to                │
                              │   computeAssessment │
                              │   Result()          │
                              │ • Scoring engine:  │
                              │   - Merge AI levels │
                              │     over self-assess│
                              │   - Compute weighted│
                              │     pillar scores   │
                              │   - Identify gaps,  │
                              │     strengths,      │
                              │     missing skills  │
                              │   - Generate roadmap│
                              │     actions         │
                              └────────┬────────────┘
                                       │
                                       ▼
                              ┌─────────────────────┐
                              │ 7. RESPONSE         │
                              │ AssessmentResult:   │
                              │ {                   │
                              │   overallScore: 42, │
                              │   competencyScores: │
                              │     { pillarId:     │
                              │       { average,    │
                              │         skills } }, │
                              │   skillRanking: [...],│
                              │   strengths: [...], │
                              │   gaps: [...],      │
                              │   missingSkills: [...],│
                              │   roadmap: [...],   │
                              │   createdAt,        │
                              │   completedAt       │
                              │ }                   │
                              └────────┬────────────┘
                                       │
                                       ▼
                              ┌─────────────────────┐
                              │ 8. RESULTS DASHBOARD │
                              │ • Overall score (42) │
                              │ • Competency bars   │
                              │   (per pillar)      │
                              │ • Skill ranking     │
                              │   (sorted,          │
                              │    highlighted AI)  │
                              │ • Gap analysis      │
                              │   (top 5 gaps)      │
                              │ • Roadmap actions   │
                              │   (immediate,       │
                              │    intermediate,    │
                              │    long-term)       │
                              │ • Persist to        │
                              │   localStorage      │
                              └─────────────────────┘
```

### 1.2 Assessment Scoring Logic

```
computeAssessmentResult(input, userId, aiInferenceResults?)

┌─────────────────────────────────────────────────────────────────────────────┐
│ STEP 1: Gather all skills for target role                                  │
│   → getRoleModel(input.targetRole).skills (Record<string, Skill>)         │
│   → Filter to skills user self-rated (in input.selfAssessment)             │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ STEP 2: Determine final level for each skill                               │
│   For each skill the user rated:                                           │
│     if aiInferenceResults[skillId] exists:                                 │
│       → Use AI-inferred level (with confidence score)                      │
│       → Mark isAiInferred = true                                           │
│     else:                                                                  │
│       → Use self-rated level                                               │
│       → Mark isAiInferred = false                                          │
│   For skills not rated by user:                                            │
│     → Level = 0 (not assessed)                                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ STEP 3: Compute competency area scores (weighted averages)                 │
│   For each competency area (pillar) in role model:                         │
│     avg = Σ(skill_level × skill_weight) / Σ(skill_weight)                 │
│     → normalized to 0-100 scale                                             │
│   Result: competencyScores: Record<string, { average: number, skills: Skill[] }>│
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ STEP 4: Compute overall score                                              │
│   overallScore = Σ(competencyAreaScore × areaWeight)                       │
│   → weighted average of all pillar scores                                   │
│   → normalized to 0-100                                                    │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ STEP 5: Identify strengths, gaps, missing skills                          │
│   strengths: skills where level ≥ 5 (defined threshold)                    │
│   gaps: skills where level < 3 (significant gap)                           │
│   missingSkills: skills user didn't rate                                   │
│   For each gap: compute priority = gapSize × pillarWeight × goalRelevance  │
│   Sort gaps by priority descending → top 5                                 │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ STEP 6: Generate roadmap actions                                           │
│   For each gap:                                                            │
│     → immediate: foundational skills, quick wins (1-3 months)              │
│     → intermediate: core skills for target role (3-6 months)               │
│     → long-term: advanced/specialization (6-12 months)                     │
│   Each action: { title, description, suggestedResources[], estimatedTime } │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ RETURN: AssessmentResult                                                   │
│ { overallScore, competencyScores, skillRanking, strengths, gaps,           │
│   missingSkills, roadmap, createdAt, completedAt }                         │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.3 Demo Path (No API Required)

```
MODULE LOAD (page.tsx)

┌─────────────────────────────────────────────┐
│ DEMO_INPUT = {                              │
│   targetRole: "software-engineer",         │
│   targetTrack: null,                       │
│   region: "mena",                          │
│   selfAssessment: { ... },                 │
│ }                                           │
│                                             │
│ DEMO_AI_INFERENCE_RESULTS = {              │
│   "skill-1": { level: 5, confidence: 0.85, │
│                reasoning: "..." },          │
│   "skill-2": { level: 4, confidence: 0.72, │
│                reasoning: "..." },          │
│   ...                                       │
│ }                                           │
│                                             │
│ DEMO_RESULT = computeAssessmentResult(      │
│   DEMO_INPUT,                               │
│   "demo-user",                              │
│   DEMO_AI_INFERENCE_RESULTS                │
│ )                                           │
│                                             │
│ → Uses pre-computed seed data, NOT a real   │
│   API call. Bypasses OpenAI entirely.       │
│ → Result: { overallScore: 42, ... }        │
└─────────────────────────────────────────────┘

COMPONENT MOUNT

┌─────────────────────────────────────────────┐
│ "See a demo assessment" button clicked      │
│ → setResult(DEMO_RESULT)                    │
│ → Render results dashboard                  │
│ → Persist to localStorage (hirena-demo-    │
│   result) for page refresh                  │
└─────────────────────────────────────────────┘
```

---

## 2. Real-Time Interview Workflow

### 2.1 High-Level Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     REAL-TIME INTERVIEW: 8-STEP FLOW                       │
└─────────────────────────────────────────────────────────────────────────────┘

     ┌──────────┐
     │ 1. START │  User clicks "Start Real-Time Interview"
     │  INTERVIEW│
     └────┬─────┘
          │
          ▼
     ┌────────────────────────────────────┐
     │ 2. WebSocket CONNECTION            │
     │ POST /api/interview/session        │
     │ → establishes WebSocket connection │
     │ → session state: awaitingContext   │
     │ → server sends: { type: 'context' }│
     └──────────────┬─────────────────────┘
                    │
                    ▼
     ┌────────────────────────────────────┐
     │ 3. AWAIT CONTEXT                   │
     │ • User provides: targetRole,      │
     │   targetTrack, yearsExperience    │
     │ • Client sends: {                │
     │     type: 'context',             │
     │     targetRole, targetTrack,     │
     │     yearsExperience              │
     │   }                               │
     │ • Server stores in sessionMap     │
     │ • Server sends: { type:           │
     │     'instruction', message:       │
     │     'Tell me about yourself...' } │
     └──────────────┬─────────────────────┘
                    │
                    ▼
     ┌────────────────────────────────────┐
     │ 4. AWAIT INSTRUCTION               │
     │ • User sees instruction on screen  │
     │ • User clicks "I'm ready"          │
     │ • Client sends: {                 │
     │     type: 'instruction',          │
     │     ready: true                   │
     │   }                               │
     │ • Server sends: { type:           │
     │     'avatar-question',            │
     │     message: avatarQuestion,      │
     │     questionNumber: 1 }          │
     └──────────────┬─────────────────────┘
                    │
                    ▼
     ┌────────────────────────────────────┐
     │ 5. AWAIT VIDEO                     │
     │ • Avatar displays question on      │
     │   screen + plays TTS audio        │
     │ • User clicks "Start Recording"    │
     │ • MediaRecorder + getUserMedia     │
     │   captures video response          │
     │ • User clicks "Stop Recording"     │
     │ • Client sends: {                 │
     │     type: 'video', videoData,     │
     │     duration                      │
     │   }                               │
     │ • Server stores video in session  │
     └──────────────┬─────────────────────┘
                    │
                    ▼
     ┌────────────────────────────────────┐
     │ 6. ANALYZE VOICE                   │
     │ • Server sends: { type:           │
     │     'analyzing' } (UI shows        │
     │     loading state)                 │
     │ • Server calls POST /api/voice/    │
     │   analyze with:                    │
     │   { transcription, duration }     │
     │ • Returns: VoiceAnalysisResult     │
     │   { overallQuality, dimensions:   │
     │     { confidence, clarity, pacing,│
     │       emotion, engagement,        │
     │       fillerWords } }             │
     │ • Server stores in session        │
     └──────────────┬─────────────────────┘
                    │
                    ▼
     ┌────────────────────────────────────┐
     │ 7. ANALYZE FACIAL                  │
     │ • Server calls POST /api/facial/   │
     │   analyze with: { targetRole,      │
     │     duration }                    │
     │ • Returns: FacialAnalysisResult    │
     │   { overallEngagement, frames: [...],│
     │     dimensions: { eyeContact,     │
     │       engagement, confidence,     │
     │       stress, expressiveness,     │
     │       smileWarmth },               │
     │     emotionDistribution: [...] }  │
     │ • Server stores in session        │
     └──────────────┬─────────────────────┘
                    │
                    ▼
     ┌────────────────────────────────────┐
     │ 8. RESULTS FUSION                  │
     │ • Server calls POST /api/fusion/   │
     │   result with:                     │
     │   { voiceAnalysis, facialAnalysis, │
     │     selfAssessment }              │
     │ • Returns: FusionResult            │
     │   { overallScore, scores: {       │
     │     voice, facial, selfAssessment,│
     │     content }, dimensionBreakdown,│
     │     strengths, gaps,              │
     │     recommendations }             │
     │ • Server stores in session        │
     └──────────────┬─────────────────────┘
                    │
                    ▼
     ┌────────────────────────────────────┐
     │ 9. AWAIT FOLLOW-UP                 │
     │ • Server sends: { type:           │
     │     'feedback', feedback: [...] } │
     │ • User sees analysis results       │
     │ • User clicks "Continue"           │
     │ • Server sends: { type:           │
     │     'avatar-question',            │
     │     message: followUpQuestion,    │
     │     questionNumber: 2 }          │
     │ • Repeat steps 5-8 for follow-up  │
     └──────────────┬─────────────────────┘
                    │
                    ▼
     ┌────────────────────────────────────┐
     │ 10. INTERVIEW COMPLETE             │
     │ • Server sends: { type:           │
     │     'interview-complete',          │
     │     result: InterviewFinalResult } │
     │ • Client displays final dashboard  │
     │ • Disconnect WebSocket             │
     │ • Persist result to localStorage   │
     └────────────────────────────────────┘
```

### 2.2 Session State Machine

```
WebSocket Session State Machine

┌─────────────────────────────────────────────────────────────────────────────┐
│                              INITIAL STATE                                  │
│  sessionState = 'awaitingContext'                                         │
│  sessionData = { targetRole, targetTrack, yearsExperience }               │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼ (client sends context)
┌─────────────────────────────────────────────────────────────────────────────┐
│                       STATE: AWAITING_CONTEXT                               │
│  Action: Store context in sessionMap[clientId]                            │
│  Transition: Send { type: 'instruction', message: 'Tell me about...' }   │
│  → Next state: 'awaitingInstruction'                                      │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼ (client sends ready)
┌─────────────────────────────────────────────────────────────────────────────┐
│                       STATE: AWAITING_INSTRUCTION                           │
│  Action: Generate avatar question based on role + competency model        │
│  Transition: Send { type: 'avatar-question', message, questionNumber }   │
│  → Next state: 'awaitingVideo'                                            │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼ (client sends video)
┌─────────────────────────────────────────────────────────────────────────────┐
│                         STATE: AWAITING_VIDEO                               │
│  Action: Store video data in session                                      │
│  Transition: Send { type: 'analyzing' }; call voice/analyze API           │
│  → Next state: 'analyzingVoice'                                           │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼ (voice analysis complete)
┌─────────────────────────────────────────────────────────────────────────────┐
│                        STATE: ANALYZING_VOICE                               │
│  Action: Store voice analysis result in session                           │
│  Transition: Call facial/analyze API; send { type: 'analyzing' }         │
│  → Next state: 'analyzingFacial'                                          │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼ (facial analysis complete)
┌─────────────────────────────────────────────────────────────────────────────┐
│                        STATE: ANALYZING_FACIAL                              │
│  Action: Store facial analysis result in session                          │
│  Transition: Call fusion/result API; store result                         │
│  → Next state: 'awaitingFollowUp'                                         │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼ (client sends continue)
┌─────────────────────────────────────────────────────────────────────────────┐
│                        STATE: AWAITING_FOLLOWUP                             │
│  Action: Generate follow-up question based on previous answers            │
│  Transition: Send { type: 'avatar-question', message, questionNumber }   │
│  → Next state: 'awaitingVideo' (loop back)                               │
└─────────────────────────────────────────────────────────────────────────────┘

◄───── Loop until max questions reached or user ends interview ─────►

┌─────────────────────────────────────────────────────────────────────────────┐
│                        STATE: INTERVIEW_COMPLETE                            │
│  Action: Compile final result, send { type: 'interview-complete',         │
│           result: InterviewFinalResult }, clean up session                │
│  → End state (connection closed)                                          │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.3 Avatar Mentor Conversation Flow

```
Avatar Mentor: Question Generation & Response

┌─────────────────────────────────────────────────────────────────────────────┐
│                              AVATAR MENTOR                                   │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ Question Generation                                                 │   │
│  │   • Input: targetRole, competencyModel, questionNumber,              │   │
│  │     previousAnswers (context)                                       │   │
│  │   • Source: Pre-defined questions per role (curated)                │   │
│  │     OR: AI-generated questions via GPT-4o (Phase 2)                 │   │
│  │   • Output: { questionText, followUpPrompt }                       │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ Avatar Rendering                                                     │   │
│  │   • Input: questionText, avatarState                                │   │
│  │   • Render: CSS/SVG animated character (baseline)                   │   │
│  │     OR: D-ID/HeyGen API video (Phase 2)                             │   │
│  │   • Audio: TTS via ElevenLabs/OpenAI TTS (Phase 2)                  │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ Response Handling                                                    │   │
│  │   • Input: userVideo, userAudio                                      │   │
│  │   • Process: MediaRecorder → video blob                             │   │
│  │   • Send to server for analysis                                      │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Multi-Role Competency Model Data Flow

### 3.1 Model Loading & Aggregation

```
┌─────────────────────────────────────────────────────────────────────────────┐
│              MULTI-ROLE COMPETENCY MODEL LOADING                            │
└─────────────────────────────────────────────────────────────────────────────┘

     ┌─────────────────────────────────────────────────────────────┐
     │ 1. IMPORT ALL ROLE MODULES                                   │
     │   src/lib/competency-models/                                 │
     │   ├── software-engineer.ts (38 skills, 8 pillars)            │
     │   ├── frontend-engineer.ts (36 skills, 8 pillars)            │
     │   ├── backend-engineer.ts (31 skills, 9 pillars)             │
     │   ├── full-stack-engineer.ts (37 skills, 10 pillars)         │
     │   ├── qa-engineer.ts (29 skills, 7 pillars)                  │
     │   └── index.ts (aggregator)                                  │
     └───────────────────────────┬─────────────────────────────────┘
                                 │
                                 ▼
     ┌─────────────────────────────────────────────────────────────┐
     │ 2. AGGREGATE INTO ROLE_COMPETENCY_MODELS                     │
     │   index.ts:                                                    │
     │   - Import all individual role modules                        │
     │   - Build ROLE_COMPETENCY_MODELS:                             │
     │     Record<string, RoleCompetencyModel>                       │
     │   - Build ROLE_SUMMARIES: RoleSummary[]                       │
     │   - Export: getRoleModel(roleId), getAllRoleIds(),            │
     │     getRoleSummary(roleId), getAllRoles()                     │
     └───────────────────────────┬─────────────────────────────────┘
                                 │
                                 ▼
     ┌─────────────────────────────────────────────────────────────┐
     │ 3. ROLE COMPETENCY MODEL STRUCTURE                            │
     │   RoleCompetencyModel:                                        │
     │   {                                                            │
     │     role: "software-engineer",                                │
     │     roleName: "Software Engineer",                            │
     │     track: null,                                              │
     │     description: "...",                                       │
     │     skills: Record<string, Skill>,                            │
     │     pillars: CompetencyPillar[],                              │
     │     competencyAreas: CompetencyArea[],                        │
     │     levels: ProficiencyLevel[],                               │
     │     careerLadder: CareerLadderStep[],                          │
     │     expectedLevels: Record<string, CareerLadderStep>,         │
     │     totalSkills: 38,                                          │
     │     totalPillars: 8,                                          │
     │     region: "global"                                          │
     │   }                                                            │
     └───────────────────────────┬─────────────────────────────────┘
                                 │
                                 ▼
     ┌─────────────────────────────────────────────────────────────┐
     │ 4. SKILL DATA STRUCTURE                                       │
     │   Skill:                                                      │
     │   {                                                            │
     │     id: "programming-languages",                              │
     │     name: "Programming Languages",                            │
     │     description: "...",                                       │
     │     category: "tech-foundation",                              │
     │     level: 0,                                                 │
     │     evidence?: string,                                        │
     │     aiConfidence?: number,                                    │
     │     isAiInferred?: boolean                                    │
     │   }                                                            │
     │                                                                │
     │   COMPETENCY_AREAS: CompetencyArea[]                          │
     │   { id: "tech-foundation", name: "Technical Foundation",      │
     │     description: "...", skills: ["skill-1", "skill-2"],       │
     │     weight: 15 }                                              │
     │                                                                │
     │   LEVELS: ProficiencyLevel[] (0-7 scale)                      │
     │                                                                │
     │   CAREER_LADDER: CareerLadderStep[]                            │
     │   { title: "Senior Software Engineer",                        │
     │     minLevel: 5, maxLevel: 6,                                 │
     │     expected: { "skill-1": 5, "skill-2": 4, ... },           │
     │     description: "...",                                       │
     │     typicalYearsOfExperience: "3-5 years" }                  │
     └─────────────────────────────────────────────────────────────┘
```

### 3.2 Competency Model Type System

```
Type Hierarchy (src/types/index.ts)

┌─────────────────────────────────────────────────────────────────────────────┐
│ SKILL CATEGORY (string union, 46 categories)                                │
│   "programming-languages" | "frontend-fundamentals" | ...                  │
│   (Flexible string — not limited to union for extensibility)                │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ SKILL                                                                       │
│ {                                                                           │
│   id: string,           ← Unique identifier (matches category key)         │
│   name: string,         ← Display name                                    │
│   description: string,  ← Brief description                               │
│   category: string,     ← Pillar ID (any string, 46 categories)           │
│   level: number,        ← 0-7 proficiency scale                           │
│   evidence?: string,    ← User's experience description                   │
│   aiConfidence?: number,← 0-1 AI confidence in inference                  │
│   isAiInferred?: boolean← Whether from AI vs self-rating                  │
│ }                                                                           │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ COMPETENCY AREA (Pillar)                                                    │
│ {                                                                           │
│   id: string,             ← Pillar ID                                     │
│   name: string,           ← Pillar name                                  │
│   description: string,    ← Pillar description                            │
│   skills: string[],       ← Skill IDs in this pillar                     │
│   weight: number          ← 0-100, relative importance                    │
│ }                                                                           │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ PROFICIENCY LEVEL (0-7 scale)                                               │
│ {                                                                           │
│   level: 0-7,                                                         │
│   label: string,          ← "None" → "Authority"                        │
│   description: string     ← What this level means                       │
│ }                                                                           │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ CAREER LADDER STEP                                                          │
│ {                                                                           │
│   title: string,           ← Role title (e.g., "Senior Software Engineer")│
│   minLevel: number,        ← Minimum proficiency (0-7)                   │
│   maxLevel?: number,       ← Maximum proficiency (optional)               │
│   expected: Record<string, number>, ← Per-skill expected levels          │
│   description: string,     ← Role expectations                           │
│   typicalYearsOfExperience: string ← e.g., "3-5 years"                  │
│ }                                                                           │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ ROLE COMPETENCY MODEL (Aggregates all above)                                │
│ {                                                                           │
│   role: string,              ← Role ID (e.g., "software-engineer")       │
│   roleName: string,          ← Display name                              │
│   track: string | null,      ← Optional track specialization             │
│   description: string,       ← Role description                          │
│   skills: Record<string, Skill>, ← All skills for this role              │
│   pillars: CompetencyPillar[], ← Competency pillars                      │
│   competencyAreas: CompetencyArea[], ← Grouped skill areas               │
│   levels: ProficiencyLevel[],  ← Proficiency scale                       │
│   careerLadder: CareerLadderStep[], ← Career progression                 │
│   expectedLevels: Record<string, CareerLadderStep>,                      │
│   totalSkills: number,        ← Skill count                             │
│   totalPillars: number,       ← Pillar count                            │
│   region: string              ← Geographic scope                         │
│ }                                                                           │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. API Request/Response Flows

### 4.1 Assessment API

```
POST /api/assess
────────────────────────────────────────────────────────────────────────────────

REQUEST:
{
  "targetRole": "software-engineer",
  "targetTrack": null,
  "region": "mena",
  "selfAssessment": {
    "programming-languages": 5,
    "frontend-fundamentals": 4,
    "testing": 3,
    ...
  },
  "aiInferenceInputs": [
    {
      "skillId": "programming-languages",
      "description": "5 years experience with TypeScript, JavaScript, Python..."
    },
    {
      "skillId": "testing",
      "description": "Experience with Jest, Cypress, unit testing..."
    }
  ]
}

PROCESSING:
1. Validate input (targetRole exists in ROLE_COMPETENCY_MODELS)
2. If aiInferenceInputs present and non-empty:
   → Call inferAllSkills(aiInferenceInputs, model, userId)
   → OpenAI GPT-4o analyzes each description → returns inferred levels
   → Returns: { "programming-languages": { level: 6, confidence: 0.9, reasoning: "..." }, ... }
3. Pass input + aiInferenceResults to computeAssessmentResult()
4. Scoring engine computes:
   - Per-skill final levels (AI-inferred or self-rated)
   - Per-pillar weighted averages
   - Overall score (weighted average of pillars)
   - Strengths (level ≥ 5), gaps (level < 3), missing skills (not rated)
   - Roadmap actions based on gaps

RESPONSE (200 OK):
{
  "success": true,
  "result": {
    "overallScore": 42,
    "competencyScores": {
      "tech-foundation": { "average": 45, "skills": [...] },
      "languages": { "average": 60, "skills": [...] },
      "devops-tools": { "average": 15, "skills": [...] },
      ...
    },
    "skillRanking": [
      { "id": "programming-languages", "name": "Programming Languages",
        "selfLevel": 5, "aiLevel": 6, "finalLevel": 6, "isAiInferred": true },
      { "id": "testing", "name": "Testing",
        "selfLevel": 3, "aiLevel": 4, "finalLevel": 4, "isAiInferred": true },
      ...
    ],
    "strengths": ["programming-languages"],
    "gaps": [
      { "id": "devops-tools", "name": "DevOps Tools",
        "currentLevel": 1, "targetLevel": 5, "gapSize": 4,
        "priority": 85, "why": "..." }
    ],
    "missingSkills": ["security", "performance"],
    "roadmap": {
      "immediate": [
        { "title": "Learn Git and Version Control",
          "description": "...",
          "suggestedResources": [...],
          "estimatedTime": "2-4 weeks" }
      ],
      "intermediate": [...],
      "longTerm": [...]
    },
    "aiInferenceNotes": "AI inferred higher proficiency in programming languages based on your experience description.",
    "createdAt": "2026-09-12T10:00:00Z",
    "completedAt": "2026-09-12T10:00:05Z"
  }
}

ERROR RESPONSES:
400 Bad Request: { "error": "Invalid targetRole" }
500 Internal Server Error: { "error": "Failed to compute assessment" }
```

### 4.2 Voice Analysis API

```
POST /api/voice/analyze
────────────────────────────────────────────────────────────────────────────────

REQUEST:
{
  "targetRole": "software-engineer",
  "transcription": "I have 5 years of experience building full-stack applications...",
  "duration": 120  // seconds
}

PROCESSING:
1. Analyze transcription for:
   - Confidence (language use, specific examples, fluency)
   - Clarity (articulation, structure, coherence)
   - Pacing (speech rate, appropriate pauses)
   - Emotion (enthusiasm, engagement, tone)
   - Engagement (responsiveness, elaboration)
   - Filler Words (um, uh, like, you know frequency)
2. Return simulated analysis (Phase 1 — simulated)
   → Phase 2: Use Deepgram/AssemblyAI for real analysis

RESPONSE (200 OK):
{
  "success": true,
  "analysis": {
    "overallQuality": 75,
    "dimensions": {
      "confidence": 80,
      "clarity": 70,
      "pacing": 75,
      "emotion": 85,
      "engagement": 72,
      "fillerWords": 60   // Lower = better (fewer filler words)
    },
    "notes": [
      "Strong use of specific technical examples",
      "Good pacing with appropriate pauses",
      "Occasional filler words — practice pacing"
    ]
  }
}
```

### 4.3 Facial Analysis API

```
POST /api/facial/analyze
────────────────────────────────────────────────────────────────────────────────

REQUEST:
{
  "targetRole": "software-engineer",
  "duration": 120  // seconds
}

PROCESSING:
1. Generate simulated frames (6 frames at 20-second intervals)
2. For each frame, simulate:
   - Emotion: neutral, happy, engaged, thoughtful, surprised
   - Eye Contact: 0-100
   - Facial Expression: neutral, smile, thoughtful, engaged
   - Head Pose: forward, slight-left, slight-right, up, down
3. Compute overall engagement + per-dimension averages
   → Phase 2: Use AWS Rekognition or DeepFace for real analysis

RESPONSE (200 OK):
{
  "success": true,
  "analysis": {
    "overallEngagement": 78,
    "dimensions": {
      "eyeContact": 85,
      "engagement": 75,
      "confidence": 80,
      "stress": 30,      // Lower = better (less stress detected)
      "expressiveness": 72,
      "smileWarmth": 78
    },
    "frames": [
      {
        "timestamp": 0,
        "emotion": "neutral",
        "eyeContact": 80,
        "facialExpression": "neutral",
        "headPose": "forward"
      },
      {
        "timestamp": 20,
        "emotion": "engaged",
        "eyeContact": 90,
        "facialExpression": "engaged",
        "headPose": "forward"
      },
      ...
    ],
    "emotionDistribution": [
      { "emotion": "neutral", "percentage": 40 },
      { "emotion": "engaged", "percentage": 35 },
      { "emotion": "thoughtful", "percentage": 15 },
      { "emotion": "happy", "percentage": 10 }
    ],
    "notes": [
      "Good eye contact throughout the interview",
      "Displayed engaged expression during technical questions",
      "Low stress levels — appears comfortable"
    ]
  }
}
```

### 4.4 Results Fusion API

```
POST /api/fusion/result
────────────────────────────────────────────────────────────────────────────────

REQUEST:
{
  "targetRole": "software-engineer",
  "voiceAnalysis": {
    "overallQuality": 75,
    "dimensions": { "confidence": 80, "clarity": 70, ... }
  },
  "facialAnalysis": {
    "overallEngagement": 78,
    "dimensions": { "eyeContact": 85, "engagement": 75, ... }
  },
  "selfAssessment": {
    "programming-languages": 5,
    "frontend-fundamentals": 4,
    ...
  }
}

PROCESSING:
1. Compute weighted scores:
   - voiceScore = voiceAnalysis.overallQuality × 0.30
   - facialScore = facialAnalysis.overallEngagement × 0.20
   - selfAssessmentScore = compute average of selfAssessment values × 0.25
   - contentScore = average of voice + facial dimensions related to content/communication × 0.25
2. overallScore = voiceScore + facialScore + selfAssessmentScore + contentScore
3. Dimension breakdown: voice, facial, selfAssessment, content (each with sub-dimensions)
4. Identify strengths (dimensions ≥ 70), gaps (dimensions < 50)
5. Generate recommendations based on gaps

RESPONSE (200 OK):
{
  "success": true,
  "fusedResult": {
    "overallScore": 72,
    "scores": {
      "voice": 75,
      "facial": 78,
      "selfAssessment": 42,
      "content": 68
    },
    "dimensionBreakdown": {
      "voice": {
        "confidence": 80, "clarity": 70, "pacing": 75,
        "emotion": 85, "engagement": 72, "fillerWords": 60
      },
      "facial": {
        "eyeContact": 85, "engagement": 75, "confidence": 80,
        "stress": 30, "expressiveness": 72, "smileWarmth": 78
      },
      "selfAssessment": {
        "programming-languages": 5, "frontend-fundamentals": 4, ...
      },
      "content": {
        "technicalDepth": 70, "communicationClarity": 65,
        "exampleUse": 75, "structure": 68
      }
    },
    "strengths": [
      "Strong eye contact and engagement",
      "Good confidence in voice",
      "Clear technical examples"
    ],
    "gaps": [
      "Moderate filler word usage — practice pacing",
      "Self-assessment shows gaps in DevOps tools"
    ],
    "recommendations": [
      "Reduce filler words by practicing structured responses",
      "Focus on DevOps tools for full-stack roles"
    ]
  }
}
```

### 4.5 Interview Session WebSocket

```
WebSocket: /api/interview/session
────────────────────────────────────────────────────────────────────────────────

CLIENT → SERVER MESSAGES (WSClientMessage):

{ type: 'context', targetRole: 'software-engineer', targetTrack: null,
  yearsExperience: '5-10' }

{ type: 'instruction', ready: true }

{ type: 'video', videoData: Blob, duration: 120 }

{ type: 'continue' }  // After viewing feedback, continue to next question

{ type: 'end' }  // End interview early

SERVER → CLIENT MESSAGES (WSServerMessage):

{ type: 'context' }  // Request context (on connection)

{ type: 'instruction', message: 'Tell me about your experience with...' }

{ type: 'avatar-question', message: 'What's your approach to testing?',
  questionNumber: 1 }

{ type: 'analyzing' }  // UI shows loading state during analysis

{ type: 'feedback', feedback: [
  { type: 'voice', score: 75, dimensions: {...} },
  { type: 'facial', score: 78, dimensions: {...} },
  { type: 'fusion', overallScore: 72, strengths: [...], gaps: [...] }
] }

{ type: 'interview-complete', result: InterviewFinalResult }

SESSION LIFECYCLE:

1. Client connects → server creates session in sessionMap[clientId]
2. Server sends { type: 'context' }
3. Client sends { type: 'context', ... } → server stores, sends { type: 'instruction' }
4. Client sends { type: 'instruction', ready: true } → server sends avatar question
5. Client sends { type: 'video', ... } → server stores, sends { type: 'analyzing' }
6. Server calls voice/analyze → stores result, sends { type: 'analyzing' }
7. Server calls facial/analyze → stores result, sends { type: 'analyzing' }
8. Server calls fusion/result → stores result
9. Server sends { type: 'feedback', feedback: [...] }
10. Client sends { type: 'continue' } → server sends next avatar question
11. Repeat steps 5-10 for follow-up questions
12. Server sends { type: 'interview-complete', result: ... }
13. Client disconnects → server cleans up sessionMap[clientId]
```

---

## 5. User Journey Maps

### 5.1 Journey: First-Time User (Demo Path)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        USER JOURNEY: FIRST-TIME VISITOR                     │
│                          (Demo Path — No Account)                           │
└─────────────────────────────────────────────────────────────────────────────┘

     ┌──────────┐
     │ 1. DISCOVERY │
     │  User hears │
     │  about      │
     │  Hirena     │
     │  via social │
     │  media,     │
     │  referral,  │
     │  or search  │
     └──────┬─────┘
            │
            ▼
     ┌────────────────────────────────────┐
     │ 2. LAND ON WEBSITE                 │
     │ • Sees hero: "AI-Powered Skills   │
     │   Assessment for MENA Professionals"│
     │ • Views: Vision, How It Works,     │
     │   PM Competency Model, Career       │
     │   Ladder, Demo CTA                  │
     │ • CTA: "See a demo assessment"      │
     └──────────────┬─────────────────────┘
                    │
                    ▼
     ┌────────────────────────────────────┐
     │ 3. CLICK "SEE A DEMO ASSESSMENT"  │
     │ • No sign-up required              │
     │ • Pre-computed result loads        │
     │ • Result: Software Engineer,       │
     │   MENA region, score: 42           │
     └──────────────┬─────────────────────┘
                    │
                    ▼
     ┌────────────────────────────────────┐
     │ 4. VIEW RESULTS DASHBOARD         │
     │ • Overall Score: 42/100            │
     │   → "Developing" level             │
     │ • Competency Breakdown:            │
     │   - Tech Foundation: 38/100        │
     │   - Languages: 65/100              │
     │   - DevOps Tools: 12/100           │
     │   - Testing: 45/100                │
     │   - ...                             │
     │ • Skill Ranking (sorted by level)  │
     │ • Gap Analysis (top 5 gaps)        │
     │ • Roadmap Actions:                 │
     │   - Immediate: "Learn Git & CI/CD" │
     │   - Intermediate: "Master Testing" │
     │   - Long-term: "System Design"     │
     └──────────────┬─────────────────────┘
                    │
                    ▼
     ┌────────────────────────────────────┐
     │ 5. DECISION POINT                  │
     │ • "Start Free Assessment"          │
     │   → Begin 5-step wizard            │
     │ • "Learn More"                     │
     │   → Scroll to How It Works section │
     │ • "Share this result" (Phase 2)    │
     │   → Copy link / LinkedIn share      │
     └──────────────┬─────────────────────┘
                    │
          ┌─────────┴─────────┐
          │                   │
          ▼                   ▼
   ┌──────────────┐   ┌──────────────────┐
   │ 6A. START    │   │ 6B. CONTINUE     │
   │    ASSESSMENT│   │    BROWSING      │
   │    WIZARD    │   │                  │
   └──────┬───────┘   └──────────────────┘
          │
          ▼
   ┌────────────────────────────────────┐
   │ 7. COMPLETE 5-STEP ASSESSMENT      │
   │ • Step 1: Profile (role, exp,      │
   │   region)                          │
   │ • Step 2: Goal (target role)       │
   │ • Step 3: Self-Rate 38 skills      │
   │ • Step 4: AI Skill Analysis         │
   │   (describe experience for rated   │
   │    skills → GPT-4o infers levels)  │
   │ • Step 5: Review & Submit          │
   └──────────────┬─────────────────────┘
                  │
                  ▼
   ┌────────────────────────────────────┐
   │ 8. VIEW PERSONALIZED RESULTS       │
   │ • Overall Score (based on their    │
   │   self-assessment + AI inference)  │
   │ • Competency Breakdown (their      │
   │   actual skill levels)             │
   │ • Strengths (what they're good at) │
   │ • Gaps (what to improve)           │
   │ • Roadmap Actions (personalized    │
   │   learning path)                   │
   └──────────────┬─────────────────────┘
                  │
                  ▼
   ┌────────────────────────────────────┐
   │ 9. POST-ASSESSMENT ACTIONS         │
   │ • Save result (localStorage)       │
   │ • Bookmark roadmap actions         │
   │ • Return later to track progress   │
   │   (Phase 2: user account + history)│
   │ • Share result (Phase 2)           │
   │ • Book mock interview (Phase 2)    │
   └────────────────────────────────────┘
```

### 5.2 Journey: Real-Time Interview Practice

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    USER JOURNEY: REAL-TIME INTERVIEW                        │
│                          (Option 2/3 — Built)                               │
└─────────────────────────────────────────────────────────────────────────────┘

     ┌──────────┐
     │ 1. NAVIGATE│
     │  to Real-  │
     │  Time      │
     │  Interview │
     │  page      │
     └──────┬─────┘
            │
            ▼
     ┌────────────────────────────────────┐
     │ 2. SELECT TARGET ROLE              │
     │ • Choose role (e.g., Software      │
     │   Engineer, Frontend, Backend)     │
     │ • Select track (optional)          │
     │ • Select years of experience       │
     └──────────────┬─────────────────────┘
                    │
                    ▼
     ┌────────────────────────────────────┐
     │ 3. CLICK "START INTERVIEW"         │
     │ • Opens 8-step wizard              │
     │ • Initiates WebSocket connection   │
     └──────────────┬─────────────────────┘
                    │
                    ▼
     ┌────────────────────────────────────┐
     │ 4. STEP 1-2: CONTEXT &             │
     │    INSTRUCTION                      │
     │ • Avatar: "Tell me about yourself" │
     │ • User provides context            │
     │ • User clicks "I'm ready"          │
     └──────────────┬─────────────────────┘
                    │
                    ▼
     ┌────────────────────────────────────┐
     │ 5. STEP 3-4: AVATAR QUESTION +     │
     │    VIDEO RECORDING                 │
     │ • Avatar displays question + TTS   │
     │ • User clicks "Start Recording"    │
     │ • MediaRecorder captures video     │
     │ • User answers question            │
     │ • User clicks "Stop Recording"     │
     │ • Video uploaded for analysis      │
     └──────────────┬─────────────────────┘
                    │
                    ▼
     ┌────────────────────────────────────┐
     │ 6. STEP 5-6: VOICE + FACIAL        │
     │    ANALYSIS                        │
     │ • UI shows "Analyzing..." loading  │
     │ • Voice analysis: tone, pacing,    │
     │   emotion, clarity, engagement,    │
     │   filler words                     │
     │ • Facial analysis: eye contact,    │
     │   engagement, confidence, stress,  │
     │   expressiveness, smile warmth     │
     │ • 6 simulated frames analyzed      │
     └──────────────┬─────────────────────┘
                    │
                    ▼
     ┌────────────────────────────────────┐
     │ 7. STEP 7: RESULTS FUSION          │
     │ • Voice + Facial + Self-           │
     │   Assessment merged                │
     │ • Weighted scoring:                │
     │   voice 30%, facial 20%,           │
     │   self 25%, content 25%            │
     │ • Overall score + dimension        │
     │   breakdown                        │
     └──────────────┬─────────────────────┘
                    │
                    ▼
     ┌────────────────────────────────────┐
     │ 8. STEP 8: FEEDBACK +              │
     │    FOLLOW-UP                        │
     │ • Avatar delivers feedback:        │
     │   "Your voice was confident (80/100)│
     │   Your eye contact was strong      │
     │   (85/100)                         │
     │   One area to improve: filler      │
     │   words (60/100)                   │
     │ • User clicks "Continue"           │
     │ • Avatar asks follow-up question   │
     │ • Repeat video → analysis →        │
     │   feedback loop                    │
     └──────────────┬─────────────────────┘
                    │
                    ▼
     ┌────────────────────────────────────┐
     │ 9. INTERVIEW COMPLETE              │
     │ • Final dashboard:                 │
     │   - Overall Score: 72/100          │
     │   - Voice Score: 75/100            │
     │   - Facial Score: 78/100           │
     │   - Self Assessment: 42/100        │
     │   - Composite Score: 60/100        │
     │   - Dimension Scores:              │
     │     * Confidence: 80               │
     │     * Clarity: 70                  │
     │     * Eye Contact: 85              │
     │     * ...                          │
     │   - Avatar Messages (history)      │
     │   - Strengths: "Strong eye         │
     │     contact, confident tone"       │
     │   - Gaps: "Filler words, stress   │
     │     management"                    │
     │   - Next Steps: "Practice         │
     │     structured responses, reduce  │
     │     filler words"                  │
     │ • Persist to localStorage          │
     └────────────────────────────────────┘
```

---

*End of Data Flow Diagrams & Workflows v2.0*
