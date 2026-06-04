"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { Home, Search, ArrowRight } from "lucide-react";
import Link from "next/link";

const popularLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Team", href: "/team" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center relative overflow-hidden" aria-label="Page not found">
      {/* Decorative elements */}
      <div className="glow-mint -top-40 -left-20 opacity-20" />
      <div className="glow-violet top-1/2 -right-20 opacity-15" />

      <div className="w-full max-w-lg mx-auto px-4 sm:px-6 text-center relative z-10">
        {/* Animated 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="mb-8"
        >
          <div className="text-8xl sm:text-9xl font-heading font-bold gradient-text leading-none mb-2">
            404
          </div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="w-24 h-1 rounded-full bg-gradient-to-r from-accent to-violet mx-auto"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="font-heading font-bold text-2xl sm:text-3xl text-text-primary mb-3">
            Page Not Found
          </h1>
          <p className="text-text-muted mb-8 leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
            Let&apos;s get you back on track.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10"
        >
          <Button href="/" size="lg" fullWidth className="sm:!w-auto">
            <Home size={16} />
            Go Home
          </Button>
          <Button href="/contact" variant="outline" size="lg" fullWidth className="sm:!w-auto">
            Contact Us
          </Button>
        </motion.div>

        {/* Popular links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="pt-8 border-t border-border"
        >
          <p className="text-xs text-text-muted mb-4 flex items-center justify-center gap-1.5">
            <Search size={12} />
            Or try one of these popular pages:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {popularLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm text-text-muted hover:text-accent hover:bg-accent/5 transition-all"
              >
                {link.label}
                <ArrowRight size={10} />
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
