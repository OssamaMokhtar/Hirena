"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n-provider";

interface AssessmentHistoryItem {
  id: string;
  targetRole: string;
  targetTrack: string;
  region: string;
  overallScore: number;
  competencyScores: Record<string, { average: number; skills: Array<{ id: string; name: string; level: number; category: string }> }>;
  strengths: Array<{ id: string; name: string; level: number; category: string }>;
  gaps: Array<{ skillId: string; currentLevel: number; targetLevel: number; gapSize: number; priority: string }>;
  missingSkills: Array<{ id: string; name: string; level: number; category: string }>;
  createdAt: string;
  updatedAt: string;
}

interface ProgressTrackingProps {
  userId: string;
  userName?: string;
  userAvatar?: string;
}

const SCORE_COLORS: Record<number, string> = {
  0: "bg-foreground-subtle",
  1: "bg-secondary",
  2: "bg-amber-400",
  3: "bg-amber-500",
  4: "bg-emerald-500",
  5: "bg-emerald-600",
  6: "bg-blue-600",
  7: "bg-blue-700",
  8: "bg-indigo-700",
  9: "bg-indigo-800",
  10: "bg-violet-800",
};

export function ProgressTrackingDashboard({ userId, userName = "You", userAvatar }: ProgressTrackingProps) {
  const { t } = useTranslation();
  const [assessments, setAssessments] = React.useState<AssessmentHistoryItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [activeTab, setActiveTab] = React.useState<"history" | "trajectory" | "comparison">("history");

  // Fetch assessment history
  React.useEffect(() => {
    if (!userId) return;
    const fetchAssessments = async () => {
      try {
        const res = await fetch(`/api/assess?userId=${encodeURIComponent(userId)}`);
        if (!res.ok) throw new Error("Failed to load assessment history");
        const data = await res.json();
        if (data.success && data.assessments) {
          const sorted = data.assessments.sort((a: any, b: any) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          setAssessments(sorted);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchAssessments();
  }, [userId]);

  const latestAssessment = assessments[0];
  const previousAssessment = assessments[1];
  const scoreChange = previousAssessment && latestAssessment
    ? latestAssessment.overallScore - previousAssessment.overallScore
    : null;

  // Build skill trajectory data
  const skillTrajectoryMap = React.useMemo(() => {
    const map = new Map<string, Array<{ date: string; level: number; role: string }>>();
    assessments.forEach((a) => {
      const date = new Date(a.createdAt).toLocaleDateString();
      Object.entries(a.competencyScores).forEach(([category, data]) => {
        data.skills.forEach((skill) => {
          if (!map.has(skill.id)) map.set(skill.id, []);
          map.get(skill.id)!.push({ date, level: skill.level, role: a.targetRole });
        });
      });
    });
    return map;
  }, [assessments]);

  // Get top skills by trajectory length
  const topSkills = React.useMemo(() => {
    if (!latestAssessment) return [];
    const skills = latestAssessment.competencyScores;
    const all: Array<{ id: string; name: string; category: string; levels: Array<{ date: string; level: number }> }> = [];
    Object.entries(skills).forEach(([category, data]) => {
      data.skills.forEach((skill) => {
        const trajectory = skillTrajectoryMap.get(skill.id) || [];
        all.push({
          id: skill.id,
          name: skill.name,
          category,
          levels: trajectory.sort((a, b) =>
            new Date(a.date).getTime() - new Date(b.date).getTime()
          ).map(t => ({ date: t.date, level: t.level })),
        });
      });
    });
    return all.sort((a, b) =>
      b.levels.length - a.levels.length ||
      (b.levels[b.levels.length - 1]?.level || 0) - (a.levels[a.levels.length - 1]?.level || 0)
    );
  }, [latestAssessment, skillTrajectoryMap]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-foreground-muted">Loading assessment history...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-error">{error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Progress Tracking</h2>
          <p className="text-foreground-muted mt-1">
            Track your skills assessment history and growth over time
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-lg font-semibold text-foreground">{userName.charAt(0).toUpperCase()}</div>
          <div className="text-right">
            <div className="text-sm font-medium text-foreground">{userName}</div>
            <div className="text-xs text-foreground-muted">
              {assessments.length} {assessments.length === 1 ? "assessment" : "assessments"}
            </div>
          </div>
        </div>
      </div>

      {/* Score Summary */}
      {latestAssessment && (
        <Card className="border-border bg-surface">
          <CardHeader>
            <CardTitle className="text-base">Latest Assessment</CardTitle>
            <CardDescription>
              {latestAssessment.targetRole} — {new Date(latestAssessment.createdAt).toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-sm text-foreground-muted mb-1">Overall Score</div>
                <div className={cn(
                  "text-4xl font-bold",
                  latestAssessment.overallScore >= 80 ? "text-emerald-600" :
                  latestAssessment.overallScore >= 60 ? "text-amber-600" :
                  latestAssessment.overallScore >= 40 ? "text-foreground" : "text-error"
                )}>
                  {latestAssessment.overallScore}
                </div>
                <div className="text-xs text-foreground-muted mt-1">/ 100</div>
              </div>
              {scoreChange !== null && (
                <div className="text-center">
                  <div className="text-sm text-foreground-muted mb-1">Change from last</div>
                  <div className={cn(
                    "text-3xl font-bold",
                    scoreChange > 0 ? "text-emerald-600" : scoreChange < 0 ? "text-error" : "text-foreground-muted"
                  )}>
                    {scoreChange > 0 ? "+" : ""}{scoreChange}
                  </div>
                  <div className="text-xs text-foreground-muted mt-1">
                    {previousAssessment && `${previousAssessment.overallScore} → ${latestAssessment.overallScore}`}
                  </div>
                </div>
              )}
              <div className="flex-1">
                <div className="flex justify-between text-xs text-foreground-muted mb-1">
                  <span>0</span><span>25</span><span>50</span><span>75</span><span>100</span>
                </div>
                <div className="relative h-3 rounded-full bg-secondary/30 overflow-hidden">
                  <div
                    className="absolute left-0 top-0 bottom-0 bg-primary/40"
                    style={{ width: `${latestAssessment.overallScore}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Competency area mini-bars */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {Object.entries(latestAssessment.competencyScores).map(([category, data]) => (
                <div key={category} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-foreground-muted capitalize">{category}</span>
                    <span className="font-medium text-foreground">{data.average.toFixed(1)}</span>
                  </div>
                  <Progress
                    value={(data.average / 5) * 100}
                    className="h-1.5"
                    indicatorClassName={cn("h-1.5 bg-primary")}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tabs */}
      <div className="flex gap-1 rounded-lg bg-surface p-1 border border-border">
        {(["history", "trajectory", "comparison"] as const).map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab(tab)}
            className={cn("rounded-md capitalize", activeTab === tab && "bg-primary text-primary-foreground")}
          >
            {tab}
          </Button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === "history" && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Assessment History</h3>
            {assessments.length === 0 ? (
              <Card className="border-border bg-surface">
                <CardContent className="py-8 text-center">
                  <p className="text-foreground-muted">No assessments yet. Complete your first assessment to start tracking progress.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {assessments.map((assessment, idx) => (
                  <Card
                    key={assessment.id}
                    className={cn("border-border bg-surface", idx === 0 && "border-l-4 border-l-primary")}
                  >
                    <CardContent className="py-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="default" className="text-xs font-medium capitalize">
                              {assessment.targetRole}
                            </Badge>
                            <Badge variant="secondary" className="text-xs font-medium">
                              {assessment.region}
                            </Badge>
                            {idx === 0 && (
                              <Badge variant="outline" className="text-xs font-medium text-foreground-muted">
                                Latest
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-foreground-muted">
                            {formatDate(assessment.createdAt)}
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className={cn(
                            "text-2xl font-bold",
                            assessment.overallScore >= 80 ? "text-emerald-600" :
                            assessment.overallScore >= 60 ? "text-amber-600" :
                            assessment.overallScore >= 40 ? "text-foreground" : "text-error"
                          )}>
                            {assessment.overallScore}
                          </div>
                          <div className="text-xs text-foreground-muted">/ 100</div>
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2 text-xs">
                        {Object.entries(assessment.competencyScores).slice(0, 4).map(([cat, data]) => (
                          <span key={cat} className="px-2 py-1 rounded bg-background text-foreground-muted capitalize">
                            {cat}: {data.average.toFixed(1)}
                          </span>
                        ))}
                        {Object.keys(assessment.competencyScores).length > 4 && (
                          <span className="px-2 py-1 rounded bg-background text-foreground-muted">
                            +{Object.keys(assessment.competencyScores).length - 4} more
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "trajectory" && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Skill Level Trajectory</h3>
            <p className="text-foreground-muted">
              Track how your skill levels change across assessments over time.
            </p>

            {topSkills.length === 0 ? (
              <Card className="border-border bg-surface">
                <CardContent className="py-8 text-center">
                  <p className="text-foreground-muted">Complete at least one assessment to see your skill trajectory.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {topSkills.slice(0, 8).map((skill) => (
                  <Card key={skill.id} className="border-border bg-surface">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-base">{skill.name}</CardTitle>
                          <CardDescription className="text-xs capitalize">{skill.category}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {skill.levels.length <= 1 ? (
                        <div className="flex items-center gap-4 py-2">
                          <div className="text-sm text-foreground-muted">Single assessment</div>
                          <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                            SCORE_COLORS[skill.levels[0]?.level || 0]
                          )}>
                            {skill.levels[0]?.level || 0}
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {/* Level dots connected by a line */}
                          <div className="relative h-8 flex items-center">
                            <div className="absolute left-4 right-4 h-px bg-border" />
                            {skill.levels.map((level, idx) => (
                              <div
                                key={idx}
                                className="absolute flex flex-col items-center"
                                style={{ left: `${(idx / (skill.levels.length - 1)) * 92 + 4}%` }}
                              >
                                <div
                                  className={cn(
                                    "w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold border-2 border-background",
                                    SCORE_COLORS[level.level]
                                  )}
                                >
                                  {level.level}
                                </div>
                                <div className="text-[10px] text-foreground-muted mt-1 truncate max-w-16">
                                  {level.date}
                                </div>
                              </div>
                            ))}
                          </div>
                          {/* Current level callout */}
                          <div className="flex justify-between text-xs text-foreground-muted mt-1">
                            <span>Earliest: {skill.levels[0]?.level || 0}/5 ({skill.levels[0]?.date})</span>
                            <span className="font-medium text-foreground">
                              Latest: {skill.levels[skill.levels.length - 1]?.level || 0}/5 ({skill.levels[skill.levels.length - 1]?.date})
                            </span>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "comparison" && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Assessment Comparison</h3>
            <p className="text-foreground-muted">
              Compare your latest assessment with the previous one.
            </p>

            {!previousAssessment || !latestAssessment ? (
              <Card className="border-border bg-surface">
                <CardContent className="py-8 text-center">
                  <p className="text-foreground-muted">
                    {assessments.length < 2
                      ? "Complete at least two assessments to see a comparison."
                      : "No previous assessment available for comparison."}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Previous */}
                <Card className="border-border bg-surface opacity-70">
                  <CardHeader>
                    <CardTitle className="text-base">Previous Assessment</CardTitle>
                    <CardDescription>
                      {previousAssessment.targetRole} — {formatDate(previousAssessment.createdAt)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground-muted">Overall Score</span>
                      <span className="text-2xl font-bold text-foreground-muted">
                        {previousAssessment.overallScore}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(previousAssessment.competencyScores).map(([cat, data]) => (
                        <div key={cat} className="text-xs">
                          <div className="text-foreground-muted capitalize">{cat}</div>
                          <div className="font-medium text-foreground">{data.average.toFixed(1)}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Latest */}
                <Card className="border-l-4 border-l-primary bg-surface">
                  <CardHeader>
                    <CardTitle className="text-base">Latest Assessment</CardTitle>
                    <CardDescription>
                      {latestAssessment.targetRole} — {formatDate(latestAssessment.createdAt)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground-muted">Overall Score</span>
                      <span className={cn(
                        "text-2xl font-bold",
                        latestAssessment.overallScore >= 80 ? "text-emerald-600" :
                        latestAssessment.overallScore >= 60 ? "text-amber-600" : "text-foreground"
                      )}>
                        {latestAssessment.overallScore}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(latestAssessment.competencyScores).map(([cat, data]) => (
                        <div key={cat} className="text-xs">
                          <div className="text-foreground-muted capitalize">{cat}</div>
                          <div className="font-medium text-foreground">{data.average.toFixed(1)}</div>
                        </div>
                      ))}
                    </div>
                    {/* Delta indicator */}
                    <div className="mt-2 pt-2 border-t border-border">
                      <div className="flex justify-between text-xs">
                        <span className="text-foreground-muted">Change</span>
                        <Badge
                          variant={scoreChange !== null && scoreChange > 0 ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {scoreChange !== null ? `${scoreChange > 0 ? "+" : ""}${scoreChange} pts` : "—"}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Side-by-side competency comparison */}
            {previousAssessment && latestAssessment && (
              <Card className="border-border bg-surface mt-4">
                <CardHeader>
                  <CardTitle className="text-base">Competency Area Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(latestAssessment.competencyScores).map(([category, latestData]) => {
                      const prevData = previousAssessment?.competencyScores[category];
                      const prevAvg = prevData?.average ?? 0;
                      const latestAvg = latestData.average;
                      const diff = latestAvg - prevAvg;
                      return (
                        <div key={category} className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-foreground-muted capitalize">{category}</span>
                            <span className={cn(
                              "font-medium",
                              diff > 0 ? "text-emerald-600" : diff < 0 ? "text-error" : "text-foreground-muted"
                            )}>
                              {prevAvg.toFixed(1)} → {latestAvg.toFixed(1)} ({diff > 0 ? "+" : ""}{diff.toFixed(1)})
                            </span>
                          </div>
                          <div className="relative h-2 rounded-full bg-secondary/30 overflow-hidden">
                            {/* Previous bar (background) */}
                            <div
                              className="absolute left-0 top-0 h-full bg-foreground-subtle/40 rounded-full"
                              style={{ width: `${(prevAvg / 5) * 100}%` }}
                            />
                            {/* Latest bar (foreground) */}
                            <div
                              className="absolute left-0 top-0 h-full bg-primary/60 rounded-full"
                              style={{ width: `${(latestAvg / 5) * 100}%` }}
                            />
                          </div>
                          <div className="flex justify-between text-[10px] text-foreground-muted">
                            <span>Prev: {prevAvg.toFixed(1)}</span>
                            <span>Latest: {latestAvg.toFixed(1)}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProgressTrackingDashboard;
