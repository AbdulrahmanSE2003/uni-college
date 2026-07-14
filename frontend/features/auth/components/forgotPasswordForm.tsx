"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import Link from "next/link";
import { forgotPasswordSchema } from "../schemas/forgotPassword";
import { useForgotPassword } from "../hooks/use-ForgotPassword";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/get-error-message";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

type ForgotPasswordFormData = {
  email: string;
};

export default function ForgotPasswordForm() {
  const { handleSubmit, control } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const forgotPasswordMutation = useForgotPassword();

  const onSubmit = (data: ForgotPasswordFormData) => {
    forgotPasswordMutation.mutate(data, {
      onSuccess: () => {
        toast.success(
          "If an account with that email exists, a password reset link has been sent.",
        );
      },
      onError: (error) => {
        toast.error(getErrorMessage(error));
      },
    });
  };

  return (
    <Card className="w-full max-w-sm shadow-xl border">
      {forgotPasswordMutation.isSuccess ? (
        <div className="flex flex-col items-center text-center py-8 space-y-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
            <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-500" />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Check your email</h2>

            <p className="text-sm text-muted-foreground leading-6 max-w-xs">
              If an account exists with this email, we&apos;ve sent you a
              password reset link. Please check your inbox and spam folder.
            </p>
          </div>

          <Link
            href="/login"
            className={`flex items-center gap-0.5 hover:text-primary transition-colors duration-300`}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Login
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <CardContent>
            <FieldSet>
              <FieldLegend>Forgot Password</FieldLegend>

              <FieldDescription className="mb-4">
                Enter your email address and we&apos;ll send you a password
                reset link.
              </FieldDescription>

              <FieldGroup>
                <Controller
                  name="email"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field
                      data-invalid={fieldState.invalid}
                      className="gap-y-1.5"
                    >
                      <FieldLabel htmlFor="email">University Email</FieldLabel>

                      <Input
                        {...field}
                        id="email"
                        type="email"
                        placeholder="someone@example.com"
                        autoComplete="email"
                        aria-invalid={fieldState.invalid}
                      />

                      {fieldState.error && (
                        <FieldError
                          errors={[{ message: fieldState.error.message }]}
                        />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
            </FieldSet>
          </CardContent>

          <CardFooter className="flex flex-col gap-3">
            <Button
              disabled={forgotPasswordMutation.isPending}
              type="submit"
              className="w-full py-5 text-md"
            >
              {forgotPasswordMutation.isPending
                ? "Sending..."
                : "Reset Password"}
            </Button>

            <Link
              href="/login"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Back to Login
            </Link>
          </CardFooter>
        </form>
      )}
    </Card>
  );
}
