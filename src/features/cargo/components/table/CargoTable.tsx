"use client";

import { useTranslation } from "react-i18next";
import type { CargoItem } from "@/types/cargo";
import type { AppLanguage } from "@/lib/i18n/i18n";
import { useCargoLikes } from "@/features/cargo/hooks/useCargoLikes";
import {
  macMobileCardList,
  macTableBody,
  macTableHead,
  macTableHeadCell,
  macTablePanel,
} from "@/lib/styles/macos-controls";
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
    <section className={macTablePanel}>
      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full min-w-[900px]">
          <thead className={macTableHead}>
            <tr>
              <th className={macTableHeadCell}>{t("table.from")}</th>
              <th className={macTableHeadCell}>{t("table.to")}</th>
              <th className={macTableHeadCell}>{t("table.price")}</th>
              <th className={macTableHeadCell}>{t("table.cargoCol")}</th>
              <th className={macTableHeadCell}>{t("table.transport")}</th>
              <th className={macTableHeadCell}>{t("table.customer")}</th>
              <th className={cn(macTableHeadCell, "w-[72px]")} />
            </tr>
          </thead>
          <tbody className={macTableBody}>
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

      <div className={cn("lg:hidden", macMobileCardList)}>
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
