import { NextRequest, NextResponse } from "next/server";
import type {
  WSServerMessage,
  InterviewSessionState,
  InterviewSessionConfig,
  InterviewQuestion,
  QuestionAnalysisResult,
  InterviewFinalResult,
  AvatarStyle,
} from "@/lib/real-time-interview";

// WebSocket upgrade handler for real-time interview sessions (Option 3)
// This is a placeholder — in production, this would be a proper WebSocket
// server (e.g., via Socket.io, ws, or Next.js experimental WebSocket).
//
// For now, we provide REST endpoints that simulate the WebSocket flow:
// - POST /api/interview/session/start — starts a session, returns questions
// - POST /api/interview/session/analyze — analyzes a single response (real-time simulation)
// - POST /api/interview/session/complete — finalizes and returns aggregated results

// Simulated session store (in production, use Redis / database)
const sessions = new Map<string, {
  sessionId: string;
  candidateId: string;
  role: string;
  language: "en" | "ar";
  state: InterviewSessionState;
  questions: InterviewQuestion[];
  currentQuestionIndex: number;
  answers: (QuestionAnalysisResult | undefined)[];
  startTime: number;
  config: InterviewSessionConfig;
}>();

// Interview questions by role (shared with interview-wizard.tsx)
const QUESTIONS_BY_ROLE: Record<string, string[]> = {
  "software-engineer": [
    "Tell me about a challenging technical problem you solved. What was the problem, how did you approach it, and what was the outcome?",
    "Describe a time when you had to make a trade-off between code quality and delivery speed. How did you decide?",
    "How do you approach designing a new feature from scratch? Walk me through your process.",
    "Tell me about a bug that was particularly difficult to track down. How did you find the root cause?",
    "Describe a situation where you had to learn a new technology quickly to complete a project.",
  ],
  "full-stack-engineer": [
    "Walk me through a full-stack feature you built from frontend to backend. What were the key decisions?",
    "Describe a time when you had to optimize the performance of a web application. What did you do?",
    "How do you approach API design? What makes a good API?",
    "Tell me about a deployment issue you faced and how you resolved it.",
    "Describe your approach to testing a full-stack application.",
  ],
  "frontend-engineer": [
    "Tell me about a complex UI component you built. What were the challenges?",
    "How do you approach making a web application accessible? Give specific examples.",
    "Describe a performance issue you identified and fixed in a frontend application.",
    "Tell me about a time you had to work closely with designers to implement a design system.",
    "How do you manage state in a complex React application?",
  ],
  "backend-engineer": [
    "Describe a complex API you designed and built. What were the key design decisions?",
    "Tell me about a database performance issue you solved. How did you identify and fix it?",
    "How do you approach security in your backend services? Give specific examples.",
    "Describe a situation where you had to scale a backend service. What did you do?",
    "Tell me about a messaging or event-driven system you implemented.",
  ],
  "qa-engineer": [
    "Describe your approach to testing a new feature from requirements to release.",
    "Tell me about a particularly tricky bug you found. How did you discover it?",
    "How do you decide what to automate vs what to test manually?",
    "Describe a time when you improved the quality of a product through your testing efforts.",
    "Tell me about a situation where you had to advocate for quality with developers or stakeholders.",
  ],
  "data-analyst": [
    "Describe a data analysis project that had a significant business impact. What was your approach?",
    "Tell me about a time when you had to work with messy or incomplete data. How did you handle it?",
    "How do you decide which visualization to use for a particular dataset?",
    "Describe a situation where your analysis changed a business decision.",
    "Tell me about a time you had to explain complex data findings to a non-technical audience.",
  ],
  "devops-engineer": [
    "Describe a CI/CD pipeline you designed or significantly improved. What were the key features?",
    "Tell me about a production incident you handled. What went wrong and how did you resolve it?",
    "How do you approach infrastructure as code? Describe your experience with Terraform or similar.",
    "Describe a situation where you had to balance developer velocity with infrastructure stability.",
    "Tell me about your experience with container orchestration at scale.",
  ],
  "business-analyst": [
    "Describe a complex requirement you had to elicit from stakeholders. How did you approach it?",
    "Tell me about a time when you had to say 'no' to a stakeholder request. How did you handle it?",
    "Describe your approach to documenting requirements. What makes good documentation?",
    "Tell me about a situation where you identified a process improvement that saved time or money.",
    "How do you handle conflicting requirements from different stakeholders?",
  ],
  "software-architect": [
    "Describe a system architecture you designed from scratch. What were the key trade-offs?",
    "Tell me about a time when you had to choose between multiple technology options. How did you decide?",
    "How do you approach scalability in your designs? Give a specific example.",
    "Describe a situation where you had to convince stakeholders to adopt a technically superior but riskier approach.",
    "Tell me about a time when an architecture decision you made had to be reversed. What did you learn?",
  ],
  "engineering-manager": [
    "Describe your approach to building and developing a high-performing engineering team.",
    "Tell me about a time when you had to manage a underperforming team member. How did you handle it?",
    "How do you balance technical direction with people management in your role?",
    "Describe a situation where you had to make a hiring decision with limited information.",
    "Tell me about a time when you had to communicate a difficult technical decision to non-technical stakeholders.",
  ],
  "tech-lead": [
    "Describe your approach to technical leadership within a team. How do you influence without authority?",
    "Tell me about a time when you had to make a critical technical decision with incomplete information.",
    "How do you ensure code quality and best practices across your team?",
    "Describe a situation where you had to mentor a junior engineer to help them grow.",
    "Tell me about a time when you had to push back on a product requirement for technical reasons.",
  ],
  "product-manager": [
    "Describe a product you launched or significantly improved. What was your role and what was the impact?",
    "Tell me about a time when you had to say no to a feature request. How did you handle it?",
    "How do you prioritize your roadmap when everything feels urgent?",
    "Describe a situation where user research completely changed your product direction.",
    "Tell me about a time when a product launch didn't go as planned. What did you learn?",
  ],
  "scrum-master": [
    "Describe your approach to facilitating effective sprint ceremonies.",
    "Tell me about a time when a team was struggling with agile practices. How did you help them improve?",
    "How do you handle a team that consistently fails to meet sprint commitments?",
    "Describe a situation where you had to remove a significant impediment for your team.",
    "Tell me about a time when you had to coach a team member on agile principles.",
  ],
  "data-engineer": [
    "Describe a data pipeline you built or significantly improved. What were the key design decisions?",
    "Tell me about a time when you had to handle a data quality issue at scale. How did you resolve it?",
    "How do you approach data modeling for a new analytics platform?",
    "Describe a situation where you had to choose between batch and streaming processing.",
    "Tell me about a time when a data pipeline failure impacted downstream systems. How did you handle it?",
  ],
  "ml-engineer": [
    "Describe a machine learning model you deployed to production. What were the key challenges?",
    "Tell me about a time when model performance degraded in production. How did you diagnose and fix it?",
    "How do you approach feature engineering for a new ML problem?",
    "Describe a situation where you had to balance model complexity with production constraints.",
    "Tell me about a time when you had to explain model predictions to non-technical stakeholders.",
  ],
  "uxui-designer": [
    "Describe a design project where your work had a measurable impact on user behavior or business metrics.",
    "Tell me about a time when user testing revealed a major flaw in your design. How did you respond?",
    "How do you approach designing for accessibility? Give specific examples.",
    "Describe a situation where you had to defend a design decision against stakeholder pushback.",
    "Tell me about a time when you had to design under significant constraints. How did you work within them?",
  ],
  "tester": [
    "Describe your approach to testing a new feature from requirements to release.",
    "Tell me about a particularly tricky defect you found. How did you discover it?",
    "How do you decide what to test manually vs what to explore with automation?",
    "Describe a time when you improved the quality of a release through your testing efforts.",
    "Tell me about a situation where you had to communicate a critical defect to developers or stakeholders.",
  ],
};

// Generate questions for a role
function generateQuestions(role: string): InterviewQuestion[] {
  const questionTexts = QUESTIONS_BY_ROLE[role] || QUESTIONS_BY_ROLE["software-engineer"];
  return questionTexts.map((text: string, index: number) => ({
    index,
    text,
    category: ["technical", "behavioral", "situational", "technical", "behavioral"][index % 5],
    difficulty: 2 + (index % 3),
    expectedDuration: 30 + index * 10, // 30-70 seconds expected
    followUps: [
      `Can you tell me more about that?`,
      `What would you do differently now?`,
      `How did that impact the team?`,
      `What was the biggest challenge in that?`,
    ],
    rubric: [
      {
        dimension: "technicalAccuracy",
        description: "Accuracy and correctness of technical content",
        weight: 0.3,
        lookFor: ["correct terminology", "accurate facts", "relevant examples"],
        watchFor: ["misinformation", "vague claims", "irrelevant details"],
      },
      {
        dimension: "communicationClarity",
        description: "How clearly the answer is articulated",
        weight: 0.2,
        lookFor: ["structured response", "clear examples", "logical flow"],
        watchFor: ["rambling", "unclear", "jumping between topics"],
      },
      {
        dimension: "depthOfKnowledge",
        description: "Depth of understanding beyond surface level",
        weight: 0.25,
        lookFor: ["underlying principles", "trade-off discussion", "edge cases"],
        watchFor: ["surface-level only", "memorized answers", "no depth"],
      },
      {
        dimension: "problemSolvingApproach",
        description: "Structured thinking and problem-solving method",
        weight: 0.25,
        lookFor: ["step-by-step reasoning", "hypothesis testing", "iterative approach"],
        watchFor: ["guessing", "no structure", "giving up quickly"],
      },
    ],
  }));
}

// Start a new interview session
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { candidateId, role, language = "en", avatarStyle = "css-animated" as const } = body;

    if (!candidateId || !role) {
      return NextResponse.json({ error: "candidateId and role are required" }, { status: 400 });
    }

    const sessionId = `session_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const questions = generateQuestions(role);
    const startTime = Date.now();

    const session = {
      sessionId,
      candidateId: candidateId as string,
      role: role as string,
      language: language as "en" | "ar",
      state: "ready" as InterviewSessionState,
      questions,
      currentQuestionIndex: 0,
      answers: [] as (QuestionAnalysisResult | undefined)[],
      startTime,
      config: {
        role: role as string,
        language: language as "en" | "ar",
        avatarStyle: avatarStyle as AvatarStyle,
        avatarConfig: {
          style: avatarStyle as AvatarStyle,
          voiceProvider: "browser-speech",
          lipSyncMode: "waveform",
          showBackground: true,
          backgroundColor: "#f8fafc",
        },
        analysisConfig: {
          voiceProvider: "openai-whisper",
          facialProvider: "openai-vision",
          contentProvider: "openai-gpt4",
          analysisMode: "batched",
          frameRate: 1,
          audioChunkSize: 5000,
          livenessCheck: false,
        },
        questions: questions,
        timeLimit: 900,
        questionTimeLimit: 120,
        allowSkip: true,
        showLiveFeedback: true,
        recordingConsent: true,
      } as InterviewSessionConfig,
    };

    sessions.set(sessionId, session);

    const serverMessage: WSServerMessage = {
      type: "session-ready",
      sessionId,
      role,
      questions: questions.map((q) => q.text),
      avatarStyle,
    };

    return NextResponse.json({
      success: true,
      session,
      message: serverMessage,
    });
  } catch (error) {
    console.error("Session start error:", error);
    return NextResponse.json(
      { error: "Failed to start session", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// Analyze a single question response (simulates real-time WebSocket analysis)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, questionIndex, transcription, duration, videoBlob, audioBlob, role, targetRole } = body;

    if (!sessionId || questionIndex === undefined || !transcription) {
      return NextResponse.json({ error: "sessionId, questionIndex, and transcription are required" }, { status: 400 });
    }

    const session = sessions.get(sessionId);
    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    const effectiveRole = targetRole || session.role;

    // Simulate real-time analysis (in production, this would stream analysis
    // results as they come in from voice/facial/content services)
    const analysisResult: QuestionAnalysisResult = {
      questionIndex,
      question: session.questions[questionIndex]?.text || "",
      voice: {
        confidence: Math.round(3 + Math.random() * 1.5 * 10) / 10,
        clarity: Math.round(3 + Math.random() * 1.5 * 10) / 10,
        pacing: Math.round(3 + Math.random() * 1.5 * 10) / 10,
        enthusiasm: Math.round(2.5 + Math.random() * 2 * 10) / 10,
        fillerWords: Math.round(3 + Math.random() * 1.5 * 10) / 10,
        speakingRateWpm: Math.round(100 + Math.random() * 60),
        transcript: transcription.slice(0, 100) + (transcription.length > 100 ? "..." : ""),
      },
      facial: {
        eyeContact: Math.round((0.5 + Math.random() * 0.4) * 10) / 10,
        engagement: Math.round((0.5 + Math.random() * 0.4) * 10) / 10,
        confidence: Math.round((0.5 + Math.random() * 0.4) * 10) / 10,
        expressiveness: Math.round((0.3 + Math.random() * 0.5) * 10) / 10,
        dominantEmotion: ["neutral", "focused", "happy", "confused"][Math.floor(Math.random() * 4)],
        emotionTimeline: [
          { timestamp: 0, emotion: "neutral", confidence: 0.8 },
          { timestamp: Math.floor(duration / 2), emotion: "focused", confidence: 0.7 },
          { timestamp: duration - 1, emotion: "neutral", confidence: 0.75 },
        ],
      },
      content: {
        technicalAccuracy: Math.round(2.5 + Math.random() * 2 * 10) / 10,
        depthOfKnowledge: Math.round(2 + Math.random() * 2.5 * 10) / 10,
        communicationClarity: Math.round(2.5 + Math.random() * 2 * 10) / 10,
        relevance: Math.round(3 + Math.random() * 1.5 * 10) / 10,
        transcript: transcription.slice(0, 150) + (transcription.length > 150 ? "..." : ""),
        keyPoints: extractKeyPoints(transcription),
        missingPoints: [],
      },
      combinedScore: 0, // Computed below
      suggestedFollowUp: session.questions[questionIndex]?.followUps?.[0] || undefined,
    };

    // Compute combined score from dimensions
    const contentScore = (analysisResult.content.technicalAccuracy + analysisResult.content.depthOfKnowledge + analysisResult.content.communicationClarity) / 3;
    const voiceScore = (analysisResult.voice.confidence + analysisResult.voice.clarity + analysisResult.voice.enthusiasm) / 3;
    const facialScore = (analysisResult.facial.eyeContact + analysisResult.facial.engagement + analysisResult.facial.confidence) / 3;
    analysisResult.combinedScore = Math.round((contentScore * 0.5 + voiceScore * 0.25 + facialScore * 0.25) * 10) / 10;

    // Store answer
    session.answers[questionIndex] = analysisResult;
    session.state = "analyzing";

    // Simulate state transition after analysis
    setTimeout(() => {
      session.state = questionIndex < session.questions.length - 1 ? "follow-up" : "completed";
    }, 2000);

    const serverMessage: WSServerMessage = {
      type: "analysis-complete",
      result: analysisResult as QuestionAnalysisResult,
    };

    return NextResponse.json({
      success: true,
      analysis: analysisResult,
      message: serverMessage,
      sessionState: session.state,
    });
  } catch (error) {
    console.error("Session analysis error:", error);
    return NextResponse.json(
      { error: "Analysis failed", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// Complete the interview session and return final aggregated results
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("sessionId");

  if (!sessionId) {
    return NextResponse.json({ error: "sessionId is required" }, { status: 400 });
  }

  const session = sessions.get(sessionId);
  if (!session) {
    return NextResponse.json({ error: "Session not found" }, { status: 404 });
  }

  // Aggregate results across all questions
  const answeredQuestions = session.answers.filter(Boolean);
  const questionResults: QuestionAnalysisResult[] = answeredQuestions;

  // Aggregate voice scores
  const avgVoiceConfidence = questionResults.reduce((sum, r) => sum + r.voice.confidence, 0) / questionResults.length || 0;
  const avgVoiceClarity = questionResults.reduce((sum, r) => sum + r.voice.clarity, 0) / questionResults.length || 0;
  const avgVoicePacing = questionResults.reduce((sum, r) => sum + r.voice.pacing, 0) / questionResults.length || 0;
  const avgVoiceEnthusiasm = questionResults.reduce((sum, r) => sum + r.voice.enthusiasm, 0) / questionResults.length || 0;
  const avgVoiceFiller = questionResults.reduce((sum, r) => sum + r.voice.fillerWords, 0) / questionResults.length || 0;
  const avgSpeakingRate = questionResults.reduce((sum, r) => sum + r.voice.speakingRateWpm, 0) / questionResults.length || 0;

  // Aggregate facial scores
  const avgEyeContact = questionResults.reduce((sum, r) => sum + r.facial.eyeContact, 0) / questionResults.length || 0;
  const avgEngagement = questionResults.reduce((sum, r) => sum + r.facial.engagement, 0) / questionResults.length || 0;
  const avgFacialConfidence = questionResults.reduce((sum, r) => sum + r.facial.confidence, 0) / questionResults.length || 0;
  const avgExpressiveness = questionResults.reduce((sum, r) => sum + r.facial.expressiveness, 0) / questionResults.length || 0;

  // Aggregate content scores
  const avgTechnical = questionResults.reduce((sum, r) => sum + r.content.technicalAccuracy, 0) / questionResults.length || 0;
  const avgDepth = questionResults.reduce((sum, r) => sum + r.content.depthOfKnowledge, 0) / questionResults.length || 0;
  const avgCommunication = questionResults.reduce((sum, r) => sum + r.content.communicationClarity, 0) / questionResults.length || 0;

  // Overall score (weighted)
  const overallScore = Math.round(
    (avgTechnical * 0.35 +
      avgDepth * 0.2 +
      avgCommunication * 0.15 +
      avgVoiceConfidence * 0.1 +
      avgVoiceClarity * 0.1 +
      avgEyeContact * 0.05 +
      avgEngagement * 0.05) * 10
  ) / 10;

  // Collect strengths and gaps from all question analyses
  const allStrengths = new Set<string>();
  const allGaps = new Set<string>();

  // Generate strengths from high scores
  if (avgTechnical >= 3.5) allStrengths.add("Strong technical knowledge — accurate and detailed answers");
  if (avgDepth >= 3.5) allStrengths.add("Deep understanding — goes beyond surface level");
  if (avgCommunication >= 3.5) allStrengths.add("Clear communication — well-structured answers");
  if (avgEyeContact >= 3.5) allStrengths.add("Good eye contact — engaged with the interview");
  if (avgVoiceConfidence >= 3.5) allStrengths.add("Confident speaking style — authoritative tone");
  if (avgVoiceEnthusiasm >= 3.5) allStrengths.add("Enthusiastic — shows energy and interest");
  if (avgSpeakingRate >= 100 && avgSpeakingRate <= 150) allStrengths.add("Good speaking pace — neither too fast nor too slow");

  // Generate gaps from low scores
  if (avgTechnical < 2.5) allGaps.add("Technical accuracy needs improvement — review core concepts");
  if (avgDepth < 2.5) allGaps.add("Depth of knowledge is shallow — explore underlying principles");
  if (avgCommunication < 2.5) allGaps.add("Communication clarity needs work — practice structured answers");
  if (avgEyeContact < 2.5) allGaps.add("Eye contact could improve — maintain camera focus");
  if (avgVoiceConfidence < 2.5) allGaps.add("Speaking confidence — reduce hedging language");
  if (avgSpeakingRate < 80) allGaps.add("Speaking pace is slow — practice fluency");
  if (avgSpeakingRate > 160) allGaps.add("Speaking pace is fast — slow down for clarity");

  // Infer proficiency levels
  const inferredProficiency: Record<string, number> = {
    technicalKnowledge: Math.round(avgTechnical),
    domainExpertise: Math.round(avgDepth),
    communicationSkills: Math.round(avgCommunication),
    problemSolving: Math.round((avgTechnical + avgDepth) / 2),
    presentationalSkills: Math.round(avgVoiceClarity),
    interviewPresence: Math.round(avgEngagement),
    interviewConfidence: Math.round(avgFacialConfidence),
    engagementLevel: Math.round(avgEngagement),
  };

  const finalResult = {
    sessionId: session.sessionId,
    candidateId: session.candidateId,
    role: session.role,
    duration: Math.round((Date.now() - session.startTime) / 1000),
    questionCount: session.questions.length,
    questionsAnswered: answeredQuestions.length,
    questionResults,
    aggregated: {
      voice: {
        confidence: Math.round(avgVoiceConfidence * 10) / 10,
        clarity: Math.round(avgVoiceClarity * 10) / 10,
        pacing: Math.round(avgVoicePacing * 10) / 10,
        enthusiasm: Math.round(avgVoiceEnthusiasm * 10) / 10,
        fillerWordRatio: Math.round(avgVoiceFiller * 10) / 10,
        avgSpeakingRate,
        trend: "stable",
      },
      facial: {
        eyeContact: Math.round(avgEyeContact * 10) / 10,
        engagement: Math.round(avgEngagement * 10) / 10,
        confidence: Math.round(avgFacialConfidence * 10) / 10,
        expressiveness: Math.round(avgExpressiveness * 10) / 10,
        dominantEmotion: "neutral",
        emotionDistribution: {},
        trend: "stable",
      },
      content: {
        technicalAccuracy: Math.round(avgTechnical * 10) / 10,
        depthOfKnowledge: Math.round(avgDepth * 10) / 10,
        communicationClarity: Math.round(avgCommunication * 10) / 10,
        avgAnswerLength: 150,
        trend: "stable",
      },
      overall: overallScore,
    },
    inferredProficiency,
    strengths: Array.from(allStrengths),
    gaps: Array.from(allGaps),
    recommendations: [
      "Continue practicing technical questions to build confidence",
      "Work on structuring answers with clear examples",
      "Maintain eye contact throughout the interview",
      "Aim for a speaking pace between 100-150 WPM",
    ],
    metadata: {
      startTime: session.startTime,
      endTime: Date.now(),
      language: session.language,
      avatarStyle: session.config.avatarStyle,
      avgSpeakingRate,
      avgEyeContact: Math.round(avgEyeContact * 100) / 100,
      emotionDistribution: {},
    },
  };

  const serverMessage: WSServerMessage = {
    type: "interview-complete",
    finalResult,
  };

  // Clean up session
  sessions.delete(sessionId);

  return NextResponse.json({
    success: true,
    finalResult,
    message: serverMessage,
  });
}

/** Extract key points from a transcription (simple keyword-based) */
function extractKeyPoints(transcription: string): string[] {
  const points: string[] = [];
  const lower = transcription.toLowerCase();

  if (lower.includes("i built") || lower.includes("i developed") || lower.includes("i created")) {
    points.push("Candidate described building/creating something");
  }
  if (lower.includes("challenge") || lower.includes("difficult") || lower.includes("hard")) {
    points.push("Candidate discussed challenges faced");
  }
  if (lower.includes("team") || lower.includes("collaborat") || lower.includes("worked with")) {
    points.push("Candidate mentioned collaboration");
  }
  if (lower.includes("result") || lower.includes("outcome") || lower.includes("impact") || lower.includes("success")) {
    points.push("Candidate described outcomes/results");
  }
  if (lower.includes("learn") || lower.includes("growth") || lower.includes("improved")) {
    points.push("Candidate reflected on learning/growth");
  }
  if (lower.includes("why") || lower.includes("because") || lower.includes("reason")) {
    points.push("Candidate explained reasoning");
  }
  if (lower.includes("trade-off") || lower.includes("decision") || lower.includes("chose")) {
    points.push("Candidate discussed trade-offs/decisions");
  }

  return points.length > 0 ? points : ["Candidate provided a response"];
}
