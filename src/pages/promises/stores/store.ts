import { create } from "zustand";

interface PromisePageStore {
  isCreateModalOpen: boolean;
  setIsCreateModal: (isOpen: boolean) => void;
}

export const usePromisePageStore = create<PromisePageStore>((set) => ({
  isCreateModalOpen: false,
  setIsCreateModal: (isOpen) => set({ isCreateModalOpen: isOpen }),
}));
