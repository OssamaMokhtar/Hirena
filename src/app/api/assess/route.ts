import { NextResponse } from "next/server";
import { computeAssessmentResult } from "@/lib/scoring-engine";
import { inferAllSkills } from "@/lib/ai";
import type { AssessmentInput } from "@/types";

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

    // Run AI inference if the user provided inference inputs
    let aiInferenceResults: Record<string, { level: number; confidence: number; reasoning: string }> | undefined;
    if (input.aiInferenceInputs.length > 0) {
      aiInferenceResults = await inferAllSkills(input.aiInferenceInputs, input.targetRole);
    }

    const result = computeAssessmentResult(input, "demo-user", aiInferenceResults);

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
