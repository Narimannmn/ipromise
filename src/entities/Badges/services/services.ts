import { t } from "i18next";
import { z } from "zod";
import { User } from "@/entities/User/schemas/schemas";
import { instance } from "@/shared/api/instance";
import { appLocalStorageKey } from "@/shared/config/appLocalStorage/appLocalStorage";
import { BackendCustomResponseSchema } from "@/shared/schemas/error/error";
import { appLocalStorage } from "@/shared/utils/appLocalStorage/appLocalStorage";
import { Badge, BadgeSchema } from "../schemas/schemas";

export const getBagesByUserName = async (username: User["username"]) => {
  return instance
    .get<Badge[]>(`badges/${username}`, {
      headers: {
        Authorization: `Bearer ${appLocalStorage.getItem(appLocalStorageKey.accessToken)}`,
      },
    })
    .then((response) => {
      const result = BackendCustomResponseSchema(
        z.array(BadgeSchema).nullable(),
      ).safeParse(response.data);
      if (!result.success) {
        throw new Error(t("invalidType", { ns: "requests" }));
      }
      return result.data.data;
    });
};

export const getBages = async () => {
  return await instance
    .get<Badge[]>("badges/", {
      headers: {
        Authorization: `Bearer ${appLocalStorage.getItem(appLocalStorageKey.accessToken)}`,
      },
    })
    .then((response) => {
      const result = BackendCustomResponseSchema(
        z.array(BadgeSchema).nullable(),
      ).safeParse(response.data);
      if (!result.success) {
        throw new Error(t("invalidType", { ns: "requests" }));
      }
      return result.data.data;
    });
};
