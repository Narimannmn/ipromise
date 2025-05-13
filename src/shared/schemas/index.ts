import { z } from "zod";

export const IDSchema = z.string().uuid();
export type ID = z.infer<typeof IDSchema>;

export const S3UrlSchema = z.string().url();
export type S3Url = z.infer<typeof S3UrlSchema>;
