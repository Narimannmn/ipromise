import { z } from "zod";
import { IDSchema } from "@/shared/schemas";

export const UserSchema = z.object({
  avatar_url: z.string(),
  badges_count: z.number().int().min(0),
  bio: z.string(),
  email: z.string().email().optional(),
  followers_count: z.number().int().min(0),
  following_count: z.number().int().min(0),
  id: IDSchema,
  promises_count: z.number().int().min(0),
  role: z.string().optional(),
  username: z.string(),
});
export type User = z.infer<typeof UserSchema>;

export const UserUpdateSchema = z.object({
  bio: z.string(),
  username: z.string(),
  avatar_url: z.instanceof(File),
});

export type UserUpdate = z.infer<typeof UserUpdateSchema>;
