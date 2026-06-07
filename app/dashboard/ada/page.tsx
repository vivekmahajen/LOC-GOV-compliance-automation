import { ADA_ISSUES, STAFF_MEMBERS, ADAIssueSeverity } from "@/lib/mock-data";
import { Badge, BadgeVariant } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatDate } from "@/lib/utils";
import { CheckSquare, Square, AlertTriangle, CheckCircle, Award, User } from "lucide-react";

const CHECKLIST_ITEMS = [
  { label: "Accessibility Policy Published", done: true, pct: 100 },
  { label: "Home Page Audit (WCAG 2.1 AA)", done: true, pct: 100 },
  { label: "PDF Remediation — Current Year", done: false, pct: 65 },
  { label: "Video Captioning", done: false, pct: 40 },
  { label: "Online Forms Accessibility", done: false, pct: 55 },
  { label: "Staff ADA Training", done: false, pct: 60 },
  { label: "Grievance Procedure Published", done: true, pct: 100 },
  { label: "ADA Coordinator Designated", done: true, pct: 100 },
  { label: "Annual Self-Evaluation", done: false, pct: 80 },
];

function getSeverityVariant(s: ADAIssueSeverity): BadgeVariant {
  switch (s) {
    case "Critical": return "red";
    case "Serious": return "amber";
    case "Moderate": return "blue";
    default: return "muted";
  }
}

function getStatusVariant(s: string): BadgeVariant {
  switch (s) {
    case "Resolved": return "green";
    case "In Progress": return "blue";
    default: return "red";
  }
}

export default function ADAPage() {
  const criticalCount = ADA_ISSUES.filter(i => i.severity === "Critical" && i.status !== "Resolved").length;
  const openCount = ADA_ISSUES.filter(i => i.status === "Open").length;
  const resolvedCount = ADA_ISSUES.filter(i => i.status === "Resolved").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-ibm-plex-serif)", color: "var(--text-primary)" }}>
            Accessibility Manager
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
            ADA / AB 434 Compliance — Web Accessibility & Certification
          </p>
        </div>
        <Button>Run New Scan</Button>
      </div>

      {/* AB 434 Certification Card */}
      <Card>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg" style={{ background: "var(--bg-tertiary)" }}>
                <Award size={24} style={{ color: "var(--gold)" }} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>AB 434 Certification Status</h2>
                  <Badge variant="green">CERTIFIED 2024</Badge>
                </div>
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                  Annual certification valid through December 31, 2024
                </p>
                <p className="text-xs mt-1 font-mono" style={{ color: "var(--text-muted)" }}>
                  47 days until renewal required
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold" style={{ fontFamily: "var(--font-ibm-plex-serif)", color: "var(--gold)" }}>72%</p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>Checklist complete</p>
              <Progress value={72} className="mt-2 w-32" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Checklist */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AB 434 Checklist</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {CHECKLIST_ITEMS.map((item) => (
                  <div key={item.label} className="space-y-1">
                    <div className="flex items-center gap-2">
                      {item.done ? (
                        <CheckSquare size={14} style={{ color: "var(--accent-green)" }} />
                      ) : (
                        <Square size={14} style={{ color: "var(--text-muted)" }} />
                      )}
                      <span className="text-xs" style={{ color: item.done ? "var(--text-primary)" : "var(--text-secondary)" }}>
                        {item.label}
                      </span>
                    </div>
                    {!item.done && item.pct < 100 && (
                      <div className="ml-5">
                        <Progress value={item.pct} className="h-1" />
                        <span className="text-xs" style={{ color: "var(--text-muted)" }}>{item.pct}%</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Training Tracker */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User size={13} />
                Staff Training
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {STAFF_MEMBERS.map((staff) => (
                  <div key={staff.id} className="flex items-center justify-between py-1">
                    <div>
                      <p className="text-xs font-medium" style={{ color: "var(--text-primary)" }}>{staff.name}</p>
                      <p className="text-xs" style={{ color: "var(--text-muted)" }}>{staff.role}</p>
                    </div>
                    {staff.trainingComplete ? (
                      <div className="text-right">
                        <CheckCircle size={14} style={{ color: "var(--accent-green)" }} />
                        <p className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>{staff.trainingScore}%</p>
                      </div>
                    ) : (
                      <Badge variant="amber">Pending</Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: Issues Table */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle size={13} />
                  Accessibility Issues
                </CardTitle>
                <div className="flex items-center gap-3 text-xs" style={{ color: "var(--text-muted)" }}>
                  <span>{criticalCount} critical</span>
                  <span>{openCount} open</span>
                  <span>{resolvedCount} resolved</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ borderBottom: "1px solid var(--border)" }}>
                      {["ID", "Issue Type", "WCAG", "Severity", "Status", "Asset", "Discovered"].map((col) => (
                        <th key={col} className="text-left py-2 px-2 text-xs font-semibold tracking-wide uppercase" style={{ color: "var(--text-muted)" }}>
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {ADA_ISSUES.map((issue) => (
                      <tr
                        key={issue.id}
                        className="hover:bg-[#1A2235] transition-colors"
                        style={{ borderBottom: "1px solid var(--border)" }}
                      >
                        <td className="py-2 px-2">
                          <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>{issue.id}</span>
                        </td>
                        <td className="py-2 px-2">
                          <span className="text-xs" style={{ color: "var(--text-primary)" }}>{issue.type}</span>
                        </td>
                        <td className="py-2 px-2">
                          <span className="text-xs font-mono" style={{ color: "var(--accent-blue)" }}>{issue.criterion}</span>
                        </td>
                        <td className="py-2 px-2">
                          <Badge variant={getSeverityVariant(issue.severity)}>{issue.severity}</Badge>
                        </td>
                        <td className="py-2 px-2">
                          <Badge variant={getStatusVariant(issue.status)}>{issue.status}</Badge>
                        </td>
                        <td className="py-2 px-2 max-w-xs">
                          <span className="text-xs font-mono truncate block" style={{ color: "var(--text-secondary)", maxWidth: "140px" }} title={issue.assetUrl}>
                            {issue.assetUrl}
                          </span>
                        </td>
                        <td className="py-2 px-2">
                          <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>{formatDate(issue.discovered)}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
