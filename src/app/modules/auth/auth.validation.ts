import z, { email } from "zod";

const loginZodSchema = z.object({
  body: z.object({
    role: z.string({
      error: "role is required",
    }),
    email: z.string({
      error: "email is required",
    }),
    password: z.string({
      error: "Password is required",
    }),
  }),
});

export const AuthValidation = {
  loginZodSchema,
  //   refreshTokenZodSchema,
  //   changePasswordZodSchema,
};
