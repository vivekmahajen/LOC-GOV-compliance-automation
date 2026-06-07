import { MEETINGS, MINUTES_RECORDS } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { Plus, CheckCircle, AlertTriangle, Clock, Calendar } from "lucide-react";

export default function MeetingsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="text-2xl font-bold"
            style={{ fontFamily: "var(--font-ibm-plex-serif)", color: "var(--text-primary)" }}
          >
            Open Meetings Manager
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
            Brown Act Compliance — Meeting Schedule & Posting Tracker
          </p>
        </div>
        <Button>
          <Plus size={14} />
          New Meeting
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded" style={{ background: "var(--bg-tertiary)" }}>
              <Calendar size={16} style={{ color: "var(--accent-blue)" }} />
            </div>
            <div>
              <p className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>3</p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>Upcoming Meetings</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded" style={{ background: "var(--bg-tertiary)" }}>
              <AlertTriangle size={16} style={{ color: "var(--accent-red)" }} />
            </div>
            <div>
              <p className="text-xl font-bold" style={{ color: "var(--accent-red)" }}>1</p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>Posting Violations</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded" style={{ background: "var(--bg-tertiary)" }}>
              <Clock size={16} style={{ color: "var(--accent-amber)" }} />
            </div>
            <div>
              <p className="text-xl font-bold" style={{ color: "var(--accent-amber)" }}>1</p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>Minutes Overdue</p>
            </div>
          </div>
        </Card>
      </div>

      {/* November 2024 Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar size={14} />
            November 2024 — Meeting Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {MEETINGS.map((meeting) => (
              <div
                key={meeting.id}
                className="rounded-lg border p-4 transition-colors hover:opacity-90"
                style={{
                  background: "var(--bg-tertiary)",
                  borderColor: meeting.postingStatus === "Not Posted" ? "var(--accent-red)" : "var(--border)",
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Link
                        href={`/dashboard/meetings/${meeting.id}`}
                        className="font-semibold text-sm hover:underline"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {meeting.title}
                      </Link>
                      <Badge variant={meeting.type === "Special" ? "amber" : "blue"}>
                        {meeting.type}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-xs" style={{ color: "var(--text-secondary)" }}>
                      <span className="font-mono">{formatDate(meeting.date)} · {meeting.time}</span>
                      <span>{meeting.location}</span>
                      <span>{meeting.agendaItemCount} agenda items</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 ml-4">
                    {meeting.postingStatus === "Posted" ? (
                      <div className="flex items-center gap-1.5">
                        <CheckCircle size={13} style={{ color: "var(--accent-green)" }} />
                        <span className="text-xs" style={{ color: "var(--accent-green)" }}>
                          Posted {meeting.postedDate ? formatDate(meeting.postedDate) : ""} ({meeting.postingHours}hrs)
                        </span>
                      </div>
                    ) : meeting.postingStatus === "Not Posted" ? (
                      <div className="flex items-center gap-1.5">
                        <AlertTriangle size={13} style={{ color: "var(--accent-red)" }} />
                        <span className="text-xs font-semibold" style={{ color: "var(--accent-red)" }}>
                          NOT POSTED
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5">
                        <Clock size={13} style={{ color: "var(--text-muted)" }} />
                        <span className="text-xs" style={{ color: "var(--text-muted)" }}>Not yet required</span>
                      </div>
                    )}
                    {meeting.postingDeadline && (
                      <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>
                        Deadline: {new Date(meeting.postingDeadline).toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                      </span>
                    )}
                    <Link href={`/dashboard/meetings/${meeting.id}`}>
                      <button className="text-xs px-3 py-1 rounded border transition-colors hover:opacity-80"
                        style={{ color: "var(--accent-blue)", borderColor: "var(--accent-blue)" }}>
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Minutes Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock size={14} />
            Minutes Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {["Meeting Date", "Meeting", "Status", "Approved / Pending"].map((col) => (
                  <th key={col} className="text-left py-2 px-3 text-xs font-semibold tracking-wide uppercase" style={{ color: "var(--text-muted)" }}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MINUTES_RECORDS.map((m) => (
                <tr
                  key={m.id}
                  className="hover:bg-[#1A2235] transition-colors"
                  style={{ borderBottom: "1px solid var(--border)" }}
                >
                  <td className="py-3 px-3">
                    <span className="text-xs font-mono" style={{ color: "var(--text-secondary)" }}>
                      {formatDate(m.meetingDate)}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-sm" style={{ color: "var(--text-primary)" }}>{m.meetingTitle}</span>
                  </td>
                  <td className="py-3 px-3">
                    <Badge variant={m.status === "Approved" ? "green" : m.isOverdue ? "red" : "amber"}>
                      {m.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-3">
                    {m.approvedDate ? (
                      <span className="text-xs font-mono" style={{ color: "var(--accent-green)" }}>
                        ✓ Approved {formatDate(m.approvedDate)}
                      </span>
                    ) : m.isOverdue ? (
                      <div className="flex items-center gap-1.5">
                        <AlertTriangle size={12} style={{ color: "var(--accent-amber)" }} />
                        <span className="text-xs" style={{ color: "var(--accent-amber)" }}>
                          Pending {m.daysPending} days — WARNING
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs" style={{ color: "var(--text-muted)" }}>Pending approval</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
