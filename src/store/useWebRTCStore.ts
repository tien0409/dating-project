import create from "zustand";

import { useAuthStore } from "@/store";

type WebRTCType = {
  peer?: any;
  initPeer: () => void;
};

const useWebRTCStore = create<WebRTCType>((setState) => ({
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
}));

export default useWebRTCStore;
