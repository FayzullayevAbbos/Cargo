"use client";

import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { DEFAULT_UI_FILTERS, type UIFilters } from "@/types/filters";
import { buildActiveFilterChips } from "@/features/cargo/utils/buildFilterChips";
import { getDateLocale } from "@/features/cargo/utils/dateLocales";
import { macFilterPanel } from "@/lib/styles/macos-controls";
import { FilterChips } from "../filters/FilterChips";
import {
  countActiveFilters,
  isFiltersDefault,
} from "../filters/filter-helpers";
import { FilterPanelBody } from "./FilterPanelBody";
import { FilterPanelHeader } from "./FilterPanelHeader";

export interface FilterPanelProps {
  uiFilters: UIFilters;
  onUiFiltersChange: (partial: Partial<UIFilters>) => void;
  onReset?: () => void;
  loadCities: { code: string; name: string }[];
  unloadCities: { code: string; name: string }[];
  transportOptions: string[];
}

export function FilterPanel({
  uiFilters,
  onUiFiltersChange,
  onReset,
  loadCities,
  unloadCities,
  transportOptions,
}: FilterPanelProps) {
  const { t, i18n } = useTranslation();
  const [expanded, setExpanded] = useState(true);

  const activeCount = countActiveFilters(uiFilters);
  const hasActive = !isFiltersDefault(uiFilters);
  const dateLocale = getDateLocale(i18n.language);

  const chips = useMemo(
    () =>
      buildActiveFilterChips({
        uiFilters,
        loadCities,
        unloadCities,
        dateLocale,
        t,
        onChange: onUiFiltersChange,
      }),
    [uiFilters, loadCities, unloadCities, dateLocale, onUiFiltersChange, t],
  );

  const handleReset = () => {
    onUiFiltersChange(DEFAULT_UI_FILTERS);
    onReset?.();
  };

  return (
    <section className={macFilterPanel}>
      <FilterPanelHeader
        activeCount={activeCount}
        hasActive={hasActive}
        expanded={expanded}
        onToggleExpanded={() => setExpanded((v) => !v)}
        onReset={handleReset}
      />

      {expanded && (
        <>
          <FilterPanelBody
            uiFilters={uiFilters}
            onUiFiltersChange={onUiFiltersChange}
            loadCities={loadCities}
            unloadCities={unloadCities}
            transportOptions={transportOptions}
          />

          {chips.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 border-t border-black/[0.06] px-3.5 py-2">
              <span className="text-[11px] font-medium text-slate-400">
                {t("filters.activeLabel")}
              </span>
              <FilterChips chips={chips} className="border-0 px-1" />
            </div>
          )}
        </>
      )}
    </section>
  );
}
