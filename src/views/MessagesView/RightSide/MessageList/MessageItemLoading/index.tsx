import classNames from "classnames/bind";
import { Skeleton } from "antd";

import styles from "./MessageItemLoading.module.scss";

const cln = classNames.bind(styles);

const MessageItemLoading = () => {
  return (
    <div
      className={cln("wrapper", {
        "is-sender": Math.random() > 0.5,
      })}
    >
      <Skeleton.Avatar active />
      <div style={{ width: Math.random() * 40 + 30 + "%" }}>
        <Skeleton.Input active block />
      </div>
    </div>
  );
};

export default MessageItemLoading;
