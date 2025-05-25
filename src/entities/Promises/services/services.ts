import axios from "axios";
import { t } from "i18next";
import { z } from "zod";
import { User } from "@/entities/User/schemas/schemas";
import { instance } from "@/shared/api/instance";
import { appLocalStorageKey } from "@/shared/config/appLocalStorage/appLocalStorage";
import { ID } from "@/shared/schemas";
import { BackendCustomResponseSchema } from "@/shared/schemas/error/error";
import { appLocalStorage } from "@/shared/utils/appLocalStorage/appLocalStorage";
import {
  IPromise,
  IPromisePrediction,
  IPromisePredictionSchema,
  IPromiseSchema,
  MicrotaskCreate,
  MicroTaskUpdate,
  PromiseCreate,
  PromiseCreateResponse,
  PromiseUpdate,
} from "../shemas/shemas";

export const getPromisesByUserName = async (username: User["username"]) => {
  return instance
    .get<IPromise[]>(`promises/user/${username}/progress`, {
      headers: {
        Authorization: `Bearer ${appLocalStorage.getItem(appLocalStorageKey.accessToken)}`,
      },
    })
    .then((response) => {
      const result = BackendCustomResponseSchema(
        z.array(IPromiseSchema).nullable(),
      ).safeParse(response.data);
      if (!result.success) {
        throw new Error(t("invalidType", { ns: "requests" }));
      }
      return result.data.data;
    });
};

export const getPromisesPrediction = async (id: ID) => {
  return instance
    .get<IPromisePrediction>(`promises/${id}/prediction`, {
      headers: {
        Authorization: `Bearer ${appLocalStorage.getItem(appLocalStorageKey.accessToken)}`,
      },
    })
    .then((response) => {
      const result = BackendCustomResponseSchema(
        IPromisePredictionSchema,
      ).safeParse(response.data);
      if (!result.success) {
        throw new Error(t("invalidType", { ns: "requests" }));
      }
      return result.data.data;
    });
};

export const createPromise = async (
  promise: PromiseCreate,
): Promise<PromiseCreateResponse> => {
  try {
    const res = await instance.post<PromiseCreateResponse>(
      "promises/full",
      promise,
      {
        headers: {
          Authorization: `Bearer ${appLocalStorage.getItem(appLocalStorageKey.accessToken)}`,
        },
      },
    );
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const errData = error.response?.data;

      if (
        errData &&
        typeof errData === "object" &&
        "code" in errData &&
        "status" in errData &&
        "message" in errData
      ) {
        throw errData.message as string;
      }
      throw new Error("Unexpected Axios error response");
    }

    if (error instanceof Error) {
      throw error;
    }

    throw new Error("Unknown error occurred");
  }
};

export const deleteMicroTask = async (id: ID) => {
  return instance.delete<PromiseCreateResponse>(`microtasks/${id}`, {
    headers: {
      Authorization: `Bearer ${appLocalStorage.getItem(appLocalStorageKey.accessToken)}`,
    },
  });
};
export const createMicroTask = async (
  promiseId: ID,
  microtask: MicrotaskCreate,
) => {
  return instance.post<PromiseCreateResponse>(
    `promises/${promiseId}/microtasks`,
    microtask,
    {
      headers: {
        Authorization: `Bearer ${appLocalStorage.getItem(appLocalStorageKey.accessToken)}`,
      },
    },
  );
};
export const updateMicroTask = async (
  microtaskId: ID,
  microtask: MicroTaskUpdate,
) => {
  return instance.patch<PromiseCreateResponse>(
    `microtasks/${microtaskId}`,
    microtask,
    {
      headers: {
        Authorization: `Bearer ${appLocalStorage.getItem(appLocalStorageKey.accessToken)}`,
      },
    },
  );
};

export const updatePromise = async (promiseId: ID, promise: PromiseUpdate) => {
  return instance.patch<PromiseCreateResponse>(
    `promises/${promiseId}`,
    promise,
    {
      headers: {
        Authorization: `Bearer ${appLocalStorage.getItem(appLocalStorageKey.accessToken)}`,
      },
    },
  );
};
