"use client";

import Link from "next/link";
import { Instagram, Mail, Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { useState } from "react";

function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 36" fill="none" className={className} aria-hidden="true">
      <circle cx="18" cy="18" r="16.5" stroke="currentColor" strokeWidth="0.8" />
      <line x1="11" y1="25" x2="26" y2="10" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <ellipse cx="26" cy="10" rx="2" ry="2" stroke="currentColor" strokeWidth="0.9" />
      <path
        d="M26 12 Q30 20 22 26 Q16 30 12 25"
        stroke="currentColor"
        strokeWidth="0.8"
        fill="none"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();
  const [footerEmail, setFooterEmail] = useState("");
  const [footerStatus, setFooterStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleFooterSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!footerEmail) return;
    setFooterStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: footerEmail }),
      });
      setFooterStatus(res.ok ? "success" : "error");
      if (res.ok) setFooterEmail("");
    } catch {
      setFooterStatus("error");
    }
  }

  return (
    <footer className="bg-cream border-t border-sand/80 relative overflow-hidden">
      {/* Very large decorative text — almost invisible */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none">
        <span className="font-serif text-[16vw] font-light text-dark-brown/[0.04] whitespace-nowrap leading-none">
          Stitch of Care
        </span>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-16">
          {/* Brand column */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
              <LogoMark className="w-7 h-7 text-dark-brown/60 group-hover:text-dark-brown transition-colors duration-300" />
              <span className="font-serif text-xl font-light tracking-[0.1em] text-dark-brown group-hover:text-warm-gray transition-colors duration-300">
                Stitch of Care
              </span>
            </Link>
            <p className="font-sans text-sm text-warm-gray leading-relaxed max-w-xs mb-1">
              {t.footer.tagline}
            </p>
            <p className="font-sans text-xs text-warm-gray/40 mt-2">{t.footer.madeWith}</p>

            <div className="flex items-center gap-5 mt-7">
              <a
                href="https://instagram.com/stitchofcare"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-warm-gray hover:text-dark-brown transition-colors duration-300 group"
                aria-label="Instagram"
              >
                <Instagram size={15} strokeWidth={1.3} />
                <span className="font-sans text-[0.6rem] tracking-[0.2em] uppercase">Instagram</span>
              </a>
              <a
                href="mailto:hej@stitchofcare.dk"
                className="flex items-center gap-2 text-warm-gray hover:text-dark-brown transition-colors duration-300"
                aria-label="Email"
              >
                <Mail size={15} strokeWidth={1.3} />
                <span className="font-sans text-[0.6rem] tracking-[0.2em] uppercase">Email</span>
              </a>
            </div>
          </div>

          {/* Nav column */}
          <div>
            <p className="font-sans text-[0.6rem] uppercase tracking-[0.3em] text-warm-gray mb-5">
              Navigation
            </p>
            <ul className="space-y-3.5">
              {[
                { href: "/patterns", label: t.footer.nav.patterns },
                { href: "/about", label: t.footer.nav.about },
                { href: "/blog", label: t.footer.nav.blog },
                { href: "/faq", label: t.footer.nav.faq },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-warm-gray hover:text-dark-brown transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter column */}
          <div>
            <p className="font-sans text-[0.6rem] uppercase tracking-[0.3em] text-warm-gray mb-5">
              {t.newsletter.eyebrow}
            </p>
            <p className="font-sans text-sm text-warm-gray leading-relaxed mb-5">
              {t.newsletter.body}
            </p>
            {footerStatus === "success" ? (
              <div className="flex items-center gap-2 py-2">
                <Check size={13} strokeWidth={2} className="text-dim-gold" />
                <p className="font-sans text-sm text-warm-gray">{t.newsletter.success}</p>
              </div>
            ) : (
              <form onSubmit={handleFooterSubmit} className="flex gap-0">
                <input
                  type="email"
                  value={footerEmail}
                  onChange={(e) => setFooterEmail(e.target.value)}
                  placeholder={t.newsletter.placeholder}
                  className="flex-1 h-10 px-4 bg-soft-white border border-sand text-dark-brown font-sans text-sm placeholder:text-warm-gray/60 focus:outline-none focus:border-dark-brown/40 transition-colors duration-300"
                  required
                />
                <button
                  type="submit"
                  disabled={footerStatus === "loading"}
                  className="h-10 px-4 bg-dark-brown text-cream font-sans text-xs tracking-widest uppercase font-medium hover:bg-deep-brown transition-colors duration-300 disabled:opacity-50"
                >
                  {footerStatus === "loading" ? (
                    <span className="w-3 h-3 border border-cream border-t-transparent rounded-full animate-spin inline-block" />
                  ) : "→"}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Gold divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-sand to-transparent mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="font-sans text-[0.6rem] tracking-wider text-warm-gray/60">
            © {year} {t.footer.copyright}
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="font-sans text-[0.6rem] tracking-wider text-warm-gray/60 hover:text-dark-brown transition-colors duration-300"
            >
              {t.footer.legal.privacy}
            </Link>
            <Link
              href="/terms"
              className="font-sans text-[0.6rem] tracking-wider text-warm-gray/60 hover:text-dark-brown transition-colors duration-300"
            >
              {t.footer.legal.terms}
            </Link>
            <LanguageToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
