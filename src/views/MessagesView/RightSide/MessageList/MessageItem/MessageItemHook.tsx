import { useMemo } from "react";
import { Modal } from "antd";
import { isThisWeek } from "date-fns";

import { MessageItemProps } from ".";
import { formatDate } from "@/utils/date";
import {
  useConversationStore,
  useMessageStore,
  useParticipantStore,
  useSocketStore,
} from "@/store";
import { REQUEST_DELETE_MESSAGE } from "@/configs/socket-events";
import { ReqDeleteMessageType } from "@/types";

const useMessageItem = (props: MessageItemProps) => {
  const { message, _participantTyping } = props;

  const socket = useSocketStore((state) => state.socket);
  const senderParticipant = useParticipantStore((state) => state.senderParticipant);
  const receiverParticipant = useParticipantStore((state) => state.receiverParticipant);
  const messageDelete = useMessageStore((state) => state.messageDelete);
  const conversation = useConversationStore((state) => state.conversation);
  const setMessageReply = useMessageStore((state) => state.setMessageReply);
  const setMessageDelete = useMessageStore((state) => state.setMessageDelete);

  const avatar = _participantTyping
    ? _participantTyping?.user?.avatar
    : message?.participant?.user?.avatar;

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
        if (receiverParticipant?.user?.id && message && senderParticipant && conversation) {
          const payload: ReqDeleteMessageType = {
            messageId: message.id,
            receiverId: receiverParticipant?.user?.id,
            senderParticipantId: senderParticipant?.id,
            conversation,
          };
          setMessageDelete(message);
          socket.emit(REQUEST_DELETE_MESSAGE, payload);
        }
      },
    });
  };

  const handleReply = () => {
    message && setMessageReply(message);
  };

  const handleScrollMessageReplied = () => {
    if (message?.replyTo && message?.replyTo?.active) {
      const messageReplied = document.getElementById(message?.replyTo?.id);

      messageReplied?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return {
    messageDelete,
    senderParticipant,
    createdAtStr,
    avatar,
    handleDeleteMessage,
    handleReply,
    handleScrollMessageReplied,
  };
};

export default useMessageItem;
