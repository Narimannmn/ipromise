import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { ID } from "@/shared/schemas";
import { CreatePostRequest, Post } from "../schemas/schemas";
import {
  createComment,
  createCommentProps,
  createPost,
  getFeed,
  getUserPostsFeed,
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

export const useInfiniteUserPosts = (username: string | undefined) => {
  return useInfiniteQuery({
    queryKey: ["infiniteUserPosts", username],
    queryFn: ({ pageParam = undefined }) => {
      if (!username) throw new Error("Username is required");
      return getUserPostsFeed({ username, pageParam });
    },
    initialPageParam: undefined,
    enabled: !!username,
    getNextPageParam: (lastPage: Post[]) => {
      if (lastPage.length === 0) return undefined;
      return {
        after: lastPage[lastPage.length - 1].created_at,
        after_id: lastPage[lastPage.length - 1].id,
      };
    },
  });
};

// export const useGetFeedPosts = () => {
//   return useQuery({
//     queryKey: ["useGetFeedPosts"],
//     queryFn: () => {
//       return getFeed();
//     },
//   });
// };
export const useInfiniteFeedPosts = () => {
  return useInfiniteQuery({
    queryKey: ["infiniteFeedPosts"],
    queryFn: ({ pageParam = undefined }) => getFeed({ pageParam }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage: Post[]) => {
      if (lastPage.length === 0) return undefined;
      return {
        after: lastPage[lastPage.length - 1].created_at,
        after_id: lastPage[lastPage.length - 1].id,
      };
    },
  });
};
