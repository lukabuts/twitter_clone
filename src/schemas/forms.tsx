import * as z from "zod";

export const RegistrationFormSchema = z
  .object({
    name: z
      .string()
      .min(2, {
        message: "Full name must be at least 2 characters.",
      })
      .max(40, {
        message: "Full name must be at most 40 characters.",
      }),
    email: z
      .string()
      .email({
        message: "Please enter a valid email address.",
      })
      .max(50, {
        message: "Email must be at most 50 characters.",
      }),
    username: z
      .string()
      .min(2, {
        message: "Username must be at least 2 characters.",
      })
      .max(20, {
        message: "Username must be at most 20 characters.",
      })
      .regex(/^[a-zA-Z0-9_.]+$/, {
        message:
          "Username can only contain letters, numbers, underscores, and dots.",
      }),
    password: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters.",
      })
      .max(50, {
        message: "Password must be at most 255 characters.",
      }),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ["password_confirmation"],
  });

export const LoginFormSchema = z.object({
  login: z.string().min(1, {
    message: "Please enter your email or username.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});
