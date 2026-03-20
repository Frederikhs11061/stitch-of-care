import { client } from "./sanity";

// ─── Patterns ────────────────────────────────────────────────────────────────

export async function getSanityPatterns() {
  return client.fetch(`
    *[_type == "pattern"] | order(_createdAt asc) {
      _id,
      name,
      "slug": slug.current,
      featured,
      "new": new,
      price,
      priceEur,
      difficulty,
      difficultyLabel,
      yarnWeight,
      pages,
      sizes,
      backText,
      description,
      longDescription,
      images,
      tags
    }
  `);
}

export async function getSanityPatternBySlug(slug: string) {
  return client.fetch(
    `*[_type == "pattern" && slug.current == $slug][0] {
      _id,
      name,
      "slug": slug.current,
      featured,
      "new": new,
      price,
      priceEur,
      difficulty,
      difficultyLabel,
      yarnWeight,
      pages,
      sizes,
      backText,
      description,
      longDescription,
      images,
      tags
    }`,
    { slug }
  );
}

// ─── Blog posts ───────────────────────────────────────────────────────────────

export async function getSanityPosts() {
  return client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      coverImage,
      excerpt,
      category,
      readingTime
    }
  `);
}

export async function getSanityPostBySlug(slug: string) {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      coverImage,
      excerpt,
      body,
      category,
      readingTime
    }`,
    { slug }
  );
}

// ─── Site settings ────────────────────────────────────────────────────────────

export async function getSiteSettings() {
  return client.fetch(`*[_type == "siteSettings"][0]`);
}
