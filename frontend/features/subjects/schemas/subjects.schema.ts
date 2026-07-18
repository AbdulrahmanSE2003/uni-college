import z from "zod";

export const createSubjectSchema = z.object({
  title: z.string().min(2),
  teacherId: z.string().trim(),
  gradeId: z.string().trim(),
});

export type CreateSubjectSchema = z.infer<typeof createSubjectSchema>;
