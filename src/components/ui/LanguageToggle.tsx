"use client";

import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface LanguageToggleProps {
  className?: string;
  variant?: "default" | "minimal";
}

export function LanguageToggle({
  className,
  variant = "default",
}: LanguageToggleProps) {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      className={cn(
        "flex items-center gap-1 font-sans text-xs tracking-widest uppercase",
        className
      )}
    >
      <button
        onClick={() => setLanguage("da")}
        className={cn(
          "relative px-1 py-0.5 transition-all duration-200",
          language === "da"
            ? "text-dark-brown font-medium"
            : "text-warm-gray hover:text-dark-brown"
        )}
        aria-label="Skift til dansk"
      >
        DA
        {language === "da" && (
          <motion.span
            layoutId="lang-indicator"
            className="absolute bottom-0 left-0 right-0 h-px bg-dark-brown"
          />
        )}
      </button>
      <span className="text-sand text-xs">|</span>
      <button
        onClick={() => setLanguage("en")}
        className={cn(
          "relative px-1 py-0.5 transition-all duration-200",
          language === "en"
            ? "text-dark-brown font-medium"
            : "text-warm-gray hover:text-dark-brown"
        )}
        aria-label="Switch to English"
      >
        EN
        {language === "en" && (
          <motion.span
            layoutId="lang-indicator"
            className="absolute bottom-0 left-0 right-0 h-px bg-dark-brown"
          />
        )}
      </button>
    </div>
  );
}
