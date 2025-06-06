import { create } from "zustand";
import { Notification } from "../schemas/shemas";

type NotificationStore = {
  notifications: Notification[];
  addNotification: (n: Notification) => void;
  setNotifications: (list: Notification[]) => void;
};

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  addNotification: (n) =>
    set((state) => {
      if (state.notifications.find((i) => i.id === n.id)) return state;
      return { notifications: [n, ...state.notifications] };
    }),
  setNotifications: (list) =>
    set(() => ({
      notifications: list,
    })),
}));
