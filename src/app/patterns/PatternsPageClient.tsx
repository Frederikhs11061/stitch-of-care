"use client";

import { useLanguage } from "@/context/LanguageContext";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { PatternCard } from "@/components/patterns/PatternCard";
import { Pattern } from "@/types/pattern";

function loc(obj: { da?: string; en?: string } | null | undefined, lang: string, fallback: string) {
  if (!obj) return fallback;
  return (lang === "da" ? obj.da : obj.en) ?? fallback;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toPattern(sp: any): Pattern {
  return {
    id: sp._id,
    slug: sp.slug,
    name: sp.name ?? "",
    description: sp.description ?? { da: "", en: "" },
    longDescription: sp.longDescription ?? sp.description ?? { da: "", en: "" },
    price: sp.price ?? 0,
    priceEur: sp.priceEur ?? 0,
    difficulty: sp.difficulty ?? "Intermediate",
    difficultyLabel: sp.difficultyLabel ?? { da: "Middel", en: "Intermediate" },
    yarnWeight: sp.yarnWeight ?? "DK",
    pages: sp.pages ?? 0,
    sizes: sp.sizes ?? [],
    images: {
      front: sp.images?.front?.asset?.url ?? "",
      back: sp.images?.back?.asset?.url || undefined,
      detail: sp.images?.detail?.asset?.url || undefined,
      lifestyle: sp.images?.lifestyle?.asset?.url || undefined,
    },
    tags: sp.tags ?? [],
    featured: sp.featured ?? false,
    backText: sp.backText,
    new: sp.isNew,
  };
}

interface Props {
  patterns: Pattern[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sanityPatterns?: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sanityPageData?: any;
}

export function PatternsPageClient({ patterns, sanityPatterns, sanityPageData }: Props) {
  const { t, language } = useLanguage();
  const s = sanityPageData;

  const eyebrow = loc(s?.eyebrow, language, t.nav.patterns);
  const heading = loc(s?.heading, language, t.nav.patterns);
  const tagline = loc(s?.tagline, language, t.hero.tagline);

  const displayPatterns: Pattern[] =
    sanityPatterns?.length ? sanityPatterns.map(toPattern) : patterns;

  return (
    <div className="min-h-screen bg-soft-white">
      {/* Page header */}
      <div className="border-b border-sand/40 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-24 pb-16">
          <AnimatedSection direction="down">
            <div className="flex items-center gap-3 mb-6">
              <span className="block w-8 h-px bg-warm-gray" />
              <span className="font-sans text-xs tracking-widest uppercase text-warm-gray">
                {eyebrow}
              </span>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h1 className="font-serif text-6xl lg:text-8xl font-light text-dark-brown">
              {heading}
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="font-sans text-sm text-warm-gray mt-4 max-w-md leading-relaxed">
              {tagline}
            </p>
          </AnimatedSection>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
        {displayPatterns.length === 0 ? (
          <div className="text-center py-32">
            <p className="font-serif text-2xl font-light text-warm-gray">
              More patterns coming soon…
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {displayPatterns.map((pattern, i) => (
              <PatternCard key={pattern.id} pattern={pattern} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
