import type { Benchmark, SkillCategory } from "@/types";
import type { Skill } from "@/types";

/**
 * Hirena PM Competency Model
 * Defines the skills and competency areas for Product Management assessment.
 */

export const COMPETENCY_AREAS: Record<SkillCategory, {
  name: string;
  description: string;
  weight: number; // Default weight (adjusted by target role)
}> = {
  strategy: {
    name: "Strategy",
    description: "Product vision, business strategy, market analysis, and strategic thinking",
    weight: 20,
  },
  discovery: {
    name: "Discovery",
    description: "Customer research, problem validation, and user-centered design thinking",
    weight: 20,
  },
  delivery: {
    name: "Delivery",
    description: "Execution, agile practices, prioritization, and cross-functional leadership",
    weight: 25,
  },
  analytics: {
    name: "Analytics",
    description: "Product metrics, data analysis, experimentation, and data-driven decision making",
    weight: 15,
  },
  ai: {
    name: "AI & Emerging Tech",
    description: "GenAI understanding, AI product strategy, LLM applications, and emerging tech awareness",
    weight: 10,
  },
  leadership: {
    name: "Leadership & Influence",
    description: "Team leadership, executive communication, P&L ownership, and organizational skills",
    weight: 10,
  },
};

/**
 * All PM skills organized by competency area.
 * Each skill has: id, name, description, category, and default proficiency level (0 = not yet assessed)
 */
export const PM_SKILLS: Record<string, Skill> = {
  // Strategy skills
  "product-vision": {
    id: "product-vision",
    name: "Product Vision",
    description: "Ability to articulate a clear, compelling product vision that aligns stakeholders and guides decision-making",
    category: "strategy",
    level: 0,
  },
  "business-strategy": {
    id: "business-strategy",
    name: "Business Strategy",
    description: "Understanding of business models, competitive positioning, and how product strategy connects to business objectives",
    category: "strategy",
    level: 0,
  },
  "market-analysis": {
    id: "market-analysis",
    name: "Market Analysis",
    description: "Ability to research, analyze, and interpret market trends, size, growth, and dynamics",
    category: "strategy",
    level: 0,
  },
  "competitive-analysis": {
    id: "competitive-analysis",
    name: "Competitive Analysis",
    description: "Systematic evaluation of competitors' products, strategies, strengths, and weaknesses",
    category: "strategy",
    level: 0,
  },
  "pricing-strategy": {
    id: "pricing-strategy",
    name: "Pricing Strategy",
    description: "Understanding of pricing models, value-based pricing, and ability to develop pricing strategies",
    category: "strategy",
    level: 0,
  },
  "go-to-market": {
    id: "go-to-market",
    name: "Go-to-Market Strategy",
    description: "Planning and executing product launches, positioning, messaging, and adoption strategies",
    category: "strategy",
    level: 0,
  },

  // Discovery skills
  "customer-research": {
    id: "customer-research",
    name: "Customer Research",
    description: "Planning and conducting user research: interviews, surveys, observation, and synthesizing insights",
    category: "discovery",
    level: 0,
  },
  "problem-validation": {
    id: "problem-validation",
    name: "Problem Validation",
    description: "Testing whether a problem is worth solving: verifying pain points, validating need, assessing willingness to pay",
    category: "discovery",
    level: 0,
  },
  "user-interviews": {
    id: "user-interviews",
    name: "User Interviews",
    description: "Designing and conducting effective user interviews to uncover insights, behaviors, and needs",
    category: "discovery",
    level: 0,
  },
  "usability-testing": {
    id: "usability-testing",
    name: "Usability Testing",
    description: "Planning and running usability tests to evaluate product designs and identify friction points",
    category: "discovery",
    level: 0,
  },
  "data-discovery": {
    id: "data-discovery",
    name: "Data-Driven Discovery",
    description: "Using data (analytics, logs, A/B tests) to inform discovery and identify opportunities",
    category: "discovery",
    level: 0,
  },
  "opportunity-assessment": {
    id: "opportunity-assessment",
    name: "Opportunity Assessment",
    description: "Evaluating and prioritizing opportunities based on value, feasibility, and strategic fit",
    category: "discovery",
    level: 0,
  },

  // Delivery skills
  "agile-scrum": {
    id: "agile-scrum",
    name: "Agile / Scrum",
    description: "Working effectively in agile teams: sprint planning, standups, retrospectives, and iterative delivery",
    category: "delivery",
    level: 0,
  },
  "roadmapping": {
    id: "roadmapping",
    name: "Roadmapping",
    description: "Creating and maintaining product roadmaps that balance strategic direction with tactical execution",
    category: "delivery",
    level: 0,
  },
  "prioritization": {
    id: "prioritization",
    name: "Prioritization",
    description: "Using frameworks (RICE, WSJF, Kano, etc.) to prioritize features, initiatives, and backlog items",
    category: "delivery",
    level: 0,
  },
  "stakeholder-management": {
    id: "stakeholder-management",
    name: "Stakeholder Management",
    description: "Identifying, engaging, and aligning stakeholders; managing expectations and building consensus",
    category: "delivery",
    level: 0,
  },
  "execution-management": {
    id: "execution-management",
    name: "Execution Management",
    description: "Driving products from idea to launch: coordinating teams, managing timelines, removing blockers",
    category: "delivery",
    level: 0,
  },
  "cross-functional-leadership": {
    id: "cross-functional-leadership",
    name: "Cross-functional Leadership",
    description: "Leading without authority across engineering, design, marketing, sales, and other functions",
    category: "delivery",
    level: 0,
  },

  // Analytics skills
  "product-metrics": {
    id: "product-metrics",
    name: "Product Metrics",
    description: "Defining, tracking, and acting on key product metrics: activation, retention, engagement, revenue, etc.",
    category: "analytics",
    level: 0,
  },
  "sql-data-querying": {
    id: "sql-data-querying",
    name: "SQL / Data Querying",
    description: "Writing SQL queries to extract and analyze data from databases",
    category: "analytics",
    level: 0,
  },
  "experimentation": {
    id: "experimentation",
    name: "Experimentation",
    description: "Designing and running A/B tests and experiments: hypothesis formation, statistical validity, interpretation",
    category: "analytics",
    level: 0,
  },
  "analytics-tools": {
    id: "analytics-tools",
    name: "Analytics Tools",
    description: "Proficiency with analytics platforms: Mixpanel, Amplitude, Google Analytics, Heap, etc.",
    category: "analytics",
    level: 0,
  },
  "dashboarding": {
    id: "dashboarding",
    name: "Dashboarding / Reporting",
    description: "Creating dashboards and reports to communicate product performance and insights",
    category: "analytics",
    level: 0,
  },
  "causal-inference": {
    id: "causal-inference",
    name: "Causal Inference Basics",
    description: "Understanding causal relationships vs correlation; basic experimental design and interpretation",
    category: "analytics",
    level: 0,
  },

  // AI & Emerging Tech skills
  "genai-fundamentals": {
    id: "genai-fundamentals",
    name: "GenAI Fundamentals",
    description: "Understanding of LLMs, tokens, embeddings, capabilities, limitations, and how GenAI works",
    category: "ai",
    level: 0,
  },
  "ai-product-strategy": {
    id: "ai-product-strategy",
    name: "AI Product Strategy",
    description: "Knowing when and how to use AI in products; evaluating AI opportunities vs hype; strategic thinking about AI",
    category: "ai",
    level: 0,
  },
  "llm-applications": {
    id: "llm-applications",
    name: "LLM Applications",
    description: "Practical understanding of LLM applications: chat, RAG, agents, fine-tuning, and when to use each",
    category: "ai",
    level: 0,
  },
  "ai-ethics-governance": {
    id: "ai-ethics-governance",
    name: "AI Ethics & Governance",
    description: "Understanding AI ethics: bias, fairness, disclosure, risk, responsible AI practices, and governance",
    category: "ai",
    level: 0,
  },
  "emerging-tech-awareness": {
    id: "emerging-tech-awareness",
    name: "Emerging Tech Awareness",
    description: "Keeping current with emerging technologies; evaluating new tech; separating signal from noise",
    category: "ai",
    level: 0,
  },

  // Leadership & Influence skills
  "team-leadership": {
    id: "team-leadership",
    name: "Team Leadership",
    description: "Leading, mentoring, and developing product teams; hiring, coaching, and team building",
    category: "leadership",
    level: 0,
  },
  "executive-communication": {
    id: "executive-communication",
    name: "Executive Communication",
    description: "Presenting to leadership; storytelling with data; executive presence; influencing at the highest level",
    category: "leadership",
    level: 0,
  },
  "pl-ownership": {
    id: "pl-ownership",
    name: "P&L Ownership",
    description: "Understanding and owning P&L: revenue, margin, cost; building business cases; financial acumen",
    category: "leadership",
    level: 0,
  },
  "org-design-awareness": {
    id: "org-design-awareness",
    name: "Organizational Design Awareness",
    description: "Understanding how organizations are structured; navigating matrixed orgs; designing effective team structures",
    category: "leadership",
    level: 0,
  },
  "negotiation": {
    id: "negotiation",
    name: "Negotiation",
    description: "Negotiating priorities, resources, timelines; resolving conflicts; securing buy-in and alignment",
    category: "leadership",
    level: 0,
  },
};

/**
 * Get all skills organized by category
 */
export function getSkillsByCategory(): Record<SkillCategory, Skill[]> {
  const result: Partial<Record<SkillCategory, Skill[]>> = {};

  Object.values(PM_SKILLS).forEach((skill) => {
    if (!result[skill.category]) {
      result[skill.category] = [];
    }
    result[skill.category]!.push(skill);
  });

  return result as Record<SkillCategory, Skill[]>;
}

/**
 * Get a skill by ID
 */
export function getSkillById(id: string): Skill | undefined {
  return PM_SKILLS[id];
}

/**
 * Get all skill IDs
 */
export function getAllSkillIds(): string[] {
  return Object.keys(PM_SKILLS);
}

/**
 * PM Career Ladder — target roles with expected proficiency levels by competency area
 */
export interface CareerLevel {
  role: string;
  track: string;
  expectedProficiency: Partial<Record<SkillCategory, number>>;
  description: string;
}

export const PM_CAREER_LADDER: CareerLevel[] = [
  {
    role: "Associate Product Manager",
    track: "product-management",
    expectedProficiency: {
      strategy: 2,
      discovery: 2,
      delivery: 2,
      analytics: 1,
      ai: 1,
      leadership: 1,
    },
    description: "Entry-level PM role. Focus on learning, supporting senior PMs, and developing core product skills.",
  },
  {
    role: "Product Manager",
    track: "product-management",
    expectedProficiency: {
      strategy: 3,
      discovery: 3,
      delivery: 3,
      analytics: 2,
      ai: 2,
      leadership: 2,
    },
    description: "Core PM role. Owns a product or feature area. Expected to independently drive discovery, delivery, and measurement.",
  },
  {
    role: "Senior Product Manager",
    track: "product-management",
    expectedProficiency: {
      strategy: 3,
      discovery: 3,
      delivery: 4,
      analytics: 3,
      ai: 2,
      leadership: 3,
    },
    description: "Experienced PM who operates independently and mentors others. Strong execution and growing strategic thinking.",
  },
  {
    role: "Lead Product Manager",
    track: "product-management",
    expectedProficiency: {
      strategy: 3,
      discovery: 3,
      delivery: 4,
      analytics: 3,
      ai: 3,
      leadership: 3,
    },
    description: "Leads a team of PMs or a significant product area. Expected to set direction and elevate the team.",
  },
  {
    role: "Group Product Manager",
    track: "product-management",
    expectedProficiency: {
      strategy: 4,
      discovery: 3,
      delivery: 4,
      analytics: 3,
      ai: 3,
      leadership: 4,
    },
    description: "Manages a group of PMs across multiple products. Strong strategic and leadership capabilities required.",
  },
  {
    role: "Director of Product",
    track: "product-management",
    expectedProficiency: {
      strategy: 4,
      discovery: 3,
      delivery: 4,
      analytics: 3,
      ai: 3,
      leadership: 4,
    },
    description: "Leads product organization or major product area. Heavy focus on strategy, leadership, and business impact.",
  },
  {
    role: "VP Product",
    track: "product-management",
    expectedProficiency: {
      strategy: 5,
      discovery: 3,
      delivery: 4,
      analytics: 4,
      ai: 4,
      leadership: 5,
    },
    description: "Executive leadership of product. Sets company-wide product vision, strategy, and culture.",
  },
  {
    role: "CPO",
    track: "product-management",
    expectedProficiency: {
      strategy: 5,
      discovery: 3,
      delivery: 4,
      analytics: 4,
      ai: 4,
      leadership: 5,
    },
    description: "Chief Product Officer. Ultimate product leadership role. Owns product strategy, organization, and outcomes at the highest level.",
  },
];

/**
 * Get expected proficiency for a role
 */
export function getExpectedProficiency(role: string): Partial<Record<SkillCategory, number>> | undefined {
  const found = PM_CAREER_LADDER.find((level) => level.role === role);
  return found?.expectedProficiency;
}

/**
 * Regional benchmarks (seed data — to be replaced with real market data over time)
 */
export const REGIONAL_BENCHMARKS: Record<string, Record<string, Record<SkillCategory, { average: number; topQuartile: number }>>> = {
  "MENA": {
    "Senior Product Manager": {
      strategy: { average: 3.2, topQuartile: 4.0 },
      discovery: { average: 3.5, topQuartile: 4.0 },
      delivery: { average: 3.8, topQuartile: 4.5 },
      analytics: { average: 3.0, topQuartile: 4.0 },
      ai: { average: 2.0, topQuartile: 3.0 },
      leadership: { average: 2.8, topQuartile: 4.0 },
    },
    "Product Manager": {
      strategy: { average: 2.8, topQuartile: 3.5 },
      discovery: { average: 3.0, topQuartile: 3.5 },
      delivery: { average: 3.2, topQuartile: 4.0 },
      analytics: { average: 2.5, topQuartile: 3.0 },
      ai: { average: 1.5, topQuartile: 2.5 },
      leadership: { average: 2.0, topQuartile: 3.0 },
    },
  },
  "North America": {
    "Senior Product Manager": {
      strategy: { average: 3.5, topQuartile: 4.5 },
      discovery: { average: 3.5, topQuartile: 4.0 },
      delivery: { average: 3.8, topQuartile: 4.5 },
      analytics: { average: 3.5, topQuartile: 4.5 },
      ai: { average: 2.5, topQuartile: 3.5 },
      leadership: { average: 3.0, topQuartile: 4.0 },
    },
    "Product Manager": {
      strategy: { average: 3.0, topQuartile: 3.5 },
      discovery: { average: 3.0, topQuartile: 3.5 },
      delivery: { average: 3.5, topQuartile: 4.0 },
      analytics: { average: 3.0, topQuartile: 4.0 },
      ai: { average: 2.0, topQuartile: 3.0 },
      leadership: { average: 2.5, topQuartile: 3.5 },
    },
  },
  "APAC": {
    "Senior Product Manager": {
      strategy: { average: 3.0, topQuartile: 4.0 },
      discovery: { average: 3.2, topQuartile: 3.8 },
      delivery: { average: 3.5, topQuartile: 4.2 },
      analytics: { average: 3.2, topQuartile: 4.0 },
      ai: { average: 2.2, topQuartile: 3.2 },
      leadership: { average: 2.5, topQuartile: 3.5 },
    },
    "Product Manager": {
      strategy: { average: 2.5, topQuartile: 3.0 },
      discovery: { average: 2.8, topQuartile: 3.2 },
      delivery: { average: 3.0, topQuartile: 3.5 },
      analytics: { average: 2.8, topQuartile: 3.5 },
      ai: { average: 1.8, topQuartile: 2.5 },
      leadership: { average: 2.0, topQuartile: 3.0 },
    },
  },
  "EMEA": {
    "Senior Product Manager": {
      strategy: { average: 3.3, topQuartile: 4.0 },
      discovery: { average: 3.3, topQuartile: 3.8 },
      delivery: { average: 3.5, topQuartile: 4.2 },
      analytics: { average: 3.2, topQuartile: 4.0 },
      ai: { average: 2.3, topQuartile: 3.2 },
      leadership: { average: 2.8, topQuartile: 3.8 },
    },
    "Product Manager": {
      strategy: { average: 2.8, topQuartile: 3.2 },
      discovery: { average: 2.8, topQuartile: 3.2 },
      delivery: { average: 3.2, topQuartile: 3.8 },
      analytics: { average: 2.8, topQuartile: 3.5 },
      ai: { average: 1.8, topQuartile: 2.5 },
      leadership: { average: 2.2, topQuartile: 3.0 },
    },
  },
};

/**
 * Get benchmark for a region and role
 */
export function getBenchmark(region: string, role: string): Record<SkillCategory, { average: number; topQuartile: number }> | undefined {
  return REGIONAL_BENCHMARKS[region]?.[role];
}

/**
 * Available regions
 */
export const REGIONS = [
  { value: "MENA", label: "MENA (Middle East & North Africa)" },
  { value: "North America", label: "North America (USA & Canada)" },
  { value: "APAC", label: "APAC (Asia-Pacific)" },
  { value: "EMEA", label: "EMEA (Europe, Middle East & Africa ex-MENA)" },
] as const;

/**
 * Industry options
 */
export const INDUSTRIES = [
  "Technology / Software",
  "Fintech",
  "E-commerce / Retail",
  "Healthcare / Healthtech",
  "Education / Edtech",
  "Media / Entertainment",
  "Telecommunications",
  "Government / Public Sector",
  "Finance / Banking",
  "Automotive / Mobility",
  "Energy / Utilities",
  "Real Estate / Proptech",
  "Logistics / Supply Chain",
  "Food / Beverage",
  "Other",
] as const;
