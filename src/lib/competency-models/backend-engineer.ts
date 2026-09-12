import type { Skill, ProficiencyLevel, CompetencyArea, CareerLadderStep } from '@/types';

export const SKILLS: Record<string, Skill> = {
  // Programming languages
  'language-proficiency-typescript': {
    id: 'language-proficiency-typescript', name: 'TypeScript/JavaScript (Node.js)',
    description: 'Advanced Node.js: event loop, streams, buffers, clusters, Worker Threads. TypeScript for backend: types, generics, async/await, error handling, Node.js ecosystem.',
    category: 'programming-languages', level: 0,
  },
  'language-proficiency-go': {
    id: 'language-proficiency-go', name: 'Go',
    description: 'Go concurrency (goroutines, channels, sync package), interfaces, error handling, context package, testing (table-driven), standard library, Go tooling (go fmt, go test, go mod).',
    category: 'programming-languages', level: 0,
  },
  'language-proficiency-python': {
    id: 'language-proficiency-python', name: 'Python',
    description: 'Python for backend: async/await, decorators, generators, context managers, type hints, major libraries (FastAPI, Django, SQLAlchemy, requests), Pythonic idioms.',
    category: 'programming-languages', level: 0,
  },
  'language-proficiency-java': {
    id: 'language-proficiency-java', name: 'Java',
    description: 'Java backend: Spring Boot, JPA/Hibernate, streams, concurrency (threads, executors, locks), JVM tuning basics, testing (JUnit, Mockito), build tools (Maven/Gradle).',
    category: 'programming-languages', level: 0,
  },
  // Databases
  'sql-advanced': {
    id: 'sql-advanced', name: 'Advanced SQL',
    description: 'Complex queries: JOINs, subqueries, CTEs, window functions, query optimization (EXPLAIN), indexing strategies, transactions, isolation levels, stored procedures.',
    category: 'databases', level: 0,
  },
  'database-design': {
    id: 'database-design', name: 'Database Design',
    description: 'Schema design: normalization, denormalization trade-offs, foreign keys, constraints, indexing strategy, partitioning, sharding concepts, data modeling for read/write patterns.',
    category: 'databases', level: 0,
  },
  'nosql-databases': {
    id: 'nosql-databases', name: 'NoSQL Databases',
    description: 'NoSQL types: document (MongoDB), key-value (Redis), column-family (Cassandra), graph (Neo4j). Choosing the right DB. CAP theorem. Consistency models.',
    category: 'databases', level: 0,
  },
  'database-performance': {
    id: 'database-performance', name: 'Database Performance',
    description: 'Query optimization, index tuning, connection pooling, read replicas, caching strategies (application-level, Redis), N+1 query problem, slow query analysis.',
    category: 'databases', level: 0,
  },
  // APIs
  'rest-api-design': {
    id: 'rest-api-design', name: 'REST API Design',
    description: 'RESTful design: resources, HTTP methods, status codes, versioning, pagination, filtering, sorting, HATEOAS basics, API design best practices, OpenAPI/Swagger.',
    category: 'apis', level: 0,
  },
  'graphql-basics': {
    id: 'graphql-basics', name: 'GraphQL Basics',
    description: 'GraphQL schema design, queries, mutations, subscriptions, resolvers, nesting, N+1 problem (DataLoader), authentication/authorization in GraphQL, tooling (Apollo, GraphQL Code Generator).',
    category: 'apis', level: 0,
  },
  'api-security': {
    id: 'api-security', name: 'API Security',
    description: 'Authentication (JWT, OAuth 2.0, API keys), authorization (RBAC, ABAC), rate limiting, input validation, SQL injection prevention, CORS, API gateway concepts.',
    category: 'apis', level: 0,
  },
  'api-versioning-evolution': {
    id: 'api-versioning-evolution', name: 'API Versioning & Evolution',
    description: 'Versioning strategies (URL, header, query param), backward/forward compatibility, deprecation policies, contract testing, API evolution without breaking clients.',
    category: 'apis', level: 0,
  },
  // Testing
  'backend-testing': {
    id: 'backend-testing', name: 'Backend Testing',
    description: 'Unit testing backend code, integration testing (DB, external services), contract testing, test containers, mocking external dependencies, end-to-end API testing.',
    category: 'testing', level: 0,
  },
  'testing-strategy-backend': {
    id: 'testing-strategy-backend', name: 'Backend Testing Strategy',
    description: 'Test pyramid for backend, what to test at each level, integration vs unit test balance, testing database interactions, testing async code, flaky test management.',
    category: 'testing', level: 0,
  },
  // Infrastructure & DevOps
  'docker-containers': {
    id: 'docker-containers', name: 'Docker & Containers',
    description: 'Docker: images, containers, Dockerfile best practices (multi-stage builds, minimal images), Docker Compose, container networking, volumes, managing container lifecycles.',
    category: 'infrastructure-devops', level: 0,
  },
  'kubernetes-basics': {
    id: 'kubernetes-basics', name: 'Kubernetes Basics',
    description: 'K8s fundamentals: pods, deployments, services, configmaps, secrets, ingress, basic kubectl, pod scheduling, resource limits/requests, health checks (liveness/readiness).',
    category: 'infrastructure-devops', level: 0,
  },
  'ci-cd-pipelines': {
    id: 'ci-cd-pipelines', name: 'CI/CD Pipelines',
    description: 'CI/CD concepts: automated testing, building, deployment. GitHub Actions, GitLab CI, or similar. Pipeline design: stages, caching, artifacts, deployment strategies (blue-green, canary).',
    category: 'infrastructure-devops', level: 0,
  },
  'cloud-fundamentals': {
    id: 'cloud-fundamentals', name: 'Cloud Fundamentals',
    description: 'Cloud concepts: IaaS/PaaS/SaaS, compute (EC2, Lambda), storage (S3, EBS), networking (VPC, load balancers), managed services (RDS, ElastiCache), cloud security basics.',
    category: 'infrastructure-devops', level: 0,
  },
  'infrastructure-as-code': {
    id: 'infrastructure-as-code', name: 'Infrastructure as Code',
    description: 'IaC concepts: Terraform, CloudFormation, or Pulumi. Defining infrastructure declaratively, state management, modules, drift detection, best practices.',
    category: 'infrastructure-devops', level: 0,
  },
  // Security
  'app-security-fundamentals': {
    id: 'app-security-fundamentals', name: 'Application Security Fundamentals',
    description: 'OWASP Top 10, common vulnerabilities (XSS, CSRF, SQL injection, SSRF, path traversal), secure coding practices, input validation, output encoding, security logging.',
    category: 'security', level: 0,
  },
  'authn-authz-systems': {
    id: 'authn-authz-systems', name: 'AuthN/AuthZ Systems',
    description: 'Authentication systems: sessions, JWT, OAuth 2.0, OIDC, SAML, MFA. Authorization: RBAC, ABAC, policy engines (OPA). Secure token handling, password storage (bcrypt, Argon2).',
    category: 'security', level: 0,
  },
  'encryption-cryptography-basics': {
    id: 'encryption-cryptography-basics', name: 'Encryption & Cryptography Basics',
    description: 'Symmetric vs asymmetric encryption, hashing (SHA-256, bcrypt), digital signatures, TLS/SSL, certificate management, encrypting data at rest and in transit, key management basics.',
    category: 'security', level: 0,
  },
  // System design
  'architectural-patterns': {
    id: 'architectural-patterns', name: 'Architectural Patterns',
    description: 'Monolith vs microservices, service-oriented architecture, event-driven architecture, CQRS, event sourcing, serverless, architectural trade-offs and decision-making.',
    category: 'system-design', level: 0,
  },
  'scalable-system-design': {
    id: 'scalable-system-design', name: 'Scalable System Design',
    description: 'Designing for scale: horizontal vs vertical scaling, load balancing, caching strategies, database scaling (read replicas, sharding), message queues (Kafka, RabbitMQ), rate limiting.',
    category: 'system-design', level: 0,
  },
  'distributed-systems-concepts': {
    id: 'distributed-systems-concepts', name: 'Distributed Systems Concepts',
    description: 'CAP theorem, consistency models (strong, eventual), distributed transactions (2PC, saga pattern), consensus (Raft, Paxos basics), service discovery, distributed tracing.',
    category: 'system-design', level: 0,
  },
  // Performance
  'performance-profiling-backend': {
    id: 'performance-profiling-backend', name: 'Performance Profiling',
    description: 'Profiling backend applications: CPU profiling, memory profiling, flame graphs, identifying bottlenecks, latency analysis, APM tools (Datadog, New Relic, OpenTelemetry).',
    category: 'performance', level: 0,
  },
  'caching-strategies': {
    id: 'caching-strategies', name: 'Caching Strategies',
    description: 'Caching patterns: cache-aside, write-through, write-back, cache invalidation strategies, CDN caching, database query caching, Redis/Memcached, cache stampede prevention.',
    category: 'performance', level: 0,
  },
  // Collaboration
  'backend-communication': {
    id: 'backend-communication', name: 'Technical Communication',
    description: 'Writing design docs, explaining technical decisions, API documentation (OpenAPI), writing clear PR descriptions, documenting architectural decisions (ADRs).',
    category: 'collaboration', level: 0,
  },
  'backend-code-review': {
    id: 'backend-code-review', name: 'Backend Code Review',
    description: 'Reviewing backend code: correctness, performance, security, testing, error handling, database queries. Giving constructive feedback. Reviewing for edge cases.',
    category: 'collaboration', level: 0,
  },
};

export const COMPETENCY_AREAS: CompetencyArea[] = [
  { id: 'programming-languages', name: 'Programming Languages', description: 'Proficiency in backend languages (Node.js, Go, Python, Java)', skills: ['language-proficiency-typescript', 'language-proficiency-go', 'language-proficiency-python', 'language-proficiency-java'], weight: 16 },
  { id: 'databases', name: 'Databases', description: 'SQL, NoSQL, database design, performance tuning', skills: ['sql-advanced', 'database-design', 'nosql-databases', 'database-performance'], weight: 18 },
  { id: 'apis', name: 'APIs', description: 'REST, GraphQL, API security, versioning, evolution', skills: ['rest-api-design', 'graphql-basics', 'api-security', 'api-versioning-evolution'], weight: 16 },
  { id: 'testing', name: 'Testing', description: 'Backend testing: unit, integration, contract, E2E, test strategy', skills: ['backend-testing', 'testing-strategy-backend'], weight: 10 },
  { id: 'infrastructure-devops', name: 'Infrastructure & DevOps', description: 'Docker, Kubernetes, CI/CD, cloud, IaC', skills: ['docker-containers', 'kubernetes-basics', 'ci-cd-pipelines', 'cloud-fundamentals', 'infrastructure-as-code'], weight: 14 },
  { id: 'security', name: 'Security', description: 'App security, authn/authz, encryption, OWASP Top 10', skills: ['app-security-fundamentals', 'authn-authz-systems', 'encryption-cryptography-basics'], weight: 12 },
  { id: 'system-design', name: 'System Design', description: 'Architecture patterns, scalable design, distributed systems', skills: ['architectural-patterns', 'scalable-system-design', 'distributed-systems-concepts'], weight: 12 },
  { id: 'performance', name: 'Performance', description: 'Profiling, caching strategies, optimization', skills: ['performance-profiling-backend', 'caching-strategies'], weight: 2 },
  { id: 'collaboration', name: 'Collaboration', description: 'Technical communication, code review, teamwork', skills: ['backend-communication', 'backend-code-review'], weight: 0 },
];

export const LEVELS: ProficiencyLevel[] = [0, 1, 2, 3, 4, 5, 6, 7];

export const CAREER_LADDER: CareerLadderStep[] = [
  { title: 'Junior Backend Engineer', minLevel: 0, expected: { 'programming-languages': 1, 'databases': 1, apis: 1, testing: 1, 'infrastructure-devops': 1, security: 1, 'system-design': 1, performance: 0, collaboration: 1 }, description: 'Entry-level. Building API endpoints under guidance. Learning database basics. Writing simple tests. Focusing on clean code and fundamentals.' },
  { title: 'Backend Engineer', minLevel: 2, expected: { 'programming-languages': 2, 'databases': 2, apis: 2, testing: 2, 'infrastructure-devops': 2, security: 2, 'system-design': 2, performance: 1, collaboration: 2 }, description: 'Core role. Building features independently. Writing API endpoints with tests. Understanding database design. Basic security awareness.' },
  { title: 'Senior Backend Engineer', minLevel: 3, expected: { 'programming-languages': 3, 'databases': 3, apis: 3, testing: 3, 'infrastructure-devops': 3, security: 3, 'system-design': 3, performance: 2, collaboration: 3 }, description: 'Operates independently. Designs complex APIs. Optimizes database queries. Implements security best practices. Mentors juniors. Contributes to system design.' },
  { title: 'Lead Backend Engineer', minLevel: 4, expected: { 'programming-languages': 3, 'databases': 4, apis: 4, testing: 3, 'infrastructure-devops': 4, security: 3, 'system-design': 4, performance: 3, collaboration: 4 }, description: 'Technical leader for backend. Sets patterns and standards. Drives API design. Makes architectural decisions. Balances tech with mentorship.' },
  { title: 'Principal Backend Engineer', minLevel: 5, expected: { 'programming-languages': 4, 'databases': 5, apis: 5, testing: 4, 'infrastructure-devops': 5, security: 4, 'system-design': 5, performance: 4, collaboration: 5 }, description: 'Senior technical leader across multiple teams. Sets backend architecture. Drives technical strategy. Recognized expert in distributed systems and scalability.' },
  { title: 'Backend Architect', minLevel: 5, expected: { 'programming-languages': 4, 'databases': 5, apis: 5, testing: 4, 'infrastructure-devops': 5, security: 5, 'system-design': 5, performance: 5, collaboration: 5 }, description: 'Architect for backend systems. Evaluates technology choices. Sets long-term direction. Designs for scale and reliability. Balances technical excellence with business needs.' },
  { title: 'Backend Engineering Manager', minLevel: 5, expected: { 'programming-languages': 3, 'databases': 3, apis: 3, testing: 2, 'infrastructure-devops': 3, security: 2, 'system-design': 3, performance: 3, collaboration: 5 }, description: 'People manager for backend team. Hires, develops, manages engineers. Balances people leadership with technical guidance.' },
  { title: 'Director of Backend', minLevel: 6, expected: { 'programming-languages': 2, 'databases': 3, apis: 2, testing: 2, 'infrastructure-devops': 3, security: 2, 'system-design': 3, performance: 3, collaboration: 6 }, description: 'Leads multiple backend teams. Sets backend strategy. Manages managers. Focus on organizational effectiveness, quality, and reliability.' },
];

export const SKILL_COUNT = Object.keys(SKILLS).length;
export const PILLAR_COUNT = COMPETENCY_AREAS.length;
