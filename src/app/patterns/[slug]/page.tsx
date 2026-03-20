import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { patterns, getPatternBySlug } from "@/data/patterns";
import { PatternDetailClient } from "./PatternDetailClient";
import { getSanityPatternBySlug, getSanityPatternSlugs } from "@/lib/sanity.queries";
import { urlFor } from "@/lib/sanity";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const [staticSlugs, sanitySlugs] = await Promise.all([
    Promise.resolve(patterns.map((p) => ({ slug: p.slug }))),
    getSanityPatternSlugs().catch(() => []),
  ]);
  const all = new Map<string, { slug: string }>();
  [...staticSlugs, ...sanitySlugs].forEach((s) => all.set(s.slug, s));
  return Array.from(all.values());
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [pattern, sanity] = await Promise.all([
    Promise.resolve(getPatternBySlug(slug)),
    getSanityPatternBySlug(slug).catch(() => null),
  ]);
  const p = sanity ?? pattern;
  if (!p) return {};

  const title = sanity?.seo?.title ?? `${p.name} — Strikkeopskrift PDF`;
  const description = sanity?.seo?.descriptionDa ?? `${p.description?.da ?? ""} ${p.pages} sider. Øjeblikkelig PDF-download.`;
  const url = `https://stitch-of-care.vercel.app/patterns/${slug}`;
  const ogImageUrl = sanity?.seo?.ogImage
    ? urlFor(sanity.seo.ogImage).width(1200).height(630).url()
    : sanity?.images?.front?.asset?.url ?? pattern?.images?.front;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website", images: ogImageUrl ? [{ url: ogImageUrl }] : [] },
    twitter: { card: "summary_large_image", title, description, images: ogImageUrl ? [ogImageUrl] : [] },
  };
}

export default async function PatternDetailPage({ params }: Props) {
  const { slug } = await params;
  const [pattern, sanityPattern] = await Promise.all([
    Promise.resolve(getPatternBySlug(slug)),
    getSanityPatternBySlug(slug).catch(() => null),
  ]);

  if (!pattern && !sanityPattern) notFound();

  const p = sanityPattern ?? pattern!;
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.description?.da ?? "",
    brand: { "@type": "Brand", name: "Stitch of Care" },
    offers: {
      "@type": "Offer",
      priceCurrency: "DKK",
      price: p.price,
      availability: "https://schema.org/InStock",
      url: `https://stitch-of-care.vercel.app/patterns/${slug}`,
      seller: { "@type": "Organization", name: "Stitch of Care" },
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <PatternDetailClient pattern={pattern ?? sanityPattern} sanityPattern={sanityPattern} />
    </>
  );
}

export const dynamic = "force-dynamic";
