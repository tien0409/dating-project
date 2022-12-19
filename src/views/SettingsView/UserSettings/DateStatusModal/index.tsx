import { Button, Modal } from "antd";
import classNames from "classnames/bind";
import { TiTick } from "react-icons/ti";

import styles from "./DateStatusModal.module.scss";

const cln = classNames.bind(styles);

const DateStatusModal = () => {
  return (
    <Modal open={false} footer={false}>
      <div className={cln("wrapper")}>
        <h3 className={cln("title")}>I&rsquo;m here to</h3>

        <ul className={cln("status__list")}>
          <li className={cln("status__item", "is-active")}>
            <div className={cln("status__item-info")}>
              <h5>Date</h5>
              <p>Find that spark in an empowered community</p>
            </div>

            <TiTick size={23} className={cln("status__item-icon")} />
          </li>

          <li className={cln("status__item")}>
            <div className={cln("status__item-info")}>
              <h5>Date</h5>
              <p>Find that spark in an empowered community</p>
            </div>
          </li>
        </ul>

        <div className={cln("btn")}>
          <Button type="primary" shape="round" size="large">
            Continue with BFF
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DateStatusModal;
