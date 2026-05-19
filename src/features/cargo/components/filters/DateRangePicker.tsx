"use client";

import { useMemo } from "react";
import { format } from "date-fns";
import { uz, enUS, ru } from "date-fns/locale";
import { CalendarIcon, X } from "lucide-react";
import type { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { macSelectContent, macSelectTrigger } from "./macos-styles";
import { cn } from "@/lib/utils";

const LOCALES = { uz, en: enUS, ru } as const;

function parseDate(value: string): Date | undefined {
  if (!value) return undefined;
  const date = new Date(value + "T00:00:00");
  return Number.isNaN(date.getTime()) ? undefined : date;
}

function toDateString(date: Date | undefined): string {
  if (!date) return "";
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

interface DateRangePickerProps {
  id?: string;
  dateFrom: string;
  dateTo: string;
  onChange: (range: { dateFrom: string; dateTo: string }) => void;
  placeholder: string;
  localeCode?: string;
  className?: string;
}

export function DateRangePicker({
  id,
  dateFrom,
  dateTo,
  onChange,
  placeholder,
  localeCode = "uz",
  className,
}: DateRangePickerProps) {
  const locale =
    LOCALES[localeCode as keyof typeof LOCALES] ?? LOCALES.uz;

  const selected: DateRange | undefined = useMemo(() => {
    const from = parseDate(dateFrom);
    const to = parseDate(dateTo);
    if (!from && !to) return undefined;
    return { from, to };
  }, [dateFrom, dateTo]);

  const label = useMemo(() => {
    const from = parseDate(dateFrom);
    const to = parseDate(dateTo);
    if (from && to) {
      return `${format(from, "d MMM", { locale })} — ${format(to, "d MMM yyyy", { locale })}`;
    }
    if (from) {
      return format(from, "d MMM yyyy", { locale });
    }
    return placeholder;
  }, [dateFrom, dateTo, locale, placeholder]);

  const hasValue = Boolean(dateFrom || dateTo);

  const clear = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onChange({ dateFrom: "", dateTo: "" });
  };

  return (
    <Popover>
      <PopoverTrigger
        id={id}
        render={
          <Button
            variant="outline"
            className={cn(
              macSelectTrigger,
              "relative justify-start gap-2 pr-7 font-normal shadow-none",
              !hasValue && "text-slate-400",
              hasValue && "text-slate-800",
              className,
            )}
          />
        }
      >
        <CalendarIcon className="size-3.5 shrink-0 text-slate-400" />
        <span className="truncate text-left">{label}</span>
        {hasValue && (
          <span
            role="button"
            tabIndex={0}
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onClick={clear}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                e.stopPropagation();
                onChange({ dateFrom: "", dateTo: "" });
              }
            }}
            className="absolute top-1/2 right-1.5 flex size-5 -translate-y-1/2 items-center justify-center rounded text-slate-400 hover:bg-black/[0.06] hover:text-slate-600"
            aria-label="Clear"
          >
            <X className="size-3" />
          </span>
        )}
      </PopoverTrigger>
      <PopoverContent
        className={cn(macSelectContent, "w-auto p-0")}
        align="start"
      >
        <Calendar
          mode="range"
          numberOfMonths={2}
          selected={selected}
          onSelect={(range) => {
            onChange({
              dateFrom: toDateString(range?.from),
              dateTo: toDateString(range?.to),
            });
          }}
          locale={locale}
          defaultMonth={selected?.from ?? new Date()}
        />
      </PopoverContent>
    </Popover>
  );
}
