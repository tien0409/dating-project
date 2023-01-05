import classNames from "classnames/bind";

import styles from "./NotificationsView.module.scss";
import useNotificationsView from "./NotificationsViewHook";
import NotificationItem from "./NotificationItem";

const cln = classNames.bind(styles);

const NotificationsView = () => {
  const { notifications, handleReadAll, handleDeleteAll } = useNotificationsView();

  return (
    <div className={cln("wrapper")}>
      <div className={cln("actions")}>
        <span onClick={handleReadAll}>Mark read all</span>
        <span onClick={handleDeleteAll}>Delete all</span>
      </div>

      <ul className={cln("notification__list")}>
        {notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </ul>
    </div>
  );
};

export default NotificationsView;
