"use client";

import { useLanguage } from "@/context/LanguageContext";

export function MarqueeSection() {
  const { t } = useLanguage();
  const items = t.marquee.items;
  const doubled = [...items, ...items];

  return (
    <div className="border-y border-sand/60 bg-cream py-4 overflow-hidden select-none">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-8 px-8 font-sans text-[0.6rem] tracking-[0.28em] uppercase text-warm-gray whitespace-nowrap"
          >
            {item}
            {/* Diamond separator */}
            <svg
              width="4"
              height="4"
              viewBox="0 0 5 5"
              className="flex-shrink-0 text-dim-gold/60"
              fill="currentColor"
            >
              <polygon points="2.5,0 5,2.5 2.5,5 0,2.5" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}
