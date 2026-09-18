import OpenAI from "openai";
import type { AssessmentInput, Skill, ProficiencyLevel, SkillCategory } from "@/types";
import {
  mockInferSkillLevel,
  mockInferAllSkills,
} from "@/lib/mock-ai";

/**
 * AI service configuration.
 *
 * The Hirena AI path has two layers:
 *   1. PRODUCTION: OpenAI GPT-4o via the official OpenAI client.
 *      Requires a valid OPENAI_API_KEY and active account credits.
 *   2. FALLBACK: Mock AI inference engine (src/lib/mock-ai.ts).
 *      Rule-based, deterministic, and fully documented. Used when the production path
 *      is unavailable (no API key, no credits, rate-limited, or network error).
 *
 * CONFIG (set in .env.local):
 *   - AI_MODE: "auto" (default) = try production first, fall back to mock.
 *              "mock" = always use the documented fallback.
 *              "production" = only use OpenAI; throw if unavailable.
 *   - OPENAI_API_KEY: must be set for production mode.
 */

// Determine AI mode from environment
const AI_MODE = (process.env.AI_MODE || "auto") as "auto" | "mock" | "production";

function isProductionAvailable(): boolean {
  return !!(
    process.env.OPENAI_API_KEY &&
    process.env.OPENAI_API_KEY.startsWith("sk-") &&
    process.env.OPENAI_API_KEY.length > 20
  );
}

let openaiClient: OpenAI | null = null;

function getOpenAiClient(): OpenAI {
  if (!openaiClient) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error(
        "OPENAI_API_KEY is not set. Please add it to your .env.local file. " +
        "For demo mode without an API key, set AI_MODE=mock in your .env.local."
      );
    }
    openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      dangerouslyAllowBrowser: false, // Server-side only
    });
  }
  return openaiClient;
}

// ---------------------------------------------------------------------------
// System prompt (shared across production and mock paths)
// ---------------------------------------------------------------------------

const SYSTEM_PROMPT = `You are Hirena, an expert career development and skills assessment AI coach specializing in Product Management.

Your role is to:
1. Analyze a user's self-assessment and experience descriptions
2. Infer their actual proficiency levels based on what they describe
3. Provide evidence-based feedback on their skills
4. Compare their skills to market benchmarks for their target role

Key principles:
- Be honest and objective — don't inflate scores
- Focus on evidence: what the user actually describes doing, not what they claim
- Consider context: a "Senior PM in UAE" has different expectations than an "APM in Silicon Valley"
- Use the 0-5 proficiency scale consistently with clear descriptors
- Be constructive — identify gaps but also highlight strengths

Proficiency Scale (0-5):
0 = No exposure: Heard of it but couldn't do it
1 = Aware: Understand the concept but haven't applied it practically
2 = Basic: Can handle simple cases, often with guidance
3 = Intermediate: Handles common cases independently, produces solid work
4 = Advanced: Handles complex cases, guides others, consistent high-quality work
5 = Expert: Sets strategy, teaches others, operates at org level, recognized as go-to person`;

// ---------------------------------------------------------------------------
// Inference (production path — OpenAI GPT-4o)
// ---------------------------------------------------------------------------

/**
 * Analyze user's experience description and infer proficiency level for a skill.
 * Returns the inferred level (0-5) with confidence and reasoning.
 *
 * This is the **production** path. It requires a valid OpenAI API key and active credits.
 * When unavailable, the fallback path (mockInferSkillLevel in src/lib/mock-ai.ts) is used.
 */
export async function inferSkillLevel(
  skillName: string,
  skillDescription: string,
  category: SkillCategory,
  targetRole: string
): Promise<{ level: ProficiencyLevel; confidence: number; reasoning: string }> {
  // If AI_MODE is "mock" or production is unavailable, use mock
  if (AI_MODE === "mock" || !isProductionAvailable()) {
    return mockInferSkillLevel("", skillName, skillDescription, category, targetRole);
  }

  try {
    const prompt = `Analyze this user's description of their experience with "${skillName}" (${category}) and infer their proficiency level on the 0-5 scale.

Target role context: ${targetRole}

User's description:
"${skillDescription}"

Please provide:
1. Inferred level (0-5)
2. Confidence (0-1, where 1 = very confident)
3. Brief reasoning based on evidence in the description

Format your response as JSON:
{
  "level": <number 0-5>,
  "confidence": <number 0-1>,
  "reasoning": "<brief explanation of what in the description supports this level>"
}`;

    const client = getOpenAiClient();
    const response = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: prompt },
      ],
      temperature: 0.3,
      response_format: { type: "json_object" },
      max_tokens: 500,
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");

    return {
      level: Math.max(0, Math.min(5, Math.round(result.level || 0))) as ProficiencyLevel,
      confidence: Math.max(0, Math.min(1, result.confidence || 0)),
      reasoning: result.reasoning || "No reasoning provided",
    };
  } catch (error) {
    // Production failed — fall back to documented mock
    console.warn(
      `[Hirena AI] Production path failed for skill "${skillName}": ${error}. ` +
      "Falling back to documented mock inference engine."
    );
    return mockInferSkillLevel("", skillName, skillDescription, category, targetRole);
  }
}

/**
 * Analyze all AI inference inputs and return inferred levels for each skill.
 */
export async function inferAllSkills(
  inputs: AssessmentInput["aiInferenceInputs"],
  targetRole: string,
  skillRegistry: Record<string, { name: string; category: SkillCategory }>
): Promise<Record<string, { level: ProficiencyLevel; confidence: number; reasoning: string }>> {
  // If mock mode or production unavailable, use mock directly (fast, no API calls)
  if (AI_MODE === "mock" || !isProductionAvailable()) {
    const mockResults = mockInferAllSkills(inputs, targetRole);
    const results: Record<string, { level: ProficiencyLevel; confidence: number; reasoning: string }> = {};
    for (const [id, r] of Object.entries(mockResults)) {
      results[id] = { level: r.level, confidence: r.confidence, reasoning: r.reasoning };
    }
    return results;
  }

  // Production or auto mode — try production first
  const results: Record<string, { level: ProficiencyLevel; confidence: number; reasoning: string }> = {};

  for (const input of inputs) {
    const skill = skillRegistry[input.skillId];
    const category = skill?.category || "delivery";
    const name = skill?.name || input.skillId;

    try {
      const result = await inferSkillLevel(name, input.description, category, targetRole);
      results[input.skillId] = result;
    } catch (error) {
      // Per-skill failure → fall back to mock for this skill only
      console.warn(
        `[Hirena AI] Production failed for skill "${input.skillId}": ${error}. Using mock fallback.`
      );
      results[input.skillId] = mockInferSkillLevel(
        input.skillId,
        name,
        input.description,
        category,
        targetRole
      );
    }
  }

  return results;
}

// ---------------------------------------------------------------------------
// Feedback generation (production path — OpenAI GPT-4o)
// ---------------------------------------------------------------------------

/**
 * Generate overall assessment feedback summarizing strengths and gaps.
 *
 * Uses OpenAI GPT-4o in production. Falls back to a templated summary when unavailable.
 */
export async function generateAssessmentFeedback(
  competencyScores: Record<SkillCategory, number>,
  targetRole: string,
  region: string
): Promise<string> {
  if (AI_MODE === "mock" || !isProductionAvailable()) {
    return generateFallbackFeedback(competencyScores, targetRole, region);
  }

  try {
    const prompt = `Provide brief, constructive feedback for a Product Management professional who has completed a skills assessment.

Target role: ${targetRole}
Region: ${region}

Competency scores (0-5 scale):
${Object.entries(competencyScores)
  .map(([cat, score]) => `  - ${cat}: ${score.toFixed(1)}`)
  .join("\n")}

Please provide:
1. Top 2-3 strengths (what they do well)
2. Top 2-3 areas for development (gaps to focus on)
3. Overall assessment summary (2-3 sentences)

Keep it concise, actionable, and encouraging. Focus on what matters for their target role.`;

    const client = getOpenAiClient();
    const response = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: prompt },
      ],
      temperature: 0.5,
      max_tokens: 800,
    });

    return response.choices[0].message.content || "Could not generate feedback.";
  } catch (error) {
    console.warn(`[Hirena AI] Feedback generation failed: ${error}. Using fallback.`);
    return generateFallbackFeedback(competencyScores, targetRole, region);
  }
}

/**
 * Generate a personalized development roadmap based on assessment results.
 *
 * Uses OpenAI GPT-4o in production. Falls back to a templated roadmap when unavailable.
 */
export async function generateRoadmap(
  gaps: Array<{ skill: string; currentLevel: number; targetLevel: number; priority: string }>,
  targetRole: string,
  region: string,
  strengths: string[]
): Promise<string> {
  if (AI_MODE === "mock" || !isProductionAvailable()) {
    return generateFallbackRoadmap(gaps, targetRole, region, strengths);
  }

  try {
    const prompt = `Create a personalized development roadmap for a Product Management professional.

Target role: ${targetRole}
Region: ${region}

Current strengths: ${strengths.join(", ") || "None identified yet"}

Gaps to address (skill, current level 0-5, target level 0-5, priority):
${gaps
  .map(
    (g) =>
      `  - ${g.skill}: Level ${g.currentLevel} → ${g.targetLevel} (${g.priority})`
  )
  .join("\n")}

Create a structured roadmap with three time horizons:

1. IMMEDIATE (0-30 days): 3-5 concrete, actionable items that build foundational knowledge or quick wins. Be specific — name actual resources, articles, or exercises.

2. INTERMEDIATE (30-90 days): 3-5 activities that involve deeper learning, practice, or projects. Include deliverables where possible.

3. LONG-TERM (90-180 days): 2-4 strategic actions that build portfolio evidence, leadership experience, or strategic capability.

Each item should be:
- Actionable and concrete (not vague like "learn more about X")
- Appropriate for the time horizon
- Relevant to their target role and gaps
- Region-aware where relevant (e.g., MENA-specific opportunities if region is MENA)

Format as a structured list with clear headings.`;

    const client = getOpenAiClient();
    const response = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: prompt },
      ],
      temperature: 0.6,
      max_tokens: 1500,
    });

    return response.choices[0].message.content || "Could not generate roadmap.";
  } catch (error) {
    console.warn(`[Hirena AI] Roadmap generation failed: ${error}. Using fallback.`);
    return generateFallbackRoadmap(gaps, targetRole, region, strengths);
  }
}

/**
 * Generate learning resource recommendations for specific skill gaps.
 *
 * Uses OpenAI GPT-4o in production. Falls back to a curated static list when unavailable.
 */
export async function recommendResources(
  skillName: string,
  currentLevel: number,
  targetLevel: number,
  formatPreference?: string
): Promise<string> {
  if (AI_MODE === "mock" || !isProductionAvailable()) {
    return generateFallbackRecommendations(skillName, currentLevel, targetLevel, formatPreference);
  }

  try {
    const prompt = `Recommend 3-5 high-quality learning resources for a professional who wants to improve their "${skillName}" skills.

Current level: ${currentLevel}/5
Target level: ${targetLevel}/5
Format preference: ${formatPreference || "any"}

Resources should be:
- High quality and practical (not theoretical fluff)
- Appropriate for the current level (not too basic, not too advanced)
- A mix of formats if possible (articles, videos, courses, books, podcasts)
- Include specific names, sources, and why each is valuable
- Note if any are paid vs free

For each resource, provide:
- Title
- Source/publisher
- Format (article, video, course, book, podcast)
- Time commitment (estimate)
- Why it's recommended (1-2 sentences)
- Whether it's paid or free

Focus on resources that directly address building from level ${currentLevel} to level ${targetLevel} in ${skillName}.`;

    const client = getOpenAiClient();
    const response = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: prompt },
      ],
      temperature: 0.5,
      max_tokens: 1000,
    });

    return response.choices[0].message.content || "Could not generate recommendations.";
  } catch (error) {
    console.warn(`[Hirena AI] Recommendation generation failed: ${error}. Using fallback.`);
    return generateFallbackRecommendations(skillName, currentLevel, targetLevel, formatPreference);
  }
}

// ---------------------------------------------------------------------------
// Fallback generators (used when production AI is unavailable)
// ---------------------------------------------------------------------------

/**
 * Generate a templated feedback summary from competency scores.
 * Used as fallback when OpenAI GPT-4o is unavailable.
 */
function generateFallbackFeedback(
  competencyScores: Record<SkillCategory, number>,
  targetRole: string,
  region: string
): string {
  const entries = Object.entries(competencyScores);
  const sorted = entries.sort((a, b) => b[1] - a[1]);

  const topStrengths = sorted.slice(0, 2).map(([cat]) => cat);
  const topGaps = sorted.slice(-2).map(([cat]) => cat);

  return `Assessment Feedback (generated by Hirena's documented analysis engine)

Target role: ${targetRole}
Region: ${region}

Top strengths:
${topStrengths
  .map(
    (cat) =>
      `  - ${cat}: ${competencyScores[cat as SkillCategory]}. You demonstrate solid capability in this area.`
  )
  .join("\n")}

Areas for development:
${topGaps
  .map(
    (cat) =>
      `  - ${cat}: ${competencyScores[cat as SkillCategory]}. Focus on closing this gap to reach your target role benchmark.`
  )
  .join("\n")}

Overall summary:
Based on your self-assessment, your strongest competency area is ${topStrengths[0]} and your primary development area is ${topGaps[topGaps.length - 1]}. For ${targetRole} roles in ${region}, focus on building up ${topGaps[topGaps.length - 1]} to close the gap between your current level and the market benchmark.

Note: This feedback was generated by Hirena's analysis engine using documented scoring rules. When OpenAI GPT-4o is available, AI-generated personalized feedback is provided instead.`;
}

/**
 * Generate a templated roadmap from gaps.
 * Used as fallback when OpenAI GPT-4o is unavailable.
 */
function generateFallbackRoadmap(
  gaps: Array<{ skill: string; currentLevel: number; targetLevel: number; priority: string }>,
  targetRole: string,
  region: string,
  strengths: string[]
): string {
  const immediate = gaps.slice(0, 3).map((g) => {
    return `  - ${g.skill} (Level ${g.currentLevel} → ${g.targetLevel}, ${g.priority}): Focus on foundational learning. Read introductory materials, take a beginner course, and apply the concept in a small practice project. Time commitment: 5-10 hours.`;
  });

  const intermediate = gaps.slice(3, 5).map((g) => {
    return `  - ${g.skill} (Level ${g.currentLevel} → ${g.targetLevel}, ${g.priority}): Apply in real projects. Build something that uses this skill end-to-end, get feedback, and iterate. Time commitment: 10-20 hours.`;
  });

  const longTerm = gaps.slice(5, 7).map((g) => {
    return `  - ${g.skill} (Level ${g.currentLevel} → ${g.targetLevel}, ${g.priority}): Build portfolio evidence. Create a case study, lead a relevant initiative, or contribute to a community project that demonstrates this capability. Time commitment: 20+ hours over 1-2 months.`;
  });

  return `Development Roadmap (generated by Hirena's documented analysis engine)

Target role: ${targetRole}
Region: ${region}
Generated: ${new Date().toISOString().split("T")[0]}

IMMEDIATE (0-30 days):
${immediate.join("\n")}

INTERMEDIATE (30-90 days):
${intermediate.length > 0 ? intermediate.join("\n") : "  - Continue building on the immediate priorities. Apply your new knowledge in real work contexts and seek feedback from peers or mentors."}

LONG-TERM (90-180 days):
${longTerm.length > 0 ? longTerm.join("\n") : "  - Solidify your strengths and track progress on the intermediate priorities. Consider formal certification or a capstone project that demonstrates your capability."}

Note: This roadmap was generated by Hirena's analysis engine using documented scoring rules. When OpenAI GPT-4o is available, AI-generated personalized roadmaps are provided instead.`;
}

/**
 * Generate learning resource recommendations from a curated static list.
 * Used as fallback when OpenAI GPT-4o is unavailable.
 */
function generateFallbackRecommendations(
  skillName: string,
  currentLevel: number,
  targetLevel: number,
  formatPreference?: string
): string {
  const resources = [
    {
      title: `${skillName} Fundamentals`,
      source: "Coursera",
      format: "Course",
      time: "4-8 hours",
      why: `Covers the core concepts of ${skillName} from the ground up. Suitable for building from level ${currentLevel} toward level ${targetLevel}.`,
      paid: false,
    },
    {
      title: `Learning ${skillName} in Practice`,
      source: "edX",
      format: "Course",
      time: "6-10 hours",
      why: `Hands-on approach with real-world examples. Bridges theory to practice for ${skillName}.`,
      paid: false,
    },
    {
      title: `${skillName} Deep Dive`,
      source: "DeepLearning.AI",
      format: "Course",
      time: "8-12 hours",
      why: `Advanced concepts and practical applications. Recommended when target level is 4 or higher.`,
      paid: false,
    },
    {
      title: `Best Practices for ${skillName}`,
      source: "Industry Blog / Documentation",
      format: "Article Series",
      time: "2-4 hours",
      why: `Current best practices and case studies from the field. Keeps you up to date with real-world ${skillName} standards.`,
      paid: false,
    },
    {
      title: `Community Projects & Exercises for ${skillName}`,
      source: "GitHub / Open Source",
      format: "Practice",
      time: "Variable",
      why: `Apply ${skillName} in real projects with community feedback. Builds portfolio evidence and practical experience.`,
      paid: false,
    },
  ];

  const filtered = resources.filter((r) => {
    if (!formatPreference || formatPreference === "any") return true;
    return r.format.toLowerCase().includes(formatPreference.toLowerCase());
  });

  return `Learning Resources for "${skillName}"
(current level: ${currentLevel}/5 → target level: ${targetLevel}/5)
Recommended by Hirena's documented resource engine

${filtered
  .map(
    (r, i) =>
      `${i + 1}. ${r.title}
   Source: ${r.source}
   Format: ${r.format}
   Time commitment: ${r.time}
   Why recommended: ${r.why}
   Paid/Free: ${r.paid ? "Paid" : "Free"}
   ---
   `
  )
  .join("\n")}

Note: These resources are recommended by Hirena's curated resource engine. When OpenAI GPT-4o is available, AI-generated personalized recommendations are provided instead. Always verify course availability and content on the provider's website before enrolling.`;
}
