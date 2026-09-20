// Hirena — i18n Context Provider
// Provides the current language to all components via React context.
// Language is persisted in localStorage (key: "hirena_language").
// When Arabic is active, the document dir is set to "rtl".

import { createContext, useCallback, useMemo, useEffect, useState, useContext } from "react";
import type { Language } from "@/lib/i18n";
import { detectLanguage, LANGUAGES, t as translateFn } from "@/lib/i18n";

// ─── Context ────────────────────────────────────────────────────────────────

interface I18nContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
  dir: "ltr" | "rtl";
  isRtl: boolean;
}

const I18nContext = createContext<I18nContextValue | null>(null);

// ─── Provider ────────────────────────────────────────────────────────────────

interface I18nProviderProps {
  children: React.ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [language, setLanguageRaw] = useState<Language>("en");

  // Initialize from localStorage / browser on mount (client-only)
  useEffect(() => {
    setLanguageRaw(detectLanguage());
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageRaw(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("hirena_language", lang);
    }
    // Update document direction
    if (typeof document !== "undefined") {
      document.documentElement.dir = LANGUAGES[lang].dir;
      document.documentElement.lang = lang;
    }
  }, []);

  // Apply direction when language changes
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.dir = LANGUAGES[language].dir;
      document.documentElement.lang = language;
    }
  }, [language]);

  const value: I18nContextValue = useMemo(
    () => ({
      language,
      setLanguage,
      t: (key, vars) => translateFn(key, language, vars),
      dir: LANGUAGES[language].dir,
      isRtl: language === "ar",
    }),
    [language, setLanguage]
  );

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n called outside I18nProvider");
  }
  return ctx;
}

// ─── Hook: translated strings + metadata ──────────────────────────────────────

export function useTranslation(): {
  t: (key: string, vars?: Record<string, string | number>) => string;
  language: Language;
  dir: "ltr" | "rtl";
  isRtl: boolean;
  setLanguage: (lang: Language) => void;
} {
  const { t, language, dir, isRtl, setLanguage } = useI18n();
  return { t, language, dir, isRtl, setLanguage };
}
