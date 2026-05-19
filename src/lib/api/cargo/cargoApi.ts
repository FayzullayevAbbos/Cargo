import { axiosInstance } from "@/lib/api/axiosInstance";
import type { CargoListParams, CargoListResponse } from "@/types/cargo";

export async function fetchCargoList(
  params: CargoListParams,
): Promise<CargoListResponse> {
  const { data } = await axiosInstance.get<CargoListResponse>(
    "/dispatchers/cargo/all",
    {
      params: {
        page: params.page,
        limit: params.limit,
        sort: params.sort,
        ...(params.status ? { status: params.status } : {}),
        ...(params.search ? { search: params.search } : {}),
      },
    },
  );
  return data;
}
