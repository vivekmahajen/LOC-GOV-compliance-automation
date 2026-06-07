import * as React from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "danger" | "ghost" | "outline";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-[#1D6FA4] hover:bg-[#1D6FA4]/90 text-white border border-[#1D6FA4]",
  secondary: "bg-[#1A2235] hover:bg-[#1A2235]/80 text-[#E8EEF7] border border-[#1E3A5F]",
  danger: "bg-[#B91C1C] hover:bg-[#B91C1C]/90 text-white border border-[#B91C1C]",
  ghost: "bg-transparent hover:bg-[#1A2235] text-[#8BA0BC] hover:text-[#E8EEF7] border border-transparent",
  outline: "bg-transparent hover:bg-[#1A2235] text-[#E8EEF7] border border-[#1E3A5F]",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

export function Button({ variant = "primary", size = "md", className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded font-medium transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
