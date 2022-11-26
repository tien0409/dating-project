import classNames from "classnames/bind";

import styles from "./MessageList.module.scss";
import MessageItem from "./MessageItem";

const cln = classNames.bind(styles);

const MessageList = () => {
  return (
    <div className={cln("wrapper")}>
      {Array(20)
        .fill(0)
        .map((item, index) => (
          <MessageItem key={index} />
        ))}
    </div>
  );
};

export default MessageList;
