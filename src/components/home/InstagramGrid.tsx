"use client";

import Image from "next/image";
import { Instagram, Heart, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { instagramPosts } from "@/data/instagramMock";

export function InstagramGrid() {
  const { t } = useLanguage();

  return (
    <section className="py-24 lg:py-32 bg-cream relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sand/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <AnimatedSection>
              <div className="flex items-center gap-4 mb-5">
                <span className="block w-10 h-px bg-dim-gold/60" />
                <span className="font-sans text-[0.6rem] tracking-[0.3em] uppercase text-warm-gray">
                  {t.instagram.eyebrow}
                </span>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <h2 className="font-serif text-4xl lg:text-5xl font-light text-dark-brown">
                {t.instagram.heading}
              </h2>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={0.15} direction="right">
            <a
              href="https://instagram.com/stitchofcare"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 font-sans text-[0.6rem] tracking-[0.25em] uppercase text-warm-gray hover:text-dark-brown transition-colors duration-300"
            >
              <Instagram size={13} strokeWidth={1.5} />
              <span>{t.instagram.handle}</span>
              <ExternalLink
                size={9}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </a>
          </AnimatedSection>
        </div>

        {/* Grid */}
        <StaggerContainer
          staggerDelay={0.06}
          containerDelay={0.1}
          className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3"
        >
          {instagramPosts.map((post) => (
            <StaggerItem key={post.id} direction="scale">
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square bg-pale-sand overflow-hidden"
                aria-label={post.alt}
              >
                <Image
                  src={post.image}
                  alt={post.alt}
                  fill
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                {/* Hover overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-0 bg-obsidian/60 flex flex-col items-center justify-center gap-2"
                >
                  <Heart size={18} strokeWidth={1.2} className="text-gold" />
                  <span className="font-sans text-[0.6rem] tracking-widest text-pale-gold">
                    {post.likes}
                  </span>
                </motion.div>
              </a>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* CTA */}
        <AnimatedSection delay={0.2} className="mt-12 text-center">
          <a
            href="https://instagram.com/stitchofcare"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 font-sans text-[0.6rem] tracking-[0.28em] uppercase text-warm-gray hover:text-dark-brown transition-all duration-300"
          >
            <Instagram size={11} strokeWidth={1.5} />
            {t.instagram.cta}
            <span className="block w-0 h-px bg-gold transition-all duration-400 group-hover:w-6" />
          </a>
        </AnimatedSection>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sand/50 to-transparent" />
    </section>
  );
}
