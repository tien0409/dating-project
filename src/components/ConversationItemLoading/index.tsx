import classNames from "classnames/bind";
import { Skeleton } from "antd";

import styles from "./ConversationItemLoading.module.scss";

const cln = classNames.bind(styles);

const ConversationItemLoading = () => {
  return (
    <div className={cln("wrapper")}>
      <Skeleton.Avatar active />
      <Skeleton.Input block active />
    </div>
  );
};

export default ConversationItemLoading;
