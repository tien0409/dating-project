import { useEffect, useMemo, useRef } from "react";

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
  const loadingGetMessages = useChatStore((state) => state.loadingGetMessages);
  const setLoadingGetMessages = useChatStore((state) => state.setLoadingGetMessages);

  const _messagesInternal = useMemo(
    () => (loadingGetMessages ? Array(15).fill(0) : messages),
    [loadingGetMessages, messages],
  );

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    socket.on(SEND_ALL_MESSAGES, (payload: ResponseSendAllMessages) => {
      setMessages(payload.messages);
      setReceiverParticipant(payload.receiverParticipant);
      setSenderParticipant(payload.senderParticipant);
      setLoadingGetMessages(false);
    });

    return () => {
      socket.off(SEND_ALL_MESSAGES);
    };
  }, [setLoadingGetMessages, setMessages, setReceiverParticipant, setSenderParticipant, socket]);

  return {
    loadingGetMessages,
    lastMessageRef,
    _messagesInternal,
  };
};

export default useMessageList;
