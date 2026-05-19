import type { SortOption } from "./cargo";

export interface UIFilters {
  loadCity: string;
  unloadCity: string;
  transport: string;
  weightMin: string;
  weightMax: string;
  dateFrom: string;
  dateTo: string;
  hasOffers: boolean;
  favorite: boolean;
  sort: SortOption;
}

export const DEFAULT_UI_FILTERS: UIFilters = {
  loadCity: "",
  unloadCity: "",
  transport: "",
  weightMin: "",
  weightMax: "",
  dateFrom: "",
  dateTo: "",
  hasOffers: false,
  favorite: false,
  sort: "created_at:desc",
};
