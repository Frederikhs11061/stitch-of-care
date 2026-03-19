import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(dkk: number, eur: number, lang: "da" | "en"): string {
  if (lang === "da") return `${dkk} kr.`;
  return `€${eur}`;
}

export function formatDate(iso: string, lang: "da" | "en"): string {
  return new Intl.DateTimeFormat(lang === "da" ? "da-DK" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
