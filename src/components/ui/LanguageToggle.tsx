"use client";

import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface LanguageToggleProps {
  className?: string;
  variant?: "default" | "dark";
}

export function LanguageToggle({
  className,
  variant = "default",
}: LanguageToggleProps) {
  const { language, setLanguage } = useLanguage();

  const isDark = variant === "dark";

  return (
    <div
      className={cn(
        "flex items-center gap-1 font-sans text-xs tracking-widest uppercase",
        className
      )}
    >
      {(["da", "en"] as const).map((lang, i) => (
        <>
          {i === 1 && (
            <span key="sep" className={cn("text-xs", isDark ? "text-gold/30" : "text-sand")}>|</span>
          )}
          <button
            key={lang}
            onClick={() => setLanguage(lang)}
            className={cn(
              "relative px-1 py-0.5 transition-all duration-200",
              isDark
                ? language === lang
                  ? "text-pale-gold font-medium"
                  : "text-warm-gray/60 hover:text-pale-gold"
                : language === lang
                  ? "text-dark-brown font-medium"
                  : "text-warm-gray hover:text-dark-brown"
            )}
            aria-label={lang === "da" ? "Skift til dansk" : "Switch to English"}
          >
            {lang.toUpperCase()}
            {language === lang && (
              <motion.span
                layoutId="lang-indicator"
                className={cn(
                  "absolute bottom-0 left-0 right-0 h-px",
                  isDark ? "bg-gold" : "bg-dark-brown"
                )}
              />
            )}
          </button>
        </>
      ))}
    </div>
  );
}
