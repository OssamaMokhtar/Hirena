"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n-provider";
import type { CareerLadderStep } from "@/types";

interface CareerStepDetailPanelProps {
  step: CareerLadderStep;
  currentLevel: number;
  isCurrent: boolean;
  className?: string;
}

export function CareerStepDetailPanel({ step, currentLevel, isCurrent, className }: CareerStepDetailPanelProps) {
  const { t } = useTranslation();

  const salary = step.salaryRange;
  const skills = step.skills ?? [];
  const responsibilities = step.responsibilities ?? [];

  return (
    <Card className={cn("border-primary/20 bg-primary/5", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{step.title}</CardTitle>
          <Badge variant={isCurrent ? "default" : "secondary"} className="font-mono text-xs">
            {step.minLevel}+
          </Badge>
        </div>
        <CardDescription className="text-foreground-muted">
          {step.typicalYearsOfExperience ?? `${Math.max(0, step.minLevel * 2)}-${Math.max(2, step.minLevel * 3 + 1)} years experience`}
          {salary ? ` · ${salary.min}-${salary.max} USD/mo` : ""}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Salary range */}
        {salary && (
          <div>
            <div className="text-xs text-foreground-muted font-medium mb-1">{t("careerDetail.salaryRange")}</div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-semibold text-foreground">{salary.min}</span>
              <span className="text-sm text-foreground-muted">–</span>
              <span className="text-lg font-semibold text-foreground">{salary.max}</span>
              <span className="text-sm text-foreground-muted">
                {salary.currency ?? "USD"}/mo
              </span>
            </div>
            {salary.currency !== "AED" && "(≈ " + Math.round(salary.min * 3.69) + "–" + Math.round(salary.max * 3.69) + " AED/mo)" && (
              <div className="text-xs text-foreground-muted mt-1">≈ {Math.round(salary.min * 3.69)}–{Math.round(salary.max * 3.69)} AED/mo (UAE)</div>
            )}
          </div>
        )}

        {/* Description */}
        {step.description && (
          <div>
            <div className="text-xs text-foreground-muted font-medium mb-1">{t("careerDetail.description")}</div>
            <p className="text-sm text-foreground leading-relaxed">{step.description}</p>
          </div>
        )}

        {/* Responsibilities */}
        {responsibilities.length > 0 && (
          <div>
            <div className="text-xs text-foreground-muted font-medium mb-2">{t("careerDetail.responsibilities")}</div>
            <ul className="space-y-1.5">
              {responsibilities.map((r, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Skills expected at this level */}
        {skills.length > 0 && (
          <div>
            <div className="text-xs text-foreground-muted font-medium mb-2">
              {t("careerDetail.expectedSkills")} ({skills.length})
            </div>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skillId) => (
                <Badge key={skillId} variant="outline" className="text-xs font-normal">
                  {skillId}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Current level indicator */}
        {isCurrent && (
          <div className="flex items-center gap-2 rounded-md bg-emerald-50 border border-emerald-200/60 px-3 py-2">
            <span className="text-xs font-medium text-emerald-700">{t("careerDetail.yourCurrentLevel")}</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-2 border-t border-border">
          <Button variant="outline" size="sm" className="flex-1">
            {t("careerDetail.seePathToNext")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
