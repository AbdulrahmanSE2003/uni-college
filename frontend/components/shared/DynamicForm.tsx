"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Controller,
  DefaultValues,
  FieldValues,
  useForm,
} from "react-hook-form";
import { ZodSchema } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { FieldConfig } from "@/types/field-config.types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type DynamicFormProps<T extends FieldValues> = {
  fields: FieldConfig[];
  schema: ZodSchema;
  defaultValues: DefaultValues<T>;
  onSubmit: (data: T) => Promise<void>;
  isPending: boolean;
  close: () => void;
};

const DynamicForm = <T extends FieldValues>({
  fields,
  schema,
  defaultValues,
  onSubmit,
  isPending,
  close,
}: DynamicFormProps<T>) => {
  const { handleSubmit, control } = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const submit = async (data: T) => {
    await onSubmit(data);
    close();
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-5">
      <FieldGroup>
        {fields.map((f) => (
          <Controller
            key={f.name}
            name={f.name as any}
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>{f.label}</FieldLabel>

                {f.type === "select" ? (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={`Select ${f.label}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {f.options?.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input {...field} type={f.type} placeholder={f.label} />
                )}

                {fieldState.error && (
                  <FieldError
                    errors={[{ message: fieldState.error.message }]}
                  />
                )}
              </Field>
            )}
          />
        ))}
      </FieldGroup>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Saving..." : "Save"}
      </Button>
    </form>
  );
};

export default DynamicForm;
