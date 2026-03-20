import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { patterns, getPatternBySlug } from "@/data/patterns";
import { PatternDetailClient } from "./PatternDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return patterns.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pattern = getPatternBySlug(slug);
  if (!pattern) return {};

  const title = `${pattern.name} — Strikkeopskrift PDF`;
  const description = `${pattern.description.da} ${pattern.pages} sider, ${pattern.sizes.length} størrelser. Øjeblikkelig PDF-download.`;
  const url = `https://stitch-of-care.vercel.app/patterns/${slug}`;

  return {
    title,
    description,
    keywords: [
      pattern.name,
      "strikkeopskrift",
      "sweater opskrift PDF",
      pattern.yarnWeight + " garn",
      "nordisk strik",
      "strik opskrift download",
    ],
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      images: [
        {
          url: pattern.images.front,
          width: 800,
          height: 1067,
          alt: pattern.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [pattern.images.front],
    },
  };
}

export default async function PatternDetailPage({ params }: Props) {
  const { slug } = await params;
  const pattern = getPatternBySlug(slug);
  if (!pattern) notFound();

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: pattern.name,
    description: pattern.description.da,
    image: [pattern.images.front, pattern.images.back, pattern.images.lifestyle].filter(Boolean),
    brand: {
      "@type": "Brand",
      name: "Stitch of Care",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "DKK",
      price: pattern.price,
      availability: "https://schema.org/InStock",
      url: `https://stitch-of-care.vercel.app/patterns/${slug}`,
      seller: {
        "@type": "Organization",
        name: "Stitch of Care",
      },
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Format",
        value: "Digital PDF",
      },
      {
        "@type": "PropertyValue",
        name: "Sider",
        value: String(pattern.pages),
      },
      {
        "@type": "PropertyValue",
        name: "Størrelser",
        value: pattern.sizes.join(", "),
      },
      {
        "@type": "PropertyValue",
        name: "Garnvægt",
        value: pattern.yarnWeight,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <PatternDetailClient pattern={pattern} />
    </>
  );
}

export const dynamic = "force-static";
