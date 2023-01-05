import { useCallback, useEffect } from "react";

import { useSocketStore } from "@/store/index";
import { ON_CREATE_NOTIFICATION } from "@/configs/socket-events";
import { AxiosResponseType, NotificationType } from "@/types";
import { useNotificationsData } from "@/hooks/useNotificationsData";
import useNotificationStore from "@/store/useNotificationStore";

const useNotificationsSocket = () => {
  const socket = useSocketStore((state) => state.socket);
  const notifications = useNotificationStore((state) => state.notifications);
  const setNotifications = useNotificationStore((state) => state.setNotifications);

  const handleSuccess = useCallback(
    (res: AxiosResponseType<NotificationType>) => {
      setNotifications(res.data.notifications);
    },
    [setNotifications],
  );

  useNotificationsData({ onSuccess: handleSuccess });

  useEffect(() => {
    if (!socket) return;

    socket.on(ON_CREATE_NOTIFICATION, (payload: NotificationType) => {
      setNotifications([payload, ...notifications]);
    });

    return () => {
      socket.off(ON_CREATE_NOTIFICATION);
    };
  }, [notifications, setNotifications, socket]);
};

export default useNotificationsSocket;
