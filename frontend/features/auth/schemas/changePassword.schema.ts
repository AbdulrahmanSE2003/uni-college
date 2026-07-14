import z from "zod";

export const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(8, "Password must be at least 8 characters."),
    password: z.string().min(8, "Password must be at least 8 characters."),
    passwordConfirm: z
      .string()
      .min(8, "Password must be at least 8 characters."),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match.",
    path: ["passwordConfirm"],
  });

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;
