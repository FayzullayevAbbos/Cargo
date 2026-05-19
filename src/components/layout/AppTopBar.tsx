"use client";

import { useTranslation } from "react-i18next";
import { Bell, Heart, Menu, ChevronDown, PanelLeftClose, PanelLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SUPPORTED_LANGUAGES, type AppLanguage } from "@/lib/i18n/i18n";
import { useAppLanguage } from "@/lib/i18n/useAppLanguage";
import { UserProfileMenu } from "./UserProfileMenu";
import { cn } from "@/lib/utils";

const LANG_LABELS: Record<AppLanguage, { label: string; flag: string }> = {
  uz: { label: "Uz", flag: "🇺🇿" },
  en: { label: "En", flag: "🇬🇧" },
  ru: { label: "Ru", flag: "🇷🇺" },
};

interface AppTopBarProps {
  title?: string;
  sidebarCollapsed?: boolean;
  onToggleSidebar?: () => void;
  onMenuClick?: () => void;
  showSidebarToggle?: boolean;
}

export function AppTopBar({
  title,
  sidebarCollapsed,
  onToggleSidebar,
  onMenuClick,
  showSidebarToggle = true,
}: AppTopBarProps) {
  const { t } = useTranslation();
  const { currentLang, changeLanguage } = useAppLanguage();

  return (
    <header className="flex h-12 shrink-0 items-center gap-2 border-b border-black/[0.08] bg-[#f5f5f7]/90  backdrop-blur-xl px-4">
      {/* Sidebar collapse — macOS style */}
      {showSidebarToggle && (
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onToggleSidebar}
          className="hidden text-slate-600 hover:bg-black/[0.06] lg:flex"
          aria-label={
            sidebarCollapsed ? t("nav.expandSidebar") : t("nav.collapseSidebar")
          }
        >
          {sidebarCollapsed ? (
            <PanelLeft className="size-[18px]" />
          ) : (
            <PanelLeftClose className="size-[18px]" />
          )}
        </Button>
      )}

      {/* Mobile menu */}
      <Button
        variant="ghost"
        size="icon-sm"
        className="text-slate-600 lg:hidden"
        onClick={onMenuClick}
        aria-label={t("nav.openMenu")}
      >
        <Menu className="size-5" />
      </Button>

      {title && (
        <h2
          className={cn(
            "min-w-0 flex-1 truncate text-[13px] font-semibold text-slate-800",
            "lg:absolute lg:left-1/2 lg:max-w-[50%] lg:-translate-x-1/2 lg:text-center",
          )}
        >
          {title}
        </h2>
      )}

      <div className="ml-auto flex items-center gap-0.5 sm:gap-1">
        <Button
          variant="ghost"
          size="icon-sm"
          className="text-slate-600 hover:bg-black/[0.06]"
        >
          <Heart className="size-4" />
          <span className="sr-only">{t("nav.favorites")}</span>
        </Button>
        <Button
          variant="ghost"
          size="icon-sm"
          className="text-slate-600 hover:bg-black/[0.06]"
        >
          <Bell className="size-4" />
          <span className="sr-only">{t("nav.notifications")}</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                size="sm"
                className="h-8 gap-1 px-2 text-xs font-medium text-slate-700 hover:bg-black/[0.06]"
              />
            }
          >
            <span>{LANG_LABELS[currentLang]?.flag ?? "🇺🇿"}</span>
            <span className="hidden sm:inline">
              {LANG_LABELS[currentLang]?.label ?? "Uz"}
            </span>
            <ChevronDown className="size-3 opacity-50" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {SUPPORTED_LANGUAGES.map((lang) => (
              <DropdownMenuItem key={lang} onClick={() => changeLanguage(lang)}>
                {LANG_LABELS[lang].flag} {LANG_LABELS[lang].label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="mx-1 hidden h-5 w-px bg-black/[0.1] sm:block" />

        <UserProfileMenu />
      </div>
    </header>
  );
}
