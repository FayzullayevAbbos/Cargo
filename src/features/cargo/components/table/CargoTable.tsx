"use client";

import { useTranslation } from "react-i18next";
import type { CargoItem } from "@/types/cargo";
import type { AppLanguage } from "@/lib/i18n/i18n";
import { useCargoLikes } from "@/features/cargo/hooks/useCargoLikes";
import {
  mobileCardList,
  tableBody,
  tableHead,
  tableHeadCell,
  tablePanel,
} from "@/lib/styles/control-styles";
import { cn } from "@/lib/utils";
import { CargoMobileCard } from "./CargoMobileCard";
import { CargoRow } from "./CargoRow";

interface CargoTableProps {
  items: CargoItem[];
  language: AppLanguage;
}

export function CargoTable({ items, language }: CargoTableProps) {
  const { t, i18n } = useTranslation();
  const locale = i18n.language;
  const { isLiked, toggleLike } = useCargoLikes();

  return (
    <section className={tablePanel}>
      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full min-w-[900px]">
          <thead className={tableHead}>
            <tr>
              <th className={tableHeadCell}>{t("table.from")}</th>
              <th className={tableHeadCell}>{t("table.to")}</th>
              <th className={tableHeadCell}>{t("table.price")}</th>
              <th className={tableHeadCell}>{t("table.cargoCol")}</th>
              <th className={tableHeadCell}>{t("table.transport")}</th>
              <th className={tableHeadCell}>{t("table.customer")}</th>
              <th className={cn(tableHeadCell, "w-[72px]")} />
            </tr>
          </thead>
          <tbody className={tableBody}>
            {items.map((item) => (
              <CargoRow
                key={item.id}
                item={item}
                language={language}
                locale={locale}
                t={t}
                isLiked={isLiked(item.id, item.is_liked)}
                onToggleLike={() => toggleLike(item.id)}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className={cn("lg:hidden", mobileCardList)}>
        {items.map((item) => (
          <CargoMobileCard
            key={item.id}
            item={item}
            language={language}
            locale={locale}
            t={t}
            isLiked={isLiked(item.id, item.is_liked)}
            onToggleLike={() => toggleLike(item.id)}
          />
        ))}
      </div>
    </section>
  );
}
