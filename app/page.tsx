import Link from "next/link";
import { Shield, FileText, Users, Accessibility, CheckCircle, ArrowRight, Star } from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "CPRA Public Records",
    subtitle: "California Public Records Act",
    description:
      "Automated 10-day countdown timers, AI exemption analysis, extension management, and violation alerts. Never miss a response deadline again.",
    highlights: ["10-day compliance clock", "AI exemption advisor", "Audit trail logging", "Violation tracking"],
    color: "#1D6FA4",
  },
  {
    icon: Users,
    title: "Brown Act Open Meetings",
    subtitle: "Bagley-Keene & Brown Act",
    description:
      "Manage meeting schedules, automate 72-hour posting requirements, AI agenda compliance review, and minutes approval workflow.",
    highlights: ["Posting deadline alerts", "AI agenda reviewer", "Minutes workflow", "Multi-location checklist"],
    color: "#B87D0A",
  },
  {
    icon: Accessibility,
    title: "ADA / AB 434",
    subtitle: "Web Accessibility Compliance",
    description:
      "WCAG 2.1 AA issue tracking, AB 434 annual certification management, staff training progress, and automated accessibility scanning.",
    highlights: ["WCAG issue tracker", "AB 434 certification", "Staff training log", "Auto-scan integration"],
    color: "#0A8A5C",
  },
];

const pricingTiers = [
  {
    name: "Starter",
    price: 499,
    description: "For small cities under 10,000 population",
    features: [
      "CPRA request tracking",
      "Meeting schedule manager",
      "Basic ADA checklist",
      "Up to 3 users",
      "Email notifications",
      "Monthly compliance report",
    ],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Standard",
    price: 899,
    description: "For mid-size cities 10,000–50,000",
    features: [
      "Everything in Starter",
      "AI Exemption Advisor",
      "AI Agenda Reviewer",
      "Up to 10 users",
      "Full audit log",
      "Audit package export",
      "Priority support",
    ],
    cta: "Most Popular",
    highlight: true,
  },
  {
    name: "Professional",
    price: 1499,
    description: "For large cities and counties",
    features: [
      "Everything in Standard",
      "Unlimited users",
      "AI Audit Response Assistant",
      "Custom integrations",
      "Dedicated compliance analyst",
      "SLA guarantee",
      "Custom reporting",
    ],
    cta: "Contact Sales",
    highlight: false,
  },
];

const stats = [
  { value: "300+", label: "Hours saved per year" },
  { value: "98%", label: "Average on-time rate" },
  { value: "0", label: "Audit findings for clients" },
  { value: "140+", label: "California cities served" },
];

export default function LandingPage() {
  return (
    <div style={{ background: "var(--bg-primary)", color: "var(--text-primary)", fontFamily: "var(--font-ibm-plex-sans)" }}>
      {/* Nav */}
      <nav
        className="border-b sticky top-0 z-50"
        style={{ background: "var(--bg-secondary)", borderColor: "var(--border)" }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield size={20} style={{ color: "var(--gold)" }} />
            <span
              className="font-bold text-sm tracking-widest uppercase"
              style={{ color: "var(--gold)", fontFamily: "var(--font-ibm-plex-mono)" }}
            >
              LocalGov Compliance
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#features" className="text-sm transition-colors hover:opacity-80" style={{ color: "var(--text-secondary)" }}>
              Features
            </a>
            <a href="#pricing" className="text-sm transition-colors hover:opacity-80" style={{ color: "var(--text-secondary)" }}>
              Pricing
            </a>
            <Link
              href="/dashboard"
              className="text-sm px-4 py-2 rounded font-medium transition-colors hover:opacity-90"
              style={{ background: "var(--accent-blue)", color: "white" }}
            >
              View Demo
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "radial-gradient(circle at 20% 50%, #1D6FA4 0%, transparent 50%), radial-gradient(circle at 80% 20%, #C49A2B 0%, transparent 40%)",
          }}
        />
        <div className="max-w-7xl mx-auto px-6 py-28 text-center relative">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-8 text-xs font-mono"
            style={{ borderColor: "var(--border)", color: "var(--text-secondary)", background: "var(--bg-secondary)" }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: "var(--accent-green)" }}
            />
            Built for California municipal government
          </div>
          <h1
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            style={{ fontFamily: "var(--font-ibm-plex-serif)", color: "var(--text-primary)" }}
          >
            300 Hours Back.
            <br />
            <span style={{ color: "var(--gold)" }}>Zero Audit Exposure.</span>
          </h1>
          <p
            className="text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            LocalGov Compliance automates CPRA records requests, Brown Act meeting
            management, and ADA/AB 434 accessibility compliance — so your city
            staff can focus on serving residents, not managing deadlines.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:opacity-90"
              style={{ background: "var(--accent-blue)", color: "white" }}
            >
              Request a Demo
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold text-lg border transition-all hover:opacity-80"
              style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}
            >
              View Live Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p
                  className="text-4xl font-bold mb-1"
                  style={{ fontFamily: "var(--font-ibm-plex-serif)", color: "var(--gold)" }}
                >
                  {stat.value}
                </p>
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2
              className="text-4xl font-bold mb-4"
              style={{ fontFamily: "var(--font-ibm-plex-serif)", color: "var(--text-primary)" }}
            >
              Three Compliance Modules.
              <br />
              One Platform.
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>
              California law is complex. LocalGov Compliance keeps your city ahead
              of CPRA, Brown Act, and ADA requirements — automatically.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border p-8 transition-all hover:opacity-90"
                style={{ background: "var(--bg-secondary)", borderColor: "var(--border)" }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-6"
                  style={{ background: `${feature.color}20`, border: `1px solid ${feature.color}40` }}
                >
                  <feature.icon size={22} style={{ color: feature.color }} />
                </div>
                <h3
                  className="text-xl font-bold mb-1"
                  style={{ fontFamily: "var(--font-ibm-plex-serif)", color: "var(--text-primary)" }}
                >
                  {feature.title}
                </h3>
                <p className="text-xs font-mono mb-4" style={{ color: feature.color }}>{feature.subtitle}</p>
                <p className="text-sm mb-6 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {feature.description}
                </p>
                <ul className="space-y-2">
                  {feature.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                      <CheckCircle size={13} style={{ color: feature.color, flexShrink: 0 }} />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section
        id="pricing"
        className="py-24"
        style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--border)" }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2
              className="text-4xl font-bold mb-4"
              style={{ fontFamily: "var(--font-ibm-plex-serif)", color: "var(--text-primary)" }}
            >
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
              No setup fees. No per-user charges. Cancel anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className="rounded-xl border p-8 relative"
                style={{
                  background: tier.highlight ? "var(--bg-tertiary)" : "var(--bg-primary)",
                  borderColor: tier.highlight ? "var(--accent-blue)" : "var(--border)",
                }}
              >
                {tier.highlight && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1"
                    style={{ background: "var(--accent-blue)", color: "white" }}
                  >
                    <Star size={10} />
                    Most Popular
                  </div>
                )}
                <h3
                  className="text-xl font-bold mb-1"
                  style={{ fontFamily: "var(--font-ibm-plex-serif)", color: "var(--text-primary)" }}
                >
                  {tier.name}
                </h3>
                <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>{tier.description}</p>
                <div className="flex items-end gap-1 mb-6">
                  <span
                    className="text-4xl font-bold"
                    style={{ fontFamily: "var(--font-ibm-plex-serif)", color: "var(--text-primary)" }}
                  >
                    ${tier.price.toLocaleString()}
                  </span>
                  <span className="pb-1 text-sm" style={{ color: "var(--text-muted)" }}>/mo</span>
                </div>
                <ul className="space-y-2 mb-8">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                      <CheckCircle size={13} style={{ color: "var(--accent-green)" }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  className="w-full py-3 rounded-lg font-semibold text-sm transition-all hover:opacity-90"
                  style={{
                    background: tier.highlight ? "var(--accent-blue)" : "transparent",
                    color: tier.highlight ? "white" : "var(--text-primary)",
                    border: tier.highlight ? "none" : "1px solid var(--border)",
                  }}
                >
                  {tier.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2
            className="text-4xl font-bold mb-6"
            style={{ fontFamily: "var(--font-ibm-plex-serif)", color: "var(--text-primary)" }}
          >
            Ready to automate your
            <br />
            compliance program?
          </h2>
          <p className="text-lg mb-10" style={{ color: "var(--text-secondary)" }}>
            Join 140+ California cities that trust LocalGov Compliance to manage their
            CPRA, Brown Act, and ADA obligations.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-10 py-5 rounded-lg font-semibold text-lg transition-all hover:opacity-90"
            style={{ background: "var(--gold)", color: "var(--bg-primary)" }}
          >
            Request a Demo
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="border-t py-10"
        style={{ background: "var(--bg-secondary)", borderColor: "var(--border)" }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield size={16} style={{ color: "var(--gold)" }} />
            <span className="text-xs font-mono font-bold" style={{ color: "var(--gold)" }}>
              LOCALGOV COMPLIANCE
            </span>
          </div>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            © 2024 LocalGov Compliance. Built for California municipalities.
          </p>
          <div className="flex gap-4 text-xs" style={{ color: "var(--text-muted)" }}>
            <a href="#" className="hover:opacity-80">Privacy</a>
            <a href="#" className="hover:opacity-80">Terms</a>
            <a href="#" className="hover:opacity-80">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
