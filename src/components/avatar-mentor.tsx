"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AvatarMentorProps {
  question: string;
  isSpeaking: boolean;
  onAudioReady?: (audioBlob: Blob) => void;
  onStop?: () => void;
  avatarStyle?: "minimal" | "avatar" | "none";
}

export function AvatarMentor({
  question,
  isSpeaking,
  onAudioReady,
  onStop,
  avatarStyle = "minimal",
}: AvatarMentorProps) {
  const [displayName, setDisplayName] = useState("Sami");
  const [avatarEmotion, setAvatarEmotion] = useState<"neutral" | "listening" | "thinking" | "speaking">("neutral");
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Simple TTS using Web Speech API
  useEffect(() => {
    if (isSpeaking && question && typeof window !== "undefined") {
      const utterance = new SpeechSynthesisUtterance(question);
      utterance.rate = 0.95;
      utterance.pitch = 1.1;
      utterance.volume = 1;

      // Try to find a good Arabic-compatible voice
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
  }, [isSpeaking, question, onStop]);

  // Avatar visual states
  const getAvatarClass = () => {
    switch (avatarStyle) {
      case "avatar":
        return cn(
          "relative h-32 w-32 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg",
          avatarEmotion === "speaking" && "animate-pulse",
          avatarEmotion === "thinking" && "bg-gradient-to-br from-amber-400 to-amber-600",
          avatarEmotion === "listening" && "bg-gradient-to-br from-blue-400 to-blue-600"
        );
      case "minimal":
      default:
        return cn(
          "flex h-12 w-12 items-center justify-center rounded-full bg-teal-500 text-white text-lg font-semibold",
          avatarEmotion === "speaking" && "animate-pulse",
          avatarEmotion === "thinking" && "bg-amber-500",
          avatarEmotion === "listening" && "bg-blue-500"
        );
    }
  };

  const getMouthAnimation = () => {
    if (avatarStyle === "minimal") {
      return isSpeaking ? "scale-y-100" : "scale-y-0";
    }
    return null;
  };

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
          <span className="text-xs text-foreground-muted">Mentor</span>
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
                {/* Simulated real-time text reveal */}
                <p className="text-sm text-foreground-muted lead-relaxed">
                  {revealText(question, 0.7)}
                </p>
                {/* Sound wave animation */}
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
