import classNames from "classnames/bind";
import { Form, Switch } from "antd";
import { MdArrowForwardIos } from "react-icons/md";

import styles from "./UserSettings.module.scss";
import DateStatusModal from "@/views/SettingsView/UserSettings/DateStatusModal";
import SnoozeModal from "./SnoozeModal";

const cln = classNames.bind(styles);

const UserSettings = () => {
  return (
    <div>
      <Form>
        <Form.Item>
          <div className={cln("form__item")}>
            <span>I'm here to</span>
            <div className={cln("value__choose")}>
              <span>Date</span>
              <MdArrowForwardIos className={cln("icon")} />
            </div>
          </div>
        </Form.Item>

        <Form.Item>
          <div className={cln("form__item")}>
            <span>Snooze</span>
            <Switch size="small" />
          </div>
          <p className={cln("snooze__description")}>
            Turning this on will hide you from all of Dating modes for as long as you choose. Your
            existing matches will remain accessible.
          </p>
        </Form.Item>
      </Form>

      <DateStatusModal />
      <SnoozeModal />
    </div>
  );
};

export default UserSettings;
