import { AxiosResponse } from "axios";
import {
  LoginFormFields,
  LoginResponse,
  LoginResponseError,
  LoginResponseSchema,
  RegisterResponseSchema,
  RegistrationFormFields,
  Token,
} from "@/entities/Auth/schemas/schemas";
import { Tokens } from "@/entities/Auth/store/store";
import { instance } from "@/shared/api/instance";
import { BackendCustomResponseType } from "@/shared/schemas/error/error";

export const login = async (credentials: LoginFormFields) => {
  return instance
    .post<
      LoginFormFields,
      AxiosResponse<
        BackendCustomResponseType<LoginResponse>,
        LoginResponseError
      >,
      LoginFormFields
    >("auth/login", credentials, {
      validateStatus(status) {
        return status === 200;
      },
    })
    .then((response) => {
      const result = LoginResponseSchema.safeParse(response.data.data);
      if (!result.success) {
        throw new Error("Validation error");
      }
      return result.data;
    });
};

export const register = async (credentials: RegistrationFormFields) => {
  return instance
    .post<
      RegistrationFormFields,
      AxiosResponse<
        BackendCustomResponseType<LoginResponseError>,
        LoginResponseError
      >,
      RegistrationFormFields
    >("auth/signup", credentials, {
      validateStatus(status) {
        return status === 201;
      },
    })
    .then((response) => {
      const result = RegisterResponseSchema.safeParse(response.data.data);
      if (!result.success) {
        throw new Error("Validation error");
      }
      return result.data;
    });
};

export const revalidateToken = async (refreshToken: Token) => {
  return instance.post<Tokens>("auth/refresh", {
    refresh_token: refreshToken,
  });
};
