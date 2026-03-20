import type { Metadata } from "next";
import { blogPosts } from "@/data/blogPosts";
import { BlogListingClient } from "./BlogListingClient";

export const metadata: Metadata = {
  title: "Journal — Strikketips, guides og slow living",
  description:
    "Læs om strik, garnvalg og slow living på Stitch of Care Journal. Guides til begyndere og erfarne strikkere.",
  alternates: {
    canonical: "https://stitch-of-care.vercel.app/blog",
  },
  openGraph: {
    title: "Journal — Stitch of Care",
    description: "Strikketips, garnguides og slow living historier fra Stitch of Care.",
    url: "https://stitch-of-care.vercel.app/blog",
    type: "website",
  },
};

export default function BlogPage() {
  return <BlogListingClient posts={blogPosts} />;
}

export const dynamic = "force-static";
