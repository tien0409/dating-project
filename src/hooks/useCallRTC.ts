import { useEffect } from "react";

import { useAuthStore, useCallStore, useSocketStore } from "@/store";
import {ON_VIDEO_CALL, ON_VIDEO_CALL_ACCEPT, ON_VIDEO_CALL_REJECT} from "@/configs/socket-events";
import { ResVideoCallType } from "@/types";
import ResVideoCallAcceptType from "@/types/call/ResVideoCallAcceptType";

const useCallRTC = () => {
  const profile = useAuthStore((state) => state.profile);
  const peer = useCallStore((state) => state.peer);
  const socket = useSocketStore((state) => state.socket);
  const callStatus = useCallStore((state) => state.callStatus);
  const call = useCallStore((state) => state.call);
  const setRemoteStream = useCallStore((state) => state.setRemoteStream);
  const setLocalStream = useCallStore((state) => state.setLocalStream);
  const setCall = useCallStore((state) => state.setCall);
  const setCallStatus = useCallStore((state) => state.setCallStatus);
  const setConnection = useCallStore((state) => state.setConnection);
  const setCaller = useCallStore((state) => state.setCaller);

  useEffect(() => {
    if (!socket) return;

    socket?.on(ON_VIDEO_CALL, (payload: ResVideoCallType) => {
      const { caller } = payload;
      if (callStatus !== "idle") return;

      setCallStatus("receiving-call");
      setCaller(caller);
    });

    socket?.on(ON_VIDEO_CALL_ACCEPT, (payload: ResVideoCallAcceptType) => {
      const { caller, acceptor } = payload;

      if (caller?.id === profile?.id) {
        const connection = peer.connect(acceptor.id);
        setConnection(connection);

        navigator.mediaDevices
          .getUserMedia({
            video: true,
            audio: true,
          })
          .then((stream) => {
            const newCall = peer.call(acceptor.id, stream);
            setCall(newCall);
          });
      }
      setCallStatus("in-call");
    });

    socket?.on(ON_VIDEO_CALL_REJECT, (payload: ) => {

    });

    return () => {
      socket?.off(ON_VIDEO_CALL);
      socket?.off(ON_VIDEO_CALL_ACCEPT);
    };
  }, [callStatus, peer, profile?.id, setCall, setCallStatus, setCaller, setConnection, socket]);

  useEffect(() => {
    if (!peer) return;

    peer.on("call", (incomingCall: any) => {
      navigator.mediaDevices
        .getUserMedia({
          video: true,
          audio: true,
        })
        .then((stream) => {
          incomingCall.answer(stream);
          setLocalStream(stream);
          setCall(incomingCall);
        });
    });

    return () => {
      peer?.off("call");
    };
  }, [peer, setCall, setCallStatus, setLocalStream]);

  useEffect(() => {
    if (!call) return;

    call?.on("stream", (remoteStream) => {
      console.log("remoteStream", remoteStream);
      setRemoteStream(remoteStream);
    });
  }, [call, setRemoteStream]);

  // useEffect(() => {
  //   if (!connection) return;
  //
  //   connection?.on("open", () => {
  //     console.log("open");
  //   });
  //
  //   return () => {
  //     connection?.off("open");
  //   };
  // }, [connection]);
};

export default useCallRTC;
