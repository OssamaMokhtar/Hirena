import type { Skill, CompetencyArea, ProficiencyLevel, CareerLadderStep } from "@/types";

/**
 * Engineering Manager Competency Model
 * Covers people management, team building, hiring, performance management,
 * technical strategy, delivery leadership, stakeholder management, and
 * organizational effectiveness.
 * 24 skills across 6 competency areas.
 * 
 * Role description (from hiring platforms):
 * "Engineering Manager — Leads a team of software engineers, balancing people 
 * leadership with technical oversight. Responsible for team hiring, development, 
 * performance management, and delivery. Sets technical direction, removes 
 * blockers, manages stakeholder relationships, and builds a strong engineering 
 * culture. Bridges business goals with technical execution. — Common requirements 
 * across LinkedIn, Indeed, Glassdoor: proven people management experience, 
 * technical background (former engineer), ability to delegate and trust the 
 * team, strong communication and interpersonal skills, experience with Agile 
 * methodologies, performance review and feedback skills, ability to manage 
 * multiple priorities, stakeholder management, and a track record of building 
 * and developing high-performing teams."
 */

export const SKILLS: Record<string, Skill> = {
  // ── People Management ────────────────────────────────────────────────────
  "hiring-eng": {
    id: "hiring-eng",
    name: "Technical Hiring & Recruitment",
    description: "Building and growing the engineering team: defining role requirements, writing job descriptions, sourcing candidates, screening resumes, conducting technical interviews, assessing candidates fairly and objectively, writing hiring feedback, making hiring decisions, and selling the opportunity to candidates. Can build a diverse, high-quality team. — Core responsibility for engineering manager roles on all major hiring platforms.",
    category: "people",
    level: 0,
  },
  "onboarding-eng": {
    id: "onboarding-eng",
    name: "Onboarding & Integration",
    description: "Successfully integrating new team members: structured onboarding plans, setting expectations, providing context and resources, assigning mentors/buddies, ensuring early wins, checking in regularly, and helping new hires become productive and engaged team members. Can onboard engineers to both the team and the broader organization. — Common requirement for engineering manager roles.",
    category: "people",
    level: 0,
  },
  "performance-management-eng": {
    id: "performance-management-eng",
    name: "Performance Management & Reviews",
    description: "Managing team performance: setting goals and expectations, conducting regular 1:1s, providing ongoing feedback (positive and constructive), writing performance reviews, conducting calibration, managing underperformance, creating performance improvement plans, and making promotion and compensation recommendations. Can have difficult conversations with empathy and clarity. — Core responsibility for engineering manager roles on LinkedIn, Indeed, Glassdoor.",
    category: "people",
    level: 0,
  },
  "career-development-eng": {
    id: "career-development-eng",
    name: "Career Development & Growth Planning",
    description: "Helping engineers grow their careers: understanding their goals and aspirations, identifying development opportunities, creating growth plans, providing stretch assignments, coaching on skill development, preparing engineers for promotions, and advocating for their advancement. Can have career conversations that are meaningful and actionable. — Expected for engineering manager roles across all hiring platforms.",
    category: "people",
    level: 0,
  },
  "retention-engagement": {
    id: "retention-engagement",
    name: "Team Engagement & Retention",
    description: "Building an engaged, motivated team: understanding what drives each team member, recognizing and celebrating contributions, addressing dissatisfaction early, managing burnout risk, fostering psychological safety and inclusion, and creating an environment where people want to stay and grow. Can identify retention risks and take action. — Important for engineering manager roles; increasingly emphasized.",
    category: "people",
    level: 0,
  },
  "conflict-resolution-eng": {
    id: "conflict-resolution-eng",
    name: "Conflict Resolution & Team Dynamics",
    description: "Identifying and resolving team conflicts: interpersonal issues, technical disagreements, working style clashes, communication breakdowns. Facilitating resolution conversations, mediating disputes, setting boundaries, and restoring team cohesion. Can address conflicts early before they escalate. — Common requirement for engineering manager roles.",
    category: "people",
    level: 0,
  },

  // ── Technical Leadership ─────────────────────────────────────────────────
  "technical-strategy-eng": {
    id: "technical-strategy-eng",
    name: "Technical Strategy & Alignment",
    description: "Setting and communicating technical direction for the team: aligning technical decisions with product and business goals, defining technical priorities, making build-vs-buy and technology selection decisions, planning architectural runway, and communicating technical strategy to the team and stakeholders. Balances technical excellence with business pragmatism. — Core responsibility for engineering manager roles.",
    category: "technical",
    level: 0,
  },
  "architecture-guidance-eng": {
    id: "architecture-guidance-eng",
    name: "Architecture Guidance & Code Quality Oversight",
    description: "Providing technical guidance without micromanaging: setting architectural standards and conventions, reviewing significant design decisions, ensuring code quality through review processes and standards, identifying and addressing technical debt, and helping the team make sound technical decisions. Can give the team autonomy while maintaining quality. — Expected for engineering manager roles with technical backgrounds.",
    category: "technical",
    level: 0,
  },
  "technical-delegation": {
    id: "technical-delegation",
    name: "Technical Delegation & Trust",
    description: "Delegating technical work effectively: trusting the team to make technical decisions, assigning architectural ownership appropriately, providing context and constraints rather than instructions, and stepping in only when needed. Can balance hands-on involvement with giving the team space to own their work. — Critical skill for engineering manager roles; common in job descriptions.",
    category: "technical",
    level: 0,
  },
  "incident-eng-manager": {
    id: "incident-eng-manager",
    name: "Incident Management & Operational Excellence",
    description: "Managing incident response at the team level: ensuring on-call coverage, supporting incident response, managing postmortem processes, driving action items, improving reliability over time, and supporting team members during and after incidents. Creates a blameless culture around failures. — Common requirement for engineering manager roles.",
    category: "technical",
    level: 0,
  },

  // ── Delivery & Project Management ────────────────────────────────────────
  "delivery-eng-manager": {
    id: "delivery-eng-manager",
    name: "Delivery Leadership & Accountability",
    description: "Taking ownership of team delivery: ensuring the team delivers on commitments, tracking progress and risks, removing blockers, managing scope and timeline trade-offs, communicating status to stakeholders, and being accountable for delivery outcomes. Can balance multiple projects and priorities. — Core responsibility for engineering manager roles.",
    category: "delivery",
    level: 0,
  },
  "sprint-process-eng": {
    id: "sprint-process-eng",
    name: "Agile Process & Sprint Management",
    description: "Running effective Agile processes: sprint planning, daily standups, retrospectives, backlog grooming, story estimation, and continuous improvement. Adapts Agile practices to the team's context. Ensures the process serves the team rather than being a burden. Can facilitate effective ceremonies. — Standard requirement for engineering manager roles in Agile organizations.",
    category: "delivery",
    level: 0,
  },
  "stakeholder-eng-mgr": {
    id: "stakeholder-eng-mgr",
    name: "Stakeholder Management & Communication",
    description: "Managing relationships with product managers, designers, business stakeholders, and other engineering teams: communicating technical progress and risks in accessible terms, negotiating scope and priorities, managing expectations, building trust, and advocating for the team's needs. Can translate between technical and business languages fluently. — Essential for engineering manager roles across all hiring platforms.",
    category: "delivery",
    level: 0,
  },
  "prioritization-eng": {
    id: "prioritization-eng",
    name: "Prioritization & Resource Management",
    description: "Prioritizing work across the team: balancing feature work, technical debt, maintenance, and innovation. Managing team capacity and resources, saying no when necessary, making trade-off decisions, and aligning priorities with business goals. Can make tough prioritization calls with limited information. — Common requirement for engineering manager roles.",
    category: "delivery",
    level: 0,
  },

  // ── Organizational Effectiveness ─────────────────────────────────────────
  "process-improvement-eng-mgr": {
    id: "process-improvement-eng-mgr",
    name: "Engineering Process & Productivity Improvement",
    description: "Identifying and driving improvements to engineering processes: development workflows, CI/CD, code review, testing, deployment, and team collaboration practices. Measuring productivity and effectiveness, experimenting with changes, and iterating based on results. Can make the team more effective over time. — Common requirement for engineering manager roles.",
    category: "org",
    level: 0,
  },
  "metrics-eng-mgr": {
    id: "metrics-eng-mgr",
    name: "Engineering Metrics & Measurement",
    description: "Using metrics to understand and improve engineering effectiveness: DORA metrics (deployment frequency, lead time, MTTR, change failure rate), velocity and throughput, quality metrics, cycle time, and other relevant measurements. Using data to inform decisions while avoiding metric gaming and unintended consequences. — Growing requirement for engineering manager roles.",
    category: "org",
    level: 0,
  },
  "budget-eng-mgr": {
    id: "budget-eng-mgr",
    name: "Budget & Resource Management",
    description: "Managing engineering budget and resources: headcount planning, contractor and vendor management, tooling and infrastructure costs, training and conference budgets, and cost optimization. Can plan and manage a budget responsibly. — Common requirement for engineering manager roles, especially in larger organizations.",
    category: "org",
    level: 0,
  },
  "cross-team-eng-mgr": {
    id: "cross-team-eng-mgr",
    name: "Cross-Team Coordination & Dependencies",
    description: "Coordinating work across multiple teams: managing dependencies, aligning on interfaces and timelines, resolving cross-team conflicts, ensuring integration points work, and driving org-wide initiatives. Can influence without authority and build alignment across the organization. — Important for engineering manager roles in larger orgs.",
    category: "org",
    level: 0,
  },

  // ── Culture & Values ─────────────────────────────────────────────────────
  "culture-eng-mgr": {
    id: "culture-eng-mgr",
    name: "Engineering Culture & Values",
    description: "Building and sustaining a strong engineering culture: defining and embodying values, creating an inclusive and supportive environment, celebrating wins and learning from failures, fostering innovation and continuous improvement, and modeling the behaviors you want to see. Creates a culture where engineers can do their best work. — Core responsibility for engineering manager roles.",
    category: "culture",
    level: 0,
  },
  "diversity-inclusion-eng": {
    id: "diversity-inclusion-eng",
    name: "Diversity, Equity & Inclusion",
    description: "Building a diverse and inclusive team: understanding and mitigating bias in hiring and performance management, creating an inclusive environment where everyone can thrive, addressing discrimination or harassment, and promoting equity in opportunities and advancement. — Increasingly required for engineering manager roles; emphasized in many job descriptions.",
    category: "culture",
    level: 0,
  },
};

export const COMPETENCY_AREAS: CompetencyArea[] = [
  {
    id: "people",
    name: "People Management",
    description: "Hiring, developing, and supporting engineers — the core of the engineering manager role.",
    skills: ["hiring-eng", "onboarding-eng", "performance-management-eng", "career-development-eng", "retention-engagement", "conflict-resolution-eng"],
    weight: 30,
  },
  {
    id: "technical",
    name: "Technical Leadership",
    description: "Guiding technical direction, architecture, code quality, and incident management while empowering the team.",
    skills: ["technical-strategy-eng", "architecture-guidance-eng", "technical-delegation", "incident-eng-manager"],
    weight: 20,
  },
  {
    id: "delivery",
    name: "Delivery & Stakeholder Management",
    description: "Driving delivery, managing Agile processes, communicating with stakeholders, and prioritizing effectively.",
    skills: ["delivery-eng-manager", "sprint-process-eng", "stakeholder-eng-mgr", "prioritization-eng"],
    weight: 22,
  },
  {
    id: "org",
    name: "Organizational Effectiveness",
    description: "Improving processes, using metrics, managing budgets, and coordinating across teams — making the organization work better.",
    skills: ["process-improvement-eng-mgr", "metrics-eng-mgr", "budget-eng-mgr", "cross-team-eng-mgr"],
    weight: 15,
  },
  {
    id: "culture",
    name: "Culture & Values",
    description: "Building a strong, inclusive engineering culture that attracts and retains great people.",
    skills: ["culture-eng-mgr", "diversity-inclusion-eng"],
    weight: 13,
  },
];

export const LEVELS: ProficiencyLevel[] = [0, 1, 2, 3, 4, 5, 6, 7];

export const CAREER_LADDER: CareerLadderStep[] = [
  {
    title: "Engineering Manager (Entry)",
    minLevel: 3,
    typicalYearsOfExperience: "5-7 years",
    description: "Newer engineering manager. Manages a small team, learning people management fundamentals, and still contributes technically. Grows into the people leadership role while relying on prior technical experience.",
  },
  {
    title: "Engineering Manager",
    minLevel: 4,
    typicalYearsOfExperience: "7-10 years",
    description: "Core engineering manager role. Manages a team of engineers, responsible for hiring, performance management, delivery, stakeholder communication, and team culture. Balances people leadership with technical oversight.",
  },
  {
    title: "Senior Engineering Manager",
    minLevel: 5,
    typicalYearsOfExperience: "10-14 years",
    description: "Senior EM. Manages larger teams or multiple teams, has deep expertise in people management and delivery, mentors other EMs, and has significant influence on technical and organizational decisions.",
  },
  {
    title: "Engineering Director",
    minLevel: 5,
    typicalYearsOfExperience: "12+ years",
    description: "Leads multiple engineering teams or a department. Manages managers, sets departmental strategy, drives organizational effectiveness, manages budgets, and aligns engineering with business objectives at a higher level.",
  },
  {
    title: "VP of Engineering",
    minLevel: 3,
    typicalYearsOfExperience: "15+ years",
    description: "Executive engineering leadership. Leads the entire engineering organization, sets engineering strategy and vision, manages senior leaders, makes major organizational and strategic decisions, and aligns engineering with company goals.",
  },
  {
    title: "CTO",
    minLevel: 2,
    typicalYearsOfExperience: "15+ years",
    description: "Chief Technology Officer. Executive responsible for overall technology strategy, vision, and organization. Makes major technology and business decisions, represents technology externally, and leads the company's technical direction at the highest level.",
  },
];

export const SKILL_COUNT = Object.keys(SKILLS).length;
export const PILLAR_COUNT = COMPETENCY_AREAS.length;
