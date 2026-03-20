import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPostBySlug } from "@/data/blogPosts";
import { BlogPostClient } from "./BlogPostClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  const url = `https://stitch-of-care.vercel.app/blog/${slug}`;
  return {
    title: post.title.da,
    description: post.excerpt.da,
    alternates: { canonical: url },
    openGraph: {
      title: post.title.da,
      description: post.excerpt.da,
      url,
      type: "article",
      publishedTime: post.publishedAt,
      images: post.coverImage
        ? [{ url: post.coverImage, width: 1200, height: 630, alt: post.title.da }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title.da,
      description: post.excerpt.da,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title.da,
    description: post.excerpt.da,
    image: post.coverImage,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Organization",
      name: "Stitch of Care",
      url: "https://stitch-of-care.vercel.app",
    },
    publisher: {
      "@type": "Organization",
      name: "Stitch of Care",
      url: "https://stitch-of-care.vercel.app",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://stitch-of-care.vercel.app/blog/${slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <BlogPostClient post={post} />
    </>
  );
}

export const dynamic = "force-static";
