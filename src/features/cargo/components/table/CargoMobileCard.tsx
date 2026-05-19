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
  macMobileCard,
  macMobileCardDivider,
  macMobileSectionLabel,
} from "@/lib/styles/macos-controls";
import { cn } from "@/lib/utils";
import { CustomerCell } from "./cells/CustomerCell";
import { MobileRouteStop } from "./cells/MobileRouteStop";
import { PriceCell } from "./cells/PriceCell";
import { TableActions } from "./TableActions";

export interface CargoMobileCardProps {
  item: CargoItem;
  language: AppLanguage;
  locale: string;
  t: (key: string) => string;
  isLiked: boolean;
  onToggleLike: () => void;
}

export function CargoMobileCard({
  item,
  language,
  locale,
  t,
  isLiked,
  onToggleLike,
}: CargoMobileCardProps) {
  const { load, unload } = getRoutePoints(item);
  const payment = item.payment;
  const method = getPaymentMethodLabel(
    payment?.remaining_type ?? payment?.prepayment_type,
    t,
  );
  const transport = getTransportLabel(item);

  return (
    <article className={macMobileCard}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className={macMobileSectionLabel}>{t("table.price")}</p>
          <div className="mt-1">
            <PriceCell payment={payment} method={method} t={t} />
          </div>
        </div>
        <TableActions isLiked={isLiked} onToggleLike={onToggleLike} />
      </div>

      <div className={macMobileCardDivider} />

      <div className="space-y-3">
        <MobileRouteStop label={t("table.from")} point={load} locale={locale} />
        <MobileRouteStop label={t("table.to")} point={unload} locale={locale} />
      </div>

      <div className={macMobileCardDivider} />

      <div className="space-y-2.5">
        <div>
          <p className={macMobileSectionLabel}>{t("table.cargoCol")}</p>
          <p className="mt-1 text-[13px] font-medium text-slate-800">
            {formatWeightVolume(item.weight, item.volume)}
          </p>
          <p className="mt-0.5 text-[12px] text-slate-500">
            {getCargoTypeName(item, language)}
          </p>
        </div>

        {transport !== "—" && (
          <div>
            <p className={macMobileSectionLabel}>{t("table.transport")}</p>
            <p className="mt-1 flex items-start gap-1.5 text-[13px] text-slate-700">
              <Truck
                className="mt-0.5 size-3.5 shrink-0 text-slate-400"
                strokeWidth={1.75}
              />
              <span className="leading-snug">{transport}</span>
            </p>
          </div>
        )}
      </div>

      <div className={cn(macMobileCardDivider, "mb-0")} />

      <div>
        <p className={cn(macMobileSectionLabel, "mb-2")}>{t("table.customer")}</p>
        <CustomerCell item={item} />
      </div>
    </article>
  );
}
