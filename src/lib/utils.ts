import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatScore(score: number): string {
  return `${score}/100`;
}

export function getScoreColor(score: number): string {
  if (score >= 80) return "text-success";
  if (score >= 60) return "text-warning";
  if (score >= 40) return "text-foreground";
  return "text-error";
}

export function getScoreBg(score: number): string {
  if (score >= 80) return "bg-success/10";
  if (score >= 60) return "bg-warning/10";
  if (score >= 40) return "bg-secondary/50";
  return "bg-error/10";
}

export function getScoreLabel(score: number): string {
  if (score >= 80) return "Excellent";
  if (score >= 60) return "Good";
  if (score >= 40) return "Average";
  return "Needs Improvement";
}

export function proficiencyToLabel(level: number): string {
  const descriptors: Record<number, string> = {
    0: "No Exposure",
    1: "Aware",
    2: "Basic",
    3: "Intermediate",
    4: "Advanced",
    5: "Expert",
  };
  return descriptors[level] || "Unknown";
}
