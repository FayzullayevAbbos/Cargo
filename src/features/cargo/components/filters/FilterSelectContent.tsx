"use client";

import { SelectContent } from "@/components/ui/select";
import { selectContent } from "@/lib/styles/control-styles";
import { cn } from "@/lib/utils";

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
      className={cn(selectContent, "z-[200]", className)}
    >
      {children}
    </SelectContent>
  );
}
