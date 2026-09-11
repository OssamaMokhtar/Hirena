import type { ProficiencyLevel } from "@/types";

// ─── Content Analysis (from video interview) ────────────────────────────────
// This re-exports the analysis shape used by the interview wizard.
// In Option 2, this lives alongside voice/facial analysis as one of the
// three signals fused by results-fusion.ts.

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

// ─── Simple signal extraction from transcription ──────────────────────────────
// Lightweight heuristics to extract candidate signals from text for the
// adaptive avatar. These run client-side without API calls.

/** Extract speaking pace from word count and duration */
export function extractPace(transcription: string, durationSeconds: number): number {
  if (durationSeconds <= 0) return 0.5;
  const wordCount = transcription.split(/\s+/).filter(Boolean).length;
  const wpm = (wordCount / durationSeconds) * 60;
  // Ideal: 100-150 WPM → 0.5, faster → higher, slower → lower
  if (wpm >= 130 && wpm <= 160) return 0.6;
  if (wpm >= 100 && wpm <= 130) return 0.5;
  if (wpm > 160) return Math.min(1, 0.6 + (wpm - 160) / 100);
  if (wpm < 80) return Math.max(0, 0.4 - (80 - wpm) / 100);
  return 0.5;
}

/** Extract sentiment from keyword analysis */
export function extractSentiment(transcription: string): number {
  const positiveWords = ["confident", "excited", "passionate", "great", "achieved", "success", "improved", "learned", "interesting", "challenging", "enjoy", "love", "built", "led", "designed"];
  const negativeWords = ["struggled", "difficult", "hard", "confused", "nervous", "anxious", "worried", "failed", "mistake", "problem", "issue", "bug"];
  const hedgingWords = ["think", "maybe", "perhaps", "probably", "I guess", "sort of", "kind of", "approximately", "hopefully", "believe"];

  const lower = transcription.toLowerCase();
  let score = 0;

  positiveWords.forEach((w) => { if (lower.includes(w)) score += 0.1; });
  negativeWords.forEach((w) => { if (lower.includes(w)) score -= 0.08; });
  hedgingWords.forEach((w) => { if (lower.includes(w)) score -= 0.05; });

  // Bonus for definitive statements
  if (lower.includes("I built") || lower.includes("I led") || lower.includes("I designed") || lower.includes("I implemented")) {
    score += 0.15;
  }

  return Math.max(-1, Math.min(1, score));
}

/** Extract engagement from word richness and detail */
export function extractEngagement(transcription: string, durationSeconds: number): number {
  if (durationSeconds <= 0) return 0.5;
  const wordCount = transcription.split(/\s+/).filter(Boolean).length;
  const wordsPerSecond = wordCount / durationSeconds;

  // Rich language = more unique words relative to total
  const words = transcription.split(/\s+/).filter(Boolean);
  const uniqueWords = new Set(words.map((w) => w.toLowerCase().replace(/[^a-z]/g, ""))).size;
  const vocabularyRichness = uniqueWords / Math.max(words.length, 1);

  // Detail indicators
  const detailMarkers = [".", "because", "for example", "specifically", "the reason", "first", "then", "finally"];
  let detailScore = 0;
  detailMarkers.forEach((m) => { if (transcription.includes(m)) detailScore += 0.05; });

  // Engagement = pace quality + richness + detail
  const paceQuality = Math.min(1, wordsPerSecond / 2.5); // ~2.5 words/sec is good
  return Math.max(0, Math.min(1, paceQuality * 0.4 + vocabularyRichness * 0.3 + detailScore * 4));
}

/** Estimate filler words from repetition and hedging patterns */
export function extractFillerWords(transcription: string): number {
  const lower = transcription.toLowerCase();

  // Common filler patterns
  const fillerPatterns = [
    "um", "uh", "ah", "you know", "like", "sort of", "kind of",
    "I mean", "basically", "actually", "literally", "honestly",
  ];

  // Count repetitions (same word 3+ times in a row suggests filler)
  const words = lower.split(/\s+/);
  let repetitionPenalty = 0;
  for (let i = 2; i < words.length; i++) {
    if (words[i] === words[i-1] && words[i] === words[i-2] && words[i].length > 1) {
      repetitionPenalty += 0.1;
    }
  }

  // Count filler phrase occurrences
  let fillerCount = 0;
  fillerPatterns.forEach((p) => {
    const regex = new RegExp(p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
    const matches = lower.match(regex);
    if (matches) fillerCount += matches.length;
  });

  // Normalize to 0-1
  const totalPenalty = repetitionPenalty + fillerCount * 0.08;
  return Math.min(1, totalPenalty);
}

/** Extract all signals from a transcription + duration */
export function extractCandidateSignals(transcription: string, durationSeconds: number): {
  pace: number;
  sentiment: number;
  engagement: number;
  fillerWords: number;
  wpm: number;
} {
  const wordCount = transcription.split(/\s+/).filter(Boolean).length;
  const wpm = durationSeconds > 0 ? Math.round((wordCount / durationSeconds) * 60) : 0;

  return {
    pace: extractPace(transcription, durationSeconds),
    sentiment: extractSentiment(transcription),
    engagement: extractEngagement(transcription, durationSeconds),
    fillerWords: extractFillerWords(transcription),
    wpm,
  };
}

/** Generate an adaptive response from the avatar based on candidate signals */
export function generateAdaptiveAvatarResponse(
  question: string,
  signals: { pace: number; sentiment: number; engagement: number; fillerWords: number },
  previousAnswer: string
): { question: string; tone: string; paceMultiplier: number; encouragement: string | null } {
  let adaptedQuestion = question;
  let tone = "neutral";
  let paceMultiplier = 1.0;
  let encouragement: string | null = null;

  // Pace adaptation
  if (signals.pace > 0.7) {
    // Candidate speaks too fast — avatar slows down
    paceMultiplier = 0.85;
    encouragement = "Take your time — there's no rush. Think through your answer carefully.";
  } else if (signals.pace < 0.3) {
    // Candidate speaks too slow — avatar picks up pace slightly
    paceMultiplier = 1.15;
  }

  // Sentiment adaptation
  if (signals.sentiment < -0.3) {
    tone = "supportive";
    encouragement = "It's okay to feel uncertain — let's break this down together. What's your initial thought?";
  } else if (signals.sentiment > 0.5) {
    tone = "energetic";
    encouragement = "Great energy! Let's keep that up.";
  }

  // Engagement adaptation
  if (signals.engagement < 0.3) {
    tone = "engaging";
    encouragement = "I want to hear your perspective on this. What's your experience with it?";
  }

  // Filler word coaching
  if (signals.fillerWords > 0.6) {
    encouragement = "Try pausing instead of filling silence — it shows confidence. Take a moment to think.";
  }

  return { question: adaptedQuestion, tone, paceMultiplier, encouragement };
}
