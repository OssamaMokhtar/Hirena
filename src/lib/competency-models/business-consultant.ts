import type { Skill, ProficiencyLevel, CompetencyArea, CareerLadderStep } from "@/types";

/**
 * Business Consultant (IT) Competency Model
 *
 * Covers business analysis, requirements engineering, stakeholder management,
 * IT strategy, digital transformation, and consulting delivery in technology contexts.
 *
 * 24 skills across 6 competency areas.
 */

export const SKILLS: Record<string, Skill> = {
  // ── Business & Domain Knowledge ──────────────────────────────────────────
  "business-domain-knowledge": {
    id: "business-domain-knowledge",
    name: "Business & Domain Knowledge",
    description: "Understanding of the client's industry, business model, value chain, competitive landscape, and key business drivers. Ability to speak the language of the business and translate technology concepts into business outcomes.",
    category: "domain-knowledge",
    level: 0,
  },
  "business-process-modeling": {
    id: "business-process-modeling",
    name: "Business Process Modeling",
    description: "Modeling current-state and future-state business processes using BPMN, UML activity diagrams, flowcharts, or value stream maps. Identifying process bottlenecks, redundancies, and automation opportunities.",
    category: "process",
    level: 0,
  },
  "requirements-engineering": {
    id: "requirements-engineering",
    name: "Requirements Engineering",
    description: "Eliciting, analyzing, specifying, validating, and managing business and technical requirements. Writing clear user stories, use cases, business requirements documents (BRD), and functional specifications.",
    category: "process",
    level: 0,
  },
  "stakeholder-analysis": {
    id: "stakeholder-analysis",
    name: "Stakeholder Analysis & Management",
    description: "Identifying all stakeholders, mapping their influence/interest, understanding their needs and concerns, managing expectations, and communicating effectively across diverse groups — from C-suite to frontline staff.",
    category: "stakeholder",
    level: 0,
  },

  // ── IT Strategy & Digital Transformation ────────────────────────────────
  "it-strategy-alignment": {
    id: "it-strategy-alignment",
    name: "IT Strategy Alignment",
    description: "Aligning IT investments and capabilities with business strategy. Understanding how technology enables business objectives, prioritizing IT initiatives based on business value, and communicating the strategic rationale to leadership.",
    category: "strategy",
    level: 0,
  },
  "digital-transformation": {
    id: "digital-transformation",
    name: "Digital Transformation Advisory",
    description: "Advising organizations on digital transformation: assessing current digital maturity, designing transformation roadmaps, identifying high-impact digital initiatives, managing change, and measuring transformation outcomes.",
    category: "strategy",
    level: 0,
  },
  "technology-trend-awareness": {
    id: "technology-trend-awareness",
    name: "Technology Trend Awareness",
    description: "Keeping abreast of emerging technologies (AI/ML, cloud, IoT, blockchain, RPA, etc.) and understanding their potential business applications, benefits, risks, and adoption timelines. Separating hype from substance.",
    category: "domain-knowledge",
    level: 0,
  },
  "it-investment-analysis": {
    id: "it-investment-analysis",
    name: "IT Investment & ROI Analysis",
    description: "Analyzing IT project proposals for business case strength: estimating costs, benefits, risks, and ROI. Building financial models (NPV, IRR, payback period) for technology investments. Prioritizing portfolios based on value, risk, and strategic fit.",
    category: "analysis",
    level: 0,
  },
  "cloud-strategy-advisory": {
    id: "cloud-strategy-advisory",
    name: "Cloud Strategy Advisory",
    description: "Advising on cloud adoption: migration strategies (rehost, refactor, rebuild), multi-cloud vs single-cloud decisions, cloud cost modeling (TCO), cloud security and compliance considerations, and cloud vendor selection.",
    category: "strategy",
    level: 0,
  },

  // ── Consulting & Delivery Skills ─────────────────────────────────────────
  "consulting-engagement-management": {
    id: "consulting-engagement-management",
    name: "Consulting Engagement Management",
    description: "Managing consulting engagements from kickoff to closure: defining scope, setting expectations, managing timelines and deliverables, handling scope changes, running steering committees, and ensuring client satisfaction.",
    category: "process",
    level: 0,
  },
  "workshop-facilitation": {
    id: "workshop-facilitation",
    name: "Workshop Facilitation & Design Thinking",
    description: "Designing and facilitating workshops: discovery sessions, brainstorming, design thinking (empathize, define, ideate, prototype, test), decision-making workshops, and alignment sessions. Creating engaging, productive group experiences.",
    category: "communication",
    level: 0,
  },
  "presentation-skills": {
    id: "presentation-skills",
    name: "Executive Presentation Skills",
    description: "Presenting findings, recommendations, and proposals to senior executives and boards. Storytelling with data, creating impactful slides, handling Q&A confidently, and tailoring messages to the audience.",
    category: "communication",
    level: 0,
  },
  "written-communication": {
    id: "written-communication",
    name: "Written Communication & Documentation",
    description: "Producing clear, concise, and professional written deliverables: consulting reports, executive summaries, emails, memos, proposals, and documentation. Adapting tone and detail to the audience.",
    category: "communication",
    level: 0,
  },
  "change-management": {
    id: "change-management",
    name: "Change Management & Adoption",
    description: "Planning and driving organizational change: stakeholder engagement, communication planning, training and enablement, resistance management, and measuring adoption. Using frameworks like ADKAR, Kotter, or Prosci.",
    category: "process",
    level: 0,
  },

  // ── Analysis & Problem-Solving ───────────────────────────────────────────
  "problem-definition": {
    id: "problem-definition",
    name: "Problem Definition & Framing",
    description: "Distinguishing symptoms from root causes. Framing problems clearly and completely: what is the problem, who is affected, what are the constraints, what would success look like. Avoiding solution-jumping.",
    category: "problem-solving",
    level: 0,
  },
  "data-driven-decision-making": {
    id: "data-driven-decision-making",
    name: "Data-Driven Decision Making",
    description: "Using data to inform recommendations: identifying relevant data sources, analyzing data (descriptive, diagnostic, predictive), visualizing insights, and building evidence-based cases for decisions.",
    category: "analysis",
    level: 0,
  },
  "root-cause-analysis": {
    id: "root-cause-analysis",
    name: "Root Cause Analysis",
    description: "Systematically identifying root causes of business or technical problems using techniques like 5 Whys, fishbone diagrams, fault tree analysis, or Pareto analysis. Moving beyond surface symptoms to underlying causes.",
    category: "problem-solving",
    level: 0,
  },
  "scenario-planning": {
    id: "scenario-planning",
    name: "Scenario Planning & Risk Assessment",
    description: "Developing multiple plausible future scenarios, assessing their likelihood and impact, identifying early warning signals, and designing strategies that are robust across scenarios. Conducting risk assessments for technology initiatives.",
    category: "analysis",
    level: 0,
  },

  // ── Project & Program Management ─────────────────────────────────────────
  "agile-methodologies": {
    id: "agile-methodologies",
    name: "Agile & Iterative Methodologies",
    description: "Applying agile principles and practices: Scrum, Kanban, sprint planning, daily standups, retrospectives, user story mapping, MVP definition, iterative delivery. Helping clients adopt agile ways of working.",
    category: "process",
    level: 0,
  },
  "project-management": {
    id: "project-management",
    name: "Project Management",
    description: "Planning, executing, and closing projects: scope management, scheduling, budgeting, resource allocation, risk management, quality management, and stakeholder communication. Familiarity with PMP/PRINCE2 principles.",
    category: "process",
    level: 0,
  },
  "vendor-management": {
    id: "vendor-management",
    name: "Vendor & Partner Management",
    description: "Selecting, negotiating with, and managing technology vendors and partners. Writing RFPs, evaluating proposals, negotiating contracts, managing relationships, and ensuring vendors deliver on commitments.",
    category: "process",
    level: 0,
  },
  "budget-management": {
    id: "budget-management",
    name: "Budget & Cost Management",
    description: "Managing consulting engagement budgets or client IT budgets: estimating costs, tracking spend, forecasting, identifying cost-saving opportunities, and ensuring financial discipline without compromising quality.",
    category: "analysis",
    level: 0,
  },

  // ── Technology Knowledge (consulting context) ────────────────────────────
  "erp-knowledge": {
    id: "erp-knowledge",
    name: "ERP & Enterprise Systems Knowledge",
    description: "Understanding enterprise resource planning (ERP) systems (SAP, Oracle, Microsoft Dynamics, etc.) and related enterprise systems (CRM, HCM, SCM). Knowing implementation approaches, integration patterns, and common pitfalls.",
    category: "technical-foundation",
    level: 0,
  },
  "integration-architecture": {
    id: "integration-architecture",
    name: "Integration & API Strategy",
    description: "Understanding integration patterns (point-to-point, ESB, API-led, event-driven), API design principles (REST, GraphQL), integration platforms (iPaaS), data integration, and how systems connect across the enterprise.",
    category: "system-design",
    level: 0,
  },
  "data-architecture-basics": {
    id: "data-architecture-basics",
    name: "Data Architecture & Governance Basics",
    description: "Understanding enterprise data architecture: data models, data warehouses, data lakes, master data management, data governance, data quality, and analytics platforms. Advising on data strategy as part of IT strategy.",
    category: "data",
    level: 0,
  },
  "cybersecurity-awareness": {
    id: "cybersecurity-awareness",
    name: "Cybersecurity Awareness for Business Leaders",
    description: "Understanding cybersecurity risks, threats, and controls at a level appropriate for advising business leaders. Knowing compliance requirements (GDPR, HIPAA, PCI DSS, etc.), risk management approaches, and how to ask the right security questions.",
    category: "security",
    level: 0,
  },
};

export const COMPETENCY_AREAS: CompetencyArea[] = [
  { id: "domain-knowledge", name: "Business & Domain Knowledge", description: "Understanding the business context, industry, and how technology creates value.", skills: ["business-domain-knowledge","technology-trend-awareness"], weight: 18 },
  { id: "strategy", name: "IT Strategy & Transformation", description: "Aligning technology with business strategy and driving digital transformation.", skills: ["it-strategy-alignment","digital-transformation","it-investment-analysis","cloud-strategy-advisory"], weight: 22 },
  { id: "process", name: "Consulting & Delivery Process", description: "Managing engagements, requirements, change, and delivery effectively.", skills: ["business-process-modeling","requirements-engineering","consulting-engagement-management","change-management","agile-methodologies","project-management","vendor-management","budget-management"], weight: 28 },
  { id: "communication", name: "Communication & Stakeholder Management", description: "Communicating clearly and managing relationships across all levels.", skills: ["stakeholder-analysis","workshop-facilitation","presentation-skills","written-communication"], weight: 18 },
  { id: "analysis", name: "Analysis & Problem-Solving", description: "Using data, logic, and structured methods to solve complex business problems.", skills: ["problem-definition","data-driven-decision-making","root-cause-analysis","scenario-planning","it-investment-analysis","budget-management"], weight: 22 },
  { id: "technical-foundation", name: "Technology Knowledge", description: "Understanding the technology landscape well enough to advise credibly.", skills: ["erp-knowledge","integration-architecture","data-architecture-basics","cybersecurity-awareness","technology-trend-awareness"], weight: 14 },
];

export const LEVELS: ProficiencyLevel[] = [0, 1, 2, 3, 4, 5, 6, 7];

export const CAREER_LADDER: CareerLadderStep[] = [
  { title: "Junior Business Consultant", minLevel: 0, typicalYearsOfExperience: "0-2 years", description: "Entry-level consultant. Supports senior team members on projects. Learns client engagement, requirements gathering, and business analysis fundamentals." },
  { title: "Business Consultant", minLevel: 1, typicalYearsOfExperience: "2-4 years", description: "Core consulting role. Leads workstreams on client engagements. Gathers requirements, builds business cases, facilitates workshops, and develops recommendations with guidance." },
  { title: "Senior Business Consultant", minLevel: 3, typicalYearsOfExperience: "4-7 years", description: "Leads engagements independently. Manages client relationships, delivers complex workstreams, mentors juniors, and contributes to proposals and thought leadership." },
  { title: "Lead Consultant / Engagement Manager", minLevel: 4, typicalYearsOfExperience: "6-8 years", description: "Manages multiple workstreams or an entire engagement. Responsible for client satisfaction, delivery quality, team development, and commercial outcomes." },
  { title: "Principal Consultant", minLevel: 5, typicalYearsOfExperience: "8+ years", description: "Senior trusted advisor. Leads large, complex engagements. Brings deep expertise in IT strategy, digital transformation, or a specific domain. Shapes methodology and quality standards." },
  { title: "Managing Consultant / Director", minLevel: 4, typicalYearsOfExperience: "10+ years", description: "Leads a practice or service line. Responsible for business development, client relationships, team leadership, and profitability. Combines consulting delivery with sales and strategy." },
  { title: "Partner / Senior Partner", minLevel: 3, typicalYearsOfExperience: "12+ years", description: "Executive-level relationship owner. Brings in major engagements, sets practice strategy, represents the firm externally, and drives long-term client partnerships." },
];

export const SKILL_COUNT = Object.keys(SKILLS).length;
export const PILLAR_COUNT = COMPETENCY_AREAS.length;
