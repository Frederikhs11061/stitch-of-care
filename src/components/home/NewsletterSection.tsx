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
    // TODO: connect Resend
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1000);
  }

  return (
    <section className="py-24 lg:py-32 bg-dark-brown relative overflow-hidden">
      {/* Decorative large bg text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none">
        <span className="font-serif font-bold text-[12vw] text-soft-white/[0.03] whitespace-nowrap leading-none">
          Newsletter
        </span>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="max-w-2xl mx-auto text-center">
          <AnimatedSection>
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="block w-8 h-px bg-warm-gray/60" />
              <span className="font-sans text-xs tracking-widest uppercase text-warm-gray/80">
                {t.newsletter.eyebrow}
              </span>
              <span className="block w-8 h-px bg-warm-gray/60" />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h2 className="font-serif text-4xl lg:text-5xl font-light text-soft-white leading-snug mb-6 whitespace-pre-line">
              {t.newsletter.heading}
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="font-sans text-sm text-warm-gray/80 leading-relaxed mb-10">
              {t.newsletter.body}
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.25}>
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center justify-center gap-3 py-4"
                >
                  <div className="w-8 h-8 rounded-full bg-soft-white/10 flex items-center justify-center">
                    <Check size={14} strokeWidth={2} className="text-soft-white" />
                  </div>
                  <p className="font-sans text-sm text-soft-white">
                    {t.newsletter.success}
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="resend-form flex gap-0 max-w-md mx-auto"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.newsletter.placeholder}
                    className="flex-1 h-12 px-5 bg-soft-white/10 border border-soft-white/20 text-soft-white font-sans text-sm placeholder:text-warm-gray/60 focus:outline-none focus:border-soft-white/50 transition-colors"
                    required
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="h-12 px-6 bg-cream text-dark-brown font-sans text-xs tracking-widest uppercase hover:bg-soft-white transition-colors disabled:opacity-60 flex items-center gap-2"
                  >
                    {status === "loading" ? (
                      <span className="w-3.5 h-3.5 border-2 border-dark-brown border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        {t.newsletter.cta}
                        <ArrowRight size={12} strokeWidth={2} />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>

            <p className="font-sans text-2xs text-warm-gray/50 mt-4">
              {t.newsletter.disclaimer}
            </p>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
