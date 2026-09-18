// Hirena — Mock AI Inference Engine (Fallback Layer)
//
// Provides deterministic, rule-based skill inference when OpenAI's API
// is unavailable (no key, no credits, rate-limited, network error).
//
// WHY THIS EXISTS:
//   The Hirena assessment wizard asks users to describe their experience
//   for each skill. In production, GPT-4o analyzes these descriptions and
//   infers a proficiency level (0-5) with confidence and reasoning.
//
//   But GPT-4o requires an active OpenAI account with credits. When that's
//   not available — during development, demos, or if the account runs out
//   of funds — the assessment still needs to produce results.
//
//   This mock engine fills that gap. It uses keyword pattern matching and
//   heuristic scoring to produce a reasonable inference from the user's
//   own words. It's fully transparent, deterministic, and never calls out.
//
// HOW IT WORKS:
//   1. For each skill description, scan for patterns associated with each
//      proficiency level (0 = no exposure, 5 = expert).
//   2. Count matches per level; pick the highest-scoring level.
//   3. Adjust confidence: boost for strong signals ("production", "led",
//      "built"), reduce for aspirational language ("want to", "learning",
//      "aspiring", "planning to").
//   4. Generate a readable reasoning string explaining what was matched.
//
// CONFIGURATION (in .env.local):
//   AI_MODE=auto    (default) — try real OpenAI first, fall back to mock
//   AI_MODE=mock    — always use this mock engine
//   AI_MODE=production — require real OpenAI; throw if unavailable
//
// FALLBACK CHAIN:
//   assess/route.ts → ai.ts inferAllSkills() → mock-ai.ts (if needed)
//   ai.ts also has fallback generators for feedback, roadmap, and
//   resource recommendations when GPT-4o is unavailable.

import type { SkillCategory, ProficiencyLevel } from "@/types";

export interface MockInferenceResult {
  level: ProficiencyLevel;
  confidence: number;
  reasoning: string;
}

// ─── Proficiency level patterns ────────────────────────────────────────────

// Level 0: No exposure — "never used", "no experience", "haven't tried"
const L0_PATTERNS = [
  /never /i,
  /no experience/i,
  /haven'?t (used|done|worked with|applied|tried|built)/i,
  /don'?t know how to/i,
  /complete beginner/i,
  /no knowledge/i,
  /just started/i,
  /theoretical only/i,
  /read about it but/i,
  /haven'?t had the chance/i,
  /not at all/i,
  /zero/i,
];

// Level 1: Aware — "heard of", "conceptually", "familiar with the idea"
const L1_PATTERNS = [
  /heard of/i,
  /aware of/i,
  /know what it is/i,
  /conceptually/i,
  /familiar with the (idea|concept)/i,
  /understand the basics/i,
  /followed a tutorial/i,
  /took a course but/i,
  /read about/i,
  /knows about/i,
  /theoretical understanding/i,
  /basic awareness/i,
  /have (heard|seen) of/i,
];

// Level 2: Basic — "with help", "simple cases", "used a few times"
const L2_PATTERNS = [
  /basic (knowledge|understanding|familiarity)/i,
  /simple/i,
  /with (help|guidance|assistance|support)/i,
  /under supervision/i,
  /used it a few times/i,
  /limited experience/i,
  /occasionally/i,
  /can do simple/i,
  /can handle basic/i,
  /small project/i,
  /entry level/i,
  /junior/i,
  /used occasionally/i,
  /got started with/i,
  /learning to use/i,
  /some experience/i,
  /a little/i,
  /a bit of/i,
  /played around with/i,
  /touched on/i,
  /briefly/i,
];

// Level 3: Intermediate — "independently", "regularly", "production", "built"
const L3_PATTERNS = [
  /intermediate/i,
  /comfortable with/i,
  /confident (in|about|with)/i,
  /independently/i,
  /without help/i,
  /on my own/i,
  /regularly (use|work with|apply|build|create|develop)/i,
  /day-to-day/i,
  /daily/i,
  /production/i,
  /real-world/i,
  /real world/i,
  /built/i,
  /developed/i,
  /created/i,
  /implemented/i,
  /deployed/i,
  /hands-on/i,
  /practical experience/i,
  /solid (understanding|foundation|grasp)/i,
  /good understanding/i,
  /working knowledge/i,
  /used extensively/i,
  /frequently/i,
  /often/i,
  /well-versed/i,
  /skilled in/i,
  /skilled with/i,
  /experienced with/i,
  /experienced in/i,
  /competent/i,
  /proficient/i,
];

// Level 4: Advanced — "expert", "led", "mentored", "complex", "optimized"
const L4_PATTERNS = [
  /advanced/i,
  /expert in/i,
  /expert with/i,
  /expert on/i,
  /deep understanding/i,
  /deep knowledge/i,
  /deep (experience|understanding)/i,
  /optimized/i,
  /optimization/i,
  /led (the|an|a)/i,
  /mentored/i,
  /mentoring/i,
  /trained others/i,
  /taught/i,
  /gave (a talk|training|workshops|presentations|lectures|seminars)/i,
  /best practices/i,
  /complex/i,
  /complicated/i,
  /challenging/i,
  /high-performance/i,
  /performance-critical/i,
  /scalable/i,
  /scalability/i,
  /production-grade/i,
  /production quality/i,
  /specialist/i,
  /specialized/i,
  /specialize in/i,
  /deep dive/i,
  /deep-dive/i,
  /troubleshoot/i,
  /debug/i,
  /in depth/i,
  /in-depth/i,
  /comprehensive/i,
  /extensive experience/i,
  /years of experience/i,
  /senior level/i,
];

// Level 5: Expert — "principal", "recognized", "industry expert", "architected"
const L5_PATTERNS = [
  /principal/i,
  /staff (engineer|developer|architect|consultant|manager)/i,
  /thought leader/i,
  /industry expert/i,
  /recognized (expert|authority|leader)/i,
  /published/i,
  /speaker/i,
  /conference/i,
  /talk at/i,
  /presented at/i,
  /open source/i,
  /contributed to (the )?open/i,
  /created the/i,
  /built the/i,
  /designed the/i,
  /architected the/i,
  /org-wide/i,
  /organization-wide/i,
  /across the organization/i,
  /set the strategy/i,
  /defined the (direction|roadmap|strategy|vision|architecture|standard)/i,
  /established (the )?standard/i,
  /created the (framework|methodology|process|guideline|standard)/i,
  /wrote the/i,
  /author of/i,
  /written by/i,
  /domain expert/i,
  /subject matter expert/i,
  /sme/i,
  /go-to person/i,
  /go-to guy/i,
  /person everyone comes to/i,
  /recognized as (an )?expert/i,
  /known as (an )?expert/i,
  /huge experience/i,
  /vast experience/i,
  /immense experience/i,
  /(20|30|40|50|10\+?)\s*years/i,
];

// ─── Confidence modifiers ───────────────────────────────────────────────────

// Signals that increase confidence (concrete, verifiable claims)
const CONFIDENCE_BOOSTERS = [
  /production/i,
  /live/i,
  /deployed to/i,
  /in production/i,
  /at scale/i,
  /enterprise/i,
  /revenue/i,
  /shipped/i,
  /released/i,
  /customers?/i,
  /users?/i,
  /with [0-9]/i,
  /years? of/i,
  /successfully/i,
  /measurable/i,
  /improved/i,
  /reduced/i,
  /increased/i,
  /saved/i,
];

// Signals that decrease confidence (aspirational, future, vague)
const CONFIDENCE_REDUCERS = [
  /want to/i,
  /would like to/i,
  /planning to/i,
  /intend to/i,
  /hope to/i,
  /aspiring/i,
  /looking to/i,
  /would love to/i,
  /considering/i,
  /thinking about/i,
  /thinking of/i,
  /not yet/i,
  /haven'?t yet/i,
  /still learning/i,
  /would be/i,
  /someday/i,
  /in the future/i,
  /going forward/i,
  /down the road/i,
  /learning/i,
  /studying/i,
  /currently (learning|studying|exploring)/i,
  /curious about/i,
  /interested in/i,
  /dream of/i,
];

// ─── Core inference function ─────────────────────────────────────────────────

/**
 * Infer a proficiency level (0-5) from a user's free-text description.
 *
 * This is the **documented fallback** used when real AI (GPT-4o) is
 * unavailable. It is rule-based, deterministic, and fully transparent —
 * every inference can be traced to specific keywords in the user's text.
 */
export function mockInferSkillLevel(
  _skillId: string,
  skillName: string,
  description: string,
  _category: SkillCategory,
  targetRole: string
): MockInferenceResult {
  const text = description.trim();

  // Empty or extremely short → Level 0 with a clear note
  if (!text || text.length < 15) {
    return {
      level: 0,
      confidence: 0.25,
      reasoning: `"${text || "(no description provided)"}" — Too short to infer. Defaulting to Level 0 (no exposure). Add a description of your hands-on experience to get a more accurate assessment.`,
    };
  }

  // Score each level by counting matching patterns
  const scores: number[] = [0, 0, 0, 0, 0, 0];

  for (const re of L0_PATTERNS) if (re.test(text)) scores[0] += 1;
  for (const re of L1_PATTERNS) if (re.test(text)) scores[1] += 1;
  for (const re of L2_PATTERNS) if (re.test(text)) scores[2] += 1;
  for (const re of L3_PATTERNS) if (re.test(text)) scores[3] += 1;
  for (const re of L4_PATTERNS) if (re.test(text)) scores[4] += 1;
  for (const re of L5_PATTERNS) if (re.test(text)) scores[5] += 1;

  // Find the highest-scoring level
  let bestLevel = 0;
  let bestScore = scores[0];
  for (let i = 1; i <= 5; i++) {
    if (scores[i] > bestScore) {
      bestScore = scores[i];
      bestLevel = i;
    }
  }

  // Compute confidence
  let confidence = 0.4 + bestScore * 0.07;
  confidence = Math.min(0.95, Math.max(0.15, confidence));

  // Boost for concrete signals
  for (const re of CONFIDENCE_BOOSTERS) {
    if (re.test(text)) {
      confidence = Math.min(0.95, confidence + 0.06);
    }
  }

  // Reduce for aspirational/vague signals
  for (const re of CONFIDENCE_REDUCERS) {
    if (re.test(text)) {
      confidence = Math.max(0.15, confidence - 0.06);
    }
  }

  // Build reasoning
  const matchedLevels: string[] = [];
  if (scores[0] > 0) matchedLevels.push("Level 0 (no exposure)");
  if (scores[1] > 0) matchedLevels.push("Level 1 (aware)");
  if (scores[2] > 0) matchedLevels.push("Level 2 (basic)");
  if (scores[3] > 0) matchedLevels.push("Level 3 (intermediate)");
  if (scores[4] > 0) matchedLevels.push("Level 4 (advanced)");
  if (scores[5] > 0) matchedLevels.push("Level 5 (expert)");

  let reasoning = `"${text.length > 200 ? text.slice(0, 200) + "…" : text}" — `;

  if (matchedLevels.length === 0) {
    reasoning +=
      "No keyword patterns matched any proficiency level. Defaulting to Level 1 (aware) with low confidence. ";
    reasoning +=
      "Try adding detail about what you've actually done: what you built, how you used it, the context, and the outcomes. ";
  } else {
    reasoning += `Matched ${bestScore} signal(s) across: ${matchedLevels.join(", ")}. `;
    reasoning += `Highest match: Level ${bestLevel}. `;
  }

  reasoning += `Confidence: ${Math.round(confidence * 100)}%. `;

  if (confidence < 0.5) {
    reasoning +=
      "Low confidence — the description is brief or uses aspirational language. ";
    reasoning +=
      "For a better assessment, describe concrete experiences with this skill. ";
  } else if (confidence >= 0.8) {
    reasoning += "Good confidence based on specific, concrete signals. ";
  } else {
    reasoning += "Moderate confidence based on the signals detected. ";
  }

  // Add role context if not the default
  if (targetRole !== "Product Manager") {
    reasoning += `Context: "${targetRole}" role.`;
  }

  return {
    level: bestLevel as ProficiencyLevel,
    confidence,
    reasoning,
  };
}

// ─── Batch inference ────────────────────────────────────────────────────────

/**
 * Run mock inference across multiple skill descriptions.
 * Returns a map from skillId to MockInferenceResult.
 */
export function mockInferAllSkills(
  inputs: Array<{ skillId: string; description: string }>,
  targetRole: string
): Record<string, MockInferenceResult> {
  const results: Record<string, MockInferenceResult> = {};

  for (const input of inputs) {
    results[input.skillId] = mockInferSkillLevel(
      input.skillId,
      input.skillId, // skill name defaults to ID when not available
      input.description,
      "delivery" as SkillCategory, // category inferred from skill registry in real impl
      targetRole
    );
  }

  return results;
}

// ─── Guards ─────────────────────────────────────────────────────────────────

/**
 * Check if the real OpenAI production path is available.
 */
export function isRealAiAvailable(): boolean {
  const key = process.env.OPENAI_API_KEY;
  return !!(key && key.startsWith("sk-") && key.length > 20);
}

/**
 * Get the current AI mode from environment.
 */
export function getAiMode(): "auto" | "mock" | "production" {
  return (process.env.AI_MODE || "auto") as "auto" | "mock" | "production";
}
