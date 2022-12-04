import create from "zustand";

import { MessageType, ConversationType, ParticipantType } from "@/types";

type ChatStoreType = {
  senderParticipant: ParticipantType | null;
  setSenderParticipant: (_senderParticipant: ParticipantType) => void;
  receiverParticipant: ParticipantType | null;
  setReceiverParticipant: (_receiverParticipant: ParticipantType) => void;
  conversations: ConversationType[];
  setConversations: (_conversations: ConversationType[]) => void;
  messages: MessageType[];
  setMessages: (_messages: MessageType[]) => void;
};

const useChatStore = create<ChatStoreType>((set) => ({
  senderParticipant: null,
  setSenderParticipant: (senderParticipant) => set((state) => ({ ...state, senderParticipant })),
  receiverParticipant: null,
  setReceiverParticipant: (receiverParticipant) =>
    set((state) => ({ ...state, receiverParticipant })),
  messages: [],
  setMessages: (messages) => set((state) => ({ ...state, messages })),
  conversations: [],
  setConversations: (conversations) => set((state) => ({ ...state, conversations })),
}));

export default useChatStore;
