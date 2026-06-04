import type { Metadata } from "next";
import SectionTitle from "@/components/ui/SectionTitle";
import BlogCard from "@/components/blog/BlogCard";
import { blogPosts } from "@/data/blog";
import { BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Programming insights, tutorials, and best practices from the J-Warriors team. New posts daily.",
};

export default function BlogPage() {
  // Sort posts by date (newest first)
  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <section className="py-12 sm:py-20 lg:py-24" aria-label="Blog">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero with decorative background */}
        <div className="relative mb-4">
          <div className="glow-violet -top-40 -left-20 opacity-30" />
          <div className="glow-mint -top-20 right-0 opacity-20" />
          <div className="relative z-10">
            <SectionTitle
              badge="Our Blog"
              title="Blog"
              subtitle="Programming insights, tutorials, and best practices — fresh content generated daily."
            />
          </div>
        </div>

        <div className="space-y-5 sm:space-y-6">
          {sortedPosts.map((post, i) => (
            <BlogCard key={post.slug} post={post} index={i} />
          ))}
        </div>

        {sortedPosts.length === 0 && (
          <div className="text-center py-20 rounded-2xl border border-border bg-surface/30">
            <BookOpen size={40} className="text-text-muted mx-auto mb-4 opacity-50" />
            <h3 className="font-heading font-semibold text-lg text-text-primary mb-2">
              No Posts Yet
            </h3>
            <p className="text-text-muted text-sm">
              Check back soon — we publish fresh content regularly.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
