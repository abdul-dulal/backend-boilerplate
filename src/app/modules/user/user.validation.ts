import z, { email } from "zod";

export const createUserZodSchema = z.object({
  body: z.object({
    name: z.string({
      error: "name is required",
    }),
    email: z.string({
      error: "email is required",
    }),
    password: z.string({
      error: "age is required",
    }),
  }),
});
