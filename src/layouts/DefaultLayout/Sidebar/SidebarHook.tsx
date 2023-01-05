import { useCallback, useMemo } from "react";
import { deleteCookie } from "cookies-next";

import { AUTH_ROUTE } from "@/configs/routes";
import useAuthStore from "@/store/useAuthStore";
import useNotificationStore from "@/store/useNotificationStore";

const useSidebar = () => {
  const profile = useAuthStore((state) => state.profile);
  const notifications = useNotificationStore((state) => state.notifications);

  const countNotificationsUnread = useMemo(
    () => notifications.filter((notification) => !notification.isRead)?.length,
    [notifications],
  );

  const handleLogout = useCallback(() => {
    deleteCookie("Authentication");
    deleteCookie("Refresh");
    document.location.href = AUTH_ROUTE;
  }, []);

  return {
    profile,
    countNotificationsUnread,
    handleLogout,
  };
};

export default useSidebar;
