"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Rachel Chen",
    company: "TechFlow Inc.",
    role: "CTO",
    quote:
      "J-Warriors delivered our SaaS dashboard ahead of schedule. The attention to detail and performance optimization was beyond our expectations.",
    rating: 5,
    initials: "RC",
    color: "from-accent to-emerald-400",
  },
  {
    name: "Marcus Johnson",
    company: "StartUp Labs",
    role: "Founder",
    quote:
      "Working with this team felt like having a full in-house engineering team. Communication was seamless and the quality was outstanding.",
    rating: 5,
    initials: "MJ",
    color: "from-violet to-blue-400",
  },
  {
    name: "Sarah Kim",
    company: "DesignCo",
    role: "Product Manager",
    quote:
      "The design-to-code pipeline was flawless. They took our Figma files and turned them into a pixel-perfect, animated web experience.",
    rating: 5,
    initials: "SK",
    color: "from-amber-400 to-orange-400",
  },
];

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <div className="p-6 sm:p-8 rounded-2xl border border-border bg-bg relative h-full flex flex-col">
      <Quote
        size={32}
        className="text-accent/10 absolute top-6 right-6"
        aria-hidden="true"
      />

      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: testimonial.rating }).map((_, j) => (
          <Star
            key={j}
            size={14}
            className="text-accent fill-accent"
            aria-hidden="true"
          />
        ))}
        <span className="visually-hidden">{testimonial.rating} out of 5 stars</span>
      </div>

      {/* Quote */}
      <p className="text-sm text-text-muted leading-relaxed mb-6 italic flex-1">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        {/* Avatar placeholder */}
        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-bg text-xs font-bold`}>
          {testimonial.initials}
        </div>
        <div>
          <div className="font-heading font-semibold text-sm text-text-primary">
            {testimonial.name}
          </div>
          <div className="text-xs text-text-muted">
            {testimonial.role}, {testimonial.company}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Auto-rotate on mobile
  useEffect(() => {
    if (!isMobile) return;
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isMobile]);

  const goTo = (index: number) => {
    setCurrent(index);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  return (
    <section
      className="py-20 sm:py-28 lg:py-32 bg-surface/30"
      id="testimonials"
      aria-label="Testimonials"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Testimonials"
          title="What Clients Say"
          subtitle="Don't just take our word for it — hear from the teams we've worked with."
        />

        {/* Desktop: grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="card-glow"
            >
              <TestimonialCard testimonial={testimonial} />
            </motion.div>
          ))}
        </div>

        {/* Mobile: carousel */}
        <div className="md:hidden">
          <div className="relative overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <TestimonialCard testimonial={testimonials[current]} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={() => goTo((current - 1 + testimonials.length) % testimonials.length)}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-text-muted hover:text-accent hover:border-accent/30 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={16} />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === current
                      ? "bg-accent w-6"
                      : "bg-border hover:bg-text-muted"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                  aria-current={i === current ? "true" : undefined}
                />
              ))}
            </div>

            <button
              onClick={() => goTo((current + 1) % testimonials.length)}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-text-muted hover:text-accent hover:border-accent/30 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
