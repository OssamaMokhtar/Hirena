import type { Skill, ProficiencyLevel, CompetencyArea, CareerLadderStep } from '@/types';

export const SKILLS: Record<string, Skill> = {
  // Technical foundation
  'data-structures': {
    id: 'data-structures', name: 'Data Structures',
    description: 'Arrays, linked lists, stacks, queues, hash tables, trees, graphs, heaps. Big O analysis.',
    category: 'technical-foundation', level: 0,
  },
  'algorithms': {
    id: 'algorithms', name: 'Algorithms',
    description: 'Sorting, searching, graph traversal (BFS/DFS), dynamic programming, recursion, greedy algorithms.',
    category: 'technical-foundation', level: 0,
  },
  'complexity-analysis': {
    id: 'complexity-analysis', name: 'Complexity Analysis',
    description: 'Time/space complexity analysis. Big O, Big Theta, Big Omega. Performance trade-offs and scalability reasoning.',
    category: 'technical-foundation', level: 0,
  },
  'system-design-basics': {
    id: 'system-design-basics', name: 'System Design Basics',
    description: 'Load balancing, caching, database scaling (sharding, replication), message queues, microservices vs monolith, REST/gRPC API design.',
    category: 'technical-foundation', level: 0,
  },
  'computer-science-fundamentals': {
    id: 'computer-science-fundamentals', name: 'Computer Science Fundamentals',
    description: 'Operating systems (processes, threads, concurrency), networking (TCP/IP, HTTP, DNS), memory management, compilation vs interpretation.',
    category: 'technical-foundation', level: 0,
  },
  'math-for-programming': {
    id: 'math-for-programming', name: 'Math for Programming',
    description: 'Discrete math, logic, probability, statistics basics. Linear algebra for ML-adjacent work.',
    category: 'technical-foundation', level: 0,
  },
  // Languages
  'typescript': {
    id: 'typescript', name: 'TypeScript',
    description: 'Types, interfaces, generics, advanced types, type inference, tsconfig, ecosystem tooling.',
    category: 'languages', level: 0,
  },
  'javascript': {
    id: 'javascript', name: 'JavaScript',
    description: 'Closures, prototypal inheritance, async/await, promises, event loop, ES6+, modules, DOM (full-stack).',
    category: 'languages', level: 0,
  },
  'python': {
    id: 'python', name: 'Python',
    description: 'Data structures, decorators, generators, context managers, async/await, type hints, requests/pandas/numpy.',
    category: 'languages', level: 0,
  },
  'java': {
    id: 'java', name: 'Java',
    description: 'OOP, generics, collections, streams, concurrency (threads, executors, locks), JVM basics, Maven/Gradle, Spring awareness.',
    category: 'languages', level: 0,
  },
  'go': {
    id: 'go', name: 'Go',
    description: 'Static typing, interfaces, goroutines/channels (concurrency), error handling, packages, table-driven tests, standard library.',
    category: 'languages', level: 0,
  },
  // Development tools
  'version-control': {
    id: 'version-control', name: 'Version Control (Git)',
    description: 'Branching strategies (GitFlow, trunk-based), rebasing vs merging, conflict resolution, Git hooks, bisect, clean commits.',
    category: 'development-tools', level: 0,
  },
  'ide-code-editors': {
    id: 'ide-code-editors', name: 'IDE / Code Editors',
    description: 'VS Code, IntelliJ, GoLand proficiency. Debugging, refactoring tools, extensions, snippets, productivity features.',
    category: 'development-tools', level: 0,
  },
  'debugging-profiling': {
    id: 'debugging-profiling', name: 'Debugging & Profiling',
    description: 'Debuggers, strategic logging, profiling (CPU, memory, flame graphs), stack traces, systematic debugging methodology.',
    category: 'development-tools', level: 0,
  },
  'build-tools-package-managers': {
    id: 'build-tools-package-managers', name: 'Build Tools & Package Managers',
    description: 'npm/yarn/pnpm, Maven/Gradle, Go modules, Make, CMake. Dependency management, lockfiles, build pipelines.',
    category: 'development-tools', level: 0,
  },
  // Testing
  'unit-testing': {
    id: 'unit-testing', name: 'Unit Testing',
    description: 'TDD awareness, mocking/stubbing, test isolation, assertion libraries, coverage goals, testing best practices.',
    category: 'testing', level: 0,
  },
  'integration-testing': {
    id: 'integration-testing', name: 'Integration Testing',
    description: 'Component interactions, database integration, API integration, contract testing, E2E basics, test environments.',
    category: 'testing', level: 0,
  },
  'testing-frameworks': {
    id: 'testing-frameworks', name: 'Testing Frameworks',
    description: 'Jest, Vitest, Mocha, JUnit, pytest, Go testing. Testing patterns, fixtures, setup/teardown, test organization.',
    category: 'testing', level: 0,
  },
  'testing-strategy': {
    id: 'testing-strategy', name: 'Testing Strategy',
    description: 'Test pyramid, what to test vs skip, risk-based testing, flaky test management, coverage vs velocity balance.',
    category: 'testing', level: 0,
  },
  // Engineering practices
  'clean-code': {
    id: 'clean-code', name: 'Clean Code',
    description: 'Readable, maintainable code: meaningful names, small functions, SRP, no duplication, code organization, comments, refactoring.',
    category: 'engineering-practices', level: 0,
  },
  'design-patterns': {
    id: 'design-patterns', name: 'Design Patterns',
    description: 'Creational (factory, singleton, builder), structural (adapter, decorator, facade), behavioral (observer, strategy, command). When to apply.',
    category: 'engineering-practices', level: 0,
  },
  'refactoring': {
    id: 'refactoring', name: 'Refactoring',
    description: 'Code smells, refactoring techniques (extract method, rename, move, simplify conditionals), maintain behavior while improving structure.',
    category: 'engineering-practices', level: 0,
  },
  'code-review': {
    id: 'code-review', name: 'Code Review',
    description: 'Giving constructive feedback, reviewing correctness/design/readability/security/performance. Receiving feedback gracefully.',
    category: 'engineering-practices', level: 0,
  },
  'documentation': {
    id: 'documentation', name: 'Technical Documentation',
    description: 'Code comments, READMEs, API docs, ADRs, runbooks. Maintaining documentation as code evolves.',
    category: 'engineering-practices', level: 0,
  },
  // Collaboration
  'technical-communication': {
    id: 'technical-communication', name: 'Technical Communication',
    description: 'Design docs, trade-off explanations, technical presentations, clear PR descriptions, documenting decisions.',
    category: 'collaboration', level: 0,
  },
  'teamwork-collaboration': {
    id: 'teamwork-collaboration', name: 'Teamwork & Collaboration',
    description: 'Pair programming, mobbing, knowledge sharing, helping teammates, approachable, contributing to team culture.',
    category: 'collaboration', level: 0,
  },
  'mentoring': {
    id: 'mentoring', name: 'Mentoring & Knowledge Sharing',
    description: 'Mentoring juniors, code reviews as teaching, tech talks, internal docs, elevating team capability.',
    category: 'collaboration', level: 0,
  },
  'agile-engineering': {
    id: 'agile-engineering', name: 'Agile Engineering Practices',
    description: 'Standups, sprint planning, retrospectives. CI, small batches, frequent releases.',
    category: 'collaboration', level: 0,
  },
  // Architecture
  'architecture-principles': {
    id: 'architecture-principles', name: 'Architecture Principles',
    description: 'Separation of concerns, modularity, loose coupling, high cohesion, SOLID, KISS, YAGNI, DRY. Evaluating architectural approaches.',
    category: 'architecture', level: 0,
  },
  'distributed-systems': {
    id: 'distributed-systems', name: 'Distributed Systems',
    description: 'Consistency models, availability, CAP theorem, distributed transactions, event-driven architecture, service mesh, distributed challenges.',
    category: 'architecture', level: 0,
  },
  // Data
  'data-modeling': {
    id: 'data-modeling', name: 'Data Modeling',
    description: 'Relational schema design (normalization, foreign keys, indexes), NoSQL modeling (document, key-value, graph), data integrity.',
    category: 'data', level: 0,
  },
};

export const COMPETENCY_AREAS: CompetencyArea[] = [
  { id: 'technical-foundation', name: 'Technical Foundation', description: 'Core CS knowledge and algorithmic thinking', skills: ['data-structures', 'algorithms', 'complexity-analysis', 'system-design-basics', 'computer-science-fundamentals', 'math-for-programming'], weight: 18 },
  { id: 'languages', name: 'Programming Languages', description: 'Proficiency in one or more languages', skills: ['typescript', 'javascript', 'python', 'java', 'go'], weight: 16 },
  { id: 'development-tools', name: 'Development Tools', description: 'Tools and environments for development workflow', skills: ['version-control', 'ide-code-editors', 'debugging-profiling', 'build-tools-package-managers'], weight: 10 },
  { id: 'testing', name: 'Testing', description: 'Testing practices, frameworks, and strategy', skills: ['unit-testing', 'integration-testing', 'testing-frameworks', 'testing-strategy'], weight: 14 },
  { id: 'engineering-practices', name: 'Engineering Practices', description: 'Code quality, design, refactoring, documentation', skills: ['clean-code', 'design-patterns', 'refactoring', 'code-review', 'documentation'], weight: 16 },
  { id: 'collaboration', name: 'Collaboration', description: 'Communication, teamwork, mentoring, agile practices', skills: ['technical-communication', 'teamwork-collaboration', 'mentoring', 'agile-engineering'], weight: 14 },
  { id: 'architecture', name: 'Architecture', description: 'System architecture, design principles, distributed systems', skills: ['architecture-principles', 'distributed-systems'], weight: 8 },
  { id: 'data', name: 'Data', description: 'Data modeling and database design', skills: ['data-modeling'], weight: 4 },
];

export const LEVELS: ProficiencyLevel[] = [0, 1, 2, 3, 4, 5, 6, 7];

export const CAREER_LADDER: CareerLadderStep[] = [
  { title: 'Junior Software Engineer', minLevel: 0, expected: { 'technical-foundation': 1, 'languages': 1, 'development-tools': 2, testing: 1, 'engineering-practices': 1, collaboration: 1, architecture: 0, data: 1 }, description: 'Entry-level. Learning codebase, tools, team practices. Works under guidance. Building fundamentals.' },
  { title: 'Software Engineer', minLevel: 2, expected: { 'technical-foundation': 2, 'languages': 2, 'development-tools': 3, testing: 2, 'engineering-practices': 2, collaboration: 2, architecture: 1, data: 2 }, description: 'Core role. Works independently on features and bug fixes. Contributes to code reviews. Writes clean, tested code.' },
  { title: 'Senior Software Engineer', minLevel: 3, expected: { 'technical-foundation': 3, 'languages': 3, 'development-tools': 4, testing: 3, 'engineering-practices': 3, collaboration: 3, architecture: 2, data: 2 }, description: 'Operates independently. Mentors juniors. Leads complex features. Contributes to architectural decisions. Strong technical depth.' },
  { title: 'Lead Software Engineer', minLevel: 4, expected: { 'technical-foundation': 3, 'languages': 3, 'development-tools': 4, testing: 3, 'engineering-practices': 4, collaboration: 4, architecture: 3, data: 3 }, description: 'Technical leader for team/project. Sets technical direction. Drives best practices. Mentors multiple engineers. Balances tech + leadership.' },
  { title: 'Principal Engineer', minLevel: 5, expected: { 'technical-foundation': 4, 'languages': 4, 'development-tools': 5, testing: 4, 'engineering-practices': 5, collaboration: 5, architecture: 4, data: 4 }, description: 'Senior technical leader across multiple teams. Sets architecture for complex systems. Drives technical strategy. Recognized expert.' },
  { title: 'Engineering Manager', minLevel: 5, expected: { 'technical-foundation': 3, 'languages': 2, 'development-tools': 3, testing: 3, 'engineering-practices': 4, collaboration: 5, architecture: 2, data: 2 }, description: 'People manager. Hires, develops, manages engineers. Balances people leadership with technical guidance. Owns team delivery and health.' },
  { title: 'Director of Engineering', minLevel: 6, expected: { 'technical-foundation': 3, 'languages': 2, 'development-tools': 3, testing: 2, 'engineering-practices': 5, collaboration: 5, architecture: 3, data: 2 }, description: 'Leads multiple teams/org. Sets engineering strategy. Manages managers. Focus on organizational effectiveness.' },
  { title: 'VP Engineering', minLevel: 7, expected: { 'technical-foundation': 3, 'languages': 2, 'development-tools': 2, testing: 2, 'engineering-practices': 5, collaboration: 6, architecture: 3, data: 2 }, description: 'Executive leadership of engineering. Sets company-wide vision, strategy, culture. Reports to CTO/CEO.' },
  { title: 'CTO', minLevel: 7, expected: { 'technical-foundation': 4, 'languages': 3, 'development-tools': 3, testing: 3, 'engineering-practices': 5, collaboration: 6, architecture: 4, data: 3 }, description: 'Chief Technology Officer. Ultimate tech leadership. Sets tech strategy, evaluates major decisions, represents tech to board/stakeholders.' },
];

export const SKILL_COUNT = Object.keys(SKILLS).length;
export const PILLAR_COUNT = COMPETENCY_AREAS.length;
