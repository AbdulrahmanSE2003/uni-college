// components/shared/TableFilters.tsx

"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface FilterOption {
  label: string;
  value: string;
}

interface TableFiltersProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  options: FilterOption[];
  className?: string;
}

const TableFilters = ({
  value,
  onValueChange,
  placeholder = "Filter",
  options,
  className,
}: TableFiltersProps) => {
  return (
    <Select
      value={value}
      onValueChange={(value) => {
        if (value) onValueChange(value);
      }}
    >
      <SelectTrigger className={className ?? "w-45 capitalize"}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default TableFilters;
