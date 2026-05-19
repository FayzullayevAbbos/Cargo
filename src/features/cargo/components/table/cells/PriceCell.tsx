import type { CargoItem } from "@/types/cargo";
import { formatPayment } from "@/utils/format";

interface PriceCellProps {
  payment: CargoItem["payment"];
  method: string | null;
  t: (key: string) => string;
}

export function PriceCell({ payment, method, t }: PriceCellProps) {
  if (payment?.price_request) {
    return (
      <span className="text-[13px] font-medium text-[#AF52DE]">
        {t("table.priceRequest")}
      </span>
    );
  }
  if (payment?.is_negotiable) {
    return (
      <span className="text-[13px] text-slate-500">{t("table.negotiable")}</span>
    );
  }
  return (
    <p className="text-[13px] font-semibold text-[#007AFF]">
      {formatPayment(payment?.total_amount ?? null, payment?.total_currency ?? null)}
      {method && (
        <span className="ml-1 font-normal text-slate-500">{method}</span>
      )}
    </p>
  );
}
