import { memo } from "react";
import { Else, If, Then } from "react-if";
import { Avatar, Skeleton, Tooltip } from "antd";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { GoReply } from "react-icons/go";
import classNames from "classnames/bind";

import styles from "./MessageItem.module.scss";
import { MessageType } from "@/types";
import useMessageItem from "./MessageItemHook";

const cln = classNames.bind(styles);

export type MessageItemProps = {
  loading: boolean;
  message?: MessageType;
};

const MessageItem = (props: MessageItemProps) => {
  const { loading, message } = props;

  const {
    senderParticipant,
    createdAtStr,
    handleDeleteMessage,
    handleReply,
    handleScrollMessageReplied,
  } = useMessageItem(props);

  return (
    <div
      id={message?.id}
      className={cln("wrapper", {
        "is-sender": loading
          ? Math.random() > 0.5
          : message?.participant?.id === senderParticipant?.id,
      })}
    >
      <If condition={loading}>
        <Then>
          <Skeleton.Avatar active />
          <div style={{ width: Math.random() * 40 + 30 + "%" }}>
            <Skeleton.Input active block />
          </div>
        </Then>
        <Else>
          <div>
            <Avatar className={cln("avatar")} src={message?.participant?.user?.avatar} />
          </div>
          <div className={cln("content")}>
            <If condition={!!message?.replyTo}>
              <Then>
                <div className={cln("message__reply")} onClick={handleScrollMessageReplied}>
                  <div className={cln("message__reply-mark")}>&nbsp;</div>

                  <div className={cln("message__reply-main")}>
                    <h5 className={cln("message__reply-main-fullName")}>
                      {message?.replyTo?.participant?.user?.fullName}
                    </h5>
                    <p className={cln("message__reply-main-content")}>
                      {message?.replyTo?.content}
                    </p>
                  </div>
                </div>
              </Then>
            </If>
            <Tooltip title={createdAtStr}>
              <div>{message?.content}</div>
            </Tooltip>
          </div>
          <If condition={message?.participant?.id === senderParticipant?.id}>
            <Then>
              <div className={cln("message__actions")}>
                <AiFillEdit size={17} cursor="pointer" />
                <AiFillDelete size={17} cursor="pointer" onClick={handleDeleteMessage} />
                <GoReply size={17} cursor="pointer" onClick={handleReply} />
              </div>
            </Then>
          </If>
        </Else>
      </If>
    </div>
  );
};

export default memo(MessageItem);
