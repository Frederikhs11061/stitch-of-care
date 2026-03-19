import { Pattern } from "@/types/pattern";

export const patterns: Pattern[] = [
  {
    id: "broke-sweater",
    slug: "broke-sweater",
    name: "The Broke Sweater",
    backText: "Need Money For Yarn",
    description: {
      da: "En oversized, blød trøje med en besked på ryggen. Fordi du altid mangler penge til garn.",
      en: "An oversized, cosy sweater with a message on the back. Because you always need money for yarn.",
    },
    longDescription: {
      da: `The Broke Sweater er skabt til den strikker, der kender kampen alt for godt. Du har garnet, du har nålene – og nu har du også opskriften. Med enkle konstruktionslinjer, en løs og varm pasform og de ikoniske bogstaver "Need Money For Yarn" på ryggen er denne sweater din næste favorit.

Opskriften er skrevet tydeligt og inkluderer diagrammer, størrelsesguide og garnforslag. Perfekt til weekendstrik.`,
      en: `The Broke Sweater is made for the knitter who knows the struggle all too well. You have the yarn, you have the needles – and now you have the pattern. With clean construction lines, a relaxed and cosy fit, and the iconic words "Need Money For Yarn" on the back, this sweater will become your next favourite.

The pattern is clearly written and includes charts, sizing guide, and yarn recommendations. Perfect for weekend knitting.`,
    },
    price: 45,
    priceEur: 6,
    difficulty: "Intermediate",
    difficultyLabel: { da: "Øvet begynder", en: "Intermediate" },
    yarnWeight: "Bulky",
    pages: 14,
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    images: {
      front: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800&q=80",
      back: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
      detail: "https://images.unsplash.com/photo-1609743522653-52354461eb27?w=800&q=80",
      lifestyle: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
    },
    tags: ["sweater", "oversized", "bulky", "statement"],
    featured: true,
    new: true,
  },
];

export function getPatternBySlug(slug: string): Pattern | undefined {
  return patterns.find((p) => p.slug === slug);
}

export function getFeaturedPattern(): Pattern | undefined {
  return patterns.find((p) => p.featured);
}
