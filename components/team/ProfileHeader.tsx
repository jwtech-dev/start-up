"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Github, Linkedin, Twitter, Dribbble, Globe } from "lucide-react";
import type { TeamMember } from "@/data/team";

const socialIcons: Record<string, typeof Github> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  dribbble: Dribbble,
  behance: Globe,
};

interface ProfileHeaderProps {
  member: TeamMember;
}

export default function ProfileHeader({ member }: ProfileHeaderProps) {
  const nameWords = member.name.split(" ");

  return (
    <div className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 noise-overlay">
        <div className="glow-mint top-0 left-1/4" />
        <div className="glow-sapphire -top-20 right-1/4" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="flex flex-col sm:flex-row items-start gap-8">
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-3xl overflow-hidden ring-2 ring-border shrink-0"
          >
            <Image
              src={member.avatar}
              alt={member.name}
              fill
              className="object-cover"
              sizes="144px"
              priority
            />
          </motion.div>

          <div>
            {/* Name with split text animation */}
            <h1 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight">
              {nameWords.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.2 + i * 0.12,
                    duration: 0.5,
                    ease: [0.25, 0.4, 0.25, 1],
                  }}
                  className={`inline-block mr-3 ${
                    i === 1 ? "gradient-text" : "text-text-primary"
                  }`}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            {/* Role */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-sapphire font-medium mt-2"
            >
              {member.role}
            </motion.p>

            {/* Socials */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex gap-3 mt-5"
            >
              {Object.entries(member.socials).map(([platform, url]) => {
                const Icon = socialIcons[platform] || Globe;
                return (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg border border-border bg-surface/80 flex items-center justify-center text-text-muted hover:text-accent hover:border-accent/30 transition-all"
                    aria-label={platform}
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
