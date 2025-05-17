import { create } from "zustand";

interface CreatePostModalStore {
  isCreatePostModalOpen: boolean;
  setIsCreatePostModalOpen: (isOpen: boolean) => void;
}

export const useCreatePostModalStore = create<CreatePostModalStore>((set) => ({
  isCreatePostModalOpen: false,
  setIsCreatePostModalOpen: (isOpen) => set({ isCreatePostModalOpen: isOpen }),
}));
