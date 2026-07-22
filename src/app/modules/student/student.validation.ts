import z, { email } from "zod";

export const createStudentZodSchema = z.object({
  body: z.object({
    name: z.string({
      error: "name is required",
    }),
    email: z.string({
      error: "email is required",
    }),
    age: z.number({
      error: "age is required",
    }),
    studentId: z.number({
      error: "student id is required",
    }),
  }),
});
