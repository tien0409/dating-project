import create from "zustand";

import { ParticipantType } from "@/types";

type ParticipantStoreType = {
  senderParticipant: ParticipantType | null;
  setSenderParticipant: (_senderParticipant: ParticipantType) => void;
  receiverParticipant: ParticipantType | null;
  setReceiverParticipant: (_receiverParticipant: ParticipantType) => void;
};

const useParticipantStore = create<ParticipantStoreType>((set) => ({
  senderParticipant: null,
  setSenderParticipant: (senderParticipant) => set((state) => ({ ...state, senderParticipant })),
  receiverParticipant: null,
  setReceiverParticipant: (receiverParticipant) =>
    set((state) => ({ ...state, receiverParticipant })),
}));

export default useParticipantStore;
