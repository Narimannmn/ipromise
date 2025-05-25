import { useMutation, useQuery } from "@tanstack/react-query";
import { User } from "@/entities/User/schemas/schemas";
import { ID } from "@/shared/schemas";
import { CreatePostRequest } from "../schemas/schemas";
import {
  createComment,
  createCommentProps,
  createPost,
  getFeed,
  getPostsByUserName,
  LikePost,
  UnLikePost,
} from "../services/services";

export const useCreatePost = () => {
  return useMutation({
    mutationFn: (data: CreatePostRequest) => createPost(data),
  });
};

export const useCreateComment = () => {
  return useMutation({
    mutationFn: (data: createCommentProps) => createComment(data),
  });
};

export const useLikePost = () => {
  return useMutation({
    mutationFn: (id: ID) => LikePost(id),
  });
};

export const useUnlikePost = () => {
  return useMutation({
    mutationFn: (id: ID) => UnLikePost(id),
  });
};

export const useGetPostsByUsername = (
  username: User["username"] | undefined,
) => {
  return useQuery({
    queryKey: ["useGetPostsByUsername", username || 0],
    queryFn: () => {
      if (!username) {
        throw Error("missed username");
      }
      return getPostsByUserName(username);
    },
    enabled: !!username,
  });
};

export const useGetFeedPosts = () => {
  return useQuery({
    queryKey: ["useGetFeedPosts"],
    queryFn: () => {
      return getFeed();
    },
  });
};
