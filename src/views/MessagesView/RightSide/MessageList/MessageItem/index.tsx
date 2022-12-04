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

  const { senderParticipant, createdAtStr } = useMessageItem(props);

  return (
    <div
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
          <Tooltip title={createdAtStr}>
            <div className={cln("content")}>{message?.content}</div>
          </Tooltip>
          <div className={cln("message__actions")}>
            <AiFillEdit size={17} cursor="pointer" />
            <AiFillDelete size={17} cursor="pointer" />
            <GoReply size={17} cursor="pointer" />
          </div>
        </Else>
      </If>
    </div>
  );
};

export default memo(MessageItem);
