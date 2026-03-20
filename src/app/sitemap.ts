import type { MetadataRoute } from "next";
import { patterns } from "@/data/patterns";
import { blogPosts } from "@/data/blogPosts";

const BASE = "https://stitch-of-care.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE}/patterns`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE}/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  const patternPages: MetadataRoute.Sitemap = patterns.map((p) => ({
    url: `${BASE}/patterns/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.95,
  }));

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: new Date(p.publishedAt),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [...staticPages, ...patternPages, ...blogPages];
}
