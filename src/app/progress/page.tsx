"use client";

import * as React from "react";
import { getCurrentUser } from "@/lib/user-service";
import { ProgressTrackingDashboard } from "@/components/progress-tracking-dashboard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function ProgressPage() {
  const [userName, setUserName] = React.useState<string | null>(null);
  const [userId, setUserId] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();

  React.useEffect(() => {
    getCurrentUser().then((user) => {
      if (user) {
        setUserName(user.displayName);
        setUserId(user.id);
      } else {
        setUserName("Demo User");
        setUserId("demo-user");
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-foreground-muted">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 border-b border-border bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/80">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-md shadow-primary/20">
                <span className="text-lg font-bold text-primary-foreground">H</span>
              </div>
              <span className="text-lg font-bold text-foreground">Hirena</span>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/")}
                className="text-foreground hover:text-primary"
              >
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        <div className="mx-auto max-w-5xl px-4 py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Your Progress</h1>
            <p className="mt-2 text-foreground-muted">
              Track your skills assessment history and see how you&apos;re growing over time.
            </p>
          </div>

          <ProgressTrackingDashboard userId={userId!} userName={userName!} />
        </div>
      </main>
    </div>
  );
}
