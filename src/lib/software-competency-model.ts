// Hirena — Software Industry Competency Models
// Option 1: OpenAI Native — async video interview + avatar mentor + multi-role assessment

import type { Skill, SkillCategory, ProficiencyLevel, CareerLevel } from "@/types";

// ─── 1. Software Engineer ────────────────────────────────────────────────────

export const SOFTWARE_ENGINEER_SKILLS: Record<string, Skill> = {
  "data-structures": {
    id: "data-structures",
    name: "Data Structures",
    description: "Proficiency with arrays, linked lists, trees, graphs, hash maps, heaps, and choosing the right structure for a problem",
    category: "technical-foundation",
    level: 0,
  },
  "algorithms": {
    id: "algorithms",
    name: "Algorithms",
    description: "Understanding and applying sorting, searching, graph traversal, dynamic programming, and algorithmic complexity analysis",
    category: "technical-foundation",
    level: 0,
  },
  "complexity-analysis": {
    id: "complexity-analysis",
    name: "Complexity Analysis (Big-O)",
    description: "Ability to analyze time and space complexity of code; understand trade-offs between algorithms",
    category: "technical-foundation",
    level: 0,
  },
  "memory-management": {
    id: "memory-management",
    name: "Memory Management",
    description: "Understanding of stack vs heap, garbage collection, memory leaks, and efficient memory usage patterns",
    category: "technical-foundation",
    level: 0,
  },
  "version-control": {
    id: "version-control",
    name: "Version Control (Git)",
    description: "Proficient with branching, merging, rebasing, resolving conflicts, and collaborative Git workflows",
    category: "engineering-practices",
    level: 0,
  },
  "testing-unit": {
    id: "testing-unit",
    name: "Unit Testing",
    description: "Writing comprehensive unit tests; understanding test-driven development (TDD) and mocking/stubbing",
    category: "engineering-practices",
    level: 0,
  },
  "testing-integration": {
    id: "testing-integration",
    name: "Integration Testing",
    description: "Writing and maintaining integration tests that verify components work together correctly",
    category: "engineering-practices",
    level: 0,
  },
  "testing-e2e": {
    id: "testing-e2e",
    name: "E2E Testing",
    description: "Setting up and maintaining end-to-end tests (Cypress, Playwright, Selenium) for critical user flows",
    category: "engineering-practices",
    level: 0,
  },
  "debugging": {
    id: "debugging",
    name: "Debugging",
    description: "Systematic debugging approach; proficiency with debuggers, logging, profiling, and root cause analysis",
    category: "engineering-practices",
    level: 0,
  },
  "code-review": {
    id: "code-review",
    name: "Code Review",
    description: "Giving and receiving constructive code reviews; identifying bugs, security issues, performance problems, and design flaws",
    category: "engineering-practices",
    level: 0,
  },
  "refactoring": {
    id: "refactoring",
    name: "Refactoring",
    description: "Improving code structure without changing behavior; recognizing code smells and applying refactoring patterns",
    category: "engineering-practices",
    level: 0,
  },
  "documentation": {
    id: "documentation",
    name: "Technical Documentation",
    description: "Writing clear code comments, API docs, READMEs, architecture decision records (ADRs), and runbooks",
    category: "engineering-practices",
    level: 0,
  },
  "design-patterns": {
    id: "design-patterns",
    name: "Design Patterns",
    description: "Understanding and applying common design patterns (Factory, Singleton, Observer, Strategy, etc.) appropriately",
    category: "system-design",
    level: 0,
  },
  "api-design": {
    id: "api-design",
    name: "API Design",
    description: "Designing clean, consistent, versioned APIs (REST, GraphQL); understanding idempotency, pagination, error handling",
    category: "system-design",
    level: 0,
  },
  "architecture-styles": {
    id: "architecture-styles",
    name: "Architecture Styles",
    description: "Understanding monolith vs microservices vs serverless vs event-driven; choosing appropriate architecture for context",
    category: "system-design",
    level: 0,
  },
  "modular-design": {
    id: "modular-design",
    name: "Modular Design",
    description: "Designing modular, loosely-coupled systems with clear boundaries; applying SOLID principles",
    category: "system-design",
    level: 0,
  },
  "sql-databases": {
    id: "sql-databases",
    name: "SQL Databases",
    description: "Designing schemas, writing complex queries, understanding indexes, transactions, normalization, and query optimization",
    category: "data",
    level: 0,
  },
  "nosql-databases": {
    id: "nosql-databases",
    name: "NoSQL Databases",
    description: "Understanding document, key-value, columnar, and graph databases; choosing the right store for the use case",
    category: "data",
    level: 0,
  },
  "caching": {
    id: "caching",
    name: "Caching Strategies",
    description: "Understanding cache invalidation, TTL, write-through vs write-back, distributed caching (Redis, Memcached)",
    category: "data",
    level: 0,
  },
  "data-modeling": {
    id: "data-modeling",
    name: "Data Modeling",
    description: "Designing data models for applications; understanding normalization, denormalization, and access patterns",
    category: "data",
    level: 0,
  },
  "cloud-platforms": {
    id: "cloud-platforms",
    name: "Cloud Platforms (AWS/GCP/Azure)",
    description: "Proficiency with at least one major cloud provider; understanding compute, storage, networking, and managed services",
    category: "cloud-platforms",
    level: 0,
  },
  "containers": {
    id: "containers",
    name: "Containers & Docker",
    description: "Writing Dockerfiles, understanding container lifecycle, multi-stage builds, and container best practices",
    category: "containerization",
    level: 0,
  },
  "orchestration": {
    id: "orchestration",
    name: "Orchestration (Kubernetes)",
    description: "Understanding pods, services, deployments, configmaps, ingress; basic cluster administration",
    category: "containerization",
    level: 0,
  },
  "ci-cd": {
    id: "ci-cd",
    name: "CI/CD Pipelines",
    description: "Setting up automated build, test, and deployment pipelines (GitHub Actions, GitLab CI, Jenkins, etc.)",
    category: "ci-cd",
    level: 0,
  },
  "monitoring": {
    id: "monitoring",
    name: "Monitoring & Observability",
    description: "Setting up logging, metrics, and alerting; using tools like Prometheus, Grafana, Datadog; understanding distributed tracing",
    category: "observability",
    level: 0,
  },
  "agile": {
    id: "agile",
    name: "Agile / Sprint Execution",
    description: "Working effectively in agile teams; participating in planning, standups, retrospectives; delivering incrementally",
    category: "collaboration",
    level: 0,
  },
  "communication": {
    id: "communication",
    name: "Technical Communication",
    description: "Explaining technical concepts to non-technical stakeholders; writing clear status updates; documenting decisions",
    category: "communication",
    level: 0,
  },
  "mentoring": {
    id: "mentoring",
    name: "Mentoring / Knowledge Sharing",
    description: "Mentoring junior engineers; conducting tech talks; contributing to team knowledge base; pair programming",
    category: "collaboration",
    level: 0,
  },
};

export const SOFTWARE_ENGINEER_CAREER_LADDER: CareerLevel[] = [
  {
    role: "Junior Software Engineer",
    track: "software-engineering",
    expectedProficiency: {
      "technical-foundation": 1,
      "engineering-practices": 1,
      "system-design": 1,
      data: 1,
      "cloud-platforms": 1,
      collaboration: 1,
    },
    description: "Entry-level engineer. Focus on learning the codebase, writing clean code, and building foundational skills under guidance.",
  },
  {
    role: "Software Engineer",
    track: "software-engineering",
    expectedProficiency: {
      "technical-foundation": 2,
      "engineering-practices": 2,
      "system-design": 1,
      data: 2,
      "cloud-platforms": 1,
      collaboration: 2,
    },
    description: "Core engineering role. Independently delivers features; writes tests; participates in code review; growing system design awareness.",
  },
  {
    role: "Senior Software Engineer",
    track: "software-engineering",
    expectedProficiency: {
      "technical-foundation": 3,
      "engineering-practices": 3,
      "system-design": 2,
      data: 3,
      "cloud-platforms": 2,
      collaboration: 2,
    },
    description: "Experienced engineer who operates independently. Strong coding practices; designs medium-complexity systems; mentors juniors.",
  },
  {
    role: "Staff Software Engineer",
    track: "software-engineering",
    expectedProficiency: {
      "technical-foundation": 4,
      "engineering-practices": 4,
      "system-design": 3,
      data: 3,
      "cloud-platforms": 3,
      collaboration: 3,
    },
    description: "Technical leader across multiple teams. Designs complex systems; sets engineering standards; drives technical initiatives.",
  },
  {
    role: "Principal Engineer",
    track: "software-engineering",
    expectedProficiency: {
      "technical-foundation": 5,
      "engineering-practices": 5,
      "system-design": 4,
      data: 4,
      "cloud-platforms": 4,
      collaboration: 4,
    },
    description: "Organization-level technical authority. Solves the hardest technical problems; shapes engineering culture and long-term architecture.",
  },
];

// ─── 2. Full-Stack Engineer ───────────────────────────────────────────────────

export const FULL_STACK_ENGINEER_SKILLS: Record<string, Skill> = {
  "html-css": {
    id: "html-css",
    name: "HTML / CSS",
    description: "Semantic HTML, responsive CSS, Flexbox/Grid, animations, accessibility (a11y) basics",
    category: "frontend",
    level: 0,
  },
  "javascript": {
    id: "javascript",
    name: "JavaScript (ES6+)",
    description: "Modern JavaScript: async/await, closures, prototypes, modules, event loop, DOM manipulation",
    category: "frontend",
    level: 0,
  },
  "typescript": {
    id: "typescript",
    name: "TypeScript",
    description: "Type system, generics, interfaces, utility types, strict mode; writing type-safe frontend and backend code",
    category: "frontend",
    level: 0,
  },
  "react": {
    id: "react",
    name: "React",
    description: "Components, hooks, state management, routing, performance optimization, ecosystem",
    category: "frontend",
    level: 0,
  },
  "vue": {
    id: "vue",
    name: "Vue.js",
    description: "Components, reactivity system, Vue Router, Pinia/Vuex, composition API, Nuxt",
    category: "frontend",
    level: 0,
  },
  "css-frameworks": {
    id: "css-frameworks",
    name: "CSS Frameworks / Styling",
    description: "Tailwind, CSS Modules, Styled Components, Sass; component-driven styling approaches",
    category: "frontend",
    level: 0,
  },
  "nodejs": {
    id: "nodejs",
    name: "Node.js",
    description: "Event loop, streams, buffers, middleware patterns, error handling, clustering, performance tuning",
    category: "backend",
    level: 0,
  },
  "python-backend": {
    id: "python-backend",
    name: "Python Backend (Django/Flask/FastAPI)",
    description: "Building REST APIs, ORM usage, authentication, async Python, dependency injection, Python ecosystem",
    category: "backend",
    level: 0,
  },
  "java-backend": {
    id: "java-backend",
    name: "Java Backend (Spring)",
    description: "Spring Boot, dependency injection, JPA/Hibernate, REST controllers, security, testing",
    category: "backend",
    level: 0,
  },
  "api-design-fs": {
    id: "api-design-fs",
    name: "API Design (REST/GraphQL)",
    description: "Designing well-structured APIs; REST conventions, GraphQL schemas, versioning, documentation (OpenAPI)",
    category: "backend",
    level: 0,
  },
  "authentication": {
    id: "authentication",
    name: "Authentication & Authorization",
    description: "JWT, OAuth2, sessions, RBAC, OAuth providers (Google, GitHub), session management, security best practices",
    category: "backend",
    level: 0,
  },
  "sql-fs": {
    id: "sql-fs",
    name: "SQL Databases",
    description: "Schema design, queries, migrations, ORM/Query builders, transactions, indexing, connection pooling",
    category: "databases",
    level: 0,
  },
  "nosql-fs": {
    id: "nosql-fs",
    name: "NoSQL Databases",
    description: "MongoDB, Redis, DynamoDB; document modeling, caching, when to use NoSQL vs SQL",
    category: "databases",
    level: 0,
  },
  "deployment": {
    id: "deployment",
    name: "Deployment & Hosting",
    description: "Deploying to Vercel, Netlify, Heroku, AWS, DigitalOcean; understanding production environments, domains, SSL",
    category: "devops",
    level: 0,
  },
  "ci-cd-fs": {
    id: "ci-cd-fs",
    name: "CI/CD for Full-Stack",
    description: "Automated testing, building, and deploying both frontend and backend; environment management",
    category: "devops",
    level: 0,
  },
  "basic-devops": {
    id: "basic-devops",
    name: "Basic DevOps / Infrastructure",
    description: "Docker basics, environment variables, logging, monitoring, basic cloud services (S3, CDN, RDBMS)",
    category: "devops",
    level: 0,
  },
  "testing-fs": {
    id: "testing-fs",
    name: "Testing (Full-Stack)",
    description: "Unit, integration, and E2E tests across frontend and backend; React Testing Library, Jest, Cypress, Playwright",
    category: "engineering-practices",
    level: 0,
  },
  "code-review-fs": {
    id: "code-review-fs",
    name: "Code Review",
    description: "Reviewing full-stack code; understanding both frontend and backend implications; giving constructive feedback",
    category: "engineering-practices",
    level: 0,
  },
  "debugging-fs": {
    id: "debugging-fs",
    name: "Full-Stack Debugging",
    description: "Debugging across the stack; browser devtools, server logs, network inspection, database queries",
    category: "engineering-practices",
    level: 0,
  },
  "agile-fs": {
    id: "agile-fs",
    name: "Agile / Cross-Functional Collaboration",
    description: "Working with designers, PMs, and other engineers; participating in full-stack sprint delivery",
    category: "collaboration",
    level: 0,
  },
};

export const FULL_STACK_ENGINEER_CAREER_LADDER: CareerLevel[] = [
  {
    role: "Junior Full-Stack Engineer",
    track: "full-stack-engineering",
    expectedProficiency: {
      frontend: 1,
      backend: 1,
      databases: 1,
      devops: 1,
      "engineering-practices": 1,
      collaboration: 1,
    },
    description: "Entry-level full-stack. Can build simple features end-to-end with guidance. Learning the full stack depth.",
  },
  {
    role: "Full-Stack Engineer",
    track: "full-stack-engineering",
    expectedProficiency: {
      frontend: 2,
      backend: 2,
      databases: 2,
      devops: 1,
      "engineering-practices": 2,
      collaboration: 2,
    },
    description: "Independently delivers features across the stack. Comfortable with both frontend and backend; growing DevOps awareness.",
  },
  {
    role: "Senior Full-Stack Engineer",
    track: "full-stack-engineering",
    expectedProficiency: {
      frontend: 3,
      backend: 3,
      databases: 3,
      devops: 2,
      "engineering-practices": 3,
      collaboration: 2,
    },
    description: "Strong across the stack. Designs and delivers complex features independently. Mentors juniors. Growing architectural input.",
  },
  {
    role: "Staff Full-Stack Engineer",
    track: "full-stack-engineering",
    expectedProficiency: {
      frontend: 4,
      backend: 4,
      databases: 3,
      devops: 3,
      "engineering-practices": 4,
      collaboration: 3,
    },
    description: "Technical leader across frontend and backend. Drives architectural decisions. Sets quality standards. Influences multiple teams.",
  },
];

// ─── 3. Frontend Engineer ─────────────────────────────────────────────────────

export const FRONTEND_ENGINEER_SKILLS: Record<string, Skill> = {
  "html-css-fe": {
    id: "html-css-fe",
    name: "HTML / CSS",
    description: "Semantic HTML, advanced CSS (Grid, Flexbox, animations, custom properties), responsive design, accessibility",
    category: "frontend-core",
    level: 0,
  },
  "javascript-fe": {
    id: "javascript-fe",
    name: "JavaScript (ES6+)",
    description: "Deep JavaScript knowledge: closures, prototypes, async patterns, event loop, DOM, modules, modern syntax",
    category: "frontend-core",
    level: 0,
  },
  "typescript-fe": {
    id: "typescript-fe",
    name: "TypeScript",
    description: "Advanced TypeScript: generics, conditional types, utility types, strict typing, type-safe patterns",
    category: "frontend-core",
    level: 0,
  },
  "react-fe": {
    id: "react-fe",
    name: "React",
    description: "Advanced React: hooks patterns, context, performance optimization, custom hooks, concurrent features, server components",
    category: "frontend-frameworks",
    level: 0,
  },
  "state-management": {
    id: "state-management",
    name: "State Management",
    description: "Redux, Zustand, Context API, SWR, React Query; choosing the right state management approach",
    category: "frontend-frameworks",
    level: 0,
  },
  "css-architectures": {
    id: "css-architectures",
    name: "CSS Architectures & Frameworks",
    description: "Tailwind, CSS Modules, Styled Components, Sass, design tokens, theming, component libraries",
    category: "frontend-frameworks",
    level: 0,
  },
  "testing-fe": {
    id: "testing-fe",
    name: "Frontend Testing",
    description: "React Testing Library, Jest, Cypress, Playwright, mocking, testing custom hooks, visual regression",
    category: "frontend-engineering",
    level: 0,
  },
  "performance-fe": {
    id: "performance-fe",
    name: "Frontend Performance",
    description: "Bundle optimization, code splitting, lazy loading, caching strategies, Core Web Vitals, rendering optimization",
    category: "frontend-engineering",
    level: 0,
  },
  "accessibility": {
    id: "accessibility",
    name: "Web Accessibility (a11y)",
    description: "WCAG guidelines, ARIA attributes, semantic HTML, screen reader testing, keyboard navigation, color contrast",
    category: "frontend-engineering",
    level: 0,
  },
  "build-tools": {
    id: "build-tools",
    name: "Build Tools & Bundlers",
    description: "Webpack, Vite, ESBuild, TypeScript compilation, tree shaking, environment variables, production builds",
    category: "frontend-engineering",
    level: 0,
  },
  "apijs": {
    id: "apijs",
    name: "API Integration",
    description: "Fetching data from APIs; handling loading/error states; pagination, caching, real-time updates (WebSockets, SSE)",
    category: "frontend-engineering",
    level: 0,
  },
  "design-collaboration": {
    id: "design-collaboration",
    name: "Design Collaboration",
    description: "Working with designers; implementing designs faithfully; Figma-to-code workflow; design system contribution",
    category: "collaboration",
    level: 0,
  },
};

export const FRONTEND_ENGINEER_CAREER_LADDER: CareerLevel[] = [
  {
    role: "Junior Frontend Engineer",
    track: "frontend-engineering",
    expectedProficiency: {
      "frontend-core": 1,
      "frontend-frameworks": 1,
      "frontend-engineering": 1,
      collaboration: 1,
    },
    description: "Entry-level frontend. Implements designs with guidance. Learning the framework deeply and building solid CSS/JS foundations.",
  },
  {
    role: "Frontend Engineer",
    track: "frontend-engineering",
    expectedProficiency: {
      "frontend-core": 2,
      "frontend-frameworks": 2,
      "frontend-engineering": 2,
      collaboration: 2,
    },
    description: "Independently builds and maintains frontend features. Writes tests. Optimizes performance. Collaborates with design and backend.",
  },
  {
    role: "Senior Frontend Engineer",
    track: "frontend-engineering",
    expectedProficiency: {
      "frontend-core": 3,
      "frontend-frameworks": 3,
      "frontend-engineering": 3,
      collaboration: 2,
    },
    description: "Owns frontend architecture for features or products. Mentors juniors. Drives accessibility and performance improvements.",
  },
  {
    role: "Staff Frontend Engineer",
    track: "frontend-engineering",
    expectedProficiency: {
      "frontend-core": 4,
      "frontend-frameworks": 4,
      "frontend-engineering": 4,
      collaboration: 3,
    },
    description: "Frontend technical leader. Sets frontend standards. Designs component systems. Influences cross-team frontend architecture.",
  },
];

// ─── 4. Backend Engineer ──────────────────────────────────────────────────────

export const BACKEND_ENGINEER_SKILLS: Record<string, Skill> = {
  "language-depth": {
    id: "language-depth",
    name: "Language Depth (Python/Java/Go/Node)",
    description: "Deep knowledge of at least one backend language: idioms, standard library, concurrency model, performance characteristics",
    category: "backend-core",
    level: 0,
  },
  "api-design-be": {
    id: "api-design-be",
    name: "API Design & Development",
    description: "Designing and building REST/GraphQL APIs; versioning, documentation (OpenAPI), error handling, rate limiting",
    category: "backend-core",
    level: 0,
  },
  "database-advanced": {
    id: "database-advanced",
    name: "Advanced Databases",
    description: "Complex queries, query optimization, indexing strategies, transactions, connection pooling, replication, sharding",
    category: "backend-core",
    level: 0,
  },
  "data-modeling-be": {
    id: "data-modeling-be",
    name: "Data Modeling & Schema Design",
    description: "Designing efficient schemas; normalization vs denormalization; read/write patterns; migration strategies",
    category: "backend-core",
    level: 0,
  },
  "caching-be": {
    id: "caching-be",
    name: "Caching & Performance",
    description: "Cache strategies (Redis, Memcached); CDN; query caching; understanding cache invalidation challenges",
    category: "backend-core",
    level: 0,
  },
  "authentication-be": {
    id: "authentication-be",
    name: "Authentication & Authorization",
    description: "OAuth2, OIDC, JWT, sessions, RBAC/ABAC, API keys, SSO, security best practices, token management",
    category: "backend-security",
    level: 0,
  },
  "security-be": {
    id: "security-be",
    name: "Backend Security",
    description: "Common vulnerabilities (OWASP Top 10), injection prevention, input validation, encryption, secrets management, security headers",
    category: "backend-security",
    level: 0,
  },
  "testing-be": {
    id: "testing-be",
    name: "Backend Testing",
    description: "Unit, integration, and contract testing; mocking external services; test databases; load testing basics",
    category: "backend-engineering",
    level: 0,
  },
  "messaging": {
    id: "messaging",
    name: "Messaging & Event-Driven",
    description: "Message queues (RabbitMQ, Kafka, SQS); event-driven architecture; pub/sub patterns; eventual consistency",
    category: "backend-engineering",
    level: 0,
  },
  "async-processing": {
    id: "async-processing",
    name: "Async & Background Processing",
    description: "Background jobs, workers, cron schedules, task queues (Celery, Bull, Sidekiq); handling failures and retries",
    category: "backend-engineering",
    level: 0,
  },
  "observability-be": {
    id: "observability-be",
    name: "Observability & Monitoring",
    description: "Logging strategies, metrics, alerting, distributed tracing, health checks, dashboards; using Prometheus/Grafana/Datadog",
    category: "observability",
    level: 0,
  },
  "cloud-be": {
    id: "cloud-be",
    name: "Cloud Services (AWS/GCP/Azure)",
    description: "Managed services (RDS, Lambda, SQS, SNS, DynamoDB, Pub/Sub); infrastructure as code basics; cloud architecture patterns",
    category: "cloud-platforms",
    level: 0,
  },
  "containers-be": {
    id: "containers-be",
    name: "Containers & Deployment",
    description: "Docker for backend services; basic Kubernetes; deployment strategies (blue-green, canary); environment management",
    category: "containerization",
    level: 0,
  },
  "collaboration-be": {
    id: "collaboration-be",
    name: "Cross-Functional Collaboration",
    description: "Working with frontend, PM, data, and ops teams; API contracts; writing accessible technical specs",
    category: "collaboration",
    level: 0,
  },
};

export const BACKEND_ENGINEER_CAREER_LADDER: CareerLevel[] = [
  {
    role: "Junior Backend Engineer",
    track: "backend-engineering",
    expectedProficiency: {
      "backend-core": 1,
      "backend-security": 1,
      "backend-engineering": 1,
      "cloud-platforms": 1,
      collaboration: 1,
    },
    description: "Entry-level backend. Builds simple APIs and services under guidance. Learning the language, database, and deployment basics.",
  },
  {
    role: "Backend Engineer",
    track: "backend-engineering",
    expectedProficiency: {
      "backend-core": 2,
      "backend-security": 2,
      "backend-engineering": 2,
      "cloud-platforms": 1,
      collaboration: 2,
    },
    description: "Independently builds and maintains backend services. Writes tests. Understands security basics. Growing cloud and messaging awareness.",
  },
  {
    role: "Senior Backend Engineer",
    track: "backend-engineering",
    expectedProficiency: {
      "backend-core": 3,
      "backend-security": 3,
      "backend-engineering": 3,
      "cloud-platforms": 2,
      collaboration: 2,
    },
    description: "Owns complex backend systems. Designs APIs and data models. Implements caching, messaging, and observability. Mentors juniors.",
  },
  {
    role: "Staff Backend Engineer",
    track: "backend-engineering",
    expectedProficiency: {
      "backend-core": 4,
      "backend-security": 4,
      "backend-engineering": 4,
      "cloud-platforms": 3,
      collaboration: 3,
    },
    description: "Backend technical leader. Designs organization-level systems. Drives architectural decisions. Sets engineering and security standards.",
  },
];

// ─── 5. QA Engineer ───────────────────────────────────────────────────────────

export const QA_ENGINEER_SKILLS: Record<string, Skill> = {
  "test-planning": {
    id: "test-planning",
    name: "Test Planning & Strategy",
    description: "Developing test plans, test scope, risk analysis, test approach documentation, entry/exit criteria",
    category: "testing-strategy",
    level: 0,
  },
  "test-design": {
    id: "test-design",
    name: "Test Case Design",
    description: "Writing clear, comprehensive test cases; equivalence partitioning, boundary value analysis, decision tables, state transitions",
    category: "testing-strategy",
    level: 0,
  },
  "manual-testing": {
    id: "manual-testing",
    name: "Manual Testing",
    description: "Executing test cases manually; exploratory testing; bug reporting with clear steps to reproduce; severity/priority assessment",
    category: "testing-execution",
    level: 0,
  },
  "bug-tracking": {
    id: "bug-tracking",
    name: "Bug Tracking & Triage",
    description: "Using Jira/bug trackers effectively; writing clear bug reports; triaging and prioritizing bugs; working with developers on fixes",
    category: "testing-execution",
    level: 0,
  },
  "selenium": {
    id: "selenium",
    name: "Selenium / WebDriver",
    description: "Writing and maintaining Selenium tests; browser automation; wait strategies; page object model; cross-browser testing",
    category: "test-automation",
    level: 0,
  },
  "playwright-cypress": {
    id: "playwright-cypress",
    name: "Playwright / Cypress",
    description: "Modern E2E testing tools; writing robust tests; handling flakiness; visual testing; component testing",
    category: "test-automation",
    level: 0,
  },
  "api-testing": {
    id: "api-testing",
    name: "API Testing",
    description: "Testing REST/GraphQL APIs; using Postman, RestAssured, or similar; validating responses, status codes, schemas",
    category: "test-automation",
    level: 0,
  },
  "bdd": {
    id: "bdd",
    name: "BDD (Cucumber / SpecFlow)",
    description: "Writing BDD scenarios in Gherkin; integrating with test frameworks; bridging communication between QA and dev/product",
    category: "test-automation",
    level: 0,
  },
  "performance-testing": {
    id: "performance-testing",
    name: "Performance Testing",
    description: "Load, stress, and soak testing; using JMeter, k6, or similar; understanding bottlenecks; reporting performance metrics",
    category: "testing-specialist",
    level: 0,
  },
  "security-testing": {
    id: "security-testing",
    name: "Security Testing Basics",
    description: "Basic security testing; OWASP Top 10 awareness; using security scanning tools; understanding common vulnerabilities",
    category: "testing-specialist",
    level: 0,
  },
  "mobile-testing": {
    id: "mobile-testing",
    name: "Mobile Testing Basics",
    description: "Testing mobile apps (iOS/Android); using Appium or similar; understanding mobile-specific issues (network, battery, OS versions)",
    category: "testing-specialist",
    level: 0,
  },
  "ci-test-automation": {
    id: "ci-test-automation",
    name: "CI Test Automation",
    description: "Integrating automated tests into CI/CD pipelines; running tests on every build; test reporting; flaky test management",
    category: "test-automation",
    level: 0,
  },
  "sql-for-qa": {
    id: "sql-for-qa",
    name: "SQL for QA",
    description: "Writing SQL queries to verify data; setting up test data; understanding database state for testing",
    category: "testing-tools",
    level: 0,
  },
  "test-management": {
    id: "test-management",
    name: "Test Management Tools",
    description: "Using test management tools (TestRail, Zephyr, etc.); organizing test suites; tracking coverage; reporting test status",
    category: "testing-tools",
    level: 0,
  },
  "process": {
    id: "process",
    name: "QA Process & Collaboration",
    description: "Understanding SDLC; shift-left testing; working with dev and product; advocating for quality; test reporting to stakeholders",
    category: "collaboration",
    level: 0,
  },
};

export const QA_ENGINEER_CAREER_LADDER: CareerLevel[] = [
  {
    role: "Junior QA Engineer",
    track: "qa-engineering",
    expectedProficiency: {
      "testing-strategy": 1,
      "testing-execution": 1,
      "test-automation": 1,
      "testing-tools": 1,
      "testing-specialist": 1,
      collaboration: 1,
    },
    description: "Entry-level QA. Executes test cases, reports bugs, learns automation basics. Growing understanding of the SDLC and quality processes.",
  },
  {
    role: "QA Engineer",
    track: "qa-engineering",
    expectedProficiency: {
      "testing-strategy": 2,
      "testing-execution": 2,
      "test-automation": 2,
      "testing-tools": 2,
      "testing-specialist": 1,
      collaboration: 2,
    },
    description: "Independently tests features and writes automated tests. Participates in sprint planning. Growing expertise in one specialization area.",
  },
  {
    role: "Senior QA Engineer",
    track: "qa-engineering",
    expectedProficiency: {
      "testing-strategy": 3,
      "testing-execution": 3,
      "test-automation": 3,
      "testing-tools": 3,
      "testing-specialist": 2,
      collaboration: 2,
    },
    description: "Owns testing strategy for features or products. Builds robust automation frameworks. Mentors juniors. Deep expertise in a specialization.",
  },
  {
    role: "QA Lead / Test Architect",
    track: "qa-engineering",
    expectedProficiency: {
      "testing-strategy": 4,
      "testing-execution": 3,
      "test-automation": 4,
      "testing-tools": 4,
      "testing-specialist": 3,
      collaboration: 3,
    },
    description: "Leads QA practice. Designs test architecture and frameworks. Sets quality standards. Influences development process and shift-left practices.",
  },
];

// ─── 6. Data Analyst ──────────────────────────────────────────────────────────

export const DATA_ANALYST_SKILLS: Record<string, Skill> = {
  "sql-advanced": {
    id: "sql-advanced",
    name: "Advanced SQL",
    description: "Complex queries, window functions, CTEs, query optimization, joins, subqueries, aggregations; comfortable with large datasets",
    category: "data-retrieval",
    level: 0,
  },
  "data-visualization": {
    id: "data-visualization",
    name: "Data Visualization",
    description: "Creating clear, insightful charts and dashboards; choosing the right visualization for the data; storytelling with data",
    category: "data-analysis",
    level: 0,
  },
  "excel": {
    id: "excel",
    name: "Excel / Spreadsheets",
    description: "Advanced Excel: formulas, pivot tables, VLOOKUP/XLOOKUP, conditional formatting, basic macros; data cleaning and analysis",
    category: "data-tools",
    level: 0,
  },
  "bi-tools": {
    id: "bi-tools",
    name: "BI Tools (Tableau/Power BI/Looker)",
    description: "Building dashboards and reports in BI tools; data modeling within the tool; calculated fields; sharing and scheduling",
    category: "data-tools",
    level: 0,
  },
  "statistics": {
    id: "statistics",
    name: "Statistics & Probability",
    description: "Understanding descriptive statistics, distributions, hypothesis testing, correlation vs causation, confidence intervals",
    category: "data-analysis",
    level: 0,
  },
  "data-cleaning": {
    id: "data-cleaning",
    name: "Data Cleaning & Preparation",
    description: "Handling missing data, outliers, duplicates; data transformation; standardizing formats; preparing data for analysis",
    category: "data-analysis",
    level: 0,
  },
  "python-data": {
    id: "python-data",
    name: "Python for Data Analysis (Pandas/NumPy)",
    description: "Using Pandas for data manipulation, NumPy for numerical operations, Matplotlib/Seaborn for visualization",
    category: "data-programming",
    level: 0,
  },
  "r-data": {
    id: "r-data",
    name: "R for Data Analysis",
    description: "Using R for statistical analysis, data manipulation (dplyr), visualization (ggplot2), reproducible research",
    category: "data-programming",
    level: 0,
  },
  "reporting": {
    id: "reporting",
    name: "Reporting & Storytelling",
    description: "Creating reports for stakeholders; translating data insights into business recommendations; presenting findings clearly",
    category: "communication",
    level: 0,
  },
  "business-intelligence": {
    id: "business-intelligence",
    name: "Business Intelligence",
    description: "Understanding business context; defining KPIs; building self-service analytics; understanding the data pipeline from source to insight",
    category: "domain-knowledge",
    level: 0,
  },
  "data-sources": {
    id: "data-sources",
    name: "Data Sources & Integration",
    description: "Understanding where data comes from; working with APIs, databases, data warehouses; basic ETL concepts",
    category: "data-engineering",
    level: 0,
  },
  "data-warehousing": {
    id: "data-warehousing",
    name: "Data Warehousing Basics",
    description: "Understanding star/snowflake schemas, fact/dimension tables, data marts, ELT vs ETL, columnar stores",
    category: "data-engineering",
    level: 0,
  },
  "analytics-tools": {
    id: "analytics-tools",
    name: "Analytics Platforms",
    description: "Using Google Analytics, Mixpanel, Amplitude, or similar; understanding events, funnels, cohorts, retention analysis",
    category: "domain-knowledge",
    level: 0,
  },
  "collaboration-da": {
    id: "collaboration-da",
    name: "Cross-Functional Collaboration",
    description: "Working with engineering, product, and business teams; understanding their data needs; communicating technical limitations",
    category: "collaboration",
    level: 0,
  },
};

export const DATA_ANALYST_CAREER_LADDER: CareerLevel[] = [
  {
    role: "Junior Data Analyst",
    track: "data-analysis",
    expectedProficiency: {
      "data-retrieval": 1,
      "data-analysis": 1,
      "data-tools": 1,
      "data-programming": 1,
      communication: 1,
      "domain-knowledge": 1,
    },
    description: "Entry-level analyst. Runs SQL queries, builds simple reports, learns the business context. Growing statistical and visualization skills.",
  },
  {
    role: "Data Analyst",
    track: "data-analysis",
    expectedProficiency: {
      "data-retrieval": 2,
      "data-analysis": 2,
      "data-tools": 2,
      "data-programming": 2,
      communication: 2,
      "domain-knowledge": 2,
    },
    description: "Independently analyzes data and produces reports/dashboards. Uses SQL and at least one analysis tool fluently. Understands the business.",
  },
  {
    role: "Senior Data Analyst",
    track: "data-analysis",
    expectedProficiency: {
      "data-retrieval": 3,
      "data-analysis": 3,
      "data-tools": 3,
      "data-programming": 2,
      communication: 3,
      "domain-knowledge": 3,
    },
    description: "Owns complex analysis projects. Builds impactful dashboards. Provides data-driven recommendations to leadership. Mentors juniors.",
  },
  {
    role: "Lead Data Analyst / Analytics Manager",
    track: "data-analysis",
    expectedProficiency: {
      "data-retrieval": 4,
      "data-analysis": 4,
      "data-tools": 4,
      "data-programming": 3,
      communication: 4,
      "domain-knowledge": 4,
    },
    description: "Leads analytics practice. Sets analytical standards. Drives data culture. Bridges data and business strategy. Manages analytics team.",
  },
];

// ─── 7. DevOps Engineer ───────────────────────────────────────────────────────

export const DEVOPS_ENGINEER_SKILLS: Record<string, Skill> = {
  "linux": {
    id: "linux",
    name: "Linux & Shell Scripting",
    description: "Comfortable with Linux administration; bash scripting; process management; file systems; permissions; networking commands",
    category: "os-infrastructure",
    level: 0,
  },
  "networking": {
    id: "networking",
    name: "Networking Fundamentals",
    description: "Understanding TCP/IP, DNS, HTTP/HTTPS, load balancing, firewalls, subnets, VLANs, VPNs; troubleshooting network issues",
    category: "os-infrastructure",
    level: 0,
  },
  "docker": {
    id: "docker",
    name: "Docker",
    description: "Writing Dockerfiles, multi-stage builds, docker-compose, image optimization, container networking, volume management",
    category: "containerization",
    level: 0,
  },
  "kubernetes": {
    id: "kubernetes",
    name: "Kubernetes",
    description: "Cluster architecture, pods, deployments, services, ingress, configmaps, secrets, Helm charts, troubleshooting, scaling",
    category: "containerization",
    level: 0,
  },
  "ci-cd-devops": {
    id: "ci-cd-devops",
    name: "CI/CD Pipeline Design",
    description: "Designing and maintaining CI/CD pipelines; GitHub Actions, GitLab CI, Jenkins, ArgoCD; automated testing, building, deployment",
    category: "ci-cd",
    level: 0,
  },
  "iac": {
    id: "iac",
    name: "Infrastructure as Code (Terraform)",
    description: "Writing Terraform configurations; managing state; modules; planning and applying changes; understanding drift",
    category: "ci-cd",
    level: 0,
  },
  "cloud-devops": {
    id: "cloud-devops",
    name: "Cloud Platforms (AWS/GCP/Azure)",
    description: "Deep knowledge of cloud services; compute, storage, networking, managed services; cloud architecture patterns; cost optimization",
    category: "cloud-platforms",
    level: 0,
  },
  "monitoring-devops": {
    id: "monitoring-devops",
    name: "Monitoring & Observability",
    description: "Setting up monitoring stacks (Prometheus, Grafana, ELK); alerting rules; log aggregation; distributed tracing; SLOs/SLIs",
    category: "observability",
    level: 0,
  },
  "security-devops": {
    id: "security-devops",
    name: "DevSecOps & Security",
    description: "Security scanning in CI/CD; secrets management (Vault); vulnerability management; compliance; security best practices for infrastructure",
    category: "security",
    level: 0,
  },
  "databases-devops": {
    id: "databases-devops",
    name: "Database Operations",
    description: "Database deployment, backups, replication, scaling, monitoring; managing RDS/Cloud SQL; understanding database performance",
    category: "databases",
    level: 0,
  },
  "incident-response": {
    id: "incident-response",
    name: "Incident Response & On-Call",
    description: "Handling production incidents; root cause analysis; post-mortems; on-call rotation; escalation procedures; reducing MTTR",
    category: "operations",
    level: 0,
  },
  "collaboration-devops": {
    id: "collaboration-devops",
    name: "Cross-Team Collaboration & Enablement",
    description: "Enabling dev teams with infrastructure and pipelines; documenting processes; mentoring; understanding developer needs",
    category: "collaboration",
    level: 0,
  },
};

export const DEVOPS_ENGINEER_CAREER_LADDER: CareerLevel[] = [
  {
    role: "Junior DevOps Engineer",
    track: "devops-engineering",
    expectedProficiency: {
      "os-infrastructure": 1,
      containerization: 1,
      "ci-cd": 1,
      "cloud-platforms": 1,
      observability: 1,
      collaboration: 1,
    },
    description: "Entry-level DevOps. Learns the infrastructure stack; assists with CI/CD and monitoring; growing Linux and cloud knowledge.",
  },
  {
    role: "DevOps Engineer",
    track: "devops-engineering",
    expectedProficiency: {
      "os-infrastructure": 2,
      containerization: 2,
      "ci-cd": 2,
      "cloud-platforms": 2,
      observability: 2,
      collaboration: 2,
    },
    description: "Independently manages infrastructure and pipelines. Containers and cloud fluently. Sets up monitoring. Supports dev teams.",
  },
  {
    role: "Senior DevOps Engineer",
    track: "devops-engineering",
    expectedProficiency: {
      "os-infrastructure": 3,
      containerization: 3,
      "ci-cd": 3,
      "cloud-platforms": 3,
      observability: 3,
      collaboration: 2,
    },
    description: "Owns infrastructure architecture. Designs scalable CI/CD. Implements DevSecOps. Handles incidents. Mentors juniors.",
  },
  {
    role: "Staff DevOps / Infrastructure Architect",
    track: "devops-engineering",
    expectedProficiency: {
      "os-infrastructure": 4,
      containerization: 4,
      "ci-cd": 4,
      "cloud-platforms": 4,
      observability: 4,
      collaboration: 3,
    },
    description: "Infrastructure technical leader. Designs organization-wide infrastructure strategy. Drives reliability and security. Influences engineering culture.",
  },
];

// ─── 8. Business Analyst ──────────────────────────────────────────────────────

export const BUSINESS_ANALYST_SKILLS: Record<string, Skill> = {
  "requirements-gathering": {
    id: "requirements-gathering",
    name: "Requirements Gathering & Elicitation",
    description: "Extracting requirements from stakeholders; interviewing, workshops, observation; distinguishing functional from non-functional requirements",
    category: "analysis",
    level: 0,
  },
  "process-modeling": {
    id: "process-modeling",
    name: "Process Modeling & Mapping",
    description: "Creating process maps, flowcharts, BPMN diagrams; identifying process inefficiencies; recommending improvements",
    category: "analysis",
    level: 0,
  },
  "user-stories": {
    id: "user-stories",
    name: "User Stories & Acceptance Criteria",
    description: "Writing clear, INVEST-compliant user stories; defining acceptance criteria; using Gherkin for BDD; managing backlog items",
    category: "analysis",
    level: 0,
  },
  "uml": {
    id: "uml",
    name: "UML & Diagramming",
    description: "Creating UML diagrams (use case, class, sequence, activity); visualizing system interactions and data flow",
    category: "analysis",
    level: 0,
  },
  "stakeholder-management": {
    id: "stakeholder-management",
    name: "Stakeholder Management",
    description: "Identifying stakeholders; managing expectations; communicating effectively with technical and non-technical stakeholders; building relationships",
    category: "stakeholder",
    level: 0,
  },
  "domain-knowledge-ba": {
    id: "domain-knowledge-ba",
    name: "Domain Knowledge & Business Acumen",
    description: "Understanding the business domain; industry terminology; competitive landscape; business models; regulatory context",
    category: "domain",
    level: 0,
  },
  "data-analysis-ba": {
    id: "data-analysis-ba",
    name: "Data Analysis for BA",
    description: "Using data to inform requirements; analyzing existing system data; SQL basics; understanding metrics and KPIs relevant to the domain",
    category: "analysis",
    level: 0,
  },
  "documentation-ba": {
    id: "documentation-ba",
    name: "Documentation & Specifications",
    description: "Writing clear business requirements documents (BRD), functional specifications, process documentation; maintaining living documentation",
    category: "communication",
    level: 0,
  },
  "agile-ba": {
    id: "agile-ba",
    name: "Agile & Scrum for BA",
    description: "Working effectively in agile teams; participating in ceremonies; managing product backlog; prioritizing requirements; collaborating with PO",
    category: "process",
    level: 0,
  },
  "testing-ba": {
    id: "testing-ba",
    name: "Acceptance Testing & UAT Coordination",
    description: "Coordinating user acceptance testing; writing test scenarios from requirements; validating that delivered solutions meet business needs",
    category: "process",
    level: 0,
  },
  "change-management": {
    id: "change-management",
    name: "Change Management & Impact Analysis",
    description: "Analyzing impact of proposed changes; identifying affected systems and stakeholders; supporting transition and adoption",
    category: "process",
    level: 0,
  },
  "tools-ba": {
    id: "tools-ba",
    name: "BA Tools (Jira, Confluence, BPMN)",
    description: "Using Jira for backlog management; Confluence for documentation; BPMN tools for process modeling; diagramming tools",
    category: "tools",
    level: 0,
  },
  "collaboration-ba-pro": {
    id: "collaboration-ba-pro",
    name: "Cross-Functional Collaboration",
    description: "Bridging business and technology; facilitating communication between stakeholders and development teams; translating between domains",
    category: "collaboration",
    level: 0,
  },
};

export const BUSINESS_ANALYST_CAREER_LADDER: CareerLevel[] = [
  {
    role: "Junior Business Analyst",
    track: "business-analysis",
    expectedProficiency: {
      analysis: 1,
      stakeholder: 1,
      domain: 1,
      communication: 1,
      process: 1,
      collaboration: 1,
    },
    description: "Entry-level BA. Assists with requirements gathering, documentation, and process mapping. Learning the domain and the SDLC.",
  },
  {
    role: "Business Analyst",
    track: "business-analysis",
    expectedProficiency: {
      analysis: 2,
      stakeholder: 2,
      domain: 2,
      communication: 2,
      process: 2,
      collaboration: 2,
    },
    description: "Independently gathers and analyzes requirements. Writes user stories and specifications. Facilitates stakeholder communication.",
  },
  {
    role: "Senior Business Analyst",
    track: "business-analysis",
    expectedProficiency: {
      analysis: 3,
      stakeholder: 3,
      domain: 3,
      communication: 3,
      process: 3,
      collaboration: 2,
    },
    description: "Owns complex requirement sets. Facilitates key workshops. Provides business analysis leadership. Deep domain expertise.",
  },
  {
    role: "Lead Business Analyst / BA Manager",
    track: "business-analysis",
    expectedProficiency: {
      analysis: 4,
      stakeholder: 4,
      domain: 4,
      communication: 4,
      process: 4,
      collaboration: 3,
    },
    description: "Leads BA practice. Sets analysis standards. Manages stakeholder relationships at executive level. Drives process improvement.",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** All software industry roles with their competency models */
export const SOFTWARE_ROLES: Record<string, {
  name: string;
  track: string;
  skills: Record<string, Skill>;
  careerLadder: CareerLevel[];
}> = {
  "software-engineer": {
    name: "Software Engineer",
    track: "software-engineering",
    skills: SOFTWARE_ENGINEER_SKILLS,
    careerLadder: SOFTWARE_ENGINEER_CAREER_LADDER,
  },
  "full-stack-engineer": {
    name: "Full-Stack Engineer",
    track: "full-stack-engineering",
    skills: FULL_STACK_ENGINEER_SKILLS,
    careerLadder: FULL_STACK_ENGINEER_CAREER_LADDER,
  },
  "frontend-engineer": {
    name: "Frontend Engineer",
    track: "frontend-engineering",
    skills: FRONTEND_ENGINEER_SKILLS,
    careerLadder: FRONTEND_ENGINEER_CAREER_LADDER,
  },
  "backend-engineer": {
    name: "Backend Engineer",
    track: "backend-engineering",
    skills: BACKEND_ENGINEER_SKILLS,
    careerLadder: BACKEND_ENGINEER_CAREER_LADDER,
  },
  "qa-engineer": {
    name: "QA Engineer",
    track: "qa-engineering",
    skills: QA_ENGINEER_SKILLS,
    careerLadder: QA_ENGINEER_CAREER_LADDER,
  },
  "data-analyst": {
    name: "Data Analyst",
    track: "data-analysis",
    skills: DATA_ANALYST_SKILLS,
    careerLadder: DATA_ANALYST_CAREER_LADDER,
  },
  "devops-engineer": {
    name: "DevOps Engineer",
    track: "devops-engineering",
    skills: DEVOPS_ENGINEER_SKILLS,
    careerLadder: DEVOPS_ENGINEER_CAREER_LADDER,
  },
  "business-analyst": {
    name: "Business Analyst",
    track: "business-analysis",
    skills: BUSINESS_ANALYST_SKILLS,
    careerLadder: BUSINESS_ANALYST_CAREER_LADDER,
  },
};

/** Get all skills for a role */
export function getRoleSkills(role: string): Record<string, Skill> | undefined {
  return SOFTWARE_ROLES[role]?.skills;
}

/** Get career ladder for a role */
export function getRoleCareerLadder(role: string): CareerLevel[] | undefined {
  return SOFTWARE_ROLES[role]?.careerLadder;
}

/** Get all available software roles */
export function getAllSoftwareRoles(): Array<{ role: string; name: string; track: string; skillCount: number }> {
  return Object.entries(SOFTWARE_ROLES).map(([role, data]) => ({
    role,
    name: data.name,
    track: data.track,
    skillCount: Object.keys(data.skills).length,
  }));
}

/** Get all skill IDs for a role */
export function getRoleSkillIds(role: string): string[] {
  return Object.keys(SOFTWARE_ROLES[role]?.skills || {});
}
