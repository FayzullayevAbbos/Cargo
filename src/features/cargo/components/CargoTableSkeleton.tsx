"use client";

import {
  macMobileCard,
  macMobileCardList,
  macTableHead,
  macTableHeadCell,
  macTablePanel,
} from "@/lib/styles/macos-controls";
import { cn } from "@/lib/utils";

export function CargoTableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <section className={macTablePanel} aria-busy aria-label="Loading">
      <div className={cn("hidden lg:block", macTableHead)}>
        <div className="grid grid-cols-7 gap-3 px-3.5 py-2">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className={cn(
                macTableHeadCell,
                "h-3 w-14 animate-pulse rounded bg-black/[0.06] p-0",
              )}
            />
          ))}
        </div>
      </div>

      <div className="hidden divide-y divide-black/[0.06] lg:block">
        {Array.from({ length: rows }).map((_, row) => (
          <div
            key={row}
            className="grid gap-3 p-3.5 lg:grid-cols-7 lg:items-center"
          >
            {Array.from({ length: 7 }).map((_, col) => (
              <div
                key={col}
                className="h-3.5 animate-pulse rounded-md bg-black/[0.05]"
                style={{ width: `${50 + ((row + col) % 4) * 12}%` }}
              />
            ))}
          </div>
        ))}
      </div>

      <div className={cn("lg:hidden", macMobileCardList)}>
        {Array.from({ length: Math.min(rows, 4) }).map((_, row) => (
          <article key={row} className={cn(macMobileCard, "space-y-3")}>
            <div className="flex justify-between gap-3">
              <div className="h-5 w-28 animate-pulse rounded-md bg-black/[0.06]" />
              <div className="flex gap-1">
                <div className="size-7 animate-pulse rounded-md bg-black/[0.05]" />
                <div className="size-7 animate-pulse rounded-md bg-black/[0.05]" />
              </div>
            </div>
            <div className="space-y-3 border-t border-black/[0.06] pt-3">
              <div className="h-4 w-3/4 animate-pulse rounded-md bg-black/[0.05]" />
              <div className="h-4 w-2/3 animate-pulse rounded-md bg-black/[0.05]" />
            </div>
            <div className="space-y-2 border-t border-black/[0.06] pt-3">
              <div className="h-3.5 w-full animate-pulse rounded-md bg-black/[0.05]" />
              <div className="h-3.5 w-4/5 animate-pulse rounded-md bg-black/[0.05]" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
