import { useCallback, useEffect } from "react";

import { useSocketStore } from "@/store/index";
import { ON_CREATE_NOTIFICATION, ON_RESET_NOTIFICATIONS } from "@/configs/socket-events";
import { AxiosResponseType, NotificationType } from "@/types";
import { useNotificationsData } from "@/hooks/useNotificationsData";
import useNotificationStore from "@/store/useNotificationStore";

const useNotificationsSocket = () => {
  const socket = useSocketStore((state) => state.socket);
  const resetNotifications = useNotificationStore((state) => state.resetNotifications);
  const notifications = useNotificationStore((state) => state.notifications);
  const setNotifications = useNotificationStore((state) => state.setNotifications);
  const setResetNotifications = useNotificationStore((state) => state.setResetNotifications);

  const handleSuccess = useCallback(
    (res: AxiosResponseType<NotificationType>) => {
      setNotifications(res.data.notifications);
      setResetNotifications(false);
    },
    [setNotifications, setResetNotifications],
  );

  useNotificationsData({ onSuccess: handleSuccess, enabled: resetNotifications });

  useEffect(() => {
    if (!socket) return;

    socket.on(ON_CREATE_NOTIFICATION, (payload: NotificationType) => {
      setNotifications([payload, ...notifications]);
    });

    socket.on(ON_RESET_NOTIFICATIONS, () => {
      console.log("reset");
      setResetNotifications(true);
    });

    return () => {
      socket.off(ON_CREATE_NOTIFICATION);
      socket.off(ON_RESET_NOTIFICATIONS);
    };
  }, [notifications, setNotifications, setResetNotifications, socket]);
};

export default useNotificationsSocket;
