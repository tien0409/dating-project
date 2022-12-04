import classNames from "classnames/bind";

import styles from "./MessageList.module.scss";
import MessageItem from "./MessageItem";
import useMessageList from "./MessageListHook";

const cln = classNames.bind(styles);

const MessageList = () => {
  const { lastMessageRef, messages } = useMessageList();

  return (
    <div className={cln("wrapper")}>
      {messages.map((message) => (
        <MessageItem message={message} key={message.id} />
      ))}
      <div ref={lastMessageRef}></div>
    </div>
  );
};

export default MessageList;
