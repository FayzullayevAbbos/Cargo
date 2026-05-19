"use client";

import { Truck } from "lucide-react";
import type { CargoItem } from "@/types/cargo";
import type { AppLanguage } from "@/lib/i18n/i18n";
import {
  formatWeightVolume,
  getCargoTypeName,
  getPaymentMethodLabel,
  getRoutePoints,
  getTransportLabel,
} from "@/utils/format";
import {
  macTableCell,
  macTableRow,
} from "@/lib/styles/macos-controls";
import { CustomerCell } from "./cells/CustomerCell";
import { PriceCell } from "./cells/PriceCell";
import { RouteCell } from "./cells/RouteCell";
import { TableActions } from "./TableActions";

export interface CargoRowProps {
  item: CargoItem;
  language: AppLanguage;
  locale: string;
  t: (key: string) => string;
  isLiked: boolean;
  onToggleLike: () => void;
}

export function CargoRow({
  item,
  language,
  locale,
  t,
  isLiked,
  onToggleLike,
}: CargoRowProps) {
  const { load, unload } = getRoutePoints(item);
  const payment = item.payment;
  const method = getPaymentMethodLabel(
    payment?.remaining_type ?? payment?.prepayment_type,
    t,
  );

  return (
    <tr className={macTableRow}>
      <td className={macTableCell}>
        <RouteCell point={load} locale={locale} />
      </td>
      <td className={macTableCell}>
        <RouteCell point={unload} locale={locale} />
      </td>
      <td className={macTableCell}>
        <PriceCell payment={payment} method={method} t={t} />
      </td>
      <td className={macTableCell}>
        <p className="text-[13px] font-medium text-slate-800">
          {formatWeightVolume(item.weight, item.volume)}
        </p>
        <p className="mt-0.5 text-[11px] text-slate-500">
          {getCargoTypeName(item, language)}
        </p>
      </td>
      <td className={macTableCell}>
        <div className="flex items-start gap-1.5 text-slate-700">
          <Truck
            className="mt-0.5 size-3.5 shrink-0 text-slate-400"
            strokeWidth={1.75}
          />
          <span className="text-[12px] leading-snug text-slate-600">
            {getTransportLabel(item)}
          </span>
        </div>
      </td>
      <td className={macTableCell}>
        <CustomerCell item={item} />
      </td>
      <td className={macTableCell}>
        <TableActions isLiked={isLiked} onToggleLike={onToggleLike} />
      </td>
    </tr>
  );
}
