"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoginSchema, loginSchema } from "../schemas/login.schema";
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
import { useLogin } from "../hooks/use-login";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/get-error-message";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { handleSubmit, reset, control } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useLogin();
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const onSubmit = (data: LoginSchema) => {
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        setUser(data.auth.user);

        if (data.auth.user.isFirstLogin) {
          router.push("/change-password");
          return;
        }

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
            <FieldLegend>Login to your account</FieldLegend>
            <FieldDescription className={`mb-4`}>
              {" "}
              Enter your email below to login to your account
            </FieldDescription>

            <FieldGroup className={`gap-y-4`}>
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="gap-y-1.5"
                  >
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      {...field}
                      id="email"
                      placeholder="someone@example.com"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.error && (
                      <FieldError
                        errors={
                          fieldState.error
                            ? [{ message: fieldState.error.message }]
                            : []
                        }
                      />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <>
                    <Field
                      data-invalid={fieldState.invalid}
                      className="gap-y-1.5"
                    >
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                      <div className={`relative`}>
                        <Input
                          {...field}
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                          aria-invalid={fieldState.invalid}
                        />
                        {showPassword ? (
                          <Eye
                            onClick={() => setShowPassword(false)}
                            className={`size-4.5 cursor-pointer absolute right-3 top-1/2 -translate-y-1/2`}
                          />
                        ) : (
                          <EyeOff
                            onClick={() => setShowPassword(true)}
                            className={`size-4.5 opacity-75 cursor-pointer absolute right-3 top-1/2 -translate-y-1/2`}
                          />
                        )}
                      </div>
                      {fieldState.error && (
                        <FieldError
                          errors={
                            fieldState.error
                              ? [{ message: fieldState.error.message }]
                              : []
                          }
                        />
                      )}
                    </Field>
                    <Link
                      href="#"
                      className="ml-auto inline-block text-xs underline-offset-2 hover:underline hover:text-primary transition-all duration-300"
                    >
                      Forgot your password?
                    </Link>
                  </>
                )}
              />
            </FieldGroup>
          </FieldSet>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full py-5 text-md"
          >
            {loginMutation.isPending ? "Logging in..." : "Login"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default LoginForm;
