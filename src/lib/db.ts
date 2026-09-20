import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

// ─── Assessment Persistence ─────────────────────────────────────────────────

/**
 * Save an assessment result for a user.
 * Returns the assessment ID if successful.
 */
export async function saveAssessment(
  userId: string,
  result: {
    id: string;
    targetRole: string;
    targetTrack: string;
    region: string;
    overallScore: number;
    competencyScores: Record<string, { average: number; skills: unknown[] }>;
    strengths: Array<{ id: string; name: string; level: number; category: string }>;
    gaps: Array<{ skillId: string; currentLevel: number; targetLevel: number; gapSize: number; priority: string }>;
    missingSkills: Array<{ id: string; name: string; level: number; category: string }>;
    roadmap: {
      immediateActions: Array<{ skillId: string; skillName: string; action: string; priority: string }>;
      intermediateActions: Array<{ skillId: string; skillName: string; action: string; priority: string }>;
      longTermActions: Array<{ skillId: string; skillName: string; action: string; priority: string }>;
    };
    selfAssessment?: Record<string, number>;
    aiInferenceInputs?: Array<{ skillId: string; description: string }>;
  }
): Promise<{ success: boolean; assessmentId?: string; error?: string }> {
  if (!supabase) {
    return { success: false, error: "Supabase not configured" };
  }

  try {
    const { data, error } = await supabase
      .from("assessments")
      .insert({
        id: result.id,
        user_id: userId,
        target_role: result.targetRole,
        target_track: result.targetTrack,
        region: result.region,
        overall_score: result.overallScore,
        competency_scores: JSON.stringify(result.competencyScores),
        strengths: JSON.stringify(result.strengths),
        gaps: JSON.stringify(result.gaps),
        missing_skills: JSON.stringify(result.missingSkills),
        roadmap: JSON.stringify(result.roadmap),
        self_assessment: result.selfAssessment ? JSON.stringify(result.selfAssessment) : null,
        ai_inference_inputs: result.aiInferenceInputs ? JSON.stringify(result.aiInferenceInputs) : null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return { success: false, error: error.message };
    }

    return { success: true, assessmentId: data.id };
  } catch (err) {
    console.error("saveAssessment error:", err);
    return { success: false, error: String(err) };
  }
}

/**
 * Get all assessments for a user, ordered by most recent first.
 */
export async function getUserAssessments(
  userId: string
): Promise<Array<{
  id: string;
  user_id: string;
  target_role: string;
  target_track: string;
  region: string;
  overall_score: number;
  competency_scores: string;
  strengths: string;
  gaps: string;
  missing_skills: string;
  roadmap: string;
  self_assessment: string | null;
  ai_inference_inputs: string | null;
  created_at: string;
  updated_at: string;
}>> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("assessments")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getUserAssessments error:", error);
    return [];
  }

  return data || [];
}

/**
 * Get a single assessment by ID.
 */
export async function getAssessmentById(
  assessmentId: string
): Promise<{
  id: string;
  user_id: string;
  target_role: string;
  target_track: string;
  region: string;
  overall_score: number;
  competency_scores: string;
  strengths: string;
  gaps: string;
  missing_skills: string;
  roadmap: string;
  self_assessment: string | null;
  ai_inference_inputs: string | null;
  created_at: string;
  updated_at: string;
} | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("assessments")
    .select("*")
    .eq("id", assessmentId)
    .single();

  if (error) {
    console.error("getAssessmentById error:", error);
    return null;
  }

  return data || null;
}
