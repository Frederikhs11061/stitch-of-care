import { Metadata } from "next";
import { FaqPageClient } from "./FaqPageClient";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about Stitch of Care patterns and downloads.",
};

export default function FaqPage() {
  return <FaqPageClient />;
}

export const dynamic = 'force-dynamic';
