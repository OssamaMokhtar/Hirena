// Hirena — Engineering Manager Competency Model
// 24 skills across 5 pillars, proficiency levels 0-7, career ladder.

import type { Skill, ProficiencyLevel, CompetencyArea, CareerLadderStep, RoleCompetencyModel, CompetencyPillar } from '@/types';

export const ENGINEERING_MANAGER_SKILLS: Record<string, Skill> = {
  // People Management (5 skills)
  "hiring": {
    id: "hiring",
    name: "Hiring & Talent Acquisition",
    description: "Hiring engineers: defining roles, writing job descriptions, screening resumes, conducting technical interviews, evaluating candidates, reducing bias in hiring",
    category: "people-management",
    level: 0,
  },
  "onboarding": {
    id: "onboarding",
    name: "Onboarding & Integration",
    description: "Onboarding new engineers: orientation, setting expectations, pairing, mentorship plans, role clarity, helping new hires become productive",
    category: "people-management",
    level: 0,
  },
  "performance-management": {
    id: "performance-management",
    name: "Performance Management",
    description: "Managing performance: goal setting (OKRs, objectives), regular 1:1s, feedback (positive + constructive), performance reviews, performance improvement plans",
    category: "people-management",
    level: 0,
  },
  "career-development": {
    id: "career-development",
    name: "Career Development & Mentoring",
    description: "Developing engineers: career conversations, growth plans, mentoring, coaching, identifying potential, creating growth opportunities, promotions",
    category: "people-management",
    level: 0,
  },
  "team-building": {
    id: "team-building",
    name: "Team Building & Culture",
    description: "Building and maintaining team culture: trust, psychological safety, collaboration, celebrating wins, team rituals, diversity and inclusion",
    category: "people-management",
    level: 0,
  },

  // Project & Delivery Management (5 skills)
  "project-management": {
    id: "project-management",
    name: "Project & Delivery Management",
    description: "Managing projects: scope, timeline, resources, risks, dependencies; agile project management, release planning, delivery tracking, roadmaps",
    category: "project-management",
    level: 0,
  },
  "resource-management": {
    id: "resource-management",
    name: "Resource Management & Capacity Planning",
    description: "Managing resources: capacity planning, workload distribution, balancing team capacity, managing overdelivery/underutilization, resource allocation",
    category: "project-management",
    level: 0,
  },
  "risk-management": {
    id: "risk-management",
    name: "Risk Management",
    description: "Identifying and managing risks: technical risks, project risks, people risks, external risks; risk mitigation, contingency planning, risk communication",
    category: "project-management",
    level: 0,
  },
  "stakeholder-management-em": {
    id: "stakeholder-management-em",
    name: "Stakeholder Management & Communication",
    description: "Managing stakeholders: engineers, product, design, leadership, other teams; communication, expectation management, alignment, influencing",
    category: "project-management",
    level: 0,
  },
  "release-management": {
    id: "release-management",
    name: "Release & Incident Management",
    description: "Managing releases: release planning, rollout strategies, release communication, release documentation; incident management: triage, response, postmortems",
    category: "project-management",
    level: 0,
  },

  // Technical Leadership (4 skills)
  "technical-strategy": {
    id: "technical-strategy",
    name: "Technical Strategy & Vision",
    description: "Setting technical direction: technical vision, architecture decisions, technology selection, technical roadmaps, balancing tech debt with feature work",
    category: "technical-leadership",
    level: 0,
  },
  "architecture-guidance": {
    id: "architecture-guidance",
    name: "Architecture Guidance & Review",
    description: "Providing architectural guidance: reviewing designs, making architecture recommendations, ensuring architectural consistency, identifying architectural risks",
    category: "technical-leadership",
    level: 0,
  },
  "code-quality-leadership": {
    id: "code-quality-leadership",
    name: "Code Quality & Engineering Standards",
    description: "Setting and enforcing engineering standards: code review standards, testing standards, coding conventions, documentation standards, quality gates",
    category: "technical-leadership",
    level: 0,
  },
  "tech-debt-management": {
    id: "tech-debt-management",
    name: "Technical Debt Management",
    description: "Managing technical debt: identifying debt, prioritizing debt reduction, balancing debt with feature work, communicating debt impact, debt reduction strategies",
    category: "technical-leadership",
    level: 0,
  },

  // Process & Agile Leadership (4 skills)
  "agile-leadership": {
    id: "agile-leadership",
    name: "Agile Process Leadership",
    description: "Leading agile processes: sprint planning, retrospectives, adapting processes to team needs, introducing agile practices, coaching teams on agile",
    category: "process-leadership",
    level: 0,
  },
  "process-improvement": {
    id: "process-improvement",
    name: "Process Improvement & Optimization",
    description: "Continuously improving processes: identifying bottlenecks, streamlining workflows, reducing friction, implementing improvements, measuring impact",
    category: "process-leadership",
    level: 0,
  },
  "engineering-metrics": {
    id: "engineering-metrics",
    name: "Engineering Metrics & Measurement",
    description: "Measuring engineering: velocity, cycle time, lead time, deployment frequency, change failure rate, Mean Time to Recovery (MTTR), DORA metrics, engineering efficiency",
    category: "process-leadership",
    level: 0,
  },
  "process-implementation": {
    id: "process-implementation",
    name: "Process Implementation & Change Management",
    description: "Implementing new processes: change management, communication, training, adoption, addressing resistance, measuring adoption and impact",
    category: "process-leadership",
    level: 0,
  },

  // Communication & Influence (4 skills)
  "executive-communication-em": {
    id: "executive-communication-em",
    name: "Executive Communication",
    description: "Communicating with leadership: status updates, risk communication, resource requests, project reporting, strategic alignment, executive presence",
    category: "communication",
    level: 0,
  },
  "influence-without-authority": {
    id: "influence-without-authority",
    name: "Influence Without Authority",
    description: "Influencing across teams and organization: building influence, stakeholder alignment, negotiating resources and priorities, driving change without authority",
    category: "communication",
    level: 0,
  },
  "conflict-resolution": {
    id: "conflict-resolution",
    name: "Conflict Resolution & Difficult Conversations",
    description: "Handling conflict: interpersonal conflict, technical disagreements, priority conflicts; having difficult conversations, mediation, finding common ground",
    category: "communication",
    level: 0,
  },
  "communication-skills-em": {
    id: "communication-skills-em",
    name: "Written & Verbal Communication",
    description: "Clear communication: written (emails, docs, reports, Slack), verbal (presentations, meetings, 1:1s); adapting communication to audience",
    category: "communication",
    level: 0,
  },

  // Strategic Thinking (2 skills)
  "business-alignment": {
    id: "business-alignment",
    name: "Business Alignment & Strategic Thinking",
    description: "Aligning engineering with business: understanding business goals, translating business needs to engineering strategy, strategic planning, long-term thinking",
    category: "strategic-thinking",
    level: 0,
  },
  "org-design": {
    id: "org-design",
    name: "Organizational Design & Team Structure",
    description: "Designing teams and organization: team topology, team size, team composition, reporting structures, squad/model design, optimizing for communication and delivery",
    category: "strategic-thinking",
    level: 0,
  },
};

export const ENGINEERING_MANAGER_PILLARS: CompetencyPillar[] = [
  {
    id: "people",
    name: "People Management",
    description: "Hiring, onboarding, performance management, career development & mentoring, team building & culture",
    weight: 25,
    categories: ["people-management", "leadership", "collaboration"],
  },
  {
    id: "delivery",
    name: "Project & Delivery Management",
    description: "Project & delivery management, resource management & capacity planning, risk management, stakeholder management, release & incident management",
    weight: 25,
    categories: ["project-management", "delivery", "stakeholder", "process"],
  },
  {
    id: "technical",
    name: "Technical Leadership",
    description: "Technical strategy & vision, architecture guidance & review, code quality & engineering standards, technical debt management",
    weight: 20,
    categories: ["technical-leadership", "system-design", "engineering-practices"],
  },
  {
    id: "process",
    name: "Process & Agile Leadership",
    description: "Agile process leadership, process improvement & optimization, engineering metrics & measurement, process implementation & change management",
    weight: 15,
    categories: ["process-leadership", "process", "engineering-practices"],
  },
  {
    id: "communication",
    name: "Communication, Influence & Strategy",
    description: "Executive communication, influence without authority, conflict resolution & difficult conversations, written & verbal communication, business alignment & strategic thinking, organizational design & team structure",
    weight: 15,
    categories: ["communication", "strategic-thinking", "leadership"],
  },
];

export const ENGINEERING_MANAGER_LEVELS = [
  { level: 0 as ProficiencyLevel, name: "No Experience", description: "No practical experience with this skill" },
  { level: 1 as ProficiencyLevel, name: "Basic", description: "Can understand and apply the skill with guidance" },
  { level: 2 as ProficiencyLevel, name: "Developing", description: "Beginning to apply the skill independently; still learning and growing" },
  { level: 3 as ProficiencyLevel, name: "Competent", description: "Applies the skill effectively and independently; can handle typical situations" },
  { level: 4 as ProficiencyLevel, name: "Proficient", description: "Strong application of the skill; handles complex situations; can teach others" },
  { level: 5 as ProficiencyLevel, name: "Advanced", description: "Expert application; drives best practices; recognized as a go-to person for this skill" },
  { level: 6 as ProficiencyLevel, name: "Expert", description: "Deep expertise; sets standards; contributes to the field; extensive experience" },
  { level: 7 as ProficiencyLevel, name: "Visionary", description: "Thought leader; has shaped the practice; extensive publications, talks, industry recognition" },
];

export const ENGINEERING_MANAGER_CAREER_LADDER: CareerLadderStep[] = [
  {
    title: "Engineering Manager (Junior)",
    minLevel: 0,
    maxLevel: 3,
    expectedProficiency: {
      "people": 2,
      "delivery": 2,
      "technical": 2,
      "process": 2,
      "communication": 2,
    },
    description: "Entry-level engineering manager. Manages small team (2-4 engineers). Learns people management, delivery, and technical leadership under guidance.",
    typicalYearsOfExperience: "2-4 years management",
  },
  {
    title: "Engineering Manager",
    minLevel: 3,
    maxLevel: 4,
    expectedProficiency: {
      "people": 3,
      "delivery": 3,
      "technical": 3,
      "process": 3,
      "communication": 3,
    },
    description: "Mid-level engineering manager. Manages team of 4-8 engineers. Delivers projects successfully. Develops engineers. Manages stakeholders. Improving processes.",
    typicalYearsOfExperience: "4-7 years management",
  },
  {
    title: "Senior Engineering Manager",
    minLevel: 4,
    maxLevel: 5,
    expectedProficiency: {
      "people": 4,
      "delivery": 4,
      "technical": 4,
      "process": 4,
      "communication": 4,
    },
    description: "Senior engineering manager. Manages multiple teams or larger team (8-15 engineers). Drives delivery at scale. Develops engineering managers. Influences technical strategy. Manages complex stakeholders.",
    typicalYearsOfExperience: "7-10 years management",
  },
  {
    title: "Director of Engineering",
    minLevel: 5,
    maxLevel: 6,
    expectedProficiency: {
      "people": 5,
      "delivery": 5,
      "technical": 5,
      "process": 5,
      "communication": 5,
    },
    description: "Director of engineering. Leads engineering organization (multiple teams, 15-50+ engineers). Sets engineering strategy and vision. Manages managers. Drives organizational change. Influences company strategy.",
    typicalYearsOfExperience: "10-15 years management",
  },
  {
    title: "VP of Engineering / SVP Engineering",
    minLevel: 6,
    maxLevel: 7,
    expectedProficiency: {
      "people": 6,
      "delivery": 6,
      "technical": 6,
      "process": 6,
      "communication": 6,
    },
    description: "VP/SVP of Engineering. Leads entire engineering organization. Sets engineering vision and strategy. Reports to C-level. Drives company-wide technical and organizational strategy. Industry-recognized leader.",
    typicalYearsOfExperience: "15+ years management",
  },
];

export const ENGINEERING_MANAGER_MODEL: RoleCompetencyModel = {
  role: "engineering-manager",
  roleName: "Engineering Manager",
  track: "management",
  description: "Engineering manager focused on leading engineering teams, delivering projects, and developing engineers. Balances people management, project delivery, and technical leadership.",
  skills: ENGINEERING_MANAGER_SKILLS,
  pillars: ENGINEERING_MANAGER_PILLARS,
  levels: ENGINEERING_MANAGER_LEVELS,
  careerLadder: ENGINEERING_MANAGER_CAREER_LADDER,
  expectedLevels: {
    "engineering-manager-junior": 2,
    "engineering-manager": 3,
    "senior-engineering-manager": 4,
    "director-of-engineering": 5,
    "vp-of-engineering": 6,
  },
  region: "MENAC",
  totalSkills: Object.keys(ENGINEERING_MANAGER_SKILLS).length,
};
