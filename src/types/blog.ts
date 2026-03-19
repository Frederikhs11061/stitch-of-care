export interface BlogPost {
  id: string;
  slug: string;
  title: { da: string; en: string };
  excerpt: { da: string; en: string };
  content: { da: string; en: string };
  coverImage: string;
  publishedAt: string;
  readingTime: number; // minutes
  tags: string[];
  category: string;
}
