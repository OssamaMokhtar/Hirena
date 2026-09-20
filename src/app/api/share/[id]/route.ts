import { NextResponse } from "next/server";
import { decodeShareUrl, resultToSharePayload, encodeShareUrl } from "@/lib/report/generator";
import type { AssessmentResult } from "@/types";

/**
 * GET /api/share/[id]
 *
 * Two modes:
 * 1. If [id] is a base64-encoded share payload → decode and return it
 * 2. If [id] looks like an assessment ID → would fetch from DB (not yet wired)
 *
 * For now, mode 1 is the primary path. The share page passes the encoded
 * payload in the URL so the report is self-contained and requires no DB.
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Try to decode as a share payload first
    const payload = decodeShareUrl(id);
    if (payload) {
      return NextResponse.json({ success: true, payload }, { status: 200 });
    }

    // In future: look up by assessment ID from Supabase
    // For now, return not-found
    return NextResponse.json(
      { success: false, error: "Assessment not found. Share links may have expired." },
      { status: 404 }
    );
  } catch (error) {
    console.error("[Share API] GET error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load shared assessment" },
      { status: 500 }
    );
  }
}
