import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";

import {
  useConversationStore,
  useMessageStore,
  useParticipantStore,
  useSocketStore,
} from "@/store";
import {
  REQUEST_ALL_CONVERSATIONS,
  REQUEST_ALL_MESSAGES,
  SEND_ALL_MESSAGES,
  SEND_DELETE_MESSAGE,
  SEND_DELETE_MESSAGE_FAILURE,
  SEND_MESSAGE,
} from "@/configs/socket-events";
import {
  MessageType,
  ReqAllMessageType,
  ResDeleteMessageType,
  ResDeleteMessageTypeFailure,
  ResSendAllMessages,
  ResSendMessageType,
} from "@/types";
import { toast } from "react-toastify";

const useMessageView = () => {
  const router = useRouter();

  const socket = useSocketStore((state) => state.socket);
  const messages = useMessageStore((state) => state.messages);
  const conversations = useConversationStore((state) => state.conversations);
  const conversationId = useConversationStore((state) => state.conversationId);
  const setLoadingGetMessages = useMessageStore((state) => state.setLoadingGetMessages);
  const setLoadingGetConversations = useConversationStore(
    (state) => state.setLoadingGetConversations,
  );
  const setConversationId = useConversationStore((state) => state.setConversationId);
  const setMessages = useMessageStore((state) => state.setMessages);
  const setReceiverParticipant = useParticipantStore((state) => state.setReceiverParticipant);
  const setSenderParticipant = useParticipantStore((state) => state.setSenderParticipant);
  const setConversations = useConversationStore((state) => state.setConversations);

  const updateLastMessageConversation = useCallback(
    (conversationId: string, message?: MessageType) => {
      const newConversations = conversations.map((conversation) => {
        if (conversation.id === conversationId) {
          conversation.lastMessage = message;
        }
        return conversation;
      });
      setConversations(newConversations);
    },
    [conversations, setConversations],
  );

  useEffect(() => {
    if (router.query.conversationId?.[0]) {
      const payload: ReqAllMessageType = {
        conversationId: router.query.conversationId?.[0],
      };
      socket.emit(REQUEST_ALL_MESSAGES, payload);
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

    socket.on(SEND_MESSAGE, (data: ResSendMessageType) => {
      if (data.message) {
        setMessages([...messages, data.message]);
        updateLastMessageConversation(data.conversationIdUpdated, data.message);
      }
    });

    socket.on(SEND_DELETE_MESSAGE, (payload: ResDeleteMessageType) => {
      toast.success("Delete message successfully");
      const lastMessage = messages[messages.length - 1];
      updateLastMessageConversation(conversationId, lastMessage);
      setMessages(payload.messages);
    });

    socket.on(SEND_DELETE_MESSAGE_FAILURE, (payload: ResDeleteMessageTypeFailure) => {
      const newMessages = [...messages];
      newMessages.splice(payload.indexMessageDeleted, 0, payload.message);
      setMessages(newMessages);
      toast.error(payload.errorMessage);
    });

    return () => {
      socket.off(SEND_ALL_MESSAGES);
      socket.off(SEND_MESSAGE);
      socket.off(SEND_DELETE_MESSAGE);
      socket.off(SEND_DELETE_MESSAGE_FAILURE);
    };
  }, [
    conversationId,
    conversations,
    messages,
    setConversations,
    setLoadingGetMessages,
    setMessages,
    setReceiverParticipant,
    setSenderParticipant,
    socket,
    updateLastMessageConversation,
  ]);
};

export default useMessageView;
