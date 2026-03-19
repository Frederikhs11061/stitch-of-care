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
    <section className="py-24 lg:py-32 bg-soft-white relative overflow-hidden">
      <div className="absolute top-0 left-10 right-10 lg:left-20 lg:right-20 h-px bg-sand/50" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <AnimatedSection>
              <div className="flex items-center gap-3 mb-4">
                <span className="block w-8 h-px bg-warm-gray" />
                <span className="font-sans text-xs tracking-widest uppercase text-warm-gray">
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
              className="group flex items-center gap-2 font-sans text-xs tracking-widest uppercase text-warm-gray hover:text-dark-brown transition-colors"
            >
              <Instagram size={14} strokeWidth={1.5} />
              <span>{t.instagram.handle}</span>
              <ExternalLink
                size={10}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </a>
          </AnimatedSection>
        </div>

        {/* Grid */}
        <StaggerContainer
          staggerDelay={0.06}
          containerDelay={0.1}
          className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
        >
          {instagramPosts.map((post, i) => (
            <StaggerItem key={post.id} direction="scale">
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square bg-cream overflow-hidden"
                aria-label={post.alt}
              >
                <Image
                  src={post.image}
                  alt={post.alt}
                  fill
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                {/* Hover overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-0 bg-dark-brown/50 flex flex-col items-center justify-center gap-2"
                >
                  <Heart
                    size={20}
                    strokeWidth={1.5}
                    className="text-soft-white"
                  />
                  <span className="font-sans text-xs text-soft-white">
                    {post.likes}
                  </span>
                </motion.div>
              </a>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* CTA */}
        <AnimatedSection delay={0.2} className="mt-10 text-center">
          <a
            href="https://instagram.com/stitchofcare"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 font-sans text-xs tracking-widest uppercase text-warm-gray border-b border-warm-gray/30 pb-0.5 hover:text-dark-brown hover:border-dark-brown transition-all duration-200"
          >
            <Instagram size={12} strokeWidth={1.5} />
            {t.instagram.cta}
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}
