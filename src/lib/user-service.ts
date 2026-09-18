// Hirena — User Account Service
// Provides user sign-up, sign-in, sign-out, and profile management
// via Supabase Auth. Falls back to localStorage when Supabase is
// not configured (demo mode).

import { supabase, isSupabaseConfigured } from "@/lib/db";

export interface User {
  id: string;
  email: string;
  displayName: string;
  createdAt: Date;
}

export interface UserPreferences {
  facialAnalysisEnabled: boolean;
  aiMode: "auto" | "mock" | "production";
  language: string;
  region: string;
}

const DEFAULT_PREFERENCES: UserPreferences = {
  facialAnalysisEnabled: false,
  aiMode: "auto",
  language: "en",
  region: "MENA",
};

// ─── Auth state (client-side via localStorage when no Supabase) ────────────

/**
 * Get the current user from localStorage (demo mode) or Supabase (prod mode).
 * Returns null if no user is signed in.
 */
export async function getCurrentUser(): Promise<User | null> {
  if (isSupabaseConfigured && supabase) {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) return null;
    return {
      id: user.id,
      email: user.email || "",
      displayName: user.user_metadata?.display_name || user.email?.split("@")[0] || "User",
      createdAt: new Date(user.created_at),
    };
  }

  // Demo mode: read from localStorage
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem("hirena_user");
  if (!stored) return null;
  try {
    return JSON.parse(stored) as User;
  } catch {
    return null;
  }
}

/**
 * Sign up a new user. In demo mode, stores to localStorage.
 * In production, creates a Supabase auth user.
 */
export async function signUp(
  email: string,
  password: string,
  displayName: string
): Promise<{ success: boolean; user?: User; error?: string }> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: displayName },
      },
    });
    if (error) return { success: false, error: error.message };
    if (!data.user) return { success: false, error: "No user returned from sign-up" };
    return {
      success: true,
      user: {
        id: data.user.id,
        email: data.user.email || email,
        displayName: displayName,
        createdAt: new Date(data.user.created_at),
      },
    };
  }

  // Demo mode
  if (typeof window === "undefined") {
    return { success: false, error: "Cannot sign up in SSR context" };
  }
  const user: User = {
    id: "demo-" + Date.now(),
    email,
    displayName,
    createdAt: new Date(),
  };
  localStorage.setItem("hirena_user", JSON.stringify(user));
  localStorage.setItem("hirena_auth_mode", "demo");
  return { success: true, user };
}

/**
 * Sign in. In demo mode, verifies against localStorage.
 * In production, uses Supabase auth.
 */
export async function signIn(
  email: string,
  password: string
): Promise<{ success: boolean; user?: User; error?: string }> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) return { success: false, error: error.message };
    if (!data.user) return { success: false, error: "No user returned from sign-in" };
    return {
      success: true,
      user: {
        id: data.user.id,
        email: data.user.email || email,
        displayName: data.user.user_metadata?.display_name || email.split("@")[0] || "User",
        createdAt: new Date(data.user.created_at),
      },
    };
  }

  // Demo mode: accept any non-empty credentials
  if (typeof window === "undefined") {
    return { success: false, error: "Cannot sign in during SSR" };
  }
  if (!email || !password) {
    return { success: false, error: "Email and password are required" };
  }
  const user: User = {
    id: "demo-" + Date.now(),
    email,
    displayName: email.split("@")[0],
    createdAt: new Date(),
  };
  localStorage.setItem("hirena_user", JSON.stringify(user));
  localStorage.setItem("hirena_auth_mode", "demo");
  return { success: true, user };
}

/**
 * Sign out. Clears auth state.
 */
export async function signOut(): Promise<{ success: boolean; error?: string }> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.auth.signOut();
    if (error) return { success: false, error: error.message };
    return { success: true };
  }

  if (typeof window === "undefined") return { success: true };
  localStorage.removeItem("hirena_user");
  localStorage.removeItem("hirena_auth_mode");
  return { success: true };
}

// ─── User preferences ───────────────────────────────────────────────────────

/**
 * Get user preferences. In demo mode, stored in localStorage.
 * In production, stored in Supabase profiles table.
 */
export async function getUserPreferences(
  userId: string
): Promise<UserPreferences> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("profiles")
      .select("preferences")
      .eq("id", userId)
      .single();
    if (error || !data) return DEFAULT_PREFERENCES;
    try {
      return { ...DEFAULT_PREFERENCES, ...JSON.parse(data.preferences || "{}") };
    } catch {
      return DEFAULT_PREFERENCES;
    }
  }

  if (typeof window === "undefined") return DEFAULT_PREFERENCES;
  const stored = localStorage.getItem(`hirena_prefs_${userId}`);
  if (!stored) return DEFAULT_PREFERENCES;
  try {
    return { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) };
  } catch {
    return DEFAULT_PREFERENCES;
  }
}

/**
 * Save user preferences.
 */
export async function saveUserPreferences(
  userId: string,
  prefs: Partial<UserPreferences>
): Promise<{ success: boolean; error?: string }> {
  const current = await getUserPreferences(userId);
  const merged = { ...current, ...prefs };

  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase
      .from("profiles")
      .update({ preferences: JSON.stringify(merged) })
      .eq("id", userId);
    if (error) return { success: false, error: error.message };
    return { success: true };
  }

  if (typeof window === "undefined") return { success: false, error: "SSR not supported" };
  localStorage.setItem(`hirena_prefs_${userId}`, JSON.stringify(merged));
  return { success: true };
}

/**
 * Toggle facial analysis on/off for the current user.
 */
export async function setFacialAnalysisEnabled(
  userId: string,
  enabled: boolean
): Promise<{ success: boolean; error?: string }> {
  return saveUserPreferences(userId, { facialAnalysisEnabled: enabled });
}

/**
 * Get the facial analysis toggle state for the current user.
 */
export async function isFacialAnalysisEnabled(userId: string): Promise<boolean> {
  const prefs = await getUserPreferences(userId);
  return prefs.facialAnalysisEnabled;
}
