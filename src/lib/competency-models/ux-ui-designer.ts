import type { Skill, ProficiencyLevel, CompetencyArea, CareerLadderStep } from '@/types';

export const SKILLS: Record<string, Skill> = {
  // Design Thinking & Research
  'design-thinking': {
    id: 'design-thinking', name: 'Design Thinking',
    description: 'Human-centered design process: empathize, define, ideate, prototype, test. Problem framing, user empathy, divergent/convergent thinking, design challenge scoping.',
    category: 'design-thinking-research', level: 0,
  },
  'user-research-qualitative': {
    id: 'user-research-qualitative', name: 'Qualitative User Research',
    description: 'User interviews, contextual inquiry, diary studies, focus groups, ethnographic research. Interview guide design, recruiting, moderating, synthesizing findings.',
    category: 'design-thinking-research', level: 0,
  },
  'user-research-quantitative': {
    id: 'user-research-quantitative', name: 'Quantitative User Research',
    description: 'Surveys, analytics review, A/B test analysis, card sorting, tree testing. Statistical significance, sample size, survey design, data-driven design decisions.',
    category: 'design-thinking-research', level: 0,
  },
  'persona-scenario-development': {
    id: 'persona-scenario-development', name: 'Persona & Scenario Development',
    description: 'Creating user personas, journey maps, experience maps, scenario narratives. Translating research into actionable design artifacts.',
    category: 'design-thinking-research', level: 0,
  },
  // Visual Design
  'visual-design-fundamentals': {
    id: 'visual-design-fundamentals', name: 'Visual Design Fundamentals',
    description: 'Color theory, typography, layout, composition, visual hierarchy, contrast, balance, alignment, Gestalt principles. Creating visually compelling interfaces.',
    category: 'visual-design', level: 0,
  },
  'brand-design-systems': {
    id: 'brand-design-systems', name: 'Brand & Design Systems',
    description: 'Building and maintaining design systems: component libraries, style guides, design tokens, pattern libraries. Consistency, scalability, documentation.',
    category: 'visual-design', level: 0,
  },
  'responsive-mobile-design': {
    id: 'responsive-mobile-design', name: 'Responsive & Mobile Design',
    description: 'Designing for multiple breakpoints, mobile-first approach, touch targets, responsive grids, adaptive layouts, platform conventions (iOS Human Interface, Material Design).',
    category: 'visual-design', level: 0,
  },
  'motion-interaction-design': {
    id: 'motion-interaction-design', name: 'Motion & Interaction Design',
    description: 'Micro-interactions, transitions, animations, motion design principles (easing, timing, choreography). Prototyping interactions, conveying behavior through motion.',
    category: 'visual-design', level: 0,
  },
  // UX Process & Tools
  'wireframing-prototyping': {
    id: 'wireframing-prototyping', name: 'Wireframing & Prototyping',
    description: 'Low-fidelity wireframes, mid/high-fidelity prototypes, interactive prototyping tools (Figma, Sketch, Adobe XD, Principle, Framer). Rapid iteration, clickable prototypes.',
    category: 'ux-process-tools', level: 0,
  },
  'information-architecture': {
    id: 'information-architecture', name: 'Information Architecture',
    description: 'Content organization, navigation design, labeling systems, taxonomies, sitemaps, wayfinding. Card sorting, tree testing, IA validation.',
    category: 'ux-process-tools', level: 0,
  },
  'usability-testing': {
    id: 'usability-testing', name: 'Usability Testing',
    description: 'Planning and conducting usability tests: test design, task creation, participant recruitment, moderating sessions, analyzing findings, reporting recommendations, remote testing tools.',
    category: 'ux-process-tools', level: 0,
  },
  'accessibility-wcag': {
    id: 'accessibility-wcag', name: 'Accessibility (WCAG)',
    description: 'WCAG 2.1/2.2 guidelines: perceivable, operable, understandable, robust. Screen reader testing, color contrast, keyboard navigation, ARIA attributes, accessible component patterns.',
    category: 'ux-process-tools', level: 0,
  },
  'design-tools-proficiency': {
    id: 'design-tools-proficiency', name: 'Design Tools Proficiency',
    description: 'Mastery of Figma (auto-layout, components, variants, prototyping, Dev Mode), Sketch, Adobe XD, prototyping tools (Principle, Framer, Protopie), handoff workflows.',
    category: 'ux-process-tools', level: 0,
  },
  // Product & Strategy
  'product-sense': {
    id: 'product-sense', name: 'Product Sense',
    description: 'Understanding user needs, business context, market trends. Connecting design decisions to product goals and metrics. Problem-solution fit thinking.',
    category: 'product-strategy', level: 0,
  },
  'data-informed-design': {
    id: 'data-informed-design', name: 'Data-Informed Design',
    description: 'Using analytics, user data, A/B test results, heatmaps, session recordings to guide design decisions. Hypothesis-driven design, measuring impact.',
    category: 'product-strategy', level: 0,
  },
  'design-metrics': {
    id: 'design-metrics', name: 'Design Metrics & Measurement',
    description: 'Tracking design effectiveness: task success rate, time on task, error rate, SUS, NPS, conversion rates. Setting design KPIs, measuring ROI of design.',
    category: 'product-strategy', level: 0,
  },
  // Content & Communication
  'content-strategy-ux-writing': {
    id: 'content-strategy-ux-writing', name: 'Content Strategy & UX Writing',
    description: 'Microcopy, error messages, onboarding flows, navigation labels, content voice and tone. Content audits, content design systems, inclusive language.',
    category: 'content-communication', level: 0,
  },
  'design-presentation-storytelling': {
    id: 'design-presentation-storytelling', name: 'Design Presentation & Storytelling',
    description: 'Presenting design work to stakeholders: narrative structure, visual presentation, demo techniques, handling feedback, defending design decisions.',
    category: 'content-communication', level: 0,
  },
  'design-critique-collaboration': {
    id: 'design-critique-collaboration', name: 'Design Critique & Collaboration',
    description: 'Giving and receiving design feedback, running design critiques, cross-functional collaboration (PM, engineering, research, marketing), design review processes.',
    category: 'content-communication', level: 0,
  },
  // Advanced
  'design-ops': {
    id: 'design-ops', name: 'Design Operations',
    description: 'Streamlining design workflows, design-process documentation, tool-chain optimization, design-sprint facilitation, design-team processes, design system governance.',
    category: 'advanced-leadership', level: 0,
  },
  'design-leadership-mentoring': {
    id: 'design-leadership-mentoring', name: 'Design Leadership & Mentoring',
    description: 'Leading design teams, mentoring junior designers, hiring, performance reviews, building design culture, portfolio reviews, design career development.',
    category: 'advanced-leadership', level: 0,
  },
  'design-strategy-innovation': {
    id: 'design-strategy-innovation', name: 'Design Strategy & Innovation',
    description: 'Connecting design to business strategy, innovation facilitation, future-state visioning, competitive analysis through design lens, design-driven product strategy.',
    category: 'advanced-leadership', level: 0,
  },
};

export const COMPETENCY_AREAS: CompetencyArea[] = [
  { id: 'design-thinking-research', name: 'Design Thinking & Research', description: 'User research, design thinking process, personas, scenario development', skills: ['design-thinking', 'user-research-qualitative', 'user-research-quantitative', 'persona-scenario-development'], weight: 22 },
  { id: 'visual-design', name: 'Visual Design', description: 'Visual design fundamentals, design systems, responsive design, motion', skills: ['visual-design-fundamentals', 'brand-design-systems', 'responsive-mobile-design', 'motion-interaction-design'], weight: 20 },
  { id: 'ux-process-tools', name: 'UX Process & Tools', description: 'Wireframing, prototyping, IA, usability testing, accessibility, design tools', skills: ['wireframing-prototyping', 'information-architecture', 'usability-testing', 'accessibility-wcag', 'design-tools-proficiency'], weight: 24 },
  { id: 'product-strategy', name: 'Product & Strategy', description: 'Product sense, data-informed design, design metrics and measurement', skills: ['product-sense', 'data-informed-design', 'design-metrics'], weight: 14 },
  { id: 'content-communication', name: 'Content & Communication', description: 'UX writing, design presentation, critique and collaboration', skills: ['content-strategy-ux-writing', 'design-presentation-storytelling', 'design-critique-collaboration'], weight: 12 },
  { id: 'advanced-leadership', name: 'Advanced & Leadership', description: 'Design ops, leadership, mentoring, design strategy and innovation', skills: ['design-ops', 'design-leadership-mentoring', 'design-strategy-innovation'], weight: 8 },
];

export const LEVELS: ProficiencyLevel[] = [0, 1, 2, 3, 4, 5, 6, 7];

export const CAREER_LADDER: CareerLadderStep[] = [
  { title: 'Junior UX/UI Designer', minLevel: 0, expected: { 'design-thinking-research': 1, 'visual-design': 1, 'ux-process-tools': 1, 'product-strategy': 0, 'content-communication': 1, 'advanced-leadership': 0 }, description: 'Entry-level. Executing design tasks under guidance. Learning tools and process. Creating wireframes and visual designs with review.' },
  { title: 'UX/UI Designer', minLevel: 2, expected: { 'design-thinking-research': 2, 'visual-design': 2, 'ux-process-tools': 2, 'product-strategy': 1, 'content-communication': 2, 'advanced-leadership': 0 }, description: 'Core role. Independently executing end-to-end design for features. Conducting research, creating prototypes, testing with users.' },
  { title: 'Senior UX/UI Designer', minLevel: 3, expected: { 'design-thinking-research': 3, 'visual-design': 3, 'ux-process-tools': 3, 'product-strategy': 2, 'content-communication': 3, 'advanced-leadership': 1 }, description: 'Operates independently. Leading design for complex features. Conducting in-depth research, mentoring juniors, driving design excellence.' },
  { title: 'Lead UX/UI Designer', minLevel: 4, expected: { 'design-thinking-research': 3, 'visual-design': 4, 'ux-process-tools': 4, 'product-strategy': 3, 'content-communication': 4, 'advanced-leadership': 2 }, description: 'Design lead for a product area. Setting design direction, building design systems, coordinating across teams, stakeholder management.' },
  { title: 'Principal UX/UI Designer', minLevel: 5, expected: { 'design-thinking-research': 4, 'visual-design': 5, 'ux-process-tools': 4, 'product-strategy': 4, 'content-communication': 5, 'advanced-leadership': 3 }, description: 'Senior design leader across products. Setting organization-wide design standards, driving innovation, influencing product strategy through design.' },
  { title: 'UX/UI Design Manager', minLevel: 5, expected: { 'design-thinking-research': 3, 'visual-design': 3, 'ux-process-tools': 3, 'product-strategy': 4, 'content-communication': 5, 'advanced-leadership': 5 }, description: 'People manager for design team. Hiring, developing designers, managing design processes, balancing people leadership with strategic input.' },
  { title: 'Director of Design', minLevel: 6, expected: { 'design-thinking-research': 3, 'visual-design': 2, 'ux-process-tools': 2, 'product-strategy': 5, 'content-communication': 6, 'advanced-leadership': 6 }, description: 'Leads design organization. Sets design strategy, builds design culture, manages managers, represents design at executive level.' },
  { title: 'VP of Design / Head of Design', minLevel: 6, expected: { 'design-thinking-research': 2, 'visual-design': 1, 'ux-process-tools': 1, 'product-strategy': 6, 'content-communication': 6, 'advanced-leadership': 7 }, description: 'Executive design leader. Design strategy aligned with business goals, building world-class design organizations, board-level design advocacy.' },
];

export const SKILL_COUNT = Object.keys(SKILLS).length;
export const PILLAR_COUNT = COMPETENCY_AREAS.length;
