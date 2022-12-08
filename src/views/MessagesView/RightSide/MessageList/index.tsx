import classNames from "classnames/bind";

import styles from "./MessageList.module.scss";
import MessageItem from "./MessageItem";
import useMessageList from "./MessageListHook";
import { If, Then } from "react-if";

const cln = classNames.bind(styles);

const MessageList = () => {
  const {
    lastMessageEl,
    isReceiverTyping,
    receiverParticipant,
    loadingGetMessages,
    _messagesInternal,
  } = useMessageList();

  return (
    <div className={cln("wrapper")}>
      {_messagesInternal.map((message, index) => (
        <MessageItem
          loading={loadingGetMessages}
          message={loadingGetMessages ? undefined : message}
          key={message?.id || index}
        />
      ))}
      <If condition={isReceiverTyping}>
        <Then>
          <MessageItem _participantTyping={receiverParticipant} />
        </Then>
      </If>
      <div ref={lastMessageEl}></div>
    </div>
  );
};

export default MessageList;
