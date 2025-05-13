import { t } from "i18next";
import { z } from "zod";
import { User } from "@/entities/User/schemas/schemas";
import { instance } from "@/shared/api/instance";
import { appLocalStorageKey } from "@/shared/config/appLocalStorage/appLocalStorage";
import { BackendCustomResponseSchema } from "@/shared/schemas/error/error";
import { appLocalStorage } from "@/shared/utils/appLocalStorage/appLocalStorage";
import {
  IPromise,
  IPromiseSchema,
  PromiseCreate,
  PromiseCreateResponse,
} from "../shemas/shemas";

export const getPromisesByUserName = async (username: User["username"]) => {
  return instance
    .get<IPromise[]>(`promises/user/${username}`, {
      headers: {
        Authorization: `Bearer ${appLocalStorage.getItem(appLocalStorageKey.accessToken)}`,
      },
    })
    .then((response) => {
      const result = BackendCustomResponseSchema(
        z.array(IPromiseSchema),
      ).safeParse(response.data);
      if (!result.success) {
        throw new Error(t("invalidType", { ns: "requests" }));
      }
      return result.data.data;
    });
};
export const createPromise = async (promise: PromiseCreate) => {
  return instance.post<PromiseCreateResponse>("promises", promise, {
    headers: {
      Authorization: `Bearer ${appLocalStorage.getItem(appLocalStorageKey.accessToken)}`,
    },
  });
};
