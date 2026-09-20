"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { resultToSharePayload, encodeShareUrl, generateSummaryText } from "@/lib/report/generator";
import type { AssessmentResult } from "@/types";
import jsPDF from "jspdf";

interface ReportShareBarProps {
  result: AssessmentResult;
  onClose?: () => void;
}

export function ReportShareBar({ result, onClose }: ReportShareBarProps) {
  const [copied, setCopied] = React.useState(false);
  const [copiedSummary, setCopiedSummary] = React.useState(false);
  const [generatingPdf, setGeneratingPdf] = React.useState(false);
  const [toastMsg, setToastMsg] = React.useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  const payload = React.useMemo(() => resultToSharePayload(result), [result]);
  const shareParam = React.useMemo(() => encodeShareUrl(payload), [payload]);

  const shareUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/share/${shareParam}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      showToast("Share link copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast("Failed to copy link");
    }
  };

  const handleCopySummary = async () => {
    const text = generateSummaryText(payload);
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSummary(true);
      showToast("Report summary copied to clipboard");
      setTimeout(() => setCopiedSummary(false), 2000);
    } catch {
      showToast("Failed to copy summary");
    }
  };

  const handleDownloadPdf = async () => {
    setGeneratingPdf(true);
    try {
      const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const text = generateSummaryText(payload);
      const lines = text.split("\n");

      // Title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(20);
      doc.text("Hirena Skills Assessment Report", 20, 20);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 26);

      // Meta
      doc.setFontSize(12);
      doc.text(`Target Role: ${payload.targetRole}`, 20, 35);
      doc.text(`Region: ${payload.region}`, 20, 40);
      doc.text(`Overall Score: ${payload.overallScore}/100`, 20, 45);
      doc.text("", 20, 50);

      // Benchmark
      if (payload.benchmark?.overall) {
        doc.setFontSize(11);
        doc.text("MENA Regional Benchmark:", 20, 55);
        doc.text(`  Median: ${payload.benchmark.overall.median.toFixed(0)}/100`, 25, 60);
        doc.text(`  75th Percentile: ${payload.benchmark.overall.topQuartile.toFixed(0)}/100`, 25, 64);
        doc.text("", 20, 68);
      }

      // Competency scores
      doc.setFontSize(12);
      doc.text("Competency Scores:", 20, 72);
      let y = 78;
      for (const [cat, data] of Object.entries(payload.competencyScores)) {
        if (y > 260) { doc.addPage(); y = 20; }
        doc.setFontSize(10);
        doc.text(`${cat}: ${data.average.toFixed(1)}/5`, 20, y);
        y += 5;
      }
      y += 3;

      // Strengths
      if (payload.strengths.length > 0) {
        if (y > 260) { doc.addPage(); y = 20; }
        doc.setFontSize(12);
        doc.text(`Strengths (${payload.strengths.length}):`, 20, y);
        y += 5;
        doc.setFontSize(10);
        for (const s of payload.strengths) {
          if (y > 265) { doc.addPage(); y = 20; }
          doc.text(`  ★ ${s.name} — Level ${s.level}/5`, 25, y);
          y += 4;
        }
        y += 2;
      }

      // Development areas
      if (payload.gaps.length > 0) {
        if (y > 260) { doc.addPage(); y = 20; }
        doc.setFontSize(12);
        doc.text(`Development Areas (${payload.gaps.length}):`, 20, y);
        y += 5;
        doc.setFontSize(10);
        for (const g of payload.gaps) {
          if (y > 265) { doc.addPage(); y = 20; }
          const label = g.priority === "critical" ? "CRITICAL" : g.priority === "important" ? "IMPORTANT" : "Nice-to-have";
          doc.text(`  ${g.skillId} — Level ${g.currentLevel} → ${g.targetLevel} (gap: ${g.gapSize}) [${label}]`, 25, y);
          y += 4;
        }
        y += 2;
      }

      // Top skills
      if (payload.skillRanking.length > 0) {
        if (y > 260) { doc.addPage(); y = 20; }
        doc.setFontSize(12);
        doc.text("Top Skills:", 20, y);
        y += 5;
        doc.setFontSize(10);
        for (let i = 0; i < Math.min(5, payload.skillRanking.length); i++) {
          if (y > 265) { doc.addPage(); y = 20; }
          const s = payload.skillRanking[i];
          doc.text(`  ${i + 1}. ${s.name} — Level ${s.level}/5`, 25, y);
          y += 4;
        }
      }

      // Footer
      const footerY = y > 270 ? 20 : y + 10;
      doc.setFontSize(8);
      doc.setTextColor(128, 128, 128);
      doc.text("Generated by Hirena — https://hirena.app", 20, footerY);

      doc.save(`Hirena-Assessment-${payload.targetRole.replace(/\s+/g, "-")}.pdf`);
      showToast("PDF downloaded successfully");
    } catch (err) {
      console.error("[ReportShareBar] PDF generation error:", err);
      showToast("Failed to generate PDF");
    } finally {
      setGeneratingPdf(false);
    }
  };

  const handleLinkedInShare = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(linkedInUrl, "_blank", "width=600,height=400");
    showToast("LinkedIn share dialog opened");
  };

  return (
    <div className="border-t border-border bg-secondary/30 pt-6">
      {/* Toast */}
      {toastMsg && (
        <div className="mb-3 rounded-md bg-primary text-primary-foreground text-sm px-3 py-2 text-center">
          {toastMsg}
        </div>
      )}

      {/* Share link row */}
      <div className="mb-4 flex items-center gap-2">
        <span className="text-sm text-foreground-muted">Share this report:</span>
        <div className="flex-1 overflow-hidden rounded-md border border-border bg-surface px-3 py-1">
          <span className="text-xs text-foreground-subtle break-all">{shareUrl}</span>
        </div>
        <Button
          variant={copied ? "default" : "outline"}
          size="sm"
          onClick={handleCopyLink}
          className="capitalize"
        >
          {copied ? "✓ Copied" : "Copy Link"}
        </Button>
      </div>

      {/* Format options */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="text-sm text-foreground-muted">Export:</span>
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopySummary}
          className={copiedSummary ? "bg-success/20 text-success border-success/30" : ""}
        >
          {copiedSummary ? "✓ Summary Copied" : "Copy Summary Text"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleDownloadPdf}
          disabled={generatingPdf}
        >
          {generatingPdf ? (
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
              Generating PDF...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2h0a2 2 0 002 2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6h10a2 2 0 002 2v4a2 2 0 002 2v4a2 2 0 002-2h-4a2 2 0 00-2-2v-1H9a2 2 0 00-2 2v4a2 2 0 002 2H7v-4a2 2 0 00-2-2v-4a2 2 0 00-2 2v4a2 2 0 002 2v-4a2 2 0 00-2-2H7z" />
              </svg>
              Download PDF
            </span>
          )}
        </Button>
        <Button variant="outline" size="sm" onClick={handleLinkedInShare}>
          <span className="flex items-center gap-2">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zm-2 2a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6a2 2 0 012-2h8z" />
            </svg>
            Share on LinkedIn
          </span>
        </Button>
      </div>

      <Separator className="my-3" />

      {/* Public share badge */}
      <div className="flex items-center justify-center gap-2 text-xs text-foreground-muted">
        <span>🔗</span>
        <span>
          Anyone with this link can view your report:
          <br />
          <code className="rounded bg-secondary px-1 py-0.5 text-[10px] font-mono">/share/{shareParam.slice(0, 12)}…</code>
        </span>
      </div>

      {/* Close button */}
      {onClose && (
        <div className="mt-4 flex justify-center">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      )}
    </div>
  );
}
