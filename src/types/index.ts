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
  | "development-tools"
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
  | "languages"
  | "problem-solving"
  | "frontend-fundamentals"
  | "frameworks-libraries"
  | "css-styling"
  | "interaction-design"
  | "web-layout"
  | "svg-graphics"
  | "json-typing"
  | "html-semantic"
  | "architecture-system-design"
  | "devops-cicd"
  | "frontend-development"
  | "backend-development"
  | "databases-data"
  | "collaboration-communication"
  | "testing-foundations"
  | "test-automation"
  | "api-testing"
  | "performance-testing"
  | "security-testing"
  | "test-management-tools"
  | "process-collaboration"
  | "testing-methodology"
  | "test-types"
  | "automation-tools"
  | "test-design"
  | "automation-frameworks"
  | "ui-testing"
  | "api-checking"
  | "mobile-testing"
  | "accessibility-testing"
  | "performance-scope"
  | "security-scope"
  | "test-organizing"
  | "reporting-analytics"
  | "teamwork"
  | "api-strategy"
  | "api-practices"
  | "api-types"
  | "api-tools"
  | "api-testing-strategy"
  | "graphql-testing"
  | "performance-strategy"
  | "performance-methodology"
  | "performance-tools"
  | "security-basics"
  | "security-testing-strategy"
  | "security-maintenance"
  | "operations-testing"
  | "test-management"
  | "testing-metrics"
  | "community"
  | "process-improvement"
  | "communication-skills"
  | "documentation"
  | "testing-collaboration";

export type ProficiencyLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface Skill {
  id: string;
  name: string;
  description: string;
  category: string;
  level: ProficiencyLevel;
  evidence?: string;
  aiConfidence?: number;
  isAiInferred?: boolean;
}

export interface CompetencyArea {
  id: string;
  name: string;
  description: string;
  skills: string[];
  weight: number;
}

export interface Benchmark {
  region: string;
  role: string;
  track: string;
  competencyScores: Record<string, {
    average: number;
    topQuartile: number;
    median: number;
  }>;
}

export interface AssessmentInput {
  targetRole: string;
  targetTrack: string;
  region: string;
  selfAssessment: Record<string, ProficiencyLevel>;
  aiInferenceInputs: Array<{
    skillId: string;
    description: string;
  }>;
}

export interface AssessmentResult {
  id: string;
  userId: string;
  targetRole: string;
  targetTrack: string;
  region: string;
  overallScore: number;
  competencyScores: Record<string, {
    average: number;
    skills: Skill[];
  }>;
  skillRanking: Skill[];
  strengths: Skill[];
  gaps: SkillGap[];
  missingSkills: Skill[];
  aiInferenceNotes: Record<string, string>;
  createdAt: Date;
  completedAt: Date;
  previousAssessmentId?: string;
}

export interface CareerLevel {
  role: string;
  track: string;
  expectedProficiency: Partial<Record<string, number>>;
  description: string;
  levelTitle?: string;
  minLevel?: number;
  maxLevel?: number;
}

export interface CareerLadderStep {
  title: string;
  minLevel: number;
  maxLevel?: number;
  expected?: Record<string, number>;
  expectedProficiency?: Record<string, number>;
  description: string;
  typicalYearsOfExperience?: string;
}

export interface CompetencyPillar {
  id: string;
  name: string;
  description: string;
  weight: number;
  categories?: string[];
  skills?: string[];
}

export interface RoleSummary {
  id: string;
  title: string;
  track: string;
  description: string;
  skillCount: number;
  pillarCount: number;
  levels: number;
  careerLadder: string[];
  proficiencyLevels: number;
  icon: string;
}

export interface RoleCompetencyModel {
  role: string;
  roleName?: string;
  track: string;
  description: string;
  skills: Record<string, Skill>;
  pillars?: CompetencyPillar[];
  competencyAreas?: CompetencyArea[];
  levels?: number[] | Array<{ level: ProficiencyLevel; name: string; description: string }>;
  careerLadder: CareerLadderStep[];
  expectedLevels?: Record<string, number> | Record<string, Record<string, number>>;
  totalSkills?: number;
  region?: string;
}

export interface CareerPath {
  role: string;
  track: string;
  levels: CareerLevel[];
  skillsByLevel: Record<number, string[]>;
  progressionPath: string[];
}

export interface AssessmentComparison {
  currentAssessment: AssessmentResult;
  previousAssessment?: AssessmentResult;
  overallScoreChange: number;
  competencyScoreChanges: Record<string, number>;
  skillImprovements: Skill[];
  skillDeclines: Skill[];
  newStrengths: Skill[];
  resolvedGaps: SkillGap[];
  newGaps: SkillGap[];
  trajectory: SkillTrajectory[];
}

export interface SkillTrajectory {
  skillId: string;
  skillName: string;
  pastLevels: number[];
  currentLevel: number;
  trend: "improving" | "declining" | "stable";
  projectedLevel?: number;
}

export interface ShareableReport {
  id: string;
  assessmentId: string;
  userId: string;
  publicUrl: string;
  shortCode: string;
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
  timeEstimate: string;
  timeframe: "immediate" | "intermediate" | "long-term";
  resources?: Resource[];
  deliverable?: string;
  category: string;
  skill?: string;
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
  timeCommitment: string;
  whyRecommended: string;
  isPaid: boolean;
  region?: string;
  category: string;
  skill?: string;
}

export interface Profile {
  id: string;
  name: string;
  email: string;
  currentRole: string;
  experienceYears: number;
  industry: string;
  location: string;
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
  skills: string[];
  expertiseLevels: Record<string, number>;
  location: string;
  language: string[];
  bio: string;
  linkedInUrl?: string;
  availability: "available" | "limited" | "unavailable";
  rating?: number;
  reviewCount?: number;
}

export interface MentorMatch {
  mentor: Mentor;
  matchedSkills: string[];
  matchScore: number;
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
  useRealAi: boolean;
};

export interface AiDisclaimer {
  message: string;
  facialAnalysisExperimental?: boolean;
  biasRiskAcknowledged?: boolean;
  notForHiringDecisions?: boolean;
  lastUpdated: Date;
}
