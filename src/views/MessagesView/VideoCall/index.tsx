import classNames from "classnames/bind";
import { BsFillTelephoneFill, BsMic } from "react-icons/bs";
import { FiVideo } from "react-icons/fi";
import { MdIosShare, MdZoomOutMap } from "react-icons/md";

import styles from "./VideoCall.module.scss";
import { useCallStore } from "@/store";
import { useEffect, useRef } from "react";

const cln = classNames.bind(styles);

const VideoCall = () => {
  const remoteStream = useCallStore((state) => state.remoteStream);
  const localStream = useCallStore((state) => state.localStream);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
      localVideoRef.current.play();
    }
  }, [localStream]);

  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
      remoteVideoRef.current.play();
    }
  }, [remoteStream]);

  return (
    <div className={cln("wrapper")}>
      <div className={cln("video__wrapper")}>
        <video className={cln("remote__video")} ref={remoteVideoRef} />
        <video className={cln("local__video")} ref={localVideoRef} />

        <ul className={cln("video__controls")}>
          <li className={cln("video__controls-item")}>
            <MdZoomOutMap size={17} color={"#fff"} />
          </li>
          <li className={cln("video__controls-item")}>
            <BsMic size={17} color={"#fff"} />
          </li>
          <li className={cln("video__controls-item", "video__controls-item--off")}>
            <BsFillTelephoneFill size={17} color={"#fff"} style={{ rotate: "135deg" }} />
          </li>
          <li className={cln("video__controls-item")}>
            <FiVideo size={17} color={"#fff"} />
          </li>
          <li className={cln("video__controls-item")}>
            <MdIosShare size={17} color={"#fff"} />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default VideoCall;
