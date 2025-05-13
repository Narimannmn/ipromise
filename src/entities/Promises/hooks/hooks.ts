import { useMutation, useQuery } from "@tanstack/react-query";
import { User } from "@/entities/User/schemas/schemas";
import { createPromise, getPromisesByUserName } from "../services/services";

export const useGetPromisesByUsername = (
  username: User["username"] | undefined,
) => {
  return useQuery({
    queryKey: ["useGetPromisesByUsername", username || 0],
    queryFn: () => {
      if (!username) {
        throw Error("missed username");
      }
      return getPromisesByUserName(username);
    },
    enabled: !!username,
  });
};

export const usePostPromise = () => {
  return useMutation({
    mutationKey: ["usePostPromise"],
    mutationFn: createPromise,
  });
};
