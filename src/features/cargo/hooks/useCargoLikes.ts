"use client";

import { useCallback, useState } from "react";

export function useCargoLikes() {
  const [liked, setLiked] = useState<Set<string>>(() => new Set());

  const toggleLike = useCallback((id: string) => {
    setLiked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const isLiked = useCallback(
    (id: string, serverLiked?: boolean) => liked.has(id) || !!serverLiked,
    [liked],
  );

  return { toggleLike, isLiked };
}
