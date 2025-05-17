import { create } from "zustand";
import { IPromise } from "@/entities/Promises/shemas/shemas";

interface PromisePageStore {
  isCreateModalOpen: boolean;
  setIsCreateModal: (isOpen: boolean) => void;

  isEditModalOpen: boolean;
  setIsEditModal: (isOpen: boolean) => void;

  selectPromise: IPromise | null;
  setSelectPromise: (promise: IPromise | null) => void;
}

export const usePromisePageStore = create<PromisePageStore>((set) => ({
  isCreateModalOpen: false,
  setIsCreateModal: (isOpen) => set({ isCreateModalOpen: isOpen }),

  isEditModalOpen: false,
  setIsEditModal: (isOpen) => set({ isEditModalOpen: isOpen }),

  selectPromise: null,
  setSelectPromise: (promise) => set({ selectPromise: promise }),
}));
