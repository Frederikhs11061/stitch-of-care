import type { Metadata } from "next";
import { AboutPageClient } from "./AboutPageClient";
import { getAboutPage } from "@/lib/sanity.queries";
import { urlFor } from "@/lib/sanity";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getAboutPage();
  return {
    title: page?.seo?.title ?? "Om Stitch of Care — Historien bag strikkeopskrifterne",
    description: page?.seo?.description ?? "Mød designeren bag Stitch of Care. Nordiske strikkeopskrifter skabt med omhu.",
    alternates: { canonical: "https://stitch-of-care.vercel.app/about" },
    openGraph: {
      title: page?.seo?.title ?? "Om Stitch of Care",
      description: page?.seo?.description ?? "Historien bag de nordiske strikkeopskrifter.",
      url: "https://stitch-of-care.vercel.app/about",
      images: page?.seo?.ogImage ? [{ url: urlFor(page.seo.ogImage).width(1200).height(630).url() }] : [],
    },
  };
}

export default async function AboutPage() {
  const pageData = await getAboutPage();

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Stitch of Care",
    url: "https://stitch-of-care.vercel.app/about",
    sameAs: ["https://instagram.com/stitchofcare"],
    jobTitle: "Knitwear Designer",
    worksFor: { "@type": "Organization", name: "Stitch of Care" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <AboutPageClient sanityData={pageData} />
    </>
  );
}

export const dynamic = "force-dynamic";
