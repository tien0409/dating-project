import classNames from "classnames/bind";
import { Switch } from "antd";

import styles from "./SettingNotification.module.scss";

const cln = classNames.bind(styles);

type SettingNotificationItemProps = {
  text: string;
};

const SettingNotificationItem = (props: SettingNotificationItemProps) => {
  const { text } = props;

  return (
    <div className={cln("wrapper")}>
      <div>{text}</div>
      <Switch size="small" />
    </div>
  );
};

export default SettingNotificationItem;
