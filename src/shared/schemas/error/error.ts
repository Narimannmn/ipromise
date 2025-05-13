import { z } from "zod";

export const BackendCustomErrorSchema = z.object({
  message: z.string(),
});
export type BackendCustomErrorSchema = z.infer<typeof BackendCustomErrorSchema>;

export const BackendCustomResponseSchema = <T>(dataSchema: z.ZodType<T>) =>
  z.object({
    code: z.number(),
    data: dataSchema,
    status: z.string(),
  });

// Infer the type of the schema
export type BackendCustomResponseType<T> = z.infer<
  ReturnType<typeof BackendCustomResponseSchema<T>>
>;
