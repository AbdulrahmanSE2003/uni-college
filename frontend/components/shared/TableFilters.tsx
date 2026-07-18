"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectOption } from "@/types/field-config.types";

interface TableFiltersProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  options: SelectOption[];
  className?: string;
}

const TableFilters = ({
  value,
  onValueChange,
  placeholder = "Filter",
  options,
  className,
}: TableFiltersProps) => {
  const selectedOption = options.find((o) => o.value === value);
  return (
    <Select value={value} onValueChange={(value) => onValueChange(value!)}>
      <SelectTrigger className={className ?? "w-45 capitalize"}>
        <SelectValue placeholder={placeholder}>
          {" "}
          {selectedOption?.label ?? placeholder}
        </SelectValue>
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="all">All</SelectItem>

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
