import type { Skill, ProficiencyLevel, CompetencyArea, CareerLadderStep } from '@/types';

export const SKILLS: Record<string, Skill> = {
  // Requirements & Analysis
  'requirements-elicitation': {
    id: 'requirements-elicitation', name: 'Requirements Elicitation',
    description: 'Techniques for gathering requirements: interviews, workshops, observation, document analysis, surveys, prototyping. Stakeholder identification, needs vs. wants, pain point discovery.',
    category: 'requirements-analysis', level: 0,
  },
  'requirements-analysis-specification': {
    id: 'requirements-analysis-specification', name: 'Requirements Analysis & Specification',
    description: 'Analyzing, prioritizing, and specifying requirements. Writing clear requirements documents, user stories with acceptance criteria (Given/When/Then), use cases, functional vs. non-functional requirements.',
    category: 'requirements-analysis', level: 0,
  },
  'business-process-analysis': {
    id: 'business-process-analysis', name: 'Business Process Analysis',
    description: 'Process modeling (BPMN, flowcharts), as-is vs. to-be analysis, process optimization, gap analysis, root cause analysis, SIPOC, value stream mapping, identifying process inefficiencies.',
    category: 'requirements-analysis', level: 0,
  },
  'stakeholder-analysis-management': {
    id: 'stakeholder-analysis-management', name: 'Stakeholder Analysis & Management',
    description: 'Identifying stakeholders, power/interest grid, stakeholder mapping, engagement strategies, managing expectations, communication planning, building relationships across organizational levels.',
    category: 'requirements-analysis', level: 0,
  },
  // Documentation
  'business-requirements-documentation': {
    id: 'business-requirements-documentation', name: 'Business Requirements Documentation',
    description: 'Writing BRDs, FRDs, SRS. Documentation standards, traceability, version control for requirements, maintaining requirement catalogs, linking requirements to business objectives.',
    category: 'documentation-communication', level: 0,
  },
  'functional-specifications': {
    id: 'functional-specifications', name: 'Functional Specifications',
    description: 'Writing detailed functional specifications: system behaviors, inputs/outputs, business rules, data requirements, error handling, edge cases. Supporting technical design with clear functional requirements.',
    category: 'documentation-communication', level: 0,
  },
  'user-story-writing': {
    id: 'user-story-writing', name: 'User Story Writing & Backlog Management',
    description: 'Writing effective user stories (INVEST criteria), acceptance criteria, story mapping, backlog prioritization (MoSCoW, WSJF, Kano), managing product backlog, refinement sessions.',
    category: 'documentation-communication', level: 0,
  },
  // Business Analysis Techniques
  'swot-pestle-analysis': {
    id: 'swot-pestle-analysis', name: 'Strategic Analysis (SWOT, PESTLE)',
    description: 'SWOT analysis, PESTLE analysis, Porter\'s Five Forces, value chain analysis, competitive analysis. Strategic context for business analysis, external and internal factor assessment.',
    category: 'analysis-frameworks', level: 0,
  },
  'data-analysis-basics-business': {
    id: 'data-analysis-basics-business', name: 'Data Analysis for Business',
    description: 'Basic data analysis: Excel, SQL queries for analysis, interpreting business data, identifying trends, KPI monitoring, dashboard creation, translating data into business insights.',
    category: 'analysis-frameworks', level: 0,
  },
  'cost-benefit-analysis': {
    id: 'cost-benefit-analysis', name: 'Cost-Benefit & ROI Analysis',
    description: 'Cost-benefit analysis, ROI calculation, TCO, NPV, payback period, building business cases, financial justification for initiatives, value quantification.',
    category: 'analysis-frameworks', level: 0,
  },
  // Solution Assessment
  'solution-evaluation': {
    id: 'solution-evaluation', name: 'Solution Evaluation & Validation',
    description: 'Evaluating proposed solutions against requirements, validation testing, user acceptance criteria, solution assessment frameworks, comparing alternatives, recommending solutions.',
    category: 'solution-assessment', level: 0,
  },
  'uat-support': {
    id: 'uat-support', name: 'User Acceptance Testing Support',
    description: 'Supporting UAT: creating test scenarios, test data preparation, coordinating UAT sessions, defect tracking, sign-off processes, ensuring solutions meet business needs.',
    category: 'solution-assessment', level: 0,
  },
  'change-impact-assessment': {
    id: 'change-impact-assessment', name: 'Change Impact Assessment',
    description: 'Assessing organizational impact of changes: process changes, system changes, people impact, training needs analysis, transition planning, risk assessment for changes.',
    category: 'solution-assessment', level: 0,
  },
  // Tools & Methods
  'business-analysis-tools': {
    id: 'business-analysis-tools', name: 'Business Analysis Tools',
    description: 'JIRA, Confluence, Visio, Lucidchart, Enterprise Architect, Requirements management tools (DOORS, Jama), Excel advanced, survey tools, prototyping tools, process modeling tools.',
    category: 'tools-methods', level: 0,
  },
  'business-modeling': {
    id: 'business-modeling', name: 'Business Modeling',
    description: 'Business models (Business Model Canvas, Lean Canvas), value proposition design, business case development, business architecture, capability mapping, operating model design.',
    category: 'tools-methods', level: 0,
  },
  // Advanced
  'requirements-traceability': {
    id: 'requirements-traceability', name: 'Requirements Traceability',
    description: 'Managing requirement traceability matrix, linking requirements to design, development, testing, and deployment. Impact analysis, change management, requirement lifecycle management.',
    category: 'advanced-strategies', level: 0,
  },
  'business-analysis-strategy': {
    id: 'business-analysis-strategy', name: 'Business Analysis Strategy & Governance',
    description: 'BA strategy, analysis standards and governance, BA center of excellence, mentoring BAs, methodology selection (Agile, Waterfall, hybrid), BA maturity assessment, continuous improvement of BA practices.',
    category: 'advanced-strategies', level: 0,
  },
  'enterprise-analysis': {
    id: 'enterprise-analysis', name: 'Enterprise Analysis',
    description: 'Enterprise-level analysis: strategic planning support, organizational assessment, capability modeling, business architecture, aligning IT with business strategy, portfolio analysis.',
    category: 'advanced-strategies', level: 0,
  },
};

export const COMPETENCY_AREAS: CompetencyArea[] = [
  { id: 'requirements-analysis', name: 'Requirements & Analysis', description: 'Elicitation, analysis, specification, stakeholder management, business process analysis', skills: ['requirements-elicitation', 'requirements-analysis-specification', 'business-process-analysis', 'stakeholder-analysis-management'], weight: 28 },
  { id: 'documentation-communication', name: 'Documentation & Communication', description: 'Requirements documentation, functional specs, user stories, backlog management', skills: ['business-requirements-documentation', 'functional-specifications', 'user-story-writing'], weight: 22 },
  { id: 'analysis-frameworks', name: 'Analysis Frameworks', description: 'Strategic analysis, data analysis, cost-benefit analysis, business case development', skills: ['swot-pestle-analysis', 'data-analysis-basics-business', 'cost-benefit-analysis'], weight: 16 },
  { id: 'solution-assessment', name: 'Solution Assessment', description: 'Solution evaluation, UAT support, change impact assessment', skills: ['solution-evaluation', 'uat-support', 'change-impact-assessment'], weight: 16 },
  { id: 'tools-methods', name: 'Tools & Methods', description: 'BA tools proficiency, business modeling, process modeling', skills: ['business-analysis-tools', 'business-modeling'], weight: 10 },
  { id: 'advanced-strategies', name: 'Advanced & Strategy', description: 'Traceability, BA strategy, governance, enterprise analysis', skills: ['requirements-traceability', 'business-analysis-strategy', 'enterprise-analysis'], weight: 8 },
];

export const LEVELS: ProficiencyLevel[] = [0, 1, 2, 3, 4, 5, 6, 7];

export const CAREER_LADDER: CareerLadderStep[] = [
  { title: 'Junior Business Analyst', minLevel: 0, expected: { 'requirements-analysis': 1, 'documentation-communication': 1, 'analysis-frameworks': 0, 'solution-assessment': 1, 'tools-methods': 1, 'advanced-strategies': 0 }, description: 'Entry-level. Supporting requirements gathering under guidance. Learning documentation standards. Assisting with process modeling and data analysis.' },
  { title: 'Business Analyst', minLevel: 2, expected: { 'requirements-analysis': 2, 'documentation-communication': 2, 'analysis-frameworks': 1, 'solution-assessment': 2, 'tools-methods': 2, 'advanced-strategies': 0 }, description: 'Core role. Eliciting and documenting requirements independently. Facilitating requirements workshops. Supporting UAT. Writing user stories and functional specs.' },
  { title: 'Senior Business Analyst', minLevel: 3, expected: { 'requirements-analysis': 3, 'documentation-communication': 3, 'analysis-frameworks': 2, 'solution-assessment': 3, 'tools-methods': 3, 'advanced-strategies': 1 }, description: 'Operates independently. Leading complex requirements efforts. Conducting business process analysis. Building business cases. Mentoring junior BAs. Strong stakeholder management.' },
  { title: 'Lead Business Analyst / BA Lead', minLevel: 4, expected: { 'requirements-analysis': 4, 'documentation-communication': 4, 'analysis-frameworks': 3, 'solution-assessment': 4, 'tools-methods': 4, 'advanced-strategies': 2 }, description: 'Leading BA work for major initiatives. Setting BA standards. Coordinating across multiple projects. Facilitating strategic discussions. Quality reviewing BA deliverables.' },
  { title: 'Principal Business Analyst', minLevel: 5, expected: { 'requirements-analysis': 4, 'documentation-communication': 4, 'analysis-frameworks': 4, 'solution-assessment': 4, 'tools-methods': 4, 'advanced-strategies': 3 }, description: 'Senior BA across multiple projects/initiatives. Driving strategic analysis. Designing BA approach for complex programs. Expert in requirements engineering and stakeholder facilitation.' },
  { title: 'Business Analyst Manager / Practice Lead', minLevel: 5, expected: { 'requirements-analysis': 3, 'documentation-communication': 3, 'analysis-frameworks': 4, 'solution-assessment': 3, 'tools-methods': 3, 'advanced-strategies': 4 }, description: 'Managing BA team or practice. Hiring and developing BAs. Setting BA methodology and standards. BA center of excellence. Reporting on BA effectiveness.' },
  { title: 'Director of Business Analysis', minLevel: 6, expected: { 'requirements-analysis': 3, 'documentation-communication': 2, 'analysis-frameworks': 5, 'solution-assessment': 3, 'tools-methods': 3, 'advanced-strategies': 5 }, description: 'Leading BA organization. Setting BA strategy aligned with business goals. Managing BA teams and budgets. Executive stakeholder relationships. Driving organizational BA maturity.' },
  { title: 'VP of Business Analysis / Chief Business Architect', minLevel: 6, expected: { 'requirements-analysis': 2, 'documentation-communication': 1, 'analysis-frameworks': 6, 'solution-assessment': 2, 'tools-methods': 2, 'advanced-strategies': 6 }, description: 'Executive leadership for business analysis and business architecture. Enterprise-wide strategic analysis. Business capability and architecture leadership. Board-level strategic support.' },
];

export const SKILL_COUNT = Object.keys(SKILLS).length;
export const PILLAR_COUNT = COMPETENCY_AREAS.length;
