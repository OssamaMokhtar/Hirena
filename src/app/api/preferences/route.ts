// Hirena — User Preferences API
// Manages user preferences including facial analysis toggle, AI mode, etc.

import { NextResponse } from "next/server";
import { getCurrentUser, getUserPreferences, saveUserPreferences, setFacialAnalysisEnabled, isFacialAnalysisEnabled } from "@/lib/user-service";
import type { UserPreferences } from "@/lib/user-service";

// ─── GET /api/preferences ──────────────────────────────────────────────────

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const prefs = await getUserPreferences(user.id);
    return NextResponse.json({ success: true, preferences: prefs });
  } catch (error) {
    console.error("[preferences GET] Error:", error);
    return NextResponse.json({ error: "Failed to load preferences" }, { status: 500 });
  }
}

// ─── PATCH /api/preferences ─────────────────────────────────────────────────

export async function PATCH(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const body = await request.json();
    const prefs = body as Partial<UserPreferences>;

    // Validate allowed fields
    const allowed = ["facialAnalysisEnabled", "aiMode", "language", "region"];
    const cleaned: Partial<UserPreferences> = {};
    for (const key of allowed) {
      if (key in prefs) {
        (cleaned as any)[key] = (prefs as any)[key];
      }
    }

    const result = await saveUserPreferences(user.id, cleaned);
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    const updated = await getUserPreferences(user.id);
    return NextResponse.json({ success: true, preferences: updated });
  } catch (error) {
    console.error("[preferences PATCH] Error:", error);
    return NextResponse.json({ error: "Failed to save preferences" }, { status: 500 });
  }
}

// ─── POST /api/preferences/facial-toggle ───────────────────────────────────

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const body = await request.json();
    const { enabled } = body as { enabled: boolean };

    if (typeof enabled !== "boolean") {
      return NextResponse.json({ error: "enabled must be a boolean" }, { status: 400 });
    }

    const result = await setFacialAnalysisEnabled(user.id, enabled);
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      facialAnalysisEnabled: enabled,
      message: enabled
        ? "Facial analysis enabled. You can disable it at any time in settings."
        : "Facial analysis disabled.",
    });
  } catch (error) {
    console.error("[facial-toggle POST] Error:", error);
    return NextResponse.json({ error: "Failed to update facial analysis setting" }, { status: 500 });
  }
}
