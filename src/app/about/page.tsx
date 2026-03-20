import type { Metadata } from "next";
import { AboutPageClient } from "./AboutPageClient";

export const metadata: Metadata = {
  title: "Om Stitch of Care — Historien bag strikkeopskrifterne",
  description:
    "Mød designeren bag Stitch of Care. Nordiske strikkeopskrifter skabt med omhu, slow living og kærlighed til håndværket.",
  alternates: {
    canonical: "https://stitch-of-care.vercel.app/about",
  },
  openGraph: {
    title: "Om Stitch of Care",
    description: "Historien bag de nordiske strikkeopskrifter — skabt med omhu og kærlighed til håndværket.",
    url: "https://stitch-of-care.vercel.app/about",
  },
};

export default function AboutPage() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Stitch of Care",
    url: "https://stitch-of-care.vercel.app/about",
    sameAs: ["https://instagram.com/stitchofcare"],
    jobTitle: "Knitwear Designer",
    worksFor: {
      "@type": "Organization",
      name: "Stitch of Care",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <AboutPageClient />
    </>
  );
}

export const dynamic = "force-static";
