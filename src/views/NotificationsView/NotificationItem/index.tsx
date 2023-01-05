import { memo } from "react";
import { When } from "react-if";
import classNames from "classnames/bind";
import Image from "next/image";

import styles from "./NotificationItem.module.scss";
import useNotificationItem from "./NotificationItemHook";
import { NotificationType } from "@/types";
import { formatDate } from "@/utils/date";
import NotificationItemDetail from "./NotificationItemDetail";

const cln = classNames.bind(styles);

export type NotificationItemProps = {
  notification: NotificationType;
};

const NotificationItem = (props: NotificationItemProps) => {
  const { notification } = props;

  const { open, setOpen, Icon, handleOpenDetail } = useNotificationItem(props);

  return (
    <>
      <li
        key={notification.id}
        className={cln("wrapper", {
          unread: !notification.isRead,
        })}
        onClick={handleOpenDetail}
      >
        <div className={cln("main__content")}>
          <div className={cln("image__wrapper")}>
            <Image src={Icon} alt={notification.type} width={50} height={50} />
          </div>

          <div className={cln("info")}>
            <h3 className={cln("title")}>{notification.title}</h3>
            <p
              className={cln("description", "text-truncate")}
              dangerouslySetInnerHTML={{ __html: notification.message }}
            ></p>
          </div>
        </div>

        <div className={cln("more__info")}>
          <span className={cln("time")}>
            {formatDate(notification.createdAt, "dd/MM/yyyy - HH:mm")}{" "}
          </span>
          <When condition={!notification.isRead}>
            <span className={cln("unread")}>&nbsp;</span>
          </When>
        </div>
      </li>

      <NotificationItemDetail notification={notification} open={open} setOpen={setOpen} />
    </>
  );
};

export default memo(NotificationItem);
