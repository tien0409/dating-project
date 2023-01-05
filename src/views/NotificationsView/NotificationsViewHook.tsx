import { toast } from "react-toastify";

import useNotificationStore from "@/store/useNotificationStore";
import {
  useDeleteAllNotificationsData,
  useReadAllNotificationsData,
} from "@/hooks/useNotificationsData";
import { Modal } from "antd";

const useNotificationsView = () => {
  const notifications = useNotificationStore((state) => state.notifications);
  const setNotifications = useNotificationStore((state) => state.setNotifications);

  const { mutateAsync: deleteMutateAsync } = useDeleteAllNotificationsData();
  const { mutateAsync: readMutateAsync } = useReadAllNotificationsData();

  const doDeleteAll = async () => {
    try {
      await deleteMutateAsync();
      toast.success("All notifications deleted");
      setNotifications([]);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const handleDeleteAll = () => {
    Modal.confirm({
      title: "Are you sure you want to delete all notifications?",
      onOk: doDeleteAll,
    });
  };

  const handleReadAll = async () => {
    try {
      const res = await readMutateAsync();
      toast.success("All notifications marked as read");
      setNotifications(res.data.notifications);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  return {
    notifications,
    handleReadAll,
    handleDeleteAll,
  };
};
export default useNotificationsView;
