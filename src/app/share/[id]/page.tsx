import { notFound } from "next/navigation";
import { decodeShareUrl } from "@/lib/report/generator";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CareerLadderViz } from "@/components/career-ladder-viz";

interface SharePageProps {
  params: Promise<{ id: string }>;
}

export default async function SharePage({ params }: SharePageProps) {
  const { id } = await params;
  const payload = decodeShareUrl(id);

  if (!payload) {
    notFound();
  }

  const baseRole = payload.targetRole.split(" ")[0];

  // Derive a simple career ladder from the score
  const overallScore = payload.overallScore;
  const currentLevel = overallScore >= 80 ? 4 : overallScore >= 60 ? 3 : overallScore >= 40 ? 2 : 1;

  // Build a simple 8-level ladder for display
  const ladder: Array<{ id: string; title: string; minLevel: number; maxLevel: number; description: string }> = [
    { id: "0", title: baseRole + " Entry", minLevel: 0, maxLevel: 1, description: "Junior level — learning the fundamentals" },
    { id: "1", title: "Associate " + baseRole, minLevel: 1, maxLevel: 2, description: "Early career — working with guidance" },
    { id: "2", title: payload.targetRole, minLevel: 2, maxLevel: 3, description: "Mid-level — independent contributor" },
    { id: "3", title: "Senior " + baseRole, minLevel: 3, maxLevel: 4, description: "Senior — mentoring others" },
    { id: "4", title: "Lead " + baseRole, minLevel: 4, maxLevel: 5, description: "Lead — guiding a team" },
    { id: "5", title: "Principal " + baseRole, minLevel: 5, maxLevel: 6, description: "Principal — cross-team impact" },
    { id: "6", title: "Director of " + baseRole, minLevel: 6, maxLevel: 7, description: "Director — strategic leadership" },
    { id: "7", title: "VP / Head of " + baseRole, minLevel: 7, maxLevel: 8, description: "Executive — organizational leadership" },
  ];

  const date = new Date(payload.completedAt).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });

  const competencyLabels: Record<string, string> = {
    strategy: "Strategy",
    discovery: "Discovery / Research",
    delivery: "Delivery / Execution",
    analytics: "Analytics",
    ai: "AI / Machine Learning",
    leadership: "Leadership",
    "technical-foundation": "Technical Foundation",
    "development-tools": "Development Tools",
    "engineering-practices": "Engineering Practices",
    "system-design": "System Design",
    data: "Data",
    "cloud-infrastructure": "Cloud Infrastructure",
    collaboration: "Collaboration",
    testing: "Testing",
    security: "Security",
    frontend: "Frontend",
    backend: "Backend",
    databases: "Databases",
    devops: "DevOps",
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-6 text-center">
          <div className="mb-3 flex items-center justify-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20">
              <span className="text-lg font-bold text-primary-foreground">H</span>
            </div>
            <span className="text-xl font-bold text-foreground">Hirena</span>
          </div>
          <Badge variant="secondary" className="mb-3">
            Shared Assessment Report
          </Badge>
          <h1 className="text-2xl font-bold text-foreground">
            {payload.targetRole} — Skills Assessment
          </h1>
          <p className="mt-1 text-foreground-muted">
            Region: {payload.region} &nbsp;·&nbsp; Completed: {date}
          </p>
        </div>

        {/* Score Hero */}
        <div className="mb-8 rounded-2xl border border-border bg-surface p-8 shadow-lg shadow-black/5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-sm text-foreground-muted">Overall Score</div>
              <div className="text-5xl font-bold">
                {payload.overallScore}
                <span className="ml-2 text-lg font-normal text-foreground-muted">/100</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-foreground-muted">MENA Benchmark</div>
              {payload.benchmark?.overall ? (
                <>
                  <div className="text-lg font-semibold text-foreground">
                    Median: {payload.benchmark.overall.median.toFixed(0)}
                  </div>
                  <div className="text-sm text-foreground-muted">
                    75th %ile: {payload.benchmark.overall.topQuartile.toFixed(0)}
                  </div>
                </>
              ) : (
                <div className="text-lg font-semibold text-foreground-muted">N/A</div>
              )}
            </div>
          </div>

          {/* Score bar */}
          <div className="relative h-3 rounded-full bg-secondary/30 overflow-hidden">
            <div
              className="absolute top-0 bottom-0 bg-primary z-20"
              style={{ width: `${payload.overallScore}%` }}
            />
            {payload.benchmark?.overall && (
              <>
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-foreground/30 z-10"
                  style={{ left: `${(payload.benchmark.overall.median / 100) * 100}%` }}
                />
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-success/50 z-10"
                  style={{ left: `${(payload.benchmark.overall.topQuartile / 100) * 100}%` }}
                />
              </>
            )}
          </div>
          <div className="mt-2 flex justify-between text-xs text-foreground-muted">
            <span>0</span>
            {payload.benchmark?.overall && (
              <>
                <span className="text-foreground-muted">Median: {payload.benchmark.overall.median.toFixed(0)}</span>
                <span className="text-foreground-muted">75th %ile: {payload.benchmark.overall.topQuartile.toFixed(0)}</span>
              </>
            )}
            <span>100</span>
          </div>
        </div>

        {/* Competency Scores */}
        <div className="mb-6 rounded-xl border border-border bg-surface p-6">
          <h2 className="mb-4 text-lg font-semibold text-foreground">Competency Scores</h2>
          <div className="space-y-4">
            {Object.entries(payload.competencyScores).map(([cat, data]) => {
              const label = competencyLabels[cat] || cat;
              const pct = Math.round((data.average / 5) * 100);
              const barColor =
                data.average >= 4 ? "bg-success" : data.average >= 3 ? "bg-warning" : "bg-foreground-muted";
              return (
                <div key={cat}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-foreground capitalize">{label}</span>
                    <span className="text-sm font-semibold text-foreground">{data.average.toFixed(1)}/5</span>
                  </div>
                  <div className="relative h-2.5 rounded-full bg-secondary/30 overflow-hidden">
                    <div className={`absolute top-0 bottom-0 left-0 ${barColor} transition-all`} style={{ width: `${pct}%` }} />
                    {payload.benchmark?.competencies?.[cat] && (
                      <>
                        <div
                          className="absolute top-0 bottom-0 w-0.5 bg-foreground/30 z-10"
                          style={{ left: `${(payload.benchmark.competencies[cat].median / 5) * 100}%` }}
                        />
                        <div
                          className="absolute top-0 bottom-0 w-0.5 bg-amber-500/40 z-10"
                          style={{ left: `${(payload.benchmark.competencies[cat].topQuartile / 5) * 100}%` }}
                        />
                      </>
                    )}
                  </div>
                  <div className="mt-1 flex justify-between text-xs text-foreground-muted">
                    <span>0</span>
                    {payload.benchmark?.competencies?.[cat] && (
                      <span className="text-foreground-muted">
                        Median: {payload.benchmark.competencies[cat].median.toFixed(1)} / 75th: {payload.benchmark.competencies[cat].topQuartile.toFixed(1)}
                      </span>
                    )}
                    <span>5</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Strengths & Development Areas */}
        <div className="grid gap-6 sm:grid-cols-2 mb-6">
          {/* Strengths */}
          {payload.strengths.length > 0 && (
            <div className="rounded-xl border border-border bg-surface p-6">
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-success/20 text-success text-sm">★</div>
                <h3 className="font-semibold text-foreground">Strengths</h3>
                <Badge variant="secondary" className="ml-auto">{payload.strengths.length}</Badge>
              </div>
              <ul className="space-y-2">
                {payload.strengths.map((s, i) => (
                  <li key={i} className="flex items-center justify-between text-sm">
                    <span className="text-foreground">{s.name}</span>
                    <Badge variant="default" size="sm">Level {s.level}/5</Badge>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Development Areas */}
          {payload.gaps.length > 0 && (
            <div className="rounded-xl border border-border bg-surface p-6">
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-warning/20 text-warning text-sm">↑</div>
                <h3 className="font-semibold text-foreground">Development Areas</h3>
                <Badge variant="secondary" className="ml-auto">{payload.gaps.length}</Badge>
              </div>
              <ul className="space-y-2">
                {payload.gaps.map((g, i) => (
                  <li key={i} className="flex items-center justify-between text-sm">
                    <span className="text-foreground">{g.skillId}</span>
                    <span className="text-foreground-muted">
                      L{g.currentLevel} → L{g.targetLevel}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Missing Skills */}
        {payload.missingSkills.length > 0 && (
          <div className="mb-6 rounded-xl border border-border bg-surface p-6">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-error/20 text-error text-sm">✗</div>
              <h3 className="font-semibold text-foreground">Missing Skills</h3>
              <Badge variant="destructive" className="ml-auto">{payload.missingSkills.length}</Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              {payload.missingSkills.map((s, i) => (
                <Badge key={i} variant="outline">{s.name} ({s.level}/5)</Badge>
              ))}
            </div>
          </div>
        )}

        {/* Career Ladder */}
        <div className="mb-6 rounded-xl border border-border bg-surface p-6">
          <h2 className="mb-4 text-lg font-semibold text-foreground">Career Progression Path</h2>
          <CareerLadderViz
            ladder={ladder}
            currentLevel={currentLevel}
          />
        </div>

        {/* Top Skills */}
        {payload.skillRanking.length > 0 && (
          <div className="mb-6 rounded-xl border border-border bg-surface p-6">
            <h2 className="mb-4 text-lg font-semibold text-foreground">Top Skills</h2>
            <div className="space-y-2">
              {payload.skillRanking.slice(0, 8).map((s, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-foreground-muted font-mono w-5">{i + 1}.</span>
                    <span className="text-foreground">{s.name}</span>
                  </div>
                  <Badge variant="default" size="sm">Level {s.level}/5</Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <Separator className="my-6" />
        <div className="text-center text-xs text-foreground-muted">
          <p>
            This report was generated by{" "}
            <a href="https://hirena.app" className="text-primary hover:underline">Hirena</a> —
            AI-powered skills assessment for MENA professionals
          </p>
          <p className="mt-1">
            To view the full interactive report,{" "}
            <a href={`https://hirena.app/share/${id}`} className="text-primary hover:underline">
              open this link in the Hirena app
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
