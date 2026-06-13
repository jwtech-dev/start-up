import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "accent" | "sapphire" | "error" | "success";
  size?: "sm" | "md";
  className?: string;
}

const badgeVariants = {
  default:
    "bg-surface text-text-muted border border-border",
  accent:
    "bg-accent/10 text-accent border border-accent/20",
  sapphire:
    "bg-sapphire/10 text-sapphire border border-sapphire/20",
  error:
    "bg-error-muted text-error border border-error/20",
  success:
    "bg-success-muted text-success border border-success/20",
};

const badgeSizes = {
  sm: "px-2 py-0.5 text-[10px]",
  md: "px-3 py-1 text-xs",
};

export default function Badge({
  children,
  variant = "default",
  size = "md",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium font-body",
        badgeVariants[variant],
        badgeSizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}
