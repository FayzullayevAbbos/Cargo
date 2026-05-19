"use client";

import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { cn } from "@/lib/utils";
import { useCargoListPage } from "@/features/cargo/hooks/useCargoListPage";
import { CargoTableSkeleton } from "./CargoTableSkeleton";
import { Pagination } from "./Pagination";
import { ErrorState } from "./ErrorState";
import { EmptyState } from "./EmptyState";
import { FilterPanel } from "./FilterPanel/FilterPanel";
import { CargoTable } from "./table/CargoTable";

export function CargoListPage() {
  const page = useCargoListPage();

  return (
    <AppShell>
      <PageHeader
        search={page.search}
        onSearchChange={page.setSearch}
        onSearchSubmit={page.handleSearchSubmit}
      />

      <FilterPanel
        uiFilters={page.uiFilters}
        onUiFiltersChange={page.handleUiFiltersChange}
        onReset={page.resetFilters}
        loadCities={page.cityOptions.load}
        unloadCities={page.cityOptions.unload}
        transportOptions={page.transportOptions}
      />

      {page.isLoading && (
        <CargoTableSkeleton rows={page.apiFilters.limit > 10 ? 8 : 5} />
      )}

      {!page.isLoading && page.isError && (
        <ErrorState
          message={page.errorMessage}
          onRetry={() => void page.refetch()}
        />
      )}

      {!page.isLoading && !page.isError && page.filteredItems.length === 0 && (
        <EmptyState />
      )}

      {!page.isLoading && !page.isError && page.filteredItems.length > 0 && (
        <div
          className={cn(
            "flex flex-col gap-3",
            page.isFetching && "opacity-60 transition-opacity duration-200",
          )}
        >
          <CargoTable items={page.filteredItems} language={page.language} />
          <Pagination
            page={page.apiFilters.page}
            limit={page.apiFilters.limit}
            total={page.paginationTotal}
            onPageChange={page.setPage}
            onLimitChange={page.setLimit}
          />
        </div>
      )}
    </AppShell>
  );
}
