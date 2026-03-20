import type { Metadata } from "next";
import { blogPosts } from "@/data/blogPosts";
import { BlogListingClient } from "./BlogListingClient";
import { getBlogPage, getSanityPosts } from "@/lib/sanity.queries";
import { urlFor } from "@/lib/sanity";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getBlogPage();
  return {
    title: page?.seo?.title ?? "Journal — Strikketips, guides og slow living",
    description: page?.seo?.description ?? "Læs om strik, garnvalg og slow living på Stitch of Care Journal.",
    alternates: { canonical: "https://stitch-of-care.vercel.app/blog" },
    openGraph: {
      title: page?.seo?.title ?? "Journal — Stitch of Care",
      url: "https://stitch-of-care.vercel.app/blog",
      type: "website",
      images: page?.seo?.ogImage ? [{ url: urlFor(page.seo.ogImage).width(1200).height(630).url() }] : [],
    },
  };
}

export default async function BlogPage() {
  const [pageData, sanityPosts] = await Promise.all([getBlogPage(), getSanityPosts()]);
  return (
    <BlogListingClient
      posts={blogPosts}
      sanityPosts={sanityPosts}
      sanityPageData={pageData}
    />
  );
}

export const dynamic = "force-dynamic";
