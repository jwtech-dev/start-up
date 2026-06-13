"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import { ArrowRight } from "lucide-react";
import type { TeamMember } from "@/data/team";

interface TeamCardProps {
  member: TeamMember;
  index: number;
}

export default function TeamCard({ member, index }: TeamCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
    >
      <Link
        href={`/team/${member.slug}`}
        className="card-glow block p-8 rounded-2xl border border-border bg-surface/50 group"
      >
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Avatar */}
          <div className="relative w-24 h-24 rounded-2xl overflow-hidden shrink-0 ring-2 ring-border group-hover:ring-accent/30 transition-all">
            <Image
              src={member.avatar}
              alt={member.name}
              fill
              className="object-cover"
              sizes="96px"
            />
          </div>

          <div className="flex-1">
            {/* Name & Role */}
            <h3 className="font-heading font-bold text-xl text-text-primary group-hover:text-accent transition-colors">
              {member.name}
            </h3>
            <p className="text-sm text-sapphire font-medium mb-3">
              {member.role}
            </p>

            {/* Bio */}
            <p className="text-sm text-text-muted leading-relaxed mb-4">
              {member.bio}
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {member.techStack.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>

            {/* CTA */}
            <span className="inline-flex items-center gap-1.5 text-sm text-accent font-medium group-hover:gap-2.5 transition-all">
              See Portfolio
              <ArrowRight size={14} />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
