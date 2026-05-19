import { format } from "date-fns";
import type { Locale } from "date-fns";
import type { TFunction } from "i18next";
import { getSortLabel } from "@/features/cargo/constants/sort-options";
import type { ActiveFilterChip } from "@/features/cargo/types/filter-chip";
import { DEFAULT_UI_FILTERS, type UIFilters } from "@/types/filters";

function cityName(
  code: string,
  list: { code: string; name: string }[],
): string {
  return list.find((c) => c.code === code)?.name ?? code;
}

function formatDateLabel(
  from: string,
  to: string,
  dateLocale: Locale,
  t: TFunction,
): string {
  const f = from ? new Date(from + "T00:00:00") : null;
  const toDate = to ? new Date(to + "T00:00:00") : null;
  if (f && toDate) {
    return `${format(f, "d MMM", { locale: dateLocale })} — ${format(toDate, "d MMM yyyy", { locale: dateLocale })}`;
  }
  if (f) return format(f, "d MMM yyyy", { locale: dateLocale });
  return t("filters.dateActive");
}

export interface BuildFilterChipsParams {
  uiFilters: UIFilters;
  loadCities: { code: string; name: string }[];
  unloadCities: { code: string; name: string }[];
  dateLocale: Locale;
  t: TFunction;
  onChange: (partial: Partial<UIFilters>) => void;
}

export function buildActiveFilterChips({
  uiFilters,
  loadCities,
  unloadCities,
  dateLocale,
  t,
  onChange,
}: BuildFilterChipsParams): ActiveFilterChip[] {
  const result: ActiveFilterChip[] = [];

  if (uiFilters.loadCity) {
    result.push({
      id: "loadCity",
      label: `${t("filters.loadCity")}: ${cityName(uiFilters.loadCity, loadCities)}`,
      onRemove: () => onChange({ loadCity: "" }),
    });
  }
  if (uiFilters.unloadCity) {
    result.push({
      id: "unloadCity",
      label: `${t("filters.unloadCity")}: ${cityName(uiFilters.unloadCity, unloadCities)}`,
      onRemove: () => onChange({ unloadCity: "" }),
    });
  }
  if (uiFilters.transport) {
    result.push({
      id: "transport",
      label: `${t("filters.transport")}: ${uiFilters.transport}`,
      onRemove: () => onChange({ transport: "" }),
    });
  }
  if (uiFilters.weightMin || uiFilters.weightMax) {
    const w =
      uiFilters.weightMin && uiFilters.weightMax
        ? `${uiFilters.weightMin}–${uiFilters.weightMax} t`
        : uiFilters.weightMin
          ? `≥ ${uiFilters.weightMin} t`
          : `≤ ${uiFilters.weightMax} t`;
    result.push({
      id: "weight",
      label: `${t("filters.weight")}: ${w}`,
      onRemove: () => onChange({ weightMin: "", weightMax: "" }),
    });
  }
  if (uiFilters.dateFrom || uiFilters.dateTo) {
    result.push({
      id: "date",
      label: formatDateLabel(
        uiFilters.dateFrom,
        uiFilters.dateTo,
        dateLocale,
        t,
      ),
      onRemove: () => onChange({ dateFrom: "", dateTo: "" }),
    });
  }
  if (uiFilters.hasOffers) {
    result.push({
      id: "hasOffers",
      label: t("filters.hasOffers"),
      onRemove: () => onChange({ hasOffers: false }),
    });
  }
  if (uiFilters.favorite) {
    result.push({
      id: "favorite",
      label: t("filters.favorite"),
      onRemove: () => onChange({ favorite: false }),
    });
  }
  if (uiFilters.sort !== DEFAULT_UI_FILTERS.sort) {
    result.push({
      id: "sort",
      label: getSortLabel(t, uiFilters.sort),
      onRemove: () => onChange({ sort: DEFAULT_UI_FILTERS.sort }),
    });
  }

  return result;
}
