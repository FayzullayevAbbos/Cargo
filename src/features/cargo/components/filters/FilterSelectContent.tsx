"use client";

import { SelectContent } from "@/components/ui/select";
import { macSelectContent } from "./macos-styles";
import { cn } from "@/lib/utils";

/** Select dropdown — always opens below trigger, same width */
export function FilterSelectContent({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <SelectContent
      side="bottom"
      align="start"
      sideOffset={4}
      alignItemWithTrigger={false}
      className={cn(macSelectContent, "z-[200]", className)}
    >
      {children}
    </SelectContent>
  );
}
