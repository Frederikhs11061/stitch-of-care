"use client";

import Link from "next/link";
import { Instagram, Mail, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageToggle } from "@/components/ui/LanguageToggle";

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-cream border-t border-sand/40 relative overflow-hidden">
      {/* Large decorative background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none">
        <span className="font-serif text-[15vw] font-bold text-sand/20 whitespace-nowrap leading-none">
          Stitch of Care
        </span>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-16">
          {/* Brand column */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="font-serif text-2xl font-medium text-dark-brown">
                Stitch of Care
              </span>
            </Link>
            <p className="font-sans text-sm text-warm-gray leading-relaxed max-w-xs">
              {t.footer.tagline}
            </p>
            <p className="font-sans text-xs text-warm-gray/60 mt-2">
              {t.footer.madeWith}
            </p>

            {/* Social links */}
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://instagram.com/stitchofcare"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-warm-gray hover:text-dark-brown transition-colors group"
                aria-label="Instagram"
              >
                <Instagram size={16} strokeWidth={1.5} />
                <span className="font-sans text-xs tracking-wider uppercase group-hover:underline underline-offset-2">
                  Instagram
                </span>
                <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href="mailto:hej@stitchofcare.dk"
                className="flex items-center gap-1.5 text-warm-gray hover:text-dark-brown transition-colors group"
                aria-label="Email"
              >
                <Mail size={16} strokeWidth={1.5} />
                <span className="font-sans text-xs tracking-wider uppercase group-hover:underline underline-offset-2">
                  Email
                </span>
              </a>
            </div>
          </div>

          {/* Nav column */}
          <div>
            <p className="font-sans text-2xs uppercase tracking-widest text-warm-gray mb-4">
              Navigation
            </p>
            <ul className="space-y-3">
              {[
                { href: "/patterns", label: t.footer.nav.patterns },
                { href: "/about", label: t.footer.nav.about },
                { href: "/blog", label: t.footer.nav.blog },
                { href: "/faq", label: t.footer.nav.faq },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-warm-gray hover:text-dark-brown transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter column */}
          <div>
            <p className="font-sans text-2xs uppercase tracking-widest text-warm-gray mb-4">
              {t.newsletter.eyebrow}
            </p>
            <p className="font-sans text-sm text-warm-gray mb-4 leading-relaxed">
              {t.newsletter.body}
            </p>
            {/* Resend will hook in here */}
            <form
              id="footer-newsletter"
              className="resend-form flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                // TODO: connect Resend
              }}
            >
              <input
                type="email"
                placeholder={t.newsletter.placeholder}
                className="flex-1 h-10 px-4 bg-soft-white border border-sand text-dark-brown font-sans text-sm placeholder:text-warm-gray/60 focus:outline-none focus:border-dark-brown transition-colors"
                required
              />
              <button
                type="submit"
                className="h-10 px-5 bg-dark-brown text-soft-white font-sans text-xs tracking-widest uppercase hover:bg-deep-brown transition-colors"
              >
                →
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 border-t border-sand/40">
          <p className="font-sans text-xs text-warm-gray/60">
            © {year} {t.footer.copyright}
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="font-sans text-xs text-warm-gray/60 hover:text-dark-brown transition-colors"
            >
              {t.footer.legal.privacy}
            </Link>
            <Link
              href="/terms"
              className="font-sans text-xs text-warm-gray/60 hover:text-dark-brown transition-colors"
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
