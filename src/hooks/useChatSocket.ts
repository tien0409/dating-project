import { useCallback, useEffect } from "react";
import { toast } from "react-toastify";

import {
  REQUEST_ALL_CONVERSATIONS,
  SEND_ALL_CONVERSATIONS,
  SEND_ALL_MESSAGES,
  SEND_DELETE_CONVERSATION,
  SEND_DELETE_MESSAGE,
  SEND_MESSAGE,
  SEND_STOP_TYPING_MESSAGE,
  SEND_TYPING_MESSAGE,
  SEND_UPDATE_MESSAGE,
} from "@/configs/socket-events";
import {
  ConversationType,
  ResDeleteConversationType,
  ResDeleteMessageType,
  ResSendAllConversationsType,
  ResSendAllMessages,
  ResSendMessageType,
  ResTypingMessageType,
  ResUpdateMessageType,
} from "@/types";
import {
  useConversationStore,
  useMessageStore,
  useParticipantStore,
  useSocketStore,
} from "@/store";

const useChatSocket = () => {
  const initSocket = useSocketStore((state) => state.initSocket);
  const socket = useSocketStore((state) => state.socket);
  const messages = useMessageStore((state) => state.messages);
  const scrollToLastMessage = useMessageStore((state) => state.scrollToLastMessage);
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
    (conversationUpdated: ConversationType) => {
      const newConversations = conversations.filter(
        (conversation) => conversation.id !== conversationUpdated.id,
      );
      newConversations.unshift(conversationUpdated);
      setConversations(newConversations);
    },
    [conversations, setConversations],
  );

  useEffect(() => {
    if (socket) {
      socket.emit(REQUEST_ALL_CONVERSATIONS);
      setLoadingGetConversations(true);
    } else {
      initSocket();
    }
  }, [initSocket, setLoadingGetConversations, socket]);

  useEffect(() => {
    if (socket) {
      socket.on(SEND_ALL_CONVERSATIONS, (payload: ResSendAllConversationsType) => {
        const { conversations } = payload;

        setConversations(conversations);
        setLoadingGetConversations(false);
      });

      socket.on(SEND_DELETE_CONVERSATION, (payload: ResDeleteConversationType) => {
        const { conversations } = payload;

        toast.success("Conversation deleted");
        setConversations(conversations);
      });

      socket.on(SEND_ALL_MESSAGES, (payload: ResSendAllMessages) => {
        const { messages, senderParticipant, receiverParticipant, conversation } = payload;

        setLoadingGetMessages(false);
        setConversation(conversation);
        setMessages(messages);
        setReceiverParticipant(receiverParticipant);
        setSenderParticipant(senderParticipant);
        scrollToLastMessage();
      });

      socket.on(SEND_TYPING_MESSAGE, (payload: ResTypingMessageType) => {
        const { conversationId } = payload;

        const newConversationIdsTyping = new Map(conversationIdsTyping);
        newConversationIdsTyping.set(conversationId, true);
        setConversationIdsTyping(newConversationIdsTyping);
        setParticipantTyping(true);
        scrollToLastMessage();
      });

      socket.on(SEND_STOP_TYPING_MESSAGE, (payload: ResTypingMessageType) => {
        const { conversationId } = payload;

        const newConversationIdsTyping = new Map(conversationIdsTyping);
        newConversationIdsTyping.delete(conversationId);
        setConversationIdsTyping(newConversationIdsTyping);
        setParticipantTyping(false);
      });

      socket.on(SEND_MESSAGE, (payload: ResSendMessageType) => {
        const { conversationUpdated, message } = payload;

        if (message) {
          setMessages([...messages, message]);
          updateLastMessageConversation(conversationUpdated);
          scrollToLastMessage();
        }
      });

      socket.on(SEND_UPDATE_MESSAGE, (payload: ResUpdateMessageType) => {
        const { conversationUpdated, message } = payload;

        if (message) {
          const newMessages = messages.map((_message) =>
            _message.id === message.id ? message : _message,
          );
          setMessages(newMessages);
          conversationUpdated && updateLastMessageConversation(conversationUpdated);
        }
      });

      socket.on(SEND_DELETE_MESSAGE, (payload: ResDeleteMessageType) => {
        const { conversationUpdated, messages } = payload;

        toast.success("Delete message successfully");
        setMessageDelete();
        setMessages(messages);
        conversationUpdated && updateLastMessageConversation(conversationUpdated);
      });
    }

    return () => {
      if (socket) {
        socket.off(SEND_ALL_CONVERSATIONS);
        socket.off(SEND_DELETE_CONVERSATION);
        socket.off(SEND_ALL_MESSAGES);
        socket.off(SEND_TYPING_MESSAGE);
        socket.off(SEND_STOP_TYPING_MESSAGE);
        socket.off(SEND_MESSAGE);
        socket.off(SEND_UPDATE_MESSAGE);
        socket.off(SEND_DELETE_MESSAGE);
      }
    };
  }, [
    conversation,
    conversationIdsTyping,
    conversations,
    messages,
    scrollToLastMessage,
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

export default useChatSocket;
