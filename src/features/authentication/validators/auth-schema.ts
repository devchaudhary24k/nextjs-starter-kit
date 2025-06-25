import { z } from "zod";

export const RegisterSchema = z.object({
  name: z.string().trim().min(3),
  email: z.string().trim().email(),
  password: z.string().trim().min(1, {
    message: "Password is required",
  }),
});

export const LoginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().trim().min(1, {
    message: "Password is required",
  }),
});

export const ResetPasswordSchema = z
  .object({
    password: z.string().trim().min(1, {
      message: "Password is required",
    }),
    confirmPassword: z.string().trim().min(1, {
      message: "Password is required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export const EmailSchema = z.object({
  email: z.string().trim().email({
    message: "Invalid email address",
  }),
});

export const OnboardingSchema = z.object({
  organizationName: z.string().trim().min(3),
  organizationSlug: z
    .string()
    .trim()
    .min(3)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
});

export const EmailVerificationSchema = z.object({
  email: z.string().trim().email().min(1, {
    message: "Email reqired",
  }),
  id: z.string().trim().min(1, {
    message: "ID required",
  }),
});
