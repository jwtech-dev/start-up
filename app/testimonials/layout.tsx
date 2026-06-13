import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Testimonial",
  robots: { index: false, follow: false },
};

export default function TestimonialsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
