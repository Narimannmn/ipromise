import { t } from "i18next";
import { z } from "zod";
import { User } from "@/entities/User/schemas/schemas";
import { instance } from "@/shared/api/instance";
import { appLocalStorageKey } from "@/shared/config/appLocalStorage/appLocalStorage";
import { BackendCustomResponseSchema } from "@/shared/schemas/error/error";
import { appLocalStorage } from "@/shared/utils/appLocalStorage/appLocalStorage";
import { Friend, FriendSchema } from "../schemas/schemas";

const authHeader = {
  headers: {
    Authorization: `Bearer ${appLocalStorage.getItem(appLocalStorageKey.accessToken)}`,
  },
};
// GET /follow/recommended
export const getRecommendedFriends = async () => {
  return instance
    .get<Friend[]>("/follow/recommended", authHeader)
    .then((response) => {
      const result = BackendCustomResponseSchema(
        z.array(FriendSchema).nullable(),
      ).safeParse(response.data);
      if (!result.success) {
        throw new Error(t("invalidType", { ns: "requests" }));
      }
      return result.data.data;
    });
};

// GET /follow/requests
export const getIncomingFollowRequests = async () => {
  return instance
    .get<Friend[]>("/follow/requests", authHeader)
    .then((response) => {
      const result = BackendCustomResponseSchema(
        z.array(FriendSchema).nullable(),
      ).safeParse(response.data);
      if (!result.success) {
        throw new Error(t("invalidType", { ns: "requests" }));
      }
      return result.data.data;
    });
};

// GET /follow/requests/sent
export const getSentFollowRequests = async () => {
  return instance
    .get<Friend[]>("/follow/requests/sent", authHeader)
    .then((response) => {
      const result = BackendCustomResponseSchema(
        z.array(FriendSchema).nullable(),
      ).safeParse(response.data);
      if (!result.success) {
        throw new Error(t("invalidType", { ns: "requests" }));
      }
      return result.data.data;
    });
};

// POST /follow/{username}
export const sendFollowRequest = async (username: User["username"]) => {
  return instance.post(`/follow/${username}`, {}, authHeader);
};

// DELETE /follow/{username}
export const unfollowUser = async (username: User["username"]) => {
  return instance.delete(`/follow/${username}`, authHeader);
};

// POST /follow/{username}/accept
export const acceptFollowRequest = async (username: User["username"]) => {
  return instance.post(`/follow/${username}/accept`, {}, authHeader);
};

// POST /follow/{username}/decline
export const declineFollowRequest = async (username: User["username"]) => {
  return instance.post(`/follow/${username}/decline`, {}, authHeader);
};

export const removeFollowRequest = async (username: User["username"]) => {
  return instance.delete(`/follow/requests/${username}/cancel`, authHeader);
};

// GET /friends/{username}
export const getFriends = async (username: User["username"]) => {
  return instance.get(`/friends/${username}`, authHeader).then((response) => {
    const result = BackendCustomResponseSchema(
      z.array(FriendSchema).nullable(),
    ).safeParse(response.data);
    if (!result.success) {
      throw new Error(t("invalidType", { ns: "requests" }));
    }
    return result.data.data;
  });
};
