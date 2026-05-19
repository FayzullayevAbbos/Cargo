"use client";

import { useCallback, useEffect, useState } from "react";

export function useSidebarCollapsed(storageKey: string) {
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored === "true") setCollapsed(true);
    setMounted(true);
  }, [storageKey]);

  const toggle = useCallback(() => {
    setCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem(storageKey, String(next));
      return next;
    });
  }, [storageKey]);

  return { collapsed, mounted, toggle };
}
