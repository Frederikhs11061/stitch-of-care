import { en, type Translations } from "./en";
import { da } from "./da";

export type Language = "da" | "en";
export type { Translations };

export const translations: Record<Language, Translations> = { en, da };
export { en, da };
