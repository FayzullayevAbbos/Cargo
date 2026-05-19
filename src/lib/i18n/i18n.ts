import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import uz from "./locales/uz.json";
import en from "./locales/en.json";
import ru from "./locales/ru.json";

const LANGUAGE_KEY = "cargo_app_language";

export const SUPPORTED_LANGUAGES = ["uz", "en", "ru"] as const;
export type AppLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export function getInitialLanguage(): AppLanguage {
  if (typeof window === "undefined") return "uz";
  const stored = localStorage.getItem(LANGUAGE_KEY);
  if (stored && SUPPORTED_LANGUAGES.includes(stored as AppLanguage)) {
    return stored as AppLanguage;
  }
  return "uz";
}

export function persistLanguage(lang: AppLanguage): void {
  localStorage.setItem(LANGUAGE_KEY, lang);
}

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: {
      uz: { translation: uz },
      en: { translation: en },
      ru: { translation: ru },
    },
    lng: "uz",
    fallbackLng: "uz",
    interpolation: { escapeValue: false },
  });
}

export default i18n;
