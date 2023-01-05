import create from "zustand";
import { NotificationType } from "@/types";

type NotificationStoreType = {
  notifications: NotificationType[];
  setNotifications: (_notifications: NotificationType[]) => void;
};

const useNotificationStore = create<NotificationStoreType>((setState, getState) => ({
  notifications: [],
  setNotifications: (notifications) => setState((state) => ({ ...state, notifications })),
}));

export default useNotificationStore;
