import { Button, Modal } from "antd";
import { Dispatch, SetStateAction } from "react";
import classNames from "classnames/bind";

import styles from "./NotificationItemDetail.module.scss";
import useNotificationItemDetail from "./NotificationItemDetailHook";
import { NotificationType } from "@/types";
import { formatDate } from "@/utils/date";

export type NotificationItemDetailType = {
  notification: NotificationType;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const cln = classNames.bind(styles);

const NotificationItemDetail = (props: NotificationItemDetailType) => {
  const { notification, open, setOpen } = props;

  const { loading, loadingType, handleUnread, handleDelete } = useNotificationItemDetail(props);

  return (
    <Modal width={700} open={open} footer={false} onCancel={() => setOpen(false)}>
      <div className={cln("wrapper")}>
        <h3 className={cln("title")}>{notification.title}</h3>

        <div className={cln("time")}>
          Created by: {notification.sender?.fullName || "System"} -{" "}
          {formatDate(notification.createdAt, "dd/MM/yyyy, HH:mm")}
        </div>
        <p dangerouslySetInnerHTML={{ __html: notification.message }}></p>

        <div className={cln("actions")}>
          <Button
            className={cln("btn__mark-unread")}
            size="large"
            loading={loading && loadingType === "MARK_UNREAD"}
            disabled={loading}
            onClick={handleUnread}
          >
            Mark unread
          </Button>
          <Button
            type="primary"
            size="large"
            loading={loading && loadingType === "DELETE"}
            disabled={loading}
            onClick={handleDelete}
          >
            Delete notification
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default NotificationItemDetail;
