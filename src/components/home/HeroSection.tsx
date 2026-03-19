"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/Button";

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-soft-white">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream via-soft-white to-soft-white pointer-events-none" />

      {/* Large decorative number / year — Nordic editorial touch */}
      <div className="absolute top-1/2 right-[-2vw] -translate-y-1/2 pointer-events-none select-none hidden lg:block">
        <motion.span
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 0.04, x: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="font-serif font-bold text-[20vw] leading-none text-dark-brown writing-mode-vertical"
          style={{ writingMode: "vertical-rl" }}
        >
          2025
        </motion.span>
      </div>

      {/* Horizontal rule top */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        style={{ transformOrigin: "left" }}
        className="absolute top-24 left-0 right-0 h-px bg-sand/50 mx-10 lg:mx-20"
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-32 pb-24">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          {/* Eyebrow */}
          <motion.div variants={item} className="flex items-center gap-3 mb-8">
            <span className="block w-8 h-px bg-warm-gray" />
            <span className="font-sans text-xs tracking-widest uppercase text-warm-gray">
              {t.hero.eyebrow}
            </span>
          </motion.div>

          {/* Main heading — large, editorial */}
          <div className="overflow-hidden mb-2">
            <motion.h1
              variants={item}
              className="font-serif text-[13vw] md:text-[10vw] lg:text-[8.5vw] xl:text-[7.5vw] font-light leading-[0.9] text-dark-brown"
            >
              {t.hero.heading1}
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-10 ml-[6vw] md:ml-[8vw]">
            <motion.h1
              variants={item}
              className="font-serif text-[13vw] md:text-[10vw] lg:text-[8.5vw] xl:text-[7.5vw] font-light leading-[0.9] text-dark-brown italic"
            >
              {t.hero.heading2}
            </motion.h1>
          </div>

          {/* Tagline + CTA row */}
          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-8"
          >
            <p className="font-sans text-sm text-warm-gray max-w-xs leading-relaxed">
              {t.hero.tagline}
            </p>
            <div className="flex items-center gap-4">
              <Button href="/patterns" variant="primary" size="lg">
                {t.hero.cta}
              </Button>
              <Button href="/about" variant="ghost" size="lg">
                {t.hero.ctaSecondary}
              </Button>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-sans text-2xs tracking-widest uppercase text-warm-gray/60">
            {t.hero.scrollHint}
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown size={14} strokeWidth={1.5} className="text-warm-gray/60" />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom rule */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        style={{ transformOrigin: "right" }}
        className="absolute bottom-0 left-0 right-0 h-px bg-sand/50 mx-10 lg:mx-20"
      />
    </section>
  );
}
