import type { Benchmark, SkillCategory } from "@/types";
import type { Skill } from "@/types";
import { SOFTWARE_ENGINEER_SKILLS } from "./software-competency-model";

/**
 * Hirena PM Competency Model
 * Defines the skills and competency areas for Product Management assessment.
 */

export const COMPETENCY_AREAS: Partial<Record<SkillCategory, {
  name: string;
  description: string;
  weight: number; // Default weight (adjusted by target role)
}>> = {
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
    description: "Ability to articulate a compelling long-term vision for a product that aligns with business goals and user needs",
    category: "strategy",
    level: 0,
  },
  "business-strategy": {
    id: "business-strategy",
    name: "Business Strategy",
    description: "Understanding business models, go-to-market strategy, competitive positioning, and financial implications of product decisions",
    category: "strategy",
    level: 0,
  },
  "market-analysis": {
    id: "market-analysis",
    name: "Market Analysis",
    description: "Researching and analyzing market trends, size, growth, segmentation, and opportunities for product expansion",
    category: "strategy",
    level: 0,
  },
  "competitive-analysis": {
    id: "competitive-analysis",
    name: "Competitive Analysis",
    description: "Systematically evaluating competitors' products, features, pricing, positioning, and identifying competitive advantages",
    category: "strategy",
    level: 0,
  },
  "pricing-strategy": {
    id: "pricing-strategy",
    name: "Pricing Strategy",
    description: "Developing pricing models, understanding price elasticity, packaging, tiering, and optimizing for revenue and adoption",
    category: "strategy",
    level: 0,
  },
  "go-to-market": {
    id: "go-to-market",
    name: "Go-to-Market Strategy",
    description: "Planning and executing product launches: positioning, messaging, sales enablement, marketing campaigns, and channel strategy",
    category: "strategy",
    level: 0,
  },

  // Discovery skills
  "customer-research": {
    id: "customer-research",
    name: "Customer Research",
    description: "Conducting user interviews, surveys, focus groups, and ethnographic research to understand user needs, behaviors, and pain points",
    category: "discovery",
    level: 0,
  },
  "problem-validation": {
    id: "problem-validation",
    name: "Problem Validation",
    description: "Validating that a problem is worth solving: assessing market need, user willingness to pay, and opportunity size before building",
    category: "discovery",
    level: 0,
  },
  "user-interviews": {
    id: "user-interviews",
    name: "User Interviews",
    description: "Designing and conducting effective user interviews: question design, facilitation, note-taking, and synthesizing insights",
    category: "discovery",
    level: 0,
  },
  "usability-testing": {
    id: "usability-testing",
    name: "Usability Testing",
    description: "Planning and conducting usability tests: task design, moderation, measuring success metrics, and identifying UX issues",
    category: "discovery",
    level: 0,
  },
  "data-discovery": {
    id: "data-discovery",
    name: "Data-Driven Discovery",
    description: "Using analytics, behavioral data, and quantitative methods to discover user problems, validate hypotheses, and identify opportunities",
    category: "discovery",
    level: 0,
  },
  "opportunity-assessment": {
    id: "opportunity-assessment",
    name: "Opportunity Assessment",
    description: "Evaluating and prioritizing product opportunities using frameworks like CIRCLES, assessing value, feasibility, and strategic fit",
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
    description: "Communicating effectively with executives and board members: storytelling, data-driven presentations, and decision facilitation",
    category: "leadership",
    level: 0,
  },
  "pl-ownership": {
    id: "pl-ownership",
    name: "P&L Ownership",
    description: "Understanding and managing product P&L: revenue, costs, margins, and financial accountability",
    category: "leadership",
    level: 0,
  },
  "organizational-skills": {
    id: "organizational-skills",
    name: "Organizational Skills",
    description: "Navigating organizational dynamics, building alliances, influencing culture, and driving change management",
    category: "leadership",
    level: 0,
  },
};

/**
 * PM career ladder - role progression levels
 */
export const PM_CAREER_LADDER = [
  { role: "Associate Product Manager", level: 1 },
  { role: "Product Manager", level: 2 },
  { role: "Senior Product Manager", level: 3 },
  { role: "Lead Product Manager", level: 4 },
  { role: "Principal Product Manager", level: 5 },
  { role: "Director of Product", level: 6 },
  { role: "VP of Product", level: 7 },
  { role: "Chief Product Officer", level: 8 },
] as const;

/**
 * Regional benchmarks for PM roles (average and top quartile scores out of 5)
 */
export const REGIONAL_BENCHMARKS: Record<string, Record<string, Record<string, { average: number; topQuartile: number }>>> = {
  "MENA": {
    "Senior Product Manager": {
      strategy: { average: 2.5, topQuartile: 3.5 },
      discovery: { average: 2.8, topQuartile: 3.5 },
      delivery: { average: 3.0, topQuartile: 4.0 },
      analytics: { average: 2.2, topQuartile: 3.0 },
      ai: { average: 1.2, topQuartile: 2.0 },
      leadership: { average: 1.8, topQuartile: 2.5 },
    },
    "Product Manager": {
      strategy: { average: 2.0, topQuartile: 2.5 },
      discovery: { average: 2.2, topQuartile: 3.0 },
      delivery: { average: 2.5, topQuartile: 3.0 },
      analytics: { average: 1.8, topQuartile: 2.5 },
      ai: { average: 1.0, topQuartile: 1.5 },
      leadership: { average: 1.5, topQuartile: 2.0 },
    },
    "Associate Product Manager": {
      strategy: { average: 1.5, topQuartile: 2.0 },
      discovery: { average: 1.8, topQuartile: 2.5 },
      delivery: { average: 2.0, topQuartile: 2.5 },
      analytics: { average: 1.5, topQuartile: 2.0 },
      ai: { average: 0.8, topQuartile: 1.0 },
      leadership: { average: 1.0, topQuartile: 1.5 },
    },
  },
};

/**
 * Get benchmark for a region and role
 */
export function getBenchmark(region: string, role: string): Partial<Record<SkillCategory, { average: number; topQuartile: number }>> | undefined {
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

/**
 * Software Engineering career ladder roles available for assessment
 */
export const SOFTWARE_ENGINEERING_ROLES = [
  { role: "Junior Software Engineer", track: "software-engineering" },
  { role: "Software Engineer", track: "software-engineering" },
  { role: "Senior Software Engineer", track: "software-engineering" },
  { role: "Lead Software Engineer", track: "software-engineering" },
  { role: "Principal Software Engineer", track: "software-engineering" },
  { role: "Staff Software Engineer", track: "software-engineering" },
  { role: "Engineering Manager", track: "software-engineering" },
  { role: "Director of Engineering", track: "software-engineering" },
] as const;

/**
 * Import software engineering skills from the dedicated model file
 */
export const SOFTWARE_ENGINEERING_SKILLS = SOFTWARE_ENGINEER_SKILLS;

/**
 * AI inference questions for Product Management track
 * These questions help GPT-4o infer skill proficiency from textual descriptions
 */
export const PM_AI_INFERENCE_QUESTIONS = [
  {
    skillId: "product-strategy",
    question: "Describe a product strategy you developed or contributed to. What was the market need, your approach, and what was the outcome?",
    placeholder: "e.g. I led the product strategy for a B2B SaaS platform serving the healthcare industry...",
  },
  {
    skillId: "customer-discovery",
    question: "Tell us about a time you conducted customer research or user interviews. What did you learn and how did it influence the product?",
    placeholder: "e.g. I conducted 15 user interviews with HR managers to understand their pain points...",
  },
  {
    skillId: "product-execution",
    question: "Describe a complex product you delivered from conception to launch. What was your role, key decisions, and results?",
    placeholder: "e.g. I owned the end-to-end delivery of a mobile app feature that increased user engagement by 40%...",
  },
  {
    skillId: "stakeholder-management",
    question: "Give an example of how you managed conflicting stakeholder priorities or communicated a difficult product decision.",
    placeholder: "e.g. I had to align engineering, design, and business stakeholders on a pivot...",
  },
  {
    skillId: "data-driven-decision-making",
    question: "Describe a time you used data or analytics to make a product decision. What metrics did you track and what was the impact?",
    placeholder: "e.g. I analyzed user funnel data and identified a 60% drop-off at onboarding...",
  },
] as const;

/**
 * AI inference questions for Software Engineering track
 */
export const SOFTWARE_ENGINEERING_AI_INFERENCE_QUESTIONS = [
  {
    skillId: "technical-problem-solving",
    question: "Describe a challenging technical problem you solved. What was the problem, your approach, and what was the outcome?",
    placeholder: "e.g. I optimized a database query that was causing performance issues, reducing response time from 5s to 200ms...",
  },
  {
    skillId: "system-design",
    question: "Tell us about a system or architecture you designed. What were the requirements, your design decisions, and trade-offs?",
    placeholder: "e.g. I designed a microservices architecture for a payment processing system...",
  },
  {
    skillId: "code-quality",
    question: "Describe your approach to writing clean, maintainable code. Give an example of a refactoring or improvement you led.",
    placeholder: "e.g. I introduced TDD to our team and refactored a legacy module, reducing bug rate by 40%...",
  },
  {
    skillId: "collaboration",
    question: "Give an example of how you collaborated with team members or resolved technical disagreements.",
    placeholder: "e.g. I led code reviews and mentored junior developers, helping them grow their skills...",
  },
  {
    skillId: "continuous-improvement",
    question: "Describe a time you improved a development process, tooling, or infrastructure. What was the impact?",
    placeholder: "e.g. I set up CI/CD pipelines that reduced deployment time from hours to minutes...",
  },
] as const;
