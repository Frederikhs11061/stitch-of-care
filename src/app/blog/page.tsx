import { Metadata } from "next";
import { blogPosts } from "@/data/blogPosts";
import { BlogListingClient } from "./BlogListingClient";

export const metadata: Metadata = {
  title: "Journal",
  description: "Knitting notes, guides and slow-living stories from Stitch of Care.",
};

export default function BlogPage() {
  return <BlogListingClient posts={blogPosts} />;
}

export const dynamic = 'force-dynamic';
