"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-surface/50 p-12 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary text-3xl font-bold">
        ?
      </div>
      {title && (
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>
      )}
      {description && (
        <p className="mt-2 max-w-sm text-foreground-muted">{description}</p>
      )}
      {action && (
        <Button
          onClick={action.onClick}
          className="mt-6"
        >
          {action.label}
        </Button>
      )}
    </div>
  );
}

export function NoSkillsState() {
  return (
    <EmptyState
      title="No skills assessed yet"
      description="Complete an assessment to see your skills profile, gap analysis, and personalized roadmap."
      action={{
        label: "Take Assessment",
        onClick: () => window.location.href = "/assessment",
      }}
    />
  );
}

export function NoResultsState() {
  return (
    <EmptyState
      title="No assessment results"
      description="Your assessment results will appear here once you complete the skills assessment."
      action={{
        label: "Start Assessment",
        onClick: () => window.location.href = "/assessment",
      }}
    />
  );
}

export function AssessmentNotFound() {
  return (
    <EmptyState
      title="Assessment not found"
      description="The assessment you're looking for doesn't exist or has been removed."
      action={{
        label: "New Assessment",
        onClick: () => window.location.href = "/assessment",
      }}
    />
  );
}

export function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl bg-surface p-12 text-center">
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
      <h3 className="text-lg font-semibold text-foreground">Analyzing your skills...</h3>
      <p className="mt-2 text-foreground-muted">This usually takes 30-60 seconds</p>
    </div>
  );
}

export default EmptyState;
