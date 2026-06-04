"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import SectionTitle from "@/components/ui/SectionTitle";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { team } from "@/data/team";
import { ArrowRight } from "lucide-react";

export default function TeamPreview() {
  return (
    <section className="py-20 sm:py-28 lg:py-32" id="team" aria-label="Meet the team">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Our Team"
          title="Meet the Team"
          subtitle="Three specialists. One studio. Infinite possibilities."
        />

        {/* Mobile: horizontal scroll, Desktop: grid */}
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0 md:overflow-visible md:grid md:grid-cols-3 md:gap-8 md:pb-0">
          {team.map((member, i) => (
            <motion.div
              key={member.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="min-w-[280px] snap-center md:min-w-0"
            >
              <Link
                href={`/team/${member.slug}`}
                className="card-glow block p-6 rounded-2xl border border-border bg-surface/50 group hover:border-accent/20 h-full"
              >
                {/* Avatar */}
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden mb-5 ring-2 ring-border group-hover:ring-accent/30 transition-all duration-300">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>

                {/* Info */}
                <h3 className="font-heading font-semibold text-lg text-text-primary group-hover:text-accent transition-colors">
                  {member.name}
                </h3>
                <p className="text-sm text-violet font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-sm text-text-muted leading-relaxed mb-4 line-clamp-2">
                  {member.bio}
                </p>

                {/* Tech badges */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {member.techStack.slice(0, 4).map((tech) => (
                    <Badge key={tech} size="sm">{tech}</Badge>
                  ))}
                  {member.techStack.length > 4 && (
                    <Badge size="sm">+{member.techStack.length - 4}</Badge>
                  )}
                </div>

                {/* Link */}
                <span className="inline-flex items-center gap-1 text-sm text-accent font-medium group-hover:gap-2 transition-all">
                  View Profile
                  <ArrowRight size={14} />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center md:hidden">
          <Button href="/team" variant="outline" size="sm">
            View All Team Members
            <ArrowRight size={14} />
          </Button>
        </div>
      </div>
    </section>
  );
}
