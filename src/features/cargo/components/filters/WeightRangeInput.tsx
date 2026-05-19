"use client";

import { Input } from "@/components/ui/input";
import { macControl } from "./macos-styles";
import { cn } from "@/lib/utils";

interface WeightRangeInputProps {
  minId?: string;
  maxId?: string;
  min: string;
  max: string;
  minPlaceholder: string;
  maxPlaceholder: string;
  onMinChange: (value: string) => void;
  onMaxChange: (value: string) => void;
}

const fieldClass = cn(
  macControl,
  "rounded-none border-0 shadow-none focus-visible:ring-0",
);

export function WeightRangeInput({
  minId,
  maxId,
  min,
  max,
  minPlaceholder,
  maxPlaceholder,
  onMinChange,
  onMaxChange,
}: WeightRangeInputProps) {
  return (
    <div className="flex h-8 items-stretch overflow-hidden rounded-md border border-black/[0.08] bg-white">
      <Input
        id={minId}
        type="number"
        min={0}
        placeholder={minPlaceholder}
        value={min}
        onChange={(e) => onMinChange(e.target.value)}
        className={cn(fieldClass, "border-r border-black/[0.06]")}
      />
      <span
        className="flex w-6 shrink-0 items-center justify-center border-r border-black/[0.06] bg-[#fafafa] text-[11px] text-slate-400"
        aria-hidden
      >
        —
      </span>
      <Input
        id={maxId}
        type="number"
        min={0}
        placeholder={maxPlaceholder}
        value={max}
        onChange={(e) => onMaxChange(e.target.value)}
        className={fieldClass}
      />
    </div>
  );
}
