import { useMutation, useQuery } from "@tanstack/react-query";
import { getNotifications, markAsRead } from "../services/services";

export const useGetNotications = () => {
  return useQuery({
    queryKey: ["useGetNotications"],
    queryFn: () => {
      return getNotifications();
    },
  });
};
export const useMarkAsRead = () => {
  return useMutation({
    mutationKey: ["useMarkAsRead"],
    mutationFn: markAsRead,
  });
};
