import classNames from "classnames/bind";

import styles from "./MessageList.module.scss";
import MessageItem from "./MessageItem";
import useMessageList from "./MessageListHook";

const cln = classNames.bind(styles);

const MessageList = () => {
  const { loadingGetMessages, lastMessageRef, _messagesInternal } = useMessageList();

  return (
    <div className={cln("wrapper")}>
      {_messagesInternal.map((message, index) => (
        <MessageItem
          loading={loadingGetMessages}
          message={loadingGetMessages ? undefined : message}
          key={message?.id || index}
        />
      ))}
      <div ref={lastMessageRef}></div>
    </div>
  );
};

export default MessageList;
