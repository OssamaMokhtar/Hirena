# Hirena — Product Requirements Document (PRD)

**Version:** 2.0  
**Last Updated:** September 12, 2026  
**Project Lead:** Ossama Mokhtar  
**Status:** Active Development  

---

## 1. Executive Summary

**Hirena** is an AI-powered skills assessment and career development platform for the MENA region. It helps individual professionals assess their skills, identify gaps, build personalized learning roadmaps, and practice real-time interview skills through AI avatar mentorship.

**Value Proposition:** "Know your skills. Understand your gaps. Grow your career." — the first AI-powered career development tool built for MENA professionals with bilingual (Arabic/English) support and regional benchmarks.

---

## 2. Problem Statement

**Current State:**
- Professionals lack objective, AI-powered skill assessments tailored to their region and career stage
- Career development tools are fragmented — assessment, interview practice, and roadmap planning are separate
- MENA professionals have no localized benchmarks; global tools don't reflect regional market realities
- Interview preparation is mostly static (pre-written questions) — no real-time practice with AI feedback
- Skill gaps are identified too late (after hiring or promotion decisions)

**User Pain Points:**
1. "I don't know where I stand" — no objective skill assessment
2. "I don't know what to learn next" — no personalized roadmap
3. "I'm nervous about interviews" — no real practice with feedback
4. "Global tools don't reflect my market" — no MENA-specific benchmarks
5. "I need Arabic support" — few tools offer bilingual UX

---

## 3. Product Vision

**Vision Statement:**
"To become the leading AI-powered career development platform for MENA professionals — the go-to tool for objective skills assessment, personalized growth roadmaps, and real-time interview practice."

**Mission:**
"Empower every professional in MENA to understand their skills, identify gaps, and build a personalized path to career growth through AI-powered assessment and practice."

**North Star Metric:**
Professionals who complete their first assessment and receive a personalized roadmap.

---

## 4. Target Users

### Primary Users (B2C)
| Segment | Description |
|---------|-------------|
| **Early Career Professionals** | 0-3 years experience, exploring career paths, building foundational skills |
| **Mid-Career Professionals** | 3-10 years, seeking promotion, upskilling, career pivots |
| **Senior Professionals** | 10+ years, leadership roles, staying current with industry trends |
| **Job Seekers** | Preparing for interviews, assessing fit for target roles |
| **Students/Recent Grads** | Entering job market, understanding skill requirements |

### Secondary Users (Future B2B)
| Segment | Description |
|---------|-------------|
| **HR/Talent Teams** | Assessing candidates, identifying skill gaps in teams |
| **L&D Teams** | Personalizing learning paths, measuring skill development |
| **Managers** | Understanding team skills, planning career development |

---

## 5. Core Features (Phase 1 — MVP)

### 5.1 Assessment Wizard

**Purpose:** Guide users through a structured skill assessment process

**User Flow:**
1. **Step 1: Profile Setup**
   - Select current role (from 14+ software roles)
   - Select years of experience (dropdown: 0-1, 1-3, 3-5, 5-10, 10+)
   - Select region (MENA, APAC, NA, EMEA)
   - [Optional] Upload resume/CV for AI parsing (Phase 2)

2. **Step 2: Goal Setting**
   - Select target role (from available roles)
   - Select target track (if applicable)
   - Set career goal: "Get promoted", "Switch roles", "Learn new skills", "Prepare for interview"

3. **Step 3: Self-Assessment**
   - Present all skills for selected role (grouped by competency pillar)
   - User rates each skill: 0 (none) to 7 (authority/expert)
   - Inline tooltips for skill descriptions
   - Progress bar showing completion
   - Skip unavailable skills option

4. **Step 4: AI Skill Analysis**
   - For skills rated 3+, prompt: "Briefly describe your experience with [skill]"
   - Text input (optional — user can skip)
   - When submitted, route calls OpenAI GPT-4o to infer actual proficiency level
   - Compare AI-inferred level vs self-rated level
   - Highlight discrepancies (potential over/under-estimation)

5. **Step 5: Review & Submit**
   - Summary of self-assessment + AI inferences
   - Confirm accuracy
   - Submit → triggers assessment result calculation

**Acceptance Criteria:**
- [ ] User can complete 5-step wizard without errors
- [ ] Self-assessment persists across steps (localStorage or state)
- [ ] AI skill analysis works when OpenAI key available; gracefully degrades when not
- [ ] Submit produces assessment result with score, gaps, roadmap
- [ ] Results persist to localStorage for demo (key: `hirena-demo-result`)
- [ ] Bilingual support: wizard content available in Arabic and English

### 5.2 Results Dashboard

**Purpose:** Display assessment results in a clear, actionable format

**Components:**
1. **Overall Score**
   - Score: 0-100
   - Score bars or gauge visualization
   - Interpretation: "Beginner" (0-25), "Developing" (25-50), "Proficient" (50-75), "Advanced" (75-100)

2. **Competency Breakdown**
   - Grouped by competency pillar (4-10 pillars per role)
   - Per-pillar score with color-coded bars
   - Click to expand: list of skills in pillar with self-rated vs AI-inferred levels

3. **Skill Ranking**
   - Sorted by proficiency (highest → lowest)
   - Show: skill name, self-rated level, AI-inferred level (if available), gap
   - Visual indicators: green (strength), yellow (on track), red (gap)

4. **Gap Analysis**
   - Top 5 gaps ranked by priority:
     - Priority score = gap size × role importance × career goal relevance
     - For each gap: skill name, current level, target level, why it matters
   - "Missing skills" — skills in role model user hasn't rated

5. **Roadmap Actions**
   - Generated from gaps + career goal
   - Three buckets:
     - **Immediate** (next 1-3 months): foundational skills, quick wins
     - **Intermediate** (3-6 months): core skills for target role
     - **Long-term** (6-12 months): advanced skills, specialization
   - Each action: title, description, suggested resources (links to courses/articles), estimated time

**Acceptance Criteria:**
- [ ] Overall score displays correctly (0-100 scale)
- [ ] Competency breakdown shows all pillars for role
- [ ] Skill ranking is sortable and filterable
- [ ] Gap analysis highlights at least 3 gaps with priority
- [ ] Roadmap shows 3+ actions per bucket
- [ ] Results can be shared (Phase 2: LinkedIn, PDF export)

### 5.3 Multi-Role Competency Models

**Purpose:** Define the skill framework for assessing any software professional role

**Built Roles (Phase 1 Target):**
1. **Product Manager** (MVP launch — 35 skills, 6 pillars)
   - Strategy, Discovery, Delivery, Analytics, AI, Leadership
   - Career ladder: APM → PM → Senior PM → Group PM → Director → VP → CPO

2. **Software Engineer** (built — 38 skills, 8 pillars)
   - Tech Foundation, Languages, DevOps Tools, Testing, Engineering Practices, Collaboration, Architecture, Data
   - Career ladder: Junior → Software Engineer → Senior → Lead → Principal → Engineering Manager → Director → VP → CTO

3. **Frontend Engineer** (built — 36 skills, 8 pillars)
   - Frontend Fundamentals, Frameworks/Libraries, CSS Styling, Web Essentials, Testing, Performance Optimization, Accessibility, Collaboration
   - Career ladder: Junior → Frontend Engineer → Senior → Lead → Principal → Architect → Engineering Manager → Director

4. **Backend Engineer** (built — 31 skills, 9 pillars)
   - Programming Languages, Databases, APIs, Testing, Infrastructure/DevOps, Security, System Design, Performance, Collaboration
   - Career ladder: Junior → Backend Engineer → Senior → Lead → Principal → Architect → Engineering Manager → Director

5. **Full-Stack Engineer** (built — 37 skills, 10 pillars)
   - Frontend, Backend, Databases/Data, Infrastructure/Deployment, Testing, Architecture/System Design, DevOps/CD, Security, Performance, Collaboration
   - Career ladder: Junior → Full-Stack → Senior → Lead → Principal → Architect → Engineering Manager → Director

6. **QA Engineer** (built — 29 skills, 7 pillars)
   - Testing Foundations, Test Automation, API Testing, Performance Testing, Security Testing, Test Management Tools, Process/Collaboration
   - Career ladder: Junior → QA Engineer → Senior → Lead → Principal → Architect → Engineering Manager → Director of Quality

**Skill Structure:**
```typescript
interface Skill {
  id: string;                    // Unique identifier (e.g., "programming-languages")
  name: string;                  // Display name (e.g., "Programming Languages")
  description: string;           // Brief description
  category: string;              // Pillar ID (e.g., "engineering-practices")
  level: number;                 // 0-7 proficiency scale
  evidence?: string;             // User's experience description (from AI analysis)
  aiConfidence?: number;         // 0-1, how confident AI is in inference
  isAiInferred?: boolean;        // Whether level came from AI vs self-rating
}

interface CompetencyArea {
  id: string;                    // Pillar ID
  name: string;                  // Pillar name
  description: string;           // Pillar description
  skills: string[];              // Skill IDs in this pillar
  weight: number;                // 0-100, relative importance
}

interface CareerLadderStep {
  title: string;                 // Role title (e.g., "Senior Software Engineer")
  minLevel: number;              // Minimum proficiency (0-7)
  maxLevel?: number;             // Maximum proficiency (optional)
  expected: Record<string, number>; // Per-skill expected levels at this step
  description: string;           // Role expectations
  typicalYearsOfExperience: string; // e.g., "3-5 years"
}
```

**Acceptance Criteria:**
- [ ] All 6 roles have complete skill catalogs (no empty skills arrays)
- [ ] Each role has 4-10 competency pillars
- [ ] Each role has career ladder with 5-8 steps
- [ ] Skills have id, name, description, category, level
- [ ] Competency areas have id, name, description, skills[], weight
- [ ] Types fully defined in `src/types/index.ts`

### 5.4 Bilingual Support (Arabic/English)

**Purpose:** Serve MENA users in their preferred language

**Implementation:**
- UI strings in both Arabic and English
- Language toggle in header
- RTL layout support for Arabic
- All user-facing content bilingual (assessment questions, results, roadmap)

**Acceptance Criteria:**
- [ ] Language toggle switches all UI text between AR and EN
- [ ] Arabic text renders RTL when Arabic selected
- [ ] Assessment wizard content available in both languages
- [ ] Results dashboard content available in both languages
- [ ] Roadmap actions available in both languages (Phase 2: translated content)

### 5.5 Regional Benchmarks (MENA-First)

**Purpose:** Show users how their skills compare to regional peers

**Rolled Out:**
- PM role: MENA benchmarks for 35 skills (average, top quartile, median per skill)
- Displayed in results dashboard: "Your level vs. MENA average for [skill]"

**Future (Phase 2):**
- Expand benchmarks to all 14+ roles
- Add APAC, NA, EMEA benchmarks for comparison

**Acceptance Criteria:**
- [ ] PM role shows MENA benchmarks for all 35 skills
- [ ] Benchmarks displayed in results dashboard
- [ ] Data is realistic (sourced from market research or estimated from available data)

---

## 6. Phase 2 Features (Expansion)

### 6.1 User Accounts & Profiles

**Purpose:** Enable persistent user data, assessment history, progress tracking

**Features:**
- Sign up / sign in (email + password, or OAuth with Google)
- User profile: name, email, current role, experience, region, career goals
- Assessment history: list of all past assessments with dates, scores
- Progress tracking: compare current vs past assessments, show skill trajectory
- Settings: language preference, notification preferences

**Components:**
- Auth service (Supabase auth)
- Profile storage (Supabase DB)
- Assessment history storage
- Progress tracking visualization

### 6.2 Career Path Visualization

**Purpose:** Show users their career progression path within a role

**Features:**
- Visual ladder: Junior → Senior → Lead → Principal → Manager → Director → VP → CTO
- Per level: required skills (with target proficiency), typical years of experience
- Current level indicator (based on assessment)
- Gap to next level: which skills need improvement, by how much
- Click on level to see detailed expectations

### 6.3 Learning Content Library

**Purpose:** Provide curated learning resources for skill development

**Features:**
- Per-skill resources: articles, courses, videos, books, podcasts
- Sources: internal curation, partner content (Coursera, Udemy, edX, LinkedIn Learning, Arabic platforms)
- Search/filter by skill, role, proficiency level
- Save/bookmark resources
- Track completed resources

### 6.4 Mentor Matching (Optional)

**Purpose:** Connect users with mentors for specific skills

**Features:**
- Browse mentors by skill, experience level, industry
- Request mentorship (InMail-style or scheduling)
- AI-suggested mentors based on user's gaps and goals

### 6.5 Interview Practice Enhancement

**Purpose:** Upgrade real-time interview from simulated to real AI-powered

**Features:**
- GPT-4o Vision: analyze video frames for real facial analysis
- Whisper/GPT-4o Audio: transcribe + analyze voice for real voice analysis
- Avatar integration: D-ID or HeyGen API for realistic talking avatar
- Real-time feedback: during interview, show confidence indicator, speaking pace, suggested follow-up
- Two-way conversation: avatar asks questions, user responds via voice/video, real-time analysis

### 6.6 Shareable Reports

**Purpose:** Enable users to share their assessment results

**Features:**
- Generate shareable URL or PDF report
- LinkedIn sharing: "I just assessed my skills on Hirena — here's my roadmap"
- Social proof: showcase skills, career goals, progress

---

## 7. Phase 3 Features (Advanced / Optional)

### 7.1 Real-Time Two-Way Voice Conversation

**Purpose:** Fully conversational interview practice with real-time audio

**Features:**
- WebSocket-based real-time voice streaming
- Avatar speaks via voice AI (TTS), user responds via voice
- Continuous voice + facial analysis during conversation
- Real-time feedback overlay
- Advanced conversation state management (multi-turn dialogue, context-aware follow-ups)

### 7.2 Advanced AI Features

**Features:**
- AI-generated interview questions tailored to role + user's gaps
- AI feedback on interview response quality (content analysis via GPT-4o)
- AI career coach: conversational guidance on career decisions
- Resume/CV AI parsing and scoring (Phase 2-3)

### 7.3 Enterprise/B2B Expansion (Future)

**Features (Out of Scope for MVP):**
- Team assessment: managers assess their team's skills
- Internal talent marketplace: internal mobility, gig matching
- Talent sourcing: find candidates by skill
- Enterprise integrations: ATS, HRIS, LMS
- Anti-cheating / proctored assessments
- Diversity analytics

---

## 8. Non-Functional Requirements

### Performance
- Landing page loads in < 2 seconds (LCP < 2.5s)
- Assessment wizard steps respond in < 500ms
- API calls complete in < 5 seconds (AI inference may take longer — show loading state)
- Real-time interview latency < 500ms for avatar response

### Reliability
- Demo works without API credits (pre-computed results)
- Graceful degradation when OpenAI unavailable (self-assessment only path)
- Error handling for all API calls with user-friendly messages

### Security
- No sensitive user data stored client-side beyond localStorage demo
- API keys not exposed to client (server-side only)
- Future: secure auth with Supabase, encrypted user data

### Accessibility
- WCAG 2.1 AA target
- Keyboard navigation for wizard
- Screen reader support for results dashboard
- Color contrast ratios met

### Internationalization
- Arabic (ar) and English (en) UI strings
- RTL layout for Arabic
- Region-specific content (MENA benchmarks)

---

## 9. Success Metrics

### Phase 1 (MVP Launch)
| Metric | Target |
|--------|--------|
| Landing page visits | 1,000 in first month |
| Assessment completions | 100 in first month |
| Demo activation rate | > 30% of visitors click "See a demo" |
| Assessment completion rate | > 50% of users who start wizard complete it |
| User satisfaction (post-assessment survey) | > 4.0/5.0 average |
| Bilingual usage | > 20% of users choose Arabic |

### Phase 2 (Growth)
| Metric | Target |
|--------|--------|
| Registered users | 5,000+ |
| Assessment completions | 2,000+ |
| Weekly active users | 500+ |
| Career roadmap saves | 1,000+ |
| Shareable report shares | 500+ |
| User retention (30-day) | > 20% |
| Mentor matches (if launched) | 100+ |

### Phase 3 (Scale)
| Metric | Target |
|--------|--------|
| Total users | 50,000+ |
| Monthly active users | 10,000+ |
| Assessment completions | 10,000+ |
| Interview practice sessions | 5,000+ |
| B2B customers (future) | 10+ companies |

---

## 10. Out of Scope (Explicitly)

- **Resume/CV parsing and scoring** — Phase 2-3 feature
- **Internal talent marketplace** — B2B enterprise feature, not B2C MVP
- **Talent sourcing / candidate database** — B2B feature
- **Enterprise integrations (ATS/HRIS/LMS)** — B2B feature
- **Anti-cheat / proctored assessments** — B2B feature
- **Diversity and bias analytics** — future consideration
- **Compensation/salary data** — Phase 2-3 enhancement
- **Mentor marketplace** — Phase 2 enhancement
- **Two-way real-time voice conversation (Option 3)** — Phase 3, optional
- **Gamification (badges, streaks, leaderboards)** — Phase 3, optional
- **Mobile app** — web-only for MVP

---

## 11. Appendix

### A. Competency Model Reference

See [Competency Models Documentation](./competency-models.md) for full specification.

### B. API Reference

See [API Reference](./api-reference.md) for endpoint specifications.

### C. Architecture Diagrams

See [Architecture Overview](./architecture-overview.html) for visual diagrams.

See [Data Flow Diagrams](./data-flows.md) for detailed flow documentation.

### D. Market Research

See [Market Research Report](./market-research.md) for competitive analysis and market context.

### E. Roadmap

See [Roadmap](./roadmap.md) for phased delivery plan.

### F. Known Limitations

1. **No real AI integration** — voice/facial/fusion APIs are simulated. Need OpenAI credits for real integration.
2. **No user accounts** — demo uses localStorage only. Supabase auth not wired.
3. **5 of 14+ roles built** — 9 roles in roadmap need full competency model implementation.
4. **Facial analysis risk** — carries bias risk (HireVue dropped it in 2021). Hirena treats it as optional/experimental with disclaimer.
5. **No curated learning content** — roadmap actions suggest generic resources; Phase 2 adds curated library.

---

*End of PRD v2.0*
