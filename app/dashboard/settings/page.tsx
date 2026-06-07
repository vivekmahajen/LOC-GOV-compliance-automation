import { ORG, STAFF_MEMBERS } from "@/lib/mock-data";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building, Users, Bell, Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-ibm-plex-serif)", color: "var(--text-primary)" }}>
          Organization Settings
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
          Configure City of Oakdale compliance settings
        </p>
      </div>

      {/* City Profile */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building size={13} />
            City Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "City Name", value: ORG.name },
              { label: "State", value: ORG.state },
              { label: "County", value: ORG.county },
              { label: "Population", value: ORG.population.toLocaleString() },
              { label: "Website", value: ORG.website },
              { label: "Fiscal Year", value: "July 1 – June 30" },
            ].map((field) => (
              <div key={field.label}>
                <label className="block text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: "var(--text-muted)" }}>
                  {field.label}
                </label>
                <input
                  className="w-full px-3 py-2 rounded border text-sm outline-none"
                  style={{ background: "var(--bg-tertiary)", borderColor: "var(--border)", color: "var(--text-primary)" }}
                  defaultValue={field.value}
                />
              </div>
            ))}
          </div>
          <Button variant="primary" size="sm" className="mt-4">Save Changes</Button>
        </CardContent>
      </Card>

      {/* Staff Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Users size={13} />
              Staff & Users
            </CardTitle>
            <Button variant="secondary" size="sm">+ Invite User</Button>
          </div>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {["Name", "Role", "Department", "Email", "Access"].map((col) => (
                  <th key={col} className="text-left py-2 px-3 text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {STAFF_MEMBERS.map((staff) => (
                <tr
                  key={staff.id}
                  className="hover:bg-[#1A2235] transition-colors"
                  style={{ borderBottom: "1px solid var(--border)" }}
                >
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold"
                        style={{ background: "var(--accent-blue)", color: "white" }}
                      >
                        {staff.name.split(" ").map(p => p[0]).join("").slice(0, 2)}
                      </div>
                      <span style={{ color: "var(--text-primary)" }}>{staff.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-xs" style={{ color: "var(--text-secondary)" }}>{staff.role}</span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-xs" style={{ color: "var(--text-secondary)" }}>{staff.department}</span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>{staff.email}</span>
                  </td>
                  <td className="py-3 px-3">
                    <Badge variant={staff.id === "u-1" ? "blue" : "muted"}>
                      {staff.id === "u-1" ? "Admin" : "Editor"}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Compliance Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings size={13} />
            Compliance Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Regular Meeting Schedule", value: "1st & 3rd Tuesday, 7:00 PM" },
              { label: "Meeting Location", value: "City Hall Chamber, 280 N Sierra Ave" },
              { label: "Agenda Posting Lead Time", value: "72 hours (Regular), 24 hours (Special)" },
              { label: "CPRA Response Deadline", value: "10 calendar days" },
              { label: "Minutes Approval Target", value: "Next regular meeting" },
              { label: "ADA Coordinator", value: "A. Rodriguez — arodriguez@oakdaleca.gov" },
            ].map((field) => (
              <div key={field.label}>
                <label className="block text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: "var(--text-muted)" }}>
                  {field.label}
                </label>
                <input
                  className="w-full px-3 py-2 rounded border text-sm outline-none"
                  style={{ background: "var(--bg-tertiary)", borderColor: "var(--border)", color: "var(--text-primary)" }}
                  defaultValue={field.value}
                />
              </div>
            ))}
          </div>
          <Button variant="primary" size="sm" className="mt-4">Save Configuration</Button>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell size={13} />
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { label: "CPRA deadline approaching (3 days)", enabled: true },
              { label: "CPRA deadline approaching (1 day)", enabled: true },
              { label: "CPRA overdue — violation created", enabled: true },
              { label: "Meeting posting deadline reminder", enabled: true },
              { label: "Minutes approval overdue (14 days)", enabled: true },
              { label: "ADA issue assigned to me", enabled: false },
              { label: "Monthly compliance score summary", enabled: true },
              { label: "Audit package ready", enabled: false },
            ].map((pref) => (
              <div key={pref.label} className="flex items-center justify-between py-2 border-b last:border-0" style={{ borderColor: "var(--border)" }}>
                <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{pref.label}</span>
                <div
                  className="w-10 h-5 rounded-full relative cursor-pointer transition-colors"
                  style={{ background: pref.enabled ? "var(--accent-blue)" : "var(--bg-tertiary)" }}
                >
                  <div
                    className="w-4 h-4 rounded-full absolute top-0.5 transition-all"
                    style={{
                      background: "white",
                      left: pref.enabled ? "calc(100% - 1.1rem)" : "0.1rem",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <Button variant="primary" size="sm" className="mt-4">Save Preferences</Button>
        </CardContent>
      </Card>
    </div>
  );
}
