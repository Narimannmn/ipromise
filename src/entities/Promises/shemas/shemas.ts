import { z } from "zod";
import { IDSchema } from "@/shared/schemas";
import { BackendCustomResponseType } from "@/shared/schemas/error/error";

export const MicroTaskSchema = z.object({
  id: IDSchema,
  title: z.string().max(255),
  steps_planned: z.number(),
  status: z.enum(["in_progress", "completed", ""]),
  order: z.number().int().nonnegative(),
  posts_count: z.number(),
  completion_ratio: z.number(),
});

export type MicroTask = z.infer<typeof MicroTaskSchema>;

export const IPromiseSchema = z.object({
  id: IDSchema,
  title: z.string(),
  description: z.string(),
  deadline: z.coerce.date(),
  is_private: z.boolean(),
  status: z.enum(["in_progress", "completed", ""]),
  microtasks: z.array(MicroTaskSchema).nullable(),
});

export type IPromise = z.infer<typeof IPromiseSchema>;
export const MicrotaskCreateSchema = z.object({
  Title: z.string().max(255),
  Order: z.number().int().positive(),
});

export const PromiseCreateSchema = z.object({
  Title: z.string().max(255),
  Description: z.string().max(255).optional(),
  Deadline: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  IsPrivate: z.boolean(),
  postNumber: z
    .number({
      required_error: "postNumber is required",
      invalid_type_error: "postNumber must be a number",
    })
    .int()
    .min(1, { message: "Must be at least 1" })
    .max(30, { message: "Must be at most 30" }),
  Microtasks: z
    .array(MicrotaskCreateSchema)
    .min(1, "At least one microtask is required"),
});

export type PromiseCreate = z.infer<typeof PromiseCreateSchema>;
export type MicrotaskCreate = z.infer<typeof MicrotaskCreateSchema>;

export type PromiseCreateResponse = BackendCustomResponseType<{
  message: string;
}>;

export const MicroTaskUpdateSchema = z.object({
  status: z.string(),
  title: z.string(),
});

export type MicroTaskUpdate = z.infer<typeof MicroTaskUpdateSchema>;

export const PromiseUpdateSchema = z.object({
  deadline: z.string(),
  description: z.string(),
  title: z.string(),
});
export type PromiseUpdate = z.infer<typeof PromiseUpdateSchema>;
