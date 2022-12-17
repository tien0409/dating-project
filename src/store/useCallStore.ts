import create from "zustand";
import { DataConnection, MediaConnection } from "peerjs";

import { useAuthStore } from "@/store";
import { CallStatusType, UserAuthType } from "@/types";

type CallStoreType = {
  peer?: any;
  initPeer: () => void;
  receiver?: UserAuthType;
  setReceiver: (_user?: UserAuthType) => void;
  call?: MediaConnection;
  setCall: (_call?: MediaConnection) => void;
  activeConversationId: string;
  setActiveConversationId: (_activeConversationId: string) => void;
  connection?: DataConnection;
  setConnection: (_connection?: DataConnection) => void;
  caller?: UserAuthType;
  setCaller: (_caller?: UserAuthType) => void;
  callStatus: CallStatusType;
  setCallStatus: (_status: CallStatusType) => void;
  localStream?: MediaStream;
  setLocalStream: (_stream?: MediaStream) => void;
  remoteStream?: MediaStream;
  setRemoteStream: (_stream?: MediaStream) => void;
  isZoom: boolean;
  setIsZoom: (_isZoom: boolean) => void;
  switchToMiniVideo: boolean;
  setSwitchToMiniVideo: (_switchToMiniVideo: boolean) => void;
  resetCallState: () => void;
};

const useCallStore = create<CallStoreType>((setState, getState) => ({
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
  receiver: undefined,
  setReceiver: (user) => setState((state) => ({ ...state, receiver: user })),
  call: undefined,
  setCall: (call?: MediaConnection) => setState((state) => ({ ...state, call })),
  activeConversationId: "",
  setActiveConversationId: (activeConversationId: string) =>
    setState((state) => ({ ...state, activeConversationId })),
  connection: undefined,
  setConnection: (connection?: DataConnection) => setState((state) => ({ ...state, connection })),
  callStatus: "idle",
  setCallStatus: (status) => setState((state) => ({ ...state, callStatus: status })),
  caller: undefined,
  setCaller: (caller) => setState((state) => ({ ...state, caller })),
  localStream: undefined,
  setLocalStream: (stream) => setState((state) => ({ ...state, localStream: stream })),
  remoteStream: undefined,
  setRemoteStream: (stream) => setState((state) => ({ ...state, remoteStream: stream })),
  isZoom: false,
  setIsZoom: (isZoom) => setState((state) => ({ ...state, isZoom })),
  switchToMiniVideo: false,
  setSwitchToMiniVideo: (switchToMiniVideo) =>
    setState((state) => ({ ...state, switchToMiniVideo })),
  resetCallState: () => {
    setState((state) => {
      getState()?.localStream &&
        getState()
          ?.localStream?.getTracks()
          .forEach((track) => track.stop());

      getState()?.remoteStream &&
        getState()
          ?.remoteStream?.getTracks()
          .forEach((track) => track.stop());
      getState()?.call && getState()?.call?.close();
      getState()?.connection && getState()?.connection?.close();

      return {
        ...state,
        call: undefined,
        connection: undefined,
        callStatus: "idle",
        caller: undefined,
        localStream: undefined,
        remoteStream: undefined,
        activeConversationId: "",
        switchToMiniVideo: false,
      };
    });
  },
}));

export default useCallStore;
