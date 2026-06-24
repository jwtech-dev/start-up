"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { ArrowRight, Sparkles } from "lucide-react";

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1500;
    const steps = 40;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <div ref={ref} className="text-3xl sm:text-4xl font-heading font-bold text-accent">
      {count}{suffix}
    </div>
  );
}

export default function Hero() {
  return (
    <section
      className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden noise-overlay"
      aria-label="Hero"
    >
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, 30, -20, 0], y: [0, -20, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="glow-mint -top-32 -left-32"
        />
        <motion.div
          animate={{ x: [0, -30, 20, 0], y: [0, 20, -30, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="glow-sapphire top-1/3 -right-20"
        />
        <motion.div
          animate={{ x: [0, 20, -20, 0], y: [0, -10, 20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="glow-mint bottom-0 left-1/3 opacity-50"
        />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Available badge — whitespace-nowrap prevents circle wrapping */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/20 bg-accent/5 mt-6 mb-8 whitespace-nowrap"
        >
          <Sparkles size={14} className="text-accent shrink-0" aria-hidden="true" />
          <span className="text-sm text-accent font-medium">
            Currently Available for Commission Work
          </span>
        </motion.div>

        {/* Heading — two lines, not individual words */}
        <h1 className="font-heading font-bold tracking-tight">
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
            className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-text-primary leading-tight"
          >
            We Build
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
            className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl gradient-text leading-tight"
          >
            Digital Experiences
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
            className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-text-primary leading-tight"
          >
            That Matter.
          </motion.span>
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.6 }}
          className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-text-muted max-w-2xl mx-auto leading-relaxed"
        >
          A three-person studio specializing in premium web apps, stunning
          interfaces, and rock-solid backends. We turn your vision into
          production-ready reality.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        >
          <Button href="/contact" size="lg" fullWidth className="sm:!w-auto">
            Hire Us
            <ArrowRight size={16} />
          </Button>
          <Button href="/team" variant="outline" size="lg" fullWidth className="sm:!w-auto">
            View Our Work
          </Button>
        </motion.div>

        {/* Stats ticker with count-up */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-16 sm:mt-20 grid grid-cols-3 gap-4 sm:gap-8 max-w-xl mx-auto pt-8 border-t border-border"
        >
          {[
            { value: 50, suffix: "+", label: "Projects Delivered" },
            { value: 3, suffix: "", label: "Expert Team Members" },
            { value: 99, suffix: "%", label: "Client Satisfaction" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <CountUp target={stat.value} suffix={stat.suffix} />
              <div className="text-xs sm:text-sm text-text-primary font-medium mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg to-transparent z-10" />
    </section>
  );
}
