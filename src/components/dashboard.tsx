"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { REGIONS } from "@/lib/competency-model";
import { formatScore, getScoreColor } from "@/lib/utils";

interface DashboardProps {
  score: number;
  competencyScores: Record<string, number>;
  strengths: string[];
  gaps: Array<{ skill: string; level: number; target: number; priority: string }>;
  missingSkills: string[];
  roadmap: {
    immediate: string[];
    intermediate: string[];
    longTerm: string[];
  };
  resources: Array<{ title: string; url: string; type: string; time: string }>;
}

export function Dashboard({
  score,
  competencyScores,
  strengths,
  gaps,
  missingSkills,
  roadmap,
  resources,
}: DashboardProps) {
  const [activeSection, setActiveSection] = useState<string>("overview");

  const sections = [
    { id: "overview", label: "Overview" },
    { id: "strengths", label: "Strengths" },
    { id: "gaps", label: "Gaps" },
    { id: "roadmap", label: "Roadmap" },
    { id: "resources", label: "Resources" },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    if (score >= 40) return "text-foreground";
    return "text-error";
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return "bg-success/10";
    if (score >= 60) return "bg-warning/10";
    if (score >= 40) return "bg-secondary/50";
    return "bg-error/10";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/80">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-md shadow-primary/20">
                <span className="text-lg font-bold text-primary-foreground">H</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">Hirena</h1>
                <p className="text-xs text-foreground-muted">Skills Assessment Dashboard</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 rounded-lg bg-surface px-3 py-1.5 text-sm">
                <span className="text-foreground-muted">Region:</span>
                <Select value="MENA" onValueChange={() => {}}>
                  <SelectTrigger className="w-auto p-0 text-foreground hover:bg-transparent">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {REGIONS.map((region) => (
                      <SelectItem key={region.value} value={region.value}>
                        {region.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button variant="ghost" size="sm">
                Share Results
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Assessment Results</h1>
          <p className="mt-1 text-foreground-muted">
            Product Management Track · Senior Product Manager Target · MENA Region
          </p>
        </div>

        {/* Score Card */}
        <Card className="mb-8 overflow-hidden">
          <div className="relative">
            {/* Score hero */}
            <div className="p-8">
              <div className="mb-4 flex items-center justify-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.894a4.978 4.978 0 01-2.528-.403" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground-muted">Overall Score</p>
                  <p className={cn("text-5xl font-bold", getScoreColor(score))}>
                    {score}
                    <span className="text-2xl text-foreground-muted">/100</span>
                  </p>
                </div>
              </div>

              {/* Score interpretation */}
              <div className={cn("rounded-lg p-4", getScoreBg(score))}>
                <p className={cn("font-semibold", getScoreColor(score))}>
                  {score >= 80 ? "Excellent" : score >= 60 ? "Good" : score >= 40 ? "Average" : "Needs Improvement"}
                </p>
                <p className="mt-1 text-sm text-foreground-muted">
                  {score >= 80
                    ? "You&apos;re performing at a top-tier level for your target role."
                    : score >= 60
                    ? "You&apos;re performing well above average for your target role."
                    : score >= 40
                    ? "You&apos;re performing around the average for your target role."
                    : "You have significant room for improvement to reach your target role."}
                </p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="h-2 w-full bg-secondary">
              <div
                className={cn("h-full transition-all duration-500", getScoreColor(score).replace("text-", "bg-").concat(" opacity-80"))}
                style={{ width: `${score}%` }}
              />
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 border-t border-border p-6 pt-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-foreground">{strengths.length}</p>
              <p className="text-sm text-foreground-muted">Strengths</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-warning">{gaps.length}</p>
              <p className="text-sm text-foreground-muted">Gaps to Close</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-error">{missingSkills.length}</p>
              <p className="text-sm text-foreground-muted">Missing Skills</p>
            </div>
          </div>
        </Card>

        {/* Navigation Tabs */}
        <div className="mb-6 flex gap-1 rounded-lg bg-surface p-1 border border-border">
          {sections.map((section) => (
            <Button
              key={section.id}
              variant={activeSection === section.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveSection(section.id)}
              className={cn(
                "rounded-md",
                activeSection === section.id && "bg-primary text-primary-foreground"
              )}
            >
              {section.label}
            </Button>
          ))}
        </div>

        {/* Section: Strengths */}
        {activeSection === "strengths" && (
          <Card>
            <CardHeader>
              <CardTitle className="text-success">Your Strengths</CardTitle>
              <p className="text-sm text-foreground-muted">
                Skills where you exceed the target role expectations
              </p>
            </CardHeader>
            <CardContent>
              {strengths.length > 0 ? (
                <div className="space-y-4">
                  {strengths.map((strength, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 rounded-lg bg-background p-4"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success/10 text-success text-sm font-bold">
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground">{strength}</h3>
                        <p className="text-sm text-foreground-muted">
                          You&apos;re performing above the target role expectation in this area.
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-success">
                          <svg className="inline h-5 w-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Strong
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-foreground-muted py-8">
                  No strengths identified yet. Complete your assessment to see your strengths.
                </p>
              )}
            </CardContent>
          </Card>
        )}

        {/* Section: Gaps */}
        {activeSection === "gaps" && (
          <div className="space-y-6">
            {/* Critical Missing */}
            {missingSkills.length > 0 && (
              <Card className="border-l-4 border-l-error">
                <CardHeader>
                  <CardTitle className="text-error">Critical Missing Skills</CardTitle>
                  <p className="text-sm text-foreground-muted">
                    Skills with little or no exposure that are required for your target role
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {missingSkills.map((skill, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-4 rounded-lg bg-error/5 p-4"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-error/20 text-error text-sm font-bold">
                          !
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-foreground">{skill}</h3>
                          <p className="text-sm text-foreground-muted">
                            This skill is essential for your target role but you have no exposure yet.
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-error">0</div>
                          <div className="text-xs text-foreground-muted">Current Level</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Development Gaps */}
            <Card>
              <CardHeader>
                <CardTitle>Development Gaps</CardTitle>
                <p className="text-sm text-foreground-muted">
                  Skills where you&apos;re below the target role benchmark
                </p>
              </CardHeader>
              <CardContent>
                {gaps.length > 0 ? (
                  <div className="space-y-4">
                    {gaps.map((gap, idx) => (
                      <Card key={idx} padding="sm" className="mb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium text-foreground">{gap.skill}</h3>
                              <span
                                className={cn(
                                  "px-2 py-0.5 text-xs font-medium rounded-full",
                                  gap.priority === "critical" ? "bg-error text-white" :
                                  gap.priority === "important" ? "bg-warning text-foreground" :
                                  "bg-secondary text-foreground"
                                )}
                              >
                                {gap.priority}
                              </span>
                            </div>
                            <p className="text-sm text-foreground-muted mt-1">
                              Target level: {gap.target}/5
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium text-foreground-muted">
                              Current: <span className="text-foreground">{gap.level}/5</span>
                            </div>
                            <div className="text-sm font-medium text-foreground-muted">
                              Target: <span className="text-foreground">{gap.target}/5</span>
                            </div>
                            <div className="mt-2 h-2 w-24 overflow-hidden rounded-full bg-secondary">
                              <div
                                className="h-full rounded-full bg-warning"
                                style={{ width: `${(gap.level / gap.target) * 100}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-foreground-muted py-8">
                    No development gaps identified. Great job!
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Section: Roadmap */}
        {activeSection === "roadmap" && (
          <div className="space-y-6">
            {/* Immediate */}
            <Card className="border-l-4 border-l-warning">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-warning text-foreground text-sm font-bold">
                    0-30
                  </div>
                  <div>
                    <CardTitle>Immediate Actions</CardTitle>
                    <p className="text-sm text-foreground-muted">Quick wins and foundational learning</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {roadmap.immediate.map((action, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 rounded-lg bg-background p-3"
                    >
                      <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
                        {idx + 1}
                      </div>
                      <p className="text-sm text-foreground">{action}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Intermediate */}
            <Card className="border-l-4 border-l-primary">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                    30-90
                  </div>
                  <div>
                    <CardTitle>Intermediate Actions</CardTitle>
                    <p className="text-sm text-foreground-muted">Deeper learning and practical application</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {roadmap.intermediate.map((action, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 rounded-lg bg-background p-3"
                    >
                      <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
                        {idx + 1}
                      </div>
                      <p className="text-sm text-foreground">{action}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Long-term */}
            <Card className="border-l-4 border-l-success">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success text-white text-sm font-bold">
                    90-180
                  </div>
                  <div>
                    <CardTitle>Long-term Actions</CardTitle>
                    <p className="text-sm text-foreground-muted">Strategic initiatives and portfolio building</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {roadmap.longTerm.map((action, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 rounded-lg bg-background p-3"
                    >
                      <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-success/10 text-success text-xs font-bold">
                        {idx + 1}
                      </div>
                      <p className="text-sm text-foreground">{action}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Section: Resources */}
        {activeSection === "resources" && (
          <Card>
            <CardHeader>
              <CardTitle>Learning Resources</CardTitle>
              <p className="text-sm text-foreground-muted">
                Curated resources to help you close your skill gaps
              </p>
            </CardHeader>
            <CardContent>
              {resources.length > 0 ? (
                <div className="space-y-4">
                  {resources.map((resource, idx) => (
                    <a
                      key={idx}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-4 rounded-lg bg-background p-4 hover:bg-secondary/50 transition-colors"
                    >
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground">{resource.title}</h3>
                        <div className="flex items-center gap-3 mt-1 text-sm text-foreground-muted">
                          <span className="flex items-center gap-1">
                            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            {resource.type}
                          </span>
                          <span>·</span>
                          <span>{resource.time}</span>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <Button variant="ghost" size="sm">
                          Open
                        </Button>
                      </div>
                    </a>
                  ))}
                </div>
              ) : (
                <p className="text-center text-foreground-muted py-8">
                  No resources available yet. Complete your assessment to get personalized recommendations.
                </p>
              )}
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
