export interface Pattern {
  id: string;
  slug: string;
  name: string;
  description: { da: string; en: string };
  longDescription: { da: string; en: string };
  price: number;       // DKK
  priceEur: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  difficultyLabel: { da: string; en: string };
  yarnWeight: "Fingering" | "DK" | "Worsted" | "Bulky" | "Super Bulky";
  pages: number;
  sizes: string[];
  images: {
    front: string;
    back?: string;
    detail?: string;
    lifestyle?: string;
  };
  tags: string[];
  featured: boolean;
  backText?: string;
  new?: boolean;
}
