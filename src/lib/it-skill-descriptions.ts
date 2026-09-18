/**
 * Hirena — IT Industry Skills Registry
 *
 * Comprehensive skill descriptions for IT industry roles, sourced from
 * common hiring platform patterns (LinkedIn, Indeed, Glassdoor) and
 * industry frameworks (SFIA, O*NET, SkillsFuture). These descriptions
 * represent what hiring managers look for across the IT sector.
 *
 * This module provides the SKILL_DESCRIPTIONS map used to enrich
 * competency models with real-world, hiring-platform-aligned descriptions.
 */

/**
 * IT Industry Skill Descriptions
 * Keyed by skill ID, valued by a comprehensive description that captures
 * what hiring platforms and employers look for.
 */
export const IT_SKILL_DESCRIPTIONS: Record<string, string> = {
  // ── Software Engineering Core ───────────────────────────────────────────
  "programming-languages": "Ability to write clean, maintainable, efficient code in one or more mainstream programming languages (Java, Python, JavaScript/TypeScript, Go, C#, C++, Ruby, PHP, Swift, Kotlin). Understands language idioms, standard libraries, memory management, concurrency models, and ecosystem tooling. Writes tests, handles errors gracefully, and follows language-specific best practices. — LinkedIn/Indeed/Glassdoor common requirement across all software roles.",

  "algorithms-data-structures": "Solid understanding of fundamental data structures (arrays, linked lists, stacks, queues, hash maps, trees, graphs, heaps, tries) and algorithms (sorting, searching, recursion, dynamic programming, graph traversal, greedy algorithms). Applies these to solve real problems efficiently. Understands time/space complexity (Big O). — Common in technical interviews and coding assessments on all major hiring platforms.",

  "system-design": "Ability to design scalable, reliable, and maintainable systems. Understands architectural patterns (monolith, microservices, event-driven, serverless, layered), trade-offs (consistency vs availability, latency vs throughput, complexity vs simplicity), and how to decompose systems into components. Can articulate architectural decisions and justify trade-offs. — Critical for senior+ roles; heavily assessed in system design interviews (LinkedIn, Indeed, Glassdoor senior engineer roles).",

  "version-control": "Proficiency with Git and distributed version control: branching strategies (GitFlow, trunk-based, fork-based), rebasing, merging, resolving conflicts, code review workflows, commit hygiene, tagging, and repository management. Understands CI/CD integration with version control. — Ubiquitous requirement across all IT roles on LinkedIn, Indeed, Glassdoor.",

  "testing": "Writing and maintaining tests: unit tests, integration tests, end-to-end tests, property-based testing. Understands testing pyramid, test-driven development (TDD), behavior-driven development (BDD), mock/stub/fake strategies, test coverage, and testing frameworks (JUnit, pytest, Jest, RSpec, etc.). Values testability in design. — Universal requirement in IT job postings.",

  "debugging-troubleshooting": "Systematic approach to finding and fixing bugs: reading logs, using debuggers, profiling, reproducing issues, root cause analysis, understanding stack traces, and using observability tools. Can diagnose production issues under pressure. — Common competency in IT job descriptions, especially for senior and on-call roles.",

  "code-quality": "Writing code that is clean, readable, maintainable, and well-structured. Understands principles like DRY, KISS, SOLID, and design patterns. Conducts and participates in code reviews. Refactors legacy code. Values documentation and self-documenting code. — Standard expectation across all IT roles on hiring platforms.",

  "development-tools": "Proficiency with the tools of the trade: IDEs (VS Code, IntelliJ, GoLand, etc.), build tools (Maven, Gradle, npm, pip, go build), package managers, linters, formatters, debuggers, profilers, and IDE extensions. Efficiently navigates and customizes the development environment. — Expected in virtually all IT job postings.",

  // ── Engineering Practices ───────────────────────────────────────────────
  "agile-scrum": "Experience working in agile teams: sprint planning, daily standups, retrospectives, backlog grooming, user story writing, estimation (story points, planning poker), iterative delivery, and continuous improvement. Understands agile principles and can adapt practices to the team's context. — Standard requirement across IT roles; Scrum Master and Product Owner certifications valued.",

  "ci-cd": "Understanding and using CI/CD pipelines: automated building, testing, linting, and deployment. Works with tools like GitHub Actions, GitLab CI, Jenkins, CircleCI, Travis CI, ArgoCD, etc. Understands pipeline-as-code, secrets management in pipelines, deployment strategies (blue-green, canary, rolling), and pipeline monitoring. — Increasingly common requirement across all software roles.",

  "devops-awareness": "Understanding of DevOps principles and practices: collaboration between dev and ops, infrastructure as code, monitoring and observability, incident response, blameless postmortems, and the DevOps lifecycle. Can work effectively with DevOps/SRE teams. — Growing requirement, especially in cloud-native and startup environments.",

  "security-awareness": "Awareness of security principles in software development: OWASP Top 10 vulnerabilities (XSS, CSRF, SQL injection, injection attacks, insecure deserialization, broken authentication, sensitive data exposure, etc.), secure coding practices, input validation, authentication and authorization, encryption, secrets management, and dependency scanning. — Increasingly important; often required or strongly preferred.",

  "documentation": "Ability to write clear, useful documentation: READMEs, API documentation, code comments, architecture decision records (ADRs), runbooks, and technical specifications. Understands audience and purpose. Keeps documentation up to date. — Common soft skill requirement in IT job postings.",

  "code-review": "Giving and receiving constructive code reviews: reading others' code critically but respectfully, providing actionable feedback, catching bugs and design issues early, learning from reviews, and understanding review culture and etiquette. — Standard expectation for collaborative software teams.",

  "technical-debt": "Understanding technical debt: identifying it, assessing its impact, prioritizing its remediation, and balancing feature work with refactoring. Can make the business case for addressing debt. — Mentioned in many senior and lead role descriptions.",

  // ── Professional Skills ─────────────────────────────────────────────────
  "problem-solving": "Ability to break down complex, ambiguous problems into manageable pieces. Analytical thinking, logical reasoning, and creativity in finding solutions. Can approach problems from multiple angles. Comfortable with uncertainty and iteration. — Top requirement across ALL IT job postings on LinkedIn, Indeed, Glassdoor.",

  "communication": "Clear written and verbal communication: explaining technical concepts to technical and non-technical audiences, writing good commit messages and documentation, participating in meetings effectively, articulating ideas, and active listening. Can write clear emails and reports. — Universal requirement across all IT roles.",

  "teamwork-collaboration": "Works well in teams: shares knowledge, helps others, respects diverse perspectives, resolves conflicts constructively, builds trust, and contributes to a positive team culture. Understands role within the team and how work gets done collaboratively. — Essential soft skill in every IT job description.",

  "learning-adaptability": "Ability to learn new technologies, languages, frameworks, and domain knowledge quickly. Stays current with industry trends. Curiosity and self-directed learning. Adapts to changing requirements, tools, and environments. — Highly valued across IT; especially important given the pace of technological change.",

  "critical-thinking": "Evaluates information and arguments critically. Questions assumptions, identifies flaws in reasoning, weighs evidence, and makes well-reasoned decisions. Can synthesize information from multiple sources and perspectives. — Common requirement in analytical and senior IT roles.",

  // ── Domain & Business ───────────────────────────────────────────────────
  "business-acumen": "Understanding of the business context in which software is built: business models, revenue streams, customers, market dynamics, competitive landscape, and how technology creates business value. Can align technical decisions with business priorities. — Increasingly required, especially for senior and lead roles.",

  "domain-knowledge": "Deep understanding of the specific domain the software serves (e.g., fintech, healthcare, e-commerce, logistics, gaming, education, media). Knows domain-specific concepts, regulations, workflows, data models, and user needs. — Often preferred or required; varies by industry.",

  "customer-focus": "Understanding and advocating for the end user/customer. Empathy for user needs, pain points, and behaviors. Uses feedback and data to inform decisions. Prioritizes features that deliver user value. — Common in product-adjacent and user-facing roles.",

  // ── Architecture & Design ───────────────────────────────────────────────
  "architecture": "Ability to design software architecture at the system and component level. Understands architectural styles, patterns (MVC, MVVM, repository, factory, strategy, observer, etc.), and can create architecture that balances concerns like scalability, reliability, maintainability, security, and cost. Can produce architectural diagrams and documents. — Critical for senior, lead, and architect roles.",

  "api-design": "Designing effective APIs: REST, GraphQL, gRPC, and SDK design. Understands API versioning, backward compatibility, idempotency, error handling, pagination, filtering, rate limiting, and API documentation (OpenAPI/Swagger). Designs APIs that are intuitive, consistent, and evolvable. — Common requirement for backend and platform roles.",

  "database-design": "Designing database schemas and data models: normalization, denormalization trade-offs, choosing appropriate data types, indexing strategy, relationships (one-to-one, one-to-many, many-to-many), constraints, and query patterns. Understands when to use SQL vs NoSQL. — Standard requirement for backend, full-stack, and data roles.",

  "performance-optimization": "Identifying and fixing performance bottlenecks: profiling, understanding memory usage, CPU utilization, I/O patterns, network latency, database query performance, caching strategies, lazy loading, connection pooling, and algorithmic improvements. Can measure and demonstrate performance improvements. — Often required for senior and performance-critical roles.",

  // ── Cloud & Infrastructure ──────────────────────────────────────────────
  "cloud-platforms": "Experience with at least one major cloud platform (AWS, Azure, GCP): compute (EC2/VMs, Lambda/Functions), storage (S3/Blob, databases), networking (VPC, load balancers), IAM, monitoring, and cloud-native services. Understands cloud pricing, cost optimization, and cloud security model. — Increasingly common across all IT roles, not just DevOps.",

  "infrastructure-as-code": "Managing infrastructure through code: Terraform, CloudFormation, Pulumi, CDK, Ansible, Chef, Puppet. Understands state management, modules, versioning, and the benefits of reproducible, reviewable infrastructure changes. — Growing requirement, especially in cloud-native environments.",

  "containers": "Understanding and using containers: Docker, container lifecycle, image creation, Dockerfiles, multi-stage builds, container networking and storage, container security, and when to use containers vs alternatives. Familiarity with container registries. — Common requirement; basic competency expected.",

  "orchestration": "Understanding container orchestration: Kubernetes concepts (pods, deployments, services, ingress, configmaps, secrets, HPA, RBAC), Helm, and orchestration patterns. Can deploy, configure, and troubleshoot Kubernetes clusters. — Required for many DevOps, platform, and backend roles; valued in full-stack roles.",

  // ── Data & Analytics ────────────────────────────────────────────────────
  "data-handler": "Ability to work with data: reading, writing, transforming, and querying data. Understands data formats (CSV, JSON, XML, Parquet), data serialization, and data validation. Can work with data at various scales from small datasets to large data pipelines. — Common across many IT roles, especially backend, full-stack, and data-adjacent roles.",

  "database-operations": "Working with databases in production: connection management, connection pooling, query optimization, indexing, transactions, replication, backups, monitoring database performance, and understanding database internals enough to troubleshoot issues. — Expected for backend and full-stack roles.",

  "caching": "Understanding and implementing caching: cache strategies (write-through, write-back, cache-aside), cache invalidation, choosing what to cache, caching layers (application-level, database query cache, CDN, distributed cache like Redis/Memcached), and cache consistency problems. — Common requirement for backend, full-stack, and performance-focused roles.",

  "messaging-event-driven": "Understanding asynchronous communication and event-driven architectures: message queues (RabbitMQ, SQS), event streaming (Kafka, Kinesis), pub/sub patterns, event sourcing, CQRS, and when to use synchronous vs asynchronous communication. — Increasingly common in modern architectures.",

  // ── Frontend-Specific ───────────────────────────────────────────────────
  "html-css": "Strong HTML and CSS skills: semantic HTML, accessibility (ARIA, screen readers, keyboard navigation), CSS layout (Flexbox, Grid), responsive design, CSS methodologies (BEM, CSS-in-JS, utility-first), typography, and cross-browser compatibility. Understands the box model, specificity, and cascade. — Core requirement for frontend and full-stack roles.",

  "javascript-typescript": "Deep JavaScript and TypeScript knowledge: language fundamentals (types, closures, prototypes, async/await, promises, event loop), ES6+ features, TypeScript types and generics, type safety, and the JavaScript/TypeScript ecosystem. Understands browser APIs and runtime behavior. — Foundational requirement for frontend and full-stack roles.",

  "frontend-frameworks": "Proficiency with modern frontend frameworks: React (components, hooks, state management, lifecycle), Angular (modules, services, dependency injection), or Vue (components, reactivity, composition API). Understands component architecture, routing, state management, and framework ecosystem. — Core requirement for frontend and many full-stack roles.",

  "frontend-state-management": "Managing state in frontend applications: local component state, global state (Redux, Zustand, Context API, Vuex, Pinia), server state (React Query, SWR, Apollo Client), and choosing the right approach for the application's complexity. Understands state flow and predictability. — Common in frontend role requirements.",

  "responsive-design": "Building responsive, mobile-friendly interfaces: media queries, fluid layouts, touch interactions, mobile-first design, performance on mobile devices, and testing across devices and screen sizes. — Essential for frontend roles; expected in full-stack roles building user interfaces.",

  "web-performance": "Optimizing web application performance: bundle size optimization, code splitting, lazy loading, tree shaking, image optimization, critical rendering path, Core Web Vitals (LCP, FID, CLS), caching strategies, and measuring performance. — Growing requirement, especially for user-facing applications.",

  "accessibility": "Building accessible web applications: WCAG guidelines, semantic HTML, ARIA attributes, keyboard navigation, focus management, color contrast, screen reader testing, and inclusive design principles. — Increasingly required; legal and ethical importance.",

  // ── Backend-Specific ────────────────────────────────────────────────────
  "api-development": "Building and maintaining APIs: REST, GraphQL, gRPC, or SOAP. Understanding HTTP methods, status codes, headers, request/response patterns, authentication/authorization (OAuth, JWT, API keys), rate limiting, versioning, documentation, and API testing. — Core requirement for backend and full-stack roles.",

  "authentication-authorization": "Implementing authentication and authorization: session-based auth, token-based auth (JWT), OAuth 2.0, OpenID Connect, SAML, role-based access control (RBAC), attribute-based access control (ABAC), and understanding the security implications. — Common requirement for backend, full-stack, and security roles.",

  "microservices": "Understanding and building microservices architectures: service decomposition, inter-service communication (REST, gRPC, messaging), service discovery, load balancing, distributed tracing, centralized logging, API gateways, and the trade-offs of microservices vs monoliths. — Common for senior backend, architecture, and platform roles.",

  "serverless": "Understanding serverless architectures: AWS Lambda, Azure Functions, GCP Cloud Functions, event-driven processing, cold starts, function composition, idempotency, and when serverless is appropriate. Can build and deploy serverless applications. — Growing requirement, especially in cloud-native environments.",

  "web-servers-proxies": "Understanding web servers and proxies: Nginx, Apache, HAProxy, Caddy, etc. Reverse proxy, load balancing, SSL termination, caching, compression, request routing, and configuration. Can configure and troubleshoot web server setups. — Common knowledge expected, especially in DevOps-adjacent and senior backend roles.",

  // ── Database-Specific ───────────────────────────────────────────────────
  "relational-databases": "Working with relational databases: PostgreSQL, MySQL, MariaDB, SQL Server, Oracle. Writing complex queries, understanding indexing, transactions, isolation levels, connection pooling, query planning, and database administration basics. — Core requirement for backend, full-stack, and data roles.",

  "nosql-databases": "Understanding and using NoSQL databases: document stores (MongoDB), key-value stores (Redis, DynamoDB), column-family stores (Cassandra), graph databases (Neo4j), and search engines (Elasticsearch). Knows when to use NoSQL vs SQL and the trade-offs. — Common requirement, especially for specific use cases.",

  "database-migration": "Managing database schema changes over time: migration tools (Flyway, Liquibase, Alembic, Prisma Migrate, Django migrations), versioned migrations, rollbacks, zero-downtime migration strategies, and coordinating schema changes with application deployments. — Expected in mature engineering organizations.",

  // ── Testing-Specific ────────────────────────────────────────────────────
  "test-automation": "Automating tests: writing automated unit, integration, and end-to-end tests. Understanding test automation frameworks, test runners, CI integration, test data management, and test environment setup. Values automation over manual testing for regression. — Standard expectation in modern software teams.",

  "testing-frameworks": "Proficiency with testing frameworks relevant to the stack: Jest, Vitest, Mocha, JUnit, TestNG, pytest, RSpec, Cypress, Playwright, Selenium, Postman/Newman, etc. Can write effective tests using the framework's features. — Role-specific but common across IT.",

  "integration-testing": "Writing and maintaining integration tests: testing component interactions, API endpoints, database integrations, external service integrations, and contract testing. Understands test isolation, test databases, and integration test environments. — Common requirement for ensuring system correctness.",

  "performance-testing": "Conducting performance tests: load testing, stress testing, soak testing, understanding metrics (throughput, latency, error rate, resource utilization), tools (JMeter, k6, Locust, Gatling), and interpreting results to identify bottlenecks. — Often required for senior, performance-critical, and DevOps roles.",

  // ── Security-Specific ───────────────────────────────────────────────────
  "secure-coding": "Writing code with security in mind: input validation and sanitization, output encoding, parameterized queries, avoiding common vulnerabilities (OWASP Top 10), secure error handling, logging security events, and following secure coding guidelines. — Increasingly required; security mindset expected.",

  "authentication-implementation": "Implementing authentication systems: password hashing (bcrypt, argon2), session management, token generation and validation, OAuth flows, multi-factor authentication, password reset flows, and securing authentication endpoints. — Core requirement for backend and full-stack roles handling user accounts.",

  "data-protection": "Protecting data in transit and at rest: encryption (symmetric, asymmetric, TLS/SSL), encryption at rest, key management, data masking, PII handling, compliance considerations (GDPR, HIPAA, PCI DSS), and secure data disposal. — Important for roles handling sensitive data.",

  "dependency-security": "Managing security of third-party dependencies: dependency scanning (Dependabot, Snyk, npm audit, OWASP Dependency-Check), understanding CVEs and vulnerability severity, updating dependencies, supply chain security, and pinning/locking dependency versions. — Growing importance; common in security-conscious organizations.",

  // ── DevOps & Infrastructure-Specific ────────────────────────────────────
  "cloud-services": "Using cloud provider services beyond compute: managed databases, object storage, messaging services, serverless functions, API gateways, CDN, DNS, monitoring, logging, secrets management, and other managed services. Understands service pricing and limits. — Common requirement for cloud-native roles.",

  "configuration-management": "Managing configuration across environments: environment variables, configuration files, secrets management (Vault, AWS Secrets Manager, Azure Key Vault), configuration versioning, and separating configuration from code. Understands twelve-factor app principles. — Expected in modern deployments.",

  "monitoring-observability": "Setting up and using monitoring and observability: metrics collection (Prometheus, CloudWatch, Datadog), log aggregation (ELK, Splunk, Loki), distributed tracing (Jaeger, X-Ray, OpenTelemetry), alerting, dashboards, and SLO/SLI definition. — Common in DevOps, SRE, and platform roles; valued in backend roles.",

  "container-orchestration": "Working with container orchestration platforms: Kubernetes (pods, deployments, services, ingress, configmaps, secrets, RBAC, Helm charts), Docker Swarm, or managed services (EKS, AKS, GKE). Can deploy, scale, and troubleshoot containerized applications. — Required for DevOps, platform, and many backend roles.",

  "infrastructure-automation": "Automating infrastructure provisioning and management: Terraform, CloudFormation, Pulumi, scripts, and CI/CD integration. Can define, deploy, update, and tear down infrastructure reproducibly. Understands infrastructure state management. — Core requirement for DevOps and platform roles.",

  "incident-management": "Managing production incidents: triage, severity assessment, communication during incidents, incident response procedures, postmortems (blameless), action item tracking, and on-call responsibilities. Understands incident lifecycle and can handle pressure during outages. — Expected for on-call and senior roles.",

  "release-management": "Managing software releases: release planning, versioning (semantic versioning), release notes, release branching, release deployment strategies, rollback procedures, and release communication. Can coordinate releases across teams. — Common in mature teams and lead/senior roles.",

  // ── Data Engineering & Analytics ────────────────────────────────────────
  "data-pipelines": "Building and maintaining data pipelines: ETL/ELT processes, data ingestion from various sources, data transformation, data loading, batch and streaming pipelines, pipeline orchestration (Airflow, Prefect, Dagster), and pipeline monitoring. — Core requirement for data engineering roles.",

  "data-modeling": "Designing data models and schemas: dimensional modeling (star schema, snowflake schema), normalization, data vault, master data management, data warehousing concepts, and choosing appropriate models for different use cases. — Required for data engineering, analytics engineering, and data architect roles.",

  "data-quality": "Ensuring data quality: data validation, data profiling, anomaly detection, data cleansing, implementing data quality checks and tests, monitoring data quality over time, and establishing data quality standards. — Important for data engineering, analytics, and data governance roles.",

  "data-visualization": "Creating meaningful data visualizations: choosing appropriate chart types, using visualization libraries (Matplotlib, Seaborn, Plotly, D3.js, Tableau, Power BI), dashboard design, telling stories with data, and making visualizations accessible and understandable. — Core for data analyst, analytics engineer, and data science roles.",

  "statistics": "Understanding statistical concepts: descriptive statistics, probability distributions, hypothesis testing, confidence intervals, p-values, correlation vs causation, regression, experimental design, A/B testing, and statistical significance. Can apply statistics to analyze data and draw valid conclusions. — Required for data analyst, data scientist, and research roles.",

  "machine-learning-awareness": "Awareness of machine learning concepts and applications: understanding ML problem types (classification, regression, clustering, recommendation), ML lifecycle (data preparation, training, evaluation, deployment, monitoring), common algorithms, and when ML is and isn't appropriate. Can collaborate with data scientists. — Growing requirement across IT, especially for ML-adjacent roles.",

  // ── Business Analysis & Consulting ──────────────────────────────────────
  "requirements-analysis": "Eliciting, analyzing, and documenting requirements: working with stakeholders to understand needs, translating business requirements into functional specifications, prioritization, managing changing requirements, and ensuring requirements are clear, testable, and aligned with business goals. — Core for business analyst, product manager, and consulting roles.",

  "business-process-modeling": "Modeling business processes: understanding current-state processes, identifying improvement opportunities, designing future-state processes, using process modeling notations (BPMN, flowcharts, UML), and communicating process designs to stakeholders. — Common in business analysis, consulting, and process improvement roles.",

  "stakeholder-management": "Managing relationships with stakeholders: identifying stakeholders, understanding their needs and influence, communication planning, expectation management, conflict resolution, building consensus, and keeping stakeholders informed and engaged. — Essential for consulting, product management, and leadership roles.",

  "consulting-skills": "Consulting competencies: building trust with clients, understanding their context and challenges, asking insightful questions, providing actionable recommendations, managing consulting engagements, delivering value, and maintaining professional relationships. Understands consulting methodologies and client dynamics. — Core for business consulting, IT consulting, and advisory roles.",

  "presentation-skills": "Presenting information effectively: creating clear presentations, presenting to different audiences (technical, executive, client), handling Q&A, storytelling with data, and using visual aids effectively. Can persuade and influence through presentations. — Common requirement across IT, especially for roles with stakeholder interaction.",

  "facilitation": "Facilitating meetings and workshops: running effective meetings, facilitating brainstorming and decision-making sessions, managing group dynamics, ensuring participation, time management, and achieving meeting outcomes. Can facilitate retrospectives, planning sessions, and discovery workshops. — Valued in agile, product, and consulting roles.",

  "change-management": "Managing organizational change: understanding change dynamics, planning change initiatives, communication strategies, stakeholder engagement during change, training and support, and measuring adoption. Understands change management frameworks (ADKAR, Kotter). — Important for IT transformation, implementation, and consulting roles.",

  "project-management": "Managing projects: scope, timeline, budget, resources, risks, and stakeholders. Using project management methodologies (Waterfall, Agile, hybrid), tools (Jira, Asana, MS Project), and techniques (Gantt charts, critical path, risk matrices). Can deliver projects on time and within constraints. — Common requirement across IT, especially for lead and coordinator roles.",

  "client-relationship-management": "Building and maintaining client relationships: understanding client needs, delivering on commitments, communication, managing expectations, handling complaints, identifying upsell/cross-sell opportunities, and ensuring client satisfaction and retention. — Core for consulting, account management, and client-facing roles.",

  "proposal-writing": "Writing compelling proposals: understanding requirements, articulating solutions, building business cases, cost estimation, competitive analysis, and persuasive writing. Can write RFP responses, project proposals, and statements of work. — Essential for consulting and business development roles.",

  "value-selling": "Understanding and communicating the value of technology solutions: translating features into business benefits, quantifying ROI, understanding customer pain points and how solutions address them, and building business cases for technology investments. — Important for consulting, sales engineering, and solution architecture roles.",

  "market-research": "Conducting market research: analyzing market trends, competitor landscape, customer segments, market sizing, and industry dynamics. Can gather and synthesize market information to inform strategy and recommendations. — Useful for product, strategy, and consulting roles.",

  // ── Architecture & Leadership ───────────────────────────────────────────
  "system-architecture": "Designing system architectures: understanding architectural patterns and styles, making architectural decisions with justification, creating architecture documentation, evaluating technologies, and ensuring architecture supports business requirements and non-functional requirements (scalability, reliability, security, maintainability). — Core for architect and senior/lead roles.",

  "technology-selection": "Evaluating and selecting technologies: assessing technologies against requirements, understanding trade-offs, considering community, maturity, support, licensing, hiring market, and long-term viability. Can make informed technology recommendations. — Important for architect, lead, and senior roles.",

  "technical-strategy": "Developing technical strategy: aligning technology decisions with business strategy, long-term technical planning, technology roadmaps, architectural runway, managing technical risk, and communicating technical vision to stakeholders. — Required for architect, CTO, VP Engineering, and senior leadership roles.",

  "technical-leadership": "Providing technical leadership: setting technical direction, mentoring engineers, raising technical standards, making tough technical decisions, advocating for engineering excellence, and balancing technical and business priorities. Can inspire and guide technical teams. — Core for tech lead, engineering manager, and architect roles.",

  "mentoring-coaching": "Mentoring and coaching other engineers: providing guidance, sharing knowledge, helping others grow, giving constructive feedback, identifying development opportunities, and supporting career growth. Understands different mentoring styles and when to apply them. — Valued in senior, lead, and manager roles.",

  "technical-decision-making": "Making sound technical decisions: gathering relevant information, evaluating options, considering trade-offs and risks, consulting stakeholders, making timely decisions, and being willing to revisit decisions when new information emerges. Can defend decisions with reasoning. — Essential for senior and leadership roles.",

  "conflict-resolution": "Resolving technical and interpersonal conflicts: addressing disagreements constructively, finding common ground, facilitating resolution, escalating when necessary, and maintaining professional relationships. Can navigate technical disagreements about approach, tools, or design. — Important soft skill across IT roles.",

  "strategy-thought-leadership": "Contributing to technical strategy and thought leadership: staying current with industry trends, evaluating emerging technologies, sharing insights internally and externally (blogs, talks, open source), and influencing technical direction at the organizational or industry level. — Expected for principal, architect, and leadership roles.",

  // ── Soft Skills (Cross-Cutting) ──────────────────────────────────────────
  "time-management": "Managing time effectively: prioritization, estimation, breaking work into manageable tasks, managing interruptions, meeting deadlines, and balancing multiple responsibilities. Can organize work efficiently and communicate status proactively. — Universal expectation across all IT roles.",

  "attention-detail": "Attention to detail: catching errors and edge cases, writing precise code and documentation, thorough testing, code review diligence, and producing high-quality work. Can spot issues that others might miss. — Important across all IT roles; especially critical for testing, security, and data roles.",

  "creativity-innovation": "Creative problem-solving and innovation: thinking outside the box, generating novel solutions, improving processes and products, experimenting with new approaches, and bringing fresh perspectives. Can balance creativity with pragmatism. — Valued across IT, especially in R&D, product, and startup environments.",

  "resilience-stress-management": "Resilience and stress management: handling pressure, dealing with setbacks and failures, maintaining productivity under stress, recovering from incidents or bugs, and managing workload and burnout risk. Can stay calm and focused during challenging situations. — Important across IT, especially for on-call, incident response, and high-pressure roles.",
};

/**
 * Get the description for a specific skill ID.
 * Falls back to a generic description if the skill is not in the registry.
 */
export function getSkillDescription(skillId: string, fallbackName?: string): string {
  if (IT_SKILL_DESCRIPTIONS[skillId]) {
    return IT_SKILL_DESCRIPTIONS[skillId];
  }
  if (fallbackName) {
    return `Proficiency in ${fallbackName}. Ability to apply this skill effectively in professional contexts, demonstrating knowledge, experience, and best practices associated with this competency. — Standard IT industry competency as reflected in hiring platforms (LinkedIn, Indeed, Glassdoor) and industry frameworks.`;
  }
  return `Proficiency in this skill area. Demonstrated ability to apply this competency effectively in professional software development and IT contexts, following industry best practices and delivering value.`;
}

/**
 * Get the hiring-platform-aligned description for a role.
 * These descriptions capture what employers on LinkedIn, Indeed, and Glassdoor
 * typically look for in each role.
 */
export const ROLE_DESCRIPTIONS: Record<string, string> = {
  "software-engineer": `Software Engineer — Designs, develops, and maintains software applications and systems. Writes clean, efficient, and testable code. Collaborates with cross-functional teams to define, design, and ship new features. Identifies and resolves performance bottlenecks and bugs. Participates in code reviews and contributes to team knowledge sharing. Stays current with emerging technologies and applies them appropriately. — Core requirements reflected across LinkedIn, Indeed, and Glassdoor job postings: strong programming skills, problem-solving ability, knowledge of data structures and algorithms, experience with version control (Git), understanding of software development lifecycle, ability to work in agile teams, communication skills, and a commitment to code quality and continuous learning.`,

  "frontend-engineer": `Frontend Engineer — Builds user-facing web applications and interfaces using HTML, CSS, and JavaScript/TypeScript. Develops responsive, accessible, and performant UI components. Works with modern frontend frameworks (React, Angular, Vue). Collaborates with designers, backend engineers, and product managers. Optimizes applications for maximum speed and scalability. Translates design wireframes and prototypes into high-quality code. — Common requirements: proficiency in HTML/CSS/JavaScript, experience with modern frontend frameworks, understanding of web performance and accessibility, API integration, state management, testing (unit, integration, E2E), version control, responsive design, cross-browser compatibility, and strong eye for UI/UX details.`,

  "backend-engineer": `Backend Engineer — Builds and maintains server-side logic, databases, and application programming interfaces (APIs). Develops high-performance, scalable, and reliable backend services. Designs and implements data storage solutions. Integrates with frontend applications and third-party services. Ensures application security and data integrity. Optimizes applications for speed and scalability. — Core requirements: strong programming skills in backend languages (Java, Python, Go, Node.js, C#, Ruby, etc.), database design and SQL proficiency, API design (REST, GraphQL), understanding of authentication and authorization, familiarity with cloud platforms, testing practices, version control, CI/CD concepts, and ability to design scalable systems.`,

  "full-stack-engineer": `Full-Stack Engineer — Works across the entire software stack, from frontend user interfaces to backend services and databases. Builds complete features end-to-end. Comfortable switching between frontend and backend work as needed. Understands how all parts of the system fit together. Makes architectural decisions that consider both frontend and backend implications. — Common requirements: proficiency in both frontend (HTML, CSS, JavaScript, React/Vue/Angular) and backend (Node.js, Python, Java, Go, etc.) technologies, database design and management, API development, version control, testing, deployment and DevOps basics, problem-solving across the stack, and ability to take ownership of features from concept to production.`,

  "qa-engineer": `QA Engineer / Quality Assurance Engineer — Ensures software quality through systematic testing and process improvement. Designs and executes test plans, test cases, and test scripts. Performs manual and automated testing. Identifies, documents, and tracks defects. Collaborates with development teams to ensure quality is built into the product from the start. Develops and maintains test automation frameworks. — Core requirements: understanding of testing methodologies and types (unit, integration, system, acceptance, regression, performance, security), experience with testing tools and frameworks (Selenium, Cypress, Playwright, JUnit, pytest, etc.), SQL and API testing skills, attention to detail, analytical thinking, ability to write clear bug reports, understanding of CI/CD and test automation, and knowledge of quality metrics and processes.`,

  "devops-engineer": `DevOps Engineer — Bridges the gap between development and operations, enabling faster, more reliable software delivery. Builds and maintains CI/CD pipelines, infrastructure as code, and automated deployment processes. Manages cloud infrastructure and containerized environments. Implements monitoring, logging, and alerting. Supports incident response and release management. Drives DevOps culture and practices across teams. — Common requirements: strong scripting skills (Python, Bash, Go), experience with CI/CD tools (Jenkins, GitHub Actions, GitLab CI), infrastructure as code (Terraform, CloudFormation), containerization (Docker) and orchestration (Kubernetes), cloud platforms (AWS, Azure, GCP), monitoring and observability tools, understanding of Linux/Unix administration, networking fundamentals, security practices, and collaboration skills.`,

  "data-analyst": `Data Analyst — Analyzes data to extract insights that drive business decisions. Collects, cleans, and validates data from various sources. Performs exploratory data analysis and statistical analysis. Creates reports, dashboards, and visualizations to communicate findings. Works with stakeholders to understand their data needs and translate them into analytical tasks. Recommends actions based on data-driven insights. — Core requirements: strong SQL skills, proficiency with data analysis tools (Excel, Python/R, BI tools like Tableau/Power BI/Looker), statistical knowledge, data visualization skills, ability to communicate insights clearly to non-technical audiences, attention to detail, understanding of business context, and ability to work with messy, real-world data.`,

  "data-engineer": `Data Engineer — Builds and maintains the data infrastructure and pipelines that enable data analysis and data science. Designs, constructs, and optimizes data pipelines for ingesting, storing, and processing data at scale. Implements data architectures (data warehouses, data lakes, lakehouses). Ensures data quality, reliability, and availability. Collaborates with data analysts, data scientists, and business stakeholders. — Common requirements: strong programming skills (Python, Scala, SQL), experience with data pipeline tools and frameworks (Apache Spark, Airflow, dbt), data warehousing concepts and technologies (Snowflake, Redshift, BigQuery, Databricks), understanding of data modeling and ETL/ELT patterns, cloud data services, big data technologies, data quality practices, and ability to design scalable data solutions.`,

  "business-consultant": `Business Consultant (IT) — Advises organizations on how to use technology to achieve business objectives and solve problems. Analyzes business processes, systems, and strategies. Gathers and analyzes requirements. Develops recommendations and implementation plans. Facilitates workshops and stakeholder sessions. Supports technology implementations and transformations. Bridges the gap between business needs and technical solutions. — Core requirements: strong analytical and problem-solving skills, business acumen and understanding of how technology creates value, requirements elicitation and analysis, stakeholder management and communication, presentation and facilitation skills, project management, understanding of IT systems and digital transformation, change management, and ability to work with diverse clients and translate between business and technical languages.`,
};

/**
 * Get the role description for a specific role ID.
 */
export function getRoleDescription(roleId: string): string {
  return ROLE_DESCRIPTIONS[roleId] || `Professional in the ${roleId} role, applying specialized skills and knowledge to deliver value in technology-focused projects and initiatives. Follows industry best practices and adapts to the specific needs and context of the organization.`;
}

/**
 * Get common requirements array for a role (extracted from the description).
 * Useful for building job description summaries and skill gap analysis.
 */
export function getCommonRequirements(roleId: string): string[] {
  const descriptions: Record<string, string[]> = {
    "software-engineer": [
      "Strong programming skills in one or more languages (Java, Python, JavaScript/TypeScript, Go, C#, etc.)",
      "Solid understanding of data structures, algorithms, and complexity analysis",
      "Experience with version control (Git) and collaborative development workflows",
      "Knowledge of software design principles and design patterns",
      "Writing clean, maintainable, and tested code",
      "Understanding of databases and data modeling",
      "Familiarity with APIs (REST, GraphQL) and integration patterns",
      "Experience with testing (unit, integration, E2E)",
      "Problem-solving and analytical thinking",
      "Communication and teamwork skills",
      "Understanding of CI/CD and DevOps practices",
      "Agile/Scrum experience",
      "Security awareness",
    ],
    "frontend-engineer": [
      "Proficiency in HTML, CSS, and JavaScript/TypeScript",
      "Experience with modern frontend frameworks (React, Angular, Vue, or similar)",
      "Understanding of responsive and mobile-first design",
      "Knowledge of web accessibility standards (WCAG)",
      "API integration and data fetching",
      "State management (Redux, Zustand, Context API, or framework-specific solutions)",
      "Testing: unit, integration, and end-to-end testing",
      "Performance optimization (bundle size, rendering, Core Web Vitals)",
      "Version control (Git)",
      "CSS methodologies and styling approaches",
      "Cross-browser compatibility",
      "Understanding of build tools and bundlers (Webpack, Vite, etc.)",
      "Collaboration with designers and backend engineers",
    ],
    "backend-engineer": [
      "Strong programming skills in a backend language (Java, Python, Go, Node.js, C#, Ruby, etc.)",
      "Database design and SQL proficiency (relational and/or NoSQL)",
      "API design and development (REST, GraphQL, gRPC)",
      "Understanding of authentication and authorization",
      "Knowledge of data structures, algorithms, and system design",
      "Testing practices and test automation",
      "Version control (Git)",
      "CI/CD and deployment pipelines",
      "Cloud platform familiarity (AWS, Azure, GCP)",
      "Security best practices",
      "Performance optimization and scalability",
      "Problem-solving and debugging skills",
      "Communication and collaboration",
    ],
    "full-stack-engineer": [
      "Proficiency in both frontend (HTML, CSS, JavaScript/TypeScript, React/Vue/Angular) and backend (Node.js, Python, Java, Go, etc.) technologies",
      "Database design and management (SQL and/or NoSQL)",
      "API development and integration",
      "End-to-end feature ownership: from concept to production",
      "Version control (Git)",
      "Testing across the stack",
      "CI/CD and deployment understanding",
      "DevOps and infrastructure basics",
      "Problem-solving across frontend and backend",
      "Communication and cross-functional collaboration",
      "Ability to prioritize and manage work across multiple areas",
      "Understanding of system architecture and how components interact",
    ],
    "qa-engineer": [
      "Understanding of testing methodologies and types (functional, regression, integration, system, acceptance, performance, security)",
      "Experience with testing tools and frameworks (Selenium, Cypress, Playwright, JUnit, pytest, TestNG, etc.)",
      "SQL skills for database testing",
      "API testing (Postman, REST Assured, or similar)",
      "Attention to detail and analytical thinking",
      "Ability to write clear, reproducible bug reports",
      "Test case design and test planning",
      "Understanding of CI/CD and test automation",
      " familiar with version control (Git)",
      "Knowledge of quality metrics and QA processes",
      "Communication and collaboration with development teams",
      "Experience with test management tools (Jira, TestRail, etc.)",
      "Understanding of Agile/Scrum methodologies",
    ],
    "devops-engineer": [
      "Strong scripting and programming skills (Python, Bash, Go, etc.)",
      "CI/CD pipeline tools and practices (Jenkins, GitHub Actions, GitLab CI, CircleCI, ArgoCD)",
      "Infrastructure as code (Terraform, CloudFormation, Pulumi, CDK)",
      "Containerization (Docker) and orchestration (Kubernetes, ECS, AKS, GKE)",
      "Cloud platforms (AWS, Azure, GCP) — compute, storage, networking, IAM",
      "Monitoring, logging, and observability (Prometheus, Grafana, ELK, Datadog, CloudWatch)",
      "Linux/Unix administration and networking fundamentals",
      "Security practices and secrets management",
      "Incident response and on-call experience",
      "Collaboration and communication",
      "Understanding of software development lifecycle and Agile practices",
      "Release management and deployment strategies",
    ],
    "data-analyst": [
      "Strong SQL skills for data querying and manipulation",
      "Proficiency with data analysis tools (Excel, Python/R, BI tools)",
      "Experience with BI and visualization tools (Tableau, Power BI, Looker, or similar)",
      "Statistical knowledge and analytical thinking",
      "Data cleaning and validation",
      "Ability to communicate insights clearly to non-technical audiences",
      "Understanding of business context and metrics",
      "Attention to detail",
      "Experience with data sources and data extraction",
      "Version control (Git) for analysis code",
      "Collaboration with stakeholders and data teams",
      "Problem-solving and curiosity",
    ],
    "data-engineer": [
      "Strong programming skills (Python, Scala, SQL)",
      "Data pipeline development and orchestration (Airflow, Prefect, Dagster, dbt)",
      "Data warehousing concepts and technologies (Snowflake, Redshift, BigQuery, Databricks)",
      "Data modeling and ETL/ELT patterns",
      "Big data technologies (Apache Spark, Hadoop ecosystem)",
      "Cloud data services and infrastructure",
      "Data quality and reliability practices",
      "Understanding of data architectures (data lake, warehouse, lakehouse)",
      "Version control (Git) and CI/CD for data pipelines",
      "Collaboration with data analysts, data scientists, and business stakeholders",
      "Performance optimization for data workloads",
      "Knowledge of streaming and batch processing",
    ],
    "business-consultant": [
      "Strong analytical and problem-solving skills",
      "Business acumen and understanding of technology's role in business",
      "Requirements elicitation, analysis, and documentation",
      "Stakeholder management and communication",
      "Presentation, facilitation, and workshop skills",
      "Project management and delivery",
      "Understanding of IT systems, digital transformation, and technology trends",
      "Change management and organizational dynamics",
      "Ability to translate between business and technical languages",
      "Client relationship management",
      "Adaptability and ability to work in diverse environments",
      "Professionalism and credibility with clients",
      "Proposal and report writing",
    ],
  };

  return descriptions[roleId] || [];
}
