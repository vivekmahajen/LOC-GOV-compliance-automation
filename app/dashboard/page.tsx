import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  UPCOMING_DEADLINES,
  ACTIVE_VIOLATIONS,
  RECENT_ACTIVITY,
} from "@/lib/mock-data";
import { formatDateTime } from "@/lib/utils";
import {
  TrendingUp,
  FileText,
  Users,
  Accessibility,
  AlertTriangle,
  CheckCircle,
  Clock,
  Activity,
} from "lucide-react";
import Link from "next/link";

const severityVariant: Record<string, "green" | "amber" | "red" | "blue"> = {
  green: "green",
  amber: "amber",
  red: "red",
  blue: "blue",
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page title */}
      <div>
        <h1
          className="text-2xl font-bold"
          style={{ fontFamily: "var(--font-ibm-plex-serif)", color: "var(--text-primary)" }}
        >
          Compliance Dashboard
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
          City of Oakdale — November 2024
        </p>
      </div>

      {/* Health Score + Module Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Health Score */}
        <Card className="lg:col-span-1">
          <CardContent>
            <p className="text-xs font-semibold tracking-wide uppercase mb-3" style={{ color: "var(--text-secondary)" }}>
              Compliance Health Score
            </p>
            <div className="flex items-end gap-2 mb-2">
              <span
                className="text-5xl font-bold"
                style={{ fontFamily: "var(--font-ibm-plex-serif)", color: "var(--text-primary)" }}
              >
                82
              </span>
              <span className="text-xl mb-1" style={{ color: "var(--text-muted)" }}>/100</span>
            </div>
            <Progress value={82} gradient className="mb-2" />
            <div className="flex items-center gap-1">
              <TrendingUp size={12} style={{ color: "var(--accent-green)" }} />
              <span className="text-xs" style={{ color: "var(--accent-green)" }}>+4 from last month</span>
            </div>
          </CardContent>
        </Card>

        {/* Public Records */}
        <Card>
          <CardContent>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <FileText size={16} style={{ color: "var(--accent-blue)" }} />
                <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--text-secondary)" }}>
                  Public Records
                </p>
              </div>
              <Badge variant="green">COMPLIANT</Badge>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>47</p>
              <p className="text-xs" style={{ color: "var(--text-secondary)" }}>Requests this year</p>
              <div className="flex items-center gap-1 mt-2">
                <CheckCircle size={12} style={{ color: "var(--accent-green)" }} />
                <span className="text-xs" style={{ color: "var(--text-secondary)" }}>98% on-time rate</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Open Meetings */}
        <Card>
          <CardContent>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <Users size={16} style={{ color: "var(--accent-amber)" }} />
                <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--text-secondary)" }}>
                  Open Meetings
                </p>
              </div>
              <Badge variant="amber">WARNING</Badge>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>3</p>
              <p className="text-xs" style={{ color: "var(--text-secondary)" }}>Scheduled this month</p>
              <div className="flex items-center gap-1 mt-2">
                <AlertTriangle size={12} style={{ color: "var(--accent-amber)" }} />
                <span className="text-xs" style={{ color: "var(--accent-amber)" }}>Minutes overdue — Oct 15</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Accessibility */}
        <Card>
          <CardContent>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <Accessibility size={16} style={{ color: "var(--accent-green)" }} />
                <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--text-secondary)" }}>
                  Accessibility
                </p>
              </div>
              <Badge variant="green">COMPLIANT</Badge>
            </div>
            <div className="space-y-1">
              <p className="text-xs" style={{ color: "var(--text-secondary)" }}>AB 434 Certified 2024</p>
              <div className="flex items-center gap-1 mt-2">
                <AlertTriangle size={12} style={{ color: "var(--accent-amber)" }} />
                <span className="text-xs" style={{ color: "var(--text-secondary)" }}>12 open issues</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lower section: deadlines, violations, activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Upcoming Deadlines */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock size={14} />
              Upcoming Deadlines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {UPCOMING_DEADLINES.map((d) => (
                <div key={d.id} className="flex items-center justify-between py-2 border-b last:border-0" style={{ borderColor: "var(--border)" }}>
                  <div>
                    <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{d.title}</p>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>{d.module} · {d.date}</p>
                  </div>
                  <Badge variant={severityVariant[d.severity]}>
                    {d.daysLeft <= 0 ? "TODAY" : `${d.daysLeft}d`}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Violations */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-400">
              <AlertTriangle size={14} />
              Active Violations
            </CardTitle>
          </CardHeader>
          <CardContent>
            {ACTIVE_VIOLATIONS.length === 0 ? (
              <div className="flex items-center gap-2 py-4">
                <CheckCircle size={16} style={{ color: "var(--accent-green)" }} />
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>No active violations</p>
              </div>
            ) : (
              <div className="space-y-3">
                {ACTIVE_VIOLATIONS.map((v) => (
                  <div
                    key={v.id}
                    className="p-3 rounded border"
                    style={{ background: "var(--bg-tertiary)", borderColor: v.severity === "red" ? "var(--accent-red)" : "var(--accent-amber)" }}
                  >
                    <div className="flex items-start gap-2">
                      <AlertTriangle size={13} style={{ color: v.severity === "red" ? "var(--accent-red)" : "var(--accent-amber)", marginTop: 2 }} />
                      <div>
                        <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{v.title}</p>
                        <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{v.module} · Since {v.since}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity size={14} />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {RECENT_ACTIVITY.map((a) => (
                <div key={a.id} className="flex gap-3 py-2 border-b last:border-0" style={{ borderColor: "var(--border)" }}>
                  <div
                    className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-semibold mt-0.5"
                    style={{ background: "var(--bg-tertiary)", color: "var(--text-secondary)" }}
                  >
                    {a.user.split(" ")[0][0]}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium truncate" style={{ color: "var(--text-primary)" }}>{a.action}</p>
                    <p className="text-xs mt-0.5 font-mono" style={{ color: "var(--text-muted)" }}>
                      {a.user} · {formatDateTime(a.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { href: "/dashboard/cpra", label: "Manage CPRA Requests", icon: FileText, color: "var(--accent-blue)" },
          { href: "/dashboard/meetings", label: "View Meeting Schedule", icon: Users, color: "var(--accent-amber)" },
          { href: "/dashboard/ada", label: "ADA Issue Tracker", icon: Accessibility, color: "var(--accent-green)" },
          { href: "/dashboard/audit", label: "Generate Audit Package", icon: ClipboardListIcon, color: "var(--gold)" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="p-4 rounded-lg border flex items-center gap-3 transition-colors hover:opacity-80"
            style={{ background: "var(--bg-secondary)", borderColor: "var(--border)" }}
          >
            <item.icon size={18} style={{ color: item.color }} />
            <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function ClipboardListIcon({ size, style }: { size: number; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
      <path d="M12 11h4"></path>
      <path d="M12 16h4"></path>
      <path d="M8 11h.01"></path>
      <path d="M8 16h.01"></path>
    </svg>
  );
}
