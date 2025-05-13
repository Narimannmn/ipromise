import { z } from "zod";

export const BadgeSchema = z.object({
  code: z.string(),
  description: z.string(),
  icon_url: z.string(),
  id: z.string(),
  title: z.string(),
});

export type Badge = z.infer<typeof BadgeSchema>;
