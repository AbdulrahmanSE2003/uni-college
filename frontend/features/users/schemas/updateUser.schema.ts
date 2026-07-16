import { z } from "zod";

export const updateUserSchema = z.object({
  name: z.string().trim().min(3).max(50),

  email: z.email(),

  phone: z.string().trim().min(3),

  gender: z.enum(["Male", "Female", "N/A"]),

  role: z.enum(["admin", "teacher", "student"]),

  isActive: z.boolean(),
});

export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
