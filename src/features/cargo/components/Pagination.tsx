"use client";

import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilterSelectContent } from "./filters/FilterSelectContent";
import { macPaginationBar, macSelectTrigger } from "@/lib/styles/macos-controls";
import { cn } from "@/lib/utils";

const LIMIT_OPTIONS = [10, 20, 50] as const;

const macPageBtn =
  "inline-flex size-8 shrink-0 items-center justify-center rounded-md border border-black/[0.08] bg-white text-slate-700 shadow-none transition-colors hover:bg-black/[0.03] disabled:pointer-events-none disabled:opacity-40 sm:size-7";

export interface PaginationProps {
  page: number;
  limit: number;
  total: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

export function Pagination({
  page,
  limit,
  total,
  onPageChange,
  onLimitChange,
}: PaginationProps) {
  const { t } = useTranslation();
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const canPrev = page > 1;
  const canNext = page < totalPages;
  const totalLabel = t("pagination.total", { count: total });
  const pageLabel = `${t("pagination.page")} ${page} ${t("pagination.of")} ${totalPages}`;

  const limitItems = useMemo(
    () =>
      LIMIT_OPTIONS.map((opt) => ({
        value: String(opt),
        label: String(opt),
      })),
    [],
  );

  return (
    <nav className={macPaginationBar} aria-label="Pagination">
      <p
        className="max-w-22 truncate text-[11px] text-slate-500 sm:max-w-none sm:text-[12px]"
        title={totalLabel}
        aria-label={totalLabel}
      >
        <span className="sm:hidden">{total}</span>
        <span className="hidden sm:inline">{totalLabel}</span>
      </p>

      <div className="flex items-center gap-0.5">
        <button
          type="button"
          className={macPageBtn}
          onClick={() => onPageChange(page - 1)}
          disabled={!canPrev}
          aria-label={t("pagination.previous")}
        >
          <ChevronLeft className="size-3.5" />
        </button>

        <span
          className="min-w-9 px-0.5 text-center text-[11px] tabular-nums text-slate-600 sm:min-w-10 sm:text-[12px]"
          aria-live="polite"
          aria-label={pageLabel}
        >
          <span className="font-medium text-slate-800">{page}</span>
          <span className="text-slate-400">/</span>
          <span className="font-medium text-slate-800">{totalPages}</span>
        </span>

        <button
          type="button"
          className={macPageBtn}
          onClick={() => onPageChange(page + 1)}
          disabled={!canNext}
          aria-label={t("pagination.next")}
        >
          <ChevronRight className="size-3.5" />
        </button>
      </div>

      <label className="flex shrink-0 items-center gap-1.5 text-[11px] text-slate-600 sm:text-[12px]">
        <span className="hidden sm:inline">{t("pagination.limit")}</span>
        <Select
          items={limitItems}
          value={String(limit)}
          onValueChange={(v) => v && onLimitChange(Number(v))}
        >
          <SelectTrigger
            aria-label={t("pagination.limit")}
            className={cn(
              macSelectTrigger,
              "h-7 w-20 px-1.5 text-[12px] shadow-none sm:w-14",
            )}
          >
            <SelectValue />
          </SelectTrigger>
          <FilterSelectContent>
            {limitItems.map((item) => (
              <SelectItem
                key={item.value}
                value={item.value}
                label={item.label}
              >
                {item.label}
              </SelectItem>
            ))}
          </FilterSelectContent>
        </Select>
      </label>
    </nav>
  );
}
