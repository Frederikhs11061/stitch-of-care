import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPostBySlug } from "@/data/blogPosts";
import { BlogPostClient } from "./BlogPostClient";
import { getSanityPostBySlug, getSanityPostSlugs } from "@/lib/sanity.queries";
import { urlFor } from "@/lib/sanity";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const [staticSlugs, sanitySlugs] = await Promise.all([
    Promise.resolve(blogPosts.map((p) => ({ slug: p.slug }))),
    getSanityPostSlugs().catch(() => []),
  ]);
  const all = new Map<string, { slug: string }>();
  [...staticSlugs, ...sanitySlugs].forEach((s) => all.set(s.slug, s));
  return Array.from(all.values());
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [staticPost, sanityPost] = await Promise.all([
    Promise.resolve(getBlogPostBySlug(slug)),
    getSanityPostBySlug(slug).catch(() => null),
  ]);
  const post = sanityPost ?? staticPost;
  if (!post) return {};

  const title = sanityPost?.seo?.titleDa ?? post.title?.da ?? post.title;
  const description = sanityPost?.seo?.descriptionDa ?? post.excerpt?.da;
  const url = `https://stitch-of-care.vercel.app/blog/${slug}`;
  const ogImageUrl = sanityPost?.seo?.ogImage
    ? urlFor(sanityPost.seo.ogImage).width(1200).height(630).url()
    : sanityPost?.coverImage?.asset?.url ?? staticPost?.coverImage;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title, description, url, type: "article",
      publishedTime: post.publishedAt,
      images: ogImageUrl ? [{ url: ogImageUrl, width: 1200, height: 630 }] : [],
    },
    twitter: { card: "summary_large_image", title, description, images: ogImageUrl ? [ogImageUrl] : [] },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const [staticPost, sanityPost] = await Promise.all([
    Promise.resolve(getBlogPostBySlug(slug)),
    getSanityPostBySlug(slug).catch(() => null),
  ]);

  if (!staticPost && !sanityPost) notFound();

  const post = staticPost ?? sanityPost;
  const title = post?.title?.da ?? "";
  const description = post?.excerpt?.da ?? "";
  const coverImage = sanityPost?.coverImage?.asset?.url ?? staticPost?.coverImage ?? "";

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    image: coverImage,
    datePublished: post?.publishedAt,
    dateModified: post?.publishedAt,
    author: { "@type": "Organization", name: "Stitch of Care", url: "https://stitch-of-care.vercel.app" },
    publisher: { "@type": "Organization", name: "Stitch of Care", url: "https://stitch-of-care.vercel.app" },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://stitch-of-care.vercel.app/blog/${slug}` },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <BlogPostClient post={post} sanityPost={sanityPost} />
    </>
  );
}

export const dynamic = "force-dynamic";
