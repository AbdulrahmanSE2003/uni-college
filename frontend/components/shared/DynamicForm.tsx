"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, FieldValues, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { ZodObject } from "zod";

type DynamicFormProps = {
  defaultValues: unknown;
  Schema: ZodObject;
  payload: FieldValues;
  onSubmit: (data: FieldValues) => Promise<unknown>;
  isPending: boolean;
  close: () => void;
};

const DynamicForm = ({
  isPending,
  close,
  onSubmit,
  payload,
  Schema,
  defaultValues,
}: DynamicFormProps) => {
  type IPayload = typeof payload;
  const fields = Array.from(defaultValues?.keys ?? {});

  console.log(fields);

  const { handleSubmit, control } = useForm<IPayload>({
    resolver: zodResolver(Schema),
    defaultValues,
  });
  const submit = async (data: IPayload) => {
    await onSubmit(data);
    close();
  };
  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-5">
      <FieldGroup className={``}>
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Name</FieldLabel>

              <Input {...field} />

              {fieldState.error && (
                <FieldError errors={[{ message: fieldState.error.message }]} />
              )}
            </Field>
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Email</FieldLabel>

              <Input {...field} />

              {fieldState.error && (
                <FieldError errors={[{ message: fieldState.error.message }]} />
              )}
            </Field>
          )}
        />

        <Controller
          name="phone"
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Phone</FieldLabel>

              <Input {...field} />

              {fieldState.error && (
                <FieldError errors={[{ message: fieldState.error.message }]} />
              )}
            </Field>
          )}
        />
      </FieldGroup>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
};

export default DynamicForm;
