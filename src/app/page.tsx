import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedProduct } from "@/components/home/FeaturedProduct";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { InstagramGrid } from "@/components/home/InstagramGrid";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { getFeaturedPattern } from "@/data/patterns";
import { getHomePage, getSanityFeaturedPattern } from "@/lib/sanity.queries";
import { urlFor } from "@/lib/sanity";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getHomePage();
  return {
    title: page?.seo?.title ?? "Stitch of Care — Nordiske Strikkeopskrifter med Omtanke",
    description: page?.seo?.description ?? "Håndlavede strikkeopskrifter med nordisk sjæl. Slow strik, PDF-download og 7 størrelser.",
    alternates: { canonical: "https://stitch-of-care.vercel.app" },
    openGraph: {
      title: page?.seo?.title ?? "Stitch of Care — Nordiske Strikkeopskrifter",
      description: page?.seo?.description ?? "Håndlavede strikkeopskrifter med nordisk sjæl.",
      url: "https://stitch-of-care.vercel.app",
      type: "website",
      images: page?.seo?.ogImage ? [{ url: urlFor(page.seo.ogImage).width(1200).height(630).url() }] : [],
    },
  };
}

export default async function HomePage() {
  const [pageData, sanityFeatured] = await Promise.all([
    getHomePage(),
    getSanityFeaturedPattern(),
  ]);

  const staticFeatured = getFeaturedPattern();

  return (
    <>
      <h1 className="sr-only">Stitch of Care — Nordiske Strikkeopskrifter med Omtanke</h1>
      <HeroSection sanityData={pageData?.hero} />
      {(sanityFeatured || staticFeatured) && (
        <FeaturedProduct
          pattern={staticFeatured!}
          sanityPattern={sanityFeatured}
        />
      )}
      <AboutTeaser sanityData={pageData?.aboutTeaser} />
      <NewsletterSection sanityData={pageData?.newsletter} />
      <InstagramGrid />
    </>
  );
}

export const dynamic = "force-dynamic";
