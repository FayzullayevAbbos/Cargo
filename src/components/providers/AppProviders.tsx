"use client";

import { QueryProvider } from "@/lib/react-query/QueryProvider";
import "@/lib/i18n/i18n";
import { useEffect, useState } from "react";
import i18n, { getInitialLanguage } from "@/lib/i18n/i18n";

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const lang = getInitialLanguage();
    i18n.changeLanguage(lang).then(() => setReady(true));
  }, []);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div
          className="h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-blue-600"
          role="status"
          aria-label="Loading"
        />
      </div>
    );
  }

  return <QueryProvider>{children}</QueryProvider>;
}
