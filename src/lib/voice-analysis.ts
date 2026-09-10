import type { SkillCategory } from "@/types";

// Voice analysis result from a dedicated voice AI service
// (Deepgram / AssemblyAI style — structured emotion, tone, pacing, clarity)
export interface VoiceAnalysisResult {
  // Transcription (if service provides it)
  transcript?: string;

  // Overall voice quality score 0-5
  overallQuality: number;

  // Dimension scores 0-5
  dimensions: {
    confidence: number;       // Vocal confidence — certainty in voice
    clarity: number;          // Articulation clarity, enunciation
    pacing: number;           // Speaking rate, rhythm, appropriate pauses
    enthusiasm: number;       // Energy, engagement in voice
    fillerWords: number;      // Low filler = high score (inverted: 5 = few fillers)
    emotion: number;          // Emotional expressiveness appropriate to context
  };

  // Detected emotions with confidence (0-1)
  emotions: {
    name: string;
    confidence: number;
  }[];

  // Metadata
  metadata: {
    durationSeconds: number;
    speakingRateWpm: number;   // Words per minute
    pauseRatio: number;        // Fraction of time paused
    fillerWordCount: number;
    clarityScore: number;      // 0-1 articulation score
  };

  // Service-specific raw data (for debugging/audit)
  raw?: Record<string, unknown>;
}

// Input for voice analysis
export interface VoiceAnalysisInput {
  audioBlob: Blob;
  targetRole: string;
  question: string;
  previousContext?: string;
}

// Voice analysis configuration — weights for fusion
export const VOICE_WEIGHTS = {
  confidence: 0.20,
  clarity: 0.20,
  pacing: 0.15,
  enthusiasm: 0.15,
  fillerWords: 0.15,
  emotion: 0.15,
} as const;

// Expected voice characteristics per role (for calibration)
export const ROLE_VOICE_EXPECTATIONS: Record<string, { minSpeakingRate: number; maxFillerRatio: number; expectedConfidence: number }> = {
  "software-engineer": { minSpeakingRate: 100, maxFillerRatio: 0.08, expectedConfidence: 3 },
  "frontend-engineer": { minSpeakingRate: 100, maxFillerRatio: 0.08, expectedConfidence: 3 },
  "backend-engineer": { minSpeakingRate: 100, maxFillerRatio: 0.08, expectedConfidence: 3 },
  "full-stack-engineer": { minSpeakingRate: 110, maxFillerRatio: 0.07, expectedConfidence: 3 },
  "software-architect": { minSpeakingRate: 110, maxFillerRatio: 0.06, expectedConfidence: 4 },
  "devops-engineer": { minSpeakingRate: 105, maxFillerRatio: 0.07, expectedConfidence: 3 },
  "data-analyst": { minSpeakingRate: 100, maxFillerRatio: 0.08, expectedConfidence: 3 },
  "business-analyst": { minSpeakingRate: 110, maxFillerRatio: 0.07, expectedConfidence: 3 },
  "qa-engineer": { minSpeakingRate: 100, maxFillerRatio: 0.08, expectedConfidence: 3 },
  "tester": { minSpeakingRate: 100, maxFillerRatio: 0.09, expectedConfidence: 2 },
  "uxui-designer": { minSpeakingRate: 105, maxFillerRatio: 0.07, expectedConfidence: 3 },
  "engineering-manager": { minSpeakingRate: 110, maxFillerRatio: 0.06, expectedConfidence: 4 },
  "tech-lead": { minSpeakingRate: 110, maxFillerRatio: 0.06, expectedConfidence: 4 },
  "product-manager": { minSpeakingRate: 110, maxFillerRatio: 0.06, expectedConfidence: 3 },
  "scrum-master": { minSpeakingRate: 105, maxFillerRatio: 0.07, expectedConfidence: 3 },
  "data-engineer": { minSpeakingRate: 100, maxFillerRatio: 0.08, expectedConfidence: 3 },
  "ml-engineer": { minSpeakingRate: 100, maxFillerRatio: 0.08, expectedConfidence: 3 },
};
