import { z } from "zod";

export const createStudentSchema = z.object({
  name: z.string().trim().min(3).max(50),

  email: z.email(),

  gradeId: z.string().trim(),

  phone: z.string().trim().min(3),

  gender: z.enum(["Male", "Female", "N/A"]),
});

export type CreateStudentSchema = z.infer<typeof createStudentSchema>;
