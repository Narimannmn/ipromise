import { useQuery } from "@tanstack/react-query";
import { User } from "@/entities/User/schemas/schemas";
import { getBagesByUserName } from "../services/services";

export const useGetBadgesByUsername = (
  username: User["username"] | undefined,
) => {
  return useQuery({
    queryKey: ["useGetBadgesByUsername", username || 0],
    queryFn: () => {
      if (!username) {
        throw Error("missed username");
      }
      return getBagesByUserName(username);
    },
    enabled: !!username,
  });
};
