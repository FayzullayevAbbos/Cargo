"use client";

import { useTranslation } from "react-i18next";
import { setStoredLanguage } from "@/lib/api/axiosInstance";
import { persistLanguage, type AppLanguage } from "./i18n";

export function useAppLanguage() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language as AppLanguage;

  const changeLanguage = (lang: AppLanguage) => {
    persistLanguage(lang);
    setStoredLanguage(lang);
    void i18n.changeLanguage(lang);
  };

  return { currentLang, changeLanguage };
}
