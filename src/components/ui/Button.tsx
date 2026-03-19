"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion } from "framer-motion";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "dark";
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
  primary:
    "bg-dark-brown text-soft-white hover:bg-deep-brown active:scale-[0.98]",
  secondary:
    "bg-cream text-dark-brown hover:bg-sand active:scale-[0.98]",
  ghost:
    "bg-transparent text-dark-brown hover:bg-cream active:scale-[0.98]",
  outline:
    "bg-transparent border border-dark-brown text-dark-brown hover:bg-dark-brown hover:text-soft-white active:scale-[0.98]",
  dark:
    "bg-deep-brown text-cream hover:bg-dark-brown active:scale-[0.98]",
};

const sizeStyles: Record<Size, string> = {
  sm: "h-8 px-4 text-xs tracking-widest",
  md: "h-11 px-6 text-xs tracking-widest",
  lg: "h-13 px-8 text-xs tracking-widest",
  xl: "h-14 px-10 text-sm tracking-widest",
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
    "inline-flex items-center justify-center gap-2 font-sans font-medium uppercase tracking-widest",
    "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
    "rounded-none", // Nordic: no border radius on buttons
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
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
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

// Text link with underline animation
export function TextLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-block relative font-sans text-sm font-medium text-dark-brown",
        "after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-px after:w-0",
        "after:bg-dark-brown after:transition-all after:duration-300 after:ease-[cubic-bezier(0.16,1,0.3,1)]",
        "hover:after:w-full",
        className
      )}
    >
      {children}
    </Link>
  );
}
