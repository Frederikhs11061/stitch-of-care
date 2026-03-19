import { Metadata } from "next";
import { AboutPageClient } from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About",
  description: "The story behind Stitch of Care — a Nordic knitting pattern studio.",
};

export default function AboutPage() {
  return <AboutPageClient />;
}

export const dynamic = 'force-dynamic';
