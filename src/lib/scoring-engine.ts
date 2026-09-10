import type { AssessmentInput, AssessmentResult, Skill, SkillGap, SkillCategory, ProficiencyLevel } from "@/types";
import {
  PM_SKILLS,
  getExpectedProficiency,
  getBenchmark,
} from "@/lib/competency-model";

/**
 * Scoring weights by target role
 */
const ROLE_WEIGHTS: Record<string, Record<SkillCategory, number>> = {
  "Associate Product Manager": { strategy: 15, discovery: 30, delivery: 25, analytics: 20, ai: 5, leadership: 5 },
  "Product Manager": { strategy: 20, discovery: 25, delivery: 25, analytics: 15, ai: 10, leadership: 5 },
  "Senior Product Manager": { strategy: 25, discovery: 15, delivery: 25, analytics: 15, ai: 10, leadership: 10 },
  "Lead Product Manager": { strategy: 20, discovery: 15, delivery: 25, analytics: 15, ai: 15, leadership: 10 },
  "Group Product Manager": { strategy: 25, discovery: 10, delivery: 20, analytics: 15, ai: 15, leadership: 15 },
  "Director of Product": { strategy: 30, discovery: 10, delivery: 15, analytics: 10, ai: 10, leadership: 25 },
  "VP Product": { strategy: 40, discovery: 5, delivery: 10, analytics: 10, ai: 10, leadership: 25 },
  "CPO": { strategy: 40, discovery: 5, delivery: 10, analytics: 10, ai: 10, leadership: 25 },
};

/**
 * Compute the overall assessment result from input (sync, no AI calls)
 */
export function computeAssessmentResult(
  input: AssessmentInput,
  userId: string,
  aiInferenceResults?: Record<string, { level: number; confidence: number; reasoning: string }>
): AssessmentResult {
  const { targetRole, targetTrack, region, selfAssessment } = input;

  // Build skill objects with levels from self-assessment, augmented by AI inference
  const skills: Skill[] = Object.entries(PM_SKILLS).map(([id, skill]) => {
    const selfLevel = (selfAssessment[id] ?? 0) as ProficiencyLevel;
    const aiResult = aiInferenceResults?.[id];
    const level: ProficiencyLevel = aiResult ? (aiResult.level as ProficiencyLevel) : selfLevel;
    const isAiInferred = !!aiResult;
    return {
      ...skill,
      level,
      isAiInferred,
      aiConfidence: isAiInferred ? aiResult.confidence : 0,
      evidence: isAiInferred
        ? `AI-inferred (confidence ${Math.round(aiResult.confidence * 100)}%): ${aiResult.reasoning}`
        : "Self-reported",
    };
  });

  // Compute competency area scores
  const categories: SkillCategory[] = ["strategy", "discovery", "delivery", "analytics", "ai", "leadership"];
  const competencyScores: Record<SkillCategory, { average: number; skills: Skill[] }> = {} as any;

  categories.forEach((cat) => {
    const catSkills = skills.filter((s) => s.category === cat);
    const avg = catSkills.length > 0 ? catSkills.reduce((sum, s) => sum + s.level, 0) / catSkills.length : 0;
    competencyScores[cat] = { average: Math.round(avg * 10) / 10, skills: catSkills };
  });

  // Compute overall score (weighted by role)
  const weights = ROLE_WEIGHTS[targetRole] || { strategy: 20, discovery: 20, delivery: 25, analytics: 15, ai: 10, leadership: 10 };
  let weightedSum = 0, totalWeight = 0;
  categories.forEach((cat) => {
    const weight = weights[cat] || 10;
    const score = competencyScores[cat]?.average || 0;
    weightedSum += (score / 5) * weight;
    totalWeight += weight;
  });
  const overallScore = totalWeight > 0 ? Math.round((weightedSum / totalWeight) * 100) : 0;

  // Skill ranking
  const skillRanking = [...skills].sort((a, b) => b.level - a.level);

  // Strengths, gaps, missing
  const expected = getExpectedProficiency(targetRole) || {};
  const benchmarks = getBenchmark(region, targetRole);
  const strengths: Skill[] = [];
  const gaps: SkillGap[] = [];
  const missingSkills: Skill[] = [];

  skills.forEach((skill) => {
    const targetLevel = (expected[skill.category] || 2) as ProficiencyLevel;
    const benchmark = benchmarks?.[skill.category]?.average || 2.5;
    const gapSize = targetLevel - skill.level;
    if (gapSize <= -1) strengths.push(skill);
    else if (gapSize >= 3) missingSkills.push(skill);
    else if (gapSize >= 1) {
      gaps.push({
        skill,
        currentLevel: skill.level,
        targetLevel,
        gapSize,
        priority: gapSize >= 2 ? "important" : "nice-to-have",
        benchmark,
        note: `Your self-assessment is level ${skill.level}. The ${targetRole} benchmark is level ${targetLevel}.`,
      });
    }
  });

  gaps.sort((a, b) => {
    const order = { critical: 0, important: 1, "nice-to-have": 2 };
    const diff = order[a.priority] - order[b.priority];
    return diff !== 0 ? diff : b.gapSize - a.gapSize;
  });

  return {
    id: crypto.randomUUID(),
    userId,
    targetRole,
    targetTrack,
    region,
    overallScore: Math.min(100, Math.max(0, overallScore)),
    competencyScores,
    skillRanking,
    strengths,
    gaps: gaps.slice(0, 10),
    missingSkills,
    aiInferenceNotes: {},
    createdAt: new Date(),
    completedAt: new Date(),
  };
}
