// Hirena — Core Types and Interfaces
// Defines the data model for skills assessment, career paths, and user profiles.

export type SkillCategory =
  | "strategy"
  | "discovery"
  | "delivery"
  | "analytics"
  | "ai"
  | "leadership"
  | "technical-foundation"
  | "engineering-practices"
  | "system-design"
  | "data"
  | "cloud-infrastructure"
  | "collaboration"
  | "testing"
  | "security"
  | "frontend"
  | "backend"
  | "databases"
  | "devops"
  | "frontend-core"
  | "frontend-frameworks"
  | "frontend-engineering"
  | "backend-core"
  | "backend-security"
  | "backend-engineering"
  | "cloud-platforms"
  | "os-infrastructure"
  | "containerization"
  | "ci-cd"
  | "observability"
  | "operations"
  | "data-retrieval"
  | "data-analysis"
  | "data-tools"
  | "data-programming"
  | "data-engineering"
  | "domain-knowledge"
  | "domain"
  | "process"
  | "tools"
  | "testing-strategy"
  | "testing-execution"
  | "test-automation"
  | "testing-specialist"
  | "testing-tools"
  | "analysis"
  | "stakeholder"
  | "communication"
  | "tools";

export type ProficiencyLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

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
  previousAssessmentId?: string; // link to previous assessment for progress tracking
}

export interface CareerLevel {
  role: string;
  track: string;
  expectedProficiency: Partial<Record<SkillCategory, number>>;
  description: string;
  levelTitle: string; // e.g., "Junior", "Senior", "Lead", "Principal"
  minLevel: number;
  maxLevel: number;
}

export interface CareerPath {
  role: string;
  track: string;
  levels: CareerLevel[];
  skillsByLevel: Record<number, string[]>; // level -> skill IDs required at that level
  progressionPath: string[]; // ordered list of level titles (e.g., ["Junior", "Senior", "Lead", "Principal"])
}

export interface AssessmentComparison {
  currentAssessment: AssessmentResult;
  previousAssessment?: AssessmentResult;
  overallScoreChange: number; // positive = improvement
  competencyScoreChanges: Record<SkillCategory, number>; // per-pillar change
  skillImprovements: Skill[]; // skills that improved
  skillDeclines: Skill[]; // skills that declined
  newStrengths: Skill[]; // newly identified strengths
  resolvedGaps: SkillGap[]; // gaps that are now filled
  newGaps: SkillGap[]; // newly identified gaps
  trajectory: SkillTrajectory[];
}

export interface SkillTrajectory {
  skillId: string;
  skillName: string;
  pastLevels: number[]; // chronological levels from past assessments
  currentLevel: number;
  trend: "improving" | "declining" | "stable";
  projectedLevel?: number; // projected level based on trend
}

export interface ShareableReport {
  id: string;
  assessmentId: string;
  userId: string;
  publicUrl: string;
  shortCode: string; // short shareable code (e.g., "HR-XYZ123")
  createdAt: Date;
  expiresAt?: Date;
  viewCount: number;
  isPublic: boolean;
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

export interface Mentor {
  id: string;
  name: string;
  headline: string;
  skills: string[]; // skill IDs
  expertiseLevels: Record<string, number>; // skillId -> proficiency level
  location: string;
  language: string[];
  bio: string;
  linkedInUrl?: string;
  availability: "available" | "limited" | "unavailable";
  rating?: number; // 0-5
  reviewCount?: number;
}

export interface MentorMatch {
  mentor: Mentor;
  matchedSkills: string[];
  matchScore: number; // 0-100
  reason: string;
  suggestedTopics: string[];
}

export interface SalaryBenchmark {
  role: string;
  track: string;
  region: string;
  minLevel: number;
  maxLevel: number;
  minSalary: number;
  medianSalary: number;
  maxSalary: number;
   currency: string;
  source: string;
  lastUpdated: Date;
}

export type AiFeatureToggle = {
  voiceAnalysis: boolean;
  facialAnalysis: boolean;
  contentAnalysis: boolean;
  useRealAi: boolean; // true = real GPT-4o/Whisper, false = simulated
};

export interface AiDisclaimer {
  message: string;
  facialAnalysisExperimental?: boolean;
  biasRiskAcknowledged?: boolean;
  notForHiringDecisions?: boolean;
  lastUpdated: Date;
}
