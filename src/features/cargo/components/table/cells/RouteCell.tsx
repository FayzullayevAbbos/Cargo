import { countryCodeToFlag, formatDateTime, getRoutePoints } from "@/utils/format";

interface RouteCellProps {
  point: ReturnType<typeof getRoutePoints>["load"];
  locale: string;
}

export function RouteCell({ point, locale }: RouteCellProps) {
  if (!point) return <span className="text-[13px] text-slate-400">—</span>;

  return (
    <div className="space-y-0.5">
      <div className="flex items-center gap-1.5">
        <span className="text-base leading-none">
          {countryCodeToFlag(point.country_code)}
        </span>
        <span className="text-[13px] font-medium text-slate-800">
          {point.city_code}
        </span>
      </div>
      <p className="text-[11px] text-slate-500">
        {formatDateTime(point.date, locale)}
      </p>
    </div>
  );
}
