# Hirena — Competency Models Specification

**Version:** 2.0  
**Last Updated:** September 12, 2026  
**Owner:** Ossama Mokhtar  

---

## Overview

Competency models are the foundation of Hirena's assessment engine. Each role has a structured framework of skills, competency pillars (areas), proficiency levels, and career ladders that define what proficiency looks like at each career stage.

**Built (Phase 1):** 5 engineering roles + Product Manager = 6 roles complete  
**Roadmap (Phase 2):** 9 remaining roles = 15 total target

---

## 1. Competency Model Structure

### 1.1 Data Model

```typescript
// Skill — individual competency
interface Skill {
  id: string;                    // Unique identifier (e.g., "programming-languages")
  name: string;                  // Display name (e.g., "Programming Languages")
  description: string;           // Brief description of the skill
  category: string;              // Pillar/category ID (e.g., "tech-foundation")
  level: number;                 // 0-7 proficiency scale (0 = none, 7 = authority)
  evidence?: string;             // User's experience description (from AI analysis)
  aiConfidence?: number;         // 0-1, how confident AI is in inference
  isAiInferred?: boolean;        // Whether level came from AI vs self-rating
}

// Competency Area (Pillar) — grouped skills
interface CompetencyArea {
  id: string;                    // Pillar ID
  name: string;                  // Pillar name (e.g., "Technical Foundation")
  description: string;           // Pillar description
  skills: string[];              // Skill IDs in this pillar
  weight: number;                // 0-100, relative importance in scoring
}

// Proficiency Level — 0-7 scale
interface ProficiencyLevel {
  level: number;                 // 0-7
  label: string;                 // "None" | "Novice" | "Basic" | "Intermediate" | "Advanced" | "Expert" | "Authority"
  description: string;           // What this level means
}

// Career Ladder Step — role progression
interface CareerLadderStep {
  title: string;                 // Role title (e.g., "Senior Software Engineer")
  minLevel: number;              // Minimum proficiency (0-7)
  maxLevel?: number;             // Maximum proficiency (optional)
  expected: Record<string, number>; // Per-skill expected levels at this step
  description: string;           // Role expectations
  typicalYearsOfExperience: string; // e.g., "3-5 years"
}

// Role Competency Model — complete role definition
interface RoleCompetencyModel {
  role: string;                   // Role ID (e.g., "software-engineer")
  roleName: string;               // Display name (e.g., "Software Engineer")
  track?: string | null;          // Optional specialization track
  description: string;            // Role description
  skills: Record<string, Skill>;  // All skills for this role (keyed by ID)
  pillars: CompetencyPillar[];    // Pillars with aggregated skill data
  competencyAreas: CompetencyArea[]; // Grouped skill areas (for display)
  levels: ProficiencyLevel[];     // Proficiency scale (0-7)
  careerLadder: CareerLadderStep[]; // Career progression steps
  expectedLevels: Record<string, CareerLadderStep>; // Quick lookup by step title
  totalSkills: number;            // Total skill count
  totalPillars: number;           // Total pillar count
  region: string;                 // Geographic scope (e.g., "global", "mena")
}
```

### 1.2 Proficiency Scale (0-7)

| Level | Label | Description |
|-------|-------|-------------|
| 0 | None | No familiarity with the skill |
| 1 | Novice | Basic awareness, can't apply independently |
| 2 | Basic | Can perform simple tasks with guidance |
| 3 | Intermediate | Can handle routine tasks independently |
| 4 | Advanced | Can handle complex tasks, mentor others |
| 5 | Expert | Deep expertise, solve novel problems |
| 6 | Authority | Recognized expert, drive industry standards |
| 7 | World-Class | Top 1% globally, define best practices |

### 1.3 Scoring Logic

**Overall Score Calculation:**
```
overallScore = Σ(pillarScore × pillarWeight) / Σ(pillarWeight)
```

**Pillar Score:**
```
pillarScore = Σ(skill_level × skill_weight) / Σ(skill_weight)
```
- Each skill level is 0-7
- Normalized to 0-100 scale for display

**Gap Identification:**
- **Strengths:** Skills where level ≥ 5 (Expert+)
- **Gaps:** Skills where level < 3 (Intermediate-)
- **Missing:** Skills user didn't rate

**Priority Calculation:**
```
priority = gapSize × pillarWeight × goalRelevance
```
- gapSize = targetLevel - currentLevel
- pillarWeight = pillar importance (0-100)
- goalRelevance = relevance to user's career goal (0-1)

---

## 2. Built Competency Models (Phase 1)

### 2.1 Product Manager (MVP Launch)

**Role:** Product Manager  
**Skills:** 35  
**Pillars:** 6  
**Career Ladder:** APM → PM → Senior PM → Group PM → Director → VP → CPO  
**Region:** Global (MENA benchmarks prioritized)

#### Competency Areas (Pillars)

| # | Pillar | Weight | Skills | Description |
|---|--------|--------|--------|-------------|
| 1 | Strategy | 20 | 6 | Product vision, market analysis, competitive strategy, ROI modeling, prioritization frameworks |
| 2 | Discovery | 15 | 5 | User research, problem validation, solution exploration, prototyping, testing |
| 3 | Delivery | 20 | 6 | Roadmapping, agile execution, stakeholder management, launch planning, iteration |
| 4 | Analytics | 15 | 5 | Metrics definition, data analysis, A/B testing, dashboards, insights generation |
| 5 | AI / Emerging Tech | 15 | 6 | AI literacy, prompt engineering, AI product integration, ethical AI, emerging tech scanning |
| 6 | Leadership | 15 | 7 | Stakeholder influence, team leadership, communication, decision-making, mentorship |

#### Career Ladder

| Step | Title | Min Level | Max Level | Typical Experience |
|------|-------|-----------|-----------|-------------------|
| 1 | Associate Product Manager (APM) | 0 | 2 | 0-1 years |
| 2 | Product Manager (PM) | 2 | 4 | 1-3 years |
| 3 | Senior Product Manager | 4 | 5 | 3-5 years |
| 4 | Group Product Manager | 5 | 6 | 5-8 years |
| 5 | Director of Product | 5 | 6 | 8-12 years |
| 6 | VP of Product | 6 | 7 | 12-15 years |
| 7 | Chief Product Officer (CPO) | 6 | 7 | 15+ years |

**Files:**
- `src/lib/competency-model.ts` — PM_SKILLS, COMPETENCY_AREAS, PM_CAREER_LADDER, REGIONAL_BENCHMARKS, INDUSTRIES, REGIONS

---

### 2.2 Software Engineer

**Role:** Software Engineer  
**Skills:** 38  
**Pillars:** 8  
**Career Ladder:** Junior → Software Engineer → Senior → Lead → Principal → Engineering Manager → Director → VP → CTO  
**Region:** Global

#### Competency Areas (Pillars)

| # | Pillar | Weight | Skills | Description |
|---|--------|--------|--------|-------------|
| 1 | Technical Foundation | 15 | 5 | Computer science fundamentals, data structures, algorithms, system design basics, debugging |
| 2 | Programming Languages | 15 | 5 | Proficiency in multiple languages (TypeScript, Python, Java, Go, etc.), language-specific idioms |
| 3 | DevOps / Tools | 12 | 4 | Git, CI/CD, containerization, cloud platforms, monitoring, infrastructure basics |
| 4 | Testing | 10 | 3 | Unit testing, integration testing, TDD, test automation, code quality tools |
| 5 | Engineering Practices | 15 | 6 | Code review, refactoring, design patterns, clean code, documentation, pair programming |
| 6 | Collaboration | 10 | 4 | Communication, teamwork, agile participation, mentoring, knowledge sharing |
| 7 | Architecture | 13 | 5 | System design, architectural patterns, scalability, security architecture, trade-off analysis |
| 8 | Data | 10 | 4 | Data modeling, databases, data pipelines, data quality, data governance |

#### Career Ladder

| Step | Title | Min Level | Max Level | Typical Experience |
|------|-------|-----------|-----------|-------------------|
| 1 | Junior Software Engineer | 0 | 2 | 0-2 years |
| 2 | Software Engineer | 2 | 4 | 2-4 years |
| 3 | Senior Software Engineer | 4 | 5 | 4-6 years |
| 4 | Lead Software Engineer | 5 | 6 | 6-8 years |
| 5 | Principal Software Engineer | 6 | 6 | 8-12 years |
| 6 | Engineering Manager | 5 | 6 | 8-10 years (leadership track) |
| 7 | Director of Engineering | 5 | 6 | 12-15 years |
| 8 | VP of Engineering | 6 | 7 | 15-20 years |
| 9 | Chief Technology Officer (CTO) | 6 | 7 | 20+ years |

**Files:**
- `src/lib/competency-models/software-engineer.ts` — SKILLS, COMPETENCY_AREAS, LEVELS, CAREER_LADDER, SKILL_COUNT=38, PILLAR_COUNT=8

---

### 2.3 Frontend Engineer

**Role:** Frontend Engineer  
**Skills:** 36  
**Pillars:** 8  
**Career Ladder:** Junior → Frontend Engineer → Senior → Lead → Principal → Architect → Engineering Manager → Director  
**Region:** Global

#### Competency Areas (Pillars)

| # | Pillar | Weight | Skills | Description |
|---|--------|--------|--------|-------------|
| 1 | Frontend Fundamentals | 18 | 6 | HTML, CSS, JavaScript, DOM, browser APIs, web standards |
| 2 | Frameworks / Libraries | 18 | 5 | React, Vue, Angular, or similar framework expertise |
| 3 | CSS Styling | 12 | 4 | CSS mastery, preprocessors, animations, responsive design, CSS architecture |
| 4 | Web Essentials | 10 | 4 | Web performance, accessibility, SEO, semantics, progressive enhancement |
| 5 | Testing | 8 | 3 | Frontend testing, component testing, E2E testing, test automation |
| 6 | Performance Optimization | 8 | 3 | Bundle optimization, lazy loading, caching, CDN, Core Web Vitals |
| 7 | Accessibility | 8 | 3 | WCAG, ARIA, screen readers, keyboard navigation, inclusive design |
| 8 | Collaboration | 8 | 4 | Designer collaboration, stakeholder communication, code review, mentoring |

#### Career Ladder

| Step | Title | Min Level | Max Level | Typical Experience |
|------|-------|-----------|-----------|-------------------|
| 1 | Junior Frontend Engineer | 0 | 2 | 0-2 years |
| 2 | Frontend Engineer | 2 | 4 | 2-4 years |
| 3 | Senior Frontend Engineer | 4 | 5 | 4-6 years |
| 4 | Lead Frontend Engineer | 5 | 6 | 6-8 years |
| 5 | Principal Frontend Engineer | 6 | 6 | 8-12 years |
| 6 | Frontend Architect | 6 | 7 | 10-15 years |
| 7 | Engineering Manager (Frontend) | 5 | 6 | 8-10 years (leadership track) |
| 8 | Director of Frontend Engineering | 5 | 6 | 12-15 years |

**Files:**
- `src/lib/competency-models/frontend-engineer.ts` — SKILLS, COMPETENCY_AREAS, LEVELS, CAREER_LADDER, SKILL_COUNT=36, PILLAR_COUNT=8

---

### 2.4 Backend Engineer

**Role:** Backend Engineer  
**Skills:** 31  
**Pillars:** 9  
**Career Ladder:** Junior → Backend Engineer → Senior → Lead → Principal → Architect → Engineering Manager → Director  
**Region:** Global

#### Competency Areas (Pillars)

| # | Pillar | Weight | Skills | Description |
|---|--------|--------|--------|-------------|
| 1 | Programming Languages | 15 | 4 | Backend language mastery (Python, Go, Java, Node.js, etc.) |
| 2 | Databases | 15 | 4 | SQL, NoSQL, database design, query optimization, migrations |
| 3 | APIs | 12 | 3 | REST, GraphQL, gRPC, API design, versioning, documentation |
| 4 | Testing | 8 | 3 | Backend testing, integration testing, load testing, TDD |
| 5 | Infrastructure / DevOps | 12 | 3 | Servers, containers, CI/CD, cloud services, deployment |
| 6 | Security | 10 | 3 | Authentication, authorization, encryption, OWASP, secure coding |
| 7 | System Design | 10 | 3 | Architecture patterns, scalability, distributed systems, trade-offs |
| 8 | Performance | 8 | 3 | Caching, optimization, profiling, scaling, monitoring |
| 9 | Collaboration | 10 | 3 | Code review, communication, mentoring, documentation |

#### Career Ladder

| Step | Title | Min Level | Max Level | Typical Experience |
|------|-------|-----------|-----------|-------------------|
| 1 | Junior Backend Engineer | 0 | 2 | 0-2 years |
| 2 | Backend Engineer | 2 | 4 | 2-4 years |
| 3 | Senior Backend Engineer | 4 | 5 | 4-6 years |
| 4 | Lead Backend Engineer | 5 | 6 | 6-8 years |
| 5 | Principal Backend Engineer | 6 | 6 | 8-12 years |
| 6 | Backend Architect | 6 | 7 | 10-15 years |
| 7 | Engineering Manager (Backend) | 5 | 6 | 8-10 years (leadership track) |
| 8 | Director of Backend Engineering | 5 | 6 | 12-15 years |

**Files:**
- `src/lib/competency-models/backend-engineer.ts` — SKILLS, COMPETENCY_AREAS, LEVELS, CAREER_LADDER, SKILL_COUNT=31, PILLAR_COUNT=9

---

### 2.5 Full-Stack Engineer

**Role:** Full-Stack Engineer  
**Skills:** 37  
**Pillars:** 10  
**Career Ladder:** Junior → Full-Stack Engineer → Senior → Lead → Principal → Architect → Engineering Manager → Director  
**Region:** Global

#### Competency Areas (Pillars)

| # | Pillar | Weight | Skills | Description |
|---|--------|--------|--------|-------------|
| 1 | Frontend Development | 15 | 4 | HTML, CSS, JavaScript, React/Vue/Angular, state management |
| 2 | Backend Development | 15 | 4 | Server-side languages, APIs, business logic, authentication |
| 3 | Databases / Data | 12 | 3 | SQL, NoSQL, data modeling, ORMs, data pipelines |
| 4 | Infrastructure / Deployment | 10 | 3 | Cloud, containers, CI/CD, hosting, monitoring |
| 5 | Testing | 8 | 3 | Full-stack testing, integration testing, E2E, TDD |
| 6 | Architecture / System Design | 10 | 3 | System architecture, scalability, trade-offs, distributed systems |
| 7 | DevOps / CI/CD | 8 | 3 | Pipelines, automation, deployment strategies, infrastructure as code |
| 8 | Security | 7 | 2 | OWASP, authentication, authorization, secure coding |
| 9 | Performance | 7 | 2 | Frontend + backend performance, caching, optimization |
| 10 | Collaboration / Communication | 8 | 3 | Cross-functional teamwork, stakeholder communication, mentoring |

#### Career Ladder

| Step | Title | Min Level | Max Level | Typical Experience |
|------|-------|-----------|-----------|-------------------|
| 1 | Junior Full-Stack Engineer | 0 | 2 | 0-2 years |
| 2 | Full-Stack Engineer | 2 | 4 | 2-4 years |
| 3 | Senior Full-Stack Engineer | 4 | 5 | 4-6 years |
| 4 | Lead Full-Stack Engineer | 5 | 6 | 6-8 years |
| 5 | Principal Full-Stack Engineer | 6 | 6 | 8-12 years |
| 6 | Full-Stack Architect | 6 | 7 | 10-15 years |
| 7 | Engineering Manager (Full-Stack) | 5 | 6 | 8-10 years (leadership track) |
| 8 | Director of Engineering | 5 | 6 | 12-15 years |

**Files:**
- `src/lib/competency-models/full-stack-engineer.ts` — SKILLS, COMPETENCY_AREAS, LEVELS, CAREER_LADDER, SKILL_COUNT=37, PILLAR_COUNT=10

---

### 2.6 QA Engineer

**Role:** QA Engineer  
**Skills:** 29  
**Pillars:** 7  
**Career Ladder:** Junior → QA Engineer → Senior → Lead → Principal → Architect → Engineering Manager → Director of Quality  
**Region:** Global

#### Competency Areas (Pillars)

| # | Pillar | Weight | Skills | Description |
|---|--------|--------|--------|-------------|
| 1 | Testing Foundations | 18 | 5 | Testing theory, test design techniques, test cases, test plans, bug lifecycle |
| 2 | Test Automation | 20 | 5 | Selenium, Cypress, Playwright, automation frameworks, CI integration |
| 3 | API Testing | 12 | 3 | REST/GraphQL testing, Postman, API automation, contract testing |
| 4 | Performance Testing | 10 | 3 | Load testing, stress testing, performance monitoring, tools (JMeter, k6) |
| 5 | Security Testing | 10 | 3 | Security basics, OWASP, vulnerability scanning, penetration testing basics |
| 6 | Test Management Tools | 10 | 3 | Jira, TestRail, qTest, test management, traceability |
| 7 | Process / Collaboration | 10 | 3 | Agile QA, shift-left, CI/CD integration, developer collaboration, mentoring |

#### Career Ladder

| Step | Title | Min Level | Max Level | Typical Experience |
|------|-------|-----------|-----------|-------------------|
| 1 | Junior QA Engineer | 0 | 2 | 0-2 years |
| 2 | QA Engineer | 2 | 4 | 2-4 years |
| 3 | Senior QA Engineer | 4 | 5 | 4-6 years |
| 4 | Lead QA Engineer | 5 | 6 | 6-8 years |
| 5 | Principal QA Engineer | 6 | 6 | 8-12 years |
| 6 | QA Architect | 6 | 7 | 10-15 years |
| 7 | Engineering Manager (QA) | 5 | 6 | 8-10 years (leadership track) |
| 8 | Director of Quality Engineering | 5 | 6 | 12-15 years |

**Files:**
- `src/lib/competency-models/qa-engineer.ts` — SKILLS, COMPETENCY_AREAS, LEVELS, CAREER_LADDER, SKILL_COUNT=29, PILLAR_COUNT=7

---

## 3. Aggregator (index.ts)

All 5 engineering role models are aggregated in `src/lib/competency-models/index.ts`:

```typescript
// Exports
export const ROLE_COMPETENCY_MODELS: Record<string, RoleCompetencyModel>;
export const ROLE_SUMMARIES: RoleSummary[];
export function getRoleModel(roleId: string): RoleCompetencyModel;
export function getAllRoleIds(): string[];
export function getRoleSummary(roleId: string): RoleSummary;
export function getAllRoles(): RoleSummary[];
```

**Role Summary Structure:**
```typescript
interface RoleSummary {
  role: string;
  roleName: string;
  track: string | null;
  description: string;
  totalSkills: number;
  totalPillars: number;
  region: string;
}
```

**Current Role IDs:**
- `software-engineer` — 38 skills, 8 pillars
- `frontend-engineer` — 36 skills, 8 pillars
- `backend-engineer` — 31 skills, 9 pillars
- `full-stack-engineer` — 37 skills, 10 pillars
- `qa-engineer` — 29 skills, 7 pillars

**Total Built:** 171 skills across 5 roles, 78 pillars

---

## 4. Roadmap — Remaining Roles (Phase 2)

### 4.1 DevOps Engineer

**Skills:** ~25-30  
**Pillars:** 6-8  
**Career Ladder:** Junior → DevOps Engineer → Senior → Lead → Principal → Architect → Engineering Manager → Director  
**Focus Areas:** Cloud platforms (AWS/Azure/GCP), CI/CD, containerization (Docker/Kubernetes), infrastructure as code (Terraform), monitoring/observability, security, scripting, collaboration

### 4.2 Data Analyst

**Skills:** ~25-30  
**Pillars:** 6-7  
**Career Ladder:** Junior → Data Analyst → Senior → Lead → Principal → Manager → Director  
**Focus Areas:** Statistics, SQL, data visualization (Tableau/PowerBI/Looker), business intelligence, A/B testing, data storytelling, domain knowledge, collaboration

### 4.3 Data Engineer

**Skills:** ~25-30  
**Pillars:** 6-8  
**Career Ladder:** Junior → Data Engineer → Senior → Lead → Principal → Architect → Engineering Manager → Director  
**Focus Areas:** ETL/ELT, data pipelines, data warehousing, Spark, data modeling, data quality, cloud data services, streaming, collaboration

### 4.4 UX/UI Designer

**Skills:** ~20-25  
**Pillars:** 5-6  
**Career Ladder:** Junior → UX/UI Designer → Senior → Lead → Principal → Design Manager → Director  
**Focus Areas:** User research, interaction design, visual design, prototyping (Figma), usability testing, design systems, accessibility, collaboration

### 4.5 Engineering Manager

**Skills:** ~20-25  
**Pillars:** 5-6  
**Career Ladder:** Engineering Manager → Senior EM → Director → VP → CTO  
**Focus Areas:** People management, technical leadership, project management, stakeholder management, hiring, performance management, team building, strategic planning

### 4.6 Tech Lead

**Skills:** ~20-25  
**Pillars:** 5-6  
**Career Ladder:** Tech Lead → Senior Tech Lead → Principal → Architect  
**Focus Areas:** Technical leadership, architecture decisions, code review, mentoring, cross-team coordination, technical strategy, quality assurance

### 4.7 Scrum Master

**Skills:** ~15-20  
**Pillars:** 4-5  
**Career Ladder:** Scrum Master → Senior SM → Agile Coach → Director of Agile  
**Focus Areas:** Agile practices, facilitation, coaching, impediment removal, metrics, stakeholder management

### 4.8 Business Analyst

**Skills:** ~20-25  
**Pillars:** 5-6  
**Career Ladder:** BA → Senior BA → Lead BA → Principal → Manager → Director  
**Focus Areas:** Requirements gathering, process modeling, stakeholder analysis, documentation, data analysis, solution evaluation

### 4.9 Software Architect

**Skills:** ~20-25  
**Pillars:** 5-6  
**Career Ladder:** Architect → Senior Architect → Principal Architect → Chief Architect  
**Focus Areas:** System design, architecture patterns, technology selection, scalability, security architecture, technical strategy, documentation

**Total Remaining:** ~200 skills across 9 roles  
**Combined Total (Built + Roadmap):** ~370 skills across 14+ roles

---

## 5. Type System Alignment

All competency model types are defined in `src/types/index.ts`:

| Type | Purpose | Status |
|------|---------|--------|
| `SkillCategory` | Union of 46 skill categories (string) | ✅ Complete |
| `Skill` | Individual skill with id, name, description, category, level, evidence, aiConfidence, isAiInferred | ✅ Complete |
| `CompetencyArea` | Pillar with id, name, description, skills[], weight | ✅ Complete |
| `ProficiencyLevel` | 0-7 scale with label + description | ✅ Complete |
| `CareerLadderStep` | Role progression step with title, minLevel, maxLevel?, expected, description, typicalYearsOfExperience | ✅ Complete |
| `RoleCompetencyModel` | Complete role definition with skills, pillars, competencyAreas, levels, careerLadder, expectedLevels, totalSkills, totalPillars, region | ✅ Complete |
| `CompetencyPillar` | Pillar extended with aggregated skill data (for display) | ✅ Complete |
| `RoleSummary` | Lightweight role info for listings | ✅ Complete |

**Key Design Decisions:**
- `Skill.category` is `string` (not limited to `SkillCategory` union) — allows flexibility as new categories are added
- `CareerLadderStep.expected` is `Record<string, number>` (not `Record<SkillCategory, number>`) — allows flexible internal naming across roles
- `CompetencyArea.id` is `string` — allows any pillar ID format

---

## 6. Integration with Assessment Engine

**Flow:**
1. User selects target role → `getRoleModel(roleId)` loads full competency model
2. Assessment wizard displays all skills grouped by pillar (competencyAreas)
3. User self-rates each skill (0-7) → stored in `selfAssessment` object
4. User optionally provides experience descriptions → `aiInferenceInputs` array
5. Route handler calls `inferAllSkills()` (GPT-4o) if AI inputs present → returns inferred levels
6. `computeAssessmentResult()` merges AI levels over self-assessment:
   - For each skill: use AI-inferred level if available, else self-rated level
   - Compute pillar scores (weighted average of skill levels)
   - Compute overall score (weighted average of pillar scores)
   - Identify strengths (level ≥ 5), gaps (level < 3), missing skills (not rated)
   - Generate roadmap actions based on gaps

**Files:**
- `src/lib/scoring-engine.ts` — `computeAssessmentResult()`, `getSkillsByCategory()`
- `src/lib/competency-model.ts` — PM model, `inferAllSkills()`, `getSkillsByCategory()`
- `src/lib/competency-models/index.ts` — Multi-role aggregator

---

*End of Competency Models Specification v2.0*
