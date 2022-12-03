import create from "zustand";

import { socketStore } from "@/store/index";
import { REQUEST_ALL_CONVERSATIONS, SEND_ALL_CONVERSATIONS } from "@/configs/socket-events";
import ConversationType from "@/types/gender/chat/ConversationType";

type ConversationStoreType = {
  conversations: ConversationType[];
  requestConversations: () => void;
  onResponseConversations: () => void;
};

const socket = socketStore?.getState()?.socket;

const useConversationStore = create<ConversationStoreType>((setState) => ({
  conversations: [],
  requestConversations: () => socket.emit(REQUEST_ALL_CONVERSATIONS),
  onResponseConversations: () => {
    socket.on(SEND_ALL_CONVERSATIONS, (conversations) => {
      setState((state) => ({ ...state, conversations }));
    });
  },
}));

export default useConversationStore;
