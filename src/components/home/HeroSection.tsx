"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

/* ── Easing ─────────────────────────────────────────── */
const EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ── Tile entrance variants ─────────────────────────── */
const tileIn = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.05, delay: i * 0.1, ease: EXPO },
  }),
};

/* ── Text overlay ───────────────────────────────────── */
function Overlay({
  eyebrow,
  title,
  cta,
  large = false,
}: {
  eyebrow: string;
  title: string;
  cta?: string;
  large?: boolean;
}) {
  return (
    <div className={`absolute bottom-0 left-0 right-0 ${large ? "p-6 lg:p-9" : "p-3.5 lg:p-5"}`}>
      <p
        className={`font-sans tracking-[0.28em] uppercase text-pale-gold/75 mb-1.5 ${
          large ? "text-[0.6rem] lg:text-[0.65rem]" : "text-[0.55rem] lg:text-[0.6rem]"
        }`}
      >
        {eyebrow}
      </p>

      <p
        className={`font-serif font-light text-soft-white leading-[0.9] ${
          large
            ? "text-[clamp(2rem,5vw,4rem)]"
            : "text-[clamp(1.1rem,2.5vw,1.5rem)]"
        }`}
      >
        {title}
      </p>

      {cta && (
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.4, duration: 0.7, ease: EXPO }}
          className="mt-3 lg:mt-5 flex items-center gap-2 group/cta"
        >
          <span className="font-sans text-[0.6rem] lg:text-[0.65rem] tracking-[0.28em] uppercase text-pale-gold/80 group-hover/cta:text-pale-gold transition-colors duration-300">
            {cta}
          </span>
          <ArrowRight
            size={9}
            strokeWidth={1.5}
            className="text-pale-gold/65 group-hover/cta:text-pale-gold group-hover/cta:translate-x-0.5 transition-all duration-300"
          />
        </motion.div>
      )}
    </div>
  );
}

/* ── HeroSection ────────────────────────────────────── */
export function HeroSection() {
  const { t, language } = useLanguage();
  const isDA = language === "da";
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const mainImgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  const smallTiles = [
    {
      image: "https://images.unsplash.com/photo-1609743522653-52354461eb27?w=800&q=85",
      eyebrow: isDA ? "Opskrift detaljer" : "Pattern details",
      title: isDA ? "14 sider · 7 størrelser" : "14 pages · 7 sizes",
      href: "/patterns/broke-sweater",
      mobileVisible: true,
    },
    {
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=85",
      eyebrow: isDA ? "Om designeren" : "About the designer",
      title: isDA ? "Strikket med omtanke" : "Knitted with care",
      href: "/about",
      mobileVisible: true,
    },
    {
      image: "https://images.unsplash.com/photo-1544717684-1243da23b545?w=800&q=85",
      eyebrow: isDA ? "Digital PDF" : "Digital PDF",
      title: isDA ? "Øjeblikkelig download" : "Instant download",
      href: "/patterns",
      mobileVisible: false,
    },
  ];

  return (
    <section aria-label="Hero" className="bg-soft-white" style={{ paddingTop: "72px" }}>

      {/* ── Padded wrapper ────────────────────────────── */}
      <div className="px-3 md:px-5 lg:px-6 pt-3 pb-4 lg:pb-6">

      {/* ── Grid ──────────────────────────────────────── */}
      <div
        ref={heroRef}
        className="
          grid gap-1.5 lg:gap-2
          grid-cols-2
          lg:grid-cols-[63fr_37fr]
          lg:grid-rows-[repeat(3,1fr)]
          lg:h-[calc(100svh-120px)]
          lg:max-h-[880px]
          lg:min-h-[500px]
        "
      >

        {/* ── Large tile ────────────────────────────────── */}
        <motion.div
          custom={0}
          variants={tileIn}
          initial="hidden"
          animate="visible"
          className="relative col-span-2 lg:col-span-1 lg:row-span-3 overflow-hidden aspect-[4/5] lg:aspect-auto lg:h-full"
        >
          <Link href="/patterns/broke-sweater" className="absolute inset-0 group">
            {/* Parallax */}
            <motion.div style={{ y: mainImgY }} className="absolute inset-0">
              <Image
                src="https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=1400&q=85"
                alt="The Broke Sweater"
                fill
                priority
                className="object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                sizes="(max-width: 1024px) 100vw, 63vw"
              />
            </motion.div>

            {/* Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/20 to-transparent" />

            {/* New badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8, ease: EXPO }}
              className="absolute top-5 left-5 lg:top-7 lg:left-7"
            >
              <span className="inline-block font-sans text-[0.5rem] lg:text-[0.55rem] tracking-[0.28em] uppercase bg-dark-brown text-pale-gold px-3 py-2">
                {isDA ? "Ny opskrift" : "New pattern"}
              </span>
            </motion.div>

            <Overlay
              eyebrow="Stitch of Care — 2025"
              title="The Broke Sweater"
              cta={isDA ? "Se opskrift" : "View pattern"}
              large
            />
          </Link>
        </motion.div>

        {/* ── Small tiles ───────────────────────────────── */}
        {smallTiles.map((tile, i) => (
          <motion.div
            key={i}
            custom={i + 1}
            variants={tileIn}
            initial="hidden"
            animate="visible"
            className={[
              "relative overflow-hidden",
              "aspect-[4/3] lg:aspect-auto lg:h-full",
              !tile.mobileVisible ? "hidden lg:block" : "",
            ].join(" ")}
          >
            <Link href={tile.href} className="absolute inset-0 group">
              <Image
                src={tile.image}
                alt={tile.title}
                fill
                className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                sizes="(max-width: 1024px) 50vw, 37vw"
              />
              {/* Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/85 via-obsidian/15 to-transparent" />
              {/* Hover gleam */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-pale-gold/6 to-transparent transition-opacity duration-500" />
              <Overlay eyebrow={tile.eyebrow} title={tile.title} />
            </Link>
          </motion.div>
        ))}

      </div>

      </div>{/* end padded wrapper */}

    </section>
  );
}
