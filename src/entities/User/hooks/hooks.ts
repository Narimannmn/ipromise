import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/entities/Auth/store/store";
import { appLocalStorageKey } from "@/shared/config/appLocalStorage/appLocalStorage";
import { appLocalStorage } from "@/shared/utils/appLocalStorage/appLocalStorage";
import { User } from "../schemas/schemas";
import {
  getUserMe,
  getUserProfileByUserName,
  updateProfile,
} from "../services/services";

export const staleTime = 60 * 1000; // 1 minute

export const useGetUserMe = () => {
  const accessToken = appLocalStorage.getItem<string>(
    appLocalStorageKey.accessToken,
  );
  const setUser = useAuthStore((state) => state.setUser);
  const logout = useAuthStore((state) => state.logout);

  const query = useQuery({
    queryKey: ["userMe"],
    queryFn: async () => {
      if (accessToken == null) {
        logout();
        throw new Error("Authentification Error");
      }
      const user = await getUserMe();
      setUser(user);
      return user;
    },
    staleTime,
  });

  return query;
};

export const useGetProfileByUserName = (
  username: User["username"] | undefined,
) => {
  return useQuery({
    queryKey: ["useGetProfileByUserName", username || 0],
    queryFn: () => {
      if (!username) {
        throw Error("missed username");
      }
      return getUserProfileByUserName(username);
    },
    staleTime,
    enabled: !!username,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["useUpdateProfile"],
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["useGetProfileByUserName"],
      });
    },
  });
};
