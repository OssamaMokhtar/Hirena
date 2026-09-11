import { NextResponse } from "next/server";
import { fuseResults, FusionInput, FUSION_WEIGHTS } from "@/lib/results-fusion";
import { VoiceAnalysisResult } from "@/lib/voice-analysis";
import { FacialAnalysisResult } from "@/lib/facial-analysis";
import { ContentAnalysisResult } from "@/lib/video-interview";

// Fusion Results API — merges voice + facial + content + self-assessment signals
// This is the core Option 2 endpoint: take all three analysis results and
// produce a unified score with per-signal breakdown.

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input: FusionInput = {
      targetRole: body.targetRole || "software-engineer",
      voiceAnalysis: body.voiceAnalysis as VoiceAnalysisResult | undefined,
      facialAnalysis: body.facialAnalysis as FacialAnalysisResult | undefined,
      contentAnalysis: body.contentAnalysis as ContentAnalysisResult | undefined,
      selfAssessment: body.selfAssessment as number | undefined,
    };

    if (!body.targetRole) {
      return NextResponse.json({ error: "targetRole is required" }, { status: 400 });
    }

    const result = fuseResults(input);

    return NextResponse.json({
      success: true,
      fusion: result,
      weights: FUSION_WEIGHTS,
    });
  } catch (error) {
    console.error("Fusion error:", error);
    return NextResponse.json(
      { error: "Fusion failed", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// GET with query params for quick testing
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const targetRole = searchParams.get("role") || "software-engineer";

  // Return default weights and role expectations
  return NextResponse.json({
    weights: FUSION_WEIGHTS,
    role: targetRole,
    note: "POST with all analysis results to get fused scores",
  });
}
