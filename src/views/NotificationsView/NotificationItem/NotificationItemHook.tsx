import { useMemo, useState } from "react";
import { AiOutlineDollar, AiOutlineHeart, AiOutlineSetting } from "react-icons/ai";

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
        return AiOutlineSetting;
      case "PAYMENT":
        return AiOutlineDollar;
      case "MATCHED":
        return AiOutlineHeart;
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
