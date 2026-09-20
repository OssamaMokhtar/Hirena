"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AuthForm } from "@/components/auth-form";
import { getCurrentUser } from "@/lib/user-service";

import { Loader } from "lucide-react";

export default function SignUpPage() {
  const [user, setUser] = React.useState<{ id: string; email: string; displayName: string; createdAt: Date } | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [mode, setMode] = React.useState<"signin" | "signup">("signup");

  React.useEffect(() => {
    const load = async () => {
      try {
        const u = await getCurrentUser();
        setUser(u);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader className="h-6 w-6 animate-spin text-foreground-muted" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12 sm:px-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
          <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-foreground">Create your Hirena account</h1>
        <p className="mt-1 text-foreground-muted">Start assessing your skills and tracking your career growth</p>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-base">Join Hirena</CardTitle>
          <CardDescription>Create an account to save your assessments and track progress over time</CardDescription>
        </CardHeader>
        <CardContent>
          <AuthForm
            user={user}
            mode={mode}
            onSwitchMode={setMode}
            isLoading={loading}
          />
        </CardContent>
      </Card>

      {/* Benefits */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {[
          { icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", title: "Save assessments", desc: "Your results persist across sessions" },
          { icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6", title: "Track progress", desc: "Compare assessments over time" },
          { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", title: "Personalized roadmap", desc: "AI-powered development plan" },
          { icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z", title: "Career ladder viz", desc: "See your path to the next level" },
        ].map((item, i) => (
          <div key={i} className="flex gap-3 rounded-lg border border-border bg-surface/50 p-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" dangerouslySetInnerHTML={{ __html: item.icon }} />
            </div>
            <div>
              <div className="text-sm font-medium text-foreground">{item.title}</div>
              <div className="text-xs text-foreground-muted">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <p className="mt-6 text-center text-xs text-foreground-subtle">
        No credit card required. Free to use. Your data stays private.
      </p>
    </div>
  );
}
