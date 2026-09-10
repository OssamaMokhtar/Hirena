// Hirena — Core Types and Interfaces
// Defines the data model for skills assessment, career paths, and user profiles.

export type SkillCategory =
  | "strategy"
  | "discovery"
  | "delivery"
  | "analytics"
  | "ai"
  | "leadership";

export type ProficiencyLevel = 0 | 1 | 2 | 3 | 4 | 5;

export interface Skill {
  id: string;
  name: string;
  description: string;
  category: SkillCategory;
  level: ProficiencyLevel;
  evidence?: string;
  aiConfidence?: number; // 0-1, how confident the AI is in its inference
  isAiInferred?: boolean;
}

export interface CompetencyArea {
  id: SkillCategory;
  name: string;
  description: string;
  skills: Skill[];
  weight: number; // 0-100, used in overall score calculation
}

export interface Benchmark {
  region: string;
  role: string;
  track: string;
  competencyScores: Record<SkillCategory, {
    average: number;
    topQuartile: number;
    median: number;
  }>;
}

export interface AssessmentInput {
  targetRole: string;
  targetTrack: string;
  region: string;
  selfAssessment: Record<string, ProficiencyLevel>; // skillId -> level
  aiInferenceInputs: Array<{
    skillId: string;
    description: string; // user's description of experience
  }>;
}

export interface AssessmentResult {
  id: string;
  userId: string;
  targetRole: string;
  targetTrack: string;
  region: string;
  overallScore: number; // 0-100
  competencyScores: Record<SkillCategory, {
    average: number;
    skills: Skill[];
  }>;
  skillRanking: Skill[];
  strengths: Skill[];
  gaps: SkillGap[];
  missingSkills: Skill[];
  aiInferenceNotes: Record<string, string>; // skillId -> inference note
  createdAt: Date;
  completedAt: Date;
}

export interface SkillGap {
  skill: Skill;
  currentLevel: ProficiencyLevel;
  targetLevel: ProficiencyLevel;
  gapSize: number;
  priority: "critical" | "important" | "nice-to-have";
  benchmark: number;
  note?: string;
}

export interface RoadmapAction {
  id: string;
  title: string;
  description: string;
  timeEstimate: string; // e.g. "2 hours", "1 week"
  timeframe: "immediate" | "intermediate" | "long-term";
  resources?: Resource[];
  deliverable?: string; // optional project/deliverable to produce
  category: SkillCategory;
  skill?: string; // optional specific skill
}

export interface Roadmap {
  id: string;
  assessmentId: string;
  immediateActions: RoadmapAction[];
  intermediateActions: RoadmapAction[];
  longTermActions: RoadmapAction[];
  createdAt: Date;
}

export interface Resource {
  id: string;
  title: string;
  source: string;
  format: "article" | "video" | "course" | "book" | "podcast" | "template";
  url?: string;
  timeCommitment: string; // e.g. "15 min", "4 hours", "4 weeks"
  whyRecommended: string;
  isPaid: boolean;
  region?: string;
  category: SkillCategory;
  skill?: string;
}

export interface Profile {
  id: string;
  name: string;
  email: string;
  currentRole: string;
  experienceYears: number;
  industry: string;
  location: string; // country
  careerGoal: string;
  targetRole?: string;
  targetTrack?: string;
  region?: string;
  createdAt: Date;
}

export interface User {
  id: string;
  email: string;
  name: string;
  profile: Profile;
  assessments: AssessmentResult[];
  createdAt: Date;
}
