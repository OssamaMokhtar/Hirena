"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface VideoInterviewProps {
  onVideoCapture: (videoBlob: Blob, audioBlob: Blob) => void;
  onCancel: () => void;
  question?: string;
  isRecording: boolean;
  recordingDuration: number;
}

export function VideoInterview({
  onVideoCapture,
  onCancel,
  question = "Tell me about a challenging technical problem you solved.",
  isRecording,
  recordingDuration,
}: VideoInterviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const [hasCamera, setHasCamera] = useState<boolean | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const durationRef = useRef(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Request camera access
  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: 1280,
          height: 720,
          facingMode: "user",
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100,
        },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setHasCamera(true);
      setCameraError(null);
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Camera access denied";
      setCameraError(message);
      setHasCamera(false);
      return false;
    }
  }, []);

  // Stop camera
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, []);

  // Start recording
  const startRecording = useCallback(async () => {
    const hasAccess = await startCamera();
    if (!hasAccess) return;

    const stream = streamRef.current!;
    const chunks: Blob[] = [];
    setRecordedChunks([]);

    // Create separate audio recorder for better quality
    const audioTrack = stream.getAudioTracks()[0];
    const videoTrack = stream.getVideoTracks()[0];

    // Video recorder
    const videoRecorder = new MediaRecorder(
      new MediaStream([videoTrack]),
      {
        mimeType: MediaRecorder.isTypeSupported("video/webm;codecs=vp8,opus")
          ? "video/webm;codecs=vp8,opus"
          : "video/webm",
      }
    );

    // Audio recorder (higher quality)
    const audioRecorder = new MediaRecorder(
      new MediaStream([audioTrack]),
      {
        mimeType: MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
          ? "audio/webm;codecs=opus"
          : "audio/webm",
      }
    );

    videoRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };

    audioRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };

    // Start both recorders
    videoRecorder.start(100);
    audioRecorder.start(100);
    recorderRef.current = videoRecorder;

    durationRef.current = 0;
    timerRef.current = setInterval(() => {
      durationRef.current += 100;
    }, 100);

    setRecordedChunks(chunks);
  }, [startCamera]);

  // Stop recording and capture
  const stopRecording = useCallback(() => {
    if (recorderRef.current) {
      recorderRef.current.stop();
    }

    // Stop audio recorder too
    const stream = streamRef.current!;
    const audioTrack = stream.getAudioTracks()[0];
    const audioRecorder = new MediaRecorder(
      new MediaStream([audioTrack]),
      { mimeType: "audio/webm" }
    );
    audioRecorder.stop();

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    // Combine chunks into blobs after a short delay
    setTimeout(() => {
      const videoBlob = new Blob(recordedChunks, {
        type: "video/webm",
      });
      // Extract audio separately if possible
      const audioBlob = recordedChunks.find((c) => c.type.includes("audio")) || recordedChunks[0];
      onVideoCapture(videoBlob, audioBlob || videoBlob);
    }, 500);
  }, [recordedChunks, onVideoCapture]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [stopCamera]);

  return (
    <div className="space-y-4">
      {/* Question display */}
      {question && (
        <div className="rounded-lg border border-border bg-surface p-4">
          <p className="text-sm text-foreground-muted">Interview Question</p>
          <p className="mt-1 text-base font-medium text-foreground">{question}</p>
        </div>
      )}

      {/* Camera preview */}
      <div className="relative aspect-video rounded-xl border border-border bg-black overflow-hidden">
        {hasCamera === null ? (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <svg
                className="mx-auto h-12 w-12 text-foreground-muted"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <p className="mt-2 text-sm text-foreground-muted">Click &quot;Start Recording&quot; to enable camera</p>
            </div>
          </div>
        ) : hasCamera ? (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="h-full w-full object-cover"
            />
            {/* Recording indicator */}
            {isRecording && (
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="flex h-3 w-3 animate-ping rounded-full bg-red-500" />
                <span className="flex h-3 w-3 rounded-full bg-red-500" />
                <span className="text-xs font-medium text-red-500">Recording</span>
              </div>
            )}
            {/* Timer */}
            {recordingDuration > 0 && (
              <div className="absolute bottom-3 right-3 rounded-md bg-black/70 px-2 py-1 text-xs text-white">
                {formatDuration(recordingDuration)}
              </div>
            )}
          </>
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <svg
                className="mx-auto h-12 w-12 text-foreground-muted"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.937 4h13.874M12 3a9 9 0 110 18 9 9 0 010-18z"
                />
              </svg>
              <p className="mt-2 text-sm text-foreground-muted">{cameraError || "Camera not available"}</p>
            </div>
          </div>
        )}
      </div>

      {/* Recorded preview (after capture) */}
      {recordedChunks.length > 0 && recordedChunks.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-foreground-muted">Recording captured ({formatDuration(recordingDuration)})</p>
          <video
            src={URL.createObjectURL(new Blob(recordedChunks))}
            controls
            className="aspect-video rounded-lg border border-border bg-black"
          />
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center gap-3">
        {!isRecording ? (
          <Button
            onClick={startRecording}
            className="flex-1 bg-primary hover:bg-primary-dark"
          >
            <svg
              className="mr-2 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.752 11.168l-3.197-3.197a1.25 1.25 0 00-1.768 0l-2.222 2.222M14.752 11.168l-3.197 3.197a1.25 1.25 0 001.768 1.768l2.222-2.222M14.752 11.168l3.197-3.197a1.25 1.25 0 00-1.768-1.768l-2.222 2.222M3.197 12.436a1.25 1.25 0 011.768 0l2.222 2.222M3.197 12.436l3.197 3.197a1.25 1.25 0 001.768-1.768L5.42 12.436"
              />
            </svg>
            Start Recording
          </Button>
        ) : (
          <Button
            onClick={stopRecording}
            className="flex-1 bg-red-500 hover:bg-red-600"
          >
            <svg
              className="mr-2 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
              />
            </svg>
            Stop & Capture
          </Button>
        )}
        <Button variant="outline" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
      </div>

      {/* Tips */}
      <div className="text-xs text-foreground-muted">
        <p>Tips for a good recording:</p>
        <ul className="mt-1 list-disc list-inside space-y-0.5">
          <li>Ensure good lighting on your face</li>
          <li>Speak clearly and at a moderate pace</li>
          <li>Keep your camera at eye level</li>
          <li>Try to answer in 1-3 minutes</li>
        </ul>
      </div>
    </div>
  );
}

function formatDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}
