"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, Download } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { Pattern } from "@/types/pattern";
import { formatPrice } from "@/lib/utils";

function sanityImgUrl(img: { asset?: { url?: string } } | null | undefined, fallback: string): string {
  return img?.asset?.url ?? fallback;
}

interface FeaturedProductProps {
  pattern: Pattern;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sanityPattern?: any;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function FeaturedProduct({ pattern, sanityPattern }: FeaturedProductProps) {
  const { t, language } = useLanguage();
  const { addItem, items } = useCart();
  const [added, setAdded] = useState(false);
  const [activeImage, setActiveImage] = useState<"front" | "back">("front");

  const sp = sanityPattern;
  const id = sp?._id ?? pattern.id;
  const name = sp?.name ?? pattern.name;
  const slug = sp?.slug ?? pattern.slug;
  const price = sp?.price ?? pattern.price;
  const priceEur = sp?.priceEur ?? pattern.priceEur;
  const description = sp?.description ?? pattern.description;
  const backText = sp?.backText ?? pattern.backText;
  const isNew = sp?.isNew ?? pattern.new;
  const difficultyLabel = sp?.difficultyLabel ?? pattern.difficultyLabel;
  const yarnWeight = sp?.yarnWeight ?? pattern.yarnWeight;
  const pages = sp?.pages ?? pattern.pages;
  const sizes = sp?.sizes ?? pattern.sizes;
  const frontImg = sanityImgUrl(sp?.images?.front, pattern.images.front);
  const backImg = sp?.images?.back?.asset?.url ?? pattern.images.back ?? pattern.images.front;
  const frontAlt = sp?.images?.frontAlt?.[language] ?? name;
  const backAlt = sp?.images?.backAlt?.[language] ?? (backText ? `${name} – "${backText}"` : name);

  const isInCart = items.some((i) => i.id === id);

  function handleAddToCart() {
    addItem({
      id,
      name,
      price,
      priceEur,
      image: frontImg,
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  }

  return (
    <section className="relative py-12 lg:py-16 bg-cream overflow-hidden">
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sand/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section label */}
        <AnimatedSection className="flex items-center gap-4 mb-16">
          <span className="block w-10 h-px bg-warm-gray/60" />
          <span className="font-sans text-xs tracking-[0.28em] uppercase text-warm-gray">
            {t.featuredProduct.eyebrow}
          </span>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Image panel */}
          <AnimatedSection direction="left" className="relative">
            <div className="relative aspect-[3/4] bg-pale-sand overflow-hidden img-zoom group">
              <Image
                src={activeImage === "front" ? frontImg : backImg}
                alt={activeImage === "back" ? backAlt : frontAlt}
                fill
                className="object-cover transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />

              {isNew && (
                <div className="absolute top-5 left-5 z-10">
                  <span className="bg-dark-brown text-cream font-sans text-[0.55rem] tracking-[0.25em] uppercase px-3 py-1.5">
                    {t.featuredProduct.new}
                  </span>
                </div>
              )}

              {activeImage === "back" && backText && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 flex items-center justify-center bg-dark-brown/25"
                >
                  <div className="bg-cream/92 px-6 py-4 text-center">
                    <p className="font-sans text-[0.55rem] tracking-[0.25em] uppercase text-warm-gray mb-1">
                      {t.product.backLabel}
                    </p>
                    <p className="font-serif text-xl font-light text-dark-brown italic">
                      "{backText}"
                    </p>
                  </div>
                </motion.div>
              )}
            </div>

            {(sp?.images?.back?.asset?.url || pattern.images.back) && (
              <div className="flex gap-3 mt-4">
                {(["front", "back"] as const).map((view) => (
                  <button
                    key={view}
                    onClick={() => setActiveImage(view)}
                    className={`relative flex-1 aspect-[4/3] bg-pale-sand overflow-hidden transition-all duration-200 ${
                      activeImage === view
                        ? "ring-1 ring-dark-brown ring-offset-2 ring-offset-cream"
                        : "opacity-50 hover:opacity-75"
                    }`}
                  >
                    <Image
                      src={view === "front" ? frontImg : backImg}
                      alt={view === "front" ? frontAlt : backAlt}
                      fill
                      className="object-cover"
                      sizes="100px"
                    />
                  </button>
                ))}
              </div>
            )}
          </AnimatedSection>

          {/* Content panel */}
          <div className="lg:pt-4">
            <StaggerContainer staggerDelay={0.09} containerDelay={0.2}>
              <StaggerItem>
                <h2 className="font-serif text-5xl lg:text-6xl font-light text-dark-brown leading-tight mb-3">
                  {name}
                </h2>
              </StaggerItem>

              {backText && (
                <StaggerItem>
                  <p className="font-sans text-[0.6rem] tracking-[0.22em] text-warm-gray uppercase mb-6">
                    {t.product.backLabel}:{" "}
                    <span className="italic normal-case font-serif text-sm text-dark-brown">
                      "{backText}"
                    </span>
                  </p>
                </StaggerItem>
              )}

              <StaggerItem>
                <p className="font-sans text-sm text-warm-gray leading-relaxed mb-8 max-w-sm">
                  {description[language]}
                </p>
              </StaggerItem>

              {/* Specs grid */}
              <StaggerItem>
                <div className="grid grid-cols-2 gap-px bg-sand/40 mb-8">
                  {[
                    { label: t.featuredProduct.difficulty, value: difficultyLabel[language] },
                    { label: t.featuredProduct.yarnWeight, value: yarnWeight },
                    { label: t.featuredProduct.sizes, value: sizes.join(", ") },
                    { label: t.featuredProduct.pages, value: `${pages} ${t.featuredProduct.pages}` },
                  ].map((spec) => (
                    <div key={spec.label} className="bg-cream px-4 py-3">
                      <p className="font-sans text-[0.55rem] tracking-[0.25em] uppercase text-warm-gray mb-1">
                        {spec.label}
                      </p>
                      <p className="font-sans text-sm text-dark-brown">{spec.value}</p>
                    </div>
                  ))}
                </div>
              </StaggerItem>

              {/* Includes */}
              <StaggerItem>
                <div className="mb-8">
                  <p className="font-sans text-[0.55rem] tracking-[0.25em] uppercase text-warm-gray mb-3">
                    {t.product.includes}
                  </p>
                  <ul className="space-y-2">
                    {(t.product.includesList as readonly string[]).map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="text-gold mt-1 flex-shrink-0 text-[0.6rem]">◆</span>
                        <span className="font-sans text-sm text-warm-gray">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>

              {/* Price + CTA */}
              <StaggerItem>
                <div className="flex items-end justify-between mb-6">
                  <div>
                    <p className="font-sans text-[0.55rem] tracking-[0.25em] uppercase text-warm-gray mb-1">
                      {t.product.format}
                    </p>
                    <p className="font-serif text-4xl font-light text-dark-brown">
                      {formatPrice(price, priceEur, language)}
                    </p>
                    <p className="font-sans text-xs text-warm-gray mt-0.5">{t.product.instant}</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-warm-gray">
                    <Download size={14} strokeWidth={1.5} />
                    <span className="font-sans text-xs">PDF</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.button
                    onClick={handleAddToCart}
                    whileTap={{ scale: 0.97 }}
                    className={`w-full sm:flex-1 h-16 sm:h-12 flex items-center justify-center gap-2 font-sans text-sm sm:text-[0.65rem] tracking-[0.22em] uppercase transition-all duration-300 ${
                      added || isInCart
                        ? "bg-dark-brown/70 text-cream"
                        : "bg-dark-brown text-cream hover:bg-deep-brown"
                    }`}
                  >
                    {added ? (
                      <>
                        <Check size={13} strokeWidth={2} />
                        {t.product.addedToCart}
                      </>
                    ) : isInCart ? (
                      t.product.inCart
                    ) : (
                      t.product.addToCart
                    )}
                  </motion.button>
                  <Link
                    href={`/patterns/${slug}`}
                    className="flex items-center justify-center gap-2 h-16 sm:h-12 px-6 bg-transparent border border-dark-brown text-dark-brown font-sans text-sm sm:text-[0.65rem] tracking-[0.22em] uppercase hover:bg-dark-brown hover:text-cream transition-all duration-300"
                  >
                    {t.featuredProduct.viewDetails}
                    <ArrowRight size={13} strokeWidth={1.5} />
                  </Link>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sand/60 to-transparent" />
    </section>
  );
}
