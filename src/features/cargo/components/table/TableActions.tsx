"use client";

import { Heart, Share2 } from "lucide-react";
import {
  tableActionBtn,
  tableActionBtnActive,
} from "@/lib/styles/control-styles";
import { cn } from "@/lib/utils";

interface TableActionsProps {
  isLiked: boolean;
  onToggleLike: () => void;
}

export function TableActions({ isLiked, onToggleLike }: TableActionsProps) {
  return (
    <div className="flex items-center gap-0.5">
      <button
        type="button"
        onClick={onToggleLike}
        aria-pressed={isLiked}
        className={cn(tableActionBtn, isLiked && tableActionBtnActive)}
      >
        <Heart className={cn("size-3.5", isLiked && "fill-current")} />
        <span className="sr-only">Like</span>
      </button>
      <button type="button" className={tableActionBtn}>
        <Share2 className="size-3.5" />
        <span className="sr-only">Share</span>
      </button>
    </div>
  );
}
