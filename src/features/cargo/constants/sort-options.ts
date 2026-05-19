import type { SortOption } from "@/types/cargo";

export const SORT_OPTIONS: SortOption[] = [
  "created_at:desc",
  "created_at:asc",
  "updated_at:desc",
];

/** i18n kalitlari — `:` i18next namespace ajratgichi bo‘lgani uchun alohida */
export const SORT_LABEL_KEYS: Record<SortOption, string> = {
  "created_at:desc": "sort.createdAtDesc",
  "created_at:asc": "sort.createdAtAsc",
  "updated_at:desc": "sort.updatedAtDesc",
};

export function getSortLabel(
  t: (key: string) => string,
  sort: SortOption,
): string {
  return t(SORT_LABEL_KEYS[sort]);
}
