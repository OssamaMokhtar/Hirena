# Hirena — API Reference

**Version:** 2.0  
**Last Updated:** September 12, 2026  
**Base URL:** `https://hirena-seven.vercel.app/api` (or local: `http://localhost:3000/api`)  

---

## Overview

Hirena's API is built on Next.js App Router with serverless API routes. All endpoints are prefixed with `/api/`.

**Authentication:** None required for MVP (demo mode). Future: Supabase auth JWT for protected routes.

**Content Type:** `application/json`

**Response Format:**
```typescript
// Success
{ success: true, data: <response_data> }

// Error
{ success: false, error: "<error_message>" }
```

---

## API Endpoints

### 1. Environment Verification

#### GET /api/verify-env

Verifies that the OpenAI API key is loaded in the server environment.

**Request:** None

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "hasKey": true,
    "keyPrefix": "sk-proj-...",
    "message": "OpenAI API key is configured"
  }
}
```

**Example:**
```bash
curl http://localhost:3000/api/verify-env
```

**Use Case:** Health check to verify API configuration before making AI calls.

---

### 2. Assessment Submission

#### POST /api/assess

Submits a skill assessment for scoring. Accepts self-assessment ratings + optional AI inference inputs.

**Request Body:**
```typescript
interface AssessmentRequest {
  targetRole: string;           // Role ID (e.g., "software-engineer", "product-manager")
  targetTrack?: string | null;  // Optional specialization track
  region: string;               // Region code: "mena", "apac", "na", "emea"
  selfAssessment: Record<string, number>; // skillId → level (0-7)
  aiInferenceInputs?: Array<{
    skillId: string;
    description: string;       // User's experience description
  }>;
}
```

**Example Request:**
```json
{
  "targetRole": "software-engineer",
  "targetTrack": null,
  "region": "mena",
  "selfAssessment": {
    "programming-languages": 5,
    "frontend-fundamentals": 4,
    "testing": 3,
    "devops-tools": 1
  },
  "aiInferenceInputs": [
    {
      "skillId": "programming-languages",
      "description": "5 years experience with TypeScript, JavaScript, Python. Built multiple full-stack applications."
    }
  ]
}
```

**Processing:**
1. Validate input (targetRole exists in ROLE_COMPETENCY_MODELS)
2. If `aiInferenceInputs` present and non-empty:
   - Call `inferAllSkills()` → GPT-4o analyzes each description
   - Returns: `{ skillId: { level, confidence, reasoning } }`
3. Pass input + AI inference results to `computeAssessmentResult()`
4. Scoring engine computes:
   - Per-skill final levels (AI-inferred or self-rated)
   - Per-pillar weighted averages
   - Overall score (weighted average of pillars)
   - Strengths (level ≥ 5), gaps (level < 3), missing skills (not rated)
   - Roadmap actions based on gaps

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "overallScore": 42,
    "competencyScores": {
      "tech-foundation": { "average": 45, "skills": [...] },
      "programming-languages": { "average": 60, "skills": [...] },
      "devops-tools": { "average": 15, "skills": [...] }
    },
    "skillRanking": [
      {
        "id": "programming-languages",
        "name": "Programming Languages",
        "selfLevel": 5,
        "aiLevel": 6,
        "finalLevel": 6,
        "isAiInferred": true,
        "category": "programming-languages",
        "description": "..."
      }
    ],
    "strengths": ["programming-languages"],
    "gaps": [
      {
        "id": "devops-tools",
        "name": "DevOps Tools",
        "currentLevel": 1,
        "targetLevel": 5,
        "gapSize": 4,
        "priority": 85,
        "why": "DevOps tools are critical for modern software engineering roles in MENA"
      }
    ],
    "missingSkills": ["security", "performance"],
    "roadmap": {
      "immediate": [
        {
          "title": "Learn Git and Version Control",
          "description": "Master Git for version control, branching strategies, and collaborative workflows.",
          "suggestedResources": [
            { "title": "Git & GitHub Crash Course", "type": "video", "url": "...", "estimatedTime": "2 hours" }
          ],
          "estimatedTime": "2-4 weeks"
        }
      ],
      "intermediate": [...],
      "longTerm": [...]
    },
    "aiInferenceNotes": "AI inferred higher proficiency in programming languages based on your experience description.",
    "createdAt": "2026-09-12T10:00:00Z",
    "completedAt": "2026-09-12T10:00:05Z"
  }
}
```

**Error Responses:**
- `400 Bad Request`: `{ "success": false, "error": "Invalid targetRole: unknown-role" }`
- `500 Internal Server Error`: `{ "success": false, "error": "Failed to compute assessment result" }`

**Use Case:** Main assessment submission endpoint. Used by assessment wizard Step 5 (Review & Submit).

---

### 3. Voice Analysis

#### POST /api/voice/analyze

Analyzes voice from transcription + duration. Returns voice quality dimensions.

**Request Body:**
```typescript
interface VoiceAnalysisRequest {
  targetRole: string;           // Role ID (for context)
  transcription: string;       // Transcribed speech text
  duration: number;            // Duration in seconds
}
```

**Example Request:**
```json
{
  "targetRole": "software-engineer",
  "transcription": "I have 5 years of experience building full-stack applications with TypeScript and Node.js. I've worked on several large-scale projects...",
  "duration": 120
}
```

**Processing:**
1. Analyze transcription for:
   - **Confidence:** Language use, specific examples, fluency
   - **Clarity:** Articulation, structure, coherence
   - **Pacing:** Speech rate, appropriate pauses
   - **Emotion:** Enthusiasm, engagement, tone
   - **Engagement:** Responsiveness, elaboration
   - **Filler Words:** Frequency of "um", "uh", "like", "you know"
2. Return simulated analysis (Phase 1 — simulated)
3. Phase 2: Use Deepgram/AssemblyAI for real analysis

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "overallQuality": 75,
    "dimensions": {
      "confidence": 80,
      "clarity": 70,
      "pacing": 75,
      "emotion": 85,
      "engagement": 72,
      "fillerWords": 60    // Lower = better (fewer filler words)
    },
    "notes": [
      "Strong use of specific technical examples",
      "Good pacing with appropriate pauses",
      "Occasional filler words — practice pacing"
    ]
  }
}
```

**Error Responses:**
- `400 Bad Request`: `{ "success": false, "error": "Transcription is required" }`
- `500 Internal Server Error`: `{ "success": false, "error": "Voice analysis failed" }`

**Use Case:** Called during real-time interview after video capture. Part of multi-modal analysis pipeline.

---

### 4. Facial Analysis

#### POST /api/facial/analyze

Analyzes facial expressions from video frames. Returns engagement + emotion dimensions.

**Request Body:**
```typescript
interface FacialAnalysisRequest {
  targetRole: string;           // Role ID (for context)
  duration: number;            // Duration in seconds
}
```

**Example Request:**
```json
{
  "targetRole": "software-engineer",
  "duration": 120
}
```

**Processing:**
1. Generate simulated frames (6 frames at 20-second intervals)
2. For each frame, simulate:
   - **Emotion:** neutral, happy, engaged, thoughtful, surprised
   - **Eye Contact:** 0-100
   - **Facial Expression:** neutral, smile, thoughtful, engaged
   - **Head Pose:** forward, slight-left, slight-right, up, down
3. Compute overall engagement + per-dimension averages
4. Phase 2: Use AWS Rekognition or DeepFace for real analysis

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "overallEngagement": 78,
    "dimensions": {
      "eyeContact": 85,
      "engagement": 75,
      "confidence": 80,
      "stress": 30,          // Lower = better (less stress detected)
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
      }
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

**Error Responses:**
- `400 Bad Request`: `{ "success": false, "error": "Duration must be a positive number" }`
- `500 Internal Server Error`: `{ "success": false, "error": "Facial analysis failed" }`

**Use Case:** Called during real-time interview after video capture. Part of multi-modal analysis pipeline.

**Note:** Facial analysis is optional/experimental with disclaimer. See docs/impact-analysis.md for compliance considerations.

---

### 5. Results Fusion

#### POST /api/fusion/result

Fuses voice + facial + self-assessment signals into overall interview score.

**Request Body:**
```typescript
interface FusionRequest {
  targetRole: string;
  voiceAnalysis: {
    overallQuality: number;
    dimensions: {
      confidence: number;
      clarity: number;
      pacing: number;
      emotion: number;
      engagement: number;
      fillerWords: number;
    };
  };
  facialAnalysis: {
    overallEngagement: number;
    dimensions: {
      eyeContact: number;
      engagement: number;
      confidence: number;
      stress: number;
      expressiveness: number;
      smileWarmth: number;
    };
  };
  selfAssessment: Record<string, number>; // skillId → level (0-7)
}
```

**Example Request:**
```json
{
  "targetRole": "software-engineer",
  "voiceAnalysis": {
    "overallQuality": 75,
    "dimensions": { "confidence": 80, "clarity": 70, "pacing": 75, "emotion": 85, "engagement": 72, "fillerWords": 60 }
  },
  "facialAnalysis": {
    "overallEngagement": 78,
    "dimensions": { "eyeContact": 85, "engagement": 75, "confidence": 80, "stress": 30, "expressiveness": 72, "smileWarmth": 78 }
  },
  "selfAssessment": {
    "programming-languages": 5,
    "frontend-fundamentals": 4
  }
}
```

**Processing:**
1. Compute weighted scores:
   - `voiceScore = voiceAnalysis.overallQuality × 0.30`
   - `facialScore = facialAnalysis.overallEngagement × 0.20`
   - `selfAssessmentScore = average(selfAssessment values) × 0.25`
   - `contentScore = average(voice + facial dimensions related to content/communication) × 0.25`
2. `overallScore = voiceScore + facialScore + selfAssessmentScore + contentScore`
3. Dimension breakdown: voice, facial, selfAssessment, content (each with sub-dimensions)
4. Identify strengths (dimensions ≥ 70), gaps (dimensions < 50)
5. Generate recommendations based on gaps

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "overallScore": 72,
    "scores": {
      "voice": 75,
      "facial": 78,
      "selfAssessment": 42,
      "content": 68
    },
    "dimensionBreakdown": {
      "voice": {
        "confidence": 80,
        "clarity": 70,
        "pacing": 75,
        "emotion": 85,
        "engagement": 72,
        "fillerWords": 60
      },
      "facial": {
        "eyeContact": 85,
        "engagement": 75,
        "confidence": 80,
        "stress": 30,
        "expressiveness": 72,
        "smileWarmth": 78
      },
      "selfAssessment": {
        "programming-languages": 5,
        "frontend-fundamentals": 4
      },
      "content": {
        "technicalDepth": 70,
        "communicationClarity": 65,
        "exampleUse": 75,
        "structure": 68
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

**Error Responses:**
- `400 Bad Request`: `{ "success": false, "error": "Voice analysis is required" }`
- `500 Internal Server Error`: `{ "success": false, "error": "Fusion failed" }`

**Use Case:** Called after voice + facial analysis complete. Produces final interview score + recommendations.

---

### 6. Interview Session (WebSocket)

#### WebSocket /api/interview/session

Manages real-time interview session with 8-step flow. Uses WebSocket for bidirectional communication.

**Connection:**
```javascript
const ws = new WebSocket('ws://localhost:3000/api/interview/session');
```

**Client → Server Messages (WSClientMessage):**

```typescript
type WSClientMessage =
  | { type: 'context'; targetRole: string; targetTrack?: string | null; yearsExperience: string }
  | { type: 'instruction'; ready: boolean }
  | { type: 'video'; videoData: Blob; duration: number }
  | { type: 'continue' }
  | { type: 'end' };
```

**Server → Client Messages (WSServerMessage):**

```typescript
type WSServerMessage =
  | { type: 'context' }
  | { type: 'instruction'; message: string }
  | { type: 'avatar-question'; message: string; questionNumber: number }
  | { type: 'analyzing' }
  | { type: 'feedback'; feedback: Array<{
      type: 'voice' | 'facial' | 'fusion';
      score: number;
      dimensions?: Record<string, number>;
      strengths?: string[];
      gaps?: string[];
    }> }
  | { type: 'interview-complete'; result: InterviewFinalResult };
```

**Session Flow:**

1. **Connect** → Server creates session, sends `{ type: 'context' }`
2. **Client sends context** → `{ type: 'context', targetRole, targetTrack, yearsExperience }`
3. **Server stores context** → Sends `{ type: 'instruction', message: 'Tell me about yourself...' }`
4. **Client clicks ready** → Sends `{ type: 'instruction', ready: true }`
5. **Server generates avatar question** → Sends `{ type: 'avatar-question', message, questionNumber: 1 }`
6. **Avatar displays question + TTS** → User records video
7. **Client sends video** → `{ type: 'video', videoData, duration }`
8. **Server stores video** → Sends `{ type: 'analyzing' }` (UI shows loading)
9. **Server calls voice/analyze** → Stores result
10. **Server calls facial/analyze** → Stores result
11. **Server calls fusion/result** → Stores result
12. **Server sends feedback** → `{ type: 'feedback', feedback: [...] }`
13. **Client views feedback** → Clicks "Continue"
14. **Server generates follow-up** → Loops to step 5 (next question)
15. **After max questions or user ends** → `{ type: 'interview-complete', result }`

**InterviewFinalResult:**
```typescript
interface InterviewFinalResult {
  finalScore: number;              // 0-100 overall
  voiceScore: number;             // 0-100
  facialScore: number;            // 0-100
  selfAssessmentScore: number;    // 0-100
  compositeScore: number;         // Weighted composite
  dimensionScores: Record<string, number>; // Per-dimension scores
  avatarMessages: Array<{ role: 'avatar' | 'user'; content: string; timestamp: number }>;
  recommendation: string;
  nextSteps: string[];
  competencyBreakdown: Array<{
    competency: string;
    level: number;
    gaps: string[];
  }>;
}
```

**Error Handling:**
- Connection drop → Client should reconnect + resume (if session still active)
- Session timeout → Server cleans up session after 30 minutes of inactivity
- Analysis failure → Server sends error message, client can retry or skip

**Use Case:** Real-time interview practice with avatar mentor. 8-step flow: greeting → context → instruction → avatar question → record video → voice analysis → facial analysis → feedback → follow-up → complete.

---

## API Versioning

**Current Version:** v1 (implicit)

**Versioning Strategy:**
- URL path versioning (`/api/v1/assess`) not implemented yet
- Current: implicit versioning via deployment (all endpoints at `/api/*`)
- Future: Add `/api/v2/` when breaking changes needed

---

## Rate Limiting

**Current State:** No rate limiting implemented.

**Recommended Limits (Phase 1-2):**
- `/api/assess`: 10 requests/minute per IP (prevents abuse + manages OpenAI costs)
- `/api/voice/analyze`: 5 requests/minute per IP
- `/api/facial/analyze`: 5 requests/minute per IP
- `/api/fusion/result`: 5 requests/minute per IP
- `/api/interview/session`: 3 concurrent sessions per IP

**Implementation:** Vercel middleware + Upstash Redis (or in-memory for MVP).

---

## Error Codes

| HTTP Status | Error Code | Description |
|-------------|------------|-------------|
| 400 | INVALID_INPUT | Request body validation failed |
| 400 | INVALID_ROLE | targetRole not found in competency models |
| 401 | UNAUTHORIZED | Authentication required (future) |
| 429 | RATE_LIMITED | Too many requests (future) |
| 500 | INTERNAL_ERROR | Server error during processing |
| 502 | AI_SERVICE_ERROR | OpenAI or external AI service error |
| 503 | SERVICE_UNAVAILABLE | Service temporarily unavailable |

---

## Deprecated Endpoints

None currently.

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| v1.0 | Sep 10, 2026 | Initial API release: verify-env, assess, voice/analyze, facial/analyze, fusion/result, interview/session |
| v1.1 | Sep 12, 2026 | Documented all endpoints with request/response examples |

---

*End of API Reference v2.0*
