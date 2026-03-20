import type { Metadata } from "next";
import { faqItems } from "@/data/faqData";
import { FaqPageClient } from "./FaqPageClient";
import { getFaqPage } from "@/lib/sanity.queries";
import { urlFor } from "@/lib/sanity";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getFaqPage();
  return {
    title: page?.seo?.title ?? "Ofte Stillede Spørgsmål om Strikkeopskrifter",
    description: page?.seo?.description ?? "Svar på de mest stillede spørgsmål om Stitch of Care strikkeopskrifter.",
    alternates: { canonical: "https://stitch-of-care.vercel.app/faq" },
    openGraph: {
      title: page?.seo?.title ?? "FAQ — Stitch of Care",
      url: "https://stitch-of-care.vercel.app/faq",
      images: page?.seo?.ogImage ? [{ url: urlFor(page.seo.ogImage).width(1200).height(630).url() }] : [],
    },
  };
}

export default async function FaqPage() {
  const pageData = await getFaqPage();
  const items = pageData?.items?.length ? pageData.items : faqItems;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item: { question: { da: string }; answer: { da: string } }) => ({
      "@type": "Question",
      name: item.question.da,
      acceptedAnswer: { "@type": "Answer", text: item.answer.da },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <FaqPageClient sanityData={pageData} />
    </>
  );
}

export const dynamic = "force-dynamic";
