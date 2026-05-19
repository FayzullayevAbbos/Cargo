"use client";

import { useTranslation } from "react-i18next";
import type { SortOption } from "@/types/cargo";
import type { UIFilters } from "@/types/filters";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getSortSelectItems,
  getTransportSelectItems,
} from "@/features/cargo/utils/filterSelectOptions";
import {
  filterBody,
  filterRow,
  filterRow3,
  filterRowDivider,
  selectTrigger,
} from "@/lib/styles/control-styles";
import { cn } from "@/lib/utils";
import { FilterSelectContent } from "../filters/FilterSelectContent";
import { FilterField } from "../filters/FilterField";
import { CitySelect } from "../filters/CitySelect";
import { DateRangePicker } from "../filters/DateRangePicker";
import { WeightRangeInput } from "../filters/WeightRangeInput";
import { FilterToggleGroup } from "../filters/FilterToggleGroup";

export interface FilterPanelBodyProps {
  uiFilters: UIFilters;
  onUiFiltersChange: (partial: Partial<UIFilters>) => void;
  loadCities: { code: string; name: string }[];
  unloadCities: { code: string; name: string }[];
  transportOptions: string[];
}

export function FilterPanelBody({
  uiFilters,
  onUiFiltersChange,
  loadCities,
  unloadCities,
  transportOptions,
}: FilterPanelBodyProps) {
  const { t, i18n } = useTranslation();
  const transportItems = getTransportSelectItems(transportOptions, t);
  const sortItems = getSortSelectItems(t);

  return (
    <div className={filterBody}>
      <div className={cn(filterRow, filterRowDivider)}>
        <FilterField id="load-city" label={t("filters.loadCity")}>
          <CitySelect
            id="load-city"
            value={uiFilters.loadCity}
            onChange={(loadCity) => onUiFiltersChange({ loadCity })}
            placeholder={t("filters.fromPlaceholder")}
            allLabel={t("filters.allCities")}
            cities={loadCities}
          />
        </FilterField>

        <FilterField id="unload-city" label={t("filters.unloadCity")}>
          <CitySelect
            id="unload-city"
            value={uiFilters.unloadCity}
            onChange={(unloadCity) => onUiFiltersChange({ unloadCity })}
            placeholder={t("filters.toPlaceholder")}
            allLabel={t("filters.allCities")}
            cities={unloadCities}
          />
        </FilterField>

        <FilterField id="transport" label={t("filters.transport")}>
          <Select
            items={transportItems}
            value={uiFilters.transport || "all"}
            onValueChange={(v) =>
              onUiFiltersChange({ transport: !v || v === "all" ? "" : v })
            }
          >
            <SelectTrigger
              id="transport"
              className={cn(selectTrigger, "shadow-none")}
            >
              <SelectValue placeholder={t("filters.transportPlaceholder")} />
            </SelectTrigger>
            <FilterSelectContent>
              <SelectItem value="all" label={t("filters.allTransport")}>
                {t("filters.allTransport")}
              </SelectItem>
              {transportOptions.map((tr) => (
                <SelectItem key={tr} value={tr} label={tr}>
                  {tr}
                </SelectItem>
              ))}
            </FilterSelectContent>
          </Select>
        </FilterField>

        <FilterField id="weight-min" label={t("filters.weight")}>
          <WeightRangeInput
            minId="weight-min"
            maxId="weight-max"
            min={uiFilters.weightMin}
            max={uiFilters.weightMax}
            minPlaceholder={t("filters.min")}
            maxPlaceholder={t("filters.max")}
            onMinChange={(weightMin) => onUiFiltersChange({ weightMin })}
            onMaxChange={(weightMax) => onUiFiltersChange({ weightMax })}
          />
        </FilterField>
      </div>

      <div className={filterRow3}>
        <FilterField id="date-range" label={t("filters.date")}>
          <DateRangePicker
            id="date-range"
            dateFrom={uiFilters.dateFrom}
            dateTo={uiFilters.dateTo}
            onChange={({ dateFrom, dateTo }) =>
              onUiFiltersChange({ dateFrom, dateTo })
            }
            placeholder={`${t("filters.dateStart")} — ${t("filters.dateEnd")}`}
            localeCode={i18n.language}
          />
        </FilterField>

        <FilterField label={t("filters.options")}>
          <FilterToggleGroup
            options={[
              {
                id: "has-offers",
                label: t("filters.hasOffers"),
                checked: uiFilters.hasOffers,
                onCheckedChange: (hasOffers) => onUiFiltersChange({ hasOffers }),
              },
              {
                id: "favorite",
                label: t("filters.favorite"),
                checked: uiFilters.favorite,
                onCheckedChange: (favorite) => onUiFiltersChange({ favorite }),
              },
            ]}
          />
        </FilterField>

        <FilterField id="sort" label={t("filters.sort")}>
          <Select
            items={sortItems}
            value={uiFilters.sort}
            onValueChange={(v) =>
              v && onUiFiltersChange({ sort: v as SortOption })
            }
          >
            <SelectTrigger id="sort" className={cn(selectTrigger, "shadow-none")}>
              <SelectValue placeholder={t("filters.sort")} />
            </SelectTrigger>
            <FilterSelectContent>
              {sortItems.map((item) => (
                <SelectItem key={item.value} value={item.value} label={item.label}>
                  {item.label}
                </SelectItem>
              ))}
            </FilterSelectContent>
          </Select>
        </FilterField>
      </div>
    </div>
  );
}
