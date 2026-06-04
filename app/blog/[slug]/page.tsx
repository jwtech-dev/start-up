import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User, ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/blog";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import BlogContent from "@/components/blog/BlogContent";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Find related posts (same tag, different post)
  const relatedPosts = blogPosts
    .filter(
      (p) =>
        p.slug !== post.slug &&
        p.tags.some((tag) => post.tags.includes(tag))
    )
    .slice(0, 2);

  return (
    <article className="py-12 sm:py-20 lg:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-text-muted">
            <li>
              <Link href="/blog" className="hover:text-accent transition-colors inline-flex items-center gap-1">
                <ArrowLeft size={14} />
                Blog
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-text-primary font-medium truncate max-w-[200px] sm:max-w-none">
              {post.title}
            </li>
          </ol>
        </nav>

        {/* Header */}
        <header className="mb-12">
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="accent">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Title */}
          <h1 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-text-primary leading-tight mb-6">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted pb-6 border-b border-border">
            <span className="flex items-center gap-2">
              <User size={14} />
              {post.author}
            </span>
            <span className="flex items-center gap-2">
              <Calendar size={14} />
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-2">
              <Clock size={14} />
              {post.readTime}
            </span>
          </div>
        </header>

        {/* Content */}
        <BlogContent content={post.content} />

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-16 sm:mt-20 pt-10 sm:pt-12 border-t border-border">
            <h2 className="font-heading font-bold text-xl text-text-primary mb-6">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="p-5 rounded-xl border border-border bg-surface/50 hover:border-accent/30 transition-colors group"
                >
                  <div className="flex flex-wrap gap-1 mb-3">
                    {related.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="accent" size="sm">{tag}</Badge>
                    ))}
                  </div>
                  <h3 className="font-heading font-semibold text-sm text-text-primary group-hover:text-accent transition-colors mb-2 leading-snug">
                    {related.title}
                  </h3>
                  <p className="text-xs text-text-muted line-clamp-2 mb-3">
                    {related.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs text-accent font-medium group-hover:gap-2 transition-all">
                    Read More
                    <ArrowRight size={12} />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="mt-12 sm:mt-16 text-center py-10 sm:py-12 rounded-2xl border border-border bg-surface/30 relative overflow-hidden">
          <div className="glow-mint -top-20 left-1/3 opacity-15" />
          <div className="relative z-10">
            <h2 className="font-heading font-bold text-xl text-text-primary mb-3">
              Want us to build something for you?
            </h2>
            <p className="text-text-muted text-sm mb-6 px-4">
              Our team ships production-grade web apps, APIs, and designs.
            </p>
            <Button href="/contact" size="lg">
              Get in Touch
            </Button>
          </div>
        </section>
      </div>
    </article>
  );
}
