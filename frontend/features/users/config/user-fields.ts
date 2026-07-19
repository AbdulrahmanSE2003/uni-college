import { genderOptions, roleOptions, statusOptions } from "@/lib/constants";
import { FieldConfig } from "@/types/field-config.types";

export const userFields: FieldConfig[] = [
  { name: "name", label: "Name", type: "text" },
  { name: "email", label: "Email", type: "text" },
  { name: "phone", label: "Phone", type: "text" },
  {
    name: "gender",
    label: "Gender",
    type: "select",
    options: genderOptions,
  },
  {
    name: "role",
    label: "Role",
    type: "select",
    options: roleOptions,
  },
  {
    name: "isActive",
    label: "Is Active",
    type: "switch",
    options: statusOptions,
  },
];
