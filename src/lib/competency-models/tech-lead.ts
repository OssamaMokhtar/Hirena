import type { Skill, CompetencyArea, ProficiencyLevel, CareerLadderStep } from "@/types";

/**
 * Tech Lead Competency Model
 * Covers technical leadership, hands-on development, architecture guidance,
 * team mentorship, delivery management, and cross-team coordination.
 * 22 skills across 6 competency areas.
 * 
 * Role description (from hiring platforms):
 * "Tech Lead — Provides technical leadership for a development team. Combines 
 * hands-on coding with architecture guidance, code review, mentoring, and 
 * delivery management. Acts as the bridge between engineering and product/
 * business stakeholders. Drives technical decisions while ensuring the team 
 * delivers high-quality software on schedule. — Common requirements across 
 * LinkedIn, Indeed, Glassdoor: strong coding skills, system design expertise, 
 * experience leading teams, excellent communication, ability to balance 
 * technical and people responsibilities, Agile/Scrum mastery, code review 
 * leadership, and a track record of delivering complex projects."
 */

export const SKILLS: Record<string, Skill> = {
  // ── Hands-on Technical Skills ────────────────────────────────────────────
  "senior-coding": {
    id: "senior-coding",
    name: "Senior-Level Coding & Implementation",
    description: "Writing production-quality code at a senior level: clean, well-structured, tested, and maintainable. Deep proficiency in one or more languages. Can implement complex features, refactor legacy code, and make sound implementation decisions. Writes code that serves as a model for the team. — Core requirement for tech lead roles on all major hiring platforms.",
    category: "technical",
    level: 0,
  },
  "system-design-tl": {
    id: "system-design-tl",
    name: "System Design & Architecture Guidance",
    description: "Designing and reviewing system architectures: understanding requirements, evaluating options, making architectural decisions, creating design documents, and guiding the team through implementation. Understands trade-offs and can justify decisions. Can design systems that are scalable, maintainable, and aligned with business needs. — Essential for tech lead roles; heavily assessed in system design interviews.",
    category: "technical",
    level: 0,
  },
  "code-review-lead": {
    id: "code-review-lead",
    name: "Code Review Leadership",
    description: "Leading code review practices: setting standards, reviewing critical changes, mentoring others on effective review, ensuring architectural consistency, catching bugs and design issues early, and fostering a positive review culture. Can provide constructive, actionable feedback that improves code quality and team skills. — Common requirement for tech lead and senior engineer roles.",
    category: "technical",
    level: 0,
  },
  "technical-problem-solving-tl": {
    id: "technical-problem-solving-tl",
    name: "Advanced Technical Problem Solving",
    description: "Solving complex technical problems: debugging difficult issues, diagnosing performance problems, resolving architectural conflicts, finding creative solutions to constraints, and making trade-off decisions. Can break down ambiguous problems and drive them to resolution. — Top requirement across all tech lead job postings on LinkedIn, Indeed, Glassdoor.",
    category: "technical",
    level: 0,
  },
  "technology-evaluation": {
    id: "technology-evaluation",
    name: "Technology Evaluation & Selection",
    description: "Evaluating new technologies, libraries, frameworks, and tools. Understanding the trade-offs, running proof-of-concepts, assessing community support, hiring impact, and long-term viability. Making informed recommendations to the team and stakeholders. — Common requirement for tech lead and architect roles.",
    category: "technical",
    level: 0,
  },

  // ── Technical Leadership ─────────────────────────────────────────────────
  "technical-vision": {
    id: "technical-vision",
    name: "Technical Vision & Direction",
    description: "Setting and communicating technical direction for the team: defining standards, choosing patterns and practices, aligning technical decisions with product goals, and ensuring the team moves in a coherent direction. Can articulate the 'why' behind technical choices. — Core responsibility of tech lead roles.",
    category: "leadership",
    level: 0,
  },
  "technical-standards": {
    id: "technical-standards",
    name: "Establishing & Enforcing Technical Standards",
    description: "Defining and maintaining team technical standards: coding conventions, architecture guidelines, testing practices, documentation expectations, CI/CD standards, and quality gates. Can evolve standards over time based on learning and feedback. Ensures consistency without stifling creativity. — Expected for tech lead and senior roles.",
    category: "leadership",
    level: 0,
  },
  "debt-management": {
    id: "debt-management",
    name: "Technical Debt Management",
    description: "Identifying, tracking, and managing technical debt: recognizing debt when it's created, assessing its impact, prioritizing repayment, balancing feature work with debt reduction, and building the business case for addressing debt. Can prevent debt from accumulating unnecessarily. — Common requirement for tech lead and senior roles.",
    category: "leadership",
    level: 0,
  },
  "incident-leadership": {
    id: "incident-leadership",
    name: "Incident Response & Production Leadership",
    description: "Leading incident response: triaging production issues, coordinating the response, making decisions under pressure, communicating during incidents, conducting blameless postmortems, and driving action items to prevent recurrence. Can handle the stress and responsibility of production incidents. — Expected for tech lead and on-call senior roles.",
    category: "leadership",
    level: 0,
  },

  // ── People & Team Development ────────────────────────────────────────────
  "mentoring-tl": {
    id: "mentoring-tl",
    name: "Engineering Mentoring & Growth",
    description: "Mentoring engineers on the team: providing guidance on technical growth, helping engineers level up their skills, giving constructive feedback, identifying development opportunities, and supporting career growth. Adapts mentoring style to the individual. Creates an environment where the team learns and grows. — Core responsibility in tech lead job descriptions.",
    category: "people",
    level: 0,
  },
  "team-building-tl": {
    id: "team-building-tl",
    name: "Team Building & Culture",
    description: "Building a strong, cohesive engineering team: fostering collaboration, trust, and psychological safety, celebrating wins, addressing conflicts constructively, and creating a positive team culture. Can bring out the best in team members and build effective team dynamics. — Common requirement in tech lead and engineering management roles.",
    category: "people",
    level: 0,
  },
  "hiring-tl": {
    id: "hiring-tl",
    name: "Technical Hiring & Interviewing",
    description: "Participating in technical hiring: defining role requirements, reviewing resumes, conducting technical interviews, assessing candidates fairly, writing hiring feedback, and making hiring recommendations. Can identify strong engineering talent and assess technical capability. — Common requirement for tech lead roles.",
    category: "people",
    level: 0,
  },
  "delegation": {
    id: "delegation",
    name: "Delegation & Work Distribution",
    description: "Effectively delegating work: understanding team members' skills and growth goals, assigning tasks appropriately, balancing load across the team, providing context and autonomy, and following up without micromanaging. Can distribute work in a way that delivers results and develops the team. — Important skill for tech lead roles.",
    category: "people",
    level: 0,
  },

  // ── Delivery & Project Management ────────────────────────────────────────
  "delivery-management": {
    id: "delivery-management",
    name: "Delivery Management & Execution",
    description: "Driving delivery of features and projects: breaking down work, estimating, planning, tracking progress, removing blockers, managing risks, and ensuring the team delivers on commitments. Can balance scope, quality, and timeline. Takes ownership of delivery outcomes. — Core responsibility in tech lead job descriptions.",
    category: "delivery",
    level: 0,
  },
  "sprint-planning-lead": {
    id: "sprint-planning-lead",
    name: "Sprint & Iteration Planning (Agile)",
    description: "Leading sprint/iteration planning: working with product to prioritize backlog, breaking down stories, estimating effort, committing to sprint goals, and planning technical work. Ensures technical considerations are included in planning. Can facilitate effective planning sessions. — Standard requirement for tech leads in Agile teams.",
    category: "delivery",
    level: 0,
  },
  "stakeholder-tl": {
    id: "stakeholder-tl",
    name: "Stakeholder Management & Communication",
    description: "Managing relationships with stakeholders: product managers, designers, business partners, other engineering teams. Communicating technical progress, risks, and trade-offs in accessible terms. Managing expectations, negotiating scope, and building trust. Can translate between technical and non-technical languages. — Essential for tech lead roles across all hiring platforms.",
    category: "delivery",
    level: 0,
  },
  "cross-team-collab": {
    id: "cross-team-collab",
    name: "Cross-Team Collaboration & Alignment",
    description: "Working effectively across teams: coordinating on interfaces and dependencies, aligning on technical approaches, resolving cross-team conflicts, and ensuring integration points work smoothly. Can build relationships and alignment across the organization. — Common requirement for tech lead roles in larger organizations.",
    category: "delivery",
    level: 0,
  },

  // ── Quality & Process ────────────────────────────────────────────────────
  "quality-standards-tl": {
    id: "quality-standards-tl",
    name: "Quality Standards & Testing Strategy",
    description: "Defining and upholding quality standards: testing strategy (unit, integration, E2E), code quality gates, CI/CD practices, monitoring and observability, and release quality. Ensures the team delivers reliable software and can catch issues before they reach production. — Expected for tech lead roles.",
    category: "process",
    level: 0,
  },
  "process-improvement-tl": {
    id: "process-improvement-tl",
    name: "Engineering Process Improvement",
    description: "Identifying and driving improvements to engineering processes: Agile practices, CI/CD pipelines, code review workflows, testing practices, deployment processes, and team workflows. Can experiment with changes, measure impact, and iterate. Continuously seeks to make the team more effective. — Common requirement for tech lead and senior roles.",
    category: "process",
    level: 0,
  },
  "documentation-tl": {
    id: "documentation-tl",
    name: "Technical Documentation & Knowledge Management",
    description: "Creating and maintaining technical documentation: architecture decisions (ADRs), design docs, API documentation, runbooks, onboarding guides, and knowledge base articles. Ensures knowledge is shared and accessible, not siloed. Can write clear, useful documentation for different audiences. — Common requirement for tech lead roles.",
    category: "process",
    level: 0,
  },
};

export const COMPETENCY_AREAS: CompetencyArea[] = [
  {
    id: "technical",
    name: "Technical Excellence",
    description: "Hands-on coding, system design, code review, problem solving, and technology evaluation — the technical foundation of the tech lead role.",
    skills: ["senior-coding", "system-design-tl", "code-review-lead", "technical-problem-solving-tl", "technology-evaluation"],
    weight: 30,
  },
  {
    id: "leadership",
    name: "Technical Leadership",
    description: "Setting technical vision, establishing standards, managing debt, and leading incident response — guiding the team's technical direction.",
    skills: ["technical-vision", "technical-standards", "debt-management", "incident-leadership"],
    weight: 20,
  },
  {
    id: "people",
    name: "People & Team Development",
    description: "Mentoring, team building, hiring, and delegation — developing the engineers on the team and building a strong team culture.",
    skills: ["mentoring-tl", "team-building-tl", "hiring-tl", "delegation"],
    weight: 20,
  },
  {
    id: "delivery",
    name: "Delivery & Stakeholder Management",
    description: "Driving delivery, sprint planning, stakeholder communication, and cross-team collaboration — ensuring the team delivers value effectively.",
    skills: ["delivery-management", "sprint-planning-lead", "stakeholder-tl", "cross-team-collab"],
    weight: 22,
  },
  {
    id: "process",
    name: "Quality & Process",
    description: "Quality standards, process improvement, and documentation — maintaining engineering excellence and team effectiveness.",
    skills: ["quality-standards-tl", "process-improvement-tl", "documentation-tl"],
    weight: 12,
  },
];

export const LEVELS: ProficiencyLevel[] = [0, 1, 2, 3, 4, 5, 6, 7];

export const CAREER_LADDER: CareerLadderStep[] = [
  {
    title: "Tech Lead (Entry)",
    minLevel: 3,
    typicalYearsOfExperience: "4-6 years",
    description: "Emerging tech lead. Leads a small team or workstream, contributes significantly to architecture and code review, and begins mentoring junior engineers. Still spends a substantial portion of time coding.",
  },
  {
    title: "Tech Lead",
    minLevel: 4,
    typicalYearsOfExperience: "6-8 years",
    description: "Core tech lead role. Leads a development team, drives technical decisions, reviews architecture, mentors engineers, manages delivery, and communicates with stakeholders. Balances hands-on coding with leadership responsibilities.",
  },
  {
    title: "Senior Tech Lead",
    minLevel: 5,
    typicalYearsOfExperience: "8-12 years",
    description: "Senior tech lead. Leads larger or more complex teams, architects significant systems, sets technical standards across multiple teams, and mentors other tech leads. Strong influence on technical direction and engineering culture.",
  },
  {
    title: "Principal Engineer / Staff Engineer",
    minLevel: 5,
    typicalYearsOfExperience: "10+ years",
    description: "Principal/staff-level individual contributor. Provides technical leadership across multiple teams or the entire organization. Solves the hardest technical problems, sets architectural direction, and is a recognized technical authority. May or may not manage people directly.",
  },
  {
    title: "Engineering Manager",
    minLevel: 3,
    typicalYearsOfExperience: "8+ years",
    description: "People management track. Manages a team of engineers, focusing on people development, hiring, team culture, and delivery. Still contributes technically but primary responsibility is the team's success and growth.",
  },
  {
    title: "Director of Engineering",
    minLevel: 2,
    typicalYearsOfExperience: "10+ years",
    description: "Leads multiple engineering teams or a department. Sets strategy, manages managers, drives organizational effectiveness, and aligns engineering with business objectives. Less hands-on technical work, more focus on org leadership.",
  },
  {
    title: "VP of Engineering / CTO",
    minLevel: 1,
    typicalYearsOfExperience: "12+ years",
    description: "Executive technology leadership. Sets overall engineering and technology strategy, manages the engineering organization, makes major strategic decisions, and aligns technology with business goals at the highest level.",
  },
];

export const SKILL_COUNT = Object.keys(SKILLS).length;
export const PILLAR_COUNT = COMPETENCY_AREAS.length;
