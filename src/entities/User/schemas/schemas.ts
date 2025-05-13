import { z } from "zod";
import { IDSchema } from "@/shared/schemas";

export const UserSchema = z.object({
  id: IDSchema,
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  email: z.string().email().nullable(),
});
export type User = z.infer<typeof UserSchema>;
