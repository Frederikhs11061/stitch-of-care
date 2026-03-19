import { HeroSection } from "@/components/home/HeroSection";
import { MarqueeSection } from "@/components/home/MarqueeSection";
import { FeaturedProduct } from "@/components/home/FeaturedProduct";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { InstagramGrid } from "@/components/home/InstagramGrid";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { getFeaturedPattern } from "@/data/patterns";

export default function HomePage() {
  const featured = getFeaturedPattern();

  return (
    <>
      <HeroSection />
      <MarqueeSection />
      {featured && <FeaturedProduct pattern={featured} />}
      <AboutTeaser />
      <InstagramGrid />
      <NewsletterSection />
    </>
  );
}

export const dynamic = 'force-dynamic';
