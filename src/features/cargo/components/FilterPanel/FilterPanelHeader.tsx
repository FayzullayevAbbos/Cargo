"use client";

import { ChevronDown, Filter, RotateCcw } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { filterHeader } from "@/lib/styles/control-styles";
import { cn } from "@/lib/utils";

interface FilterPanelHeaderProps {
  activeCount: number;
  hasActive: boolean;
  expanded: boolean;
  onToggleExpanded: () => void;
  onReset: () => void;
}

export function FilterPanelHeader({
  activeCount,
  hasActive,
  expanded,
  onToggleExpanded,
  onReset,
}: FilterPanelHeaderProps) {
  const { t } = useTranslation();

  return (
    <div className={filterHeader}>
      <button
        type="button"
        onClick={onToggleExpanded}
        className="flex min-w-0 flex-1 items-center gap-2 rounded-md py-0.5 text-left transition-colors cursor-pointer"
      >
        <Filter className="size-3.5 shrink-0 text-slate-400" strokeWidth={2} />
        <span className="text-[13px] font-medium text-slate-800">
          {t("filters.title")}
        </span>
        {activeCount > 0 && (
          <span className="rounded-md bg-sarbon-navy/10 px-1.5 py-px text-[11px] font-semibold text-sarbon-navy tabular-nums">
            {activeCount}
          </span>
        )}
        <ChevronDown
          className={cn(
            "ml-auto size-4 text-slate-400 transition-transform duration-200",
            expanded && "rotate-180",
          )}
        />
      </button>

      {hasActive && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onReset}
          className="h-7 shrink-0 gap-1 px-2 text-[12px] font-normal text-slate-500 shadow-none hover:bg-black/[0.04] hover:text-slate-800"
        >
          <RotateCcw className="size-3" />
          {t("filters.reset")}
        </Button>
      )}
    </div>
  );
}
