"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { AvatarStyle } from "@/lib/real-time-interview";

interface AvatarMentorProps {
  question: string;
  isSpeaking: boolean;
  onAudioReady?: (audioBlob: Blob) => void;
  onStop?: () => void;
  avatarStyle?: AvatarStyle;
  candidateSignals?: CandidateSignals;
}

interface CandidateSignals {
  pace: number;
  sentiment: number;
  engagement: number;
  fillerWords: number;
}

export function AvatarMentor({
  question,
  isSpeaking,
  onAudioReady,
  onStop,
  avatarStyle = "minimal",
  candidateSignals,
}: AvatarMentorProps) {
  const [displayName, setDisplayName] = useState("Sami");
  const [avatarEmotion, setAvatarEmotion] = useState<
    "neutral" | "listening" | "thinking" | "speaking" | "supportive" | "encouraging"
  >("neutral");

  // Adaptive speech parameters based on candidate signals
  const getAdaptiveSpeechParams = useCallback(() => {
    const signals = candidateSignals || { pace: 0.5, sentiment: 0, engagement: 0.5, fillerWords: 0 };

    let rate = 0.95;
    if (signals.pace > 0.7) rate = 0.75;
    else if (signals.pace < 0.25) rate = 1.1;

    let pitch = 1.1;
    let volume = 1;
    if (signals.sentiment < -0.3) {
      pitch = 0.95;
      volume = 0.85;
    } else if (signals.sentiment > 0.5) {
      pitch = 1.25;
    }

    if (signals.engagement < 0.3) {
      rate = Math.min(rate, 0.85);
    }

    return { rate, pitch, volume };
  }, [candidateSignals]);

  // Current emotion based on signals
  const getAvatarEmotion = useCallback((): typeof avatarEmotion => {
    if (isSpeaking) return "speaking";
    if (candidateSignals) {
      if (candidateSignals.sentiment < -0.3) return "supportive";
      if (candidateSignals.fillerWords > 0.6) return "encouraging";
      if (candidateSignals.engagement < 0.3) return "listening";
    }
    return "neutral";
  }, [isSpeaking, candidateSignals]);

  const emotionRef = useRef(getAvatarEmotion());
  useEffect(() => { emotionRef.current = getAvatarEmotion(); }, [getAvatarEmotion]);
  useEffect(() => { setAvatarEmotion(emotionRef.current); }, [emotionRef]);

  // TTS with adaptive params
  useEffect(() => {
    if (isSpeaking && question && typeof window !== "undefined") {
      const { rate, pitch, volume } = getAdaptiveSpeechParams();
      const utterance = new SpeechSynthesisUtterance(question);
      utterance.rate = rate;
      utterance.pitch = pitch;
      utterance.volume = volume;

      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(
        (v) => v.lang.startsWith("en") && v.name.includes("Google") ||
               v.lang.startsWith("ar") && v.name.includes("Tarik")
      );
      if (preferredVoice) utterance.voice = preferredVoice;

      utterance.onstart = () => setAvatarEmotion("speaking");
      utterance.onend = () => {
        setAvatarEmotion("neutral");
        onStop?.();
      };
      utterance.onerror = () => {
        setAvatarEmotion("neutral");
        onStop?.();
      };

      window.speechSynthesis.speak(utterance);

      return () => {
        window.speechSynthesis.cancel();
      };
    }
  }, [isSpeaking, question, onStop, getAdaptiveSpeechParams]);

  // Avatar visual class based on emotion and style
  const getAvatarClass = useCallback(() => {
    const emotion = avatarEmotion;
    switch (avatarStyle) {
      case "avatar":
      case "css-animated":
      case "canvas-2d":
      case "webgl-3d":
      case "sdk-streamed":
        return cn(
          "relative h-32 w-32 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg",
          emotion === "speaking" && "animate-pulse",
          emotion === "supportive" && "bg-gradient-to-br from-teal-300 to-teal-500",
          emotion === "encouraging" && "bg-gradient-to-br from-amber-300 to-amber-500",
          emotion === "thinking" && "bg-gradient-to-br from-amber-400 to-amber-600",
          emotion === "listening" && "bg-gradient-to-br from-blue-400 to-blue-600"
        );
      case "minimal":
      default:
        return cn(
          "flex h-12 w-12 items-center justify-center rounded-full bg-teal-500 text-white text-lg font-semibold",
          emotion === "speaking" && "animate-pulse",
          emotion === "supportive" && "bg-teal-400",
          emotion === "encouraging" && "bg-amber-400",
          emotion === "thinking" && "bg-amber-500",
          emotion === "listening" && "bg-blue-500"
        );
    }
  }, [avatarStyle, avatarEmotion]);

  // Mouth animation for minimal avatar
  const getMouthAnimation = useCallback(() => {
    if (avatarStyle === "minimal" || avatarStyle === "css-animated") {
      return isSpeaking ? "scale-y-100" : "scale-y-0";
    }
    return null;
  }, [avatarStyle, isSpeaking]);

  // Adaptive label
  const getAvatarLabel = useCallback(() => {
    switch (avatarEmotion) {
      case "supportive": return "Supportive";
      case "encouraging": return "Encouraging";
      case "listening": return "Listening";
      case "thinking": return "Thinking";
      case "speaking": return "Speaking";
      default: return "Mentor";
    }
  }, [avatarEmotion]);

  return (
    <div className={cn("flex items-center gap-4", avatarStyle === "none" && "justify-center")}>
      {/* Avatar */}
      {avatarStyle !== "none" && (
        <div className="flex flex-col items-center">
          <div className={getAvatarClass()}>
            {avatarStyle === "minimal" ? (
              <span className="text-xl">👤</span>
            ) : (
              <span>{displayName}</span>
            )}
            {/* Mouth indicator for minimal avatar */}
            {avatarStyle === "minimal" && (
              <div
                className={cn(
                  "ml-4 h-1 rounded-full bg-white transition-transform duration-150",
                  getMouthAnimation()
                )}
                style={{ transform: `translateY(${isSpeaking ? 0 : 0}px)` }}
              />
            )}
          </div>
          <span className="mt-2 text-sm font-medium text-foreground">{displayName}</span>
          <span className="text-xs text-foreground-muted">{getAvatarLabel()}</span>
        </div>
      )}

      {/* Speech bubble / text display */}
      <div
        className={cn(
          "max-w-md rounded-xl border bg-surface p-4 transition-all duration-300",
          isSpeaking
            ? "border-teal-500 shadow-lg shadow-teal-500/10"
            : "border-border"
        )}
      >
        <div className="flex items-start gap-3">
          {/* Avatar embedded in bubble */}
          {avatarStyle === "none" && (
            <div className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-500 text-white text-sm font-semibold",
              avatarEmotion === "speaking" && "animate-pulse"
            )}>
              {displayName[0]}
            </div>
          )}

          <div className="flex-1">
            {isSpeaking ? (
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">{displayName} is speaking...</p>
                <p className="text-sm text-foreground-muted lead-relaxed">
                  {revealText(question, 0.7)}
                </p>
                <div className="flex items-center gap-1 pt-1">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className="h-1 w-1 rounded-full bg-teal-400 animate-wave"
                      style={{ animationDelay: `${i * 100}ms` }}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-sm text-foreground-muted">
                {question}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Simulate real-time text reveal for the speaking state */
function revealText(text: string, progress: number): string {
  const visibleLength = Math.floor(text.length * progress);
  return text.slice(0, visibleLength) + (visibleLength < text.length ? "..." : "");
}

// Animation keyframes (inject once)
if (typeof window !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = `
    @keyframes wave {
      0%, 100% { transform: scaleY(0.5); opacity: 0.5; }
      50% { transform: scaleY(1); opacity: 1; }
    }
    .animate-wave {
      animation: wave 0.8s ease-in-out infinite;
    }
  `;
  document.head.appendChild(styleSheet);
}
