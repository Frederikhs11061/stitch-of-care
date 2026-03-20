"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { CartIcon } from "@/components/ui/CartIcon";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { cn } from "@/lib/utils";

function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Outer circle */}
      <circle cx="18" cy="18" r="16.5" stroke="currentColor" strokeWidth="0.8" />
      {/* Needle diagonal */}
      <line x1="11" y1="25" x2="26" y2="10" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      {/* Needle eye (small oval at top) */}
      <ellipse cx="26" cy="10" rx="2" ry="2" stroke="currentColor" strokeWidth="0.9" />
      {/* Thread arc from eye curving down */}
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

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const links = [
    { href: "/patterns", label: t.nav.patterns },
    { href: "/blog", label: t.nav.blog },
    { href: "/faq", label: t.nav.faq },
    { href: "/about", label: t.nav.about },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          "bg-soft-white/95 backdrop-blur-md border-b border-sand/60"
        )}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-[72px] flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
            aria-label="Stitch of Care – Home"
          >
            <motion.div
              whileHover={{ rotate: 8, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 350, damping: 18 }}
              className="w-8 h-8 text-dark-brown flex items-center justify-center"
            >
              <LogoMark className="w-full h-full" />
            </motion.div>
            <div className="flex flex-col leading-none">
              <span className="font-serif text-base font-light tracking-[0.12em] text-dark-brown group-hover:text-warm-gray transition-colors duration-400">
                Stitch of Care
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-10">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "relative font-sans text-[0.65rem] tracking-[0.22em] uppercase transition-colors duration-300",
                    "after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:h-px",
                    "after:transition-all after:duration-400",
                    isActive(link.href)
                      ? "text-dark-brown after:w-full after:bg-dark-brown"
                      : "text-warm-gray hover:text-dark-brown after:w-0 after:bg-dark-brown hover:after:w-full"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-5">
            <LanguageToggle className="hidden lg:flex" />
            <CartIcon />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-warm-gray hover:text-dark-brown transition-colors duration-300"
              aria-label={isMenuOpen ? t.nav.close : t.nav.menu}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={18} strokeWidth={1.2} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={18} strokeWidth={1.2} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="fixed top-[72px] left-0 right-0 z-40 bg-soft-white border-b border-sand/60"
          >
            <div className="max-w-7xl mx-auto px-6 py-10">
              <ul className="flex flex-col gap-0 mb-10">
                {links.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 + 0.08 }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "block py-4 font-serif text-3xl font-light tracking-wide",
                        "border-b border-sand/40 transition-colors duration-200",
                        isActive(link.href)
                          ? "text-dark-brown"
                          : "text-warm-gray hover:text-dark-brown"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <LanguageToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
