import type { CargoItem } from "@/types/cargo";
import type { UIFilters } from "@/types/filters";
import { getRoutePoints } from "@/utils/format";

export function cargoHasOffers(item: CargoItem): boolean {
  if (item.offers_count != null) {
    return item.offers_count > 0;
  }
  const amount = item.vehicles_amount;
  const left = item.vehicles_left;
  if (amount == null || left == null) return false;
  return left < amount;
}

export function filterCargoItems(
  items: CargoItem[],
  ui: UIFilters,
  search?: string,
): CargoItem[] {
  return items.filter((item) => {
    const { load, unload } = getRoutePoints(item);

    if (ui.loadCity && load?.city_code !== ui.loadCity) return false;
    if (ui.unloadCity && unload?.city_code !== ui.unloadCity) return false;

    if (ui.transport && item.truck_type !== ui.transport) return false;

    if (ui.weightMin && (item.weight ?? 0) < Number(ui.weightMin)) return false;
    if (ui.weightMax && (item.weight ?? 0) > Number(ui.weightMax)) return false;

    if (ui.dateFrom && load?.date) {
      if (new Date(load.date) < new Date(ui.dateFrom)) return false;
    }
    if (ui.dateTo && load?.date) {
      if (new Date(load.date) > new Date(ui.dateTo)) return false;
    }

    if (ui.hasOffers && !cargoHasOffers(item)) return false;
    if (ui.favorite && !item.is_liked) return false;

    if (search) {
      const q = search.toLowerCase();
      const haystack = [
        item.name,
        item.contact_name,
        item.contact_phone,
        item.cargo_type?.name_uz,
        load?.city_name,
        unload?.city_name,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }

    return true;
  });
}

export function extractCityOptions(items: CargoItem[]): {
  load: { code: string; name: string }[];
  unload: { code: string; name: string }[];
} {
  const loadMap = new Map<string, string>();
  const unloadMap = new Map<string, string>();

  for (const item of items) {
    const { load, unload } = getRoutePoints(item);
    if (load?.city_code) {
      loadMap.set(load.city_code, load.city_name || load.city_code);
    }
    if (unload?.city_code) {
      unloadMap.set(unload.city_code, unload.city_name || unload.city_code);
    }
  }

  const toSorted = (m: Map<string, string>) =>
    [...m.entries()]
      .map(([code, name]) => ({ code, name }))
      .sort((a, b) => a.name.localeCompare(b.name));

  return { load: toSorted(loadMap), unload: toSorted(unloadMap) };
}

export function extractTransportOptions(items: CargoItem[]): string[] {
  const set = new Set<string>();
  for (const item of items) {
    if (item.truck_type) set.add(item.truck_type);
  }
  return [...set].sort();
}
