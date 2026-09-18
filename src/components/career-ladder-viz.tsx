"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import type { CareerLadderStep } from "@/types";

interface CareerLadderVizProps {
  ladder: CareerLadderStep[];
  currentLevel?: number;
  className?: string;
}

const LEVEL_COLORS: Record<number, string> = {
  0: "bg-foreground-subtle",
  1: "bg-secondary",
  2: "bg-amber-500",
  3: "bg-amber-600",
  4: "bg-blue-600",
  5: "bg-indigo-600",
  6: "bg-purple-600",
  7: "bg-rose-700",
};

const LEVEL_BG: Record<number, string> = {
  0: "bg-foreground-subtle/20",
  1: "bg-secondary/20",
  2: "bg-amber-500/20",
  3: "bg-amber-600/20",
  4: "bg-blue-600/20",
  5: "bg-indigo-600/20",
  6: "bg-purple-600/20",
  7: "bg-rose-700/20",
};

export function CareerLadderViz({ ladder, currentLevel = -1, className }: CareerLadderVizProps) {
  if (!ladder.length) return null;

  const maxLevel = Math.max(...ladder.map((s) => s.minLevel));

  return (
    <div className={cn("space-y-6", className)}>
      <h3 className="text-lg font-semibold text-foreground">Career Progression Path</h3>
      <p className="text-sm text-foreground-muted">
        Typical progression from entry-level to executive roles. Your current level is marked.
      </p>

      <div className="relative flex flex-col">
        {/* Vertical level axis */}
        <div className="relative">
          {/* Level markers on the left */}
          <div className="absolute left-0 top-0 bottom-24 flex flex-col justify-between text-xs text-foreground-muted">
            <span>LVL 0</span>
            <span>LVL 1</span>
            <span>LVL 2</span>
            <span>LVL 3</span>
            <span>LVL 4</span>
            <span>LVL 5</span>
            <span>LVL 6</span>
            <span>LVL 7</span>
          </div>

          {/* Steps */}
          <div className="space-y-3 pl-16">
            {ladder.map((step, idx) => {
              const isCurrent = currentLevel >= 0 && currentLevel >= step.minLevel && (idx === ladder.length - 1 || currentLevel < ladder[idx + 1]?.minLevel);
              const isFuture = currentLevel >= 0 && currentLevel < step.minLevel;
              const isPast = currentLevel >= 0 && currentLevel >= step.minLevel && (idx < ladder.length - 1);

              return (
                <div
                  key={step.title}
                  className={cn(
                    "relative pl-2 transition-all hover:bg-surface/50 rounded-lg p-3 -mx-2",
                    isCurrent && "bg-primary/10 border-l-2 border-l-primary",
                    isFuture && "opacity-60",
                    !isCurrent && !isFuture && "opacity-40"
                  )}
                >
                  {/* Connector line */}
                  {idx < ladder.length - 1 && (
                    <div className="absolute left-5 top-full h-6 w-px bg-border" />
                  )}

                  {/* Level badge */}
                  <div className="flex items-center gap-2 mb-1">
                    <Badge
                      variant={isCurrent ? "default" : "secondary"}
                      className={cn(
                        "font-mono text-xs",
                        isCurrent && "bg-primary text-primary-foreground"
                      )}
                    >
                      {step.minLevel}+
                    </Badge>
                    <Badge variant="outline" className="text-xs font-medium">
                      {step.typicalYearsOfExperience || `${Math.max(0, step.minLevel * 2)}-${Math.max(2, step.minLevel * 3 + 1)} yrs`}
                    </Badge>
                    {isCurrent && (
                      <Badge variant="secondary" className="text-xs font-medium">
                      CURRENT
                    </Badge>
                    )}
                    {isFuture && (
                      <Badge variant="outline" className="text-xs font-medium text-foreground-muted">
                        TARGET
                      </Badge>
                    )}
                  </div>

                  {/* Role title */}
                  <h4
                    className={cn(
                      "text-base font-semibold",
                      isCurrent ? "text-foreground" : isFuture ? "text-foreground-muted" : "text-foreground/60"
                    )}
                  >
                    {step.title}
                  </h4>

                  {/* Description (expandable) */}
                  {step.description && (
                    <p className="mt-1 text-sm text-foreground-muted leading-relaxed">
                      {step.description}
                    </p>
                  )}

                  {/* Progress bar showing how far into this level */}
                  {isCurrent && currentLevel >= 0 && (
                    <div className="mt-2">
                      <div className="flex justify-between text-xs text-foreground-muted mb-1">
                        <span>Progress to next level</span>
                        <span>{Math.round(((currentLevel - step.minLevel) / Math.max(1, (ladder[idx + 1]?.minLevel ?? step.minLevel + 3) - step.minLevel)) * 100)}%</span>
                      </div>
                      <Progress
                        value={Math.min(100, ((currentLevel - step.minLevel) / Math.max(1, (ladder[idx + 1]?.minLevel ?? step.minLevel + 3) - step.minLevel)) * 100)}
                        className="h-1.5"
                        indicatorClassName={cn("h-1.5 bg-primary")}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-xs text-foreground-muted pt-2 border-t border-border">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-primary/20 border-l-2 border-l-primary" />
          <span>Current role (based on your level)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-foreground/60" />
          <span>Achieved / past roles</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-foreground/40" />
          <span>Future / target roles</span>
        </div>
      </div>
    </div>
  );
}

export default CareerLadderViz;
