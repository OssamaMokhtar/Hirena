import type { Skill, SkillCategory, ProficiencyLevel, CompetencyArea, CareerLadderStep } from '@/types';

export const SKILLS: Record<string, Skill> = {
  // Testing foundations
  'testing-principles': {
    id: 'testing-principles', name: 'Testing Principles & Theory',
    description: 'Fundamentals of software testing: verification vs validation, test levels (unit, integration, system, acceptance), test types (functional, non-functional), test design techniques, testability.',
    category: 'testing-foundations', level: 0,
  },
  'test-case-design': {
    id: 'test-case-design', name: 'Test Case Design',
    description: 'Designing effective test cases: equivalence partitioning, boundary value analysis, decision tables, state transition testing, use case testing, error guessing, exploratory testing charter design.',
    category: 'testing-foundations', level: 0,
  },
  'test-planning': {
    id: 'test-planning', name: 'Test Planning & Strategy',
    description: 'Test planning: defining scope, objectives, approach, resources, schedule. Risk-based testing. Test strategy documents. Managing test scope and priorities.',
    category: 'testing-foundations', level: 0,
  },
  'bug-reporting-life-cycle': {
    id: 'bug-reporting-life-cycle', name: 'Bug Reporting & Life Cycle',
    description: 'Writing effective bug reports: clear reproduction steps, expected vs actual results, severity vs priority, bug life cycle (new, open, fixed, verified, closed), bug triage process.',
    category: 'testing-foundations', level: 0,
  },
  'risk-based-testing': {
    id: 'risk-based-testing', name: 'Risk-Based Testing',
    description: 'Identifying and prioritizing risks, risk analysis techniques, testing based on risk assessment, balancing test coverage with risk, communicating risk to stakeholders.',
    category: 'testing-foundations', level: 0,
  },
  // Test automation
  'automation-fundamentals': {
    id: 'automation-fundamentals', name: 'Automation Fundamentals',
    description: 'Test automation concepts: when to automate vs manual, automation pyramid, ROI of automation, automation tools and frameworks, building maintainable automation, automation architecture.',
    category: 'test-automation', level: 0,
  },
  'ui-automation': {
    id: 'ui-automation', name: 'UI/E2E Automation',
    description: 'End-to-end UI testing: Selenium, Cypress, Playwright. Writing reliable UI tests, handling asynchronous behavior, page object pattern, test data management, cross-browser testing.',
    category: 'test-automation', level: 0,
  },
  'api-automation': {
    id: 'api-automation', name: 'API Automation',
    description: 'API testing automation: REST Assured, Supertest, Postman/Newman, testing API endpoints, validating responses, contract testing (Pact), API test integration in CI/CD.',
    category: 'test-automation', level: 0,
  },
  'automation-frameworks': {
    id: 'automation-frameworks', name: 'Automation Framework Design',
    description: 'Designing test automation frameworks: architecture, custom frameworks vs existing tools, page object model, screen play pattern, keyword-driven, data-driven testing, framework maintainability.',
    category: 'test-automation', level: 0,
  },
  'ci-integration-testing': {
    id: 'ci-integration-testing', name: 'CI/CD Test Integration',
    description: 'Integrating automated tests in CI/CD pipelines: test triggers, parallel execution, test reporting, flaky test management, quality gates, deployment decisions based on test results.',
    category: 'test-automation', level: 0,
  },
  // API testing
  'rest-api-testing': {
    id: 'rest-api-testing', name: 'REST API Testing',
    description: 'Testing REST APIs: HTTP methods, status codes, request/response validation, authentication testing, pagination/filtering/sorting, error handling, API test design, tools (Postman, curl, REST Assured).',
    category: 'api-testing', level: 0,
  },
  'graphql-testing': {
    id: 'graphql-testing', name: 'GraphQL Testing',
    description: 'Testing GraphQL APIs: queries, mutations, subscriptions, schema validation, testing resolvers, GraphQL testing tools, testing nested queries and mutations.',
    category: 'api-testing', level: 0,
  },
  'contract-testing': {
    id: 'contract-testing', name: 'Contract Testing',
    description: 'Contract testing concepts: consumer-driven contracts, Pact, ensuring API compatibility, testing service interfaces, contract testing in microservices, avoiding breaking changes.',
    category: 'api-testing', level: 0,
  },
  // Performance testing
  'performance-testing-basics': {
    id: 'performance-testing-basics', name: 'Performance Testing Basics',
    description: 'Performance testing types: load, stress, soak, spike testing. Performance metrics (response time, throughput, concurrency, resource utilization). Test planning for performance.',
    category: 'performance-testing', level: 0,
  },
  'load-testing-tools': {
    id: 'load-testing-tools', name: 'Load Testing Tools & Execution',
    description: 'Using load testing tools: JMeter, k6, Gatling, Locust. Designing load tests, scripting scenarios, analyzing results, identifying bottlenecks, capacity planning basics.',
    category: 'performance-testing', level: 0,
  },
  'performance-analysis': {
    id: 'performance-analysis', name: 'Performance Analysis & Tuning',
    description: 'Analyzing performance test results: identifying bottlenecks (application, database, infrastructure), performance tuning, monitoring during tests, correlating metrics, reporting findings.',
    category: 'performance-testing', level: 0,
  },
  // Security testing
  'security-testing-basics': {
    id: 'security-testing-basics', name: 'Security Testing Basics',
    description: 'Security testing fundamentals: OWASP Top 10, common vulnerabilities (XSS, CSRF, SQL injection, auth bypass), security testing approaches, basic penetration testing concepts.',
    category: 'security-testing', level: 0,
  },
  'security-testing-tools': {
    id: 'security-testing-tools', name: 'Security Testing Tools',
    description: 'Using security testing tools: OWASP ZAP, Burp Suite basics, vulnerability scanners, dependency scanning (Snyk, Dependabot), secret scanning, security testing in CI/CD.',
    category: 'security-testing', level: 0,
  },
  'auth-security-testing': {
    id: 'auth-security-testing', name: 'Authentication & Authorization Testing',
    description: 'Testing auth systems: authentication flows, session management, JWT validation, OAuth/OIDC, authorization checks (RBAC, vertical/horizontal privilege escalation), access control testing.',
    category: 'security-testing', level: 0,
  },
  // Test management & tools
  'test-management-tools': {
    id: 'test-management-tools', name: 'Test Management Tools',
    description: 'Using test management tools: Jira (with Xray/Zephyr), TestRail, qTest. Managing test cases, test suites, test runs, requirements traceability, test reporting.',
    category: 'test-management-tools', level: 0,
  },
  'issue-tracking': {
    id: 'issue-tracking', name: 'Issue Tracking & Collaboration',
    description: 'Using issue trackers: Jira, GitHub Issues. Creating and managing tickets, workflow management, linking test cases to requirements/bugs, collaboration with developers and product.',
    category: 'test-management-tools', level: 0,
  },
  // Process & collaboration
  'qa-process-improvement': {
    id: 'qa-process-improvement', name: 'QA Process Improvement',
    description: 'Improving QA processes: assessing current state, identifying gaps, implementing improvements, metrics and KPIs for QA (defect density, escape rate, test coverage), continuous improvement.',
    category: 'process-collaboration', level: 0,
  },
  'dev-qa-collaboration': {
    id: 'dev-qa-collaboration', name: 'Developer-QA Collaboration',
    description: 'Collaborating with developers: shift-left testing, involving QA early, writing testable code, developer-QA pairing, shared ownership of quality, communication and feedback.',
    category: 'process-collaboration', level: 0,
  },
};

export const COMPETENCY_AREAS: CompetencyArea[] = [
  { id: 'testing-foundations', name: 'Testing Foundations', description: 'Testing theory, test design, planning, bug reporting, risk-based testing', skills: ['testing-principles', 'test-case-design', 'test-planning', 'bug-reporting-life-cycle', 'risk-based-testing'], weight: 25 },
  { id: 'test-automation', name: 'Test Automation', description: 'Automation fundamentals, UI/E2E, API automation, framework design, CI integration', skills: ['automation-fundamentals', 'ui-automation', 'api-automation', 'automation-frameworks', 'ci-integration-testing'], weight: 30 },
  { id: 'api-testing', name: 'API Testing', description: 'REST, GraphQL, contract testing, API test design', skills: ['rest-api-testing', 'graphql-testing', 'contract-testing'], weight: 15 },
  { id: 'performance-testing', name: 'Performance Testing', description: 'Load testing, tools, analysis, tuning, capacity planning', skills: ['performance-testing-basics', 'load-testing-tools', 'performance-analysis'], weight: 12 },
  { id: 'security-testing', name: 'Security Testing', description: 'Security testing basics, tools, auth testing, OWASP Top 10', skills: ['security-testing-basics', 'security-testing-tools', 'auth-security-testing'], weight: 10 },
  { id: 'test-management-tools', name: 'Test Management & Tools', description: 'Test management tools, issue tracking, test organization', skills: ['test-management-tools', 'issue-tracking'], weight: 5 },
  { id: 'process-collaboration', name: 'Process & Collaboration', description: 'QA process improvement, dev-QA collaboration, shift-left, quality culture', skills: ['qa-process-improvement', 'dev-qa-collaboration'], weight: 3 },
];

export const LEVELS: ProficiencyLevel[] = [0, 1, 2, 3, 4, 5, 6, 7];

export const CAREER_LADDER: CareerLadderStep[] = [
  { title: 'Junior QA Engineer', minLevel: 0, expected: { 'testing-foundations': 1, 'test-automation': 1, 'api-testing': 1, 'performance-testing': 1, 'security-testing': 1, 'test-management-tools': 1, 'process-collaboration': 1 }, description: 'Entry-level QA. Executing test cases, reporting bugs, learning automation basics. Working under guidance. Focusing on testing fundamentals.' },
  { title: 'QA Engineer', minLevel: 2, expected: { 'testing-foundations': 2, 'test-automation': 2, 'api-testing': 2, 'performance-testing': 1, 'security-testing': 1, 'test-management-tools': 2, 'process-collaboration': 2 }, description: 'Core QA role. Writing and executing test cases independently. Building automation for key flows. Testing APIs. Collaborating with developers.' },
  { title: 'Senior QA Engineer', minLevel: 3, expected: { 'testing-foundations': 3, 'test-automation': 3, 'api-testing': 3, 'performance-testing': 2, 'security-testing': 2, 'test-management-tools': 3, 'process-collaboration': 3 }, description: 'Operates independently. Designing test strategy for features. Building robust automation frameworks. Performing performance and security testing. Mentoring juniors.' },
  { title: 'Lead QA Engineer', minLevel: 4, expected: { 'testing-foundations': 4, 'test-automation': 4, 'api-testing': 4, 'performance-testing': 3, 'security-testing': 3, 'test-management-tools': 4, 'process-collaboration': 4 }, description: 'Technical leader for QA. Setting QA standards and processes. Driving automation adoption. Making architectural decisions for test infrastructure.' },
  { title: 'Principal QA Engineer', minLevel: 5, expected: { 'testing-foundations': 5, 'test-automation': 5, 'api-testing': 5, 'performance-testing': 4, 'security-testing': 4, 'test-management-tools': 5, 'process-collaboration': 5 }, description: 'Senior QA leader across multiple teams. Setting QA strategy. Designing test architecture. Driving quality culture. Recognized expert in testing.' },
  { title: 'QA Architect', minLevel: 5, expected: { 'testing-foundations': 5, 'test-automation': 5, 'api-testing': 5, 'performance-testing': 4, 'security-testing': 4, 'test-management-tools': 5, 'process-collaboration': 5 }, description: 'Architect for QA systems and processes. Designing test automation architecture. Evaluating tools and technologies. Setting long-term QA direction.' },
  { title: 'QA Engineering Manager', minLevel: 5, expected: { 'testing-foundations': 4, 'test-automation': 3, 'api-testing': 3, 'performance-testing': 2, 'security-testing': 2, 'test-management-tools': 3, 'process-collaboration': 5 }, description: 'People manager for QA team. Hiring, developing, managing QAs. Balancing people leadership with technical guidance.' },
  { title: 'Director of Quality', minLevel: 6, expected: { 'testing-foundations': 4, 'test-automation': 3, 'api-testing': 2, 'performance-testing': 2, 'security-testing': 2, 'test-management-tools': 2, 'process-collaboration': 6 }, description: 'Leads QA organization. Sets quality strategy. Manages managers. Focus on organizational quality, processes, and culture.' },
];

export const SKILL_COUNT = Object.keys(SKILLS).length;
export const PILLAR_COUNT = COMPETENCY_AREAS.length;
