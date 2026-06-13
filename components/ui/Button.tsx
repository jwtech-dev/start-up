"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  ariaLabel?: string;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
}

const variants = {
  primary:
    "bg-accent text-bg hover:bg-accent-hover font-semibold",
  secondary:
    "bg-sapphire text-white hover:bg-sapphire-hover font-semibold",
  outline:
    "border border-border hover:border-accent text-text-primary hover:text-accent bg-transparent",
  ghost:
    "text-text-muted hover:text-text-primary bg-transparent hover:bg-surface",
};

const sizes = {
  sm: "px-4 py-2 text-sm min-h-[36px]",
  md: "px-6 py-3 text-sm min-h-[44px]",
  lg: "px-8 py-4 text-base min-h-[48px]",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  className,
  type = "button",
  ariaLabel,
  disabled = false,
  loading = false,
  fullWidth = false,
}: ButtonProps) {
  const baseClasses = cn(
    "inline-flex items-center justify-center gap-2 rounded-lg font-body transition-colors duration-200 cursor-pointer",
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
    (disabled || loading) && "opacity-50 pointer-events-none",
    className
  );

  const motionProps = {
    whileHover: disabled || loading ? {} : { scale: 1.02 },
    whileTap: disabled || loading ? {} : { scale: 0.98 },
    transition: { type: "spring" as const, stiffness: 400, damping: 17 },
  };

  const content = (
    <>
      {loading && <Loader2 size={16} className="spinner" />}
      {children}
    </>
  );

  if (href && !disabled && !loading) {
    return (
      <motion.div {...motionProps} className={fullWidth ? "w-full" : "inline-block"}>
        <Link href={href} className={baseClasses} aria-label={ariaLabel}>
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      {...motionProps}
      type={type}
      onClick={onClick}
      className={baseClasses}
      aria-label={ariaLabel}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
    >
      {content}
    </motion.button>
  );
}
