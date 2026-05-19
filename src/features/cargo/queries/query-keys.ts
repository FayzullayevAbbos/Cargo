import type { CargoListParams } from "@/types/cargo";

export const cargoKeys = {
  all: ["cargo"] as const,
  lists: () => [...cargoKeys.all, "list"] as const,
  list: (params: CargoListParams) => [...cargoKeys.lists(), params] as const,
};
