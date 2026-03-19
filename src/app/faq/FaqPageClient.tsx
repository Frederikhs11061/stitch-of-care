"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";
import { faqItems } from "@/data/faqData";

export function FaqPageClient() {
  const { t, language } = useLanguage();
  const [openId, setOpenId] = useState<string | null>(faqItems[0]?.id ?? null);

  function toggle(id: string) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  return (
    <div className="min-h-screen bg-soft-white">
      {/* Page header */}
      <div className="bg-cream border-b border-sand/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-36 pb-16">
          <AnimatedSection direction="down">
            <div className="flex items-center gap-3 mb-6">
              <span className="block w-8 h-px bg-warm-gray" />
              <span className="font-sans text-xs tracking-widest uppercase text-warm-gray">
                {t.faq.eyebrow}
              </span>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h1 className="font-serif text-6xl lg:text-8xl font-light text-dark-brown leading-none">
              {t.faq.heading}
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="font-sans text-sm text-warm-gray mt-4 max-w-md leading-relaxed">
              {t.faq.body}
            </p>
          </AnimatedSection>
        </div>
      </div>

      {/* FAQ accordion */}
      <div className="max-w-4xl mx-auto px-6 lg:px-10 py-16 lg:py-24">
        <StaggerContainer staggerDelay={0.06} className="divide-y divide-sand/40">
          {faqItems.map((item, i) => {
            const isOpen = openId === item.id;
            return (
              <StaggerItem key={item.id}>
                <div>
                  <button
                    onClick={() => toggle(item.id)}
                    className="w-full flex items-start justify-between gap-6 py-7 text-left group"
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`font-serif text-xl lg:text-2xl font-light leading-snug transition-colors duration-200 ${
                        isOpen ? "text-dark-brown" : "text-warm-gray group-hover:text-dark-brown"
                      }`}
                    >
                      {item.question[language]}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 0 : 0 }}
                      className="flex-shrink-0 w-8 h-8 flex items-center justify-center border border-sand group-hover:border-dark-brown transition-colors duration-200 mt-0.5"
                    >
                      <motion.div
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                      >
                        <Plus
                          size={14}
                          strokeWidth={1.5}
                          className={isOpen ? "text-dark-brown" : "text-warm-gray group-hover:text-dark-brown"}
                        />
                      </motion.div>
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-8 pr-14">
                          <p className="font-sans text-sm text-warm-gray leading-relaxed">
                            {item.answer[language]}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>

      {/* Still have questions CTA */}
      <div className="border-t border-sand/40 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
          <AnimatedSection className="text-center max-w-lg mx-auto">
            <h2 className="font-serif text-3xl lg:text-4xl font-light text-dark-brown mb-3">
              {t.faq.stillQuestions}
            </h2>
            <p className="font-sans text-sm text-warm-gray mb-8">
              {t.faq.stillBody}
            </p>
            <Button
              href="mailto:hej@stitchofcare.dk"
              variant="outline"
              size="lg"
              external
              icon={<ArrowRight size={14} strokeWidth={1.5} />}
            >
              {t.faq.contactCta}
            </Button>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
