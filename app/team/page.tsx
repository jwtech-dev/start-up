import type { Metadata } from "next";
import SectionTitle from "@/components/ui/SectionTitle";
import TeamCard from "@/components/team/TeamCard";
import { team } from "@/data/team";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the three specialists behind JW-Tech — a frontend developer, backend engineer, and UI/UX designer.",
};

export default function TeamPage() {
  return (
    <section className="pt-6 sm:pt-10 lg:pt-12 pb-12 sm:pb-20 lg:pb-24" aria-label="Team overview">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero with decorative background */}
        <div className="relative mb-4">
          <div className="glow-mint -top-40 -left-20 opacity-30" />
          <div className="glow-sapphire -top-20 right-0 opacity-20" />
          <div className="relative z-10">
            <SectionTitle
              badge="Meet Us"
              title="Our Team"
              subtitle="Three specialists. One studio. Every skill you need to ship a world-class digital product."
            />
          </div>
        </div>

        <div className="space-y-5 sm:space-y-6">
          {team.map((member, i) => (
            <TeamCard key={member.slug} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
