import axios from "axios";

const LANGUAGE_KEY = "cargo_app_language";

export function getStoredLanguage(): string {
  if (typeof window === "undefined") return "uz";
  return localStorage.getItem(LANGUAGE_KEY) ?? "uz";
}

export function setStoredLanguage(lang: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(LANGUAGE_KEY, lang);
  }
}

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    Accept: "*/*",
    "X-Device-Type": "web",
  },
});

axiosInstance.interceptors.request.use((config) => {
  config.headers["X-Language"] = getStoredLanguage();
  config.headers["X-Client-Token"] =
    process.env.NEXT_PUBLIC_CLIENT_TOKEN ?? "";
  config.headers["X-User-Token"] = process.env.NEXT_PUBLIC_USER_TOKEN ?? "";
  return config;
});
