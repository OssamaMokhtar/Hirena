import type { SkillCategory } from "@/types";
import type { ProficiencyLevel } from "@/types";

// ─── Content Analysis (from video interview) ────────────────────────────────
// This re-exports the analysis shape used by the interview wizard.
// In Option 2, this lives alongside voice/facial analysis as one of the
// three signals fused by results-fusion.ts.

import type { ProficiencyLevel } from "@/types";

export interface ContentAnalysisResult {
  // LLM-derived assessment of the answer's substance
  overallAssessment: {
    technicalAccuracy: number;        // 0-5
    depthOfKnowledge: number;         // 0-5
    communicationClarity: number;     // 0-5
    problemSolvingApproach: number;   // 0-5
    confidenceSignals: number;        // 0-5 — inferred from language
    engagement: number;               // 0-5 — inferred from language
    overallImpression: string;
  };
  strengths: string[];
  gaps: string[];
  skillInference: Record<string, {
    level: number;
    confidence: number;
    reasoning: string;
  }>;
  followUpQuestion: string | null;
}

export interface ContentAnalysisInput {
  transcription: string;
  targetRole: string;
  question: string;
  previousContext?: string;
  aiKey: string;
}

// Content analysis uses GPT-4o (or any LLM) to score the substance of an answer.
// This is the "content" signal in the three-way fusion (voice + facial + content).
// The implementation in /api/interview/analyze already does this — this interface
// just formalizes it so results-fusion.ts can consume it.

// Weights used when fusing content with voice and facial signals
export const CONTENT_WEIGHTS = {
  technicalAccuracy: 1.0,
  depthOfKnowledge: 1.0,
  communicationClarity: 0.8,
  problemSolvingApproach: 0.9,
  confidenceSignals: 0.5,
  engagement: 0.4,
} as const;
