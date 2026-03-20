import type { Metadata } from "next";
import { patterns } from "@/data/patterns";
import { PatternsPageClient } from "./PatternsPageClient";
import { getPatternsPage, getSanityPatterns } from "@/lib/sanity.queries";
import { urlFor } from "@/lib/sanity";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPatternsPage();
  return {
    title: page?.seo?.title ?? "Strikkeopskrifter — Alle PDF-opskrifter",
    description: page?.seo?.description ?? "Udforsk alle strikkeopskrifter fra Stitch of Care.",
    alternates: { canonical: "https://stitch-of-care.vercel.app/patterns" },
    openGraph: {
      title: page?.seo?.title ?? "Strikkeopskrifter — Stitch of Care",
      url: "https://stitch-of-care.vercel.app/patterns",
      type: "website",
      images: page?.seo?.ogImage ? [{ url: urlFor(page.seo.ogImage).width(1200).height(630).url() }] : [],
    },
  };
}

export default async function PatternsPage() {
  const [pageData, sanityPatterns] = await Promise.all([
    getPatternsPage(),
    getSanityPatterns(),
  ]);

  return (
    <PatternsPageClient
      patterns={patterns}
      sanityPatterns={sanityPatterns}
      sanityPageData={pageData}
    />
  );
}

export const dynamic = "force-dynamic";
