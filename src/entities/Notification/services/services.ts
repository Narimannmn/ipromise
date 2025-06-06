import { instance } from "@/shared/api/instance";
import { appLocalStorageKey } from "@/shared/config/appLocalStorage/appLocalStorage";
import { ID } from "@/shared/schemas";
import { BackendCustomResponseType } from "@/shared/schemas/error/error";
import { appLocalStorage } from "@/shared/utils/appLocalStorage/appLocalStorage";
import { Notification } from "../schemas/shemas";

export const getNotifications = async () => {
  return instance
    .get<BackendCustomResponseType<Notification[]>>("/notifications/me", {
      headers: {
        Authorization: `Bearer ${appLocalStorage.getItem(appLocalStorageKey.accessToken)}`,
      },
    })
    .then((response) => {
      return response.data.data;
    });
};
export const markAsRead = (id: ID) => {
  return instance.post(`/notifications/${id}/read`, [`${id}`], {
    headers: {
      Authorization: `Bearer ${appLocalStorage.getItem(appLocalStorageKey.accessToken)}`,
    },
  });
};
