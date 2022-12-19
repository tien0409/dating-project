import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";

import { useAuthStore, useCallStore, useSocketStore } from "@/store";
import {
  ON_VIDEO_CALL_INIT,
  ON_VIDEO_CALL_ACCEPTED,
  ON_CALL_HANG_UP,
  ON_CALL_REJECTED,
  ON_VOICE_CALL_INIT,
  ON_VOICE_CALL_ACCEPTED,
  ON_TOGGLE_MIC,
} from "@/configs/socket-events";
import { ResCallAcceptType, ResCallInitType, ResToggleMicType } from "@/types";
import { MESSAGES_ROUTE } from "@/configs/routes";

const useCallRTC = () => {
  const router = useRouter();

  const initPeer = useCallStore((state) => state.initPeer);
  const profile = useAuthStore((state) => state.profile);
  const peer = useCallStore((state) => state.peer);
  const socket = useSocketStore((state) => state.socket);
  const callStatus = useCallStore((state) => state.callStatus);
  const call = useCallStore((state) => state.call);
  const activeConversationId = useCallStore((state) => state.activeConversationId);
  const callType = useCallStore((state) => state.callType);
  const localStream = useCallStore((state) => state.localStream);
  const remoteStream = useCallStore((state) => state.remoteStream);
  const enableMic = useCallStore((state) => state.enableMic);
  const enableCamera = useCallStore((state) => state.enableCamera);
  const setRemoteStream = useCallStore((state) => state.setRemoteStream);
  const setLocalStream = useCallStore((state) => state.setLocalStream);
  const setCall = useCallStore((state) => state.setCall);
  const setEnableCamera = useCallStore((state) => state.setEnableCamera);
  const setEnableMic = useCallStore((state) => state.setEnableMic);
  const setCallStatus = useCallStore((state) => state.setCallStatus);
  const setConnection = useCallStore((state) => state.setConnection);
  const setCallType = useCallStore((state) => state.setCallType);
  const setCaller = useCallStore((state) => state.setCaller);
  const setReceiver = useCallStore((state) => state.setReceiver);
  const setActiveConversationId = useCallStore((state) => state.setActiveConversationId);
  const setSwitchToMiniVideo = useCallStore((state) => state.setSwitchToMiniVideo);
  const resetCallState = useCallStore((state) => state.resetCallState);

  const handleOnInit = useCallback(
    async (payload: ResCallInitType) => {
      const { caller, conversationId, callType } = payload;

      if (callStatus !== "idle") return;

      console.log("callType", callType);
      profile && setReceiver(profile);
      setCallStatus("receiving-call");
      setActiveConversationId(conversationId);
      setCaller(caller);
      setCallType(callType);
      setEnableCamera(callType === "video-call");

      await router.push(MESSAGES_ROUTE + `/${conversationId}`);
    },
    [
      callStatus,
      profile,
      router,
      setActiveConversationId,
      setCallStatus,
      setCallType,
      setCaller,
      setEnableCamera,
      setReceiver,
    ],
  );

  const handleOnAccepted = useCallback(
    async (payload: ResCallAcceptType) => {
      const { caller, acceptor } = payload;
      const stream = await navigator.mediaDevices.getUserMedia({
        video: enableCamera,
        audio: true,
      });
      setLocalStream(stream);
      setCallStatus("in-call");

      if (caller?.id === profile?.id) {
        const connection = peer.connect(acceptor.id);
        const newCall = peer?.call(acceptor.id, stream);

        setConnection(connection);
        setCall(newCall);
      }
    },
    [enableCamera, peer, profile?.id, setCall, setCallStatus, setConnection, setLocalStream],
  );

  useEffect(() => {
    if (!peer) {
      profile?.id && initPeer();
      return;
    }

    peer.on("call", async (incomingCall: any) => {
      incomingCall.answer(localStream);
      setLocalStream(localStream);
      setCall(incomingCall);
    });

    return () => {
      peer?.off("call");
    };
  }, [
    localStream,
    call,
    callType,
    enableMic,
    enableCamera,
    initPeer,
    peer,
    profile?.id,
    setCall,
    setCallStatus,
    setLocalStream,
  ]);

  useEffect(() => {
    if (!socket || !peer) return;

    // only for receiver
    socket?.on(ON_VIDEO_CALL_INIT, (payload: ResCallInitType) => handleOnInit(payload));
    socket?.on(ON_VOICE_CALL_INIT, (payload: ResCallInitType) => handleOnInit(payload));

    // for receiver + caller
    socket?.on(ON_VIDEO_CALL_ACCEPTED, (payload: ResCallAcceptType) => handleOnAccepted(payload));
    socket?.on(ON_VOICE_CALL_ACCEPTED, (payload: ResCallAcceptType) => handleOnAccepted(payload));

    // for receiver + caller
    socket?.on(ON_CALL_REJECTED, () => {
      resetCallState();
    });

    // for receiver + caller
    socket?.on(ON_CALL_HANG_UP, () => {
      resetCallState();
    });

    socket?.on(ON_TOGGLE_MIC, (payload: ResToggleMicType) => {
      const { userIdDisableMic } = payload;

      if (userIdDisableMic === profile?.id) {
        localStream?.getAudioTracks().forEach((track) => (track.enabled = !enableMic));
        console.log("setEnableMic");
        setEnableMic(!enableMic);
      } else {
        remoteStream?.getAudioTracks().forEach((track) => (track.enabled = !enableMic));
      }
    });

    return () => {
      socket?.off(ON_VIDEO_CALL_INIT);
      socket?.off(ON_VOICE_CALL_INIT);
      socket?.off(ON_VIDEO_CALL_ACCEPTED);
      socket?.off(ON_VOICE_CALL_ACCEPTED);
      socket?.off(ON_CALL_REJECTED);
      socket?.off(ON_CALL_HANG_UP);
      socket?.off(ON_TOGGLE_MIC);
    };
  }, [
    enableMic,
    handleOnAccepted,
    handleOnInit,
    localStream,
    peer,
    profile?.id,
    remoteStream,
    resetCallState,
    setEnableMic,
    socket,
  ]);

  useEffect(() => {
    if (!call) return;

    console.log("useEffect call");
    call?.on("stream", (remoteStream) => {
      console.log("call stream", remoteStream);
      setRemoteStream(remoteStream);
    });

    call?.on("close", () => {
      console.log("call close");
    });

    return () => {
      call?.off("stream");
    };
  }, [call, setRemoteStream]);

  useEffect(() => {
    if (callStatus === "in-call") {
      setSwitchToMiniVideo(router?.query?.conversationId?.[0] !== activeConversationId);
    }
  }, [activeConversationId, callStatus, router?.query?.conversationId, setSwitchToMiniVideo]);
};

export default useCallRTC;
