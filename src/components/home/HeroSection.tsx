"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { urlFor } from "@/lib/sanity";

const EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number];

const tileIn = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.05, delay: i * 0.1, ease: EXPO },
  }),
};

function Overlay({ eyebrow, title, cta, large = false }: { eyebrow: string; title: string; cta?: string; large?: boolean }) {
  return (
    <div className={`absolute bottom-0 left-0 right-0 ${large ? "p-6 lg:p-9" : "p-4 lg:p-5"}`}>
      <p className={`font-sans tracking-[0.25em] uppercase text-white/70 mb-2 ${large ? "text-[0.65rem] lg:text-[0.7rem]" : "text-[0.6rem] lg:text-[0.65rem]"}`}>
        {eyebrow}
      </p>
      <p className={`font-serif font-light text-white leading-[0.92] ${large ? "text-[clamp(2.2rem,5vw,4.2rem)]" : "text-[clamp(1.25rem,3vw,1.6rem)]"}`}>
        {title}
      </p>
      {cta && (
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.4, duration: 0.7, ease: EXPO }}
          className="mt-4 lg:mt-5 flex items-center gap-2 group/cta"
        >
          <span className="font-sans text-[0.65rem] tracking-[0.28em] uppercase text-white/75 group-hover/cta:text-white transition-colors duration-300">{cta}</span>
          <ArrowRight size={10} strokeWidth={1.5} className="text-white/75 group-hover/cta:text-white group-hover/cta:translate-x-0.5 transition-all duration-300" />
        </motion.div>
      )}
    </div>
  );
}

function imgUrl(sanityImg: { asset?: { url?: string } } | null | undefined, fallback: string, w = 1400) {
  if (sanityImg?.asset) return urlFor(sanityImg).width(w).quality(85).url();
  return fallback;
}

function loc(obj: { da?: string; en?: string } | null | undefined, lang: string, fallback: string) {
  if (!obj) return fallback;
  return (lang === "da" ? obj.da : obj.en) ?? fallback;
}

interface HeroSanityData {
  eyebrow?: { da?: string; en?: string };
  heading1?: string;
  heading2?: string;
  tagline?: { da?: string; en?: string };
  ctaLabel?: { da?: string; en?: string };
  mainTile?: { image?: { asset?: { url?: string } }; imageAlt?: { da?: string; en?: string }; eyebrow?: { da?: string; en?: string }; title?: { da?: string; en?: string } };
  tile1?: { image?: { asset?: { url?: string } }; imageAlt?: { da?: string; en?: string }; eyebrow?: { da?: string; en?: string }; title?: { da?: string; en?: string } };
  tile2?: { image?: { asset?: { url?: string } }; imageAlt?: { da?: string; en?: string }; eyebrow?: { da?: string; en?: string }; title?: { da?: string; en?: string } };
  tile3?: { image?: { asset?: { url?: string } }; imageAlt?: { da?: string; en?: string }; eyebrow?: { da?: string; en?: string }; title?: { da?: string; en?: string } };
}

export function HeroSection({ sanityData }: { sanityData?: HeroSanityData | null }) {
  const { language } = useLanguage();
  const isDA = language === "da";
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const mainImgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  const s = sanityData;

  const mainTileImg = imgUrl(s?.mainTile?.image, "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=1400&q=85");
  const mainTileAlt = loc(s?.mainTile?.imageAlt, language, "The Broke Sweater");
  const mainTileEyebrow = loc(s?.mainTile?.eyebrow, language, "Stitch of Care — 2025");
  const mainTileTitle = loc(s?.mainTile?.title, language, "The Broke Sweater");
  const ctaLabel = loc(s?.ctaLabel, language, isDA ? "Se opskrift" : "View pattern");
  const newBadge = isDA ? "Ny opskrift" : "New pattern";

  const tiles = [
    {
      image: imgUrl(s?.tile1?.image, "https://images.unsplash.com/photo-1609743522653-52354461eb27?w=800&q=85", 800),
      alt: loc(s?.tile1?.imageAlt, language, "Pattern details"),
      eyebrow: loc(s?.tile1?.eyebrow, language, isDA ? "Opskrift detaljer" : "Pattern details"),
      title: loc(s?.tile1?.title, language, isDA ? "14 sider · 7 størrelser" : "14 pages · 7 sizes"),
      href: "/patterns/broke-sweater",
      mobileVisible: true,
    },
    {
      image: imgUrl(s?.tile2?.image, "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=85", 800),
      alt: loc(s?.tile2?.imageAlt, language, "About the designer"),
      eyebrow: loc(s?.tile2?.eyebrow, language, isDA ? "Om designeren" : "About the designer"),
      title: loc(s?.tile2?.title, language, isDA ? "Strikket med omtanke" : "Knitted with care"),
      href: "/about",
      mobileVisible: true,
    },
    {
      image: imgUrl(s?.tile3?.image, "https://images.unsplash.com/photo-1544717684-1243da23b545?w=800&q=85", 800),
      alt: loc(s?.tile3?.imageAlt, language, "Digital PDF"),
      eyebrow: loc(s?.tile3?.eyebrow, language, "Digital PDF"),
      title: loc(s?.tile3?.title, language, isDA ? "Øjeblikkelig download" : "Instant download"),
      href: "/patterns",
      mobileVisible: false,
    },
  ];

  return (
    <section aria-label="Hero" className="bg-soft-white" style={{ paddingTop: "72px" }}>
      <div className="px-3 md:px-5 lg:px-6 pt-3 pb-4 lg:pb-6">
        <div ref={heroRef} className="grid gap-1.5 lg:gap-2 grid-cols-2 lg:grid-cols-[63fr_37fr] lg:grid-rows-[repeat(3,1fr)] lg:h-[calc(100svh-120px)] lg:max-h-[880px] lg:min-h-[500px]">

          {/* Large tile */}
          <motion.div custom={0} variants={tileIn} initial="hidden" animate="visible"
            className="relative col-span-2 lg:col-span-1 lg:row-span-3 overflow-hidden aspect-[4/5] lg:aspect-auto lg:h-full">
            <Link href="/patterns/broke-sweater" className="absolute inset-0 group">
              <motion.div style={{ y: mainImgY }} className="absolute inset-0">
                <Image src={mainTileImg} alt={mainTileAlt} fill priority
                  className="object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  sizes="(max-width: 1024px) 100vw, 63vw" />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/95 via-obsidian/40 to-obsidian/5" />
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.8, ease: EXPO }}
                className="absolute top-5 left-5 lg:top-7 lg:left-7">
                <span className="inline-block font-sans text-[0.6rem] lg:text-[0.65rem] tracking-[0.25em] uppercase bg-soft-white text-dark-brown px-3 py-2">
                  {newBadge}
                </span>
              </motion.div>
              <Overlay eyebrow={mainTileEyebrow} title={mainTileTitle} cta={ctaLabel} large />
            </Link>
          </motion.div>

          {/* Small tiles */}
          {tiles.map((tile, i) => (
            <motion.div key={i} custom={i + 1} variants={tileIn} initial="hidden" animate="visible"
              className={["relative overflow-hidden", "aspect-[4/3] lg:aspect-auto lg:h-full", !tile.mobileVisible ? "hidden lg:block" : ""].join(" ")}>
              <Link href={tile.href} className="absolute inset-0 group">
                <Image src={tile.image} alt={tile.alt} fill
                  className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                  sizes="(max-width: 1024px) 50vw, 37vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/95 via-obsidian/50 to-obsidian/5" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-pale-gold/6 to-transparent transition-opacity duration-500" />
                <Overlay eyebrow={tile.eyebrow} title={tile.title} />
              </Link>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}
