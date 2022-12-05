import create from "zustand";

import { MessageType } from "@/types";

type MessageStoreType = {
  loadingGetMessages: boolean;
  setLoadingGetMessages: (_loading: boolean) => void;
  messages: MessageType[];
  setMessages: (_messages: MessageType[]) => void;
  messageReply?: MessageType;
  setMessageReply: (_messageReply?: MessageType) => void;
};

const useMessageStore = create<MessageStoreType>((set) => ({
  loadingGetMessages: false,
  setLoadingGetMessages: (loading) => set({ loadingGetMessages: loading }),
  messages: [],
  setMessages: (messages) => set((state) => ({ ...state, messages })),
  messageReply: undefined,
  setMessageReply: (messageReply) => set((state) => ({ ...state, messageReply })),
}));

export default useMessageStore;
