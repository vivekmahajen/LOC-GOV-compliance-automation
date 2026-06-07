import { CPRA_REQUESTS, CPRAStatus } from "@/lib/mock-data";
import { Badge, BadgeVariant } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { Plus, FileText, Clock, AlertTriangle, CheckCircle2 } from "lucide-react";

function getStatusVariant(status: CPRAStatus, isViolation?: boolean): BadgeVariant {
  if (isViolation) return "red";
  switch (status) {
    case "Fulfilled": return "green";
    case "Denied": return "muted";
    case "Under Review": return "blue";
    case "Received": return "blue";
    case "Extended": return "amber";
    case "Overdue": return "red";
    default: return "default";
  }
}

function getDaysColor(days: number) {
  if (days <= 1) return "var(--accent-red)";
  if (days <= 5) return "var(--accent-amber)";
  return "var(--accent-green)";
}

export default function CPRAPage() {
  const stats = {
    total: CPRA_REQUESTS.length,
    onTime: CPRA_REQUESTS.filter(r => r.status === "Fulfilled" || r.status === "Denied").length,
    violations: CPRA_REQUESTS.filter(r => r.isViolation || r.status === "Overdue").length,
    avgDays: Math.round(
      CPRA_REQUESTS.filter(r => r.responseTime).reduce((acc, r) => acc + (r.responseTime || 0), 0) /
      CPRA_REQUESTS.filter(r => r.responseTime).length
    ),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-ibm-plex-serif)", color: "var(--text-primary)" }}>
            Public Records Requests
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
            California Public Records Act — CPRA Compliance Tracker
          </p>
        </div>
        <Button>
          <Plus size={14} />
          New Request
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Requests", value: stats.total, icon: FileText, color: "var(--accent-blue)" },
          { label: "On-Time Rate", value: "98%", icon: CheckCircle2, color: "var(--accent-green)" },
          { label: "Active Violations", value: stats.violations, icon: AlertTriangle, color: "var(--accent-red)" },
          { label: "Avg Response Days", value: `${stats.avgDays}d`, icon: Clock, color: "var(--accent-amber)" },
        ].map((s) => (
          <Card key={s.label}>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded" style={{ background: "var(--bg-tertiary)" }}>
                <s.icon size={16} style={{ color: s.color }} />
              </div>
              <div>
                <p className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>{s.value}</p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>{s.label}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Table */}
      <Card>
        {/* Filter tabs */}
        <div className="flex gap-1 mb-4 flex-wrap">
          {["All", "Received", "Under Review", "Extended", "Fulfilled", "Denied", "Overdue"].map((tab) => (
            <button
              key={tab}
              className="px-3 py-1 rounded text-xs font-medium transition-colors"
              style={{
                background: tab === "All" ? "var(--accent-blue)" : "var(--bg-tertiary)",
                color: tab === "All" ? "white" : "var(--text-secondary)",
              }}
            >
              {tab}
              {tab === "All" && <span className="ml-1 opacity-70">({CPRA_REQUESTS.length})</span>}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {["Request ID", "Requester", "Subject", "Received", "Due Date", "Status", "Assigned To", "Days"].map((col) => (
                  <th
                    key={col}
                    className="text-left py-2 px-3 text-xs font-semibold tracking-wide uppercase"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CPRA_REQUESTS.map((req) => (
                <tr
                  key={req.id}
                  className="hover:bg-[#1A2235] transition-colors"
                  style={{ borderBottom: "1px solid var(--border)" }}
                >
                  <td className="py-3 px-3">
                    <Link
                      href={`/dashboard/cpra/${req.id}`}
                      className="font-mono text-xs hover:underline"
                      style={{ color: "var(--accent-blue)" }}
                    >
                      {req.id}
                    </Link>
                  </td>
                  <td className="py-3 px-3">
                    <span style={{ color: "var(--text-primary)" }}>{req.requester}</span>
                  </td>
                  <td className="py-3 px-3 max-w-xs">
                    <span
                      className="text-xs truncate block"
                      style={{ color: "var(--text-secondary)", maxWidth: "200px" }}
                      title={req.subject}
                    >
                      {req.subject}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-xs font-mono" style={{ color: "var(--text-secondary)" }}>
                      {formatDate(req.receivedDate)}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-xs font-mono" style={{ color: "var(--text-secondary)" }}>
                      {formatDate(req.dueDate)}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <Badge variant={getStatusVariant(req.status, req.isViolation)}>
                      {req.isViolation ? "VIOLATION" : req.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-xs" style={{ color: "var(--text-secondary)" }}>{req.assignedTo}</span>
                  </td>
                  <td className="py-3 px-3">
                    {req.status === "Fulfilled" || req.status === "Denied" ? (
                      req.responseTime ? (
                        <span className="text-xs font-mono" style={{ color: "var(--accent-green)" }}>
                          {req.responseTime}d
                        </span>
                      ) : null
                    ) : req.daysRemaining < 0 ? (
                      <span className="text-xs font-mono font-bold" style={{ color: "var(--accent-red)" }}>
                        {Math.abs(req.daysRemaining)}d over
                      </span>
                    ) : (
                      <span
                        className="text-xs font-mono font-bold"
                        style={{ color: getDaysColor(req.daysRemaining) }}
                      >
                        {req.daysRemaining}d
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
