"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { FacialBiasDoc, getFacialBiasSummary } from "@/lib/facial-bias-doc";
import { getCurrentUser } from "@/lib/user-service";
import { LanguageSelector } from "@/components/language-selector";
import { useTranslation } from "@/lib/i18n-provider";

// ─── Mock AI Mode Indicator ──────────────────────────────────────────────────
// Shows in the UI when the mock AI fallback is active instead of real OpenAI.
// Reads AI_MODE from environment or defaults to "mock" when OPENAI_API_KEY is
// absent or when API calls fail (429/from balance).

interface MockModeIndicatorProps {
  className?: string;
}

const MOCK_MODE_WARN = "This assessment used Hirena's built-in mock AI engine — no OpenAI credits were consumed. Connect a real API key to enable AI-powered skill analysis.";

export function MockModeIndicator({ className }: MockModeIndicatorProps) {
  const { t } = useTranslation();
  const [mode, setMode] = React.useState<"real" | "mock" | "unknown">("unknown");

  React.useEffect(() => {
    const detectMode = async () => {
      try {
        const res = await fetch("/api/test-env");
        if (!res.ok) { setMode("mock"); return; }
        const data = await res.json();
        const hasKey = data.openaiApiKey && data.openaiApiKey.startsWith("sk-");
        const modeEnv = data.aiMode || "unknown";
        if (modeEnv === "mock" || !hasKey) {
          setMode("mock");
        } else {
          setMode("real");
        }
      } catch {
        setMode("mock");
      }
    };
    detectMode();
  }, []);

  if (mode === "unknown") return null;

  return (
    <div className={cn("flex items-center gap-2 rounded-md bg-amber-50 border border-amber-200/60 px-3 py-2", className)}>
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 text-amber-700 text-sm">
      {mode === "mock" ? "🤖" : "🧠"}
      </div>
      <div className="flex flex-col">
      <span className="text-xs font-semibold text-amber-800">
      {mode === "mock" ? t("settings.mockModeLabel") : t("settings.aiModeLabel")}
      </span>
      <span className="text-[10px] text-amber-700/70">
      {mode === "mock" ? t("settings.mockModeSubtext") : t("settings.aiModeSubtext")}
        </span>
      </div>
      {mode === "mock" && (
        <div className="ml-auto max-w-xs">
          <p className="text-[11px] text-amber-700/80 leading-snug">{MOCK_MODE_WARN}</p>
        </div>
      )}
    </div>
  );
}

// ─── Simple Toast (avoids useToast dependency) ───────────────────────────────

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

// ─── Settings Page ───────────────────────────────────────────────────────────

export function SettingsPage() {
  const { t } = useTranslation();
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState<{ id: string; email: string; displayName: string } | null>(null);
  const [facialEnabled, setFacialEnabled] = React.useState(false);
  const [facialLoaded, setFacialLoaded] = React.useState(false);
  const [preferences, setPreferences] = React.useState<{
    facialAnalysisEnabled?: boolean;
    useRealAi?: boolean;
    aiDisclaimerAccepted?: boolean;
    learningInterests?: string[];
    language?: string;
  } | null>(null);
  const [saving, setSaving] = React.useState(false);
  const { toast } = useSimpleToast();

  // Load user
  React.useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const supabaseUser = await getCurrentUser();
        if (supabaseUser) {
          setUser({ id: supabaseUser.id, email: supabaseUser.email || "", displayName: supabaseUser.displayName || supabaseUser.email?.split("@")[0] || "" });
        } else {
          const stored = localStorage.getItem("hirena-demo-user");
          if (stored) {
            const parsed = JSON.parse(stored);
            setUser(parsed);
          } else {
            setUser({ id: "demo-user", email: "demo@hirena.app", displayName: "Demo User" });
          }
        }
      } catch {
        const stored = localStorage.getItem("hirena-demo-user");
        if (stored) {
          setUser(JSON.parse(stored));
        } else {
          setUser({ id: "demo-user", email: "demo@hirena.app", displayName: "Demo User" });
        }
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Load preferences
  React.useEffect(() => {
    if (!user) return;
    const loadPrefs = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          if (data.profile) {
            setPreferences(data.profile);
            setFacialEnabled(data.profile.facialAnalysisEnabled ?? false);
          }
        } else {
          const stored = localStorage.getItem("hirena-preferences");
          if (stored) {
            const prefs = JSON.parse(stored);
            setPreferences(prefs);
            setFacialEnabled(prefs.facialAnalysisEnabled ?? false);
          }
        }
      } catch {
        const stored = localStorage.getItem("hirena-preferences");
        if (stored) {
          const prefs = JSON.parse(stored);
          setPreferences(prefs);
          setFacialEnabled(prefs.facialAnalysisEnabled ?? false);
        }
      } finally {
        setFacialLoaded(true);
      }
    };
    loadPrefs();
  }, [user]);

  const handleSavePreferences = async (prefs: any) => {
    setSaving(true);
    try {
      const supabaseUser = await getCurrentUser();
      if (supabaseUser) {
        const res = await fetch("/api/auth/preferences", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(prefs),
        });
        if (res.ok) {
          setPreferences(p => ({ ...p, ...prefs }));
          toast({ title: "Preferences saved", description: "Your settings have been updated." });
          setSaving(false);
          return;
        }
      }
      const stored = localStorage.getItem("hirena-preferences");
      const current = stored ? JSON.parse(stored) : {};
      localStorage.setItem("hirena-preferences", JSON.stringify({ ...current, ...prefs }));
      setPreferences(p => ({ ...p, ...prefs }));
      toast({ title: "Preferences saved (demo mode)", description: "Settings saved to local storage." });
    } catch (err) {
      toast({ title: "Error", description: "Failed to save preferences.", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleFacialToggle = async (enabled: boolean) => {
    setSaving(true);
    try {
      const supabaseUser = await getCurrentUser();
      if (supabaseUser) {
        const res = await fetch("/api/auth/facial-toggle", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ enabled }),
        });
        if (res.ok) {
          setFacialEnabled(enabled);
          setPreferences(p => ({ ...p, facialAnalysisEnabled: enabled }));
          toast({
            title: enabled ? "Facial analysis enabled" : "Facial analysis disabled",
            description: enabled
              ? "Remember: this is an experimental coaching feature — see the bias documentation for details."
              : "Facial analysis has been disabled.",
          });
          setSaving(false);
          return;
        }
      }
      const stored = localStorage.getItem("hirena-preferences");
      const current = stored ? JSON.parse(stored) : {};
      localStorage.setItem("hirena-preferences", JSON.stringify({ ...current, facialAnalysisEnabled: enabled }));
      setFacialEnabled(enabled);
      setPreferences(p => ({ ...p, facialAnalysisEnabled: enabled }));
      toast({
        title: enabled ? "Facial analysis enabled" : "Facial analysis disabled",
        description: enabled
          ? "Remember: this is an experimental coaching feature — see the bias documentation for details."
          : "Facial analysis has been disabled.",
      });
    } catch (err) {
      toast({ title: "Error", description: "Failed to update facial analysis setting.", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-foreground-muted">Loading settings...</div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">{t("settings.title")}</h1>
        <p className="text-foreground-muted mt-1">{t("settings.subtitle")}</p>
      </div>

      {/* User info */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">{t("settings.account.title")}</CardTitle>
          <CardDescription>{t("settings.account.description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <div className="text-xs text-foreground-muted">{t("settings.labels.displayName")}</div>
              <div className="text-lg font-medium text-foreground">{user?.displayName}</div>
            </div>
            <div>
              <div className="text-xs text-foreground-muted">{t("settings.labels.email")}</div>
              <div className="text-lg font-medium text-foreground">{user?.email}</div>
            </div>
            <div>
              <div className="text-xs text-foreground-muted">{t("settings.labels.userId")}</div>
              <div className="text-sm font-mono text-foreground-muted break-all">{user?.id}</div>
            </div>
            <div>
              <div className="text-xs text-foreground-muted">{t("settings.labels.mode")}</div>
              <Badge variant="secondary" className="text-xs">Demo</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">{t("settings.preferences.title")}</CardTitle>
          <CardDescription>{t("settings.preferences.description")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Language */}
          <LanguageSelector />

          <Separator />

          {/* Learning Interests */}
          <div className="flex flex-col">
            <div className="font-medium text-foreground">{t("settings.learningInterests.title")}</div>
            <div className="text-sm text-foreground-muted mb-2">{t("settings.learningInterests.description")}</div>
            <div className="flex flex-wrap gap-2">
              {["Product Strategy", "Data & Analytics", "Technical Leadership", "UX Design", "AI & ML", "Agile & Scrum", "Cloud & DevOps"].map(topic => (
                <Badge
                  key={topic}
                  variant={preferences?.learningInterests?.includes(topic) ? "default" : "outline"}
                  className="cursor-pointer transition-colors hover:bg-primary/10"
                  onClick={() => {
                    const current = preferences?.learningInterests || [];
                    const updated = current.includes(topic)
                      ? current.filter(t => t !== topic)
                      : [...current, topic];
                    handleSavePreferences({ learningInterests: updated });
                  }}
                >
                  {topic}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* Use Real AI */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="font-medium text-foreground">{t("settings.useRealAi.label")}</div>
              <div className="text-sm text-foreground-muted">{t("settings.useRealAi.description")}</div>
            </div>
            <button
              className={cn(
                "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:opacity-50 disabled:pointer-events-none",
                preferences?.useRealAi ? "bg-primary" : "bg-foreground-subtle"
              )}
              onClick={async () => {
                const next = !(preferences?.useRealAi ?? false);
                if (!next) {
                  handleSavePreferences({ useRealAi: false });
                  return;
                }
                try {
                  const res = await fetch("/api/test-env");
                  const data = await res.json();
                  if (data.openaiApiKey && data.openaiApiKey.startsWith("sk-")) {
                    handleSavePreferences({ useRealAi: true });
                  } else {
                    toast({
                      title: "No API key found",
                      description: "OpenAI API key not configured. Enable mock mode instead.",
                      variant: "destructive",
                    });
                  }
                } catch {
                  toast({
                    title: "No API key found",
                    description: "OpenAI API key not configured. Enable mock mode instead.",
                    variant: "destructive",
                  });
                }
              }}
            >
              <span className={cn("pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition", preferences?.useRealAi ? "translate-x-[18px]" : "translate-x-0")} />
            </button>
          </div>

          <Separator />

          {/* AI Disclaimer */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="font-medium text-foreground">{t("settings.aiDisclaimer.label")}</div>
              <div className="text-sm text-foreground-muted">{t("settings.aiDisclaimer.description")}</div>
            </div>
            <button
              className={cn(
                "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:opacity-50 disabled:pointer-events-none",
                preferences?.aiDisclaimerAccepted ? "bg-primary" : "bg-foreground-subtle"
              )}
              onClick={() => handleSavePreferences({ aiDisclaimerAccepted: true })}
            >
              <span className={cn("pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition", preferences?.aiDisclaimerAccepted ? "translate-x-[18px]" : "translate-x-0")} />
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Facial Analysis Toggle — P2 */}
      <Card className="mb-6 border-amber-200/50">
        <CardHeader>
          <CardTitle className="text-base text-amber-800">{t("settings.facial.title")}</CardTitle>
          <CardDescription className="text-amber-700/70">
            {t("settings.facial.description")}
            <span className="block mt-1 text-[11px]">{t("settings.facial.disclaimerShort")}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="font-medium text-foreground">{t("settings.facial.toggleLabel")}</div>
              <div className="text-sm text-foreground-muted">
                {t("settings.facial.toggleDescription")}
                <span className="block mt-1 text-[11px] text-amber-600/80">
                  {t("settings.facial.toggleDisclaimer")}
                </span>
              </div>
            </div>
            <button
              className={cn(
                "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:opacity-50 disabled:pointer-events-none",
                facialEnabled ? "bg-primary" : "bg-foreground-subtle"
              )}
              disabled={saving}
              onClick={() => handleFacialToggle(!facialEnabled)}
            >
              <span className={cn("pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition", facialEnabled ? "translate-x-[18px]" : "translate-x-0")} />
            </button>
          </div>

          {facialEnabled && (
            <div className="rounded-lg bg-amber-50 border border-amber-200/60 p-3">
              <div className="flex items-start gap-2">
                <span className="text-amber-700 text-sm font-semibold mt-0.5">Important — Read Before Enabling</span>
              </div>
              <p className="text-xs text-amber-700/80 mt-1 leading-relaxed">
                Facial analysis technology has known biases across race, gender, age, and neurodiversity.
                Hirena's implementation is a coaching aid only — never used for pass/fail decisions.
                You can disable this at any time. See the full bias documentation for details.
              </p>
            </div>
          )}

          {/* Bias Documentation */}
          <div className="rounded-lg border border-border bg-surface p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700 text-sm">
                ?
              </div>
              <div className="flex-1">
                <div className="font-medium text-foreground text-sm">Facial Analysis Bias & Ethics Documentation</div>
                <div className="text-xs text-foreground-muted mt-1 leading-relaxed">
                  Comprehensive overview of why facial analysis is controversial, known biases (race, gender, age,
                  disability, neurodiversity, non-native speakers), regulatory context (EU AI Act high-risk,
                  HireVue 2021 deprecation), and Hirena's ethical safeguards.
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3 text-xs"
                  onClick={() => {
                    document.body.classList.add("overflow-hidden");
                    const modal = document.createElement("div");
                    modal.className = "fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4";
                    modal.innerHTML = `
                      <div class="max-w-2xl max-h-[85vh] overflow-y-auto rounded-lg border border-border bg-surface p-6 shadow-xl">
                        <div class="flex items-center justify-between mb-4">
                          <h3 class="text-lg font-semibold text-foreground">Facial Analysis Bias & Ethics</h3>
                          <button onclick="this.closest('.fixed').remove(); document.body.classList.remove('overflow-hidden')" class="text-foreground-muted hover:text-foreground text-lg">×</button>
                        </div>
                        <div class="text-sm text-foreground-muted leading-relaxed whitespace-pre-wrap">
                          ${FacialBiasDoc}
                        </div>
                      </div>
                    `;
                    document.body.appendChild(modal);
                    modal.addEventListener("click", (e) => {
                      if (e.target === modal) {
                        modal.remove();
                        document.body.classList.remove("overflow-hidden");
                      }
                    });
                  }}
                >
                  Read full documentation
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          disabled={saving}
          onClick={() => {
            toast({ title: "All preferences saved", description: "Your settings have been updated." });
          }}
          className="min-w-[140px]"
        >
          {saving ? "Saving..." : "Save All Settings"}
        </Button>
      </div>
    </div>
  );
}

// ─── Settings Route ───────────────────────────────────────────────────────────

export default function SettingsPageWrapper() {
  return <SettingsPage />;
}
