import type { Metadata } from "next";
import { patterns } from "@/data/patterns";
import { PatternsPageClient } from "./PatternsPageClient";

export const metadata: Metadata = {
  title: "Strikkeopskrifter — Alle PDF-opskrifter",
  description:
    "Udforsk alle strikkeopskrifter fra Stitch of Care. Nordisk design, PDF-download og 7 størrelser. Slow strik til alle niveauer.",
  alternates: {
    canonical: "https://stitch-of-care.vercel.app/patterns",
  },
  openGraph: {
    title: "Strikkeopskrifter — Stitch of Care",
    description: "Alle strikkeopskrifter fra Stitch of Care. Nordisk design, PDF-download.",
    url: "https://stitch-of-care.vercel.app/patterns",
    type: "website",
  },
};

export default function PatternsPage() {
  return <PatternsPageClient patterns={patterns} />;
}

export const dynamic = "force-static";
