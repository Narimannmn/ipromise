import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { User } from "@/entities/User/schemas/schemas";
import { ID } from "@/shared/schemas";
import {
  createMicroTask,
  createPromise,
  deleteMicroTask,
  getPromisesByUserName,
  getPromisesPrediction,
  updateMicroTask,
  updatePromise,
} from "../services/services";
import {
  IPromise,
  MicrotaskCreate,
  MicroTaskUpdate,
  PromiseCreate,
  PromiseCreateResponse,
  PromiseUpdate,
} from "../shemas/shemas";

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

export const useGetPromisePrediction = (id: IPromise["id"] | undefined) => {
  return useQuery({
    queryKey: ["useGetPromisePrediction", id || 0],
    queryFn: () => {
      if (!id) {
        throw Error("missed id");
      }
      return getPromisesPrediction(id);
    },
    enabled: !!id,
  });
};

export const usePostPromise = () => {
  const queryClient = useQueryClient();

  return useMutation<PromiseCreateResponse, string, PromiseCreate>({
    mutationKey: ["usePostPromise"],
    mutationFn: async (data) => createPromise(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["useGetPromisesByUsername"],
        exact: false,
      });
    },
  });
};

export const useDeleteMicroTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteMicroTask"],
    mutationFn: (id: ID) => deleteMicroTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["microtasks"] });
      queryClient.invalidateQueries({ queryKey: ["promises"] });
    },
  });
};

export const useCreateMicroTask = (promiseId: ID) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createMicroTask", promiseId],
    mutationFn: (microtask: MicrotaskCreate) =>
      createMicroTask(promiseId, microtask),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["microtasks", promiseId] });
      queryClient.invalidateQueries({ queryKey: ["promises", promiseId] });
    },
  });
};

export const useUpdateMicroTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateMicroTask"],
    mutationFn: ({
      microtaskId,
      microtask,
    }: {
      microtaskId: ID;
      microtask: MicroTaskUpdate;
    }) => updateMicroTask(microtaskId, microtask),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["microtasks"] });
      queryClient.invalidateQueries({ queryKey: ["promises"] });
    },
  });
};
export const useUpdatePromise = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updatePromise"],
    mutationFn: ({
      promiseId,
      promise,
    }: {
      promiseId: ID;
      promise: PromiseUpdate;
    }) => updatePromise(promiseId, promise),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["promises"] });
    },
  });
};
