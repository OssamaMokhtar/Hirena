import type { ProficiencyLevel } from "@/types";

// Facial analysis result from a dedicated facial analysis service
// (OpenAI Vision / AWS Rekognition / DeepFace style)
export interface FacialAnalysisResult {
  // Overall engagement score 0-5
  overallEngagement: number;

  // Dimension scores 0-5
  dimensions: {
    eyeContact: number;        // Eye contact with camera
    engagement: number;        // General engagement/attentiveness
    confidence: number;        // Confident vs nervous expressions
    stress: number;            // Stress/anxiety signs (inverted: 5 = low stress)
    expressiveness: number;    // Facial expressiveness appropriate to context
    smileWarmth: number;       // Warmth/friendliness (context-dependent)
  };

  // Frame-level analysis (key frames from the video)
  frames: {
    timestamp: number;         // Seconds into the video
    dominantEmotion: string;   // happy, neutral, surprised, sad, angry, fearful, disgusted, contempt
    emotionConfidence: number; // 0-1
    eyeContactScore: number;   // 0-1 likelihood of eye contact
    facialExpression: {
      smile: number;           // 0-1 smile intensity
      browFurrow: number;      // 0-1 brow furrow (confusion/thought)
      eyebrowRaise: number;    // 0-1 eyebrow raise (surprise/emphasis)
      blinkRate: number;       // blinks per minute (approximate)
    };
    headPose: {
      pitch: number;           // -90 to 90 degrees
      yaw: number;             // -90 to 90 degrees
      roll: number;            // -90 to 90 degrees
    };
  }[];

  // Aggregated emotion distribution across the interview
  emotionDistribution: {
    name: string;
    percentage: number;        // 0-100
  }[];

  // Overall stats
  metadata: {
    totalFramesAnalyzed: number;
    eyeContactPercentage: number;  // % of frames with eye contact
    avgSmileIntensity: number;     // 0-1 average smile
    stressIndicator: number;       // 0-1 aggregate stress signal
    expressivenessScore: number;   // 0-1 aggregate expressiveness
  };

  // Service-specific raw data
  raw?: Record<string, unknown>;
}

// Input for facial analysis
export interface FacialAnalysisInput {
  videoBlob: Blob;
  targetRole: string;
  totalDuration: number;       // seconds
  keyFrameInterval?: number;   // seconds between key frames (default 5)
}

// Facial analysis configuration — weights for fusion
export const FACIAL_WEIGHTS = {
  eyeContact: 0.20,
  engagement: 0.25,
  confidence: 0.20,
  stress: 0.15,
  expressiveness: 0.10,
  smileWarmth: 0.10,
} as const;

// Expected facial characteristics per role (for calibration)
export const ROLE_FACIAL_EXPECTATIONS: Record<string, { expectedEyeContact: number; expectedExpressiveness: number; stressTolerance: number }> = {
  "software-engineer": { expectedEyeContact: 0.6, expectedExpressiveness: 0.4, stressTolerance: 0.7 },
  "frontend-engineer": { expectedEyeContact: 0.6, expectedExpressiveness: 0.5, stressTolerance: 0.7 },
  "backend-engineer": { expectedEyeContact: 0.6, expectedExpressiveness: 0.3, stressTolerance: 0.7 },
  "full-stack-engineer": { expectedEyeContact: 0.6, expectedExpressiveness: 0.4, stressTolerance: 0.7 },
  "software-architect": { expectedEyeContact: 0.7, expectedExpressiveness: 0.4, stressTolerance: 0.8 },
  "devops-engineer": { expectedEyeContact: 0.6, expectedExpressiveness: 0.3, stressTolerance: 0.7 },
  "data-analyst": { expectedEyeContact: 0.6, expectedExpressiveness: 0.3, stressTolerance: 0.7 },
  "business-analyst": { expectedEyeContact: 0.7, expectedExpressiveness: 0.5, stressTolerance: 0.6 },
  "qa-engineer": { expectedEyeContact: 0.6, expectedExpressiveness: 0.3, stressTolerance: 0.7 },
  "tester": { expectedEyeContact: 0.5, expectedExpressiveness: 0.3, stressTolerance: 0.6 },
  "uxui-designer": { expectedEyeContact: 0.6, expectedExpressiveness: 0.6, stressTolerance: 0.7 },
  "engineering-manager": { expectedEyeContact: 0.8, expectedExpressiveness: 0.5, stressTolerance: 0.8 },
  "tech-lead": { expectedEyeContact: 0.7, expectedExpressiveness: 0.4, stressTolerance: 0.8 },
  "product-manager": { expectedEyeContact: 0.7, expectedExpressiveness: 0.5, stressTolerance: 0.7 },
  "scrum-master": { expectedEyeContact: 0.7, expectedExpressiveness: 0.5, stressTolerance: 0.7 },
  "data-engineer": { expectedEyeContact: 0.6, expectedExpressiveness: 0.3, stressTolerance: 0.7 },
  "ml-engineer": { expectedEyeContact: 0.6, expectedExpressiveness: 0.4, stressTolerance: 0.7 },
};

// Supported emotions for classification
export const FACIAL_EMOTIONS = [
  "happy",
  "neutral",
  "surprised",
  "sad",
  "angry",
  "fearful",
  "disgusted",
  "contempt",
  "confused",
  "focused",
] as const;

export type FacialEmotion = typeof FACIAL_EMOTIONS[number];
