import type { AssessmentInput, AssessmentResult, Skill, SkillGap, SkillCategory, ProficiencyLevel } from "@/types";
import {
  PM_SKILLS,
  getExpectedProficiency,
  getBenchmark,
  REGIONAL_BENCHMARKS,
  PM_CAREER_LADDER,
} from "@/lib/competency-model";
import { inferAllSkills } from "@/lib/ai";

/**
 * Scoring weights by target role
 */
const ROLE_WEIGHTS: Record<string, Record<SkillCategory, number>> = {
  "Associate Product Manager": {
    strategy: 15,
    discovery: 30,
    delivery: 25,
    analytics: 20,
    ai: 5,
    leadership: 5,
  },
  "Product Manager": {
    strategy: 20,
    discovery: 25,
    delivery: 25,
    analytics: 15,
    ai: 10,
    leadership: 5,
  },
  "Senior Product Manager": {
    strategy: 25,
    discovery: 15,
    delivery: 25,
    analytics: 15,
    ai: 10,
    leadership: 10,
  },
  "Lead Product Manager": {
    strategy: 20,
    discovery: 15,
    delivery: 25,
    analytics: 15,
    ai: 15,
    leadership: 10,
  },
  "Group Product Manager": {
    strategy: 25,
    discovery: 10,
    delivery: 20,
    analytics: 15,
    ai: 15,
    leadership: 15,
  },
  "Director of Product": {
    strategy: 30,
    discovery: 10,
    delivery: 15,
    analytics: 10,
    ai: 10,
    leadership: 25,
  },
  "VP Product": {
    strategy: 40,
    discovery: 5,
    delivery: 10,
    analytics: 10,
    ai: 10,
    leadership: 25,
  },
  "CPO": {
    strategy: 40,
    discovery: 5,
    delivery: 10,
    analytics: 10,
    ai: 10,
    leadership: 25,
  },
};

/**
 * Score a single skill (0-5) → 0-100 scale
 */
export function scoreToPercentage(level: ProficiencyLevel): number {
  return Math.round((level / 5) * 100);
}

/**
 * Compute the overall assessment result from input
 */
export async function computeAssessmentResult(
  input: AssessmentInput,
  userId: string
): Promise<AssessmentResult> {
  const { targetRole, targetTrack, region, selfAssessment, aiInferenceInputs } = input;

  // Step 1: Infer skill levels from AI inputs
  const aiInferences = await inferAllSkills(aiInferenceInputs, targetRole);

  // Simplified version for testing - skip AI inference for now
  const skillLevels: Record<string, { level: ProficiencyLevel; isAiInferred: boolean; confidence: number; reasoning: string }> = {};

  Object.entries(selfAssessment).forEach(([skillId, level]) => {
    skillLevels[skillId] = {
      level: (level ?? 0) as ProficiencyLevel,
      isAiInferred: false,
      confidence: 0.5,
      reasoning: "Self-reported",
    };
  });

  // Step 3: Build skill objects with levels
  const skills: Skill[] = Object.entries(PM_SKILLS).map(([id, skill]) => {
    const levelData = skillLevels[id];
    return {
      ...skill,
      level: levelData?.level || 0,
      isAiInferred: levelData?.isAiInferred || false,
      aiConfidence: levelData?.confidence || 0,
      evidence: levelData?.reasoning,
    };
  });

  // Step 4: Compute competency area scores
  const competencyScores: Record<SkillCategory, { average: number; skills: Skill[] }> = {} as any;

  const categories: SkillCategory[] = ["strategy", "discovery", "delivery", "analytics", "ai", "leadership"];

  categories.forEach((cat) => {
    const catSkills = skills.filter((s) => s.category === cat);
    const avg = catSkills.length > 0
      ? catSkills.reduce((sum, s) => sum + s.level, 0) / catSkills.length
      : 0;
    competencyScores[cat] = {
      average: Math.round(avg * 10) / 10, // Round to 1 decimal
      skills: catSkills,
    };
  });

  // Step 5: Compute overall score (weighted by role)
  const weights = ROLE_WEIGHTS[targetRole] || {
    strategy: 20,
    discovery: 20,
    delivery: 25,
    analytics: 15,
    ai: 10,
    leadership: 10,
  };

  let weightedSum = 0;
  let totalWeight = 0;

  categories.forEach((cat) => {
    const weight = weights[cat] || 10;
    const score = competencyScores[cat]?.average || 0;
    weightedSum += (score / 5) * weight; // Normalize to 0-1, then weight
    totalWeight += weight;
  });

  const overallScore = totalWeight > 0
    ? Math.round((weightedSum / totalWeight) * 100)
    : 0;

  // Step 6: Skill ranking (by score, descending)
  const skillRanking = [...skills].sort((a, b) => b.level - a.level);

  // Step 7: Identify strengths, gaps, and missing skills
  const expectedProficiency = getExpectedProficiency(targetRole) || {};
  const benchmarks = getBenchmark(region, targetRole);

  const strengths: Skill[] = [];
  const gaps: SkillGap[] = [];
  const missingSkills: Skill[] = [];

  skills.forEach((skill) => {
    const targetLevel: ProficiencyLevel = (expectedProficiency[skill.category] || 2) as ProficiencyLevel;
    const benchmark = benchmarks?.[skill.category]?.average || 2.5;
    const gapSize = targetLevel - skill.level;

    if (gapSize <= -1) {
      // Strength: 1+ level above target
      strengths.push(skill);
    } else if (gapSize >= 3) {
      // Critical missing: 3+ levels below target
      missingSkills.push(skill);
    } else if (gapSize >= 1) {
      // Gap: 1-2 levels below target
      const priority = gapSize >= 2 ? "important" : "nice-to-have";
      gaps.push({
        skill,
        currentLevel: skill.level,
        targetLevel: targetLevel as ProficiencyLevel,
        gapSize,
        priority,
        benchmark,
        note: skill.isAiInferred
          ? `Based on your description, we assessed this at level ${skill.level}. The ${targetRole} benchmark is level ${targetLevel}.`
          : `Your self-assessment is level ${skill.level}. The ${targetRole} benchmark is level ${targetLevel}.`,
      });
    }
  });

  // Sort gaps by priority and gap size
  gaps.sort((a, b) => {
    const priorityOrder = { critical: 0, important: 1, "nice-to-have": 2 };
    const diff = priorityOrder[a.priority] - priorityOrder[b.priority];
    if (diff !== 0) return diff;
    return b.gapSize - a.gapSize;
  });

  // Step 8: Build inference notes
  const aiInferenceNotes: Record<string, string> = {};
  Object.entries(skillLevels)
    .filter(([_, data]) => data.isAiInferred)
    .forEach(([skillId, data]) => {
      aiInferenceNotes[skillId] = data.reasoning;
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
    gaps: gaps.slice(0, 10), // Top 10 gaps
    missingSkills,
    aiInferenceNotes,
    createdAt: new Date(),
    completedAt: new Date(),
  };
}
