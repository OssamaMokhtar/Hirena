import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      error: "This endpoint has been removed. API key verification is done via server-side health checks only. No environment variables are exposed to clients.",
      removedAt: "2026-09-23",
      reason: "Security: this endpoint leaked the OpenAI API key prefix in every HTTP response. Clients should never receive environment variable values.",
    },
    { status: 410 }
  );
}
