"use client";

import { useCart } from "@/context/CartContext";
import { ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface CartIconProps {
  className?: string;
  variant?: "default" | "dark";
}

export function CartIcon({ className, variant = "default" }: CartIconProps) {
  const { itemCount, openCart } = useCart();
  const isDark = variant === "dark";

  return (
    <button
      onClick={openCart}
      className={cn(
        "relative flex items-center justify-center w-10 h-10 transition-colors duration-200",
        isDark
          ? "text-warm-gray hover:text-gold"
          : "text-dark-brown hover:text-warm-gray",
        className
      )}
      aria-label={`Cart (${itemCount} items)`}
    >
      <ShoppingBag size={20} strokeWidth={1.5} />
      <AnimatePresence>
        {itemCount > 0 && (
          <motion.span
            key={itemCount}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 22 }}
            className={cn(
              "absolute -top-0.5 -right-0.5 flex items-center justify-center w-4 h-4 rounded-full font-sans text-2xs font-medium",
              isDark
                ? "bg-gold text-obsidian"
                : "bg-dark-brown text-soft-white"
            )}
          >
            {itemCount > 9 ? "9+" : itemCount}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
