"use client";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface FilterFieldProps {
  id?: string;
  label: string;
  children: React.ReactNode;
  className?: string;
}

export function FilterField({ id, label, children, className }: FilterFieldProps) {
  return (
    <div className={cn("flex min-w-0 flex-col gap-1.5", className)}>
      <Label
        htmlFor={id}
        className="text-[12px] font-medium text-slate-600"
      >
        {label}
      </Label>
      {children}
    </div>
  );
}
