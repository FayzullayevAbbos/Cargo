"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AppSidebar } from "./AppSidebar";
import { AppTopBar } from "./AppTopBar";
import { useSidebarCollapsed } from "./hooks/useSidebarCollapsed";
import { SIDEBAR_COLLAPSED_KEY } from "./nav-config";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface AppShellProps {
  children: React.ReactNode;
  pageTitle?: string;
}

export function AppShell({ children, pageTitle }: AppShellProps) {
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { collapsed, mounted, toggle: toggleSidebar } =
    useSidebarCollapsed(SIDEBAR_COLLAPSED_KEY);

  const title = pageTitle ?? t("breadcrumb.allCargo");

  return (
    <div className="flex h-screen overflow-hidden bg-[#ececec]">
      <div
        className={`hidden shrink-0 transition-opacity duration-150 lg:block ${mounted ? "opacity-100" : "opacity-0"}`}
      >
        <AppSidebar collapsed={collapsed} />
      </div>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-[260px] p-0">
          <SheetHeader className="sr-only">
            <SheetTitle>{t("nav.cargo")}</SheetTitle>
          </SheetHeader>
          <AppSidebar
            onNavigate={() => setMobileOpen(false)}
            className="w-full border-0"
          />
        </SheetContent>
      </Sheet>

      <div className="relative flex min-w-0 flex-1 flex-col">
        <AppTopBar
          title={title}
          sidebarCollapsed={collapsed}
          onToggleSidebar={toggleSidebar}
          onMenuClick={() => setMobileOpen(true)}
        />

        <main className="flex-1 overflow-y-auto bg-[#f5f5f7]/50">
          <div className="h-full w-full px-4 py-4  sm:py-5">
            <div className="mx-auto flex w-full max-w-none flex-col gap-5">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
