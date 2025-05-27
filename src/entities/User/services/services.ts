import { t } from "i18next";
import { instance } from "@/shared/api/instance";
import { appLocalStorageKey } from "@/shared/config/appLocalStorage/appLocalStorage";
import { BackendCustomResponseSchema } from "@/shared/schemas/error/error";
import { appLocalStorage } from "@/shared/utils/appLocalStorage/appLocalStorage";
import { User, UserSchema, UserUpdate } from "../schemas/schemas";

export const getUserMe = async () => {
  return instance
    .get<User>("profile/me", {
      headers: {
        Authorization: `Bearer ${appLocalStorage.getItem(appLocalStorageKey.accessToken)}`,
      },
    })
    .then((response) => {
      const result = BackendCustomResponseSchema(UserSchema).safeParse(
        response.data,
      );
      if (!result.success) {
        throw new Error(t("invalidType", { ns: "requests" }));
      }
      return result.data.data;
    });
};

export const getUserProfileByUserName = async (username: User["username"]) => {
  return instance
    .get<User>(`profile/${username}`, {
      headers: {
        Authorization: `Bearer ${appLocalStorage.getItem(appLocalStorageKey.accessToken)}`,
      },
    })
    .then((response) => {
      const result = BackendCustomResponseSchema(UserSchema).safeParse(
        response.data,
      );
      if (!result.success) {
        throw new Error(t("invalidType", { ns: "requests" }));
      }
      return result.data.data;
    });
};
export const updateProfile = (payload: UserUpdate) => {
  const formData = new FormData();

  formData.append("username", payload.username);
  formData.append("promise_id", payload.bio);
  formData.append("avatar_url", payload.avatar_url);

  return instance.patch("profile/me", formData, {
    headers: {
      Authorization: `Bearer ${appLocalStorage.getItem(appLocalStorageKey.accessToken)}`,
      "Content-Type": "multipart/form-data",
    },
  });
};
