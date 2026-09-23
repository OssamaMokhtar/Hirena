import { NextResponse } from "next/server";

export async function POST(request: Request) {
  return NextResponse.json(
    {
      error: "This endpoint has been removed.",
      removedAt: "2026-09-23",
      reason: "EU AI Act Art. 5(1)(f) prohibits inferring the emotions of a person in the workplace or in education. This endpoint inferred emotions from facial expressions and has been decommissioned.",
    },
    { status: 410 }
  );
}
