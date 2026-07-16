"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import TableFilters from "@/components/shared/TableFilters";

import { genderOptions, roleOptions, statusOptions } from "@/lib/constants";

import { UpdateUserPayload } from "../types/users.types";

import { updateUserSchema } from "../schemas/updateUser.schema";
import { User } from "@/types/user.types";

interface UserFormProps {
  defaultValues: User;
  isPending?: boolean;
  onSubmit: (values: UpdateUserPayload) => Promise<unknown>;
  close: () => void;
}

const UserForm = ({
  defaultValues,
  isPending = false,
  onSubmit,
  close,
}: UserFormProps) => {
  const { handleSubmit, control } = useForm<UpdateUserPayload>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: defaultValues.name,
      email: defaultValues.email,
      phone: defaultValues.phone,
      gender: defaultValues.gender,
      role: defaultValues.role,
      isActive: defaultValues.isActive,
    },
  });

  const submit = async (values: UpdateUserPayload) => {
    await onSubmit(values);
    close();
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-5">
      <FieldGroup>
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

        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel>Role</FieldLabel>

              <TableFilters
                value={field.value}
                onValueChange={field.onChange}
                options={roleOptions}
              />
            </Field>
          )}
        />

        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel>Gender</FieldLabel>

              <TableFilters
                value={field.value}
                onValueChange={field.onChange}
                options={genderOptions}
              />
            </Field>
          )}
        />

        <Controller
          name="isActive"
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel>Status</FieldLabel>

              <TableFilters
                value={field.value ? "active" : "inactive"}
                onValueChange={(value) => field.onChange(value === "active")}
                options={statusOptions}
              />
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

export default UserForm;
