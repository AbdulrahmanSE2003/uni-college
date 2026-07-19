"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/get-error-message";
import { changePasswordSchema } from "../schemas/changePassword.schema";
import { ChangePasswordPayload } from "../types/auth.types";
import { useChangePassword } from "../hooks/use-ChangePassword";

const passwordFields = [
  {
    name: "oldPassword" as const,
    label: "Current Password",
  },
  {
    name: "password" as const,
    label: "New Password",
  },
  {
    name: "passwordConfirm" as const,
    label: " New Password Confirm",
  },
];

const ChangePasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { handleSubmit, reset, control } = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const changePasswordMutation = useChangePassword();
  const router = useRouter();

  const onSubmit = (data: ChangePasswordPayload) => {
    changePasswordMutation.mutate(data, {
      onSuccess: () => {
        reset();
        toast.success("Password changed successfully.");
        router.push("/dashboard");
      },
      onError: (error) => {
        toast.error(getErrorMessage(error));
      },
    });
  };

  return (
    <Card className="w-full max-w-sm shadow-xl border border-border">
      <form onSubmit={handleSubmit(onSubmit)} className={`space-y-6`}>
        <CardContent>
          <FieldSet>
            <FieldLegend>Change your password</FieldLegend>
            <FieldDescription className={`mb-4`}>
              {" "}
              Your first login!, change your pre made password for security
            </FieldDescription>

            <FieldGroup className={`gap-y-4`}>
              {passwordFields.map(({ name, label }) => (
                <Controller
                  key={name}
                  name={name}
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field
                      data-invalid={fieldState.invalid}
                      className="gap-y-1.5"
                    >
                      <FieldLabel htmlFor={name}>{label}</FieldLabel>

                      <div className="relative">
                        <Input
                          {...field}
                          id={name}
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          aria-invalid={fieldState.invalid}
                        />

                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                          {showPassword ? (
                            <Eye className="size-4.5 cursor-pointer" />
                          ) : (
                            <EyeOff className="size-4.5 opacity-75 cursor-pointer" />
                          )}
                        </button>
                      </div>

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
          </FieldSet>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            disabled={changePasswordMutation.isPending}
            type="submit"
            className="w-full py-5 text-md"
          >
            {changePasswordMutation.isPending ? "Submitting..." : "Submit"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ChangePasswordForm;
