import { useEffect, useRef, useState } from "react";
import Peer, { MediaConnection } from "peerjs";
import { Button } from "antd";
import { v4 as uuidv4 } from "uuid";

import { useAuthStore } from "@/store";
import { DefaultLayout } from "@/layouts";

const id = uuidv4();

const PeerPageView = () => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  const [peer, setPeer] = useState<Peer>();
  const [inputValue, setInputValue] = useState("");
  const [isReceivingCall, setIsReceivingCall] = useState(false);
  const [disableMicrophone, setDisableMicrophone] = useState(false);
  const [disableLocalVideo, setDisableLocalVideo] = useState(true);
  const [localStream, setLocalStream] = useState<MediaStream>();
  const [remoteStream, setRemoteStream] = useState<MediaStream>();
  const [connectedCall, setConnectedCall] = useState<MediaConnection>();

  const profile = useAuthStore((state) => state.profile);

  useEffect(() => {
    (async () => {
      if (profile?.id) {
        const { Peer } = await import("peerjs");
        setPeer(new Peer(id));
      }
    })();
  }, [profile?.id]);

  useEffect(() => {
    if (!peer) return console.log("no peer");

    peer.on("call", async (call) => {
      setIsReceivingCall(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      setLocalStream(stream);
      call.answer(stream);
      setConnectedCall(call);

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
        localVideoRef.current?.play();
      }

      call.on("stream", (remoteStream) => {
        setRemoteStream(remoteStream);
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = remoteStream;
          remoteVideoRef.current.play();
        }
      });
    });
  }, [peer]);

  const handleConnect = async () => {
    if (profile?.id) {
      const connection = peer?.connect(inputValue);
      const mediaScreen = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setLocalStream(mediaScreen);

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = mediaScreen;
        localVideoRef.current.play();
      }
      const call = peer?.call(inputValue, mediaScreen);
      setConnectedCall(call);

      call?.on("stream", (remoteStream) => {
        setRemoteStream(remoteStream);
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = remoteStream;
          remoteVideoRef.current.play();
        }
      });
    }
  };

  const toggleLocalVideo = () => {
    if (localStream) {
      localStream.getVideoTracks()[0].enabled = !disableLocalVideo;
      setDisableLocalVideo(!disableLocalVideo);
    }
  };

  const toggleMicrophone = () => {
    if (localStream) {
      localStream.getAudioTracks()[0].enabled = !disableMicrophone;
      setDisableMicrophone(!disableMicrophone);
    }
  };

  const toggleShareScreen = async () => {
    const track = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: false });
    connectedCall?.peerConnection?.getSenders()[1]?.replaceTrack(track.getVideoTracks()[0]);
    remoteStream?.addTrack(track.getVideoTracks()[0]);
  };

  return (
    <DefaultLayout>
      {id}
      <input type="text" onChange={(e) => setInputValue(e.target.value)} />
      <Button onClick={handleConnect}>Peer Page view</Button>
      <div>
        <Button onClick={toggleShareScreen}>Share screen</Button>
        <Button onClick={toggleMicrophone}>Mute / Unmute</Button>
        <Button onClick={toggleLocalVideo}>Turn on/Off video</Button>
      </div>
      <div>
        <h3>Your stream</h3>
        <video width={400} height={300} ref={localVideoRef}></video>
      </div>

      <div>
        <h3>Remote stream</h3>
        <video width={400} height={300} ref={remoteVideoRef}></video>
      </div>
    </DefaultLayout>
  );
};

export default PeerPageView;
