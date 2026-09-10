import OpenAI from "openai";
import type { AssessmentInput, Skill, ProficiencyLevel, SkillCategory } from "@/types";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is not set. Please add it to your .env.local file.");
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: false, // Server-side only
});

// System prompt for Hirena AI career coach
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

/**
 * Analyze user's experience description and infer proficiency level for a skill.
 * Returns the inferred level (0-5) with confidence and reasoning.
 */
export async function inferSkillLevel(
  skillName: string,
  skillDescription: string,
  category: SkillCategory,
  targetRole: string
): Promise<{ level: ProficiencyLevel; confidence: number; reasoning: string }> {
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

  const response = await openai.chat.completions.create({
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
}

/**
 * Analyze all AI inference inputs and return inferred levels for each skill.
 */
export async function inferAllSkills(
  inputs: AssessmentInput["aiInferenceInputs"],
  targetRole: string
): Promise<Record<string, { level: ProficiencyLevel; confidence: number; reasoning: string }>> {
  const results: Record<string, { level: ProficiencyLevel; confidence: number; reasoning: string }> = {};

  // Process each skill inference sequentially (can be batched in production)
  for (const input of inputs) {
    const result = await inferSkillLevel(
      input.skillId, // We'll need to map this to skill name in practice
      input.description,
      "delivery" as SkillCategory, // Default category, should be passed in
      targetRole
    );
    results[input.skillId] = result;
  }

  return results;
}

/**
 * Generate overall assessment feedback summarizing strengths and gaps.
 */
export async function generateAssessmentFeedback(
  competencyScores: Record<SkillCategory, number>,
  targetRole: string,
  region: string
): Promise<string> {
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

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: prompt },
    ],
    temperature: 0.5,
    max_tokens: 800,
  });

  return response.choices[0].message.content || "Could not generate feedback.";
}

/**
 * Generate a personalized development roadmap based on assessment results.
 */
export async function generateRoadmap(
  gaps: Array<{ skill: string; currentLevel: number; targetLevel: number; priority: string }>,
  targetRole: string,
  region: string,
  strengths: string[]
): Promise<string> {
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

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: prompt },
    ],
    temperature: 0.6,
    max_tokens: 1500,
  });

  return response.choices[0].message.content || "Could not generate roadmap.";
}

/**
 * Generate learning resource recommendations for specific skill gaps.
 */
export async function recommendResources(
  skillName: string,
  currentLevel: number,
  targetLevel: number,
  formatPreference?: string
): Promise<string> {
  const prompt = `Recommend 3-5 high-quality learning resources for a Product Management professional who wants to improve their "${skillName}" skills.

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

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: prompt },
    ],
    temperature: 0.5,
    max_tokens: 1000,
  });

  return response.choices[0].message.content || "Could not generate recommendations.";
}
