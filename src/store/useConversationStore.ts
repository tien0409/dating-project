import create from "zustand";

import { ConversationType } from "@/types";

type ConversationStoreType = {
  loadingGetConversations: boolean;
  setLoadingGetConversations: (_loading: boolean) => void;
  conversation: ConversationType | undefined;
  setConversation: (_conversation?: ConversationType) => void;
  conversations: ConversationType[];
  setConversations: (_conversations: ConversationType[]) => void;
};

const useConversationStore = create<ConversationStoreType>((set) => ({
  loadingGetConversations: false,
  setLoadingGetConversations: (loading) => set({ loadingGetConversations: loading }),
  conversation: undefined,
  setConversation: (conversation) => set((state) => ({ ...state, conversation })),
  conversations: [],
  setConversations: (conversations) => set((state) => ({ ...state, conversations })),
}));

export default useConversationStore;
