// Hirena — Shareable Report Generator
//
// Generates formatted report objects from AssessmentResult for
// sharing via URL, PDF export, or JSON summary.
//
// Formats supported:
//   - JSON: full structured data (machine-readable)
//   - Summary text: human-readable plain text (for copying/sharing)
//   - PDF data: ready for jsPDF client-side generation
//   - Share URL params: base64-encoded compact payload

import type { AssessmentResult } from "@/types";

/** Compact payload for URL sharing — includes only the fields needed to render the share page */
export interface SharePayload {
  id: string;
  targetRole: string;
  targetTrack: string;
  region: string;
  overallScore: number;
  completedAt: string;
  strengths: Array<{ name: string; level: number; category: string }>;
  gaps: Array<{ skillId: string; currentLevel: number; targetLevel: number; gapSize: number; priority: string }>;
  missingSkills: Array<{ name: string; level: number; category: string }>;
  competencyScores: Record<string, { average: number; skills: Array<{ name: string }> }>;
  skillRanking: Array<{ name: string; level: number; category: string }>;
  benchmark?: {
    overall?: { median: number; topQuartile: number };
    competencies?: Record<string, { average: number; topQuartile: number; median: number }>;
  };
}

/** Convert an AssessmentResult to a compact shareable payload */
export function resultToSharePayload(result: AssessmentResult): SharePayload {
  return {
    id: result.id,
    targetRole: result.targetRole,
    targetTrack: result.targetTrack,
    region: result.region,
    overallScore: result.overallScore,
    completedAt: result.completedAt.toISOString(),
    strengths: result.strengths.map(s => ({ name: s.name, level: s.level, category: s.category })),
    gaps: result.gaps.map(g => ({
      skillId: g.skill.id,
      currentLevel: g.currentLevel,
      targetLevel: g.targetLevel,
      gapSize: g.gapSize,
      priority: g.priority,
    })),
    missingSkills: result.missingSkills.map(s => ({ name: s.name, level: s.level, category: s.category })),
    competencyScores: Object.fromEntries(
      Object.entries(result.competencyScores).map(([cat, data]) => [
        cat,
        { average: data.average, skills: data.skills.map(s => ({ name: s.name })) },
      ])
    ),
    skillRanking: result.skillRanking.slice(0, 10).map(s => ({ name: s.name, level: s.level, category: s.category })),
    benchmark: result.benchmark,
  };
}

/** Encode payload as base64 URL-safe string for share links */
export function encodeShareUrl(payload: SharePayload): string {
  const json = JSON.stringify(payload);
  const base64 = Buffer.from(json).toString("base64");
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

/** Decode a share URL parameter back to a payload */
export function decodeShareUrl(encoded: string): SharePayload | null {
  try {
    const base64 = encoded.replace(/-/g, "+").replace(/_/g, "/");
    const json = Buffer.from(base64, "base64").toString("utf-8");
    return JSON.parse(json) as SharePayload;
  } catch {
    return null;
  }
}

/** Generate a human-readable summary text from a share payload */
export function generateSummaryText(payload: SharePayload): string {
  const lines: string[] = [];
  const date = new Date(payload.completedAt).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });

  lines.push("=".repeat(52));
  lines.push(`  Hirena Skills Assessment Report`);
  lines.push("=".repeat(52));
  lines.push("");
  lines.push(`  Role:       ${payload.targetRole}`);
  lines.push(`  Region:     ${payload.region}`);
  lines.push(`  Date:       ${date}`);
  lines.push(`  Score:      ${payload.overallScore}/100`);
  lines.push("");

  // Benchmark
  if (payload.benchmark?.overall) {
    lines.push(`  MENA Benchmark:`);
    lines.push(`    - Median:       ${payload.benchmark.overall.median.toFixed(0)}/100`);
    lines.push(`    - 75th %ile:    ${payload.benchmark.overall.topQuartile.toFixed(0)}/100`);
    lines.push("");
  }

  // Competency scores
  lines.push(`  Competency Scores:`);
  for (const [cat, data] of Object.entries(payload.competencyScores)) {
    const pct = Math.round((data.average / 5) * 100);
    const bar = "█".repeat(Math.round(pct / 10)) + "░".repeat(10 - Math.round(pct / 10));
    lines.push(`    ${cat.padEnd(18)} ${data.average.toFixed(1)}/5  ${bar} ${pct}%`);
  }
  lines.push("");

  // Strengths
  if (payload.strengths.length > 0) {
    lines.push(`  Strengths (${payload.strengths.length}):`);
    for (const s of payload.strengths) {
      lines.push(`    ★ ${s.name} (${s.level}/5)`);
    }
    lines.push("");
  }

  // Gaps
  if (payload.gaps.length > 0) {
    lines.push(`  Development Areas (${payload.gaps.length}):`);
    for (const g of payload.gaps) {
      const label = g.priority === "critical" ? "CRITICAL" : g.priority === "important" ? "IMPORTANT" : " nice-to-have";
      lines.push(`    ${g.currentLevel >= 3 ? "↓" : "↑"} ${g.skillId}  L${g.currentLevel} → L${g.targetLevel} (gap: ${g.gapSize}) [${label}]`);
    }
    lines.push("");
  }

  // Missing skills
  if (payload.missingSkills.length > 0) {
    lines.push(`  Missing Skills (${payload.missingSkills.length}):`);
    for (const s of payload.missingSkills) {
      lines.push(`    ✗ ${s.name} (${s.level}/5)`);
    }
    lines.push("");
  }

  // Top skills
  if (payload.skillRanking.length > 0) {
    lines.push(`  Top Skills:`);
    for (let i = 0; i < Math.min(5, payload.skillRanking.length); i++) {
      const s = payload.skillRanking[i];
      lines.push(`    ${i + 1}. ${s.name} (${s.level}/5)`);
    }
    lines.push("");
  }

  lines.push("-".repeat(52));
  lines.push(`  Generated by Hirena — AI-powered skills assessment`);
  lines.push(`  https://hirena.app`);
  lines.push("-".repeat(52));

  return lines.join("\n");
}

/** Generate a plain-text report suitable for PDF generation */
export function generatePlainTextReport(payload: SharePayload): string {
  return generateSummaryText(payload);
}
