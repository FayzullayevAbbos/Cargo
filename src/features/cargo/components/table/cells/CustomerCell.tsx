import type { CargoItem } from "@/types/cargo";
import { getInitials } from "@/utils/format";

interface CustomerCellProps {
  item: CargoItem;
}

export function CustomerCell({ item }: CustomerCellProps) {
  const initials = getInitials(item.contact_name);

  return (
    <div className="flex items-center gap-2">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#e8e8ed] text-[11px] font-semibold text-slate-600">
        {initials}
      </div>
      <div className="min-w-0">
        <p className="truncate text-[13px] font-medium text-slate-800">
          {item.contact_name ?? "—"}
        </p>
        {item.contact_phone && (
          <p className="truncate text-[11px] text-slate-500">
            {item.contact_phone}
          </p>
        )}
      </div>
    </div>
  );
}
