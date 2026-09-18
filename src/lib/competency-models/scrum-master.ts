import type { Skill, ProficiencyLevel, CompetencyArea, CareerLadderStep } from '@/types';

export const SKILLS: Record<string, Skill> = {
  // Agile & Scrum
  'scrum-framework': {
    id: 'scrum-framework', name: 'Scrum Framework',
    description: 'Complete Scrum knowledge: roles (PO, SM, Dev Team), events (Sprint Planning, Daily Scrum, Sprint Review, Sprint Retrospective), artifacts (Backlog, Sprint Backlog, Increment), Definition of Done.',
    category: 'agile-scrum', level: 0,
  },
  'kanban-flow-management': {
    id: 'kanban-flow-management', name: 'Kanban & Flow Management',
    description: 'Kanban principles: visualize work, limit WIP, manage flow, make policies explicit, feedback loops, improve collaboratively. Cumulative flow diagrams, lead time, cycle time, throughput.',
    category: 'agile-scrum', level: 0,
  },
  'agile-scaling-frameworks': {
    id: 'agile-scaling-frameworks', name: 'Agile Scaling Frameworks',
    description: 'SAFe, LeSS, Nexus, Scrum@Scale, Disciplined Agile. Scaling agile across multiple teams, coordination mechanisms, portfolio management, enterprise agile transformation.',
    category: 'agile-scrum', level: 0,
  },
  // Facilitation
  'facilitation-meetings': {
    id: 'facilitation-meetings', name: 'Facilitation & Meeting Design',
    description: 'Designing and facilitating effective meetings: sprint planning, retrospectives, refinement, release planning. Facilitation techniques, conflict resolution, decision-making frameworks.',
    category: 'facilitation-coaching', level: 0,
  },
  'retrospective-design': {
    id: 'retrospective-design', name: 'Retrospective Design & Facilitation',
    description: 'Retrospective formats (Start/Stop/Continue, Sailboat, 5 Whys, Timeline, Trouble Trust Tragedy), psychological safety, action item follow-through, team health metrics.',
    category: 'facilitation-coaching', level: 0,
  },
  'coaching-mentoring-scrum': {
    id: 'coaching-mentoring-scrum', name: 'Coaching & Mentoring',
    description: 'Coaching agile teams and individuals: active listening, powerful questioning, GROW model, situational leadership, team development stages (Tuckman), removing impediments.',
    category: 'facilitation-coaching', level: 0,
  },
  // Process & Metrics
  'agile-metrics': {
    id: 'agile-metrics', name: 'Agile Metrics & Performance',
    description: 'Velocity, burndown/burnup charts, cycle time, lead time, throughput, work item age, flow efficiency, escape defects, team health surveys, DORA metrics. Using data to improve.',
    category: 'process-metrics', level: 0,
  },
  'process-improvement-agile': {
    id: 'process-improvement-agile', name: 'Agile Process Improvement',
    description: 'Identifying process bottlenecks, root cause analysis, improvement experiments, Kaizen, continuous improvement culture, value stream mapping, lean thinking applied to software development.',
    category: 'process-metrics', level: 0,
  },
  'impediment-removal': {
    id: 'impediment-removal', name: 'Impediment Identification & Removal',
    description: 'Systematically identifying impediments (technical, organizational, interpersonal), root cause analysis, escalation strategies, stakeholder management, removing blockers for the team.',
    category: 'process-metrics', level: 0,
  },
  // Stakeholder & Community
  'stakeholder-management-agile': {
    id: 'stakeholder-management-agile', name: 'Stakeholder Management in Agile',
    description: 'Managing product owners, stakeholders, and customers in agile context. Expectation management, communication strategies, building trust, managing conflicts, aligning incentives.',
    category: 'stakeholder-community', level: 0,
  },
  'agile-community-building': {
    id: 'agile-community-building', name: 'Agile Community & Culture Building',
    description: 'Building agile culture, communities of practice, internal coaching networks, agile champions program, knowledge sharing, fostering experimentation and learning culture.',
    category: 'stakeholder-community', level: 0,
  },
  'change-management-agile': {
    id: 'change-management-agile', name: 'Agile Change Management',
    description: 'Leading organizational change to agile ways of working. Change models (ADKAR, Kotter), overcoming resistance, stakeholder mapping, communication plans, measuring adoption.',
    category: 'stakeholder-community', level: 0,
  },
  // Technical Awareness
  'technical-agile-awareness': {
    id: 'technical-agile-awareness', name: 'Technical Agile Practices Awareness',
    description: 'Understanding of technical practices that enable agile: CI/CD, automated testing, refactoring, TDD, BDD, pair programming, code review, trunk-based development, DevOps fundamentals.',
    category: 'technical-awareness', level: 0,
  },
  'product-backlog-management': {
    id: 'product-backlog-management', name: 'Product Backlog Management',
    description: 'Backlog refinement techniques, user story writing (INVEST), acceptance criteria (Given/When/Then), story mapping, prioritization frameworks (WSJF, MoSCoW, Kano), backlog grooming.',
    category: 'technical-awareness', level: 0,
  },
  // Advanced
  'multiple-team-coordination': {
    id: 'multiple-team-coordination', name: 'Multiple Team Coordination',
    description: 'Coordinating multiple agile teams: Scrum of Scrums, dependency management, cross-team planning, synchronized sprints, integration planning, scaling ceremonies.',
    category: 'advanced-scaling', level: 0,
  },
  'agile-transformation-strategy': {
    id: 'agile-transformation-strategy', name: 'Agile Transformation Strategy',
    description: 'Designing and leading agile transformations: current state assessment, target state design, transformation roadmap, pilot team selection, scaling strategy, measuring transformation progress.',
    category: 'advanced-scaling', level: 0,
  },
  'organizational-design-agile': {
    id: 'organizational-design-agile', name: 'Organizational Design for Agile',
    description: 'Designing organizational structures that support agile: team topologies, value stream alignment, matrix vs. dedicated teams, team autonomy, platform teams, stream-aligned teams, enabling teams.',
    category: 'advanced-scaling', level: 0,
  },
};

export const COMPETENCY_AREAS: CompetencyArea[] = [
  { id: 'agile-scrum', name: 'Agile & Scrum', description: 'Scrum framework, Kanban, flow management, scaling frameworks', skills: ['scrum-framework', 'kanban-flow-management', 'agile-scaling-frameworks'], weight: 22 },
  { id: 'facilitation-coaching', name: 'Facilitation & Coaching', description: 'Meeting facilitation, retrospective design, coaching, mentoring, team development', skills: ['facilitation-meetings', 'retrospective-design', 'coaching-mentoring-scrum'], weight: 26 },
  { id: 'process-metrics', name: 'Process & Metrics', description: 'Agile metrics, process improvement, impediment removal', skills: ['agile-metrics', 'process-improvement-agile', 'impediment-removal'], weight: 20 },
  { id: 'stakeholder-community', name: 'Stakeholder & Community', description: 'Stakeholder management, community building, change management', skills: ['stakeholder-management-agile', 'agile-community-building', 'change-management-agile'], weight: 16 },
  { id: 'technical-awareness', name: 'Technical Awareness', description: 'Technical agile practices, product backlog management, story writing', skills: ['technical-agile-awareness', 'product-backlog-management'], weight: 10 },
  { id: 'advanced-scaling', name: 'Advanced & Scaling', description: 'Multi-team coordination, transformation strategy, organizational design', skills: ['multiple-team-coordination', 'agile-transformation-strategy', 'organizational-design-agile'], weight: 6 },
];

export const LEVELS: ProficiencyLevel[] = [0, 1, 2, 3, 4, 5, 6, 7];

export const CAREER_LADDER: CareerLadderStep[] = [
  { title: 'Junior Scrum Master / Agile Coach', minLevel: 0, expected: { 'agile-scrum': 1, 'facilitation-coaching': 1, 'process-metrics': 1, 'stakeholder-community': 1, 'technical-awareness': 1, 'advanced-scaling': 0 }, description: 'Entry-level. Supporting a single Scrum team. Facilitating ceremonies under guidance. Learning Scrum framework deeply. Beginning to understand team dynamics.' },
  { title: 'Scrum Master', minLevel: 2, expected: { 'agile-scrum': 2, 'facilitation-coaching': 2, 'process-metrics': 2, 'stakeholder-community': 2, 'technical-awareness': 2, 'advanced-scaling': 0 }, description: 'Core role. Serving one or two Scrum teams. Facilitating all ceremonies independently. Coaching team toward self-management. Removing impediments. Tracking and using agile metrics.' },
  { title: 'Senior Scrum Master', minLevel: 3, expected: { 'agile-scrum': 3, 'facilitation-coaching': 3, 'process-metrics': 3, 'stakeholder-community': 3, 'technical-awareness': 3, 'advanced-scaling': 1 }, description: 'Operating independently. Coaching multiple teams. Driving process improvement. Facilitating complex retrospectives. Building stakeholder relationships. Mentoring junior SMs.' },
  { title: 'Lead Scrum Master / Agile Coach', minLevel: 4, expected: { 'agile-scrum': 3, 'facilitation-coaching': 4, 'process-metrics': 4, 'stakeholder-community': 4, 'technical-awareness': 3, 'advanced-scaling': 2 }, description: 'Leading agile coaches/SMs. Setting coaching standards. Facilitating cross-team alignment. Designing improvement programs. Coaching product owners and stakeholders.' },
  { title: 'Principal Agile Coach / Scrum Master', minLevel: 5, expected: { 'agile-scrum': 4, 'facilitation-coaching': 5, 'process-metrics': 4, 'stakeholder-community': 4, 'technical-awareness': 3, 'advanced-scaling': 3 }, description: 'Senior agile coach across organization. Driving agile transformation initiatives. Coaching leadership teams. Designing agile operating models. Recognized expert in agile coaching.' },
  { title: 'Scrum Master Manager / Agile Practice Lead', minLevel: 5, expected: { 'agile-scrum': 3, 'facilitation-coaching': 4, 'process-metrics': 4, 'stakeholder-community': 5, 'technical-awareness': 2, 'advanced-scaling': 4 }, description: 'Managing Scrum Masters or agile coaching practice. Building coaching community. Setting coaching standards. Reporting on agile adoption. Managing stakeholders at organizational level.' },
  { title: 'Director of Agile / Head of Agile Coaching', minLevel: 6, expected: { 'agile-scrum': 3, 'facilitation-coaching': 4, 'process-metrics': 4, 'stakeholder-community': 5, 'technical-awareness': 1, 'advanced-scaling': 5 }, description: 'Leading organizational agile transformation. Setting agile strategy. Managing agile coaches and change agents. Executive stakeholder management. Measuring and reporting transformation outcomes.' },
  { title: 'VP of Agile / Chief Agile Officer', minLevel: 6, expected: { 'agile-scrum': 2, 'facilitation-coaching': 3, 'process-metrics': 3, 'stakeholder-community': 6, 'technical-awareness': 1, 'advanced-scaling': 6 }, description: 'Executive leadership for agile transformation. Driving enterprise-wide agile adoption. Strategy aligned with business goals. Building agile culture across the organization. Board-level stakeholder management.' },
];

export const SKILL_COUNT = Object.keys(SKILLS).length;
export const PILLAR_COUNT = COMPETENCY_AREAS.length;
