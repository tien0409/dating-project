import { Modal } from "antd";
import classNames from "classnames/bind";

import styles from "./SnoozeModal.module.scss";

const cln = classNames.bind(styles);

const SnoozeModal = () => {
  return (
    <Modal open={false} footer={false}>
      <div className={cln("wrapper")}>
        <h3 className={cln("title")}>Snooze</h3>
        <p className={cln("description")}>How long do you want to be invisible for?</p>

        <ul className={cln("time__list")}>
          <li className={cln("time__item")}>24 Hours</li>
          <li className={cln("time__item")}>24 Hours</li>
          <li className={cln("time__item")}>24 Hours</li>
        </ul>
      </div>
    </Modal>
  );
};

export default SnoozeModal;
