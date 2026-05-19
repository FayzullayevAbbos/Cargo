"use client";

import { useMemo } from "react";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilterSelectContent } from "./FilterSelectContent";
import { macSelectTrigger } from "./macos-styles";
import { cn } from "@/lib/utils";

interface CitySelectProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  allLabel: string;
  cities: { code: string; name: string }[];
}

export function CitySelect({
  id,
  value,
  onChange,
  placeholder,
  allLabel,
  cities,
}: CitySelectProps) {
  const items = useMemo(
    () => [
      { value: "all", label: allLabel },
      ...cities.map((city) => ({
        value: city.code,
        label: `${city.name} (${city.code})`,
      })),
    ],
    [cities, allLabel],
  );

  return (
    <Select
      items={items}
      value={value || "all"}
      onValueChange={(v) => onChange(!v || v === "all" ? "" : v)}
    >
      <SelectTrigger id={id} className={cn(macSelectTrigger, "shadow-none")}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <FilterSelectContent>
        <SelectItem value="all" label={allLabel}>
          {allLabel}
        </SelectItem>
        {cities.map((city) => {
          const label = `${city.name} (${city.code})`;
          return (
            <SelectItem key={city.code} value={city.code} label={label}>
              {label}
            </SelectItem>
          );
        })}
      </FilterSelectContent>
    </Select>
  );
}
