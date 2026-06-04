"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { services, processSteps, faqs } from "@/data/services";
import { ChevronDown, ArrowRight, CheckCircle2 } from "lucide-react";

export default function ServicesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="py-12 sm:py-20 lg:py-24">
      {/* Hero / Intro */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-24 relative overflow-hidden">
        {/* Decorative glows */}
        <div className="glow-mint -top-40 -left-40 opacity-40" />
        <div className="glow-violet -top-20 right-0 opacity-30" />

        <div className="relative z-10">
          <SectionTitle
            badge="What We Offer"
            title="Our Services"
            subtitle="From quick landing pages to full-scale platforms — we build whatever your business needs, on commission."
          />
        </div>
      </section>

      {/* Services Grid */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 sm:mb-32"
        aria-label="Service offerings"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="card-glow group p-6 sm:p-8 rounded-2xl border border-border bg-surface/50 flex flex-col hover:border-accent/20"
            >
              <div className="w-12 h-12 rounded-xl bg-violet/10 flex items-center justify-center mb-5 group-hover:bg-violet/20 group-hover:scale-110 transition-all duration-300">
                <service.icon size={22} className="text-violet" />
              </div>

              <h3 className="font-heading font-semibold text-lg text-text-primary mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-text-muted leading-relaxed mb-5 flex-1">
                {service.description}
              </p>

              <ul className="space-y-2 mb-6">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-text-muted"
                  >
                    <CheckCircle2
                      size={14}
                      className="text-accent mt-0.5 shrink-0"
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t border-border flex items-center justify-between">
                <Badge variant="accent">From {service.startingPrice}</Badge>
                <Button href="/contact" size="sm" variant="ghost">
                  Get Quote
                  <ArrowRight size={12} />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section
        className="py-20 sm:py-24 bg-surface/30 mb-24 sm:mb-32"
        aria-label="Our process"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            badge="How It Works"
            title="Our Process"
            subtitle="Our streamlined process ensures quality at every step."
          />

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-accent/30 via-violet/20 to-transparent hidden sm:block" aria-hidden="true" />

            <div className="space-y-6 sm:space-y-8">
              {processSteps.map((step, i) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  className="flex gap-4 sm:gap-6 items-start"
                >
                  <div className="relative z-10 w-12 h-12 rounded-xl bg-bg border border-accent/30 flex items-center justify-center shrink-0">
                    <span className="font-heading font-bold text-accent">
                      {step.step}
                    </span>
                  </div>
                  <div className="pb-4 sm:pb-8">
                    <h3 className="font-heading font-semibold text-lg text-text-primary mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-text-muted leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-24"
        aria-label="Frequently asked questions"
      >
        <SectionTitle
          badge="FAQ"
          title="Common Questions"
          subtitle="Everything you need to know about working with us."
        />

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="rounded-xl border border-border bg-surface/50 overflow-hidden hover:border-border-hover transition-colors"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between text-left cursor-pointer min-h-[44px]"
                aria-expanded={openFaq === i}
              >
                <span className="font-heading font-medium text-sm text-text-primary pr-4">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openFaq === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={16} className="text-text-muted shrink-0" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 sm:px-6 pb-5 text-sm text-text-muted leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-12 sm:py-16 rounded-2xl border border-border bg-gradient-to-br from-surface/80 to-surface/30 relative overflow-hidden">
          <div className="glow-mint -top-20 left-1/4 opacity-20" />
          <div className="glow-violet -bottom-20 right-1/4 opacity-20" />
          <div className="relative z-10">
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-text-primary mb-4">
              Ready to Start?
            </h2>
            <p className="text-text-muted mb-8 px-4">
              Tell us about your project and get a free estimate within 24 hours.
            </p>
            <Button href="/contact" size="lg">
              Get in Touch
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
