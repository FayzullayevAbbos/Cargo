"use client";

import { useTranslation } from "react-i18next";
import { PackageOpen } from "lucide-react";

export function EmptyState() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center">
      <PackageOpen className="mb-3 h-12 w-12 text-slate-400" aria-hidden />
      <h3 className="text-lg font-semibold text-slate-800">
        {t("states.emptyTitle")}
      </h3>
      <p className="mt-2 max-w-sm text-sm text-slate-500">
        {t("states.emptyMessage")}
      </p>
    </div>
  );
}
