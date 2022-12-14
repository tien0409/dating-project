import classNames from "classnames/bind";
import { useEffect, useRef } from "react";
import { BsFillTelephoneFill, BsMic } from "react-icons/bs";
import { FiVideo, FiVideoOff } from "react-icons/fi";
import { MdIosShare, MdZoomOutMap } from "react-icons/md";

import styles from "./VideoCall.module.scss";

const cln = classNames.bind(styles);

const VideoCall = () => {
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: false,
      })
      .then((stream) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = stream;
          remoteVideoRef.current.play();
          localVideoRef.current.srcObject = stream;
          localVideoRef.current.play();
        }
      });
  }, []);

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
