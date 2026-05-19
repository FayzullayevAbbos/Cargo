import type { AppLanguage } from "@/lib/i18n/i18n";
import type { CargoItem, RoutePoint } from "@/types/cargo";

export function formatDate(dateStr: string, locale: string): string {
  try {
    return new Intl.DateTimeFormat(locale, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(dateStr));
  } catch {
    return dateStr;
  }
}

export function formatDateTime(dateStr: string, locale: string): string {
  try {
    return new Intl.DateTimeFormat(locale, {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(new Date(dateStr));
  } catch {
    return dateStr;
  }
}

export function countryCodeToFlag(code?: string): string {
  if (!code || code.length !== 2) return "🏳️";
  const upper = code.toUpperCase();
  return String.fromCodePoint(
    ...[...upper].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65),
  );
}

export function formatPayment(
  amount: number | null,
  currency: string | null,
): string {
  if (amount == null) return "—";
  const symbol =
    currency === "USD" ? "$" : currency === "UZS" ? "" : "";
  const formatted = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(amount);
  if (currency === "USD") return `${symbol}${formatted}`;
  return currency ? `${formatted} ${currency}` : formatted;
}

export function getPaymentMethodLabel(
  type: string | null | undefined,
  t: (key: string) => string,
): string {
  if (!type) return "";
  return t(`paymentMethods.${type}`);
}

export function getCargoTypeName(
  item: CargoItem,
  lang: AppLanguage,
): string {
  if (!item.cargo_type) return item.name ?? "—";
  const map: Record<AppLanguage, keyof typeof item.cargo_type> = {
    uz: "name_uz",
    en: "name_en",
    ru: "name_ru",
  };
  return (
    (item.cargo_type[map[lang]] as string) ||
    item.cargo_type.name_uz ||
    item.name ||
    "—"
  );
}

export function getRoutePoints(item: CargoItem): {
  load: RoutePoint | undefined;
  unload: RoutePoint | undefined;
} {
  const sorted = [...(item.route_points ?? [])].sort(
    (a, b) => a.point_order - b.point_order,
  );
  return {
    load: sorted.find((p) => p.type === "LOAD"),
    unload: sorted.find((p) => p.type === "UNLOAD"),
  };
}

export function formatWeightVolume(
  weight: number | null,
  volume: number | null,
): string {
  const parts: string[] = [];
  if (weight != null) parts.push(`${weight} t`);
  if (volume != null) parts.push(`${volume} m³`);
  return parts.length ? parts.join(", ") : "—";
}

export function getTransportLabel(item: CargoItem): string {
  const parts = [
    item.truck_type,
    item.trailer_plate_type,
    item.power_plate_type,
  ].filter(Boolean);
  return parts.length ? parts.join(" / ") : "—";
}

export function getInitials(name: string | null | undefined): string {
  if (!name) return "??";
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
