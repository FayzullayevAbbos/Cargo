import { uz, enUS, ru } from "date-fns/locale";

export const DATE_LOCALES = { uz, en: enUS, ru } as const;

export function getDateLocale(language: string) {
  return DATE_LOCALES[language as keyof typeof DATE_LOCALES] ?? DATE_LOCALES.uz;
}
