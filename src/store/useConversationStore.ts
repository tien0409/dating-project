import create from "zustand";

import { ConversationType } from "@/types";

type ConversationStoreType = {
  loadingGetConversations: boolean;
  setLoadingGetConversations: (_loading: boolean) => void;
  conversationId: string;
  setConversationId: (_conversationId: string) => void;
  conversations: ConversationType[];
  setConversations: (_conversations: ConversationType[]) => void;
};

const useConversationStore = create<ConversationStoreType>((set) => ({
  loadingGetConversations: false,
  setLoadingGetConversations: (loading) => set({ loadingGetConversations: loading }),
  conversationId: "",
  setConversationId: (conversationId) => set((state) => ({ ...state, conversationId })),
  conversations: [],
  setConversations: (conversations) => set((state) => ({ ...state, conversations })),
}));

export default useConversationStore;
