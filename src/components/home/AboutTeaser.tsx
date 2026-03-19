"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";

export function AboutTeaser() {
  const { t } = useLanguage();

  return (
    <section className="py-24 lg:py-32 bg-cream relative overflow-hidden">
      {/* Subtle top divider */}
      <div className="absolute top-0 left-10 right-10 lg:left-20 lg:right-20 h-px bg-sand/50" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text column — left */}
          <div className="order-2 lg:order-1">
            <AnimatedSection direction="left" delay={0.05}>
              <div className="flex items-center gap-3 mb-8">
                <span className="block w-8 h-px bg-warm-gray" />
                <span className="font-sans text-xs tracking-widest uppercase text-warm-gray">
                  {t.aboutTeaser.eyebrow}
                </span>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="left" delay={0.15}>
              <h2 className="font-serif text-4xl lg:text-5xl font-light text-dark-brown leading-snug mb-6 whitespace-pre-line">
                {t.aboutTeaser.heading}
              </h2>
            </AnimatedSection>

            <AnimatedSection direction="left" delay={0.25}>
              <p className="font-sans text-sm text-warm-gray leading-relaxed mb-10 max-w-sm">
                {t.aboutTeaser.body}
              </p>
            </AnimatedSection>

            <AnimatedSection direction="left" delay={0.3}>
              <Button
                href="/about"
                variant="outline"
                size="lg"
                icon={<ArrowRight size={14} strokeWidth={1.5} />}
              >
                {t.aboutTeaser.cta}
              </Button>
            </AnimatedSection>
          </div>

          {/* Image column — right */}
          <AnimatedSection direction="right" delay={0.1} className="order-1 lg:order-2">
            <div className="relative">
              {/* Main portrait image */}
              <div className="relative aspect-[3/4] bg-pale-sand overflow-hidden img-zoom">
                <Image
                  src="https://images.unsplash.com/photo-1544717684-1243da23b545?w=800&q=80"
                  alt="The maker behind Stitch of Care"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Floating detail card */}
              <div className="absolute -bottom-6 -left-6 bg-soft-white p-5 shadow-lg max-w-[200px]">
                <p className="font-sans text-2xs tracking-widest uppercase text-warm-gray mb-1">
                  {t.aboutTeaser.imageCaption}
                </p>
                {/* Yarn ball illustration */}
                <div className="flex items-center gap-1 mt-2">
                  {["#D4C4A8", "#8C8278", "#3D2B1F", "#EAE0CF", "#F5F0E8"].map(
                    (color, i) => (
                      <div
                        key={i}
                        className="w-5 h-5 rounded-full"
                        style={{ backgroundColor: color }}
                      />
                    )
                  )}
                </div>
              </div>

              {/* Year stamp */}
              <div className="absolute top-5 -right-3 bg-dark-brown text-soft-white px-3 py-5 writing-mode-vertical">
                <span
                  className="font-sans text-2xs tracking-widest uppercase"
                  style={{ writingMode: "vertical-rl" }}
                >
                  Est. 2025
                </span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
