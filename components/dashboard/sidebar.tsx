"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { ORG } from "@/lib/mock-data";
import {
  LayoutDashboard,
  FileText,
  Users,
  Accessibility,
  ClipboardList,
  Settings,
  Shield,
  LogOut,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/cpra", label: "Public Records", sublabel: "CPRA", icon: FileText },
  { href: "/dashboard/meetings", label: "Open Meetings", sublabel: "Brown Act", icon: Users },
  { href: "/dashboard/ada", label: "Accessibility", sublabel: "ADA / AB 434", icon: Accessibility },
  { href: "/dashboard/audit", label: "Audit Center", icon: ClipboardList },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const userName = session?.user?.name ?? ORG.currentUser;
  const userRole = (session?.user as any)?.role ?? ORG.currentUserRole;
  const initials = userName.split(" ").map((p: string) => p[0]).join("");

  function isActive(href: string, exact?: boolean) {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  }

  return (
    <aside
      className="w-60 flex-shrink-0 flex flex-col border-r"
      style={{ background: "var(--bg-secondary)", borderColor: "var(--border)", minHeight: "100vh" }}
    >
      {/* Logo */}
      <div className="px-4 py-5 border-b" style={{ borderColor: "var(--border)" }}>
        <div className="flex items-center gap-2 mb-1">
          <Shield size={18} style={{ color: "var(--gold)" }} />
          <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--gold)", fontFamily: "var(--font-ibm-plex-mono)" }}>
            LocalGov
          </span>
        </div>
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>Compliance Platform</p>
      </div>

      {/* Org info */}
      <div className="px-4 py-3 border-b" style={{ borderColor: "var(--border)" }}>
        <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{ORG.name}</p>
        <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>{ORG.county} County, {ORG.state}</p>
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>Pop. {ORG.population.toLocaleString()}</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-3 space-y-0.5">
        {navItems.map((item) => {
          const active = isActive(item.href, item.exact);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded text-sm transition-colors",
                active
                  ? "text-white"
                  : "hover:text-[#E8EEF7]"
              )}
              style={{
                background: active ? "var(--accent-blue)" : "transparent",
                color: active ? "white" : "var(--text-secondary)",
              }}
            >
              <item.icon size={16} />
              <div>
                <div className="font-medium leading-tight">{item.label}</div>
                {item.sublabel && (
                  <div className="text-xs leading-tight opacity-70">{item.sublabel}</div>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="px-4 py-3 border-t" style={{ borderColor: "var(--border)" }}>
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0"
            style={{ background: "var(--accent-blue)", color: "white" }}
          >
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium truncate" style={{ color: "var(--text-primary)" }}>{userName}</p>
            <p className="text-xs truncate" style={{ color: "var(--text-muted)" }}>{userRole}</p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            title="Sign out"
            className="p-1 rounded hover:opacity-80 transition-opacity flex-shrink-0"
            style={{ color: "var(--text-muted)" }}
          >
            <LogOut size={14} />
          </button>
        </div>
      </div>
    </aside>
  );
}
