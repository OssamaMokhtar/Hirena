import { NextResponse } from "next/server";

export async function POST(request: Request) {
  return NextResponse.json(
    {
      error: "This endpoint has been removed.",
      removedAt: "2026-09-23",
      reason: "EU AI Act compliance: facial expression analysis from video is prohibited under Article 5(1)(f) (biometric categorization of natural persons). This endpoint analyzed facial expressions and has been decommissioned.",
    },
    { status: 410 }
  );
}
