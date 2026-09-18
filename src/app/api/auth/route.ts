// Hirena — User Account API Routes
// Provides server-side endpoints for user authentication and profile management.
//
// Endpoints:
//   POST /api/auth/signup     — Create a new user account
//   POST /api/auth/signin    — Sign in an existing user
//   POST /api/auth/signout   — Sign out the current user
//   GET  /api/auth/me        — Get the current user + profile
//   PATCH /api/auth/preferences — Update user preferences (e.g., facial toggle)

import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/db";
import {
  signUp,
  signIn,
  signOut,
  getCurrentUser,
  getUserPreferences,
  saveUserPreferences,
  setFacialAnalysisEnabled,
} from "@/lib/user-service";
import type { UserPreferences } from "@/types";

// ---------------------------------------------------------------------------
// POST /api/auth/signup
// ---------------------------------------------------------------------------

export async function POST(request: Request) {
  const { pathname } = new URL(request.url);

  if (pathname === "/api/auth/signup") {
    try {
      const body = await request.json();
      const { email, password, displayName } = body;

      if (!email || !password) {
        return NextResponse.json(
          { error: "email and password are required" },
          { status: 400 }
        );
      }

      const result = await signUp(email, password, displayName);

      if (!result.success) {
        return NextResponse.json({ error: result.error }, { status: 400 });
      }

      return NextResponse.json(
        {
          success: true,
          user: result.user,
          message: result.user?.id === "demo-user"
            ? "Demo mode: Supabase not configured. Account created in local session only."
            : "Account created successfully. Please check your email to verify your account.",
        },
        { status: 201 }
      );
    } catch (error) {
      console.error("[signup] Error:", error);
      return NextResponse.json(
        { error: "Failed to create account. Please try again." },
        { status: 500 }
      );
    }
  }

  if (pathname === "/api/auth/signin") {
    try {
      const body = await request.json();
      const { email, password } = body;

      if (!email || !password) {
        return NextResponse.json(
          { error: "email and password are required" },
          { status: 400 }
        );
      }

      const result = await signIn(email, password);

      if (!result.success) {
        return NextResponse.json({ error: result.error }, { status: 401 });
      }

      return NextResponse.json({
        success: true,
        user: result.user,
        message: result.user?.id === "demo-user"
          ? "Demo mode: signed in locally."
          : "Signed in successfully.",
      });
    } catch (error) {
      console.error("[signin] Error:", error);
      return NextResponse.json(
        { error: "Failed to sign in. Please try again." },
        { status: 500 }
      );
    }
  }

  if (pathname === "/api/auth/signout") {
    try {
      const result = await signOut();
      if (!result.success) {
        return NextResponse.json({ error: result.error }, { status: 500 });
      }
      return NextResponse.json({
        success: true,
        message: "Signed out successfully.",
      });
    } catch (error) {
      console.error("[signout] Error:", error);
      return NextResponse.json(
        { error: "Failed to sign out." },
        { status: 500 }
      );
    }
  }

  if (pathname === "/api/auth/me") {
    try {
      const user = await getCurrentUser();

      if (!user) {
        return NextResponse.json(
          { success: false, user: null, message: "Not signed in." },
          { status: 401 }
        );
      }

      const profile = await getUserPreferences(user.id);

      return NextResponse.json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          displayName: user.displayName || user.email?.split("@")[0],
        },
        profile: profile || null,
      });
    } catch (error) {
      console.error("[me] Error:", error);
      return NextResponse.json(
        { error: "Failed to get user info." },
        { status: 500 }
      );
    }
  }

  if (pathname === "/api/auth/preferences") {
    try {
      const user = await getCurrentUser();
      if (!user) {
        return NextResponse.json(
          { error: "Not signed in." },
          { status: 401 }
        );
      }

      const body = await request.json();
      const preferences: Partial<UserPreferences> = body;

      const result = await saveUserPreferences(user.id, preferences);

      if (!result.success) {
        return NextResponse.json({ error: result.error }, { status: 500 });
      }

      return NextResponse.json({
        success: true,
        preferences,
        message: "Preferences updated.",
      });
    } catch (error) {
      console.error("[preferences] Error:", error);
      return NextResponse.json(
        { error: "Failed to update preferences." },
        { status: 500 }
      );
    }
  }

  if (pathname === "/api/auth/facial-toggle") {
    try {
      const user = await getCurrentUser();
      if (!user) {
        return NextResponse.json(
          { error: "Not signed in." },
          { status: 401 }
        );
      }

      const body = await request.json();
      const { enabled } = body;

      if (typeof enabled !== "boolean") {
        return NextResponse.json(
          { error: "enabled must be a boolean" },
          { status: 400 }
        );
      }

      const result = await setFacialAnalysisEnabled(user.id, enabled);

      if (!result.success) {
        return NextResponse.json({ error: result.error }, { status: 500 });
      }

      return NextResponse.json({
        success: true,
        facialAnalysisEnabled: enabled,
        message: enabled
          ? "Facial analysis enabled. Remember: this is an experimental coaching feature — see the bias documentation for details."
          : "Facial analysis disabled.",
      });
    } catch (error) {
      console.error("[facial-toggle] Error:", error);
      return NextResponse.json(
        { error: "Failed to update facial analysis setting." },
        { status: 500 }
      );
    }
  }

  // 404 for unknown auth paths
  return NextResponse.json({ error: "Not found" }, { status: 404 });
}

// Catch-all for unsupported methods on auth routes
export async function GET(request: Request) {
  const { pathname } = new URL(request.url);

  if (pathname === "/api/auth/me") {
    return POST(request); // Delegate to POST handler
  }

  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
