"use client";

import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { hasActiveClientFilters } from "@/features/cargo/utils/filterState";
import {
  extractCityOptions,
  extractTransportOptions,
  filterCargoItems,
} from "@/features/cargo/utils/filterCargo";
import { getApiErrorMessage } from "@/lib/api/errors";
import type { AppLanguage } from "@/lib/i18n/i18n";
import type { CargoListParams } from "@/types/cargo";
import { DEFAULT_UI_FILTERS, type UIFilters } from "@/types/filters";
import { useCargoList } from "./useCargoList";

const DEFAULT_API_FILTERS: CargoListParams = {
  page: 1,
  limit: 20,
  sort: "created_at:desc",
  status: "SEARCHING_ALL",
};

export function useCargoListPage() {
  const { i18n } = useTranslation();
  const language = i18n.language as AppLanguage;

  const [apiFilters, setApiFilters] = useState<CargoListParams>(DEFAULT_API_FILTERS);
  const [uiFilters, setUiFilters] = useState<UIFilters>(DEFAULT_UI_FILTERS);
  const [search, setSearch] = useState("");

  const trimmedSearch = search.trim() || undefined;

  const { data, isLoading, isError, error, refetch, isFetching } = useCargoList({
    ...apiFilters,
    sort: uiFilters.sort,
    search: trimmedSearch,
  });

  const rawItems = data?.data?.items ?? [];
  const apiTotal = data?.data?.total ?? 0;

  const cityOptions = useMemo(() => extractCityOptions(rawItems), [rawItems]);
  const transportOptions = useMemo(
    () => extractTransportOptions(rawItems),
    [rawItems],
  );

  const filteredItems = useMemo(
    () => filterCargoItems(rawItems, uiFilters, trimmedSearch),
    [rawItems, uiFilters, trimmedSearch],
  );

  const isClientFiltered = hasActiveClientFilters(uiFilters);

  const paginationTotal = isClientFiltered ? filteredItems.length : apiTotal;

  const handleUiFiltersChange = useCallback((partial: Partial<UIFilters>) => {
    setUiFilters((prev) => {
      const next = { ...prev, ...partial };
      if (partial.sort && partial.sort !== prev.sort) {
        setApiFilters((f) => ({ ...f, page: 1, sort: partial.sort! }));
      } else if (Object.keys(partial).some((key) => key !== "sort")) {
        setApiFilters((f) => ({ ...f, page: 1 }));
      }
      return next;
    });
  }, []);

  const resetFilters = useCallback(() => {
    setSearch("");
    setApiFilters((f) => ({ ...f, page: 1 }));
  }, []);

  const handleSearchSubmit = useCallback(() => {
    setApiFilters((f) => ({ ...f, page: 1 }));
  }, []);

  const setPage = useCallback((page: number) => {
    setApiFilters((prev) => ({ ...prev, page }));
  }, []);

  const setLimit = useCallback((limit: number) => {
    setApiFilters((prev) => ({ ...prev, limit, page: 1 }));
  }, []);

  const errorMessage = getApiErrorMessage(error);

  return {
    language,
    apiFilters,
    uiFilters,
    search,
    setSearch,
    cityOptions,
    transportOptions,
    filteredItems,
    paginationTotal,
    isClientFiltered,
    isLoading,
    isError,
    isFetching,
    errorMessage,
    refetch,
    handleUiFiltersChange,
    resetFilters,
    handleSearchSubmit,
    setPage,
    setLimit,
  };
}
