"use client";

import { cn } from "@/lib/utils";

export interface FilterToggleOption {
  id: string;
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

interface FilterToggleGroupProps {
  options: FilterToggleOption[];
  className?: string;
}

export function FilterToggleGroup({ options, className }: FilterToggleGroupProps) {
  return (
    <div
      role="group"
      className={cn(
        "flex h-8 w-full gap-0.5 rounded-md border border-black/[0.08] bg-[#f5f5f7] p-0.5",
        className,
      )}
    >
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          aria-pressed={option.checked}
          onClick={() => option.onCheckedChange(!option.checked)}
          className={cn(
            "flex min-w-0 flex-1 items-center justify-center rounded-[5px] px-2 text-[12px] font-medium leading-none transition-all",
            option.checked
              ? "bg-white text-slate-900 shadow-[0_1px_2px_rgba(0,0,0,0.05)] ring-1 ring-black/[0.06]"
              : "text-slate-500 hover:text-slate-700",
          )}
        >
          <span className="truncate">{option.label}</span>
        </button>
      ))}
    </div>
  );
}
