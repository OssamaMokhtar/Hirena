"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AuthForm } from "@/components/auth-form";
import { getCurrentUser } from "@/lib/user-service";
import { Loader } from "lucide-react";

export default function SignInPage() {
  const [user, setUser] = React.useState<{ id: string; email: string; displayName: string; createdAt: Date } | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [mode, setMode] = React.useState<"signin" | "signup">("signin");

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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-foreground">Sign in to Hirena</h1>
        <p className="mt-1 text-foreground-muted">Access your assessment history and track your career progress</p>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-base">Hello again</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
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

      {/* Footer */}
      <p className="mt-6 text-center text-xs text-foreground-subtle">
        By continuing, you agree to Hirena&apos;s Terms of Service and Privacy Policy. Demo mode stores data locally only.
      </p>
    </div>
  );
}
