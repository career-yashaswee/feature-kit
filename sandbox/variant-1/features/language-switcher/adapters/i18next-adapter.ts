import type { i18n } from "i18next";
import type { Language, LanguageSwitcherAdapter } from "../types";

export function createI18nextAdapter(
  i18n: i18n,
  languages: Language[]
): LanguageSwitcherAdapter {
  return {
    currentLanguage: i18n.language,
    languages,
    onChange: async (languageCode: string) => {
      await i18n.changeLanguage(languageCode);
    },
    persist: (languageCode: string) => {
      if (typeof window !== "undefined") {
        localStorage.setItem("i18nextLng", languageCode);
      }
    },
  };
}

