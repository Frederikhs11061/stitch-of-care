import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { MarqueeSection } from "@/components/home/MarqueeSection";
import { FeaturedProduct } from "@/components/home/FeaturedProduct";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { InstagramGrid } from "@/components/home/InstagramGrid";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { getFeaturedPattern } from "@/data/patterns";

export const metadata: Metadata = {
  title: "Stitch of Care — Nordiske Strikkeopskrifter med Omtanke",
  description:
    "Køb håndlavede strikkeopskrifter med nordisk sjæl. The Broke Sweater — PDF-download, 7 størrelser, øjeblikkelig levering. Slow strik, lavet med omtanke.",
  alternates: {
    canonical: "https://stitch-of-care.vercel.app",
  },
  openGraph: {
    title: "Stitch of Care — Nordiske Strikkeopskrifter",
    description:
      "Køb håndlavede strikkeopskrifter med nordisk sjæl. PDF-download, 7 størrelser, øjeblikkelig levering.",
    url: "https://stitch-of-care.vercel.app",
    type: "website",
  },
};

export default function HomePage() {
  const featured = getFeaturedPattern();

  return (
    <>
      {/* Visually hidden H1 — primary keyword for SEO without affecting design */}
      <h1 className="sr-only">
        Stitch of Care — Nordiske Strikkeopskrifter med Omtanke
      </h1>
      <HeroSection />
      <MarqueeSection />
      {featured && <FeaturedProduct pattern={featured} />}
      <AboutTeaser />
      <NewsletterSection />
      <InstagramGrid />
    </>
  );
}

export const dynamic = "force-static";
