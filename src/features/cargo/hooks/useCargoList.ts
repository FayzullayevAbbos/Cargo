"use client";

import { useQuery } from "@tanstack/react-query";
import { cargoKeys } from "@/features/cargo/queries/query-keys";
import { fetchCargoList } from "@/lib/api/cargo";
import type { CargoListParams } from "@/types/cargo";

export function useCargoList(params: CargoListParams) {
  return useQuery({
    queryKey: cargoKeys.list(params),
    queryFn: () => fetchCargoList(params),
  });
}
