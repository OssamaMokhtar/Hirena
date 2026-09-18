import type { Skill, CompetencyArea, ProficiencyLevel, CareerLadderStep } from "@/types";

/**
 * Software Architect Competency Model
 * Covers system architecture, design patterns, technology selection, scalability,
 * distributed systems, and technical strategy.
 * 25 skills across 6 competency areas.
 */

export const SKILLS: Record<string, Skill> = {
  // ── System Architecture ──────────────────────────────────────────────────
  "architecture-fundamentals": {
    id: "architecture-fundamentals",
    name: "Architecture Fundamentals",
    description: "Understanding of architectural concepts: monolithic vs distributed, layered architecture, microservices, event-driven, SOA, serverless. Knows architectural trade-offs (consistency vs availability, latency vs throughput, complexity vs simplicity). Can articulate why a particular architecture was chosen and what alternatives were considered. — Core requirement for architect roles; heavily assessed in system design interviews on LinkedIn, Indeed, Glassdoor.",
    category: "architecture",
    level: 0,
  },
  "architectural-patterns": {
    id: "architectural-patterns",
    name: "Architectural Patterns & Styles",
    description: "Knowledge of architectural patterns: MVC, MVVM, repository, factory, strategy, observer, decorator, adapter, facade, mediator, chain of responsibility, CQRS, event sourcing, saga, API gateway, backend for frontend (BFF). Can apply the right pattern to the right problem and explain the benefits and trade-offs. — Common in architect and senior engineer job descriptions.",
    category: "architecture",
    level: 0,
  },
  "distributed-systems": {
    id: "distributed-systems",
    name: "Distributed Systems Design",
    description: "Designing and understanding distributed systems: consistency models (strong, eventual, causal), replication, partitioning/sharding, consensus (Paxos, Raft), distributed transactions (2PC, saga), distributed caching, message queues, service discovery, distributed tracing, and handling partial failures. — Critical for senior/architect roles; common in distributed systems interviews.",
    category: "architecture",
    level: 0,
  },
  "scalability-design": {
    id: "scalability-design",
    name: "Scalability & Performance Architecture",
    description: "Designing systems that scale: horizontal vs vertical scaling, load balancing, caching strategies (application, database, CDN, distributed), stateless design, database scaling (read replicas, sharding, partitioning), async processing, rate limiting, and capacity planning. Can design for expected and unexpected load. — Essential for architect and senior backend roles.",
    category: "architecture",
    level: 0,
  },
  "reliability-resilience": {
    id: "reliability-resilience",
    name: "Reliability & Resilience Engineering",
    description: "Building reliable and resilient systems: redundancy, failover, circuit breakers, bulkheads, retries with exponential backoff, idempotency, graceful degradation, chaos engineering, disaster recovery planning, RTO/RPO, and designing for failure. — Important for architect, SRE, and senior backend roles.",
    category: "architecture",
    level: 0,
  },

  // ── Design & Code Quality ────────────────────────────────────────────────
  "design-patterns": {
    id: "design-patterns",
    name: "Design Patterns (GoF & Beyond)",
    description: "Understanding and applying design patterns: creational (factory, builder, singleton, prototype, abstract factory), structural (adapter, bridge, composite, decorator, facade, flyweight, proxy), behavioral (chain of responsibility, command, iterator, mediator, memento, observer, state, strategy, template method, visitor). Knows when to use each and when NOT to. — Common requirement for senior and architect roles.",
    category: "design",
    level: 0,
  },
  "clean-code-principles": {
    id: "clean-code-principles",
    name: "Clean Code & Implementation Principles",
    description: "Writing code that is clean, readable, and maintainable. Understands SOLID principles, DRY, KISS, YAGNI, Law of Demeter, separation of concerns, and other implementation principles. Can refactor code toward cleaner designs. Conducts code reviews with a focus on design quality. — Universal requirement across all software roles on LinkedIn, Indeed, Glassdoor.",
    category: "design",
    level: 0,
  },
  "code-review-architecture": {
    id: "code-review-architecture",
    name: "Code Review for Architecture & Quality",
    description: "Reviewing code not just for correctness but for architectural consistency, design quality, maintainability, performance implications, security, and adherence to standards. Can provide constructive, actionable feedback that improves the codebase over time. — Expected for senior, lead, and architect roles.",
    category: "design",
    level: 0,
  },
  "api-architecture": {
    id: "api-architecture",
    name: "API Architecture & Design",
    description: "Designing APIs at the architectural level: REST, GraphQL, gRPC, and when to use each. Understanding API versioning, backward compatibility, idempotency, pagination, filtering, rate limiting, API gateways, and API documentation (OpenAPI/Swagger). Designs APIs that are consistent, evolvable, and appropriate for their consumers. — Core requirement for backend, platform, and architect roles.",
    category: "design",
    level: 0,
  },

  // ── Technology Strategy ──────────────────────────────────────────────────
  "technology-selection": {
    id: "technology-selection",
    name: "Technology Selection & Evaluation",
    description: "Evaluating and selecting technologies: understanding requirements, assessing options against criteria (maturity, community, hiring market, licensing, performance, ecosystem, long-term viability), prototyping and proof-of-concepts, and making informed recommendations. Can justify technology choices with evidence and reasoning. — Critical skill for architect and senior/lead roles.",
    category: "strategy",
    level: 0,
  },
  "build-vs-buy": {
    id: "build-vs-buy",
    name: "Build vs Buy Analysis",
    description: "Analyzing whether to build a solution in-house or buy/use a third-party service. Factors: cost (total cost of ownership), time to market, control, differentiation, maintenance burden, vendor lock-in, integration complexity, compliance, and strategic importance. Can build a business case for either approach. — Common in architect, tech lead, and engineering management roles.",
    category: "strategy",
    level: 0,
  },
  "technical-debt-strategy": {
    id: "technical-debt-strategy",
    name: "Technical Debt Management & Strategy",
    description: "Identifying, assessing, prioritizing, and managing technical debt. Understands different types of debt (deliberate vs inadvertent, prudent vs reckless), can quantify the impact of debt, build the business case for addressing it, and balance feature work with debt reduction. Can develop a debt repayment strategy. — Important for senior, lead, architect, and engineering management roles.",
    category: "strategy",
    level: 0,
  },
  "technical-roadmap": {
    id: "technical-roadmap",
    name: "Technical Roadmap & Strategy",
    description: "Developing and communicating technical strategy: aligning technology decisions with business goals, creating technical roadmaps, planning architectural runway, managing technical risk, and communicating technical vision to both technical and non-technical stakeholders. — Required for architect, CTO, VP Engineering, and senior leadership roles.",
    category: "strategy",
    level: 0,
  },

  // ── Data & Storage Architecture ──────────────────────────────────────────
  "data-storage-architecture": {
    id: "data-storage-architecture",
    name: "Data Storage Architecture & Selection",
    description: "Choosing and designing data storage solutions: relational databases, NoSQL (document, key-value, column-family, graph), data warehouses, data lakes, search engines, caches, and when to use each. Understands trade-offs in consistency, availability, partition tolerance, query patterns, and scale. Can design data storage that meets application requirements. — Core for architect, backend, and data engineering roles.",
    category: "data",
    level: 0,
  },
  "database-architecture": {
    id: "database-architecture",
    name: "Database Architecture & Optimization",
    description: "Architecting database solutions: schema design, indexing strategy, query optimization, partitioning/sharding, replication, connection pooling, read/write splitting, and database performance tuning. Can design database architectures that scale and perform well under load. — Important for backend, architect, and data engineering roles.",
    category: "data",
    level: 0,
  },
  "caching-architecture": {
    id: "caching-architecture",
    name: "Caching Strategy & Architecture",
    description: "Designing caching architectures: what to cache, cache placement (client, CDN, application, database query cache, distributed cache), cache invalidation strategies, cache consistency, cache stampede prevention, and choosing the right caching technology (Redis, Memcached, in-memory, etc.). — Common in backend, architect, and performance-focused roles.",
    category: "data",
    level: 0,
  },
  "messaging-architecture": {
    id: "messaging-architecture",
    name: "Messaging & Event-Driven Architecture",
    description: "Designing messaging and event-driven systems: message queues (RabbitMQ, SQS), event streaming (Kafka, Kinesis), event-driven patterns (pub/sub, event sourcing, CQRS), message formatting (JSON, Protobuf, Avro), and integration patterns. Understands when async messaging is appropriate and the trade-offs. — Growing requirement in modern architectures.",
    category: "data",
    level: 0,
  },

  // ── Security Architecture ────────────────────────────────────────────────
  "security-architecture": {
    id: "security-architecture",
    name: "Security Architecture & Threat Modeling",
    description: "Designing secure systems: threat modeling (STRIDE, attack trees), security principles (least privilege, defense in depth, zero trust), authentication and authorization architecture, encryption at rest and in transit, secrets management, secure communication, and security monitoring. Can identify security risks in architecture and design mitigations. — Increasingly required for architect and senior roles.",
    category: "security",
    level: 0,
  },
  "identity-access-architecture": {
    id: "identity-access-architecture",
    name: "Identity & Access Management Architecture",
    description: "Designing identity and access management: authentication protocols (OAuth 2.0, OpenID Connect, SAML, JWT), authorization models (RBAC, ABAC, PBAC), SSO, federation, identity providers, and access control architecture. Understands security implications of identity design. — Important for architect, backend, and security roles.",
    category: "security",
    level: 0,
  },

  // ── Cloud & Infrastructure Architecture ──────────────────────────────────
  "cloud-architecture": {
    id: "cloud-architecture",
    name: "Cloud Architecture & Services",
    description: "Designing cloud-native architectures: understanding cloud provider services (compute, storage, networking, databases, serverless, managed services), cloud design patterns, multi-cloud and hybrid considerations, cloud cost architecture, and cloud security model (shared responsibility). Can design solutions that leverage cloud capabilities effectively. — Core requirement for cloud architect and modern software architect roles.",
    category: "cloud",
    level: 0,
  },
  "container-architecture": {
    id: "container-architecture",
    name: "Containerization & Orchestration Architecture",
    description: "Architecting containerized systems: Docker, container lifecycle, image design, container networking and storage, Kubernetes architecture (pods, deployments, services, ingress, configmaps, secrets, HPA, RBAC), Helm, and container security. Can design systems that run effectively on containers and orchestration platforms. — Required for architect, platform, and DevOps roles.",
    category: "cloud",
    level: 0,
  },
  "infrastructure-automation-architecture": {
    id: "infrastructure-automation-architecture",
    name: "Infrastructure as Code & Automation Architecture",
    description: "Designing infrastructure automation: Terraform, CloudFormation, Pulumi, CDK, and other IaC tools. Understands infrastructure modularity, state management, versioning, testing infrastructure code, and integrating infrastructure changes into CI/CD. Can design infrastructure that is reproducible, reviewable, and automated. — Important for architect, DevOps, and platform roles.",
    category: "cloud",
    level: 0,
  },

  // ── Leadership & Communication ───────────────────────────────────────────
  "technical-decision-making": {
    id: "technical-decision-making",
    name: "Technical Decision Making & Documentation",
    description: "Making sound technical decisions: gathering requirements, evaluating alternatives, considering trade-offs, consulting stakeholders, documenting decisions (ADRs - Architecture Decision Records), and being willing to revisit decisions when new information emerges. Can defend decisions with clear reasoning. — Essential for architect, tech lead, and senior roles.",
    category: "leadership",
    level: 0,
  },
  "technical-mentoring": {
    id: "technical-mentoring",
    name: "Technical Mentoring & Knowledge Sharing",
    description: "Mentoring engineers: providing guidance, sharing knowledge, helping others grow technically, giving constructive feedback, identifying development opportunities, and creating a culture of learning. Can explain complex technical concepts clearly. — Valued in senior, lead, architect, and manager roles.",
    category: "leadership",
    level: 0,
  },
  "stakeholder-communication": {
    id: "stakeholder-communication",
    name: "Stakeholder Communication & Influence",
    description: "Communicating technical concepts to non-technical stakeholders: explaining architecture, trade-offs, risks, and technical strategy in accessible terms. Building consensus, managing expectations, and influencing decisions without authority. Can translate between technical and business languages. — Critical for architect, tech lead, and leadership roles.",
    category: "leadership",
    level: 0,
  },
  "architecture-governance": {
    id: "architecture-governance",
    name: "Architecture Governance & Standards",
    description: "Establishing and maintaining architecture standards, guidelines, and review processes. Ensuring architectural consistency across teams and projects. Conducting architecture reviews, providing guidance, and balancing standardization with flexibility. Can create and evolve an architecture practice. — Required for architect and senior leadership roles.",
    category: "leadership",
    level: 0,
  },
};

export const COMPETENCY_AREAS: CompetencyArea[] = [
  {
    id: "architecture",
    name: "System Architecture",
    description: "Designing scalable, reliable, distributed systems and making sound architectural decisions.",
    skills: ["architecture-fundamentals", "architectural-patterns", "distributed-systems", "scalability-design", "reliability-resilience"],
    weight: 30,
  },
  {
    id: "design",
    name: "Design & Code Quality",
    description: "Applying design patterns, clean code principles, and architectural quality in implementation.",
    skills: ["design-patterns", "clean-code-principles", "code-review-architecture", "api-architecture"],
    weight: 18,
  },
  {
    id: "strategy",
    name: "Technology Strategy",
    description: "Selecting technologies, analyzing build-vs-buy, managing technical debt, and setting technical direction.",
    skills: ["technology-selection", "build-vs-buy", "technical-debt-strategy", "technical-roadmap"],
    weight: 18,
  },
  {
    id: "data",
    name: "Data & Storage Architecture",
    description: "Designing data storage, caching, and messaging architectures for the application's needs.",
    skills: ["data-storage-architecture", "database-architecture", "caching-architecture", "messaging-architecture"],
    weight: 16,
  },
  {
    id: "security",
    name: "Security Architecture",
    description: "Building security into the architecture through threat modeling, identity management, and secure design.",
    skills: ["security-architecture", "identity-access-architecture"],
    weight: 10,
  },
  {
    id: "cloud",
    name: "Cloud & Infrastructure Architecture",
    description: "Leveraging cloud services, containers, and infrastructure automation in architectural design.",
    skills: ["cloud-architecture", "container-architecture", "infrastructure-automation-architecture"],
    weight: 14,
  },
  {
    id: "leadership",
    name: "Technical Leadership",
    description: "Making technical decisions, mentoring teams, communicating with stakeholders, and governing architecture.",
    skills: ["technical-decision-making", "technical-mentoring", "stakeholder-communication", "architecture-governance"],
    weight: 16,
  },
];

export const LEVELS: ProficiencyLevel[] = [0, 1, 2, 3, 4, 5, 6, 7];

export const CAREER_LADDER: CareerLadderStep[] = [
  {
    title: "Junior Software Architect",
    minLevel: 4,
    typicalYearsOfExperience: "5-7 years",
    description: "Entry-level architect. Contributes to architectural decisions under guidance, designs components, and learns architectural patterns and trade-offs. Works alongside senior architects.",
  },
  {
    title: "Software Architect",
    minLevel: 5,
    typicalYearsOfExperience: "7-10 years",
    description: "Core architect role. Designs systems, makes architectural decisions, evaluates technologies, and guides implementation. Has deep expertise in one or more domains and can architect solutions independently.",
  },
  {
    title: "Senior Software Architect",
    minLevel: 6,
    typicalYearsOfExperience: "10-15 years",
    description: "Senior architect. Architects complex, large-scale systems, sets architectural direction for major initiatives, mentors other architects and engineers, and ensures architectural quality across multiple teams or products.",
  },
  {
    title: "Principal Architect",
    minLevel: 6,
    typicalYearsOfExperience: "12+ years",
    description: "Principal-level architect. Sets architectural vision across the organization, defines architecture standards and practices, evaluates strategic technology choices, and is the go-to expert for the most complex architectural challenges.",
  },
  {
    title: "Chief Architect / Enterprise Architect",
    minLevel: 5,
    typicalYearsOfExperience: "12+ years",
    description: "Organization-wide architect. Defines enterprise architecture, aligns technology strategy with business strategy, manages architecture governance, and ensures consistency and quality across all technology initiatives.",
  },
  {
    title: "CTO / VP of Engineering",
    minLevel: 4,
    typicalYearsOfExperience: "15+ years",
    description: "Executive technology leadership. Sets overall technology strategy and vision, manages engineering organization, makes strategic build-vs-buy and technology portfolio decisions, and aligns technology with business objectives at the highest level.",
  },
];

export const SKILL_COUNT = Object.keys(SKILLS).length;
export const PILLAR_COUNT = COMPETENCY_AREAS.length;
