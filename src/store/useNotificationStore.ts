import create from "zustand";

import { NotificationType } from "@/types";

type NotificationStoreType = {
  resetNotifications: boolean;
  setResetNotifications: (_resetNotifications: boolean) => void;
  notifications: NotificationType[];
  setNotifications: (_notifications: NotificationType[]) => void;
};

const useNotificationStore = create<NotificationStoreType>((setState) => ({
  resetNotifications: true,
  setResetNotifications: (resetNotifications) =>
    setState((state) => ({ ...state, resetNotifications })),
  notifications: [],
  setNotifications: (notifications) => setState((state) => ({ ...state, notifications })),
}));

export default useNotificationStore;
