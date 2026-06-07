import { CPRA_REQUESTS } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatDate, formatDateTime } from "@/lib/utils";
import { ArrowLeft, Clock, User, Calendar, FileCheck, AlertTriangle, Bot } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function CPRADetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const request = CPRA_REQUESTS.find((r) => r.id === id);
  if (!request) notFound();

  const daysPct = Math.min(100, Math.max(0, ((10 - request.daysRemaining) / 10) * 100));

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Back + Header */}
      <div>
        <Link
          href="/dashboard/cpra"
          className="inline-flex items-center gap-2 text-sm mb-4 transition-colors hover:opacity-80"
          style={{ color: "var(--text-secondary)" }}
        >
          <ArrowLeft size={14} />
          Back to Requests
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1
                className="text-2xl font-bold font-mono"
                style={{ color: "var(--text-primary)" }}
              >
                {request.id}
              </h1>
              {request.isViolation ? (
                <Badge variant="red">VIOLATION</Badge>
              ) : request.daysRemaining <= 1 && request.status !== "Fulfilled" && request.status !== "Denied" ? (
                <Badge variant="red">{request.daysRemaining <= 0 ? "OVERDUE" : "1 DAY LEFT"}</Badge>
              ) : request.daysRemaining <= 5 && request.status !== "Fulfilled" && request.status !== "Denied" ? (
                <Badge variant="amber">{request.daysRemaining} DAYS REMAINING</Badge>
              ) : (
                <Badge variant="blue">{request.status}</Badge>
              )}
            </div>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{request.subject}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-4">
          {/* Meta info */}
          <Card>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <User size={15} style={{ color: "var(--text-muted)" }} />
                  <div>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>Requester</p>
                    <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{request.requester}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <User size={15} style={{ color: "var(--text-muted)" }} />
                  <div>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>Assigned To</p>
                    <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{request.assignedTo}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar size={15} style={{ color: "var(--text-muted)" }} />
                  <div>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>Received</p>
                    <p className="text-sm font-mono" style={{ color: "var(--text-primary)" }}>{formatDate(request.receivedDate)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar size={15} style={{ color: "var(--accent-amber)" }} />
                  <div>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>Due Date</p>
                    <p className="text-sm font-mono" style={{ color: "var(--text-primary)" }}>{formatDate(request.dueDate)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Compliance Clock */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock size={14} />
                Compliance Clock
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-xs" style={{ color: "var(--text-secondary)" }}>
                  <span>Day {10 - Math.max(0, request.daysRemaining)} of 10</span>
                  {request.daysRemaining > 0 ? (
                    <span style={{ color: request.daysRemaining <= 1 ? "var(--accent-red)" : request.daysRemaining <= 3 ? "var(--accent-amber)" : "var(--accent-green)" }}>
                      {request.daysRemaining} calendar day{request.daysRemaining !== 1 ? "s" : ""} remaining
                    </span>
                  ) : (
                    <span style={{ color: "var(--accent-red)" }}>OVERDUE by {Math.abs(request.daysRemaining)} days</span>
                  )}
                </div>
                <div className="h-3 rounded-full overflow-hidden" style={{ background: "var(--bg-tertiary)" }}>
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${daysPct}%`,
                      background: daysPct >= 90 ? "var(--accent-red)" : daysPct >= 70 ? "var(--accent-amber)" : "var(--accent-green)",
                    }}
                  />
                </div>
                <div className="flex justify-between text-xs font-mono" style={{ color: "var(--text-muted)" }}>
                  <span>Received: {formatDate(request.receivedDate)}</span>
                  <span>Due: {formatDate(request.dueDate)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Request Content */}
          <Card>
            <CardHeader>
              <CardTitle>Request Text</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {request.subject}
              </p>
              {request.notes && (
                <div className="mt-3 p-3 rounded border" style={{ background: "var(--bg-tertiary)", borderColor: "var(--border)" }}>
                  <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: "var(--text-muted)" }}>Notes</p>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{request.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Button variant="primary" size="sm">
                  <FileCheck size={13} />
                  Fulfill Request
                </Button>
                <Button variant="secondary" size="sm">Request Extension</Button>
                <Button variant="secondary" size="sm">Apply Exemption</Button>
                <Button variant="danger" size="sm">Deny Request</Button>
              </div>
            </CardContent>
          </Card>

          {/* Audit Log */}
          <Card>
            <CardHeader>
              <CardTitle>Audit Log</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {request.auditLog.map((entry) => (
                  <div key={entry.id} className="flex gap-3 py-2 border-b last:border-0" style={{ borderColor: "var(--border)" }}>
                    <div className="flex-shrink-0 w-36">
                      <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>
                        {formatDateTime(entry.timestamp)}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs font-mono font-medium" style={{ color: "var(--accent-blue)" }}>{entry.user}</span>
                      <span className="text-xs font-mono mx-2" style={{ color: "var(--text-muted)" }}>—</span>
                      <span className="text-xs font-mono" style={{ color: "var(--text-secondary)" }}>{entry.action}</span>
                      {entry.details && (
                        <p className="text-xs font-mono mt-0.5" style={{ color: "var(--text-muted)" }}>{entry.details}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Exemption Advisor */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot size={14} />
                AI Exemption Advisor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs mb-3" style={{ color: "var(--text-secondary)" }}>
                Analyze this request against CPRA exemptions to identify applicable exemptions under Government Code §6254.
              </p>
              <Button variant="primary" size="sm" className="w-full mb-4">
                <Bot size={13} />
                Analyse Request
              </Button>

              {/* Mock AI Response */}
              <div className="rounded border p-3 space-y-3" style={{ background: "var(--bg-tertiary)", borderColor: "var(--border)" }}>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: "var(--accent-amber)" }} />
                  <span className="text-xs font-semibold" style={{ color: "var(--accent-amber)" }}>2 Potential Exemptions Found</span>
                </div>

                <div className="space-y-2">
                  <div className="p-2 rounded border" style={{ borderColor: "var(--border)", background: "var(--bg-secondary)" }}>
                    <p className="text-xs font-mono font-semibold" style={{ color: "var(--text-primary)" }}>GC §6254(a)</p>
                    <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>
                      Preliminary drafts, notes, or interagency/intra-agency memoranda not retained as public records — may apply to draft emails.
                    </p>
                    <Badge variant="amber" className="mt-1">Review Required</Badge>
                  </div>

                  <div className="p-2 rounded border" style={{ borderColor: "var(--border)", background: "var(--bg-secondary)" }}>
                    <p className="text-xs font-mono font-semibold" style={{ color: "var(--text-primary)" }}>GC §6254(c)</p>
                    <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>
                      Personnel, medical, or similar files — personal privacy exemption may cover individual contact info in emails.
                    </p>
                    <Badge variant="amber" className="mt-1">Partial Redaction</Badge>
                  </div>
                </div>

                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  This analysis is advisory only. Consult City Attorney before applying exemptions.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Status History */}
          <Card>
            <CardHeader>
              <CardTitle>Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  { status: "Received", done: true },
                  { status: "Under Review", done: request.status !== "Received" },
                  { status: "Response Sent", done: request.status === "Fulfilled" || request.status === "Denied" },
                ].map((s) => (
                  <div key={s.status} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full border-2 flex-shrink-0"
                      style={{
                        background: s.done ? "var(--accent-green)" : "transparent",
                        borderColor: s.done ? "var(--accent-green)" : "var(--border)",
                      }}
                    />
                    <span className="text-xs" style={{ color: s.done ? "var(--text-primary)" : "var(--text-muted)" }}>
                      {s.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
