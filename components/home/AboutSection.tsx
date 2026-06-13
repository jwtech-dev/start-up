"use client";

import { motion } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";
import { Code2, Paintbrush, Zap } from "lucide-react";

const values = [
  {
    icon: Code2,
    title: "Engineering First",
    description:
      "Clean code, modern architecture, and performance baked in from day one.",
    gradient: "from-accent/20 to-accent/5",
  },
  {
    icon: Paintbrush,
    title: "Design Obsessed",
    description:
      "Every pixel matters. We craft interfaces that feel premium and intuitive.",
    gradient: "from-sapphire/20 to-sapphire/5",
  },
  {
    icon: Zap,
    title: "Ship Fast",
    description:
      "Small team, zero overhead. We move quickly without cutting corners.",
    gradient: "from-accent/15 to-sapphire/5",
  },
];

export default function AboutSection() {
  return (
    <section className="py-20 sm:py-28 lg:py-32" id="about" aria-label="About us">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="About Us"
          title="Why Work With Us?"
          subtitle="We're a tight-knit team of three — a frontend developer, a backend engineer, and a UI/UX designer. No managers, no bloat. Just pure craft."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="card-glow p-6 sm:p-8 rounded-2xl border border-border bg-surface/50 group hover:border-accent/20"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${value.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <value.icon size={22} className="text-accent" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-text-primary mb-3">
                {value.title}
              </h3>
              <p className="text-sm text-text-muted leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
