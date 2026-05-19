"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { controlInput } from "@/lib/styles/control-styles";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit?: () => void;
}

export function PageHeader({
  search,
  onSearchChange,
  onSearchSubmit,
}: PageHeaderProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link href="/dispatcher/cargo" />}>
              {t("breadcrumb.home")}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-[13px] font-medium text-slate-600">
              {t("breadcrumb.allCargo")}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="relative w-full sm:max-w-[280px]">
        <Search className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-slate-400" />
        <Input
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSearchSubmit?.()}
          placeholder={t("filters.searchPlaceholder")}
          className={cn(controlInput, "pl-8 shadow-none")}
        />
      </div>
    </div>
  );
}
