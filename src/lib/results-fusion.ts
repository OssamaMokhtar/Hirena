import type { ProficiencyLevel } from "@/types";
import { VoiceAnalysisResult, VOICE_WEIGHTS } from "@/lib/voice-analysis";
import { FacialAnalysisResult, FACIAL_WEIGHTS } from "@/lib/facial-analysis";
import { ContentAnalysisResult } from "@/lib/video-interview";

// Results fusion — merges voice, facial, and content analysis into unified scores
// Core of Option 2: multi-modal signal fusion with configurable weights

// Fusion weights — how much each signal contributes to the final score
export const FUSION_WEIGHTS = {
  voice: 0.25,        // Voice analysis (confidence, clarity, pacing, emotion)
  facial: 0.15,       // Facial analysis (eye contact, engagement, confidence)
  content: 0.45,      // Content analysis (technical accuracy, depth, communication)
  selfAssessment: 0.15, // Self-assessment (user's own rating)
} as const;

// Verify weights sum to 1
const weightSum = FUSION_WEIGHTS.voice + FUSION_WEIGHTS.facial + FUSION_WEIGHTS.content + FUSION_WEIGHTS.selfAssessment;
if (Math.abs(weightSum - 1) > 0.01) {
  throw new Error(`Fusion weights must sum to 1, got ${weightSum}`);
}

// Fusion result — the merged assessment from all signals
export interface FusionResult {
  // Overall fusion score 0-5
  overallScore: number;

  // Dimension scores 0-5 (fused from all signals)
  dimensions: {
    technicalAccuracy: number;
    depthOfKnowledge: number;
    communicationClarity: number;
    problemSolvingApproach: number;
    confidenceSignals: number;
    engagement: number;
  };

  // Per-signal breakdown (for transparency)
  signalBreakdown: {
    voice: {
      overall: number;
      dimensions: VoiceAnalysisResult["dimensions"];
      weight: number;
    };
    facial: {
      overall: number;
      dimensions: FacialAnalysisResult["dimensions"];
      weight: number;
    };
    content: {
      overall: number;
      dimensions: {
        technicalAccuracy: number;
        depthOfKnowledge: number;
        communicationClarity: number;
        problemSolvingApproach: number;
        confidenceSignals: number;
        engagement: number;
        overallImpression: string;
      };
      weight: number;
    };
    selfAssessment: {
      overall: number;
      weight: number;
    };
  };

  // Signal quality indicators (how reliable each signal is)
  signalQuality: {
    voice: "high" | "medium" | "low" | "none";
    facial: "high" | "medium" | "low" | "none";
    content: "high" | "medium" | "low" | "none";
    selfAssessment: "high" | "medium" | "low" | "none";
  };

  // Confidences per dimension (0-1) — how sure we are about each score
  dimensionConfidences: Record<string, number>;

  // Notes / flags from fusion
  notes: string[];

  // Suggested proficiency levels (0-5) per competency area
  inferredProficiency: Record<string, number>;
}

// Input for fusion
export interface FusionInput {
  voiceAnalysis?: VoiceAnalysisResult;
  facialAnalysis?: FacialAnalysisResult;
  contentAnalysis?: ContentAnalysisResult;
  selfAssessment?: number;  // 0-5 self-assessment score (overall)
  targetRole: string;
}

// Helper: weighted average of scores
function weightedAverage(scores: { value: number; weight: number }[]): number {
  const totalWeight = scores.reduce((sum, s) => sum + s.weight, 0);
  if (totalWeight === 0) return 0;
  const weightedSum = scores.reduce((sum, s) => sum + s.value * s.weight, 0);
  return weightedSum / totalWeight;
}

// Helper: clamp to 0-5
function clamp0to5(value: number): number {
  return Math.max(0, Math.min(5, value));
}

// Helper: determine signal quality
function determineQuality(result: unknown): "high" | "medium" | "low" | "none" {
  if (!result) return "none";
  if (typeof result === "object") {
    const r = result as Record<string, unknown>;
    const score = r["overallQuality"] ?? r["overallEngagement"] ?? r["overallAssessment"] ?? 0;
    const scoreNum = typeof score === "number" ? score : 0;
    if (scoreNum >= 4) return "high";
    if (scoreNum >= 2) return "medium";
    return "low";
  }
  return "none";
}

// Merge voice dimensions into communication dimensions
function voiceToCommunicationDimensions(voice: VoiceAnalysisResult["dimensions"]): Record<string, number> {
  return {
    communicationClarity: voice.clarity * 0.6 + voice.confidence * 0.4,
    confidenceSignals: voice.confidence * 0.7 + voice.enthusiasm * 0.3,
    engagement: voice.enthusiasm * 0.5 + voice.emotion * 0.5,
  };
}

// Merge facial dimensions into communication/engagement dimensions
function facialToCommunicationDimensions(facial: FacialAnalysisResult["dimensions"]): Record<string, number> {
  return {
    engagement: facial.engagement * 0.5 + facial.expressiveness * 0.3 + facial.smileWarmth * 0.2,
    confidenceSignals: facial.confidence * 0.6 + facial.eyeContact * 0.4,
    communicationClarity: facial.expressiveness * 0.5 + facial.eyeContact * 0.5,
  };
}

// Main fusion function
export function fuseResults(input: FusionInput): FusionResult {
  const {
    voiceAnalysis,
    facialAnalysis,
    contentAnalysis,
    selfAssessment,
    targetRole,
  } = input;

  const notes: string[] = [];
  const signalBreakdown: FusionResult["signalBreakdown"] = {
    voice: { overall: 0, dimensions: { confidence: 0, clarity: 0, pacing: 0, enthusiasm: 0, fillerWords: 0, emotion: 0 }, weight: FUSION_WEIGHTS.voice },
    facial: { overall: 0, dimensions: { eyeContact: 0, engagement: 0, confidence: 0, stress: 0, expressiveness: 0, smileWarmth: 0 }, weight: FUSION_WEIGHTS.facial },
    content: { overall: 0, dimensions: { technicalAccuracy: 0, depthOfKnowledge: 0, communicationClarity: 0, problemSolvingApproach: 0, confidenceSignals: 0, engagement: 0, overallImpression: "" }, weight: FUSION_WEIGHTS.content },
    selfAssessment: { overall: 0, weight: FUSION_WEIGHTS.selfAssessment },
  };

  const dimensionConfidences: Record<string, number> = {};

  // --- Voice signal ---
  if (voiceAnalysis) {
    const v = voiceAnalysis;
    signalBreakdown.voice.overall = v.overallQuality;
    signalBreakdown.voice.dimensions = v.dimensions;

    // Map voice dimensions to communication dimensions
    const voiceComm = voiceToCommunicationDimensions(v.dimensions);
    notes.push(`Voice analysis: confidence ${v.dimensions.confidence.toFixed(1)}, clarity ${v.dimensions.clarity.toFixed(1)}, pacing ${v.dimensions.pacing.toFixed(1)}`);

    // Set confidences
    dimensionConfidences.communicationClarity = Math.max(
      dimensionConfidences.communicationClarity || 0,
      v.dimensions.clarity ?? 0,
    );
    dimensionConfidences.confidenceSignals = Math.max(
      dimensionConfidences.confidenceSignals || 0,
      v.dimensions.confidence * 0.9
    );
    dimensionConfidences.engagement = Math.max(
      dimensionConfidences.engagement || 0,
      v.dimensions.enthusiasm * 0.7 + v.dimensions.emotion * 0.3
    );
  } else {
    notes.push("Voice analysis not provided — skipping voice signal");
  }

  // --- Facial signal ---
  if (facialAnalysis) {
    const f = facialAnalysis;
    signalBreakdown.facial.overall = f.overallEngagement;
    signalBreakdown.facial.dimensions = f.dimensions;

    // Map facial dimensions
    const facialComm = facialToCommunicationDimensions(f.dimensions);

    notes.push(`Facial analysis: eye contact ${f.dimensions.eyeContact.toFixed(1)}, engagement ${f.dimensions.engagement.toFixed(1)}, confidence ${f.dimensions.confidence.toFixed(1)}`);

    if (f.metadata.eyeContactPercentage > 0.7) {
      notes.push(`Strong eye contact (${Math.round(f.metadata.eyeContactPercentage * 100)}% of frames)`);
    } else if (f.metadata.eyeContactPercentage < 0.3) {
      notes.push(`Low eye contact (${Math.round(f.metadata.eyeContactPercentage * 100)}% of frames) — may affect engagement score`);
    }

    // Set confidences
    dimensionConfidences.engagement = Math.max(
      dimensionConfidences.engagement || 0,
      f.dimensions.engagement * 0.8
    );
    dimensionConfidences.confidenceSignals = Math.max(
      dimensionConfidences.confidenceSignals || 0,
      f.dimensions.confidence * 0.7
    );

    // Stress check
    if (f.metadata.stressIndicator > 0.6) {
      notes.push(`Elevated stress indicators detected — may affect performance assessment`);
    }
  } else {
    notes.push("Facial analysis not provided — skipping facial signal");
  }

  // --- Content signal ---
  if (contentAnalysis) {
    const c = contentAnalysis;
    signalBreakdown.content.overall = c.overallAssessment.technicalAccuracy; // Use technical accuracy as proxy
    signalBreakdown.content.dimensions = c.overallAssessment;

    notes.push(`Content analysis: technical accuracy ${c.overallAssessment.technicalAccuracy}, depth ${c.overallAssessment.depthOfKnowledge}, communication ${c.overallAssessment.communicationClarity}`);

    // Set confidences
    dimensionConfidences.technicalAccuracy = Math.max(
      dimensionConfidences.technicalAccuracy || 0,
      c.overallAssessment.technicalAccuracy * 0.9
    );
    dimensionConfidences.depthOfKnowledge = Math.max(
      dimensionConfidences.depthOfKnowledge || 0,
      c.overallAssessment.depthOfKnowledge * 0.85
    );
    dimensionConfidences.problemSolvingApproach = Math.max(
      dimensionConfidences.problemSolvingApproach || 0,
      c.overallAssessment.problemSolvingApproach * 0.85
    );
    dimensionConfidences.communicationClarity = Math.max(
      dimensionConfidences.communicationClarity || 0,
      c.overallAssessment.communicationClarity * 0.7
    );
    dimensionConfidences.confidenceSignals = Math.max(
      dimensionConfidences.confidenceSignals || 0,
      c.overallAssessment.confidenceSignals * 0.6
    );
    dimensionConfidences.engagement = Math.max(
      dimensionConfidences.engagement || 0,
      c.overallAssessment.engagement * 0.6
    );
  } else {
    notes.push("Content analysis not provided — skipping content signal");
  }
  if (typeof selfAssessment === "number") {
    signalBreakdown.selfAssessment.overall = clamp0to5(selfAssessment);
    notes.push(`Self-assessment: ${selfAssessment}/5`);
    dimensionConfidences.technicalAccuracy = Math.max(
      dimensionConfidences.technicalAccuracy || 0,
      selfAssessment * 0.3
    );
  } else {
    notes.push("Self-assessment not provided — skipping self-assessment signal");
  }

  // --- Compute fused dimensions ---
  // For each dimension, gather all signals that contribute and weight them
  const dimensionSignals: Record<string, { value: number; weight: number; source: string }[]> = {
    technicalAccuracy: [],
    depthOfKnowledge: [],
    communicationClarity: [],
    problemSolvingApproach: [],
    confidenceSignals: [],
    engagement: [],
  };

  // Content contributes to all dimensions
  if (contentAnalysis) {
    const c = contentAnalysis.overallAssessment;
    dimensionSignals.technicalAccuracy.push({ value: c.technicalAccuracy, weight: FUSION_WEIGHTS.content, source: "content" });
    dimensionSignals.depthOfKnowledge.push({ value: c.depthOfKnowledge, weight: FUSION_WEIGHTS.content, source: "content" });
    dimensionSignals.communicationClarity.push({ value: c.communicationClarity, weight: FUSION_WEIGHTS.content, source: "content" });
    dimensionSignals.problemSolvingApproach.push({ value: c.problemSolvingApproach, weight: FUSION_WEIGHTS.content, source: "content" });
    dimensionSignals.confidenceSignals.push({ value: c.confidenceSignals, weight: FUSION_WEIGHTS.content, source: "content" });
    dimensionSignals.engagement.push({ value: c.engagement, weight: FUSION_WEIGHTS.content, source: "content" });
  }

  // Voice contributes to communication, confidence, engagement
  if (voiceAnalysis) {
    const v = voiceAnalysis.dimensions;
    dimensionSignals.communicationClarity.push({ value: v.clarity * 0.6 + v.confidence * 0.4, weight: FUSION_WEIGHTS.voice, source: "voice" });
    dimensionSignals.confidenceSignals.push({ value: v.confidence * 0.7 + v.enthusiasm * 0.3, weight: FUSION_WEIGHTS.voice, source: "voice" });
    dimensionSignals.engagement.push({ value: v.enthusiasm * 0.5 + v.emotion * 0.5, weight: FUSION_WEIGHTS.voice, source: "voice" });
  }

  // Facial contributes to engagement, confidence, communication
  if (facialAnalysis) {
    const f = facialAnalysis.dimensions;
    dimensionSignals.engagement.push({ value: f.engagement * 0.5 + f.expressiveness * 0.3 + f.smileWarmth * 0.2, weight: FUSION_WEIGHTS.facial, source: "facial" });
    dimensionSignals.confidenceSignals.push({ value: f.confidence * 0.6 + f.eyeContact * 0.4, weight: FUSION_WEIGHTS.facial, source: "facial" });
    dimensionSignals.communicationClarity.push({ value: f.expressiveness * 0.5 + f.eyeContact * 0.5, weight: FUSION_WEIGHTS.facial, source: "facial" });
  }

  // Self-assessment contributes to all dimensions (with lower weight)
  if (typeof selfAssessment === "number") {
    const sa = clamp0to5(selfAssessment);
    dimensionSignals.technicalAccuracy.push({ value: sa, weight: FUSION_WEIGHTS.selfAssessment * 0.5, source: "self" });
    dimensionSignals.depthOfKnowledge.push({ value: sa, weight: FUSION_WEIGHTS.selfAssessment * 0.4, source: "self" });
    dimensionSignals.communicationClarity.push({ value: sa, weight: FUSION_WEIGHTS.selfAssessment * 0.5, source: "self" });
    dimensionSignals.problemSolvingApproach.push({ value: sa, weight: FUSION_WEIGHTS.selfAssessment * 0.4, source: "self" });
    dimensionSignals.confidenceSignals.push({ value: sa * 0.8, weight: FUSION_WEIGHTS.selfAssessment * 0.5, source: "self" });
    dimensionSignals.engagement.push({ value: sa * 0.7, weight: FUSION_WEIGHTS.selfAssessment * 0.4, source: "self" });
  }

  // Compute fused dimension scores
  const dimensions: FusionResult["dimensions"] = {
    technicalAccuracy: clamp0to5(weightedAverage(dimensionSignals.technicalAccuracy)),
    depthOfKnowledge: clamp0to5(weightedAverage(dimensionSignals.depthOfKnowledge)),
    communicationClarity: clamp0to5(weightedAverage(dimensionSignals.communicationClarity)),
    problemSolvingApproach: clamp0to5(weightedAverage(dimensionSignals.problemSolvingApproach)),
    confidenceSignals: clamp0to5(weightedAverage(dimensionSignals.confidenceSignals)),
    engagement: clamp0to5(weightedAverage(dimensionSignals.engagement)),
  };

  // Compute overall score (average of dimensions)
  const overallScore = clamp0to5(
    (dimensions.technicalAccuracy +
      dimensions.depthOfKnowledge +
      dimensions.communicationClarity +
      dimensions.problemSolvingApproach +
      dimensions.confidenceSignals +
      dimensions.engagement) / 6
  );

  // --- Signal quality ---
  const signalQuality: FusionResult["signalQuality"] = {
    voice: determineQuality(voiceAnalysis),
    facial: determineQuality(facialAnalysis),
    content: determineQuality(contentAnalysis),
    selfAssessment: determineQuality(selfAssessment),
  };

  // --- Inferred proficiency ---
  const inferredProficiency: Record<string, number> = {};
  // Map dimensions to inferred proficiency levels
  if (contentAnalysis) {
    inferredProficiency.technicalKnowledge = Math.round(dimensions.technicalAccuracy);
    inferredProficiency.domainExpertise = Math.round(dimensions.depthOfKnowledge);
    inferredProficiency.communicationSkills = Math.round(dimensions.communicationClarity);
    inferredProficiency.problemSolving = Math.round(dimensions.problemSolvingApproach);
  }
  if (voiceAnalysis) {
    inferredProficiency.presentationalSkills = Math.round(dimensions.communicationClarity);
    inferredProficiency.interviewPresence = Math.round(dimensions.engagement);
  }
  if (facialAnalysis) {
    inferredProficiency.engagementLevel = Math.round(dimensions.engagement);
    inferredProficiency.interviewConfidence = Math.round(dimensions.confidenceSignals);
  }

  return {
    overallScore,
    dimensions,
    signalBreakdown,
    signalQuality,
    dimensionConfidences,
    notes,
    inferredProficiency,
  };
}

// Quick fusion utility: merge multiple analyses into a single score
export function quickFusionScore(input: FusionInput): number {
  const result = fuseResults(input);
  return result.overallScore;
}

// Get human-readable signal quality description
export function describeSignalQuality(quality: FusionResult["signalQuality"]["voice"]): string {
  switch (quality) {
    case "high":
      return "Strong signal — high confidence in this assessment";
    case "medium":
      return "Moderate signal — assessment may have some uncertainty";
    case "low":
      return "Weak signal — interpret with caution";
    case "none":
      return "No signal — this dimension was not assessed";
  }
}
