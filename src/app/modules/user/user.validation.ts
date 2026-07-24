import z from "zod";

export const createUserZodSchema = z.object({
  body: z.object({
    role: z.string({
      error: "role is required",
    }),
    email: z.string({
      error: "email is required",
    }),
    password: z.string({
      error: "age is required",
    }),
  }),
});
