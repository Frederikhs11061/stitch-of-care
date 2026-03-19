"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Download, FileText, Package } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";
import { Pattern } from "@/types/pattern";
import { formatPrice } from "@/lib/utils";

interface Props {
  pattern: Pattern;
}

export function PatternDetailClient({ pattern }: Props) {
  const { t, language } = useLanguage();
  const { addItem, items } = useCart();
  const [added, setAdded] = useState(false);
  const [activeImage, setActiveImage] = useState<"front" | "back" | "detail" | "lifestyle">("front");

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

  const imageMap = {
    front: pattern.images.front,
    back: pattern.images.back || pattern.images.front,
    detail: pattern.images.detail || pattern.images.front,
    lifestyle: pattern.images.lifestyle || pattern.images.front,
  };

  const thumbKeys = (Object.keys(imageMap) as (keyof typeof imageMap)[]).filter(
    (k) => k === "front" || pattern.images[k as keyof typeof pattern.images]
  );

  return (
    <div className="min-h-screen bg-soft-white">
      {/* Breadcrumb */}
      <div className="border-b border-sand/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 flex items-center gap-2">
          <Link href="/patterns" className="flex items-center gap-1.5 font-sans text-xs text-warm-gray hover:text-dark-brown transition-colors">
            <ArrowLeft size={12} strokeWidth={1.5} />
            {t.nav.patterns}
          </Link>
          <span className="text-sand">/</span>
          <span className="font-sans text-xs text-dark-brown">{pattern.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* LEFT: Images */}
          <AnimatedSection direction="left" className="space-y-4">
            {/* Main image */}
            <div className="relative aspect-[3/4] bg-cream overflow-hidden">
              <motion.div
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                <Image
                  src={imageMap[activeImage]}
                  alt={activeImage === "back" && pattern.backText ? `"${pattern.backText}"` : pattern.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </motion.div>
              {/* Back text overlay */}
              {activeImage === "back" && pattern.backText && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-dark-brown/25 flex items-end p-8"
                >
                  <div className="bg-soft-white/95 px-6 py-4 w-full text-center">
                    <p className="font-sans text-2xs tracking-widest uppercase text-warm-gray mb-1">{t.product.backLabel}</p>
                    <p className="font-serif text-2xl font-light text-dark-brown italic">"{pattern.backText}"</p>
                  </div>
                </motion.div>
              )}
              {pattern.new && (
                <div className="absolute top-5 left-5">
                  <span className="bg-dark-brown text-soft-white font-sans text-2xs tracking-widest uppercase px-3 py-1.5">
                    {t.featuredProduct.new}
                  </span>
                </div>
              )}
            </div>
            {/* Thumbnails */}
            <div className="flex gap-3">
              {thumbKeys.map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveImage(key)}
                  className={`relative flex-1 aspect-square bg-cream overflow-hidden transition-all duration-200 ${
                    activeImage === key ? "ring-1 ring-dark-brown ring-offset-2" : "opacity-50 hover:opacity-80"
                  }`}
                >
                  <Image src={imageMap[key]} alt={key} fill className="object-cover" sizes="100px" />
                </button>
              ))}
            </div>
          </AnimatedSection>

          {/* RIGHT: Info */}
          <div className="lg:pt-2">
            <StaggerContainer staggerDelay={0.08} containerDelay={0.15}>
              <StaggerItem>
                <h1 className="font-serif text-5xl lg:text-6xl font-light text-dark-brown leading-tight mb-3">
                  {pattern.name}
                </h1>
              </StaggerItem>
              {pattern.backText && (
                <StaggerItem>
                  <p className="font-sans text-xs tracking-widest text-warm-gray uppercase mb-6">
                    {t.product.backLabel}: <span className="font-serif text-base italic normal-case text-dark-brown">"{pattern.backText}"</span>
                  </p>
                </StaggerItem>
              )}
              <StaggerItem>
                <p className="font-sans text-sm text-warm-gray leading-relaxed mb-8 max-w-sm">
                  {pattern.longDescription[language]}
                </p>
              </StaggerItem>

              {/* Specs */}
              <StaggerItem>
                <div className="grid grid-cols-2 gap-px bg-sand/30 mb-8">
                  {[
                    { label: t.product.difficulty, value: pattern.difficultyLabel[language] },
                    { label: t.product.yarnWeight, value: pattern.yarnWeight },
                    { label: t.product.sizes, value: pattern.sizes.join(" · ") },
                    { label: t.product.language, value: t.product.languageValue },
                    { label: t.product.format, value: t.product.formatValue },
                    { label: t.featuredProduct.pages, value: `${pattern.pages} ${t.featuredProduct.pages}` },
                  ].map((spec) => (
                    <div key={spec.label} className="bg-soft-white px-4 py-3">
                      <p className="font-sans text-2xs tracking-widest uppercase text-warm-gray mb-0.5">{spec.label}</p>
                      <p className="font-sans text-xs text-dark-brown">{spec.value}</p>
                    </div>
                  ))}
                </div>
              </StaggerItem>

              {/* What's included */}
              <StaggerItem>
                <div className="mb-8 p-5 bg-cream">
                  <div className="flex items-center gap-2 mb-3">
                    <Package size={14} strokeWidth={1.5} className="text-warm-gray" />
                    <p className="font-sans text-xs tracking-widest uppercase text-warm-gray">{t.product.includes}</p>
                  </div>
                  <ul className="space-y-1.5">
                    {(t.product.includesList as readonly string[]).map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <Check size={11} strokeWidth={2} className="text-warm-gray mt-0.5 flex-shrink-0" />
                        <span className="font-sans text-xs text-warm-gray">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>

              {/* Price + CTA */}
              <StaggerItem>
                <div className="flex items-end justify-between mb-5">
                  <div>
                    <p className="font-serif text-5xl font-light text-dark-brown">
                      {formatPrice(pattern.price, pattern.priceEur, language)}
                    </p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <Download size={11} strokeWidth={1.5} className="text-warm-gray" />
                      <p className="font-sans text-xs text-warm-gray">{t.product.instant}</p>
                    </div>
                  </div>
                  <FileText size={28} strokeWidth={1} className="text-sand" />
                </div>
                <motion.button
                  onClick={handleAddToCart}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full h-14 flex items-center justify-center gap-2 font-sans text-xs tracking-widest uppercase transition-all duration-300 mb-3 ${
                    added || isInCart
                      ? "bg-dark-brown/80 text-soft-white"
                      : "bg-dark-brown text-soft-white hover:bg-deep-brown"
                  }`}
                >
                  {added ? (
                    <><Check size={14} strokeWidth={2} /> {t.product.addedToCart}</>
                  ) : isInCart ? t.product.inCart : t.product.addToCart}
                </motion.button>
                <p className="font-sans text-xs text-center text-warm-gray">{t.cart.tax}</p>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
