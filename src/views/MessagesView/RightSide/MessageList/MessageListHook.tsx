import { useEffect, useRef } from "react";

import { useChatStore, useSocketStore } from "@/store";
import { SEND_ALL_MESSAGES } from "@/configs/socket-events";
import { ResponseSendAllMessages } from "@/types";

const useMessageList = () => {
  const lastMessageRef = useRef<HTMLDivElement>(null);

  const socket = useSocketStore((state) => state.socket);
  const messages = useChatStore((state) => state.messages);
  const setMessages = useChatStore((state) => state.setMessages);
  const setReceiverParticipant = useChatStore((state) => state.setReceiverParticipant);
  const setSenderParticipant = useChatStore((state) => state.setSenderParticipant);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    socket.on(SEND_ALL_MESSAGES, (payload: ResponseSendAllMessages) => {
      setMessages(payload.messages);
      setReceiverParticipant(payload.receiverParticipant);
      setSenderParticipant(payload.senderParticipant);
    });

    return () => {
      socket.off(SEND_ALL_MESSAGES);
    };
  }, [setMessages, setReceiverParticipant, socket]);

  return {
    lastMessageRef,
    messages,
  };
};

export default useMessageList;
