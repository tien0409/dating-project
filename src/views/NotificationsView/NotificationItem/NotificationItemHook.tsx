import { useMemo, useState } from "react";

import SystemIcon from "@/assets/images/system-icon.svg";
import PaymentIcon from "@/assets/images/wallet-icon.svg";
import { NotificationItemProps } from ".";
import useNotificationStore from "@/store/useNotificationStore";
import { useReadNotificationData } from "@/hooks/useNotificationsData";

const useNotificationItem = (props: NotificationItemProps) => {
  const { notification } = props;

  const notifications = useNotificationStore((state) => state.notifications);
  const setNotifications = useNotificationStore((state) => state.setNotifications);

  const [open, setOpen] = useState(false);

  const { mutateAsync } = useReadNotificationData();

  const Icon = useMemo(() => {
    switch (notification.type) {
      case "SYSTEM":
        return SystemIcon;
      case "MATCHED":
        return PaymentIcon;
    }
  }, [notification.type]);

  const handleOpenDetail = async () => {
    setOpen(true);
    setNotifications(
      notifications.map((item) => (item.id === notification.id ? { ...item, isRead: true } : item)),
    );

    if (!notification.isRead) await mutateAsync(notification.id);
  };

  return { open, setOpen, Icon, handleOpenDetail };
};

export default useNotificationItem;
