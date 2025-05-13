import { z } from "zod";
import { IDSchema } from "@/shared/schemas";

export const LoginFormFieldsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
export type LoginFormFields = z.infer<typeof LoginFormFieldsSchema>;

export const RegistrationFormFieldsSchema = z
  .object({
    email: z.string().email(),
    username: z.string(),
    password: z.string(),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export type RegistrationFormFields = z.infer<
  typeof RegistrationFormFieldsSchema
>;

export const TokenSchema = z.string();
export type Token = z.infer<typeof TokenSchema>;

export const LoginResponseSchema = z.object({
  access_token: TokenSchema,
  refresh_token: TokenSchema,
});
export type LoginResponse = z.infer<typeof LoginResponseSchema>;

export type LoginResponseError = {
  message: string;
};

export const RegisterResponseSchema = z.object({
  message: z.string(),
});
export type RegisterResponse = z.infer<typeof RegisterResponseSchema>;

export const DecodedTokenSchema = z.object({
  exp: z.number().describe("Expiration timestamp"),
  role: z.string().describe("User role"),
  user_id: IDSchema,
});
export type DecodedToken = z.infer<typeof DecodedTokenSchema>;
