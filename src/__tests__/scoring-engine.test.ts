import { describe, it, expect } from "vitest";
import { computeAssessmentResult } from "@/lib/scoring-engine";
import { PM_SKILLS } from "@/lib/competency-model";
import type { AssessmentInput, ProficiencyLevel, SkillCategory } from "@/types";

function input(level: ProficiencyLevel): AssessmentInput {
  const selfAssessment: Record<string, ProficiencyLevel> = {};
  for (const id of Object.keys(PM_SKILLS)) selfAssessment[id] = level;
  return { targetRole: "Senior Product Manager", targetTrack: "product-management", region: "MENA", selfAssessment, aiInferenceInputs: [] };
}

// Strip fields that are meant to vary per run (id, timestamps).
function stable(r: ReturnType<typeof computeAssessmentResult>) {
  const { id: _id, createdAt: _c, completedAt: _d, ...rest } = r as unknown as Record<string, unknown>;
  return rest;
}

describe("scoring engine", () => {
  it("is deterministic for the same input", () => {
    const a = computeAssessmentResult(input(3), "u1");
    const b = computeAssessmentResult(input(3), "u1");
    expect(stable(a)).toEqual(stable(b));
  });

  it("scores all-zero below all-five", () => {
    const low = computeAssessmentResult(input(0), "u1").overallScore;
    const high = computeAssessmentResult(input(5), "u1").overallScore;
    expect(low).toBeLessThan(high);
  });

  it("labels AI-inferred skills and keeps self-reported ones as self-reported", () => {
    const firstId = Object.keys(PM_SKILLS)[0];
    const r = computeAssessmentResult(input(2), "u1", { [firstId]: { level: 4, confidence: 0.7, reasoning: "test" } });
    const all = Object.values(r.competencyScores ?? {}).flatMap((c: { skills?: Array<{ id: string; isAiInferred?: boolean }> }) => c.skills ?? []);
    const inferred = all.filter((s) => s.isAiInferred);
    expect(inferred.map((s) => s.id)).toContain(firstId);
    expect(inferred.length).toBe(1);
  });
});

describe("AI fallback honesty", () => {
  it("labels rule-based fallback results so they are never shown as model output", async () => {
    delete process.env.OPENAI_API_KEY;
    const { inferAllSkills, FALLBACK_LABEL } = await import("@/lib/ai");
    const firstId = Object.keys(PM_SKILLS)[0];
    const out = await inferAllSkills(
      [{ skillId: firstId, description: "Led discovery for two launches and ran 30 user interviews." }],
      "Senior Product Manager",
      { [firstId]: { name: PM_SKILLS[firstId].name, category: PM_SKILLS[firstId].category as SkillCategory } }
    );
    expect(out[firstId].reasoning.startsWith(FALLBACK_LABEL)).toBe(true);
  });
});
