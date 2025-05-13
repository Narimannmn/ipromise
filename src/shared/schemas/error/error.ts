import { z } from "zod";

export const BackendCustomErrorSchema = z.object({
  message: z.string(),
});
export type BackendCustomErrorSchema = z.infer<typeof BackendCustomErrorSchema>;
