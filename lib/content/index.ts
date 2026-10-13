import { en } from "./en";
import { es } from "./es";

export const dictionaries = { es, en };

export type Lang = keyof typeof dictionaries;

export type Content = typeof es;

export const LANG_COOKIE = "lang";

export const LANGS = ["es", "en"] as const satisfies readonly Lang[];

export const DEFAULT_LANG: Lang = "es";
