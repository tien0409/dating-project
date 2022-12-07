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
  SEND_ALL_CONVERSATIONS,
  SEND_ALL_MESSAGES,
  SEND_DELETE_MESSAGE,
  SEND_MESSAGE,
  SEND_STOP_TYPING_MESSAGE,
  SEND_TYPING_MESSAGE,
} from "@/configs/socket-events";
import {
  MessageType,
  ReqAllMessageType,
  ResDeleteMessageType,
  ResSendAllMessages,
  ResSendMessageType,
  ResTypingMessageType,
} from "@/types";
import { toast } from "react-toastify";

const useMessageView = () => {
  const router = useRouter();

  const socket = useSocketStore((state) => state.socket);
  const messages = useMessageStore((state) => state.messages);
  const conversations = useConversationStore((state) => state.conversations);
  const conversation = useConversationStore((state) => state.conversation);
  const conversationIdsTyping = useConversationStore((state) => state.conversationIdsTyping);
  const setConversationIdsTyping = useConversationStore((state) => state.setConversationIdsTyping);
  const setLoadingGetMessages = useMessageStore((state) => state.setLoadingGetMessages);
  const setLoadingGetConversations = useConversationStore(
    (state) => state.setLoadingGetConversations,
  );
  const setConversation = useConversationStore((state) => state.setConversation);
  const setMessageDelete = useMessageStore((state) => state.setMessageDelete);
  const setMessages = useMessageStore((state) => state.setMessages);
  const setReceiverParticipant = useParticipantStore((state) => state.setReceiverParticipant);
  const setSenderParticipant = useParticipantStore((state) => state.setSenderParticipant);
  const setParticipantTyping = useParticipantStore((state) => state.setParticipantTyping);
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
      socket?.emit(REQUEST_ALL_MESSAGES, payload);
      setLoadingGetMessages(true);
    }
  }, [router.query.conversationId, setLoadingGetMessages, socket]);

  useEffect(() => {
    socket?.emit(REQUEST_ALL_CONVERSATIONS);
    setLoadingGetConversations(true);
  }, [setLoadingGetConversations, socket]);

  useEffect(() => {
    socket?.on(SEND_ALL_CONVERSATIONS, (conversations) => {
      setConversations(conversations);
      setLoadingGetConversations(false);
    });

    socket?.on(SEND_ALL_MESSAGES, (payload: ResSendAllMessages) => {
      const { messages, senderParticipant, receiverParticipant, conversation } = payload;

      setLoadingGetMessages(false);
      setConversation(conversation);
      setMessages(messages);
      setReceiverParticipant(receiverParticipant);
      setSenderParticipant(senderParticipant);
    });

    socket?.on(SEND_TYPING_MESSAGE, (payload: ResTypingMessageType) => {
      const { conversationId } = payload;

      const newConversationIdsTyping = new Map(conversationIdsTyping);
      newConversationIdsTyping.set(conversationId, true);
      setConversationIdsTyping(newConversationIdsTyping);
      setParticipantTyping(true);
    });

    socket?.on(SEND_STOP_TYPING_MESSAGE, (payload: ResTypingMessageType) => {
      const { conversationId } = payload;

      const newConversationIdsTyping = new Map(conversationIdsTyping);
      newConversationIdsTyping.delete(conversationId);
      setConversationIdsTyping(newConversationIdsTyping);
      setParticipantTyping(false);
    });

    socket?.on(SEND_MESSAGE, (data: ResSendMessageType) => {
      if (data.message) {
        setMessages([...messages, data.message]);
        updateLastMessageConversation(data.conversationIdUpdated, data.message);
      }
    });

    socket?.on(SEND_DELETE_MESSAGE, (payload: ResDeleteMessageType) => {
      const { lastMessageConversation } = payload;

      toast.success("Delete message successfully");
      setMessageDelete();
      setMessages(payload.messages);
      if (lastMessageConversation) {
        conversation && updateLastMessageConversation(conversation?.id, lastMessageConversation);
      }
    });

    return () => {
      socket?.off(SEND_ALL_CONVERSATIONS);
      socket?.off(SEND_ALL_MESSAGES);
      socket?.off(SEND_TYPING_MESSAGE);
      socket?.off(SEND_STOP_TYPING_MESSAGE);
      socket?.off(SEND_MESSAGE);
      socket?.off(SEND_DELETE_MESSAGE);
    };
  }, [
    conversation,
    conversationIdsTyping,
    conversations,
    messages,
    setConversation,
    setConversationIdsTyping,
    setConversations,
    setLoadingGetConversations,
    setLoadingGetMessages,
    setMessageDelete,
    setMessages,
    setParticipantTyping,
    setReceiverParticipant,
    setSenderParticipant,
    socket,
    updateLastMessageConversation,
  ]);
};

export default useMessageView;
