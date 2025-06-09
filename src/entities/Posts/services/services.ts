import { t } from "i18next";
import { instance } from "@/shared/api/instance";
import { appLocalStorageKey } from "@/shared/config/appLocalStorage/appLocalStorage";
import { ID } from "@/shared/schemas";
import { BackendCustomResponseSchema } from "@/shared/schemas/error/error";
import { appLocalStorage } from "@/shared/utils/appLocalStorage/appLocalStorage";
import {
  CreatePostRequest,
  getPostsByUserNameSchema,
} from "../schemas/schemas";

export interface CreatePostResponse {
  message: string;
}
export interface BackendErrorResponse {
  code: number;
  message: string;
  status: string;
}
export const createPost = (payload: CreatePostRequest) => {
  const formData = new FormData();

  formData.append("microtask_id", payload.microtask_id);
  if (payload.promise_id) formData.append("promise_id", payload.promise_id);
  formData.append("content", payload.content);

  if (payload.attachments) {
    for (const file of payload.attachments) {
      formData.append("attachments", file); // 👈 одно имя, много файлов = массив
    }
  }

  return instance.post<CreatePostResponse, BackendErrorResponse>(
    "posts",
    formData,
    {
      headers: {
        Authorization: `Bearer ${appLocalStorage.getItem(appLocalStorageKey.accessToken)}`,
        "Content-Type": "multipart/form-data",
      },
    },
  );
};

export const getFeed = async ({
  pageParam,
}: {
  pageParam?: {
    after: string;
    after_id: string;
  };
}) => {
  const params: Record<string, unknown> = {
    limit: 5,
  };

  if (pageParam) {
    params.after_created_at = pageParam.after;
    params.after_id = pageParam.after_id;
  }

  const response = await instance.get("posts/public/tree", {
    params,
    headers: {
      Authorization: `Bearer ${appLocalStorage.getItem(appLocalStorageKey.accessToken)}`,
    },
  });

  const result = BackendCustomResponseSchema(
    getPostsByUserNameSchema,
  ).safeParse(response.data);
  if (!result.success) {
    throw new Error("Invalid response format");
  }

  return result.data.data.posts;
};

export const getUserPostsFeed = async ({
  username,
  pageParam,
}: {
  username: string;
  pageParam?: {
    after: string;
    after_id: string;
  };
}) => {
  const params: Record<string, unknown> = {
    limit: 5,
  };

  if (pageParam) {
    params.after_created_at = pageParam.after;
    params.after_id = pageParam.after_id;
  }

  const response = await instance.get(`posts/user/${username}`, {
    params,
    headers: {
      Authorization: `Bearer ${appLocalStorage.getItem(appLocalStorageKey.accessToken)}`,
    },
  });

  const result = BackendCustomResponseSchema(
    getPostsByUserNameSchema,
  ).safeParse(response.data);
  if (!result.success) {
    throw new Error(t("invalidType", { ns: "requests" }));
  }

  return result.data.data.posts;
};
export interface createCommentProps {
  id: ID;
  content: string;
  attachments?: File[];
}

export const createComment = async (payload: createCommentProps) => {
  const formData = new FormData();

  formData.append("id", payload.id);
  if (payload.content) formData.append("promise_id", payload.content);
  formData.append("content", payload.content);

  if (payload.attachments) {
    payload.attachments.forEach((file) => {
      formData.append("attachments", file);
    });
  }

  return instance.post<CreatePostResponse>(
    `posts/${payload.id}/comments`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${appLocalStorage.getItem(appLocalStorageKey.accessToken)}`,
        "Content-Type": "multipart/form-data",
      },
    },
  );
};

export const LikePost = async (id: ID) => {
  return instance.post(`posts/${id}/like`, null, {
    headers: {
      Authorization: `Bearer ${appLocalStorage.getItem(appLocalStorageKey.accessToken)}`,
    },
  });
};
export const UnLikePost = async (id: ID) => {
  return instance.post(`posts/${id}/unlike`, null, {
    headers: {
      Authorization: `Bearer ${appLocalStorage.getItem(appLocalStorageKey.accessToken)}`,
    },
  });
};

export const getPostById = async (postId: string) => {
  const response = await instance.get(`/posts/${postId}/full`, {
    headers: {
      Authorization: `Bearer ${appLocalStorage.getItem(appLocalStorageKey.accessToken)}`,
    },
  });

  return response.data.data;
};
