import type { SkillCategory } from "@/types";

// ─── Option 3: Real-Time WebSocket Interview Session ─────────────────────────
// Real-time interview with avatar mentor + continuous multi-modal analysis

// Session state machine for the interview
export type InterviewSessionState =
  | "idle"           // Not started
  | "connecting"     // Establishing WebSocket connection
  | "ready"          // Connected, waiting for candidate to start
  | "avatar-speaking" // Avatar is speaking (TTS streaming)
  | "candidate-speaking" // Candidate is responding (recording)
  | "analyzing"      // Analyzing candidate's response (near-real-time)
  | "feedback"       // Showing analysis feedback to candidate
  | "follow-up"      // Avatar generating follow-up question
  | "completed"      // Interview finished
  | "error";         // Connection or processing error

// WebSocket message types (client ↔ server)
export type WSClientMessage =
  | { type: "join"; sessionId: string; role: string; candidateId: string }
  | { type: "start"; language: "en" | "ar" }
  | { type: "candidate-audio"; chunk: ArrayBuffer; timestamp: number }
  | { type: "candidate-video"; frame: ImageBitmap | Blob; timestamp: number }
  | { type: "candidate-signal"; signal: "speaking-start" | "speaking-end" | "pause" | "resume" }
  | { type: "request-feedback"; questionIndex: number }
  | { type: "skip-question" }
  | { type: "end-interview" }
  | { type: "ping" };

export type WSServerMessage =
  | { type: "session-ready"; sessionId: string; role: string; questions: string[]; avatarStyle: AvatarStyle }
  | { type: "avatar-question"; questionIndex: number; question: string; ttsText: string; audioChunk?: ArrayBuffer }
  | { type: "avatar-speaking"; isSpeaking: boolean; audioStream?: ReadableStream }
  | { type: "prompt-candidate"; message: string }
  | { type: "recording-instruction"; instruction: "start-recording" | "stop-recording" | "review" }
  | { type: "live-feedback"; feedback: LiveFeedback }
  | { type: "analysis-complete"; result: QuestionAnalysisResult }
  | { type: "follow-up-question"; question: string; rationale: string }
  | { type: "interview-complete"; finalResult: InterviewFinalResult }
  | { type: "error"; message: string; code: string }
  | { type: "pong" };

// Avatar rendering styles for real-time
export type AvatarStyle = "css-animated" | "canvas-2d" | "webgl-3d" | "sdk-streamed";

// Live feedback shown to candidate during/after their response
export interface LiveFeedback {
  timestamp: number;
  dimension: string;
  score: number;          // 0-5 current score for this dimension
  trend: "improving" | "stable" | "declining";
  message: string;        // Human-readable feedback
  suggestion?: string;    // Optional suggestion for improvement
}

// Analysis result for a single question (real-time)
export interface QuestionAnalysisResult {
  questionIndex: number;
  question: string;

  // Voice analysis (from audio chunk or full response)
  voice: {
    confidence: number;
    clarity: number;
    pacing: number;
    enthusiasm: number;
    fillerWords: number;
    speakingRateWpm: number;
    transcript?: string;
  };

  // Facial analysis (from video frames during response)
  facial: {
    eyeContact: number;
    engagement: number;
    confidence: number;
    expressiveness: number;
    dominantEmotion: string;
    emotionTimeline: { timestamp: number; emotion: string; confidence: number }[];
  };

  // Content analysis (from transcription)
  content: {
    technicalAccuracy: number;
    depthOfKnowledge: number;
    communicationClarity: number;
    relevance: number;
    transcript?: string;
    keyPoints?: string[];
    missingPoints?: string[];
  };

  // Combined score for this question
  combinedScore: number;

  // Suggested follow-up (if any)
  suggestedFollowUp?: string;
}

// Final interview result (aggregated across all questions)
export interface InterviewFinalResult {
  sessionId: string;
  candidateId: string;
  role: string;
  duration: number;           // total interview duration in seconds
  questionCount: number;
  questionsAnswered: number;

  // Per-question results
  questionResults: QuestionAnalysisResult[];

  // Aggregated scores
  aggregated: {
    voice: VoiceAggregated;
    facial: FacialAggregated;
    content: ContentAggregated;
    overall: number;
  };

  // Inferred proficiency levels
  inferredProficiency: Record<string, number>;

  // Strengths and gaps
  strengths: string[];
  gaps: string[];
  recommendations: string[];

  // Session metadata
  metadata: {
    startTime: number;
    endTime: number;
    language: "en" | "ar";
    avatarStyle: AvatarStyle;
    avgSpeakingRate: number;
    avgEyeContact: number;
    emotionDistribution: Record<string, number>;
  };
}

// Aggregated voice results
export interface VoiceAggregated {
  confidence: number;
  clarity: number;
  pacing: number;
  enthusiasm: number;
  fillerWordRatio: number;
  avgSpeakingRate: number;
  trend: "improving" | "stable" | "declining";
}

// Aggregated facial results
export interface FacialAggregated {
  eyeContact: number;
  engagement: number;
  confidence: number;
  expressiveness: number;
  dominantEmotion: string;
  emotionDistribution: Record<string, number>;
  trend: "improving" | "stable" | "declining";
}

// Aggregated content results
export interface ContentAggregated {
  technicalAccuracy: number;
  depthOfKnowledge: number;
  communicationClarity: number;
  avgAnswerLength: number;    // words per answer
  trend: "improving" | "stable" | "declining";
}

// Avatar rendering configuration
export interface AvatarRenderConfig {
  style: AvatarStyle;
  voiceProvider: "elevenlabs" | "openai-tts" | "browser-speech";
  lipSyncMode: "waveform" | "phoneme" | "none";
  skinTone?: string;
  clothingColor?: string;
  showBackground?: boolean;
  backgroundColor?: string;
}

// Real-time analysis pipeline configuration
export interface RealTimeAnalysisConfig {
  voiceProvider: "deepgram" | "assemblyai" | "openai-whisper" | "local";
  facialProvider: "openai-vision" | "aws-rekognition" | "deepface" | "none";
  contentProvider: "openai-gpt4" | "anthropic-claude" | "local-llm";
  analysisMode: "streaming" | "batched" | "post-interview";
  frameRate: number;           // frames per second to analyze (1-30)
  audioChunkSize: number;     // ms per audio chunk for streaming analysis
  livenessCheck: boolean;     // detect if candidate is reading from script
}

// WebSocket connection state (client-side)
export interface WSConnectionState {
  readyState: "closed" | "opening" | "open" | "closing";
  sessionState: InterviewSessionState;
  reconnectAttempts: number;
  lastPong: number;
  latency: number;            // ms
  audioStream: MediaStream | null;
  videoStream: MediaStream | null;
}

// Interview question with metadata for real-time delivery
export interface InterviewQuestion {
  index: number;
  text: string;
  category: string;           // technical, behavioral, situational, etc.
  difficulty: number;         // 1-5
  expectedDuration: number;   // seconds expected for answer
  followUps: string[];        // potential follow-up questions
  rubric: rubRubricItem[];
}

export interface RubricItem {
  dimension: string;
  description: string;
  weight: number;
  lookFor: string[];          // positive indicators
  watchFor: string[];         // negative indicators
}

// Interview session configuration
export interface InterviewSessionConfig {
  role: string;
  language: "en" | "ar";
  avatarStyle: AvatarStyle;
  avatarConfig: AvatarRenderConfig;
  analysisConfig: RealTimeAnalysisConfig;
  questions: InterviewQuestion[];
  timeLimit?: number;         // total interview time limit in seconds
  questionTimeLimit?: number; // per-question time limit in seconds
  allowSkip: boolean;
  showLiveFeedback: boolean;
  recordingConsent: boolean;
}
