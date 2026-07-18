import { z } from "zod";

export const createStudentSchema = z.object({
  name: z.string().trim().min(3).max(50),

  email: z.email(),

  gradeId: z.string().trim(),

  phone: z.string().trim().min(3),

  gender: z.enum(["male", "female", "n/a"]),
});

export type CreateStudentSchema = z.infer<typeof createStudentSchema>;
