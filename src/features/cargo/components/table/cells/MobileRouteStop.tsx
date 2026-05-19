import type { RoutePoint } from "@/types/cargo";
import { countryCodeToFlag, formatDateTime } from "@/utils/format";

interface MobileRouteStopProps {
  label: string;
  point: RoutePoint | undefined;
  locale: string;
}

export function MobileRouteStop({ label, point, locale }: MobileRouteStopProps) {
  return (
    <div className="min-w-0">
      <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.04em] text-slate-400">
        {label}
      </p>
      {!point ? (
        <span className="text-[13px] text-slate-400">—</span>
      ) : (
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-lg leading-none">
              {countryCodeToFlag(point.country_code)}
            </span>
            <span className="truncate text-[15px] font-semibold leading-tight text-slate-900">
              {point.city_name || point.city_code}
            </span>
          </div>
          <p className="mt-0.5 pl-7 text-[12px] text-slate-500">
            {formatDateTime(point.date, locale)}
          </p>
        </div>
      )}
    </div>
  );
}
