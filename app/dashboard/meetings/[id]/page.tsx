import { MEETINGS, AGENDA_ITEMS } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { ArrowLeft, Bot, CheckSquare, Square, AlertTriangle, Plus, Globe, Clipboard, Building } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function MeetingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const meeting = MEETINGS.find((m) => m.id === id);
  if (!meeting) notFound();

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Back */}
      <div>
        <Link
          href="/dashboard/meetings"
          className="inline-flex items-center gap-2 text-sm mb-4 transition-colors hover:opacity-80"
          style={{ color: "var(--text-secondary)" }}
        >
          <ArrowLeft size={14} />
          Back to Meetings
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-ibm-plex-serif)", color: "var(--text-primary)" }}>
                {meeting.title}
              </h1>
              <Badge variant={meeting.type === "Special" ? "amber" : "blue"}>{meeting.type}</Badge>
            </div>
            <p className="text-sm font-mono" style={{ color: "var(--text-secondary)" }}>
              {formatDate(meeting.date)} · {meeting.time} · {meeting.location}
            </p>
          </div>
          <Button variant="primary" size="sm">
            <Plus size={13} />
            Add Agenda Item
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main */}
        <div className="lg:col-span-2 space-y-4">
          {/* Agenda Items */}
          <Card>
            <CardHeader>
              <CardTitle>Agenda Items ({AGENDA_ITEMS.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {AGENDA_ITEMS.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-3 p-3 rounded border transition-colors"
                    style={{ background: "var(--bg-tertiary)", borderColor: "var(--border)" }}
                  >
                    <span
                      className="w-6 h-6 rounded flex-shrink-0 flex items-center justify-center text-xs font-bold font-mono"
                      style={{ background: "var(--bg-primary)", color: "var(--text-muted)" }}
                    >
                      {item.order}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{item.title}</p>
                        <Badge variant={
                          item.type === "Closed Session" ? "red" :
                          item.type === "Action" ? "blue" :
                          item.type === "Public Hearing" ? "amber" :
                          "muted"
                        }>
                          {item.type}
                        </Badge>
                        {item.estimatedTime && (
                          <span className="text-xs" style={{ color: "var(--text-muted)" }}>{item.estimatedTime} min</span>
                        )}
                      </div>
                      {item.presenter && (
                        <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>Presenter: {item.presenter}</p>
                      )}
                      {item.description && (
                        <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{item.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Agenda Reviewer */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot size={14} />
                AI Agenda Reviewer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs mb-3" style={{ color: "var(--text-secondary)" }}>
                Analyze this agenda for Brown Act compliance issues before posting.
              </p>
              <Button variant="primary" size="sm" className="mb-4">
                <Bot size={13} />
                Review Agenda for Compliance
              </Button>

              {/* Mock AI Result */}
              <div className="rounded border p-3 space-y-3" style={{ background: "var(--bg-tertiary)", borderColor: "var(--accent-amber)" }}>
                <div className="flex items-center gap-2">
                  <AlertTriangle size={13} style={{ color: "var(--accent-amber)" }} />
                  <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--accent-amber)" }}>
                    VIOLATIONS_FOUND — 2 Issues
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="p-2 rounded border" style={{ borderColor: "var(--border)", background: "var(--bg-secondary)" }}>
                    <p className="text-xs font-semibold" style={{ color: "var(--accent-amber)" }}>Issue 1 — Closed Session Description</p>
                    <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>
                      Agenda item #6 "Closed Session — Pending Litigation" lacks required specificity under GC §54956.9(d). Must identify number of cases and nature of exposure.
                    </p>
                    <Badge variant="amber" className="mt-1">GC §54956.9</Badge>
                  </div>

                  <div className="p-2 rounded border" style={{ borderColor: "var(--border)", background: "var(--bg-secondary)" }}>
                    <p className="text-xs font-semibold" style={{ color: "var(--accent-amber)" }}>Issue 2 — Public Comment Timing</p>
                    <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>
                      Public comment is listed as item #3. Brown Act requires opportunity for public comment before or during consideration of action items. Recommend moving to precede all action items.
                    </p>
                    <Badge variant="amber" className="mt-1">GC §54954.3</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Minutes */}
          <Card>
            <CardHeader>
              <CardTitle>Meeting Minutes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-3">
                <Badge variant={meeting.minutesStatus === "Approved" ? "green" : meeting.minutesStatus === "Not Started" ? "muted" : "amber"}>
                  {meeting.minutesStatus}
                </Badge>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm">Save Draft</Button>
                  <Button variant="primary" size="sm">Submit for Approval</Button>
                </div>
              </div>
              {meeting.minutesStatus === "Not Started" ? (
                <div className="p-6 rounded border text-center" style={{ borderColor: "var(--border)", background: "var(--bg-tertiary)" }}>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>Minutes not yet started for this meeting.</p>
                  <Button variant="secondary" size="sm" className="mt-3">Start Draft</Button>
                </div>
              ) : (
                <textarea
                  className="w-full h-32 p-3 rounded border text-sm resize-none outline-none font-mono"
                  style={{ background: "var(--bg-tertiary)", borderColor: "var(--border)", color: "var(--text-secondary)" }}
                  placeholder="Begin entering meeting minutes..."
                  defaultValue="Regular City Council Meeting — November 5, 2024&#10;City Hall Chamber, 280 N Sierra Ave&#10;&#10;Call to Order: 7:02 PM by Mayor Davis&#10;Roll Call: All members present..."
                />
              )}
            </CardContent>
          </Card>
        </div>

        {/* Side */}
        <div className="space-y-4">
          {/* Posting Checklist */}
          <Card>
            <CardHeader>
              <CardTitle>Posting Checklist</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { label: "City Website", icon: Globe, done: meeting.postingStatus === "Posted" },
                  { label: "Bulletin Board — City Hall", icon: Building, done: meeting.postingStatus === "Posted" },
                  { label: "Clerk's Office Door", icon: Clipboard, done: meeting.postingStatus === "Posted" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    {item.done ? (
                      <CheckSquare size={16} style={{ color: "var(--accent-green)" }} />
                    ) : (
                      <Square size={16} style={{ color: "var(--text-muted)" }} />
                    )}
                    <div className="flex items-center gap-2">
                      <item.icon size={13} style={{ color: "var(--text-muted)" }} />
                      <span className="text-sm" style={{ color: item.done ? "var(--text-primary)" : "var(--text-secondary)" }}>
                        {item.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {meeting.postingStatus === "Not Posted" && (
                <div className="mt-3 p-2 rounded border" style={{ background: "var(--bg-tertiary)", borderColor: "var(--accent-red)" }}>
                  <div className="flex items-center gap-1.5 mb-1">
                    <AlertTriangle size={12} style={{ color: "var(--accent-red)" }} />
                    <span className="text-xs font-semibold" style={{ color: "var(--accent-red)" }}>POSTING REQUIRED</span>
                  </div>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                    Special meetings require 24-hour advance notice. Post immediately to avoid violation.
                  </p>
                </div>
              )}

              <Button variant="primary" size="sm" className="w-full mt-3">
                Mark as Posted
              </Button>
            </CardContent>
          </Card>

          {/* Meeting Details */}
          <Card>
            <CardHeader>
              <CardTitle>Meeting Info</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                {[
                  { label: "ID", value: meeting.id },
                  { label: "Type", value: meeting.type },
                  { label: "Date", value: formatDate(meeting.date) },
                  { label: "Time", value: meeting.time },
                  { label: "Agenda Items", value: String(meeting.agendaItemCount) },
                  { label: "Posting", value: meeting.postingStatus },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between">
                    <span style={{ color: "var(--text-muted)" }}>{row.label}</span>
                    <span className="font-mono text-xs" style={{ color: "var(--text-primary)" }}>{row.value}</span>
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
