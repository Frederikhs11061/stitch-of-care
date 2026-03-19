export interface InstagramPost {
  id: string;
  image: string;
  alt: string;
  likes: number;
  url: string;
}

export const instagramPosts: InstagramPost[] = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=600&q=80",
    alt: "Strikning i naturlige farver",
    likes: 342,
    url: "https://instagram.com/stitchofcare",
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1609743522653-52354461eb27?w=600&q=80",
    alt: "Tæt på garn og nåle",
    likes: 218,
    url: "https://instagram.com/stitchofcare",
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80",
    alt: "Oversized sweater lifestyle",
    likes: 491,
    url: "https://instagram.com/stitchofcare",
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    alt: "Strikket detalje",
    likes: 287,
    url: "https://instagram.com/stitchofcare",
  },
  {
    id: "5",
    image: "https://images.unsplash.com/photo-1544717684-1243da23b545?w=600&q=80",
    alt: "Garn i kurv",
    likes: 376,
    url: "https://instagram.com/stitchofcare",
  },
  {
    id: "6",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
    alt: "Hyggeligt strikehjørne",
    likes: 203,
    url: "https://instagram.com/stitchofcare",
  },
];
