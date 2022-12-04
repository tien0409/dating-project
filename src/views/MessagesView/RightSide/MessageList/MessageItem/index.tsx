import { memo } from "react";
import { Avatar } from "antd";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { GoReply } from "react-icons/go";
import classNames from "classnames/bind";

import styles from "./MessageItem.module.scss";
import { useChatStore, useUserStore } from "@/store";
import { MessageType } from "@/types";

const cln = classNames.bind(styles);

type Props = {
  message: MessageType;
};

const MessageItem = (props: Props) => {
  const { message } = props;

  const senderParticipant = useChatStore((state) => state.senderParticipant);

  return (
    <div
      className={cln("wrapper", {
        "is-sender": message?.participant?.id === senderParticipant?.id,
      })}
    >
      <Avatar size={37} src={message?.participant?.user?.avatar} />
      <div className={cln("content")}>{message.content}</div>
      <div className={cln("message__actions")}>
        <AiFillEdit size={17} cursor="pointer" />
        <AiFillDelete size={17} cursor="pointer" />
        <GoReply size={17} cursor="pointer" />
      </div>
    </div>
  );
};

export default memo(MessageItem);
