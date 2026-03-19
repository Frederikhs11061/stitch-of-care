"use client";

import { useLanguage } from "@/context/LanguageContext";

export function MarqueeSection() {
  const { t } = useLanguage();
  const items = t.marquee.items;

  // Duplicate for seamless loop
  const doubled = [...items, ...items];

  return (
    <div className="border-y border-sand/40 bg-cream py-4 overflow-hidden select-none">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-6 px-6 font-sans text-xs tracking-widest uppercase text-warm-gray whitespace-nowrap"
          >
            {item}
            <span className="block w-1 h-1 rounded-full bg-sand flex-shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}
