import { z } from "zod";
import { IDSchema } from "@/shared/schemas";
import { BackendCustomResponseType } from "@/shared/schemas/error/error";

const MicroTaskSchema = z.object({
  ID: IDSchema,
  PromiseID: IDSchema,
  Title: z.string().max(255),
  Description: z.string().optional(),
  StepsPlanned: z.number().int().nonnegative().default(0),
  Status: z.enum(["in_progress", "completed"]),
  Order: z.number().int().nonnegative(),
  CreatedAt: z.string().datetime(),
  UpdatedAt: z.string().datetime(),
  DeletedAt: z.string().nullable().optional(),
});

export type MicroTask = z.infer<typeof MicroTaskSchema>;

export const IPromiseSchema = z.object({
  ID: IDSchema,
  UserID: IDSchema,
  Title: z.string(),
  Description: z.string(),
  Deadline: z.string().datetime(),
  IsPrivate: z.boolean(),
  Status: z.enum(["in_progress", "completed"]),
  CreatedAt: z.string().datetime(),
  UpdatedAt: z.string().datetime(),
  DeletedAt: z.string().nullable(),
  microtasks: z.array(MicroTaskSchema),
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
