"use client";

import { useState } from "react";
import { Bot, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Exemption {
  citation: string;
  name: string;
  applies_because: string;
  draft_justification: string;
  strength: "Strong" | "Moderate" | "Weak";
  strength_reasoning: string;
}

interface AdvisorResult {
  recommended_exemptions: Exemption[];
  partial_disclosure_recommended: boolean;
  partial_disclosure_rationale: string;
  attorney_review_recommended: boolean;
  attorney_review_reason: string;
  overall_assessment: string;
}

const STRENGTH_COLOR: Record<string, string> = {
  Strong: "var(--accent-green)",
  Moderate: "var(--accent-amber)",
  Weak: "var(--accent-red)",
};

export function ExemptionAdvisorPanel({
  requestDescription,
  cityName,
}: {
  requestDescription: string;
  cityName?: string;
}) {
  const [result, setResult] = useState<AdvisorResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function analyse() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/ai/exemption-advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestDescription, cityName }),
      });
      if (!res.ok) throw new Error("Request failed");
      setResult(await res.json());
    } catch {
      setError("Failed to analyse request. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
        Analyze this request against CPRA exemptions to identify applicable exemptions under Government Code §6254.
      </p>
      <Button variant="primary" size="sm" className="w-full" onClick={analyse} disabled={loading}>
        {loading ? <Loader2 size={13} className="animate-spin" /> : <Bot size={13} />}
        {loading ? "Analysing..." : "Analyse Request"}
      </Button>

      {error && (
        <p className="text-xs" style={{ color: "var(--accent-red)" }}>{error}</p>
      )}

      {result && (
        <div className="rounded border p-3 space-y-3" style={{ background: "var(--bg-tertiary)", borderColor: "var(--border)" }}>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ background: "var(--accent-amber)" }} />
            <span className="text-xs font-semibold" style={{ color: "var(--accent-amber)" }}>
              {result.recommended_exemptions.length} Potential Exemption{result.recommended_exemptions.length !== 1 ? "s" : ""} Found
            </span>
          </div>

          <div className="space-y-2">
            {result.recommended_exemptions.map((ex) => (
              <div key={ex.citation} className="p-2 rounded border" style={{ borderColor: "var(--border)", background: "var(--bg-secondary)" }}>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-mono font-semibold" style={{ color: "var(--text-primary)" }}>{ex.citation}</p>
                  <span className="text-xs font-semibold" style={{ color: STRENGTH_COLOR[ex.strength] }}>{ex.strength}</span>
                </div>
                <p className="text-xs font-medium mb-1" style={{ color: "var(--text-primary)" }}>{ex.name}</p>
                <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{ex.applies_because}</p>
              </div>
            ))}
          </div>

          {result.partial_disclosure_recommended && (
            <div className="p-2 rounded border" style={{ borderColor: "var(--accent-amber)", background: "var(--bg-secondary)" }}>
              <p className="text-xs font-semibold mb-1" style={{ color: "var(--accent-amber)" }}>Partial Disclosure Recommended</p>
              <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{result.partial_disclosure_rationale}</p>
            </div>
          )}

          <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{result.overall_assessment}</p>

          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            This analysis is advisory only. Consult City Attorney before applying exemptions.
          </p>
        </div>
      )}
    </div>
  );
}
