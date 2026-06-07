import { Bell, Shield } from "lucide-react";
import { ORG } from "@/lib/mock-data";

interface HeaderProps {
  title?: string;
}

export function DashboardHeader({ title }: HeaderProps) {
  return (
    <header
      className="h-14 border-b flex items-center justify-between px-6 flex-shrink-0"
      style={{ background: "var(--bg-secondary)", borderColor: "var(--border)" }}
    >
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Shield size={16} style={{ color: "var(--gold)" }} />
          <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--gold)", fontFamily: "var(--font-ibm-plex-mono)" }}>
            LOCALGOV COMPLIANCE
          </span>
        </div>
        <span style={{ color: "var(--text-muted)" }}>|</span>
        <span className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>{ORG.name}</span>
        {title && (
          <>
            <span style={{ color: "var(--text-muted)" }}>|</span>
            <span className="text-sm" style={{ color: "var(--text-muted)" }}>{title}</span>
          </>
        )}
      </div>
      <div className="flex items-center gap-4">
        <button
          className="relative p-2 rounded transition-colors hover:bg-[#1A2235]"
          style={{ color: "var(--text-secondary)" }}
        >
          <Bell size={16} />
          <span
            className="absolute top-1 right-1 w-2 h-2 rounded-full"
            style={{ background: "var(--accent-red)" }}
          />
        </button>
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold"
            style={{ background: "var(--accent-blue)", color: "white" }}
          >
            AR
          </div>
          <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{ORG.currentUser}</span>
        </div>
      </div>
    </header>
  );
}
