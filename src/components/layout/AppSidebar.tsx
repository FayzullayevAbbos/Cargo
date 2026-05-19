"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { SarbonLogo } from "./SarbonLogo";
import { NAV_ITEMS } from "./nav-config";
import { cn } from "@/lib/utils";

interface AppSidebarProps {
  collapsed?: boolean;
  onNavigate?: () => void;
  className?: string;
}

export function AppSidebar({
  collapsed = false,
  onNavigate,
  className,
}: AppSidebarProps) {
  const { t } = useTranslation();
  const pathname = usePathname();

  const mainItems = NAV_ITEMS.filter((i) => i.section === "main");
  const mgmtItems = NAV_ITEMS.filter((i) => i.section === "management");

  const renderLink = (item: (typeof NAV_ITEMS)[0]) => {
    const active = item.href !== "#" && pathname.startsWith(item.href);
    const Icon = item.icon;
    const label = t(`nav.${item.key}`);

    return (
      <Link
        key={item.key}
        href={item.href}
        onClick={onNavigate}
        title={collapsed ? label : undefined}
        className={cn(
          "flex items-center rounded-lg text-[13px] font-medium transition-all",
          collapsed
            ? "justify-center p-2.5"
            : "gap-2.5 px-2.5 py-2",
          active
            ? "bg-[#007AFF] text-white shadow-sm"
            : "text-slate-700 hover:bg-black/[0.06] active:bg-black/[0.08]",
        )}
      >
        <Icon
          className={cn(
            "size-[18px] shrink-0",
            active ? "text-white" : "text-slate-500",
          )}
          strokeWidth={active ? 2.25 : 2}
        />
        {!collapsed && <span className="truncate">{label}</span>}
      </Link>
    );
  };

  return (
    <aside
      className={cn(
        "flex h-full shrink-0 flex-col border-r border-black/[0.08] bg-[#ebebeb]/95 backdrop-blur-xl transition-[width] duration-200 ease-in-out",
        collapsed ? "w-[68px]" : "w-[240px]",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center border-b border-black/[0.06]",
          collapsed ? "justify-center px-2 py-4" : "px-4 py-4",
        )}
      >
        <SarbonLogo collapsed={collapsed} />
      </div>

      <nav
        className={cn(
          "flex-1 overflow-y-auto overflow-x-hidden py-3",
          collapsed ? "space-y-1 px-2" : "space-y-5 px-3",
        )}
      >
        <div>
          {!collapsed && (
            <p className="mb-1.5 px-2.5 text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
              {t("navSection.main")}
            </p>
          )}
          <div className="space-y-0.5">{mainItems.map(renderLink)}</div>
        </div>

        <div>
          {!collapsed && (
            <p className="mb-1.5 px-2.5 text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
              {t("navSection.management")}
            </p>
          )}
          <div className="space-y-0.5">{mgmtItems.map(renderLink)}</div>
        </div>
      </nav>
    </aside>
  );
}
