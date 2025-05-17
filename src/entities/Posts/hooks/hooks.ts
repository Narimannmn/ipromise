import { useMutation, useQuery } from "@tanstack/react-query";
import { User } from "@/entities/User/schemas/schemas";
import { CreatePostRequest } from "../schemas/schemas";
import { createPost, getFeed, getPostsByUserName } from "../services/services";

export const useCreatePost = () => {
  return useMutation({
    mutationFn: (data: CreatePostRequest) => createPost(data),
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
