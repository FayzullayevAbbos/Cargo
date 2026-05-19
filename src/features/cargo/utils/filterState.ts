import { DEFAULT_UI_FILTERS, type UIFilters } from "@/types/filters";

export function isFiltersDefault(ui: UIFilters): boolean {
  return (
    ui.loadCity === DEFAULT_UI_FILTERS.loadCity &&
    ui.unloadCity === DEFAULT_UI_FILTERS.unloadCity &&
    ui.transport === DEFAULT_UI_FILTERS.transport &&
    ui.weightMin === DEFAULT_UI_FILTERS.weightMin &&
    ui.weightMax === DEFAULT_UI_FILTERS.weightMax &&
    ui.dateFrom === DEFAULT_UI_FILTERS.dateFrom &&
    ui.dateTo === DEFAULT_UI_FILTERS.dateTo &&
    ui.hasOffers === DEFAULT_UI_FILTERS.hasOffers &&
    ui.favorite === DEFAULT_UI_FILTERS.favorite &&
    ui.sort === DEFAULT_UI_FILTERS.sort
  );
}

export function hasActiveClientFilters(ui: UIFilters): boolean {
  return !isFiltersDefault(ui);
}

export function countActiveFilters(ui: UIFilters): number {
  let n = 0;
  if (ui.loadCity) n++;
  if (ui.unloadCity) n++;
  if (ui.transport) n++;
  if (ui.weightMin || ui.weightMax) n++;
  if (ui.dateFrom || ui.dateTo) n++;
  if (ui.hasOffers) n++;
  if (ui.favorite) n++;
  if (ui.sort !== DEFAULT_UI_FILTERS.sort) n++;
  return n;
}
