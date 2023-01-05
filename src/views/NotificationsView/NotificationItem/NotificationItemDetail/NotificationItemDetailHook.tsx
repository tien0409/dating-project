import { toast } from "react-toastify";
import { useState } from "react";

import { NotificationItemDetailType } from ".";
import { useDeleteNotificationData, useUnreadNotificationData } from "@/hooks/useNotificationsData";
import useNotificationStore from "@/store/useNotificationStore";
import { Modal } from "antd";

const useNotificationItemDetail = (props: NotificationItemDetailType) => {
  const { notification, setOpen } = props;

  const notifications = useNotificationStore((state) => state.notifications);
  const setNotifications = useNotificationStore((state) => state.setNotifications);

  const [loading, setLoading] = useState(false);
  const [loadingType, setLoadingType] = useState<"MARK_UNREAD" | "DELETE">("MARK_UNREAD");

  const { mutateAsync } = useUnreadNotificationData();
  const { mutateAsync: deleteMutateAsync } = useDeleteNotificationData();

  const handleUnread = async () => {
    try {
      setLoading(true);
      setLoadingType("MARK_UNREAD");
      await mutateAsync(notification.id);
      setOpen(false);
      setNotifications(
        notifications.map((item) =>
          item.id === notification.id ? { ...item, isRead: false } : item,
        ),
      );
      toast.success("Marked unread successfully");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const doDelete = async () => {
    try {
      setLoading(true);
      setLoadingType("DELETE");
      await deleteMutateAsync(notification.id);
      setOpen(false);
      setNotifications(notifications.filter((item) => item.id !== notification.id));
      toast.success("Notification deleted");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    Modal.confirm({
      title: "Are you sure you want to delete this notification?",
      onOk: doDelete,
    });
  };

  return { loading, loadingType, handleUnread, handleDelete };
};

export default useNotificationItemDetail;
