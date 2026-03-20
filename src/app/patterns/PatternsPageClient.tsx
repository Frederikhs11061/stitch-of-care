"use client";

import { useLanguage } from "@/context/LanguageContext";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { PatternCard } from "@/components/patterns/PatternCard";
import { Pattern } from "@/types/pattern";

interface Props {
  patterns: Pattern[];
}

export function PatternsPageClient({ patterns }: Props) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-soft-white">
      {/* Page header */}
      <div className="border-b border-sand/40 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-24 pb-16">
          <AnimatedSection direction="down">
            <div className="flex items-center gap-3 mb-6">
              <span className="block w-8 h-px bg-warm-gray" />
              <span className="font-sans text-xs tracking-widest uppercase text-warm-gray">
                {t.nav.patterns}
              </span>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h1 className="font-serif text-6xl lg:text-8xl font-light text-dark-brown">
              {t.nav.patterns}
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="font-sans text-sm text-warm-gray mt-4 max-w-md leading-relaxed">
              {t.hero.tagline}
            </p>
          </AnimatedSection>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
        {patterns.length === 0 ? (
          <div className="text-center py-32">
            <p className="font-serif text-2xl font-light text-warm-gray">
              More patterns coming soon…
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {patterns.map((pattern, i) => (
              <PatternCard key={pattern.id} pattern={pattern} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
