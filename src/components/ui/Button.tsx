"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion } from "framer-motion";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "dark" | "gold-outline";
type Size = "sm" | "md" | "lg" | "xl";

interface ButtonProps {
  variant?: Variant;
  size?: Size;
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  external?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  loading?: boolean;
}

const variantStyles: Record<Variant, string> = {
  // Gold fill — use on dark backgrounds (hero, dark sections)
  primary:
    "bg-gold text-obsidian hover:bg-pale-gold active:scale-[0.98]",
  // Cream fill — use on cream/light sections
  secondary:
    "bg-cream text-dark-brown hover:bg-pale-gold active:scale-[0.98]",
  // Transparent + text — ghost on dark bg
  ghost:
    "bg-transparent text-warm-gray hover:text-gold active:scale-[0.98]",
  // Gold border — elegant outline for dark sections
  "gold-outline":
    "bg-transparent border border-gold/40 text-gold hover:bg-gold hover:text-obsidian active:scale-[0.98]",
  // Dark border — outline for light (cream) sections
  outline:
    "bg-transparent border border-dark-brown text-dark-brown hover:bg-dark-brown hover:text-cream active:scale-[0.98]",
  // Dark fill — for light sections
  dark:
    "bg-dark-brown text-cream hover:bg-deep-brown active:scale-[0.98]",
};

const sizeStyles: Record<Size, string> = {
  sm: "h-8 px-4 text-[0.6rem] tracking-[0.22em]",
  md: "h-11 px-6 text-[0.62rem] tracking-[0.22em]",
  lg: "h-12 px-8 text-[0.65rem] tracking-[0.22em]",
  xl: "h-14 px-10 text-[0.7rem] tracking-[0.22em]",
};

export function Button({
  variant = "primary",
  size = "md",
  children,
  onClick,
  href,
  className,
  disabled,
  type = "button",
  external,
  icon,
  iconPosition = "right",
  loading,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 font-sans font-medium uppercase",
    "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
    "rounded-none",
    variantStyles[variant],
    sizeStyles[size],
    disabled && "opacity-40 pointer-events-none",
    loading && "opacity-70 pointer-events-none",
    className
  );

  const content = (
    <>
      {loading ? (
        <span className="inline-block w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {icon && iconPosition === "left" && <span>{icon}</span>}
          <span>{children}</span>
          {icon && iconPosition === "right" && <span>{icon}</span>}
        </>
      )}
    </>
  );

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {content}
    </button>
  );
}

export function TextLink({
  href,
  children,
  className,
  light = false,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  light?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-block relative font-sans text-sm",
        "after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-px after:w-0",
        "after:transition-all after:duration-300 after:ease-[cubic-bezier(0.16,1,0.3,1)]",
        "hover:after:w-full",
        light
          ? "text-pale-gold after:bg-gold hover:text-gold"
          : "text-dark-brown after:bg-dark-brown hover:text-deep-brown",
        className
      )}
    >
      {children}
    </Link>
  );
}
