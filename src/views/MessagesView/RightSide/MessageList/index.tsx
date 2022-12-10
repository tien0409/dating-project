import classNames from "classnames/bind";
import { Else, If, Then } from "react-if";

import styles from "./MessageList.module.scss";
import MessageItem from "./MessageItem";
import useMessageList from "./MessageListHook";
import MessageItemLoading from "./MessageItemLoading";

const cln = classNames.bind(styles);

const MessageList = () => {
  const {
    lastMessageEl,
    isReceiverTyping,
    receiverParticipant,
    loadingGetMessages,
    messages,
  } = useMessageList();

  return (
    <div className={cln("wrapper")}>
      <If condition={loadingGetMessages}>
        <Then>
          {Array(15)
            .fill(0)
            .map((_item, index) => (
              <MessageItemLoading key={index} />
            ))}
        </Then>

        <Else>
          {messages.map((message, index) => (
            <MessageItem
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
        </Else>
      </If>
    </div>
  );
};

export default MessageList;
