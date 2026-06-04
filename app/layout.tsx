import type { Metadata, Viewport } from "next";
import { Syne, DM_Sans } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import AnimatedCursor from "@/components/ui/AnimatedCursor";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: {
    default: "J-Warriors — Digital Studio",
    template: "%s | J-Warriors",
  },
  description:
    "A three-person development studio building premium digital experiences. Web apps, UI/UX design, and backend solutions — on commission.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
      <body className="antialiased min-h-screen flex flex-col">
        {/* Skip to content — a11y */}
        <a href="#main-content" className="skip-link visually-hidden">
          Skip to main content
        </a>
        <AnimatedCursor />
        <Navbar />
        <main id="main-content" tabIndex={-1} className="flex-1 pt-16 mobile-nav-spacer outline-none">
          {children}
        </main>
        <Footer />
        <MobileBottomNav />
      </body>
    </html>
  );
}
