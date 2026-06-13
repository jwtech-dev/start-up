"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  badge?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionTitle({
  title,
  subtitle,
  badge,
  align = "center",
  className,
}: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      {/* Optional badge label */}
      {badge && (
        <div className={cn(
          "mb-4",
          align === "center" && "flex justify-center"
        )}>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-accent bg-accent/10 border border-accent/20">
            {badge}
          </span>
        </div>
      )}

      {/* Decorative accent line */}
      <div
        className={cn(
          "mb-4",
          align === "center" ? "flex justify-center" : ""
        )}
      >
        <div className="w-12 h-1 rounded-full bg-gradient-to-r from-accent to-sapphire" />
      </div>

      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading tracking-tight text-text-primary">
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          "mt-4 text-lg text-text-muted max-w-2xl leading-relaxed",
          align === "center" && "mx-auto"
        )}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
