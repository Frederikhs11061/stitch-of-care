import type { Metadata } from "next";
import { faqItems } from "@/data/faqData";
import { FaqPageClient } from "./FaqPageClient";

export const metadata: Metadata = {
  title: "Ofte Stillede Spørgsmål om Strikkeopskrifter",
  description:
    "Svar på de mest stillede spørgsmål om Stitch of Care strikkeopskrifter — levering, PDF-format, returnering og garnvalg.",
  alternates: {
    canonical: "https://stitch-of-care.vercel.app/faq",
  },
  openGraph: {
    title: "FAQ — Stitch of Care Strikkeopskrifter",
    description: "Svar på spørgsmål om levering, PDF-format og garnvalg.",
    url: "https://stitch-of-care.vercel.app/faq",
  },
};

export default function FaqPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question.da,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer.da,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FaqPageClient />
    </>
  );
}

export const dynamic = "force-static";
