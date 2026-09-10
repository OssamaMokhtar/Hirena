"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatScore, getScoreColor, getScoreBg, proficiencyToLabel } from "@/lib/utils";
import type { AssessmentResult, SkillCategory } from "@/types";

interface ResultsDashboardProps {
  result: AssessmentResult;
}

export function ResultsDashboard({ result }: ResultsDashboardProps) {
  const [activeTab, setActiveTab] = React.useState<"overview" | "skills" | "gaps" | "roadmap">("overview");

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
            </div>
            <Progress value={result.overallScore} className="h-3 w-full" />
            <div className="mt-2 flex justify-between text-xs text-foreground-muted">
              <span>0</span>
              <span>25</span>
              <span>50</span>
              <span>75</span>
              <span>100</span>
            </div>
          </div>
        </div>

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
              {/* Competency Areas */}
              <Card>
                <CardHeader>
                  <CardTitle>Competency Area Scores</CardTitle>
                  <p className="text-sm text-foreground-muted">
                    Your proficiency across the six core PM competency areas
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {Object.entries(result.competencyScores).map(([category, data]) => (
                      <div key={category} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-foreground capitalize">
                            {category}
                          </span>
                          <span className={cn("text-sm font-semibold", getCompetencyColor(data.average))}>
                            {data.average.toFixed(1)} / 5
                          </span>
                        </div>
                        <Progress
                          value={(data.average / 5) * 100}
                          className="h-2.5"
                          indicatorClassName={cn("h-2.5", getCompetencyColor(data.average).replace("bg-", "bg-").concat(" opacity-80"))}
                        />
                        <div className="flex justify-between text-xs text-foreground-muted">
                          <span>{data.skills.length} skills assessed</span>
                          <span>{proficiencyToLabel(Math.round(data.average))}</span>
                        </div>
                      </div>
                    ))}
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
                              Above target by {Math.abs(result.gaps.find(g => g.skill.id === skill.id)?.gapSize || 1)}+ level
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
        <div className="mt-8 flex justify-center">
          <Button variant="outline" size="lg">
            Save & Share Results
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ResultsDashboard;
