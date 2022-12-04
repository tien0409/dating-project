import { useRouter } from "next/router";
import { useEffect } from "react";

import { useChatStore, useSocketStore } from "@/store";
import {
  REQUEST_ALL_CONVERSATIONS,
  REQUEST_ALL_MESSAGES,
  SEND_ALL_MESSAGES,
  SEND_DELETE_MESSAGE,
  SEND_DELETE_MESSAGE_FAILURE,
} from "@/configs/socket-events";
import { ReqDeleteMessageType, ResSendAllMessages } from "@/types";
import { toast } from "react-toastify";

const useMessageView = () => {
  const router = useRouter();

  const socket = useSocketStore((state) => state.socket);
  const messages = useChatStore((state) => state.messages);
  const setLoadingGetMessages = useChatStore((state) => state.setLoadingGetMessages);
  const setLoadingGetConversations = useChatStore((state) => state.setLoadingGetConversations);
  const setConversationId = useChatStore((state) => state.setConversationId);
  const setMessages = useChatStore((state) => state.setMessages);
  const setReceiverParticipant = useChatStore((state) => state.setReceiverParticipant);
  const setSenderParticipant = useChatStore((state) => state.setSenderParticipant);
  useEffect(() => {
    if (router.query.conversationId?.[0]) {
      socket.emit(REQUEST_ALL_MESSAGES, { id: router.query.conversationId?.[0] });
      setLoadingGetMessages(true);
      setConversationId(router.query.conversationId?.[0]);
    }
  }, [router.query.conversationId, setConversationId, setLoadingGetMessages, socket]);

  useEffect(() => {
    socket.emit(REQUEST_ALL_CONVERSATIONS);
    setLoadingGetConversations(true);
  }, [setLoadingGetConversations, socket]);

  useEffect(() => {
    socket.on(SEND_ALL_MESSAGES, (payload: ResSendAllMessages) => {
      setMessages(payload.messages);
      setReceiverParticipant(payload.receiverParticipant);
      setSenderParticipant(payload.senderParticipant);
      setLoadingGetMessages(false);
    });

    socket.on(SEND_DELETE_MESSAGE, () => {
      toast.success("Delete message successfully");
    });
    socket.on(SEND_DELETE_MESSAGE_FAILURE, (payload: ReqDeleteMessageType) => {
      const newMessages = [...messages];
      newMessages.splice(payload.indexMessageDeleted, 0, payload.message);
      setMessages(newMessages);
      toast.error("Delete message failure");
    });

    return () => {
      socket.off(SEND_ALL_MESSAGES);
      socket.off(SEND_DELETE_MESSAGE);
    };
  }, [
    messages,
    setLoadingGetMessages,
    setMessages,
    setReceiverParticipant,
    setSenderParticipant,
    socket,
  ]);
};

export default useMessageView;
