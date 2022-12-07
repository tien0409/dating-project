import create from "zustand";

import { ConversationType } from "@/types";

type ConversationStoreType = {
  loadingGetConversations: boolean;
  setLoadingGetConversations: (_loading: boolean) => void;
  conversation: ConversationType | undefined;
  setConversation: (_conversation?: ConversationType) => void;
  conversations: ConversationType[];
  setConversations: (_conversations: ConversationType[]) => void;
  conversationIdsTyping: Map<string, boolean>;
  setConversationIdsTyping: (_conversationIdsTyping: Map<string, boolean>) => void;
};

const useConversationStore = create<ConversationStoreType>((set) => ({
  loadingGetConversations: false,
  setLoadingGetConversations: (loading) => set({ loadingGetConversations: loading }),
  conversation: undefined,
  setConversation: (conversation) => set((state) => ({ ...state, conversation })),
  conversations: [],
  setConversations: (conversations) => set((state) => ({ ...state, conversations })),
  conversationIdsTyping: new Map(),
  setConversationIdsTyping: (conversationIdsTyping) =>
    set((state) => ({ ...state, conversationIdsTyping })),
}));

export default useConversationStore;
