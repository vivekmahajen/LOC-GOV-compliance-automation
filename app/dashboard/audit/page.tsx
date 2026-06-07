"use client";

import { COMPLIANCE_SCORE_HISTORY } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Download, Bot, Calendar, TrendingUp } from "lucide-react";
import { useState } from "react";

const REGULATORY_DEADLINES = [
  { date: "Nov 11", title: "CPRA-2024-0047 Response", days: 3, module: "CPRA" },
  { date: "Nov 11", title: "Special Meeting Posting Deadline", days: 1, module: "Brown Act" },
  { date: "Nov 12", title: "CPRA-2024-0041 Extension Expires", days: 2, module: "CPRA" },
  { date: "Nov 15", title: "CPRA-2024-0045 Extended Response", days: 7, module: "CPRA" },
  { date: "Nov 16", title: "Nov 19 Meeting Posting Deadline", days: 8, module: "Brown Act" },
  { date: "Dec 1", title: "Q4 Accessibility Scan Due", days: 23, module: "ADA" },
  { date: "Dec 31", title: "AB 434 Annual Certification Renewal", days: 52, module: "ADA" },
];

export default function AuditPage() {
  const [aiQuery, setAiQuery] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAIQuery() {
    if (!aiQuery.trim()) return;
    setLoading(true);
    setAiResponse("");
    try {
      const res = await fetch("/api/ai/audit-response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: aiQuery }),
      });
      const data = await res.json();
      setAiResponse(data.response || data.error || "No response received.");
    } catch {
      setAiResponse("Failed to get response. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-ibm-plex-serif)", color: "var(--text-primary)" }}>
            Audit Center
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
            Compliance History, Audit Packages & Regulatory Deadlines
          </p>
        </div>
        <Button>
          <Download size={14} />
          Generate Audit Package
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp size={14} />
              Compliance Score History — 6 Months
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={COMPLIANCE_SCORE_HISTORY} barSize={32}>
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--text-muted)", fontFamily: "var(--font-ibm-plex-mono)" }} axisLine={false} tickLine={false} />
                  <YAxis domain={[60, 100]} tick={{ fontSize: 11, fill: "var(--text-muted)", fontFamily: "var(--font-ibm-plex-mono)" }} axisLine={false} tickLine={false} width={30} />
                  <Tooltip contentStyle={{ background: "var(--bg-tertiary)", border: "1px solid var(--border)", borderRadius: "6px", fontSize: "12px" }} labelStyle={{ color: "var(--text-secondary)" }} itemStyle={{ color: "var(--text-primary)" }} cursor={{ fill: "var(--bg-tertiary)", opacity: 0.5 }} />
                  <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                    {COMPLIANCE_SCORE_HISTORY.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === COMPLIANCE_SCORE_HISTORY.length - 1 ? "var(--gold)" : "var(--accent-blue)"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs mt-2 text-center" style={{ color: "var(--text-muted)" }}>
              Current score: <strong style={{ color: "var(--gold)" }}>82</strong> / 100 (+4 from October)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar size={14} />
              Next 90 Days
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {REGULATORY_DEADLINES.map((d, i) => (
                <div key={i} className="flex items-center justify-between py-1.5 border-b last:border-0" style={{ borderColor: "var(--border)" }}>
                  <div>
                    <p className="text-xs font-medium" style={{ color: "var(--text-primary)" }}>{d.title}</p>
                    <p className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>{d.date} · {d.module}</p>
                  </div>
                  <Badge variant={d.days <= 1 ? "red" : d.days <= 5 ? "amber" : "muted"}>{d.days}d</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot size={14} />
            AI Audit Response Assistant
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs mb-3" style={{ color: "var(--text-secondary)" }}>
            Enter an audit inquiry or question and receive a draft response based on your compliance records.
          </p>
          <div className="flex gap-3">
            <input
              className="flex-1 px-3 py-2 rounded border text-sm outline-none"
              style={{ background: "var(--bg-tertiary)", borderColor: "var(--border)", color: "var(--text-primary)" }}
              placeholder="e.g., Summarize our CPRA compliance for FY2024..."
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAIQuery()}
            />
            <Button variant="primary" onClick={handleAIQuery} disabled={loading}>
              <Bot size={13} />
              {loading ? "Analyzing..." : "Generate Response"}
            </Button>
          </div>

          {aiResponse && (
            <div className="mt-4 p-4 rounded border" style={{ background: "var(--bg-tertiary)", borderColor: "var(--border)" }}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full" style={{ background: "var(--accent-green)" }} />
                <span className="text-xs font-semibold" style={{ color: "var(--accent-green)" }}>AI Response Generated</span>
                <span className="text-xs font-mono ml-auto" style={{ color: "var(--text-muted)" }}>Based on compliance records through Nov 2024</span>
              </div>
              <pre className="text-xs whitespace-pre-wrap font-mono leading-relaxed" style={{ color: "var(--text-secondary)" }}>{aiResponse}</pre>
              <div className="flex gap-2 mt-3">
                <Button variant="secondary" size="sm">Copy to Clipboard</Button>
                <Button variant="secondary" size="sm">Export as PDF</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
