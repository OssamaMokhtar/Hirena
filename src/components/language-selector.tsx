"use client";

import * as React from "react";
import type { Language } from "@/lib/i18n";
import { LANGUAGES } from "@/lib/i18n";
import { useTranslation } from "@/lib/i18n-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// ─── Language Selector ──────────────────────────────────────────────────────────
// Small dropdown in the header/settings that switches between EN and AR.
// On change: updates context, localStorage, and document dir/attr.

const LANG_OPTIONS: Array<{ value: Language; label: string }> = [
  { value: "en", label: "English" },
  { value: "ar", label: "العربية" },
];

export function LanguageSelector({ className }: { className?: string }) {
  const { language, setLanguage, isRtl } = useTranslation();
  const [open, setOpen] = React.useState(false);

  const current = LANGUAGES[language];

  return (
    <div className={cn("relative", className)}>
      {/* Trigger */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setOpen(!open)}
        className={cn(
          "gap-1.5 pr-8",
          isRtl && " pr-2 pl-8"
        )}
        title={current.nativeName}
      >
        {/* Globe icon — swaps to Arabic flag mnemonic when AR */}
        {language === "ar" ? (
          <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
          </svg>
        ) : (
          <svg className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
          </svg>
        )}
        <span className="text-sm font-medium">{current.name}</span>
        <svg
          className={cn(
            "h-3 w-3 text-foreground-muted transition-transform",
            open && "rotate-180"
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </Button>

      {/* Dropdown */}
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className={cn(
            "absolute right-0 z-50 mt-1 rounded-lg border border-border bg-surface shadow-lg",
            isRtl && "left-0 right-auto",
            "animate-in fade-in-0 zoom-in-95"
          )}>
            {LANG_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  setLanguage(opt.value);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center gap-2 px-3 py-2 text-sm text-foreground transition-colors",
                  "hover:bg-secondary",
                  opt.value === language && "bg-primary/10 text-primary font-medium",
                  isRtl && "justify-end"
                )}
              >
                {opt.value === language && (
                  <svg className="h-4 w-4 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
                <span>{opt.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
