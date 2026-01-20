// backend/modules/auth/auth.validator.js
import { z } from "zod";

export const registerSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
  name: z.string().min(1).optional(),
});

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});
