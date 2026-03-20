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

interface FeaturedProductProps {
  pattern: Pattern;
}

export function FeaturedProduct({ pattern }: FeaturedProductProps) {
  const { t, language } = useLanguage();
  const { addItem, items } = useCart();
  const [added, setAdded] = useState(false);
  const [activeImage, setActiveImage] = useState<"front" | "back">("front");

  const isInCart = items.some((i) => i.id === pattern.id);

  function handleAddToCart() {
    addItem({
      id: pattern.id,
      name: pattern.name,
      price: pattern.price,
      priceEur: pattern.priceEur,
      image: pattern.images.front,
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
          <span className="block w-10 h-px bg-dim-gold/60" />
          <span className="font-sans text-[0.6rem] tracking-[0.3em] uppercase text-dark-brown/50">
            {t.featuredProduct.eyebrow}
          </span>
          <span className="block w-10 h-px bg-dim-gold/60" />
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Image panel */}
          <AnimatedSection direction="left" className="relative">
            <div className="relative aspect-[3/4] bg-pale-sand overflow-hidden img-zoom group">
              <Image
                src={
                  activeImage === "front"
                    ? pattern.images.front
                    : pattern.images.back || pattern.images.front
                }
                alt={
                  activeImage === "back" && pattern.backText
                    ? `${pattern.name} – back: "${pattern.backText}"`
                    : pattern.name
                }
                fill
                className="object-cover transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />

              {pattern.new && (
                <div className="absolute top-5 left-5 z-10">
                  <span className="bg-dark-brown text-cream font-sans text-[0.55rem] tracking-[0.25em] uppercase px-3 py-1.5">
                    {t.featuredProduct.new}
                  </span>
                </div>
              )}

              {activeImage === "back" && pattern.backText && (
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
                      "{pattern.backText}"
                    </p>
                  </div>
                </motion.div>
              )}
            </div>

            {pattern.images.back && (
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
                      src={view === "front" ? pattern.images.front : pattern.images.back!}
                      alt={view}
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
                  {pattern.name}
                </h2>
              </StaggerItem>

              {pattern.backText && (
                <StaggerItem>
                  <p className="font-sans text-[0.6rem] tracking-[0.22em] text-warm-gray uppercase mb-6">
                    {t.product.backLabel}:{" "}
                    <span className="italic normal-case font-serif text-sm text-dark-brown">
                      "{pattern.backText}"
                    </span>
                  </p>
                </StaggerItem>
              )}

              <StaggerItem>
                <p className="font-sans text-sm text-warm-gray leading-relaxed mb-8 max-w-sm">
                  {pattern.description[language]}
                </p>
              </StaggerItem>

              {/* Specs grid */}
              <StaggerItem>
                <div className="grid grid-cols-2 gap-px bg-sand/40 mb-8">
                  {[
                    { label: t.featuredProduct.difficulty, value: pattern.difficultyLabel[language] },
                    { label: t.featuredProduct.yarnWeight, value: pattern.yarnWeight },
                    { label: t.featuredProduct.sizes, value: pattern.sizes.join(", ") },
                    { label: t.featuredProduct.pages, value: `${pattern.pages} ${t.featuredProduct.pages}` },
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
                      {formatPrice(pattern.price, pattern.priceEur, language)}
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
                    href={`/patterns/${pattern.slug}`}
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
