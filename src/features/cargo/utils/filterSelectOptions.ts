import type { TFunction } from "i18next";
import {
  SORT_OPTIONS,
  getSortLabel,
} from "@/features/cargo/constants/sort-options";

export function getTransportSelectItems(
  transportOptions: string[],
  t: TFunction,
): { value: string; label: string }[] {
  return [
    { value: "all", label: t("filters.allTransport") },
    ...transportOptions.map((tr) => ({ value: tr, label: tr })),
  ];
}

export function getSortSelectItems(t: TFunction): { value: string; label: string }[] {
  return SORT_OPTIONS.map((sort) => ({
    value: sort,
    label: getSortLabel(t, sort),
  }));
}
