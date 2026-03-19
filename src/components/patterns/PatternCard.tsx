"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, Download } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { Pattern } from "@/types/pattern";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface PatternCardProps {
  pattern: Pattern;
  index?: number;
}

export function PatternCard({ pattern, index = 0 }: PatternCardProps) {
  const { t, language } = useLanguage();
  const { addItem, items } = useCart();
  const [added, setAdded] = useState(false);
  const isInCart = items.some((i) => i.id === pattern.id);

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
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
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/patterns/${pattern.slug}`} className="block">
        {/* Image */}
        <div className="relative aspect-[3/4] bg-cream overflow-hidden mb-4">
          <Image
            src={pattern.images.front}
            alt={pattern.name}
            fill
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {pattern.new && (
              <span className="bg-dark-brown text-soft-white font-sans text-2xs tracking-widest uppercase px-2.5 py-1">
                {t.featuredProduct.new}
              </span>
            )}
          </div>
          {/* Quick add overlay */}
          <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
            <motion.button
              onClick={handleAddToCart}
              whileTap={{ scale: 0.97 }}
              className={cn(
                "w-full h-11 flex items-center justify-center gap-2 font-sans text-xs tracking-widest uppercase transition-colors duration-200",
                added || isInCart
                  ? "bg-dark-brown/80 text-soft-white"
                  : "bg-soft-white text-dark-brown hover:bg-cream"
              )}
            >
              {added ? (
                <><Check size={12} strokeWidth={2} /> {t.product.addedToCart}</>
              ) : isInCart ? (
                t.product.inCart
              ) : (
                t.product.addToCart
              )}
            </motion.button>
          </div>
        </div>

        {/* Info */}
        <div>
          <div className="flex items-start justify-between mb-1">
            <h3 className="font-serif text-xl font-light text-dark-brown group-hover:text-warm-gray transition-colors">
              {pattern.name}
            </h3>
            <span className="font-serif text-lg font-light text-dark-brown ml-2 flex-shrink-0">
              {formatPrice(pattern.price, pattern.priceEur, language)}
            </span>
          </div>
          <p className="font-sans text-xs text-warm-gray mb-2">
            {pattern.difficultyLabel[language]} · {pattern.yarnWeight}
          </p>
          {pattern.backText && (
            <p className="font-sans text-xs text-warm-gray/70 italic">
              "{pattern.backText}"
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
