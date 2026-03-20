"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function NewsletterSection() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1000);
  }

  return (
    <section className="py-12 lg:py-18 bg-pale-sand relative overflow-hidden">
      {/* Large decorative serif letter */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none">
        <span className="font-serif font-light text-[18vw] text-dark-brown/[0.04] whitespace-nowrap leading-none">
          care
        </span>
      </div>

      <div className="relative max-w-3xl mx-auto px-6 lg:px-10 text-center">
        <AnimatedSection>
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="block w-12 h-px bg-dim-gold/50" />
            <span className="font-sans text-[0.6rem] tracking-[0.35em] uppercase text-warm-gray">
              {t.newsletter.eyebrow}
            </span>
            <span className="block w-12 h-px bg-dim-gold/50" />
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <h2 className="font-serif text-4xl lg:text-5xl font-light text-dark-brown leading-[1.05] mb-6 whitespace-pre-line">
            {t.newsletter.heading}
          </h2>
        </AnimatedSection>

        {/* Divider */}
        <AnimatedSection delay={0.18}>
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-8 h-px bg-sand" />
            <svg width="4" height="4" viewBox="0 0 5 5" fill="currentColor" className="text-dim-gold/60">
              <polygon points="2.5,0 5,2.5 2.5,5 0,2.5" />
            </svg>
            <div className="w-8 h-px bg-sand" />
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.22}>
          <p className="font-sans text-sm text-warm-gray leading-relaxed mb-12 max-w-md mx-auto">
            {t.newsletter.body}
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.28}>
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-3 py-4"
              >
                <div className="w-8 h-8 rounded-full border border-gold/30 flex items-center justify-center">
                  <Check size={13} strokeWidth={2} className="text-gold" />
                </div>
                <p className="font-sans text-sm text-dark-brown">{t.newsletter.success}</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="resend-form flex gap-0 max-w-lg mx-auto"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.newsletter.placeholder}
                  className="flex-1 h-14 px-5 bg-soft-white border border-sand text-dark-brown font-sans text-sm placeholder:text-warm-gray/60 focus:outline-none focus:border-dark-brown/40 transition-colors duration-300"
                  required
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="h-14 px-8 bg-dark-brown text-cream font-sans text-[0.65rem] tracking-[0.22em] uppercase font-medium hover:bg-deep-brown transition-colors duration-300 disabled:opacity-50 flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  {status === "loading" ? (
                    <span className="w-3.5 h-3.5 border-2 border-obsidian border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      {t.newsletter.cta}
                      <ArrowRight size={11} strokeWidth={2} />
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          <p className="font-sans text-xs tracking-wider text-warm-gray/60 mt-5">
            {t.newsletter.disclaimer}
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
