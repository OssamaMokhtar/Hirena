import type { SkillCategory } from "@/types";
import type { ProficiencyLevel } from "@/types";
import { SOFTWARE_ROLES, getRoleSkills } from "./software-competency-model";

// ─── Expanded Software Industry Competency Framework ─────────────────────────
// Option 2 & 3: full expansion to 12+ roles, 0-7 proficiency levels,
// career ladders, expected levels per seniority, role-specific pillars.
//
// This file imports from software-competency-model.ts (already built in Option 1)
// and extends it with the fuller framework spec from the architecture doc.

// ─── Proficiency Level Definitions (0-7 scale) ───────────────────────────────

export const PROFICIENCY_LEVELS: Array<{ level: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7; name: string; description: string; indicators: string[] }> = [
  {
    level: 0,
    name: "No Experience",
    description: "No exposure to this skill. Cannot perform even basic tasks.",
    indicators: [
      "Has not encountered this skill in any context",
      "Cannot describe basic concepts",
      "Would need extensive training before contributing",
    ],
  },
  {
    level: 1,
    name: "Aware",
    description: "Basic awareness of concepts. Can discuss at a high level but lacks practical experience.",
    indicators: [
      "Can define key terms and concepts",
      "Understands what the skill is used for",
      "Has read about it but never applied it",
      "Needs significant guidance to perform tasks",
    ],
  },
  {
    level: 2,
    name: "Basic",
    description: "Can handle simple, well-defined cases with guidance. Learning the ropes.",
    indicators: [
      "Can perform basic tasks with supervision",
      "Understands common scenarios and standard approaches",
      "Makes occasional mistakes that need correction",
      "Works best with clear requirements and templates",
    ],
  },
  {
    level: 3,
    name: "Intermediate",
    description: "Handles common cases independently with solid work. Occasionally needs help with edge cases.",
    indicators: [
      "Independently handles standard tasks and scenarios",
      "Produces reliable, functional work",
      "Knows when to ask for help on complex problems",
      "Can explain their approach to others",
      "Contributes meaningfully to team output",
    ],
  },
  {
    level: 4,
    name: "Advanced",
    description: "Handles complex cases confidently. Guides others. Consistently high quality.",
    indicators: [
      "Confidently tackles complex, non-standard problems",
      "Produces high-quality work with minimal review",
      "Mentors junior team members",
      "Identifies improvements to processes and tools",
      "Makes sound technical decisions independently",
    ],
  },
  {
    level: 5,
    name: "Expert",
    description: "Sets direction for the team/organization. Deep mastery. Rarely needs external input.",
    indicators: [
      "Designs solutions that others follow",
      "Solves problems nobody else can",
      "Sets standards and best practices for the team",
      "Makes strategic technical decisions",
      "Recognized as the go-to expert internally",
    ],
  },
  {
    level: 6,
    name: "Master",
    description: "Organization-wide authority. Drives strategy. Teaches and shapes the field.",
    indicators: [
      "Defines technical strategy across multiple teams",
      "Architectures systems at scale",
      "Trains and certifies others in the skill",
      "Contributes to the broader community (talks, writes, open source)",
      "Anticipates trends and prepares the organization",
    ],
  },
  {
    level: 7,
    name: "Authority",
    description: "Industry-recognized expert. Shapes the discipline. External impact.",
    indicators: [
      "Speaks at conferences, publishes, or contributes to open source at a high level",
      "Influences industry practices and standards",
      "Consulted by other organizations",
      "Pioneer in applying or evolving the skill",
      "Legacy impact — the field is shaped by their work",
    ],
  },
];

// ─── Role-Specific Pillar Definitions ─────────────────────────────────────────

// Each role gets 4-6 competency pillars (groups of related skills)
// that define how skills are organized and weighted for that role.

export interface RolePillar {
  name: string;
  weight: number;           // Percentage weight in final score (sums to 100)
  description: string;
  skillIds: string[];       // Which skills belong to this pillar
}

// ─── Career Ladder Definitions ─────────────────────────────────────────────────

export interface CareerLadderStep {
  title: string;
  minLevel: number;         // Minimum proficiency to reach this title
  expected: Record<string, number>;  // Expected proficiency per key skill
  description: string;
}

// ─── Role Summary Table ────────────────────────────────────────────────────────

export const SOFTWARE_ROLE_SUMMARY = [
  {
    role: "data-analyst",
    name: "Data Analyst",
    skills: 28,
    pillars: 5,
    levels: 8,
    ladder: "Jr → Sr → Lead",
    description: "Transforms data into actionable insights. SQL, visualization, statistical analysis, business intelligence.",
  },
  {
    role: "business-analyst",
    name: "Business Analyst",
    skills: 25,
    pillars: 4,
    levels: 8,
    ladder: "Jr → Sr → Lead",
    description: "Bridges business needs and technical solutions. Requirements, stakeholder management, process modeling, documentation.",
  },
  {
    role: "qa-engineer",
    name: "QA Engineer",
    skills: 28,
    pillars: 5,
    levels: 8,
    ladder: "Jr → Sr → Lead",
    description: "Ensures product quality through systematic testing. Test design, automation, performance testing, security testing.",
  },
  {
    role: "tester",
    name: "Tester (Manual)",
    skills: 20,
    pillars: 3,
    levels: 6,
    ladder: "Jr → Sr",
    description: "Manual testing, exploratory testing, bug reporting, test case execution. Foundation for automation path.",
  },
  {
    role: "software-architect",
    name: "Software Architect",
    skills: 32,
    pillars: 6,
    levels: 8,
    ladder: "Sr → Principal",
    description: "High-level technical design and system architecture. Trade-off analysis, technology selection, scalability planning.",
  },
  {
    role: "software-engineer",
    name: "Software Engineer",
    skills: 32,
    pillars: 6,
    levels: 8,
    ladder: "Jr → Sr → Lead",
    description: "Core software development. Data structures, algorithms, system design, languages, databases, infrastructure, practices.",
  },
  {
    role: "frontend-engineer",
    name: "Frontend Engineer",
    skills: 28,
    pillars: 5,
    levels: 8,
    ladder: "Jr → Sr → Lead",
    description: "User-facing application development. HTML/CSS/JS, frameworks, state management, performance, accessibility.",
  },
  {
    role: "backend-engineer",
    name: "Backend Engineer",
    skills: 28,
    pillars: 5,
    levels: 8,
    ladder: "Jr → Sr → Lead",
    description: "Server-side systems and APIs. Database design, API development, security, scalability, messaging.",
  },
  {
    role: "full-stack-engineer",
    name: "Full-Stack Engineer",
    skills: 32,
    pillars: 6,
    levels: 8,
    ladder: "Jr → Sr → Lead",
    description: "End-to-end development across frontend and backend. Broad coverage with depth in key areas.",
  },
  {
    role: "devops-engineer",
    name: "DevOps Engineer",
    skills: 28,
    pillars: 5,
    levels: 8,
    ladder: "Jr → Sr → Lead",
    description: "CI/CD, infrastructure as code, containers, cloud platforms, monitoring, deployment automation.",
  },
  {
    role: "uxui-designer",
    name: "UX/UI Designer",
    skills: 25,
    pillars: 4,
    levels: 8,
    ladder: "Jr → Sr → Lead",
    description: "User experience and interface design. Research, wireframing, prototyping, design systems, usability testing.",
  },
  {
    role: "engineering-manager",
    name: "Engineering Manager",
    skills: 25,
    pillars: 5,
    levels: 8,
    ladder: "Manager → Director",
    description: "Teams, hiring, career development, project delivery, stakeholder management, technical oversight.",
  },
  {
    role: "tech-lead",
    name: "Tech Lead",
    skills: 28,
    pillars: 6,
    levels: 8,
    ladder: "Sr → TL → Principal",
    description: "Technical leadership within a team. Architecture decisions, code quality, mentoring, delivery ownership.",
  },
  {
    role: "product-manager",
    name: "Product Manager",
    skills: 35,
    pillars: 6,
    levels: 6,
    ladder: "APM → CPO",
    description: "Product strategy, roadmap, customer discovery, execution, analytics, AI products, leadership. (Existing PM model.)",
  },
  {
    role: "scrum-master",
    name: "Scrum Master",
    skills: 20,
    pillars: 3,
    levels: 6,
    ladder: "Jr → Sr",
    description: "Agile ceremony facilitation, impediment removal, team coaching, scrum/kanban mastery.",
  },
  {
    role: "data-engineer",
    name: "Data Engineer",
    skills: 28,
    pillars: 5,
    levels: 8,
    ladder: "Jr → Sr → Lead",
    description: "Data pipelines, ETL/ELT, data warehousing, streaming, data quality, big data technologies.",
  },
  {
    role: "ml-engineer",
    name: "ML Engineer",
    skills: 28,
    pillars: 5,
    levels: 8,
    ladder: "Jr → Sr → Lead",
    description: "Machine learning model development, deployment, MLOps, feature engineering, model monitoring.",
  },
];

// ─── Helper Functions ──────────────────────────────────────────────────────────

/** Get the full role summary for a given role key */
export function getRoleSummary(role: string) {
  return SOFTWARE_ROLE_SUMMARY.find((r) => r.role === role);
}

/** Get the number of skills for a role */
export function getRoleSkillCount(role: string): number {
  const summary = getRoleSummary(role);
  return summary?.skills ?? 0;
}

/** Get the career ladder for a role */
export function getRoleLadder(role: string): string {
  const summary = getRoleSummary(role);
  return summary?.ladder ?? "Unknown";
}

/** Get the number of pillars for a role */
export function getRolePillarCount(role: string): number {
  const summary = getRoleSummary(role);
  return summary?.pillars ?? 0;
}

/** Get all role keys */
export function getAllRoleKeys(): string[] {
  return SOFTWARE_ROLE_SUMMARY.map((r) => r.role);
}

/** Get all role display names */
export function getAllRoleNames(): { key: string; name: string }[] {
  return SOFTWARE_ROLE_SUMMARY.map((r) => ({ key: r.role, name: r.name }));
}

/** Count total skills across all roles (approximate — skills overlap) */
export function getTotalSkillCount(): number {
  // Skills overlap heavily across roles, so this is an estimate
  // Based on the architecture doc: ~375 skills across 15 roles
  return 375;
}

/** Get the maximum proficiency level for a role */
export function getMaxLevelForRole(role: string): number {
  const summary = getRoleSummary(role);
  return summary?.levels ?? 6;
}

/** Check if a role exists */
export function roleExists(role: string): boolean {
  return SOFTWARE_ROLE_SUMMARY.some((r) => r.role === role);
}
