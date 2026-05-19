export type CargoStatus =
  | "SEARCHING_ALL"
  | "SEARCHING"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED"
  | "MODERATION"
  | "REJECTED";

export type SortOption = "created_at:desc" | "created_at:asc" | "updated_at:desc";

export interface CargoType {
  id: string;
  code: string;
  name_uz: string;
  name_en: string;
  name_ru: string;
}

export interface RoutePoint {
  id: string;
  type: "LOAD" | "UNLOAD" | string;
  address: string;
  city_name: string;
  city_code: string;
  country_code?: string;
  date: string;
  point_order: number;
}

export interface CargoPayment {
  total_amount: number | null;
  total_currency: string | null;
  with_prepayment: boolean;
  is_negotiable: boolean;
  price_request: boolean;
  prepayment_type?: string | null;
  remaining_type?: string | null;
}

export interface CargoItem {
  id: string;
  name: string | null;
  status: string;
  weight: number | null;
  volume: number | null;
  contact_name: string | null;
  contact_phone: string | null;
  created_at: string;
  updated_at: string;
  cargo_type: CargoType | null;
  route_points: RoutePoint[];
  payment: CargoPayment | null;
  truck_type: string | null;
  trailer_plate_type?: string | null;
  power_plate_type?: string | null;
  vehicles_amount: number | null;
  vehicles_left: number | null;
  offers_count?: number | null;
  comment: string | null;
  is_liked?: boolean;
}

export interface CargoListParams {
  page: number;
  limit: number;
  sort: SortOption;
  status: CargoStatus | "";
  search?: string;
}

export interface CargoListResponse {
  status: string;
  code: number;
  description: string;
  data: {
    items: CargoItem[];
    total: number;
  };
}
