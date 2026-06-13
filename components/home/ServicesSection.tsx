"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import { services } from "@/data/services";
import { ArrowRight, Sparkles } from "lucide-react";

const rarityColors: Record<string, { border: string; glow: string; label: string }> = {
  Common: {
    border: "border-gray-500",
    glow: "shadow-gray-500/20",
    label: "text-gray-400",
  },
  Rare: {
    border: "border-blue-400",
    glow: "shadow-blue-400/30",
    label: "text-blue-400",
  },
  Epic: {
    border: "border-sapphire",
    glow: "shadow-sapphire/30",
    label: "text-sapphire",
  },
  Legendary: {
    border: "border-amber-400",
    glow: "shadow-amber-400/40",
    label: "text-amber-400",
  },
};

export default function ServicesSection() {
  return (
    <section
      className="py-20 sm:py-28 lg:py-32 bg-surface/30"
      id="services"
      aria-label="Services"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Services"
          title="What We Build"
          subtitle="From concept to deployment — we handle design, frontend, and backend as one team."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, i) => {
            const rarity = rarityColors[service.rarity];
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40, rotateY: -5 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  transition: { type: "spring" as const, stiffness: 300, damping: 20 },
                }}
                className="group perspective-1000"
              >
                <div
                  className={`relative rounded-2xl ${rarity.border} border-2 overflow-hidden bg-gradient-to-b from-[#152850] to-[#0D1A3A] shadow-lg ${rarity.glow} group-hover:shadow-xl transition-shadow duration-500`}
                >
                  {/* Corner sparkles */}
                  <div className="absolute top-2 left-2 text-amber-400/60 z-10" aria-hidden="true">
                    <Sparkles size={14} />
                  </div>
                  <div className="absolute top-2 right-2 text-amber-400/60 z-10" aria-hidden="true">
                    <Sparkles size={14} />
                  </div>

                  {/* Card Art */}
                  <div className="relative w-full aspect-[4/3] sm:aspect-square overflow-hidden">
                    <Image
                      src={service.cardImage}
                      alt=""
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Gradient overlay for readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D1A3A] via-[#0D1A3A]/40 to-transparent" />
                  </div>

                  {/* Title Banner */}
                  <div className="relative -mt-12 z-10 mx-4">
                    <div className={`${rarity.border} border rounded-xl bg-[#112260]/90 backdrop-blur-sm px-4 py-3 text-center`}>
                      <h3 className="font-heading font-bold text-base sm:text-lg text-text-primary uppercase tracking-wide">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="px-5 pt-4 pb-5 space-y-3">
                    {/* Features as bullet list */}
                    <ul className="space-y-1.5">
                      {service.features.map((feature) => (
                        <li
                          key={feature}
                          className="text-xs text-text-muted flex items-start gap-2"
                        >
                          <span className="text-accent mt-0.5" aria-hidden="true">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* Footer: rarity */}
                    <div className={`flex items-center justify-between pt-3 border-t ${rarity.border}/30`}>
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-accent to-sapphire flex items-center justify-center">
                        <service.icon size={12} className="text-bg" />
                      </div>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-widest ${rarity.label}`}
                      >
                        {service.rarity}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Button href="/services" variant="outline">
            View All Services
            <ArrowRight size={14} />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
