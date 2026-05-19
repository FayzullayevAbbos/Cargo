"use client";

import { X } from "lucide-react";
import type { ActiveFilterChip } from "./filter-helpers";
import { cn } from "@/lib/utils";

interface FilterChipsProps {
  chips: ActiveFilterChip[];
  className?: string;
}

export function FilterChips({ chips, className }: FilterChipsProps) {
  if (chips.length === 0) return null;

  return (
    <>
      {chips.map((chip) => (
        <button
          key={chip.id}
          type="button"
          onClick={chip.onRemove}
          className={cn(
            "inline-flex max-w-[220px] items-center gap-0.5 rounded-md border border-black/[0.08] bg-[#f5f5f7] py-0.5 pr-0.5 pl-2 text-[12px] text-slate-700 transition-colors hover:border-black/[0.12] hover:bg-[#ebebeb]",
            className,
          )}
        >
          <span className="truncate">{chip.label}</span>
          <span className="flex size-5 shrink-0 items-center justify-center rounded text-slate-400 hover:text-slate-600">
            <X className="size-3" strokeWidth={2.5} />
          </span>
        </button>
      ))}
    </>
  );
}
