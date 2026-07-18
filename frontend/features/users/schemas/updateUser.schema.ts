import { z } from "zod";

export const updateUserSchema = z.object({
  name: z.string().trim().min(3).max(50),

  email: z.email(),

  phone: z.string().trim().min(3),

  gender: z.enum(["male", "female", "n/a"]),

  role: z.enum(["admin", "teacher", "student"]),

  isActive: z.boolean(),
});

export type updateUserSchema = z.infer<typeof updateUserSchema>;
