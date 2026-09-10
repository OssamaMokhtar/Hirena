"use client";

import { useState } from "react";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  REGIONS,
  INDUSTRIES,
  PM_CAREER_LADDER,
  REGIONAL_BENCHMARKS,
  PM_SKILLS,
} from "@/lib/competency-model";
import type { ProficiencyLevel, SkillCategory } from "@/types";

interface StepState {
  step: number;
  profile: {
    name: string;
    email: string;
    currentRole: string;
    experienceYears: string;
    industry: string;
    location: string;
    careerGoal: string;
  };
  goal: {
    targetRole: string;
    targetTrack: string;
    region: string;
  };
  assessment: Record<string, ProficiencyLevel>;
}

const initialState: StepState = {
  step: 1,
  profile: {
    name: "",
    email: "",
    currentRole: "",
    experienceYears: "",
    industry: "",
    location: "",
    careerGoal: "",
  },
  goal: {
    targetRole: "",
    targetTrack: "product-management",
    region: "MENA",
  },
  assessment: {},
};

interface AssessmentWizardProps {
  onComplete?: (result: any) => void;
}

export function AssessmentWizard({ onComplete }: AssessmentWizardProps) {
  const [state, setState] = React.useState<StepState>(initialState);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const totalSteps = 4;

  const updateProfile = (field: keyof StepState["profile"], value: string) => {
    setState((prev) => ({
      ...prev,
      profile: { ...prev.profile, [field]: value },
    }));
  };

  const updateGoal = (field: keyof StepState["goal"], value: string) => {
    setState((prev) => ({
      ...prev,
      goal: { ...prev.goal, [field]: value },
    }));
  };

  const updateAssessment = (skillId: string, level: ProficiencyLevel) => {
    setState((prev) => ({
      ...prev,
      assessment: { ...prev.assessment, [skillId]: level },
    }));
  };

  const nextStep = () => {
    if (state.step < totalSteps) {
      setState((prev) => ({ ...prev, step: prev.step + 1 }));
    }
  };

  const prevStep = () => {
    if (state.step > 1) {
      setState((prev) => ({ ...prev, step: prev.step - 1 }));
    }
  };

  const getStepTitle = () => {
    switch (state.step) {
      case 1:
        return "Create Your Profile";
      case 2:
        return "Set Your Career Goal";
      case 3:
        return "Assess Your Skills";
      case 4:
        return "Review & Submit";
      default:
        return "";
    }
  };

  const getStepDescription = () => {
    switch (state.step) {
      case 1:
        return "Tell us about yourself so we can personalize your assessment.";
      case 2:
        return "Choose your target role and region to benchmark against the right market.";
      case 3:
        return "Rate your proficiency in key PM skills. Be honest — this is for you.";
      case 4:
        return "Review your assessment and let AI analyze your skills.";
      default:
        return "";
    }
  };

  // Group skills by category
  const skillsByCategory = React.useMemo(() => {
    const grouped: Partial<Record<SkillCategory, typeof PM_SKILLS>> = {
      strategy: {},
      discovery: {},
      delivery: {},
      analytics: {},
      ai: {},
      leadership: {},
    };

    Object.entries(PM_SKILLS).forEach(([id, skill]) => {
      if (!grouped[skill.category]) grouped[skill.category] = {};
      grouped[skill.category]![id] = skill;
    });

    return grouped;
  }, []);

  // Step 1: Profile
  if (state.step === 1) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-2xl px-4 py-12">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20">
                <span className="text-xl font-bold text-primary-foreground">H</span>
              </div>
              <h1 className="text-2xl font-bold text-foreground">Hirena</h1>
            </div>
            <h2 className="text-xl font-semibold text-foreground">{getStepTitle()}</h2>
            <p className="mt-2 text-foreground-muted">{getStepDescription()}</p>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4].map((s) => (
                <React.Fragment key={s}>
                  <div
                    className={cn(
                      "h-2 w-8 rounded-full transition-all duration-300",
                      s === state.step
                        ? "bg-primary"
                        : s < state.step
                        ? "bg-primary/50"
                        : "bg-border"
                    )}
                  />
                  {s < 4 && <div className="h-2 w-2" />}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="space-y-6">
            <Input
              label="Full Name"
              type="text"
              value={state.profile.name}
              onChange={(e) => updateProfile("name", e.target.value)}
              placeholder="e.g. Ahmed Al-Mansoori"
              required
            />

            <Input
              label="Email Address"
              type="email"
              value={state.profile.email}
              onChange={(e) => updateProfile("email", e.target.value)}
              placeholder="you@company.com"
              required
            />

            <Input
              label="Current Role"
              type="text"
              value={state.profile.currentRole}
              onChange={(e) => updateProfile("currentRole", e.target.value)}
              placeholder="e.g. Product Manager"
              required
            />

            <Input
              label="Years of Experience"
              type="number"
              value={state.profile.experienceYears}
              onChange={(e) => updateProfile("experienceYears", e.target.value)}
              placeholder="e.g. 3"
              min={0}
              max={50}
              required
            />

            <Select
              value={state.profile.industry}
              onValueChange={(v) => updateProfile("industry", v)}
            >
              <SelectTrigger placeholder="Select your industry">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {INDUSTRIES.map((ind: string) => (
                  <SelectItem key={ind} value={ind}>
                    {ind}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              label="Location (Country)"
              type="text"
              value={state.profile.location}
              onChange={(e) => updateProfile("location", e.target.value)}
              placeholder="e.g. United Arab Emirates"
              required
            />

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">
                Career Goal
              </label>
              <textarea
                value={state.profile.careerGoal}
                onChange={(e) => updateProfile("careerGoal", e.target.value)}
                placeholder="e.g. I want to become a Director of Product within 3 years"
                className="flex min-h-[100px] w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground placeholder:text-foreground-subtle shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                required
              />
            </div>

            {error && (
              <div className="rounded-lg border border-error/50 bg-error/10 p-3 text-sm text-error">
                {error}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="mt-8 flex justify-end">
            <Button onClick={nextStep} disabled={!state.profile.name || !state.profile.email || !state.profile.currentRole}>
              Continue
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Step 2: Goal Selection
  if (state.step === 2) {
    const targetRole = state.goal.targetRole;
    const benchmarks = targetRole ? (REGIONAL_BENCHMARKS[state.goal.region] as any)?.[targetRole] : null;

    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-2xl px-4 py-12">
          <div className="mb-8 text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20">
                <span className="text-xl font-bold text-primary-foreground">H</span>
              </div>
              <h1 className="text-2xl font-bold text-foreground">Hirena</h1>
            </div>
            <h2 className="text-xl font-semibold text-foreground">{getStepTitle()}</h2>
            <p className="mt-2 text-foreground-muted">{getStepDescription()}</p>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4].map((s) => (
                <React.Fragment key={s}>
                  <div
                    className={cn(
                      "h-2 w-8 rounded-full transition-all duration-300",
                      s === state.step
                        ? "bg-primary"
                        : s < state.step
                        ? "bg-primary/50"
                        : "bg-border"
                    )}
                  />
                  {s < 4 && <div className="h-2 w-2" />}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            {/* Track Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">
                Career Track
              </label>
              <Select
                value={state.goal.targetTrack}
                onValueChange={(v) => updateGoal("targetTrack", v)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="product-management">
                    Product Management
                  </SelectItem>
                  <SelectItem value="software-engineering" disabled>
                    Software Engineering (coming soon)
                  </SelectItem>
                  <SelectItem value="data-science" disabled>
                    Data Science (coming soon)
                  </SelectItem>
                  <SelectItem value="ux-design" disabled>
                    UX Design (coming soon)
                  </SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-foreground-muted">
                We're launching with Product Management as our first track.
              </p>
            </div>

            {/* Role Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">
                Target Role
              </label>
              <Select
                value={state.goal.targetRole}
                onValueChange={(v) => updateGoal("targetRole", v)}
              >
                <SelectTrigger placeholder="Select your target role">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PM_CAREER_LADDER.map((role: any) => (
                    <SelectItem key={role.role} value={role.role}>
                      {role.role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Region Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">
                Region (for benchmarking)
              </label>
              <Select
                value={state.goal.region}
                onValueChange={(v) => updateGoal("region", v)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {REGIONS.map((region: any) => (
                    <SelectItem key={region.value} value={region.value}>
                      {region.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Preview */}
            {targetRole && benchmarks && (
              <div className="rounded-lg border border-border bg-surface p-5">
                <h3 className="text-sm font-medium text-foreground">
                  Benchmark Preview for {targetRole} in {state.goal.region}
                </h3>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {Object.entries(benchmarks as Record<string, any>).map(([category, data]) => (
                    <div key={category} className="space-y-1">
                      <div className="flex justify-between text-xs text-foreground-muted">
                        <span className="capitalize">{category}</span>
                        <span className="font-medium text-foreground">
                          {data.average.toFixed(1)} / 5
                        </span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                        <div
                          className="h-full rounded-full bg-primary transition-all duration-300"
                          style={{ width: `${(data.average / 5) * 100}%` }}
                        />
                      </div>
                      <div className="text-xs text-foreground-muted">
                        Top quartile: {data.topQuartile.toFixed(1)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 flex justify-between">
            <Button variant="ghost" onClick={prevStep}>
              Back
            </Button>
            <Button
              onClick={nextStep}
              disabled={!state.goal.targetRole}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Step 3: Assessment
  if (state.step === 3) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-3xl px-4 py-12">
          <div className="mb-8 text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20">
                <span className="text-xl font-bold text-primary-foreground">H</span>
              </div>
              <h1 className="text-2xl font-bold text-foreground">Hirena</h1>
            </div>
            <h2 className="text-xl font-semibold text-foreground">{getStepTitle()}</h2>
            <p className="mt-2 text-foreground-muted">{getStepDescription()}</p>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4].map((s) => (
                <React.Fragment key={s}>
                  <div
                    className={cn(
                      "h-2 w-8 rounded-full transition-all duration-300",
                      s === state.step
                        ? "bg-primary"
                        : s < state.step
                        ? "bg-primary/50"
                        : "bg-border"
                    )}
                  />
                  {s < 4 && <div className="h-2 w-2" />}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Skill Assessment Grid */}
          <div className="space-y-6">
            {Object.entries(skillsByCategory).map(([category, skills]) => (
              <div key={category} className="rounded-lg border border-border bg-surface p-5">
                <h3 className="text-base font-semibold text-foreground capitalize">
                  {category}
                </h3>
                <p className="mt-1 text-sm text-foreground-muted">
                  Rate your proficiency in each skill (0 = no exposure, 5 = expert)
                </p>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {Object.entries(skills).map(([skillId, skill]) => {
                    const currentLevel = state.assessment[skillId] || 0;

                    return (
                      <div
                        key={skillId}
                        className="space-y-2 rounded-lg bg-background p-3"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <label
                              htmlFor={`skill-${skillId}`}
                              className="text-sm font-medium text-foreground"
                            >
                              {skill.name}
                            </label>
                            <p className="text-xs text-foreground-muted mt-0.5 line-clamp-2">
                              {skill.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          {Array.from({ length: 6 }, (_, i) => i).map((level) => (
                            <button
                              key={level}
                              type="button"
                              onClick={() => updateAssessment(skillId, level as ProficiencyLevel)}
                              className={cn(
                                "flex h-8 w-8 cursor-pointer items-center justify-center rounded text-sm font-medium transition-all duration-100",
                                level <= currentLevel
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-secondary text-foreground-muted hover:bg-secondary/80"
                              )}
                            >
                              {level}
                            </button>
                          ))}
                        </div>
                        <p className="text-xs text-foreground-muted text-right">
                          {currentLevel === 0
                            ? "Not assessed"
                            : `${currentLevel}/5`}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-between">
            <Button variant="ghost" onClick={prevStep}>
              Back
            </Button>
            <Button onClick={nextStep}>
              Continue to Review
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Step 4: Review & Submit
  if (state.step === 4) {
    const totalSkills = Object.keys(PM_SKILLS).length;
    const assessedSkills = Object.values(state.assessment).filter((l) => l > 0).length;

    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-3xl px-4 py-12">
          <div className="mb-8 text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20">
                <span className="text-xl font-bold text-primary-foreground">H</span>
              </div>
              <h1 className="text-2xl font-bold text-foreground">Hirena</h1>
            </div>
            <h2 className="text-xl font-semibold text-foreground">{getStepTitle()}</h2>
            <p className="mt-2 text-foreground-muted">{getStepDescription()}</p>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4].map((s) => (
                <React.Fragment key={s}>
                  <div
                    className={cn(
                      "h-2 w-8 rounded-full transition-all duration-300",
                      s === state.step
                        ? "bg-primary"
                        : s < state.step
                        ? "bg-primary/50"
                        : "bg-border"
                    )}
                  />
                  {s < 4 && <div className="h-2 w-2" />}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border border-border bg-surface p-5">
                <div className="text-sm text-foreground-muted">Profile</div>
                <div className="mt-1 text-lg font-semibold text-foreground">
                  {state.profile.name || "—"}
                </div>
                <div className="text-sm text-foreground-muted">
                  {state.profile.currentRole || "—"}
                </div>
              </div>

              <div className="rounded-lg border border-border bg-surface p-5">
                <div className="text-sm text-foreground-muted">Target</div>
                <div className="mt-1 text-lg font-semibold text-foreground">
                  {state.goal.targetRole || "—"}
                </div>
                <div className="text-sm text-foreground-muted">
                  {state.goal.region}
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-surface p-5">
              <h3 className="text-base font-semibold text-foreground">
                Assessment Summary
              </h3>
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground">
                    {totalSkills}
                  </div>
                  <div className="text-sm text-foreground-muted">Skills Assessed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">
                    {assessedSkills}
                  </div>
                  <div className="text-sm text-foreground-muted">Rated</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent">
                    {totalSkills - assessedSkills}
                  </div>
                  <div className="text-sm text-foreground-muted">Not Rated</div>
                </div>
              </div>
            </div>

            {error && (
              <div className="rounded-lg border border-error/50 bg-error/10 p-3 text-sm text-error">
                {error}
              </div>
            )}
          </div>

          <div className="mt-8 flex justify-between">
            <Button variant="ghost" onClick={prevStep}>
              Back
            </Button>
            <Button
              onClick={async () => {
                setIsLoading(true);
                setError(null);
                try {
                  // In production, call the API here
                  await new Promise((r) => setTimeout(r, 1500));

                  if (onComplete) {
                    onComplete({
                      ...state,
                      overallScore: Math.round(Math.random() * 40 + 60),
                    });
                  }
                } catch (err) {
                  setError("Something went wrong. Please try again.");
                } finally {
                  setIsLoading(false);
                }
              }}
              isLoading={isLoading}
              disabled={assessedSkills === 0}
            >
              {isLoading ? "Analyzing..." : "Complete Assessment"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default AssessmentWizard;
