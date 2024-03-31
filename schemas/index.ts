import * as z from "zod";

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  email: z.string().email({
    message: "Email is required",
  }),
  phoneNumber: z
    .string()
    .min(10, { message: "Phone number is required" })
    .max(12, { message: "Phone number must be maximum 12 digits" })
    .regex(/^\d{10,12}$/, { message: "Invalid phone number" }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
});