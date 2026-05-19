"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

const FOOTER_COLUMNS = [
  ["useful", "distance", "versions"],
  ["contacts", "about", "contactInfo"],
  ["info", "privacy", "sitemap"],
] as const;

export function AppFooter() {
  const { t } = useTranslation();

  return (
    <footer className="mt-auto border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-[1400px] gap-8 px-4 py-10 sm:grid-cols-3 lg:px-6">
        {FOOTER_COLUMNS.map((column, i) => (
          <ul key={i} className="space-y-2.5">
            {column.map((key) => (
              <li key={key}>
                <Link
                  href="#"
                  className="text-sm text-slate-600 transition hover:text-[#1e3a5f]"
                >
                  {t(`footer.${key}`)}
                </Link>
              </li>
            ))}
          </ul>
        ))}
      </div>
      <div className="border-t border-slate-100 py-4 text-center">
        <p className="text-sm text-slate-500">{t("footer.mobileApp")}</p>
      </div>
    </footer>
  );
}
