export const ORG = {
  name: "City of Sacramento",
  state: "CA",
  population: 524943,
  county: "Sacramento",
  website: "www.cityofsacramento.org",
  currentUser: "A. Rodriguez",
  currentUserRole: "Compliance Officer",
};

export type CPRAStatus =
  | "Received"
  | "Under Review"
  | "Extended"
  | "Fulfilled"
  | "Denied"
  | "Overdue";

export interface CPRARequest {
  id: string;
  requester: string;
  subject: string;
  receivedDate: string;
  dueDate: string;
  status: CPRAStatus;
  assignedTo: string;
  daysRemaining: number;
  responseTime?: number;
  exemption?: string;
  notes?: string;
  isViolation?: boolean;
  auditLog: AuditEntry[];
}

export interface AuditEntry {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  details?: string;
}

export const CPRA_REQUESTS: CPRARequest[] = [
  {
    id: "CPRA-2024-0047",
    requester: "Sarah Thompson",
    subject: "All emails between City Manager and Council re: downtown development",
    receivedDate: "2024-11-01",
    dueDate: "2024-11-11",
    status: "Under Review",
    assignedTo: "J. Martinez",
    daysRemaining: 3,
    auditLog: [
      { id: "al-1", timestamp: "2024-11-01T09:15:00Z", user: "system", action: "Request received", details: "Via online portal" },
      { id: "al-2", timestamp: "2024-11-01T10:22:00Z", user: "J. Martinez", action: "Assigned to J. Martinez", details: "Auto-assigned by rotation" },
      { id: "al-3", timestamp: "2024-11-02T14:05:00Z", user: "J. Martinez", action: "Status changed: Received → Under Review", details: "Initial review started" },
      { id: "al-4", timestamp: "2024-11-04T11:30:00Z", user: "J. Martinez", action: "AI Exemption Analysis run", details: "Analysis returned 2 potential exemptions" },
      { id: "al-5", timestamp: "2024-11-06T16:00:00Z", user: "A. Rodriguez", action: "Compliance review checkpoint", details: "4 calendar days remaining" },
    ],
  },
  {
    id: "CPRA-2024-0046",
    requester: "Michael Chen",
    subject: "City Manager salary and benefits records 2023-2024",
    receivedDate: "2024-10-18",
    dueDate: "2024-10-28",
    status: "Fulfilled",
    assignedTo: "T. Chen",
    daysRemaining: 0,
    responseTime: 8,
    auditLog: [
      { id: "al-1", timestamp: "2024-10-18T08:00:00Z", user: "system", action: "Request received" },
      { id: "al-2", timestamp: "2024-10-25T15:00:00Z", user: "T. Chen", action: "Documents compiled" },
      { id: "al-3", timestamp: "2024-10-26T10:00:00Z", user: "T. Chen", action: "Request fulfilled", details: "Responded in 8 days" },
    ],
  },
  {
    id: "CPRA-2024-0045",
    requester: "Linda Park",
    subject: "All contracts with ABC Consulting 2022-2024",
    receivedDate: "2024-10-25",
    dueDate: "2024-11-15",
    status: "Extended",
    assignedTo: "R. Patel",
    daysRemaining: 4,
    notes: "Extension granted under GC §6253(c) — unusual circumstances",
    auditLog: [
      { id: "al-1", timestamp: "2024-10-25T09:00:00Z", user: "system", action: "Request received" },
      { id: "al-2", timestamp: "2024-10-28T14:00:00Z", user: "R. Patel", action: "Extension requested", details: "Unusual circumstances — voluminous records" },
      { id: "al-3", timestamp: "2024-10-29T09:00:00Z", user: "R. Patel", action: "Extension approved", details: "14-day extension granted" },
    ],
  },
  {
    id: "CPRA-2024-0044",
    requester: "James Rodriguez",
    subject: "Planning commission meeting recordings Jan-Jun 2024",
    receivedDate: "2024-10-01",
    dueDate: "2024-10-11",
    status: "Overdue",
    assignedTo: "S. Williams",
    daysRemaining: -18,
    isViolation: true,
    auditLog: [
      { id: "al-1", timestamp: "2024-10-01T09:00:00Z", user: "system", action: "Request received" },
      { id: "al-2", timestamp: "2024-10-08T16:00:00Z", user: "system", action: "VIOLATION WARNING: 3 days remaining" },
      { id: "al-3", timestamp: "2024-10-11T23:59:00Z", user: "system", action: "VIOLATION: Request overdue", details: "No response provided by deadline" },
    ],
  },
  {
    id: "CPRA-2024-0043",
    requester: "Amy Johnson",
    subject: "City budget expenditures Q3 2024",
    receivedDate: "2024-10-05",
    dueDate: "2024-10-15",
    status: "Fulfilled",
    assignedTo: "J. Martinez",
    daysRemaining: 0,
    responseTime: 6,
    auditLog: [
      { id: "al-1", timestamp: "2024-10-05T09:00:00Z", user: "system", action: "Request received" },
      { id: "al-2", timestamp: "2024-10-11T14:00:00Z", user: "J. Martinez", action: "Request fulfilled", details: "Responded in 6 days" },
    ],
  },
  {
    id: "CPRA-2024-0042",
    requester: "Robert Kim",
    subject: "Police department overtime reports 2024",
    receivedDate: "2024-09-20",
    dueDate: "2024-09-30",
    status: "Denied",
    assignedTo: "T. Chen",
    daysRemaining: 0,
    exemption: "GC §6254(f)",
    auditLog: [
      { id: "al-1", timestamp: "2024-09-20T09:00:00Z", user: "system", action: "Request received" },
      { id: "al-2", timestamp: "2024-09-28T11:00:00Z", user: "T. Chen", action: "Exemption applied: GC §6254(f)", details: "Law enforcement records exemption" },
      { id: "al-3", timestamp: "2024-09-28T11:30:00Z", user: "T. Chen", action: "Request denied", details: "Denial letter sent" },
    ],
  },
  {
    id: "CPRA-2024-0041",
    requester: "Patricia Wilson",
    subject: "Council member expense reports 2023",
    receivedDate: "2024-10-29",
    dueDate: "2024-11-12",
    status: "Extended",
    assignedTo: "R. Patel",
    daysRemaining: 1,
    notes: "WARNING: Extension expires in 1 day",
    auditLog: [
      { id: "al-1", timestamp: "2024-10-29T09:00:00Z", user: "system", action: "Request received" },
      { id: "al-2", timestamp: "2024-11-01T10:00:00Z", user: "R. Patel", action: "Extension granted", details: "14-day extension" },
      { id: "al-3", timestamp: "2024-11-11T09:00:00Z", user: "system", action: "WARNING: Extension expires tomorrow" },
    ],
  },
  {
    id: "CPRA-2024-0040",
    requester: "David Brown",
    subject: "Permit records for 123 Main St",
    receivedDate: "2024-10-10",
    dueDate: "2024-10-20",
    status: "Fulfilled",
    assignedTo: "J. Martinez",
    daysRemaining: 0,
    responseTime: 4,
    auditLog: [
      { id: "al-1", timestamp: "2024-10-10T09:00:00Z", user: "system", action: "Request received" },
      { id: "al-2", timestamp: "2024-10-14T14:00:00Z", user: "J. Martinez", action: "Request fulfilled", details: "Responded in 4 days" },
    ],
  },
];

export type MeetingType = "Regular" | "Special" | "Emergency" | "Workshop";
export type PostingStatus = "Posted" | "Not Posted" | "Pending";

export interface Meeting {
  id: string;
  title: string;
  type: MeetingType;
  date: string;
  time: string;
  location: string;
  postingStatus: PostingStatus;
  postedDate?: string;
  postingHours?: number;
  postingDeadline?: string;
  agendaItemCount: number;
  minutesStatus: "Draft" | "Pending Approval" | "Approved" | "Not Started";
  minutesDaysOverdue?: number;
}

export const MEETINGS: Meeting[] = [
  {
    id: "MTG-2024-1105",
    title: "Regular City Council Meeting",
    type: "Regular",
    date: "2024-11-05",
    time: "7:00 PM",
    location: "City Hall, 915 I Street, Sacramento",
    postingStatus: "Posted",
    postedDate: "2024-11-01",
    postingHours: 96,
    agendaItemCount: 6,
    minutesStatus: "Pending Approval",
  },
  {
    id: "MTG-2024-1112",
    title: "Special Meeting — Budget Review",
    type: "Special",
    date: "2024-11-12",
    time: "6:00 PM",
    location: "City Hall, 915 I Street, Sacramento",
    postingStatus: "Not Posted",
    postingDeadline: "2024-11-11T18:00:00",
    agendaItemCount: 3,
    minutesStatus: "Not Started",
  },
  {
    id: "MTG-2024-1119",
    title: "Regular City Council Meeting",
    type: "Regular",
    date: "2024-11-19",
    time: "7:00 PM",
    location: "City Hall, 915 I Street, Sacramento",
    postingStatus: "Pending",
    postingDeadline: "2024-11-16T19:00:00",
    agendaItemCount: 0,
    minutesStatus: "Not Started",
  },
];

export interface MinutesRecord {
  id: string;
  meetingDate: string;
  meetingTitle: string;
  status: "Approved" | "Pending Approval" | "Draft";
  approvedDate?: string;
  daysPending?: number;
  isOverdue?: boolean;
}

export const MINUTES_RECORDS: MinutesRecord[] = [
  {
    id: "MIN-2024-1015",
    meetingDate: "2024-10-15",
    meetingTitle: "Regular City Council Meeting",
    status: "Pending Approval",
    daysPending: 25,
    isOverdue: true,
  },
  {
    id: "MIN-2024-1001",
    meetingDate: "2024-10-01",
    meetingTitle: "Regular City Council Meeting",
    status: "Approved",
    approvedDate: "2024-10-15",
  },
  {
    id: "MIN-2024-0917",
    meetingDate: "2024-09-17",
    meetingTitle: "Regular City Council Meeting",
    status: "Approved",
    approvedDate: "2024-10-01",
  },
];

export interface AgendaItem {
  id: string;
  order: number;
  title: string;
  type: "Consent" | "Action" | "Discussion" | "Public Hearing" | "Closed Session" | "Ceremonial";
  presenter?: string;
  estimatedTime?: number;
  description?: string;
}

export const AGENDA_ITEMS: AgendaItem[] = [
  { id: "ai-1", order: 1, title: "Call to Order and Roll Call", type: "Ceremonial", estimatedTime: 5 },
  { id: "ai-2", order: 2, title: "Approval of Minutes — October 15, 2024", type: "Consent", estimatedTime: 2 },
  { id: "ai-3", order: 3, title: "Public Comment", type: "Discussion", estimatedTime: 30 },
  { id: "ai-4", order: 4, title: "FY2025 Budget Amendment — Parks & Recreation", type: "Action", presenter: "Finance Director", estimatedTime: 20, description: "Resolution authorizing amendment to FY2025 budget for parks and recreation facilities maintenance." },
  { id: "ai-5", order: 5, title: "Downtown Revitalization Project Update", type: "Discussion", presenter: "City Manager", estimatedTime: 15 },
  { id: "ai-6", order: 6, title: "Closed Session — Pending Litigation", type: "Closed Session", estimatedTime: 60, description: "Conference with legal counsel regarding pending litigation per GC §54956.9." },
];

export type ADAIssueSeverity = "Critical" | "Serious" | "Moderate" | "Minor";
export type ADAIssueStatus = "Open" | "In Progress" | "Resolved";

export interface ADAIssue {
  id: string;
  type: string;
  criterion: string;
  severity: ADAIssueSeverity;
  status: ADAIssueStatus;
  assetUrl: string;
  discovered: string;
  assignedTo?: string;
}

export const ADA_ISSUES: ADAIssue[] = [
  { id: "ADA-001", type: "Missing alt text", criterion: "WCAG 1.1.1", severity: "Serious", status: "Open", assetUrl: "/images/city-hall-banner.jpg", discovered: "2024-10-15", assignedTo: "Web Team" },
  { id: "ADA-002", type: "Keyboard trap", criterion: "WCAG 2.1.2", severity: "Critical", status: "In Progress", assetUrl: "/forms/permit-application", discovered: "2024-10-18", assignedTo: "T. Chen" },
  { id: "ADA-003", type: "Insufficient color contrast", criterion: "WCAG 1.4.3", severity: "Serious", status: "Open", assetUrl: "/agenda/2024-11-05", discovered: "2024-10-20" },
  { id: "ADA-004", type: "Missing form labels", criterion: "WCAG 4.1.2", severity: "Critical", status: "Open", assetUrl: "/forms/public-comment", discovered: "2024-10-22", assignedTo: "Web Team" },
  { id: "ADA-005", type: "No skip navigation", criterion: "WCAG 2.4.1", severity: "Moderate", status: "In Progress", assetUrl: "/", discovered: "2024-09-30" },
  { id: "ADA-006", type: "Missing document language", criterion: "WCAG 3.1.1", severity: "Serious", status: "Resolved", assetUrl: "/documents/annual-report-2023.pdf", discovered: "2024-09-15" },
  { id: "ADA-007", type: "Focus indicator missing", criterion: "WCAG 2.4.7", severity: "Serious", status: "Open", assetUrl: "/council/members", discovered: "2024-10-25" },
  { id: "ADA-008", type: "Missing table headers", criterion: "WCAG 1.3.1", severity: "Moderate", status: "Open", assetUrl: "/budget/fy2025", discovered: "2024-10-28" },
  { id: "ADA-009", type: "Video lacks captions", criterion: "WCAG 1.2.2", severity: "Critical", status: "In Progress", assetUrl: "/meetings/recordings/2024-10-15", discovered: "2024-10-16", assignedTo: "Media Team" },
  { id: "ADA-010", type: "Focus order inconsistent", criterion: "WCAG 2.4.3", severity: "Moderate", status: "Open", assetUrl: "/services/permits", discovered: "2024-10-30" },
];

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  trainingComplete: boolean;
  trainingDate?: string;
  trainingScore?: number;
}

export const STAFF_MEMBERS: StaffMember[] = [
  { id: "u-1", name: "A. Rodriguez", role: "Compliance Officer", department: "City Clerk", email: "arodriguez@cityofsacramento.org", trainingComplete: true, trainingDate: "2024-03-15", trainingScore: 94 },
  { id: "u-2", name: "J. Martinez", role: "Deputy Clerk", department: "City Clerk", email: "jmartinez@cityofsacramento.org", trainingComplete: true, trainingDate: "2024-04-02", trainingScore: 88 },
  { id: "u-3", name: "T. Chen", role: "Records Manager", department: "City Clerk", email: "tchen@cityofsacramento.org", trainingComplete: true, trainingDate: "2024-04-10", trainingScore: 91 },
  { id: "u-4", name: "R. Patel", role: "IT Manager", department: "IT", email: "rpatel@cityofsacramento.org", trainingComplete: false },
  { id: "u-5", name: "S. Williams", role: "Dept Coordinator", department: "Planning", email: "swilliams@cityofsacramento.org", trainingComplete: false },
];

export const COMPLIANCE_SCORE_HISTORY = [
  { month: "Jun", score: 71 },
  { month: "Jul", score: 74 },
  { month: "Aug", score: 76 },
  { month: "Sep", score: 75 },
  { month: "Oct", score: 78 },
  { month: "Nov", score: 82 },
];

export const UPCOMING_DEADLINES = [
  { id: "d-1", title: "CPRA-2024-0047 Response Due", module: "CPRA", daysLeft: 3, date: "2024-11-11", severity: "amber" as const },
  { id: "d-2", title: "Special Meeting Posting Deadline", module: "Brown Act", daysLeft: 1, date: "2024-11-11", severity: "red" as const },
  { id: "d-3", title: "CPRA-2024-0041 Extension Expires", module: "CPRA", daysLeft: 1, date: "2024-11-12", severity: "red" as const },
  { id: "d-4", title: "AB 434 Annual Certification Renewal", module: "ADA", daysLeft: 47, date: "2024-12-31", severity: "green" as const },
];

export const ACTIVE_VIOLATIONS = [
  { id: "v-1", title: "CPRA-2024-0044 — Overdue 18 days", module: "CPRA", severity: "red" as const, since: "2024-10-11" },
  { id: "v-2", title: "Oct 15 Meeting Minutes — 25 days without approval", module: "Brown Act", severity: "amber" as const, since: "2024-10-15" },
];

export const RECENT_ACTIVITY = [
  { id: "ra-1", timestamp: "2024-11-08T16:42:00Z", user: "J. Martinez", action: "Reviewed CPRA-2024-0047 — flagged potential exemption", module: "CPRA" },
  { id: "ra-2", timestamp: "2024-11-08T14:15:00Z", user: "A. Rodriguez", action: "Compliance score updated to 82/100 (+4 from last month)", module: "Dashboard" },
  { id: "ra-3", timestamp: "2024-11-07T11:30:00Z", user: "T. Chen", action: "Nov 5 meeting agenda posted to website and bulletin board", module: "Brown Act" },
];
