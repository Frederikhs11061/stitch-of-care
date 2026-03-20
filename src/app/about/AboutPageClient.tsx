"use client";

import Image from "next/image";
import { Instagram, Mail, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";

function loc(obj: { da?: string; en?: string } | null | undefined, lang: string, fallback: string) {
  if (!obj) return fallback;
  return (lang === "da" ? obj.da : obj.en) ?? fallback;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function AboutPageClient({ sanityData }: { sanityData?: any }) {
  const { t, language } = useLanguage();
  const s = sanityData;
  const eyebrow = loc(s?.eyebrow, language, t.about.eyebrow);
  const heading = s?.heading ?? t.about.heading;
  const intro = loc(s?.intro, language, t.about.intro);
  const portraitAlt = loc(s?.portraitAlt, language, "The maker");
  const portraitSrc = s?.portrait?.asset?.url ?? "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80";
  const storyHeading = loc(s?.storyHeading, language, t.about.storyHeading);
  const story = loc(s?.story, language, t.about.story);
  const valuesHeading = loc(s?.valuesHeading, language, t.about.valuesHeading);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const values = (s?.values?.length ? s.values : t.about.values).map((v: any) => ({
    title: typeof v.title === "string" ? v.title : loc(v.title, language, ""),
    body: typeof v.body === "string" ? v.body : loc(v.body, language, ""),
  }));
  const contactHeading = loc(s?.contactHeading, language, t.about.contactHeading);
  const contactBody = loc(s?.contactBody, language, t.about.contactBody);
  const contactCta = loc(s?.contactCta, language, t.about.contactCta);
  const followHeading = loc(s?.followHeading, language, t.about.followHeading);

  return (
    <div className="min-h-screen bg-soft-white">
      {/* Hero */}
      <div className="bg-cream border-b border-sand/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-24 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-end">
            <div>
              <AnimatedSection direction="down">
                <div className="flex items-center gap-3 mb-6">
                  <span className="block w-8 h-px bg-warm-gray" />
                  <span className="font-sans text-xs tracking-widest uppercase text-warm-gray">
                    {eyebrow}
                  </span>
                </div>
              </AnimatedSection>
              <AnimatedSection delay={0.1}>
                <h1 className="font-serif text-6xl lg:text-8xl font-light text-dark-brown leading-none mb-6">
                  {heading}
                </h1>
              </AnimatedSection>
              <AnimatedSection delay={0.2}>
                <p className="font-sans text-sm text-warm-gray leading-relaxed max-w-md">
                  {intro}
                </p>
              </AnimatedSection>
            </div>
            {/* Portrait */}
            <AnimatedSection direction="right" delay={0.15} className="relative">
              <div className="relative aspect-[4/3] lg:aspect-square bg-pale-sand overflow-hidden img-zoom max-w-sm ml-auto">
                <Image
                  src={portraitSrc}
                  alt={portraitAlt}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                />
              </div>
              {/* Accent border */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 border border-sand/60 pointer-events-none hidden lg:block" />
            </AnimatedSection>
          </div>
        </div>
      </div>

      {/* Story section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sticky label */}
          <div className="lg:col-span-3">
            <AnimatedSection>
              <p className="font-sans text-xs tracking-widest uppercase text-warm-gray lg:sticky lg:top-28">
                {storyHeading}
              </p>
            </AnimatedSection>
          </div>
          {/* Story text */}
          <div className="lg:col-span-7">
            <AnimatedSection delay={0.1}>
              {story.split("\n\n").map((para, i) => (
                <p key={i} className="font-serif text-xl lg:text-2xl font-light text-dark-brown leading-relaxed mb-8">
                  {para}
                </p>
              ))}
            </AnimatedSection>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-sand/40 mx-6 lg:mx-10" />

      {/* Values section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-32">
        <AnimatedSection className="mb-16">
          <div className="flex items-center gap-3">
            <span className="block w-8 h-px bg-warm-gray" />
            <span className="font-sans text-xs tracking-widest uppercase text-warm-gray">
              {valuesHeading}
            </span>
          </div>
        </AnimatedSection>

        <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {values.map((value, i) => (
            <StaggerItem key={i}>
              <div className="group">
                {/* Number */}
                <p className="font-serif text-6xl font-light text-sand group-hover:text-warm-gray transition-colors duration-300 mb-4 leading-none">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="font-serif text-2xl font-light text-dark-brown mb-3">
                  {value.title}
                </h3>
                <p className="font-sans text-sm text-warm-gray leading-relaxed">
                  {value.body}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* Contact section */}
      <div className="bg-cream border-t border-sand/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="left">
              <h2 className="font-serif text-4xl lg:text-5xl font-light text-dark-brown mb-4">
                {contactHeading}
              </h2>
              <p className="font-sans text-sm text-warm-gray leading-relaxed mb-8 max-w-sm">
                {contactBody}
              </p>
              <Button
                href="mailto:hej@stitchofcare.dk"
                variant="outline"
                size="lg"
                external
              >
                {contactCta}
              </Button>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.1}>
              <div>
                <p className="font-sans text-xs tracking-widest uppercase text-warm-gray mb-6">
                  {followHeading}
                </p>
                <div className="space-y-4">
                  <a
                    href="https://instagram.com/stitchofcare"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-10 h-10 flex items-center justify-center bg-dark-brown text-soft-white group-hover:bg-warm-gray transition-colors">
                      <Instagram size={16} strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="font-sans text-sm text-dark-brown group-hover:text-warm-gray transition-colors">
                        @stitchofcare
                      </p>
                      <p className="font-sans text-xs text-warm-gray">Instagram</p>
                    </div>
                    <ArrowUpRight size={12} className="text-warm-gray ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                  <a
                    href="mailto:hej@stitchofcare.dk"
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-10 h-10 flex items-center justify-center bg-dark-brown text-soft-white group-hover:bg-warm-gray transition-colors">
                      <Mail size={16} strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="font-sans text-sm text-dark-brown group-hover:text-warm-gray transition-colors">
                        hej@stitchofcare.dk
                      </p>
                      <p className="font-sans text-xs text-warm-gray">E-mail</p>
                    </div>
                    <ArrowUpRight size={12} className="text-warm-gray ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  );
}
