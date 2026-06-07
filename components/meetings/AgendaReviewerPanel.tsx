"use client";

import { useState } from "react";
import { Bot, AlertTriangle, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Issue {
  severity: "VIOLATION" | "WARNING" | "SUGGESTION";
  agenda_item: string;
  issue: string;
  legal_basis: string;
  recommended_fix: string;
}

interface ReviewResult {
  overall_status: "COMPLIANT" | "ISSUES_FOUND" | "VIOLATIONS_FOUND";
  posting_deadline_status: "on_track" | "at_risk" | "missed";
  required_elements: {
    meeting_info: "present" | "missing";
    public_comment: "present" | "missing";
    closed_session_citations: "all_present" | "some_missing" | "not_applicable";
  };
  issues: Issue[];
  overall_assessment: string;
  attorney_review_recommended: boolean;
  attorney_review_reason: string;
}

const SEVERITY_COLOR: Record<string, string> = {
  VIOLATION: "var(--accent-red)",
  WARNING: "var(--accent-amber)",
  SUGGESTION: "var(--accent-blue)",
};

const STATUS_COLOR: Record<string, string> = {
  COMPLIANT: "var(--accent-green)",
  ISSUES_FOUND: "var(--accent-amber)",
  VIOLATIONS_FOUND: "var(--accent-red)",
};

export function AgendaReviewerPanel({
  agendaText,
  meetingType,
  cityName,
  postingDeadline,
}: {
  agendaText?: string;
  meetingType?: string;
  cityName?: string;
  postingDeadline?: string;
}) {
  const [inputText, setInputText] = useState(agendaText || "");
  const [result, setResult] = useState<ReviewResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function review() {
    if (!inputText.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/ai/agenda-reviewer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agendaText: inputText,
          meetingType,
          cityName,
          postingDeadline,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setResult(await res.json());
    } catch {
      setError("Failed to review agenda. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-3">
      <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
        Analyze this agenda for Brown Act compliance issues before posting.
      </p>

      {!agendaText && (
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          rows={6}
          placeholder="Paste agenda text here…"
          className="w-full text-xs rounded border p-2 resize-none"
          style={{
            background: "var(--bg-tertiary)",
            borderColor: "var(--border)",
            color: "var(--text-primary)",
            outline: "none",
          }}
        />
      )}

      <Button variant="primary" size="sm" onClick={review} disabled={loading || !inputText.trim()}>
        {loading ? <Loader2 size={13} className="animate-spin" /> : <Bot size={13} />}
        {loading ? "Reviewing…" : "Review Agenda for Compliance"}
      </Button>

      {error && (
        <p className="text-xs" style={{ color: "var(--accent-red)" }}>{error}</p>
      )}

      {result && (
        <div
          className="rounded border p-3 space-y-3"
          style={{
            background: "var(--bg-tertiary)",
            borderColor: result.overall_status === "COMPLIANT" ? "var(--accent-green)" : "var(--accent-amber)",
          }}
        >
          <div className="flex items-center gap-2">
            {result.overall_status === "COMPLIANT" ? (
              <CheckCircle size={13} style={{ color: "var(--accent-green)" }} />
            ) : (
              <AlertTriangle size={13} style={{ color: STATUS_COLOR[result.overall_status] }} />
            )}
            <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: STATUS_COLOR[result.overall_status] }}>
              {result.overall_status.replace("_", " ")}
              {result.issues.length > 0 && ` — ${result.issues.length} Issue${result.issues.length !== 1 ? "s" : ""}`}
            </span>
          </div>

          {result.issues.length > 0 && (
            <div className="space-y-2">
              {result.issues.map((issue, i) => (
                <div key={i} className="p-2 rounded border" style={{ borderColor: "var(--border)", background: "var(--bg-secondary)" }}>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs font-semibold" style={{ color: SEVERITY_COLOR[issue.severity] }}>
                      {issue.agenda_item}
                    </p>
                    <span className="text-xs font-mono" style={{ color: SEVERITY_COLOR[issue.severity] }}>{issue.severity}</span>
                  </div>
                  <p className="text-xs mb-1" style={{ color: "var(--text-secondary)" }}>{issue.issue}</p>
                  <p className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>Fix: {issue.recommended_fix}</p>
                  <Badge variant="amber" className="mt-1">{issue.legal_basis}</Badge>
                </div>
              ))}
            </div>
          )}

          <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{result.overall_assessment}</p>

          {result.attorney_review_recommended && (
            <p className="text-xs font-medium" style={{ color: "var(--accent-amber)" }}>
              Attorney Review Recommended: {result.attorney_review_reason}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
