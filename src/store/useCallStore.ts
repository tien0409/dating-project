import create from "zustand";
import { DataConnection, MediaConnection } from "peerjs";

import { useAuthStore } from "@/store/index";

type CallStoreType = {
  peer?: any;
  initPeer: () => void;
  call?: MediaConnection;
  setCall: (_call?: MediaConnection) => void;
  connection?: DataConnection;
  setConnection: (_connection?: DataConnection) => void;
  callStatus: "idle" | "receivingCall" | "calling" | "in-call";
  setCallStatus: (_status: "idle" | "receivingCall" | "calling" | "in-call") => void;
  isCalling: boolean;
  setIsCalling: (_isCalling: boolean) => void;
};

const useCallStore = create<CallStoreType>((setState) => ({
  peer: undefined,
  initPeer: () => {
    (async () => {
      const profile = useAuthStore.getState().profile;
      if (profile?.id && typeof window !== "undefined") {
        const { Peer } = await import("peerjs");
        const peer = new Peer(profile?.id);
        setState((state) => ({ ...state, peer }));
      }
    })();
  },
  call: undefined,
  setCall: (call?: MediaConnection) => setState((state) => ({ ...state, call })),
  connection: undefined,
  setConnection: (connection?: DataConnection) => setState((state) => ({ ...state, connection })),
  callStatus: "idle",
  setCallStatus: (status) => setState((state) => ({ ...state, callStatus: status })),
  isCalling: false,
  setIsCalling: (isCalling) => setState((state) => ({ ...state, isCalling })),
}));

export default useCallStore;
