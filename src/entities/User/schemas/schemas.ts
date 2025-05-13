import { z } from "zod";
import { IDSchema } from "@/shared/schemas";

export const UserSchema = z.object({
  avatar_url: z.string(),
  badges_count: z.number().int().min(0),
  bio: z.string(),
  email: z.string().email(),
  followers_count: z.number().int().min(0),
  following_count: z.number().int().min(0),
  id: IDSchema,
  promises_count: z.number().int().min(0),
  role: z.string(),
  username: z.string(),
});
export type User = z.infer<typeof UserSchema>;
