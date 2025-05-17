import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { User } from "@/entities/User/schemas/schemas";
import {
  acceptFollowRequest,
  declineFollowRequest,
  getFriends,
  getIncomingFollowRequests,
  getRecommendedFriends,
  getSentFollowRequests,
  sendFollowRequest,
  unfollowUser,
} from "../services/services";

// useQuery for GET /follow/recommended
export const useGetRecommendedFriends = () => {
  return useQuery({
    queryKey: ["useGetRecommendedFriends"],
    queryFn: getRecommendedFriends,
    staleTime: 1000 * 60, // Adjust as needed
  });
};

// useQuery for GET /follow/requests
export const useGetIncomingFollowRequests = () => {
  return useQuery({
    queryKey: ["useGetIncomingFollowRequests"],
    queryFn: getIncomingFollowRequests,
    staleTime: 1000 * 60,
  });
};

// useQuery for GET /follow/requests/sent
export const useGetSentFollowRequests = () => {
  return useQuery({
    queryKey: ["useGetSentFollowRequests"],
    queryFn: getSentFollowRequests,
    staleTime: 1000 * 60,
  });
};

// useQuery for GET /friends/{username}
export const useGetFriends = (username: User["username"] | undefined) => {
  return useQuery({
    queryKey: ["useGetFriends", username || 0],
    queryFn: () => {
      if (!username) throw new Error("missed username");
      return getFriends(username);
    },
    staleTime: 1000 * 60,
    enabled: !!username,
  });
};

// useMutation for POST /follow/{username}
export const useSendFollowRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (username: User["username"]) => sendFollowRequest(username),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["useGetSentFollowRequests"] });
      queryClient.invalidateQueries({
        queryKey: ["useSendFollowRequest"],
      });
      queryClient.invalidateQueries({
        queryKey: ["useGetRecommendedFriends"],
      });
    },
  });
};

// useMutation for DELETE /follow/{username}
export const useUnfollowUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (username: User["username"]) => unfollowUser(username),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["useGetFriends"] });
    },
  });
};

// useMutation for POST /follow/{username}/accept
export const useAcceptFollowRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (username: User["username"]) => acceptFollowRequest(username),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["useGetIncomingFollowRequests"],
      });
      queryClient.invalidateQueries({ queryKey: ["useGetFriends"] });
    },
  });
};

// useMutation for POST /follow/{username}/decline
export const useDeclineFollowRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (username: User["username"]) => declineFollowRequest(username),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["useGetIncomingFollowRequests"],
      });
    },
  });
};
