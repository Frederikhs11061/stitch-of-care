import { client } from "./sanity";

const imageFields = `{ asset->{_id, url}, hotspot, crop, alt }`;

// ─── Singletons ───────────────────────────────────────────────────────────────

export async function getGlobalSettings() {
  return client.fetch(`*[_type == "globalSettings"][0]`, {}, { next: { revalidate: 60 } });
}

export async function getHomePage() {
  return client.fetch(
    `*[_type == "homePage"][0] {
      seo,
      hero {
        eyebrow, heading1, heading2, tagline, ctaLabel,
        mainTile { image ${imageFields}, imageAlt, eyebrow, title },
        tile1    { image ${imageFields}, imageAlt, eyebrow, title },
        tile2    { image ${imageFields}, imageAlt, eyebrow, title },
        tile3    { image ${imageFields}, imageAlt, eyebrow, title },
      },
      aboutTeaser {
        eyebrow, heading, body, ctaLabel,
        image ${imageFields}, imageAlt, imageCaption,
      },
      newsletter { eyebrow, heading, body, placeholder, ctaLabel, successMessage, disclaimer },
    }`,
    {},
    { next: { revalidate: 60 } }
  );
}

export async function getAboutPage() {
  return client.fetch(
    `*[_type == "aboutPage"][0] {
      seo,
      eyebrow, heading, intro,
      portrait ${imageFields}, portraitAlt,
      storyHeading, story,
      valuesHeading,
      values[] { title, body },
      contactHeading, contactBody, contactCta, followHeading,
    }`,
    {},
    { next: { revalidate: 60 } }
  );
}

export async function getFaqPage() {
  return client.fetch(
    `*[_type == "faqPage"][0] {
      seo,
      eyebrow, heading, body,
      items[] { question, answer },
      stillQuestions, stillBody, contactCta,
    }`,
    {},
    { next: { revalidate: 60 } }
  );
}

export async function getPatternsPage() {
  return client.fetch(
    `*[_type == "patternsPage"][0] { seo, eyebrow, heading, tagline }`,
    {},
    { next: { revalidate: 60 } }
  );
}

export async function getBlogPage() {
  return client.fetch(
    `*[_type == "blogPage"][0] { seo, eyebrow, heading }`,
    {},
    { next: { revalidate: 60 } }
  );
}

// ─── Patterns ─────────────────────────────────────────────────────────────────

export async function getSanityPatterns() {
  return client.fetch(
    `*[_type == "pattern"] | order(_createdAt asc) {
      _id, name, "slug": slug.current,
      featured, isNew, price, priceEur,
      difficulty, difficultyLabel, yarnWeight, pages, sizes, backText,
      description, longDescription,
      images {
        front ${imageFields}, frontAlt,
        back ${imageFields}, backAlt,
        detail ${imageFields}, detailAlt,
        lifestyle ${imageFields}, lifestyleAlt,
      },
      tags, seo,
    }`,
    {},
    { next: { revalidate: 30 } }
  );
}

export async function getSanityPatternBySlug(slug: string) {
  return client.fetch(
    `*[_type == "pattern" && slug.current == $slug][0] {
      _id, name, "slug": slug.current,
      featured, isNew, price, priceEur,
      difficulty, difficultyLabel, yarnWeight, pages, sizes, backText,
      description, longDescription,
      images {
        front ${imageFields}, frontAlt,
        back ${imageFields}, backAlt,
        detail ${imageFields}, detailAlt,
        lifestyle ${imageFields}, lifestyleAlt,
      },
      tags, seo,
    }`,
    { slug },
    { next: { revalidate: 30 } }
  );
}

export async function getSanityFeaturedPattern() {
  return client.fetch(
    `*[_type == "pattern" && featured == true][0] {
      _id, name, "slug": slug.current,
      featured, isNew, price, priceEur,
      difficulty, difficultyLabel, yarnWeight, pages, sizes, backText,
      description,
      images {
        front ${imageFields}, frontAlt,
        back ${imageFields}, backAlt,
        detail ${imageFields}, detailAlt,
        lifestyle ${imageFields}, lifestyleAlt,
      },
      tags,
    }`,
    {},
    { next: { revalidate: 30 } }
  );
}

// ─── Blog posts ───────────────────────────────────────────────────────────────

export async function getSanityPosts() {
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc) {
      _id, title, "slug": slug.current,
      publishedAt, coverImage ${imageFields}, coverImageAlt,
      excerpt, category, readingTime, seo,
    }`,
    {},
    { next: { revalidate: 60 } }
  );
}

export async function getSanityPostBySlug(slug: string) {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id, title, "slug": slug.current,
      publishedAt, coverImage ${imageFields}, coverImageAlt,
      excerpt, body, category, readingTime, seo,
    }`,
    { slug },
    { next: { revalidate: 60 } }
  );
}

export async function getSanityPostSlugs() {
  return client.fetch(`*[_type == "post"]{ "slug": slug.current }`, {}, { next: { revalidate: 60 } });
}

export async function getSanityPatternSlugs() {
  return client.fetch(`*[_type == "pattern"]{ "slug": slug.current }`, {}, { next: { revalidate: 60 } });
}
