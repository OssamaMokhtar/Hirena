// Hirena — Pillar Model
// Core competency framework and scoring weights for PM assessment

export const PILLAR_WEIGHTS: Record<string, number> = {
  STRATEGY: 20,
  DISCOVERY: 20,
  DELIVERY: 25,
  ANALYTICS: 15,
  AI: 10,
  LEADERSHIP: 10,
};

export const PILLAR_DESCRIPTIONS: Record<string, string> = {
  STRATEGY: "Product vision, business strategy, market analysis, competitive intelligence, and strategic thinking. High-weight for senior roles where setting direction matters.",
  DISCOVERY: "Customer research, problem validation, user interviews, usability testing, and data-driven opportunity identification. High-weight for early-career roles building core PM skills.",
  DELIVERY: "Agile/Scrum, roadmapping, prioritization, stakeholder management, execution management, and cross-functional leadership. Consistently high-weight across all levels.",
  ANALYTICS: "Product metrics, SQL/data querying, experimentation (A/B testing), analytics tools, dashboarding, and causal inference basics. Growing weight as roles senior up.",
  AI: "GenAI fundamentals, AI product strategy, LLM applications, AI ethics & governance, and emerging tech awareness. Emerging but increasingly critical at all levels.",
  LEADERSHIP: "Team leadership, executive communication, P&L ownership, organizational design awareness, and negotiation. Weight increases significantly with seniority.",
};

export const PILLAR_SKILLS: Record<string, string[]> = {
  STRATEGY: [
    "Product Vision",
    "Business Strategy",
    "Market Analysis",
    "Competitive Analysis",
    "Pricing Strategy",
    "Go-to-Market Strategy",
  ],
  DISCOVERY: [
    "Customer Research",
    "Problem Validation",
    "User Interviews",
    "Usability Testing",
    "Data-Driven Discovery",
    "Opportunity Assessment",
  ],
  DELIVERY: [
    "Agile / Scrum",
    "Roadmapping",
    "Prioritization",
    "Stakeholder Management",
    "Execution Management",
    "Cross-functional Leadership",
  ],
  ANALYTICS: [
    "Product Metrics",
    "SQL / Data Querying",
    "Experimentation",
    "Analytics Tools",
    "Dashboarding / Reporting",
    "Causal Inference Basics",
  ],
  AI: [
    "GenAI Fundamentals",
    "AI Product Strategy",
    "LLM Applications",
    "AI Ethics & Governance",
    "Emerging Tech Awareness",
  ],
  LEADERSHIP: [
    "Team Leadership",
    "Executive Communication",
    "P&L Ownership",
    "Organizational Design Awareness",
    "Negotiation",
  ],
};

export const PROFICIENCY_DESCRIPTORS: Record<number, string> = {
  0: "No Exposure — You've heard of this but couldn't do it",
  1: "Aware — You understand the concept but haven't applied it practically",
  2: "Basic — You can handle simple cases, often with guidance",
  3: "Intermediate — You handle common cases independently and produce solid work",
  4: "Advanced — You handle complex cases, guide others, and produce consistent high-quality work",
  5: "Expert — You set strategy, teach others, operate at org level",
};
