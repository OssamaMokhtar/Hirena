"use client";

import { Fragment, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { AssessmentInput } from "@/types";
import { computeAssessmentResult } from "@/lib/scoring-engine";
import { AssessmentWizard } from "@/components/assessment-wizard";
import { ResultsDashboard } from "@/components/results-dashboard";
import { RealTimeInterviewWizard } from "@/components/real-time-interview-wizard";
import { SOFTWARE_ROLES } from "@/lib/software-competency-model";

// Pre-computed demo assessment — realistic self-ratings across all 6 pillars
// for a Senior Product Manager in MENA, plus AI-inferred skill inferences
// so the dashboard renders isAiInferred badges and AI evidence text.
const DEMO_INPUT: AssessmentInput = {
  targetRole: "Senior Product Manager",
  targetTrack: "product-management",
  region: "MENA",
  selfAssessment: {
    "product-vision": 3,
    "business-strategy": 2,
    "market-analysis": 2,
    "competitive-analysis": 2,
    "pricing-strategy": 1,
    "go-to-market": 2,
    "customer-research": 3,
    "problem-validation": 3,
    "user-interviews": 2,
    "usability-testing": 1,
    "data-discovery": 2,
    "opportunity-assessment": 2,
    "agile-scrum": 4,
    "roadmapping": 3,
    "prioritization": 3,
    "stakeholder-management": 3,
    "execution-management": 3,
    "cross-functional-leadership": 2,
    "product-metrics": 3,
    "sql-data-querying": 1,
    "experimentation": 2,
    "analytics-tools": 2,
    "dashboarding": 2,
    "causal-inference": 1,
    "genai-fundamentals": 2,
    "ai-product-strategy": 2,
    "llm-applications": 1,
    "ai-ethics-governance": 1,
    "emerging-tech-awareness": 2,
    "team-leadership": 2,
    "executive-communication": 2,
    "pl-ownership": 1,
    "org-design-awareness": 1,
    "negotiation": 2,
  },
  aiInferenceInputs: [
    { skillId: "product-vision", description: "Led multiple product launches and defines quarterly vision documents aligned to company OKRs." },
    { skillId: "business-strategy", description: "Contributes to business case discussions and understands revenue models." },
    { skillId: "customer-research", description: "Runs weekly user interviews and synthesizes findings into insights docs." },
    { skillId: "agile-scrum", description: "Has run 20+ sprints, coaches junior PMs on ceremony, consistently ships within sprint goals." },
    { skillId: "prioritization", description: "Applies RICE and WSJF regularly, maintains a prioritized backlog with clear rationale." },
    { skillId: "llm-applications", description: "Shipped one RAG-based internal tool and understands chat vs embedding trade-offs." },
  ],
};

const DEMO_AI_INFERENCE_RESULTS: Record<
  string,
  { level: number; confidence: number; reasoning: string }
> = {
  "product-vision": {
    level: 3,
    confidence: 0.82,
    reasoning:
      "User has led multiple product launches and defines quarterly vision documents aligned to company OKRs. Shapes roadmap narrative for executive review — consistent with intermediate-to-advanced product vision.",
  },
  "business-strategy": {
    level: 2,
    confidence: 0.71,
    reasoning:
      "User contributes to business case discussions and understands revenue models, but does not own P&L or set company-level strategy independently — basic-to-intermediate.",
  },
  "customer-research": {
    level: 3,
    confidence: 0.88,
    reasoning:
      "User runs weekly user interviews, synthesizes findings into insights docs, and has used research to kill two proposed features — solid intermediate customer research practice.",
  },
  "agile-scrum": {
    level: 4,
    confidence: 0.93,
    reasoning:
      "User has run 20+ sprints as SM-adjacent, coaches junior PMs on ceremony, and consistently ships within sprint goals — advanced agile execution.",
  },
  "prioritization": {
    level: 3,
    confidence: 0.84,
    reasoning:
      "User applies RICE and WSJF regularly, maintains a prioritized backlog with clear rationale, and pushes back on stakeholder requests with data — intermediate-to-advanced.",
  },
  "llm-applications": {
    level: 2,
    confidence: 0.76,
    reasoning:
      "User has shipped one RAG-based internal tool and understands chat vs. embedding trade-offs, but has not productionized agentic workflows — basic-to-intermediate.",
  },
};

const DEMO_RESULT = computeAssessmentResult(DEMO_INPUT, "demo-user", DEMO_AI_INFERENCE_RESULTS);

export default function Home() {
  const [showAssessment, setShowAssessment] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [showVideoInterview, setShowVideoInterview] = useState(false);
  const [interviewResult, setInterviewResult] = useState<any>(null);
  const [selectedRole, setSelectedRole] = useState("software-engineer");

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const saved = localStorage.getItem("hirena_demo_result");
      if (saved) setResult(JSON.parse(saved));
    } catch {
      // ignore corrupt storage
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (result) {
        localStorage.setItem("hirena_demo_result", JSON.stringify(result));
      } else {
        localStorage.removeItem("hirena_demo_result");
      }
    } catch {
      // ignore storage errors
    }
  }, [result]);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 border-b border-border bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/80">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-md shadow-primary/20">
                <span className="text-lg font-bold text-primary-foreground">H</span>
              </div>
              <span className="text-lg font-bold text-foreground">Hirena</span>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="#vision"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                Vision
              </a>
              <a
                href="#how-it-works"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                How It Works
              </a>
              <a
                href="#video-interview"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                Video Interview
              </a>
              {showAssessment ? (
                <button
                  onClick={() => {
                    setShowAssessment(false);
                    setResult(null);
                  }}
                  className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary-dark transition-colors"
                >
                  Exit
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setShowAssessment(true)}
                    className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary-dark transition-colors"
                  >
                    See a demo assessment
                  </button>
                  <button
                    onClick={() => setShowAssessment(true)}
                    className="rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground shadow-sm hover:bg-secondary transition-colors"
                  >
                    Start Free Assessment
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="pt-16">
        {showAssessment && result ? (
          <ResultsDashboard result={result} />
        ) : showVideoInterview && interviewResult ? (
          <ResultsDashboard result={interviewResult} />
        ) : showVideoInterview ? (
          <RealTimeInterviewWizard
            targetRole={selectedRole}
            onComplete={setInterviewResult}
            onCancel={() => setShowVideoInterview(false)}
          />
        ) : showAssessment ? (
          <AssessmentWizard onComplete={setResult} />
        ) : (
          <>
            {/* Hero Section */}
            <section className="relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
                <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-accent/5 blur-3xl" />
              </div>

              <div className="mx-auto max-w-6xl px-4 py-24 sm:py-32">
                <div className="mx-auto max-w-3xl text-center">
                  {/* Logo */}
                  <div className="mb-8 flex items-center justify-center gap-3">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary shadow-xl shadow-primary/20">
                      <span className="text-2xl font-bold text-primary-foreground">H</span>
                    </div>
                    <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Hirena</h1>
                  </div>

                  {/* Tagline */}
                  <div className="mb-6">
                    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-sm font-medium text-foreground-muted">
                      <span className="flex h-2 w-2 rounded-full bg-success" />
                      Now in Public Beta
                    </span>
                  </div>

                  <h2 className="mb-6 text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
                    Know where you stand.
                    <br />
                    See what's next.
                    <br />
                    Get there.
                  </h2>

                  <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-foreground-muted">
                    Hirena is an AI-powered skills assessment and career development platform.
                    Assess your skills against target roles, benchmark against the market,
                    and get a personalized roadmap to accelerate your career.
                  </p>

                  {/* CTA */}
                  <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                    <button
                      onClick={() => {
                        setResult(DEMO_RESULT);
                        setShowAssessment(true);
                      }}
                      className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary-dark hover:shadow-xl transition-all duration-200 active:scale-[0.98]"
                    >
                      See a demo assessment
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 5.136l-3.197-3.197a1.25 1.25 0 00-1.768 0L6.864 10.803m0 0l3.197 3.197m-3.197-3.197h12.588a1.25 1.25 0 011.768 1.768L14.752 19.136" />
                      </svg>
                    </button>
                    <a
                      href="#vision"
                      className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-8 py-4 text-lg font-medium text-foreground shadow-sm hover:bg-secondary hover:shadow-md transition-all duration-200"
                    >
                      Explore the Vision
                    </a>
                  </div>

                  {/* Trust indicators */}
                  <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-foreground-muted">
                    <div className="flex items-center gap-2">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <span>Your data is private</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Takes 5-10 minutes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.5 17.656 7.343A8 8 0 0120 13a8 8 0 01-1.343 5.657z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.297 1.536.879 2.121z" />
                      </svg>
                      <span>AI-powered insights</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Vision Section */}
            <section id="vision" className="border-t border-border bg-surface/30">
              <div className="mx-auto max-w-6xl px-4 py-24">
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold text-foreground">Our Vision</h2>
                  <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground-muted">
                    Building the most intelligent career development platform for professionals who refuse to settle for guesswork.
                  </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-2 lg:grid-cols-3">
                  <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary text-lg font-bold">
                      1
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Precision Assessment</h3>
                    <p className="mt-2 text-foreground-muted">
                      Hybrid AI + self-assessment that goes beyond what you claim to understand what you actually do.
                      Evidence-based scoring with confidence indicators.
                    </p>
                  </div>

                  <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary text-lg font-bold">
                      2
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Market Benchmarking</h3>
                    <p className="mt-2 text-foreground-muted">
                      Compare yourself against regional and role-specific benchmarks.
                      Know where you stand relative to the market — not just in a vacuum.
                    </p>
                  </div>

                  <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary text-lg font-bold">
                      3
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Personalized Roadmap</h3>
                    <p className="mt-2 text-foreground-muted">
                      Get a structured development plan with immediate, intermediate, and long-term actions.
                      Not generic advice — your specific gaps, your target role, your path.
                    </p>
                  </div>

                  <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary text-lg font-bold">
                      4
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Curated Learning</h3>
                    <p className="mt-2 text-foreground-muted">
                      Curated, high-quality learning resources mapped to your specific gaps.
                      Articles, courses, videos, books — vetted for practical value, not just popularity.
                    </p>
                  </div>

                  <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary text-lg font-bold">
                      5
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Regional Intelligence</h3>
                    <p className="mt-2 text-foreground-muted">
                      Benchmarks and recommendations tailored to MENA, APAC, North America, and EMEA.
                      Your market context shapes your assessment.
                    </p>
                  </div>

                  <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary text-lg font-bold">
                      6
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">MENA-First, Global-Ready</h3>
                    <p className="mt-2 text-foreground-muted">
                      Built for the Middle East & North Africa market with global standards.
                      Bilingual Arabic/English, regional benchmarks, local relevance.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Video Interview Section — Option 1 */}
            <section id="video-interview" className="border-t border-border bg-background">
              <div className="mx-auto max-w-6xl px-4 py-24">
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold text-foreground">Video Interview Assessment</h2>
                  <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground-muted">
                    Practice with an AI mentor who asks real interview questions and analyzes your video responses.
                    Get instant feedback on technical accuracy, communication, and problem-solving approach.
                  </p>
                </div>

                <div className="mx-auto max-w-xl">
                  {/* Role selector */}
                  <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
                    <label className="block text-sm font-medium text-foreground mb-3">
                      Select your role for tailored questions:
                    </label>
                    <select
                      value={selectedRole}
                      onChange={(e) => {
                        setSelectedRole(e.target.value);
                        setShowVideoInterview(false);
                      }}
                      className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                      {Object.entries(SOFTWARE_ROLES).map(([key, role]) => (
                        <option key={key} value={key}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <Button
                    onClick={() => setShowVideoInterview(true)}
                    className="w-full mt-4"
                    size="lg"
                  >
                    <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 10.552a14.03 14.03 0 01-3.503 1.383l-7.003 7.003a14.03 14.03 0 01-1.95 0l-3.478-3.478a14.03 14.03 0 010-1.95l7.003-7.003a14.03 14.03 0 011.383-3.503l-3.478-3.478a14.03 14.03 0 011.95-1.95l3.478 3.478a14.03 14.03 0 013.503-1.383l7.003-7.003a14.03 14.03 0 014.886 0l7.003 7.003a14.03 14.03 0 011.383 3.503l-3.478 3.478a14.03 14.03 0 010 1.95l7.003 7.003a14.03 14.03 0 01-1.383 3.503l-7.003 7.003a14.03 14.03 0 01-3.503-1.383l3.478-3.478a14.03 14.03 0 01-1.95 0l-7.003-7.003a14.03 14.03 0 01-3.503-1.383l-3.478 3.478a14.03 14.03 0 010 1.95l-7.003 7.003a14.03 14.03 0 011.383 3.503z" />
                    </svg>
                    Start Video Interview
                  </Button>
                  <p className="mt-3 text-center text-sm text-foreground-muted">
                    5 questions · 10-15 minutes · AI-powered analysis
                  </p>
                </div>
              </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="border-t border-border bg-background">
              <div className="mx-auto max-w-6xl px-4 py-24">
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold text-foreground">How It Works</h2>
                  <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground-muted">
                    Four simple steps to deep career insights powered by AI.
                  </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-4">
                  {[
                    {
                      step: "01",
                      title: "Create Your Profile",
                      description: "Tell us about your current role, experience, industry, and career goals. Quick and lightweight — we only ask what matters.",
                    },
                    {
                      step: "02",
                      title: "Set Your Goal",
                      description: "Choose your target role (e.g., Director of Product) and region. This becomes your benchmark — the standard we measure against.",
                    },
                    {
                      step: "03",
                      title: "Assess Your Skills",
                      description: "Rate yourself across 30+ PM skills using our 0-5 proficiency scale. Then let AI analyze your experience descriptions for an objective read. Takes 5-10 minutes.",
                    },
                    {
                      step: "04",
                      title: "Get Your Roadmap",
                      description: "Receive your overall score, skill ranking, gap analysis, personalized development roadmap, and curated learning resources. All tailored to your target role and region.",
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="relative">
                      {/* Connector line */}
                      {idx < 3 && (
                        <div className="absolute top-8 left-1/2 h-0.5 w-full -translate-x-1/2 bg-border" />
                      )}

                      <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground text-2xl font-bold shadow-md shadow-primary/20">
                          {item.step}
                        </div>
                        <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                        <p className="mt-2 text-foreground-muted">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Assessment Flow Preview */}
                <div className="mt-16 rounded-2xl border border-border bg-surface p-8 shadow-lg shadow-black/5">
                  <h3 className="text-center text-xl font-semibold text-foreground">Assessment Flow Preview</h3>
                  <p className="mt-2 text-center text-foreground-muted">
                    Here's what your assessment experience looks like
                  </p>

                  <div className="mt-8 grid gap-6 lg:grid-cols-3">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary text-lg font-bold">
                        1
                      </div>
                      <div>
                        <div className="font-medium text-foreground">Self-Assessment</div>
                        <div className="text-sm text-foreground-muted mt-1">
                          Rate your proficiency across all PM skills. Quick, intuitive, honest.
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary text-lg font-bold">
                        2
                      </div>
                      <div>
                        <div className="font-medium text-foreground">AI Inference</div>
                        <div className="text-sm text-foreground-muted mt-1">
                          Describe your experience for key skills. AI analyzes and provides an objective assessment with evidence.
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary text-lg font-bold">
                        3
                      </div>
                      <div>
                        <div className="font-medium text-foreground">Combined Score</div>
                        <div className="text-sm text-foreground-muted mt-1">
                          Self-assessment + AI inference = a complete, nuanced picture of your skills.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* PM Competency Model Section */}
            <section id="competency-model" className="border-t border-border bg-surface/30">
              <div className="mx-auto max-w-6xl px-4 py-24">
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold text-foreground">PM Competency Model</h2>
                  <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground-muted">
                    The Six Pillars of Product Management excellence that we assess.
                  </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-2 lg:grid-cols-3">
                  {[
                    {
                      category: "Strategy",
                      weight: "20%",
                      color: "bg-primary",
                      description: "Product vision, business strategy, market analysis, competitive intelligence, and strategic thinking.",
                      skills: 6,
                    },
                    {
                      category: "Discovery",
                      weight: "20%",
                      color: "bg-warning",
                      description: "Customer research, problem validation, user interviews, usability testing, and data-driven opportunity identification.",
                      skills: 6,
                    },
                    {
                      category: "Delivery",
                      weight: "25%",
                      color: "bg-success",
                      description: "Agile/Scrum, roadmapping, prioritization, stakeholder management, execution, and cross-functional leadership.",
                      skills: 6,
                    },
                    {
                      category: "Analytics",
                      weight: "15%",
                      color: "bg-info",
                      description: "Product metrics, SQL/data querying, experimentation (A/B testing), analytics tools, and causal inference.",
                      skills: 6,
                    },
                    {
                      category: "AI & Emerging Tech",
                      weight: "10%",
                      color: "bg-accent",
                      description: "GenAI fundamentals, AI product strategy, LLM applications, AI ethics & governance, emerging tech awareness.",
                      skills: 5,
                    },
                    {
                      category: "Leadership & Influence",
                      weight: "10%",
                      color: "bg-secondary",
                      description: "Team leadership, executive communication, P&L ownership, organizational design, and negotiation.",
                      skills: 5,
                    },
                  ].map((pillar, idx) => (
                    <div key={idx} className="rounded-xl border border-border bg-surface p-6 shadow-sm">
                      <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-foreground">{pillar.category}</h3>
                        <span className={cn("text-sm font-medium px-2 py-1 rounded-full", pillar.color)}>
                          {pillar.weight} weight
                        </span>
                      </div>
                      <p className="text-foreground-muted">{pillar.description}</p>
                      <div className="mt-4 flex items-center gap-2 text-sm text-foreground-muted">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        <span>{pillar.skills} skills assessed</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Career Ladder */}
                <div className="mt-16">
                  <h3 className="text-2xl font-bold text-center text-foreground">PM Career Ladder</h3>
                  <p className="mt-2 text-center text-foreground-muted">
                    Target roles with expected proficiency levels by competency area
                  </p>

                  <div className="mt-8 overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
                    <div className="grid grid-cols-12 gap-4 p-6 text-sm">
                      <div className="col-span-3 font-semibold text-foreground">Role</div>
                      <div className="col-span-3 font-semibold text-foreground">Strategy</div>
                      <div className="col-span-3 font-semibold text-foreground">Discovery</div>
                      <div className="col-span-3 font-semibold text-foreground">Delivery</div>

                      {[
                        { role: "Associate PM", strategy: 2, discovery: 2, delivery: 2 },
                        { role: "Product Manager", strategy: 3, discovery: 3, delivery: 3 },
                        { role: "Senior PM", strategy: 3, discovery: 3, delivery: 4 },
                        { role: "Lead PM", strategy: 3, discovery: 3, delivery: 4 },
                        { role: "Group PM", strategy: 4, discovery: 3, delivery: 4 },
                        { role: "Director of Product", strategy: 4, discovery: 3, delivery: 4 },
                        { role: "VP Product", strategy: 5, discovery: 3, delivery: 4 },
                        { role: "CPO", strategy: 5, discovery: 3, delivery: 4 },
                      ].map((row, idx) => (
                        <Fragment key={idx}>
                          <div className="col-span-3 py-3 border-b border-border text-foreground">
                            {row.role}
                          </div>
                          <div className="col-span-3 py-3 border-b border-border flex items-center gap-2">
                            <div className="flex-1 h-2 rounded-full bg-secondary">
                              <div
                                className="h-full rounded-full bg-primary"
                                style={{ width: `${(row.strategy / 5) * 100}%` }}
                              />
                            </div>
                            <span className="text-xs font-medium text-foreground-muted">{row.strategy}/5</span>
                          </div>
                          <div className="col-span-3 py-3 border-b border-border flex items-center gap-2">
                            <div className="flex-1 h-2 rounded-full bg-secondary">
                              <div
                                className="h-full rounded-full bg-warning"
                                style={{ width: `${(row.discovery / 5) * 100}%` }}
                              />
                            </div>
                            <span className="text-xs font-medium text-foreground-muted">{row.discovery}/5</span>
                          </div>
                          <div className="col-span-3 py-3 border-b border-border flex items-center gap-2">
                            <div className="flex-1 h-2 rounded-full bg-secondary">
                              <div
                                className="h-full rounded-full bg-success"
                                style={{ width: `${(row.delivery / 5) * 100}%` }}
                              />
                            </div>
                            <span className="text-xs font-medium text-foreground-muted">{row.delivery}/5</span>
                          </div>
                        </Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="border-t border-border bg-background">
              <div className="mx-auto max-w-4xl px-4 py-24 text-center">
                <div className="mx-auto max-w-2xl">
                  <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
                    Ready to understand your career potential?
                  </h2>
                  <p className="mt-4 text-lg text-foreground-muted">
                    Join hundreds of professionals who are using Hirena to assess their skills,
                    identify gaps, and build a clearer path to their target role.
                  </p>

                  <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                    <button
                      onClick={() => {
                        setResult(DEMO_RESULT);
                        setShowAssessment(true);
                      }}
                      className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary-dark hover:shadow-xl transition-all duration-200 active:scale-[0.98]"
                    >
                      See a demo assessment
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 5.136l-3.197-3.197a1.25 1.25 0 00-1.768 0L6.864 10.803m0 0l3.197 3.197m-3.197-3.197h12.588a1.25 1.25 0 011.768 1.768L14.752 19.136" />
                      </svg>
                    </button>
                  </div>

                  <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-foreground-muted">
                    <span>Free to use</span>
                    <span>·</span>
                    <span>No account required to start</span>
                    <span>·</span>
                    <span>Your data stays private</span>
                    <span>·</span>
                    <span>Takes 5-10 minutes</span>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-bold">
                H
              </div>
              <span className="text-sm font-medium text-foreground">Hirena</span>
            </div>
            <div className="text-sm text-foreground-muted">
              © 2026 Hirena. Built with ❤️ for career-driven professionals.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
