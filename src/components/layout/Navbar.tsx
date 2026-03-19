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

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 30);
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
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isScrolled || isMenuOpen
            ? "bg-soft-white/95 backdrop-blur-md border-b border-sand/40"
            : "bg-transparent"
        )}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            aria-label="Stitch of Care – Home"
          >
            <motion.div
              whileHover={{ rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="w-7 h-7 flex items-center justify-center"
            >
              {/* Knitting needle / yarn SVG mark */}
              <svg viewBox="0 0 28 28" fill="none" className="w-full h-full">
                <circle cx="14" cy="14" r="13" stroke="#3D2B1F" strokeWidth="1.2" />
                <path
                  d="M8 14 Q14 7 20 14 Q14 21 8 14Z"
                  stroke="#3D2B1F"
                  strokeWidth="1.2"
                  fill="none"
                />
                <circle cx="14" cy="14" r="2" fill="#3D2B1F" />
              </svg>
            </motion.div>
            <span className="font-serif text-lg font-medium tracking-wide text-dark-brown group-hover:text-warm-gray transition-colors duration-300">
              Stitch of Care
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-8">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "relative font-sans text-xs tracking-widest uppercase transition-colors duration-200",
                    "after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:h-px",
                    "after:bg-dark-brown after:transition-all after:duration-300",
                    isActive(link.href)
                      ? "text-dark-brown after:w-full"
                      : "text-warm-gray hover:text-dark-brown after:w-0 hover:after:w-full"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <LanguageToggle className="hidden lg:flex" />
            <CartIcon />
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-dark-brown hover:text-warm-gray transition-colors"
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
                    <X size={20} strokeWidth={1.5} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={20} strokeWidth={1.5} />
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
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="fixed top-16 left-0 right-0 z-40 bg-soft-white/98 backdrop-blur-md border-b border-sand/40"
          >
            <div className="max-w-7xl mx-auto px-6 py-8">
              <ul className="flex flex-col gap-1 mb-8">
                {links.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "block py-3 font-serif text-2xl font-light",
                        "border-b border-sand/30 transition-colors duration-200",
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
