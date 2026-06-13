import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Mail, ArrowRight } from "lucide-react";
import { team } from "@/data/team";
import ProfileHeader from "@/components/team/ProfileHeader";
import SkillBadge from "@/components/team/SkillBadge";
import PortfolioGrid from "@/components/team/PortfolioGrid";
import CertificateCard from "@/components/team/CertificateCard";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return team.map((member) => ({ slug: member.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const member = team.find((m) => m.slug === slug);
  if (!member) return { title: "Not Found" };
  return {
    title: `${member.name} — ${member.role}`,
    description: member.bio,
  };
}

export default async function ProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const member = team.find((m) => m.slug === slug);

  if (!member) {
    notFound();
  }

  const otherMembers = team.filter((m) => m.slug !== member.slug);

  return (
    <article>
      {/* Breadcrumb */}
      <nav className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-sm text-text-muted">
          <li>
            <Link href="/team" className="hover:text-accent transition-colors">
              Team
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-text-primary font-medium truncate">{member.name}</li>
        </ol>
      </nav>

      {/* Profile Header */}
      <ProfileHeader member={member} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 space-y-16 sm:space-y-20">
        {/* About */}
        <section aria-label="About">
          <h2 className="font-heading font-bold text-2xl text-text-primary mb-4">
            About Me
          </h2>
          <p className="text-text-muted leading-relaxed max-w-[80ch]">{member.bio}</p>
        </section>

        {/* Tech Stack */}
        <section aria-label="Skills">
          <h2 className="font-heading font-bold text-2xl text-text-primary mb-6">
            Tech Stack & Skills
          </h2>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {member.techStack.map((skill, i) => (
              <SkillBadge key={skill} skill={skill} index={i} />
            ))}
          </div>
        </section>

        {/* Portfolio */}
        <section aria-label="Portfolio">
          <SectionTitle
            title="Portfolio"
            subtitle="Selected projects showcasing my work."
            align="left"
          />
          <PortfolioGrid projects={member.portfolio} />
        </section>

        {/* Certificates */}
        {member.certificates.length > 0 && (
          <section aria-label="Certificates">
            <h2 className="font-heading font-bold text-2xl text-text-primary mb-6">
              Certificates & Credentials
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {member.certificates.map((cert, i) => (
                <CertificateCard
                  key={cert.title}
                  certificate={cert}
                  index={i}
                />
              ))}
            </div>
          </section>
        )}

        {/* Services */}
        <section aria-label="Services">
          <h2 className="font-heading font-bold text-2xl text-text-primary mb-6">
            Services I Offer
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {member.services.map((service) => (
              <div
                key={service}
                className="flex items-center gap-3 p-4 rounded-xl border border-border bg-surface/50 hover:border-accent/30 transition-colors"
              >
                <div className="w-2 h-2 rounded-full bg-accent shrink-0" aria-hidden="true" />
                <span className="text-sm text-text-primary">{service}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-12 rounded-2xl border border-border bg-surface/30 relative overflow-hidden">
          <div className="glow-mint -top-20 left-1/3 opacity-15" />
          <div className="relative z-10">
            <h2 className="font-heading font-bold text-2xl text-text-primary mb-3">
              Want to work with {member.name.split(" ")[0]}?
            </h2>
            <p className="text-text-muted mb-6 px-4">
              Let&apos;s discuss your project and make it happen.
            </p>
            <Button href="/contact" size="lg">
              <Mail size={16} />
              Work With Me
            </Button>
          </div>
        </section>

        {/* Other Team Members */}
        <section aria-label="Other team members">
          <h2 className="font-heading font-bold text-2xl text-text-primary mb-6">
            Meet the Rest of the Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {otherMembers.map((other) => (
              <Link
                key={other.slug}
                href={`/team/${other.slug}`}
                className="card-glow flex items-center gap-4 p-5 rounded-xl border border-border bg-surface/50 group hover:border-accent/20"
              >
                <div className="relative w-14 h-14 rounded-xl overflow-hidden ring-2 ring-border group-hover:ring-accent/30 transition-all shrink-0">
                  <Image
                    src={other.avatar}
                    alt={other.name}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading font-semibold text-sm text-text-primary group-hover:text-accent transition-colors">
                    {other.name}
                  </h3>
                  <p className="text-xs text-sapphire">{other.role}</p>
                </div>
                <ArrowRight size={14} className="text-text-muted group-hover:text-accent transition-colors shrink-0" />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
