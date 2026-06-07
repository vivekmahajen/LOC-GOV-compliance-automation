import * as React from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant = "default" | "green" | "amber" | "red" | "blue" | "muted";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-[#1A2235] text-[#E8EEF7] border border-[#1E3A5F]",
  green: "bg-[#0A8A5C]/20 text-[#34D399] border border-[#0A8A5C]/40",
  amber: "bg-[#B87D0A]/20 text-[#FCD34D] border border-[#B87D0A]/40",
  red: "bg-[#B91C1C]/20 text-[#FCA5A5] border border-[#B91C1C]/40",
  blue: "bg-[#1D6FA4]/20 text-[#60A5FA] border border-[#1D6FA4]/40",
  muted: "bg-[#1A2235] text-[#8BA0BC] border border-[#1E3A5F]",
};

export function Badge({ variant = "default", className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium font-mono",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
