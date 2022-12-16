import classNames from "classnames/bind";
import { BsFillTelephoneFill, BsMic, BsMicMute } from "react-icons/bs";
import { FiVideo, FiVideoOff } from "react-icons/fi";
import { MdIosShare, MdZoomOutMap } from "react-icons/md";

import styles from "./VideoCall.module.scss";
import useVideoCall from "./VideoCallHook";
import { Else, If, Then } from "react-if";

const cln = classNames.bind(styles);

const VideoCall = () => {
  const {
    remoteVideoRef,
    localVideoRef,
    enableCamera,
    enableMic,
    handleToggleMic,
    handleToggleCamera,
    handleCloseCall,
  } = useVideoCall();

  return (
    <div className={cln("wrapper")}>
      <div className={cln("video__wrapper")}>
        <video className={cln("remote__video")} ref={remoteVideoRef} />
        <video className={cln("local__video")} ref={localVideoRef} />

        <ul className={cln("video__controls")}>
          <li className={cln("video__controls-item")}>
            <MdZoomOutMap size={17} color={"#fff"} />
          </li>
          <li className={cln("video__controls-item")} onClick={handleToggleMic}>
            <If condition={enableMic}>
              <Then>
                <BsMic size={17} color={"#fff"} />
              </Then>

              <Else>
                <BsMicMute size={17} color={"#fff"} />
              </Else>
            </If>
          </li>

          <li className={cln("video__controls-item", "video__controls-item--off")}>
            <BsFillTelephoneFill
              size={17}
              color={"#fff"}
              style={{ rotate: "135deg" }}
              onClick={handleCloseCall}
            />
          </li>

          <li className={cln("video__controls-item")} onClick={handleToggleCamera}>
            <If condition={enableCamera}>
              <Then>
                <FiVideo size={17} color={"#fff"} />
              </Then>

              <Else>
                <FiVideoOff size={17} color={"#fff"} />
              </Else>
            </If>
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
