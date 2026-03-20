"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { urlFor } from "@/lib/sanity";

function loc(obj: { da?: string; en?: string } | null | undefined, lang: string, fallback: string) {
  if (!obj) return fallback;
  return (lang === "da" ? obj.da : obj.en) ?? fallback;
}

interface AboutTeaserSanityData {
  eyebrow?: { da?: string; en?: string };
  heading?: { da?: string; en?: string };
  body?: { da?: string; en?: string };
  ctaLabel?: { da?: string; en?: string };
  image?: { asset?: { url?: string } };
  imageAlt?: { da?: string; en?: string };
  imageCaption?: { da?: string; en?: string };
}

export function AboutTeaser({ sanityData }: { sanityData?: AboutTeaserSanityData | null }) {
  const { t, language } = useLanguage();
  const s = sanityData;

  const eyebrow = loc(s?.eyebrow, language, t.aboutTeaser.eyebrow);
  const heading = loc(s?.heading, language, t.aboutTeaser.heading);
  const body = loc(s?.body, language, t.aboutTeaser.body);
  const ctaLabel = loc(s?.ctaLabel, language, t.aboutTeaser.cta);
  const imageCaption = loc(s?.imageCaption, language, t.aboutTeaser.imageCaption);
  const imageAlt = loc(s?.imageAlt, language, "The maker behind Stitch of Care");
  const imageSrc = s?.image?.asset
    ? urlFor(s.image).width(800).quality(90).url()
    : "https://images.unsplash.com/photo-1544717684-1243da23b545?w=800&q=90";

  return (
    <section className="py-24 lg:py-36 bg-soft-white relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sand/50 to-transparent" />
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-center">
          <div className="order-2 lg:order-1">
            <AnimatedSection direction="left" delay={0.05}>
              <div className="flex items-center gap-4 mb-10">
                <span className="block w-10 h-px bg-dim-gold/60" />
                <span className="font-sans text-[0.6rem] tracking-[0.3em] uppercase text-warm-gray">{eyebrow}</span>
              </div>
            </AnimatedSection>
            <AnimatedSection direction="left" delay={0.15}>
              <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl font-light text-dark-brown leading-[1.05] mb-8 whitespace-pre-line">{heading}</h2>
            </AnimatedSection>
            <AnimatedSection direction="left" delay={0.25}>
              <div className="w-12 h-px bg-gold/40 mb-8" />
              <p className="font-sans text-sm text-warm-gray leading-relaxed mb-12 max-w-sm">{body}</p>
            </AnimatedSection>
            <AnimatedSection direction="left" delay={0.32}>
              <Link href="/about" className="inline-flex items-center gap-3 font-sans text-[0.65rem] tracking-[0.22em] uppercase text-dark-brown border border-dark-brown/40 px-7 h-12 hover:bg-dark-brown hover:text-cream transition-all duration-300 group">
                {ctaLabel}
                <ArrowRight size={13} strokeWidth={1.5} className="group-hover:translate-x-0.5 transition-transform duration-200" />
              </Link>
            </AnimatedSection>
          </div>
          <AnimatedSection direction="right" delay={0.1} className="order-1 lg:order-2">
            <div className="relative">
              <div className="relative aspect-[3/4] bg-deep-brown overflow-hidden img-zoom">
                <Image src={imageSrc} alt={imageAlt} fill className="object-cover opacity-90" sizes="(max-width: 1024px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-obsidian/20" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-soft-white border border-sand/60 shadow-sm p-5 max-w-[200px]">
                <p className="font-sans text-[0.55rem] tracking-[0.25em] uppercase text-warm-gray mb-2">{imageCaption}</p>
                <div className="flex items-center gap-1.5 mt-2">
                  {["#C9A96E", "#9C7D4E", "#2A1810", "#E8D5A3", "#8C8278"].map((color, i) => (
                    <div key={i} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }} />
                  ))}
                </div>
              </div>
              <div className="absolute top-5 -right-3 bg-gold text-obsidian px-2.5 py-5">
                <span className="font-sans text-[0.5rem] tracking-[0.3em] uppercase font-medium" style={{ writingMode: "vertical-rl" }}>Est. 2025</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
