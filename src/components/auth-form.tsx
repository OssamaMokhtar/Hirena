"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { signIn, signUp, getCurrentUser, type User } from "@/lib/user-service";

interface AuthFormProps {
  user: User | null;
  onSwitchMode: (mode: "signin" | "signup") => void;
  mode: "signin" | "signup";
  isLoading?: boolean;
}

function useSimpleToast() {
  const [toasts, setToasts] = React.useState<Array<{ id: number; title: string; description: string; variant?: string }>>([]);
  let nextId = 0;
  const toast = React.useCallback(({ title, description, variant }: { title: string; description: string; variant?: string }) => {
    const id = nextId++;
    setToasts(prev => [...prev, { id, title, description, variant: variant || "default" }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  }, []);
  return { toasts, toast };
}

export function AuthForm({ user, onSwitchMode, mode, isLoading }: AuthFormProps) {
  const { toast } = useSimpleToast();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [displayName, setDisplayName] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || (mode !== "signup" && !password) || (mode === "signup" && (!password || password.length < 6))) {
      setError(mode === "signup" ? "Password must be at least 6 characters" : "Email and password are required");
      return;
    }
    if (mode === "signup" && (!displayName || displayName.trim().length < 2)) {
      setError("Display name is required (at least 2 characters)");
      return;
    }
    setLoading(true);
    try {
      let result;
      if (mode === "signin") {
        result = await signIn(email, password);
      } else {
        result = await signUp(email, password, displayName.trim());
      }
      if (result.success && result.user) {
        toast({ title: "Success", description: mode === "signin" ? "Signed in successfully" : "Account created successfully" });
        // Reload page to refresh auth state
        window.location.reload();
      } else {
        setError(result.error || "Authentication failed");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return (
      <div className="mx-auto max-w-md text-center py-8">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A9 9 0 0112 15a9 9 0 016.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-foreground">Welcome back, {user.displayName?.split(" ")[0]}!</h2>
        <p className="mt-2 text-foreground-muted">You're signed in as {user.email}</p>
        <Button
          variant="outline"
          className="mt-6 w-full"
          size="lg"
          onClick={() => {
            if (typeof window !== "undefined") {
              localStorage.removeItem("hirena_user");
              localStorage.removeItem("hirena_auth_mode");
              window.location.reload();
            }
          }}
        >
          Sign out
        </Button>
        <p className="mt-4 text-xs text-foreground-subtle">
          {typeof window !== "undefined" && localStorage.getItem("hirena_auth_mode") === "demo"
            ? "Demo mode — no server involved"
            : "Signed in via Supabase Auth"}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Demo mode notice */}
      <div className="flex items-center gap-2 rounded-lg bg-secondary/50 border border-border px-3 py-2">
        <svg className="h-4 w-4 text-foreground-muted flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-xs text-foreground-muted">
          {typeof window !== "undefined" && !localStorage.getItem("hirena_auth_mode")
            ? "Demo mode — no server involved"
            : "Signed in via Supabase Auth"}
        </span>
      </div>

      {/* Display name (signup only) */}
      {mode === "signup" && (
        <div>
          <Label htmlFor="displayName">Display Name</Label>
          <Input
            id="displayName"
            type="text"
            placeholder="Ahmed Al-Rashidi"
            value={displayName}
            onChange={e => setDisplayName(e.target.value)}
            autoComplete="name"
            disabled={loading || isLoading}
          />
        </div>
      )}

      {/* Email */}
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          autoComplete="email"
          disabled={loading || isLoading}
        />
      </div>

      {/* Password */}
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Min. 6 characters"
          value={password}
          onChange={e => setPassword(e.target.value)}
          autoComplete={mode === "signin" ? "current-password" : "new-password"}
          disabled={loading || isLoading}
        />
      </div>

      {error && (
        <div className="rounded-md bg-error/10 border border-error/20 px-3 py-2">
          <p className="text-sm text-error">{error}</p>
        </div>
      )}

      {/* Submit */}
      <Button
        type="submit"
        className="w-full"
        size="lg"
        disabled={loading || isLoading}
        isLoading={loading || isLoading}
      >
        {mode === "signin" ? "Sign In" : "Create Account"}
      </Button>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-surface px-2 text-foreground-muted">or</span>
        </div>
      </div>

      {/* Switch mode */}
      <p className="text-center text-sm text-foreground-muted">
        {mode === "signin" ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          type="button"
          onClick={() => onSwitchMode(mode === "signin" ? "signup" : "signin")}
          className="font-medium text-primary hover:text-primary-dark hover:underline"
        >
          {mode === "signin" ? "Sign up" : "Sign in"}
        </button>
      </p>

      {/* Demo quick access */}
      {typeof window !== "undefined" && !localStorage.getItem("hirena_auth_mode") && (
        <div className="rounded-lg border border-border bg-surface p-4">
          <p className="text-xs font-medium text-foreground-muted mb-2">Quick access (demo)</p>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => {
                const demoUser = { id: "demo-user", email: "demo@hirena.app", displayName: "Demo User", createdAt: new Date() };
                localStorage.setItem("hirena_user", JSON.stringify(demoUser));
                localStorage.setItem("hirena_auth_mode", "demo");
                window.location.reload();
              }}
            >
              Continue as Demo
            </Button>
          </div>
          <p className="mt-2 text-[11px] text-foreground-subtle">
            Skip account creation. Your data stays in this browser only.
          </p>
        </div>
      )}
    </form>
  );
}
