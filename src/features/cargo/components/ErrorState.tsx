"use client";

import { useTranslation } from "react-i18next";
import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  const { t } = useTranslation();

  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center rounded-xl border border-red-200 bg-red-50 px-6 py-12 text-center"
    >
      <AlertCircle className="mb-3 h-10 w-10 text-red-500" aria-hidden />
      <h3 className="text-lg font-semibold text-red-900">
        {t("states.errorTitle")}
      </h3>
      <p className="mt-2 max-w-md text-sm text-red-700">
        {message ?? t("states.errorMessage")}
      </p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          <RefreshCw className="h-4 w-4" aria-hidden />
          {t("states.retry")}
        </button>
      )}
    </div>
  );
}
