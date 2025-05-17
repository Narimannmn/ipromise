import { z } from "zod";

export const FriendSchema = z.object({
  id: z.string().uuid(),
  username: z.string(),
  avatar_url: z.string().url().optional().or(z.literal("")),
  bio: z.string().optional(),
});

export type Friend = z.infer<typeof FriendSchema>;
