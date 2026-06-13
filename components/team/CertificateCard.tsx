"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import type { Certificate } from "@/data/team";

interface CertificateCardProps {
  certificate: Certificate;
  index: number;
}

export default function CertificateCard({
  certificate,
  index,
}: CertificateCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="card-glow group flex items-start gap-4 p-5 rounded-xl border border-border bg-surface/50"
    >
      {/* Icon */}
      <div className="w-10 h-10 rounded-lg bg-sapphire/10 flex items-center justify-center shrink-0 group-hover:bg-sapphire/20 transition-colors">
        <Award size={18} className="text-sapphire" />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h4 className="font-heading font-semibold text-sm text-text-primary leading-snug mb-1">
          {certificate.title}
        </h4>
        <p className="text-xs text-text-muted">
          {certificate.issuer} · {certificate.date}
        </p>
      </div>

      {/* Credential link */}
      {certificate.credentialUrl && (
        <a
          href={certificate.credentialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 w-8 h-8 rounded-lg border border-border flex items-center justify-center text-text-muted hover:text-accent hover:border-accent/30 transition-all opacity-0 group-hover:opacity-100"
          aria-label={`View credential for ${certificate.title}`}
        >
          <ExternalLink size={14} />
        </a>
      )}
    </motion.div>
  );
}
