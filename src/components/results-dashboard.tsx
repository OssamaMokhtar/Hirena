"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatScore, getScoreColor, getScoreBg, proficiencyToLabel } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n-provider";
import type { AssessmentResult, SkillCategory } from "@/types";
import { getRoleModel, ROLE_COMPETENCY_MODELS } from "@/lib/competency-models/index";
import { CareerLadderViz } from "@/components/career-ladder-viz";
import { LearningResourcesPanel } from "@/components/learning-resources-panel";
import { ReportShareBar } from "@/components/report-share-bar";

interface ResultsDashboardProps {
  result: AssessmentResult;
}

export function ResultsDashboard({ result }: ResultsDashboardProps) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = React.useState<"overview" | "skills" | "gaps" | "roadmap">("overview");
  const [showBenchmarks, setShowBenchmarks] = React.useState(false);
  const [selectedStepIndex, setSelectedStepIndex] = React.useState<number | null>(null);
  const handleStepClick = (step: any, idx: number) => {
    setSelectedStepIndex(idx);
  };

  const roleModel = React.useMemo(
    () => getRoleModel(result.targetRole),
    [result.targetRole]
  );

  const hasBenchmarks = result.benchmark?.overall?.median != null;

  const getCompetencyColor = (score: number): string => {
    if (score >= 4) return "bg-success";
    if (score >= 3) return "bg-warning";
    if (score >= 2) return "bg-foreground-muted";
    return "bg-error";
  };

  const getPriorityColor = (priority: string): string => {
    switch (priority) {
      case "critical":
        return "bg-error text-white";
      case "important":
        return "bg-warning text-foreground";
      default:
        return "bg-secondary text-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 py-12">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20">
              <span className="text-xl font-bold text-primary-foreground">H</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground">Hirena</h1>
          </div>
          <h2 className="text-xl font-semibold text-foreground">Assessment Complete</h2>
          <p className="mt-2 text-foreground-muted">
            Here's your personalized skills assessment for{" "}
            <span className="font-medium text-foreground">{result.targetRole}</span>
          </p>
        </div>

        {/* Overall Score Hero */}
        <div className="mb-8 rounded-2xl border border-border bg-surface p-8 shadow-lg shadow-black/5">
          <div className="text-center">
            <div className="mb-2 flex items-center justify-center gap-2">
              <span className="text-sm font-medium text-foreground-muted">Overall Score</span>
              <span className="text-xs text-foreground-subtle">/100</span>
            </div>
            <div
              className={cn(
                "text-7xl font-bold",
                result.overallScore >= 80
                  ? "text-success"
                  : result.overallScore >= 60
                  ? "text-warning"
                  : result.overallScore >= 40
                  ? "text-foreground"
                  : "text-error"
              )}
            >
              {result.overallScore}
            </div>
            <div className="mt-4 flex justify-center gap-4">
              <div className="text-center">
                <div className="text-sm text-foreground-muted">Target Role</div>
                <div className="text-lg font-semibold text-foreground">{result.targetRole}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-foreground-muted">Region</div>
                <div className="text-lg font-semibold text-foreground">{result.region}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-foreground-muted">Date</div>
                <div className="text-lg font-semibold text-foreground">
                  {new Date(result.completedAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="mb-2 text-sm text-foreground-muted">
              Your performance vs. {result.targetRole} benchmark
              {hasBenchmarks && " (MENA region)"}
            </div>
            <div className="relative h-3 rounded-full bg-secondary/30 overflow-hidden">
              <div className="absolute left-0 top-0 h-full bg-foreground/20" style={{ width: "100%" }} />
              {hasBenchmarks && result.benchmark?.overall && (
                <>
                  {/* Median marker */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-foreground/40 z-10"
                    style={{ left: `${(result.benchmark.overall.median / 100) * 100}%` }}
                  >
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 text-[10px] font-medium text-foreground-muted whitespace-nowrap">
                      Median: {result.benchmark.overall.median.toFixed(0)}
                    </div>
                  </div>
                  {/* Top quartile marker */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-success/50 z-10"
                    style={{ left: `${(result.benchmark.overall.topQuartile / 100) * 100}%` }}
                  >
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 text-[10px] font-medium text-success whitespace-nowrap">
                      75th %ile: {result.benchmark.overall.topQuartile.toFixed(0)}
                    </div>
                  </div>
                  {/* User score bar */}
                  <div
                    className="absolute top-0 bottom-0 bg-primary z-20 transition-all duration-500"
                    style={{
                      left: 0,
                      width: `${(result.overallScore / 100) * 100}%`,
                    }}
                  />
                </>
              )}
            </div>
            <div className="mt-3 flex justify-between text-xs flex-wrap gap-1">
              <span>0</span>
              {hasBenchmarks && result.benchmark?.overall && (
                <>
                  <span className="text-foreground-muted">
                    Median: {result.benchmark.overall.median.toFixed(0)}
                  </span>
                  <span className="text-foreground-muted">
                    75th %ile: {result.benchmark.overall.topQuartile.toFixed(0)}
                  </span>
                </>
              )}
              <span>100</span>
            </div>
            {!hasBenchmarks && (
              <p className="mt-2 text-xs text-foreground-muted">
                Benchmarks are being populated. Check back soon for regional comparisons.
              </p>
            )}
          </div>
        </div>

        {/* Career Ladder */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{result.targetRole} — Career Progression Path</CardTitle>
            <p className="text-sm text-foreground-muted">
              Where you sit today and the role levels ahead of you in this track
            </p>
          </CardHeader>
          <CardContent>
            <CareerLadderViz
              ladder={roleModel?.careerLadder ?? []}
              currentLevel={result.overallScore >= 80 ? 4 : result.overallScore >= 60 ? 3 : result.overallScore >= 40 ? 2 : 1}
            />
          </CardContent>
        </Card>

        {/* Tabs */}
        <div className="mb-6 flex gap-1 rounded-lg bg-surface p-1 border border-border">
          {(["overview", "skills", "gaps", "roadmap"] as const).map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab(tab)}
              className={cn(
                "rounded-md capitalize",
                activeTab === tab && "bg-primary text-primary-foreground"
              )}
            >
              {tab}
            </Button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Competency Areas with Benchmarks */}
              <Card>
                <CardHeader>
                  <CardTitle>Competency Area Scores</CardTitle>
                  <p className="text-sm text-foreground-muted">
                    Your proficiency across competency areas — with MENA regional benchmarks where available
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {Object.entries(result.competencyScores).map(([category, data]) => {
                      const benchmark = result.benchmark?.competencies?.[category];
                      const showBenchmark = benchmark && benchmark.median != null;

                      return (
                        <div key={category} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-foreground capitalize">
                              {category}
                            </span>
                            <div className="flex items-center gap-3">
                              {showBenchmark && (
                                <span className="text-xs text-foreground-muted">
                                  vs median {benchmark.median.toFixed(1)}
                                </span>
                              )}
                              <span className={cn("text-sm font-semibold", getCompetencyColor(data.average))}>
                                {data.average.toFixed(1)} / 5
                              </span>
                            </div>
                          </div>
                          <div className="relative h-2.5 rounded-full bg-secondary/30 overflow-hidden">
                            {/* Median marker */}
                            {showBenchmark && (
                              <div
                                className="absolute top-0 bottom-0 w-0.5 bg-foreground/30 z-10"
                                style={{ left: `${(benchmark.median / 5) * 100}%` }}
                              />
                            )}
                            {/* Top quartile marker */}
                            {showBenchmark && (
                              <div
                                className="absolute top-0 bottom-0 w-0.5 bg-amber-500/40 z-10"
                                style={{ left: `${(benchmark.topQuartile / 5) * 100}%` }}
                              />
                            )}
                            {/* User's bar */}
                            <div
                              className="absolute left-0 top-0 h-full bg-primary z-20 transition-all duration-500"
                              style={{ width: `${(data.average / 5) * 100}%` }}
                            />
                          </div>
                          <div className="flex justify-between text-xs text-foreground-muted">
                            <span>{data.skills.length} skills assessed</span>
                            <span>{proficiencyToLabel(Math.round(data.average))}</span>
                            {showBenchmark && (
                              <span className="capitalize">
                                {data.average >= benchmark.topQuartile ? "Top quartile" :
                                 data.average >= benchmark.median ? "Above median" :
                                 "Below median"}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Strengths */}
              {result.strengths.length > 0 && (
                <Card className="border-l-4 border-l-success">
                  <CardHeader>
                    <CardTitle className="text-success">Your Strengths</CardTitle>
                    <p className="text-sm text-foreground-muted">
                      Skills where you exceed the target role expectations
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {result.strengths.map((skill) => (
                        <div
                          key={skill.id}
                          className="flex items-center justify-between rounded-lg bg-background p-3"
                        >
                          <div>
                            <div className="text-sm font-medium text-foreground">{skill.name}</div>
                            <div className="text-xs text-foreground-muted capitalize">{skill.category}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-success">{skill.level}/5</div>
                            <div className="text-xs text-foreground-muted">
                              {skill.category}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Top Skills */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Skills</CardTitle>
                  <p className="text-sm text-foreground-muted">
                    Your highest-rated skills ranked by proficiency
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {result.skillRanking.slice(0, 5).map((skill, idx) => (
                      <div
                        key={skill.id}
                        className="flex items-center justify-between rounded-lg bg-background p-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                            {idx + 1}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-foreground">{skill.name}</div>
                            <div className="text-xs text-foreground-muted capitalize">{skill.category}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">
                            <span className={cn(
                              skill.level >= 4 && "text-success",
                              skill.level >= 3 && "text-warning",
                              skill.level < 3 && "text-error"
                            )}>
                              {skill.level}/5
                            </span>
                          </div>
                          {skill.isAiInferred && (
                            <div className="text-xs text-foreground-muted flex items-center gap-1">
                              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.894a4.978 4.978 0 01-2.528-.403" />
                              </svg>
                              AI assessed
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "skills" && (
            <Card>
              <CardHeader>
                <CardTitle>All Skills Assessment</CardTitle>
                <p className="text-sm text-foreground-muted">
                  Complete breakdown of your proficiency across all {result.skillRanking.length} PM skills
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(result.competencyScores).map(([category, data]) => (
                    <div key={category} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-foreground capitalize">{category}</h3>
                        <span className={cn("text-sm font-medium", getCompetencyColor(data.average))}>
                          {data.average.toFixed(1)} / 5
                        </span>
                      </div>
                      <div className="space-y-2">
                        {data.skills
                          .sort((a, b) => b.level - a.level)
                          .map((skill) => (
                            <div key={skill.id} className="flex items-center justify-between rounded-lg bg-background p-3">
                              <div className="flex-1">
                                <div className="text-sm font-medium text-foreground">{skill.name}</div>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1">
                                  <div
                                    className={cn(
                                      "h-2 w-8 rounded-full",
                                      skill.level === 0 && "bg-secondary",
                                      skill.level >= 1 && "bg-primary"
                                    )}
                                    style={{
                                      width: `${(skill.level / 5) * 100}%`,
                                    }}
                                  />
                                  <span className="text-sm font-semibold w-8 text-right">
                                    {skill.level}/5
                                  </span>
                                </div>
                                {skill.isAiInferred && (
                                  <span className="text-xs text-foreground-muted">AI</span>
                                )}
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "gaps" && (
            <div className="space-y-6">
              {/* Critical Missing Skills */}
              {result.missingSkills.length > 0 && (
                <Card className="border-l-4 border-l-error">
                  <CardHeader>
                    <CardTitle className="text-error">Critical Gaps</CardTitle>
                    <p className="text-sm text-foreground-muted">
                      Skills with little/no exposure that are required for your target role
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {result.missingSkills.map((skill) => {
                        const targetLevel = 4; // Default for critical
                        return (
                          <div
                            key={skill.id}
                            className="flex items-center justify-between rounded-lg bg-error/5 p-4"
                          >
                            <div>
                              <div className="text-sm font-medium text-foreground">{skill.name}</div>
                              <div className="text-xs text-foreground-muted capitalize">{skill.category}</div>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-2">
                                <span className="text-lg font-bold text-error">{skill.level}/5</span>
                                <span className="text-sm text-foreground-muted">→</span>
                                <span className="text-lg font-bold text-foreground">{targetLevel}/5</span>
                              </div>
                              <div className="text-xs text-foreground-muted">
                                Target: {skill.level >= 4 ? "Advanced" : "Expert"}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Development Gaps */}
              <Card>
                <CardHeader>
                  <CardTitle>Skills to Develop</CardTitle>
                  <p className="text-sm text-foreground-muted">
                    Areas where you're below the target role benchmark — prioritized by importance
                  </p>
                </CardHeader>
                <CardContent>
                  {result.gaps.length > 0 ? (
                    <div className="space-y-3">
                      {result.gaps.map((gap, idx) => (
                        <div
                          key={gap.skill.id}
                          className="flex items-start justify-between rounded-lg bg-background p-4"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-foreground">{gap.skill.name}</span>
                              <span className={cn(
                                "px-2 py-0.5 text-xs font-medium rounded-full",
                                getPriorityColor(gap.priority)
                              )}>
                                {gap.priority}
                              </span>
                            </div>
                            <div className="mt-1 text-xs text-foreground-muted capitalize">{gap.skill.category}</div>
                            {gap.note && (
                              <p className="mt-2 text-sm text-foreground-muted">{gap.note}</p>
                            )}
                          </div>
                          <div className="ml-4 text-right">
                            <div className="text-sm text-foreground-muted">
                              Current: <span className="text-foreground font-medium">{gap.currentLevel}/5</span>
                            </div>
                            <div className="text-sm text-foreground-muted">
                              Target: <span className="text-foreground font-medium">{gap.targetLevel}/5</span>
                            </div>
                            <div className="mt-1 h-2 w-20 overflow-hidden rounded-full bg-secondary">
                              <div
                                className="h-full rounded-full bg-warning"
                                style={{ width: `${(gap.currentLevel / gap.targetLevel) * 100}%` }}
                              />
                            </div>
                            <div className="mt-1 text-xs text-foreground-muted">
                              Gap: {gap.gapSize} level{gap.gapSize > 1 ? "s" : ""}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-lg border border-border bg-surface p-8 text-center">
                      <div className="text-4xl mb-2">🎯</div>
                      <h3 className="text-lg font-semibold text-foreground">No gaps identified</h3>
                      <p className="text-foreground-muted mt-1">
                        You're meeting or exceeding expectations for your target role across all skills.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Learning Resources */}
              {result.gaps.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Recommended Learning Resources</CardTitle>
                    <p className="text-sm text-foreground-muted">
                      Curated courses mapped to the skill gaps identified in this assessment — from Coursera, edX, DeepLearning.AI, and LinkedIn Learning
                    </p>
                  </CardHeader>
                  <CardContent>
                    <LearningResourcesPanel
                      targetRole={result.targetRole}
                      gaps={result.gaps}
                      missingSkills={result.missingSkills}
                      region={result.region}
                    />
                  </CardContent>
                </Card>
              )}
            </div>
          )}
          {activeTab === "roadmap" && (
            <Card>
              <CardHeader>
                <CardTitle>Your Development Roadmap</CardTitle>
                <p className="text-sm text-foreground-muted">
                  Personalized action plan based on your assessment results
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {/* Immediate Actions */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-warning text-foreground text-sm font-bold">
                        0-30
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-foreground">Immediate Actions</h3>
                        <p className="text-sm text-foreground-muted">Quick wins and foundational learning</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {[
                        { title: "Read 'The Lean Product Playbook' chapters 1-3", time: "3 hours" },
                        { title: "Complete Lenny Rachitsky's pricing strategy article", time: "15 min" },
                        { title: "Practice writing a 1-page product vision", time: "1 hour" },
                      ].map((action, idx) => (
                        <div key={idx} className="flex items-start gap-3 rounded-lg bg-background p-4">
                          <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">
                            ✓
                          </div>
                          <div>
                            <div className="text-sm font-medium text-foreground">{action.title}</div>
                            <div className="text-xs text-foreground-muted mt-1">{action.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Intermediate Actions */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                        30-90
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-foreground">Intermediate Actions</h3>
                        <p className="text-sm text-foreground-muted">Deeper learning and practical application</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {[
                        { title: "Take Reforge Product Strategy course (or equivalent)", time: "4 weeks" },
                        { title: "Lead a discovery project end-to-end at work", time: "2 weeks" },
                        { title: "Present a product strategy to leadership team", time: "1 week" },
                      ].map((action, idx) => (
                        <div key={idx} className="flex items-start gap-3 rounded-lg bg-background p-4">
                          <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">
                            ✓
                          </div>
                          <div>
                            <div className="text-sm font-medium text-foreground">{action.title}</div>
                            <div className="text-xs text-foreground-muted mt-1">{action.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Long-term Actions */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success text-white text-sm font-bold">
                        90-180
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-foreground">Long-term Actions</h3>
                        <p className="text-sm text-foreground-muted">Portfolio evidence and strategic initiatives</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {[
                        { title: "Own a P&L-adjacent metric for a product area for 3 months", time: "3 months" },
                        { title: "Build 2-3 product case studies demonstrating your capabilities", time: "1 month" },
                        { title: "Lead a cross-functional organizational design initiative", time: "2 months" },
                      ].map((action, idx) => (
                        <div key={idx} className="flex items-start gap-3 rounded-lg bg-background p-4">
                          <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-success/10 text-success text-sm">
                            ✓
                          </div>
                          <div>
                            <div className="text-sm font-medium text-foreground">{action.title}</div>
                            <div className="text-xs text-foreground-muted mt-1">{action.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8">
          <ReportShareBar result={result} />
        </div>
      </div>
    </div>
  );
}

export default ResultsDashboard;
