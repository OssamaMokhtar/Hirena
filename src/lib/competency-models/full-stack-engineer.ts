import type { Skill, SkillCategory, ProficiencyLevel, CompetencyArea, CareerLadderStep } from '@/types';

export const SKILLS: Record<string, Skill> = {
  // Frontend development
  'frontend-html-css': {
    id: 'frontend-html-css', name: 'HTML & CSS',
    description: 'Semantic HTML5, CSS fundamentals (selectors, cascade, box model, flexbox, grid), responsive design, CSS methodology (BEM, CSS Modules, Tailwind).',
    category: 'frontend-development', level: 0,
  },
  'frontend-javascript': {
    id: 'frontend-javascript', name: 'JavaScript & DOM',
    description: 'Deep JavaScript: closures, async/await, promises, event loop, DOM manipulation, events, Web APIs (fetch, localStorage, Intersection Observer).',
    category: 'frontend-development', level: 0,
  },
  'frontend-react': {
    id: 'frontend-react', name: 'React & Component Architecture',
    description: 'React: components, hooks (useState, useEffect, useContext, custom hooks), state management, component composition, rendering behavior, React ecosystem (Router, React Query).',
    category: 'frontend-development', level: 0,
  },
  'frontend-performance-a11y': {
    id: 'frontend-performance-a11y', name: 'Frontend Performance & Accessibility',
    description: 'Core Web Vitals, performance optimization (code splitting, lazy loading, bundle analysis), accessibility (WCAG, ARIA, screen reader testing), SEO fundamentals.',
    category: 'frontend-development', level: 0,
  },
  // Backend development
  'backend-server-engineering': {
    id: 'backend-server-engineering', name: 'Server-Side Engineering',
    description: 'Building server applications: Node.js/Express, Go, Python/FastAPI, or Java/Spring. Request handling, middleware, routing, error handling, logging, configuration management.',
    category: 'backend-development', level: 0,
  },
  'backend-api-design': {
    id: 'backend-api-design', name: 'API Design & Development',
    description: 'RESTful API design (resources, HTTP methods, status codes, versioning), GraphQL basics, API documentation (OpenAPI), input validation, error handling, rate limiting.',
    category: 'backend-development', level: 0,
  },
  'backend-security': {
    id: 'backend-security', name: 'Backend Security',
    description: 'Authentication (JWT, OAuth 2.0, sessions), authorization (RBAC), password hashing (bcrypt, Argon2), OWASP Top 10 awareness, input validation, secure configuration.',
    category: 'backend-development', level: 0,
  },
  'backend-testing': {
    id: 'backend-testing', name: 'Backend Testing',
    description: 'Unit testing server code, integration testing (DB, external services), API testing (supertest, Postman), contract testing, test containers, mocking external dependencies.',
    category: 'backend-development', level: 0,
  },
  // Databases & data
  'sql-databases': {
    id: 'sql-databases', name: 'SQL Databases',
    description: 'Relational database design (normalization, constraints, foreign keys), complex queries (JOINs, CTEs, window functions), query optimization (EXPLAIN), indexing, transactions, connection pooling.',
    category: 'databases-data', level: 0,
  },
  'nosql-caching': {
    id: 'nosql-caching', name: 'NoSQL & Caching',
    description: 'NoSQL databases (MongoDB, DynamoDB), caching strategies (Redis, Memcached, cache-aside, write-through), when to use SQL vs NoSQL, data modeling for different storage types.',
    category: 'databases-data', level: 0,
  },
  'data-modeling': {
    id: 'data-modeling', name: 'Data Modeling & Architecture',
    description: 'Data modeling for different storage types, choosing the right database for the use case, data migration strategies, event-driven data patterns, data consistency models.',
    category: 'databases-data', level: 0,
  },
  // Infrastructure & deployment
  'deployment-infrastructure': {
    id: 'deployment-infrastructure', name: 'Deployment & Infrastructure',
    description: 'Deploying applications: Docker containers, basic Kubernetes (pods, deployments, services), cloud platforms (AWS/GCP/Azure), environment management (dev/staging/prod), configuration management.',
    category: 'infrastructure-deployment', level: 0,
  },
  'devops-cicd': {
    id: 'devops-cicd', name: 'DevOps & CI/CD',
    description: 'CI/CD pipelines (GitHub Actions, GitLab CI), automated testing and deployment, infrastructure as code basics (Terraform), monitoring and observability basics, log management.',
    category: 'infrastructure-deployment', level: 0,
  },
  'cloud-services': {
    id: 'cloud-services', name: 'Cloud Services',
    description: 'Cloud managed services: compute (EC2, Lambda), storage (S3), databases (RDS, DynamoDB), networking (VPC, load balancers), messaging (SQS, SNS), serverless architecture.',
    category: 'infrastructure-deployment', level: 0,
  },
  // Testing (full-stack)
  'fullstack-testing-strategy': {
    id: 'fullstack-testing-strategy', name: 'Full-Stack Testing Strategy',
    description: 'Testing pyramid across the stack: unit tests (frontend + backend), integration tests, E2E tests (Cypress, Playwright), contract testing, visual regression, testing in CI/CD.',
    category: 'testing', level: 0,
  },
  // Architecture & system design
  'system-architecture': {
    id: 'system-architecture', name: 'System Architecture',
    description: 'Full-stack architecture: monolith vs microservices, client-server architecture, API gateway, load balancing, caching layers, message queues, event-driven architecture.',
    category: 'architecture-system-design', level: 0,
  },
  'distributed-systems': {
    id: 'distributed-systems', name: 'Distributed Systems',
    description: 'Distributed systems concepts: CAP theorem, consistency models, distributed transactions (2PC, saga), service discovery, distributed tracing, circuit breakers, retries with backoff.',
    category: 'architecture-system-design', level: 0,
  },
  'scalability-reliability': {
    id: 'scalability-reliability', name: 'Scalability & Reliability',
    description: 'Designing for scale: horizontal vs vertical scaling, database scaling (read replicas, sharding), caching strategies, rate limiting, circuit breakers, health checks, graceful degradation.',
    category: 'architecture-system-design', level: 0,
  },
  // DevOps & CI/CD
  'cicd-advanced': {
    id: 'cicd-advanced', name: 'CI/CD & Automation',
    description: 'Advanced CI/CD: multi-environment deployments, deployment strategies (blue-green, canary, rolling), automated testing gates, infrastructure testing, pipeline optimization.',
    category: 'devops-cicd', level: 0,
  },
  'observability': {
    id: 'observability', name: 'Observability & Monitoring',
    description: 'Monitoring and observability: metrics (Prometheus, Grafana), logging (ELK, Loki), distributed tracing (Jaeger, OpenTelemetry), alerting, dashboarding, SLO/SLI concepts.',
    category: 'devops-cicd', level: 0,
  },
  // Security (full-stack)
  'fullstack-security': {
    id: 'fullstack-security', name: 'Full-Stack Security',
    description: 'End-to-end security: XSS, CSRF, CORS, content security policy, secure authentication flows, API security, security headers, vulnerabilities across the stack.',
    category: 'security', level: 0,
  },
  // Collaboration & communication
  'fullstack-communication': {
    id: 'fullstack-communication', name: 'Technical Communication',
    description: 'Writing design docs for full-stack features, explaining trade-offs across the stack, API contracts, documenting decisions (ADRs), presenting technical proposals.',
    category: 'collaboration-communication', level: 0,
  },
  'fullstack-code-review': {
    id: 'fullstack-code-review', name: 'Full-Stack Code Review',
    description: 'Reviewing code across the stack: frontend (UI, a11y, performance), backend (logic, security, DB queries), integration points, testing coverage, giving constructive feedback.',
    category: 'collaboration-communication', level: 0,
  },
  // Problem-solving & debugging
  'fullstack-debugging': {
    id: 'fullstack-debugging', name: 'Full-Stack Debugging',
    description: 'Debugging across the stack: browser dev tools, server logs, database queries, network requests, distributed tracing, systematic debugging methodology, root cause analysis.',
    category: 'problem-solving', level: 0,
  },
  'technical-decision-making': {
    id: 'technical-decision-making', name: 'Technical Decision Making',
    description: 'Evaluating technical options across the stack, trade-off analysis, risk assessment, making decisions with incomplete information, validating decisions with data.',
    category: 'problem-solving', level: 0,
  },
};

export const COMPETENCY_AREAS: CompetencyArea[] = [
  { id: 'frontend-development', name: 'Frontend Development', description: 'HTML, CSS, JavaScript, React, component architecture', skills: ['frontend-html-css', 'frontend-javascript', 'frontend-react', 'frontend-performance-a11y'], weight: 18 },
  { id: 'backend-development', name: 'Backend Development', description: 'Server-side engineering, API design, security, testing', skills: ['backend-server-engineering', 'backend-api-design', 'backend-security', 'backend-testing'], weight: 18 },
  { id: 'databases-data', name: 'Databases & Data', description: 'SQL, NoSQL, caching, data modeling, architecture', skills: ['sql-databases', 'nosql-caching', 'data-modeling'], weight: 14 },
  { id: 'infrastructure-deployment', name: 'Infrastructure & Deployment', description: 'Deployment, Docker, Kubernetes, cloud services, environment management', skills: ['deployment-infrastructure', 'devops-cicd', 'cloud-services'], weight: 12 },
  { id: 'testing', name: 'Testing', description: 'Full-stack testing strategy: unit, integration, E2E, contract testing', skills: ['fullstack-testing-strategy'], weight: 8 },
  { id: 'architecture-system-design', name: 'Architecture & System Design', description: 'System architecture, distributed systems, scalability, reliability', skills: ['system-architecture', 'distributed-systems', 'scalability-reliability'], weight: 14 },
  { id: 'devops-cicd', name: 'DevOps & CI/CD', description: 'CI/CD pipelines, automation, observability, monitoring', skills: ['cicd-advanced', 'observability'], weight: 8 },
  { id: 'security', name: 'Security', description: 'Full-stack security: XSS, CSRF, auth, API security, OWASP', skills: ['fullstack-security'], weight: 4 },
  { id: 'collaboration-communication', name: 'Collaboration & Communication', description: 'Technical communication, code review, design docs, teamwork', skills: ['fullstack-communication', 'fullstack-code-review'], weight: 2 },
  { id: 'problem-solving', name: 'Problem Solving & Debugging', description: 'Debugging across the stack, technical decision making, root cause analysis', skills: ['fullstack-debugging', 'technical-decision-making'], weight: 2 },
];

export const LEVELS: ProficiencyLevel[] = [0, 1, 2, 3, 4, 5, 6, 7];

export const CAREER_LADDER: CareerLadderStep[] = [
  { title: 'Junior Full-Stack Engineer', minLevel: 0, expected: { 'frontend-development': 1, 'backend-development': 1, 'databases-data': 1, 'infrastructure-deployment': 1, testing: 1, 'architecture-system-design': 1, 'devops-cicd': 1, security: 1, performance: 1, 'collaboration-communication': 1 }, description: 'Entry-level. Building features across the stack under guidance. Learning both frontend and backend. Focusing on clean code, testing basics, and fundamentals.' },
  { title: 'Full-Stack Engineer', minLevel: 2, expected: { 'frontend-development': 2, 'backend-development': 2, 'databases-data': 2, 'infrastructure-deployment': 2, testing: 2, 'architecture-system-design': 2, 'devops-cicd': 2, security: 2, performance: 2, 'collaboration-communication': 2 }, description: 'Core role. Building features end-to-end independently. Understanding both frontend and backend. Writing tests. Basic deployment. Collaborating across the stack.' },
  { title: 'Senior Full-Stack Engineer', minLevel: 3, expected: { 'frontend-development': 3, 'backend-development': 3, 'databases-data': 3, 'infrastructure-deployment': 3, testing: 3, 'architecture-system-design': 3, 'devops-cicd': 3, security: 3, performance: 3, 'collaboration-communication': 3 }, description: 'Operates independently across the stack. Owns complex features end-to-end. Designs APIs and UIs. Optimizes performance. Mentors juniors. Makes architectural decisions.' },
  { title: 'Lead Full-Stack Engineer', minLevel: 4, expected: { 'frontend-development': 4, 'backend-development': 4, 'databases-data': 3, 'infrastructure-deployment': 4, testing: 3, 'architecture-system-design': 4, 'devops-cicd': 4, security: 3, performance: 4, 'collaboration-communication': 4 }, description: 'Technical leader for full-stack. Sets patterns and standards across the stack. Drives architecture decisions. Balances frontend and backend priorities.' },
  { title: 'Principal Full-Stack Engineer', minLevel: 5, expected: { 'frontend-development': 5, 'backend-development': 5, 'databases-data': 4, 'infrastructure-deployment': 5, testing: 4, 'architecture-system-design': 5, 'devops-cicd': 5, security: 4, performance: 5, 'collaboration-communication': 5 }, description: 'Senior technical leader across multiple teams. Sets full-stack architecture. Drives technical strategy. Recognized expert in both frontend and backend.' },
  { title: 'Full-Stack Architect', minLevel: 5, expected: { 'frontend-development': 5, 'backend-development': 5, 'databases-data': 4, 'infrastructure-deployment': 5, testing: 4, 'architecture-system-design': 5, 'devops-cicd': 5, security: 4, performance: 5, 'collaboration-communication': 5 }, description: 'Architect for full-stack systems. Evaluates technology choices across the stack. Sets long-term direction. Balances technical excellence with business needs.' },
  { title: 'Full-Stack Engineering Manager', minLevel: 5, expected: { 'frontend-development': 3, 'backend-development': 3, 'databases-data': 3, 'infrastructure-deployment': 3, testing: 2, 'architecture-system-design': 3, 'devops-cicd': 3, security: 2, performance: 3, 'collaboration-communication': 5 }, description: 'People manager for full-stack team. Hires, develops, manages engineers. Balances people leadership with technical guidance across the stack.' },
  { title: 'Director of Engineering', minLevel: 6, expected: { 'frontend-development': 3, 'backend-development': 2, 'databases-data': 2, 'infrastructure-deployment': 3, testing: 2, 'architecture-system-design': 4, 'devops-cicd': 3, security: 2, performance: 3, 'collaboration-communication': 6 }, description: 'Leads multiple engineering teams. Sets engineering strategy. Manages managers. Focus on organizational effectiveness, quality, and delivery.' },
];

export const SKILL_COUNT = Object.keys(SKILLS).length;
export const PILLAR_COUNT = COMPETENCY_AREAS.length;
