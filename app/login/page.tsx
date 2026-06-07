"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Shield } from "lucide-react";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "authenticated") router.replace("/dashboard");
  }, [status, router]);

  async function handleGoogleSignIn() {
    setLoading(true);
    await signIn("google", { callbackUrl: "/dashboard" });
  }

  if (status === "loading") return null;

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4"
            style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}>
            <Shield size={22} style={{ color: "var(--gold)" }} />
          </div>
          <h1
            className="text-2xl font-bold"
            style={{ fontFamily: "var(--font-ibm-plex-serif)", color: "var(--text-primary)" }}
          >
            LocalGov Compliance
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
            California Municipal Compliance Platform
          </p>
        </div>

        <div
          className="rounded-xl border p-8"
          style={{ background: "var(--bg-secondary)", borderColor: "var(--border)" }}
        >
          <h2 className="text-lg font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
            Sign in to your account
          </h2>
          <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
            Use your city Google Workspace account
          </p>

          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg border text-sm font-medium transition-colors"
            style={{
              background: loading ? "var(--bg-tertiary)" : "var(--bg-primary)",
              borderColor: "var(--border)",
              color: loading ? "var(--text-muted)" : "var(--text-primary)",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            {loading ? "Redirecting to Google..." : "Continue with Google"}
          </button>

          <p className="text-xs text-center mt-6" style={{ color: "var(--text-muted)" }}>
            Access is restricted to authorized city staff.
            <br />
            Contact your compliance officer to request access.
          </p>
        </div>

        <p className="text-xs text-center mt-6" style={{ color: "var(--text-muted)" }}>
          © {new Date().getFullYear()} LocalGov Compliance Platform
        </p>
      </div>
    </div>
  );
}
