import { CPRA_REQUESTS, ADA_ISSUES, MEETINGS, MINUTES_RECORDS } from "./mock-data";

export interface ModuleScore {
  module: string;
  score: number;
  weight: number;
  issues: string[];
}

export function calculateComplianceScore(): { total: number; modules: ModuleScore[] } {
  // CPRA score
  const totalCPRA = CPRA_REQUESTS.length;
  const violationsCPRA = CPRA_REQUESTS.filter(r => r.isViolation || r.status === "Overdue").length;
  const warningsCPRA = CPRA_REQUESTS.filter(r => r.daysRemaining <= 1 && r.status !== "Fulfilled" && r.status !== "Denied").length;
  const cpraScore = Math.max(0, 100 - (violationsCPRA * 15) - (warningsCPRA * 5));

  // Brown Act score
  const notPosted = MEETINGS.filter(m => m.postingStatus === "Not Posted").length;
  const minutesOverdue = MINUTES_RECORDS.filter(m => m.isOverdue).length;
  const brownActScore = Math.max(0, 100 - (notPosted * 20) - (minutesOverdue * 10));

  // ADA score
  const criticalOpen = ADA_ISSUES.filter(i => i.severity === "Critical" && i.status !== "Resolved").length;
  const seriousOpen = ADA_ISSUES.filter(i => i.severity === "Serious" && i.status !== "Resolved").length;
  const adaScore = Math.max(0, 100 - (criticalOpen * 8) - (seriousOpen * 4));

  const total = Math.round(cpraScore * 0.35 + brownActScore * 0.35 + adaScore * 0.30);

  return {
    total,
    modules: [
      { module: "CPRA / Public Records", score: cpraScore, weight: 35, issues: violationsCPRA > 0 ? [`${violationsCPRA} violation(s)`] : [] },
      { module: "Brown Act / Open Meetings", score: brownActScore, weight: 35, issues: notPosted > 0 ? [`${notPosted} unposted meeting(s)`] : [] },
      { module: "ADA / AB 434", score: adaScore, weight: 30, issues: criticalOpen > 0 ? [`${criticalOpen} critical issue(s)`] : [] },
    ],
  };
}
