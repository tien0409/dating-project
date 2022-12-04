import { useMemo } from "react";
import { Modal } from "antd";
import { isThisWeek } from "date-fns";

import { MessageItemProps } from ".";
import { formatDate } from "@/utils/date";
import { useChatStore, useSocketStore } from "@/store";
import { REQUEST_DELETE_MESSAGE } from "@/configs/socket-events";
import { ReqDeleteMessageType } from "@/types";

const useMessageItem = (props: MessageItemProps) => {
  const { message } = props;

  const socket = useSocketStore((state) => state.socket);
  const senderParticipant = useChatStore((state) => state.senderParticipant);
  const receiverParticipant = useChatStore((state) => state.receiverParticipant);
  const messages = useChatStore((state) => state.messages);
  const setMessages = useChatStore((state) => state.setMessages);

  const createdAtStr = useMemo(() => {
    if (message && isThisWeek(new Date(message?.createdAt))) {
      return formatDate(new Date(message?.createdAt), "EEEE HH:mm");
    }
    return formatDate(message?.createdAt, "dd/MM/yyyy HH:mm");
  }, [message]);

  const handleDeleteMessage = () => {
    Modal.confirm({
      type: "warning",
      title: "This action cannot be undone",
      content: "Are you sure you want to delete this message?",
      okText: "Delete",
      onOk: () => {
        if (receiverParticipant?.user?.id && message && senderParticipant) {
          const indexMessageDeleted = messages.findIndex((item) => item.id === message.id);
          const payload: ReqDeleteMessageType = {
            indexMessageDeleted,
            message,
            receiverId: receiverParticipant?.user?.id,
            senderParticipantId: senderParticipant?.id,
          };
          socket.emit(REQUEST_DELETE_MESSAGE, payload);

          // remove local
          const newMessages = messages.filter((message) => message.id !== payload.message.id);
          setMessages(newMessages);
        }
      },
    });
  };

  const handleReply = () => {
    console.log("reply");
  };

  return { senderParticipant, createdAtStr, handleDeleteMessage, handleReply };
};

export default useMessageItem;
