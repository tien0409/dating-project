import classNames from "classnames/bind";
import { Form } from "antd";

import styles from "./SettingNotifications.module.scss";
import SettingContainer from "../SettingContainer";
import SettingNotificationItem from "./SettingNotificationItem";

const cln = classNames.bind(styles);

const SettingNotifications = () => {
  return (
    <SettingContainer
      title={"Notifications"}
      subTitle={"Choose what you want to be notified about"}
    >
      <div className={cln("wrapper")}>
        <Form>
          <ul className={cln("notification__list")}>
            <SettingNotificationItem text="New messages" />
            <SettingNotificationItem text="New matches" />
            <SettingNotificationItem text="Expiring matches" />
            <SettingNotificationItem text="System" />
            <SettingNotificationItem text="Sounds" />
          </ul>
        </Form>
      </div>
    </SettingContainer>
  );
};

export default SettingNotifications;
