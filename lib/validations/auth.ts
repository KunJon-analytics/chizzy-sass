import * as z from "zod";

export const userAuthSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(32),
  name: z.string().min(8).optional(),
  referredById: z.string().min(8).optional(),
  image: z.string().url().optional(),
});
