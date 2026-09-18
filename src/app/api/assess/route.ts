import { NextResponse } from "next/server";
import { computeAssessmentResult } from "@/lib/scoring-engine";
import { inferAllSkills } from "@/lib/ai";
import { saveAssessment, getUserAssessments } from "@/lib/db";
import { getCurrentUser } from "@/lib/user-service";
import { ROLE_COMPETENCY_MODELS } from "@/lib/competency-models/index";
import type { AssessmentInput } from "@/types";
import type { SkillCategory } from "@/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input: AssessmentInput = {
      targetRole: body.targetRole || "Product Manager",
      targetTrack: body.targetTrack || "product-management",
      region: body.region || "MENA",
      selfAssessment: body.selfAssessment || {},
      aiInferenceInputs: body.aiInferenceInputs || [],
    };

    if (!body.targetRole) {
      return NextResponse.json({ error: "targetRole is required" }, { status: 400 });
    }

    // Get current user (for saving results)
    const user = await getCurrentUser();
    const userId = user?.id || "demo-user";

    // Build skill registry from all competency models for AI inference
    const skillRegistry: Record<string, { name: string; category: SkillCategory }> = {};
    for (const model of Object.values(ROLE_COMPETENCY_MODELS)) {
      if (model.skills) {
        for (const [id, skill] of Object.entries(model.skills)) {
          skillRegistry[id] = { name: skill.name, category: skill.category as SkillCategory };
        }
      }
    }

    // Run AI inference if the user provided inference inputs
    // AI can return a streaming response — ensure we have results before proceeding
    let aiInferenceResults: Record<string, { level: number; confidence: number; reasoning: string }> | undefined;
    if (input.aiInferenceInputs.length > 0) {
      const aiResults = await inferAllSkills(input.aiInferenceInputs, input.targetRole, skillRegistry);
      // Filter out any undefined results (shouldn't happen, but be safe)
      aiInferenceResults = Object.fromEntries(
        Object.entries(aiResults).filter(([, v]) => v !== undefined)
      ) as Record<string, { level: number; confidence: number; reasoning: string }>;
    }

    const result = computeAssessmentResult(input, userId, aiInferenceResults);

    // Save to database if user is signed in and Supabase is configured
    if (user && typeof user.id === "string") {
      const saveResult = await saveAssessment(userId, {
        id: result.id,
        targetRole: result.targetRole,
        targetTrack: result.targetTrack,
        region: result.region,
        overallScore: result.overallScore,
        competencyScores: result.competencyScores as unknown as Record<string, { average: number; skills: unknown[] }>,
        strengths: result.strengths as unknown as Array<{ id: string; name: string; level: number; category: string }>,
        gaps: result.gaps.map(g => ({
          skillId: g.skill.id,
          currentLevel: g.currentLevel,
          targetLevel: g.targetLevel,
          gapSize: g.gapSize,
          priority: g.priority,
        })),
        missingSkills: result.missingSkills as unknown as Array<{ id: string; name: string; level: number; category: string }>,
        roadmap: { immediateActions: [], intermediateActions: [], longTermActions: [] },
        selfAssessment: Object.fromEntries(Object.entries(input.selfAssessment).map(([k, v]) => [k, Number(v)])),
        aiInferenceInputs: input.aiInferenceInputs,
      });
      if (!saveResult.success) {
        console.warn("[Assessment API] Failed to save assessment:", saveResult.error);
      }
    }

    return NextResponse.json({ success: true, result }, { status: 200 });
  } catch (error) {
    console.error("Assessment API error:", error);
    const message = error instanceof Error ? error.message : String(error);
    const stack = error instanceof Error ? error.stack : undefined;
    // In development, return details so we can debug
    const isDev = process.env.NODE_ENV !== "production";
    return NextResponse.json(
      {
        error: "Failed to compute assessment. Please try again.",
        ...(isDev && { details: message, stack }),
      },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    // If no userId provided, try to get current user
    const actualUserId = userId || (await getCurrentUser())?.id || "demo-user";

    const assessments = await getUserAssessments(actualUserId);

    return NextResponse.json({
      success: true,
      assessments: assessments.map((a) => ({
        id: a.id,
        targetRole: a.target_role,
        targetTrack: a.target_track,
        region: a.region,
        overallScore: a.overall_score,
        competencyScores: JSON.parse(a.competency_scores || "{}"),
        strengths: JSON.parse(a.strengths || "[]"),
        gaps: JSON.parse(a.gaps || "[]"),
        missingSkills: JSON.parse(a.missing_skills || "[]"),
        roadmap: JSON.parse(a.roadmap || "{}"),
        createdAt: a.created_at,
      })),
      count: assessments.length,
    });
  } catch (error) {
    console.error("Get assessments error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve assessments." },
      { status: 500 }
    );
  }
}
