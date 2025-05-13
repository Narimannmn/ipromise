import { useMutation } from "@tanstack/react-query";
import { login, register } from "../services/services";

export const useLogin = () => {
  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: login,
  });

  return mutation;
};

export const useRegistration = () => {
  const mutation = useMutation({
    mutationKey: ["register"],
    mutationFn: register,
  });

  return mutation;
};
