import { useEffect, useRef } from "react";

import { useAuthStore, useCallStore, useSocketStore } from "@/store";
import { CALL_HANG_UP, TOGGLE_MIC } from "@/configs/socket-events";

const useVideoCall = () => {
  const profile = useAuthStore((state) => state.profile);
  const socket = useSocketStore((state) => state.socket);
  const remoteStream = useCallStore((state) => state.remoteStream);
  const localStream = useCallStore((state) => state.localStream);
  const call = useCallStore((state) => state.call);
  const callStatus = useCallStore((state) => state.callStatus);
  const activeConversationId = useCallStore((state) => state.activeConversationId);
  const isZoom = useCallStore((state) => state.isZoom);
  const peer = useCallStore((state) => state.peer);
  const caller = useCallStore((state) => state.caller);
  const enableMic = useCallStore((state) => state.enableMic);
  const enableCamera = useCallStore((state) => state.enableCamera);
  const receiver = useCallStore((state) => state.receiver);
  const switchToMiniVideo = useCallStore((state) => state.switchToMiniVideo);
  const setIsZoom = useCallStore((state) => state.setIsZoom);
  const setLocalStream = useCallStore((state) => state.setLocalStream);
  const setEnableCamera = useCallStore((state) => state.setEnableCamera);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  const iconSize = switchToMiniVideo ? 15 : 17;

  const handleToggleMic = async () => {
    if (profile?.id && socket) {
      socket.emit(TOGGLE_MIC, {
        conversationId: activeConversationId,
        userIdDisableMic: profile?.id,
      });
    }
  };

  const handleToggleCamera = async () => {
    if (enableCamera) localStream?.getVideoTracks().forEach((track) => track.stop());

    const stream = await navigator.mediaDevices.getUserMedia({
      video: !enableCamera,
      audio: true,
    });
    console.log("enableMic", enableMic);
    if (!enableMic) {
      console.log("zo");
      localStream?.getAudioTracks().forEach((track) => (track.enabled = false));
    }

    setLocalStream(stream);
    setEnableCamera(!enableCamera);

    peer.call(caller?.id === profile?.id ? receiver?.id : caller?.id, stream);
  };

  const handleCloseCall = () => {
    if (call) {
      socket?.emit(CALL_HANG_UP, { caller, receiver });
    }
  };

  const handleToggleZoom = () => {
    setIsZoom(!isZoom);
  };

  useEffect(() => {
    const ref = localVideoRef.current;

    (async () => {
      if (ref && localStream) {
        ref.srcObject = localStream;
        await ref.play();
      }
    })();

    return () => {
      ref?.pause();
    };
  }, [callStatus, localStream, switchToMiniVideo]);

  useEffect(() => {
    const ref = remoteVideoRef.current;

    (async () => {
      if (ref && remoteStream) {
        ref.srcObject = remoteStream;
        await ref?.play();
      }
    })();
    return () => {
      ref?.pause();
    };
  }, [callStatus, remoteStream, switchToMiniVideo]);

  return {
    profile,
    localVideoRef,
    remoteVideoRef,
    isZoom,
    enableCamera,
    enableMic,
    iconSize,
    caller,
    receiver,
    remoteStream,
    localStream,
    handleToggleZoom,
    handleToggleMic,
    handleToggleCamera,
    handleCloseCall,
  };
};

export default useVideoCall;
