import * as React from "react";
import { cn } from "@/lib/utils";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  gradient?: boolean;
}

export function Progress({ value, max = 100, gradient = false, className, ...props }: ProgressProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div
      className={cn("h-2 w-full rounded-full overflow-hidden", className)}
      style={{ background: "var(--bg-tertiary)" }}
      {...props}
    >
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{
          width: `${pct}%`,
          background: gradient
            ? "linear-gradient(90deg, #1D6FA4 0%, #0A8A5C 50%, #C49A2B 100%)"
            : "var(--accent-blue)",
        }}
      />
    </div>
  );
}
