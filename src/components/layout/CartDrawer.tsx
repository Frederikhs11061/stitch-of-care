"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function CartDrawer() {
  const { isOpen, closeCart, items, removeItem, updateQuantity, total, itemCount } =
    useCart();
  const { t, language } = useLanguage();

  const formattedTotal =
    language === "da" ? `${total} kr.` : `€${Math.round(total / 7.5)}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="cart-bg"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32, mass: 0.8 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[420px] bg-soft-white z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-7 py-6 border-b border-sand/40">
              <div className="flex items-center gap-3">
                <h2 className="font-serif text-xl font-light text-dark-brown">
                  {t.cart.title}
                </h2>
                {itemCount > 0 && (
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-dark-brown text-soft-white font-sans text-2xs font-medium">
                    {itemCount}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="w-9 h-9 flex items-center justify-center text-warm-gray hover:text-dark-brown transition-colors"
                aria-label={t.common.close}
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            {/* Items or empty state */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full px-8 text-center gap-6">
                  <div className="w-16 h-16 rounded-full bg-cream flex items-center justify-center">
                    <ShoppingBag size={24} strokeWidth={1} className="text-sand" />
                  </div>
                  <div>
                    <p className="font-serif text-xl font-light text-dark-brown mb-2">
                      {t.cart.empty}
                    </p>
                    <p className="font-sans text-sm text-warm-gray">
                      {t.cart.emptyBody}
                    </p>
                  </div>
                  <Button
                    href="/patterns"
                    variant="outline"
                    size="md"
                    onClick={closeCart}
                    icon={<ArrowRight size={14} strokeWidth={1.5} />}
                  >
                    {t.cart.exploreCta}
                  </Button>
                </div>
              ) : (
                <ul className="px-7 py-6 flex flex-col gap-6">
                  <AnimatePresence>
                    {items.map((item) => (
                      <motion.li
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0 }}
                        transition={{ duration: 0.25 }}
                        className="flex gap-4"
                      >
                        {/* Image */}
                        <div className="relative w-20 h-20 flex-shrink-0 bg-cream overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-serif text-base font-light text-dark-brown leading-snug mb-1">
                            {item.name}
                          </h3>
                          <p className="font-sans text-xs text-warm-gray uppercase tracking-wider mb-3">
                            {t.cart.digital}
                          </p>

                          {/* Quantity + price row */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="w-6 h-6 flex items-center justify-center border border-sand text-warm-gray hover:border-dark-brown hover:text-dark-brown transition-all"
                                aria-label="Decrease quantity"
                              >
                                <Minus size={10} strokeWidth={2} />
                              </button>
                              <span className="font-sans text-sm w-5 text-center text-dark-brown">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="w-6 h-6 flex items-center justify-center border border-sand text-warm-gray hover:border-dark-brown hover:text-dark-brown transition-all"
                                aria-label="Increase quantity"
                              >
                                <Plus size={10} strokeWidth={2} />
                              </button>
                            </div>
                            <span className="font-sans text-sm font-medium text-dark-brown">
                              {language === "da"
                                ? `${item.price * item.quantity} kr.`
                                : `€${item.priceEur * item.quantity}`}
                            </span>
                          </div>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="self-start text-warm-gray hover:text-dark-brown transition-colors"
                          aria-label={t.cart.remove}
                        >
                          <X size={14} strokeWidth={1.5} />
                        </button>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-sand/40 px-7 py-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-sans text-xs uppercase tracking-widest text-warm-gray">
                    {t.cart.subtotal}
                  </span>
                  <span className="font-serif text-xl font-light text-dark-brown">
                    {formattedTotal}
                  </span>
                </div>
                <p className="font-sans text-xs text-warm-gray">{t.cart.tax}</p>
                {/* Stripe will hook in here */}
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  icon={<ArrowRight size={14} strokeWidth={2} />}
                  onClick={() => {
                    // TODO: connect Stripe
                    alert("Stripe integration coming soon!");
                  }}
                >
                  {t.cart.checkout}
                </Button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
