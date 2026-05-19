"use client";

import { useTranslation } from "react-i18next";
import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface UserProfileMenuProps {
  compact?: boolean;
}

export function UserProfileMenu({ compact }: UserProfileMenuProps) {
  const { t } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size={compact ? "icon-sm" : "sm"}
            className={
              compact
                ? "size-8 rounded-full p-0 bg-black/[0.06]"
                : "h-9 gap-2 rounded-full p-1 bg-white hover:bg-black/[0.06]"
            }
          />
        }
      >
        <Avatar className="size-7 ring-1 ring-black/[0.08]">
          <AvatarFallback className="bg-slate-300/90 text-[11px] font-semibold text-slate-700">
            SJ
          </AvatarFallback>
        </Avatar>
        {!compact && (
          <>
            <span className="hidden max-w-[100px] truncate text-[13px] font-medium text-slate-800 sm:inline">
              sandjey
            </span>
            <ChevronDown className="hidden size-3.5 opacity-50 sm:block" />
          </>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="border-b border-black/[0.06] px-2 py-2.5">
          <p className="text-sm font-medium text-slate-900">sandjey</p>
          <p className="text-xs text-slate-500">{t("nav.role")}</p>
        </div>
        <DropdownMenuItem className="cursor-pointer my-1">
          <User className="size-4" />
          {t("profile.account")}
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer my-1">
          <Settings className="size-4" />
          {t("profile.settings")}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <LogOut className="size-4" />
          {t("profile.logout")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
