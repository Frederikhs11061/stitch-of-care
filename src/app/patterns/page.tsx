import { Metadata } from "next";
import { patterns } from "@/data/patterns";
import { PatternsPageClient } from "./PatternsPageClient";

export const metadata: Metadata = {
  title: "Patterns",
  description: "All knitting patterns from Stitch of Care. Nordic, minimal, made with care.",
};

export default function PatternsPage() {
  return <PatternsPageClient patterns={patterns} />;
}

export const dynamic = 'force-dynamic';
