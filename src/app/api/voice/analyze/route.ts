import { NextResponse } from "next/server";

// Removed 2026-09-23. This endpoint scored interview answers on "confidence",
// "enthusiasm" and "emotion". Inferring emotions of a person in an education or
// workplace context is prohibited by EU AI Act Art. 5(1)(f), and employment
// assessment is high-risk under Annex III. Hirena is text-only.
function gone() {
  return NextResponse.json(
    {
      error: "This endpoint has been removed. Hirena does not analyse voice, face or emotion.",
      removedAt: "2026-09-23",
    },
    { status: 410 }
  );
}

export const GET = gone;
export const POST = gone;
