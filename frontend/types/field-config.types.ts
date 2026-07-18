export type SelectOption = {
  label: string;
  value: string;
};

export type FieldConfig = {
  name: string;
  label: string;
  type: "text" | "email" | "password" | "tel" | "select";
  options?: SelectOption[];
};
