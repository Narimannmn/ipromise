import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/entities/Auth/store/store";
import { appLocalStorageKey } from "@/shared/config/appLocalStorage/appLocalStorage";
import { appLocalStorage } from "@/shared/utils/appLocalStorage/appLocalStorage";
import { getUserMe } from "../services/services";

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
