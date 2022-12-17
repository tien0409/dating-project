import classNames from "classnames/bind";
import { BsFillTelephoneFill, BsMic, BsMicMute } from "react-icons/bs";
import { FiVideo, FiVideoOff } from "react-icons/fi";
import { AiOutlineFullscreenExit, AiOutlineFullscreen } from "react-icons/ai";
import { MdIosShare } from "react-icons/md";

import styles from "./VideoCall.module.scss";
import useVideoCall from "./VideoCallHook";
import { Else, If, Then, When } from "react-if";

const cln = classNames.bind(styles);

type VideoCallProps = {
  isMini?: boolean;
};

const VideoCall = (props: VideoCallProps) => {
  const { isMini } = props;

  const {
    remoteVideoRef,
    localVideoRef,
    isZoom,
    enableCamera,
    enableMic,
    iconSize,
    handleToggleZoom,
    handleToggleMic,
    handleToggleCamera,
    handleCloseCall,
  } = useVideoCall();

  return (
    <div className={cln("wrapper")}>
      <div
        className={cln("video__wrapper", {
          "is-mini": isMini,
        })}
      >
        <video className={cln("remote__video")} ref={remoteVideoRef} />
        <When condition={!isMini}>
          <video className={cln("local__video")} ref={localVideoRef} />
        </When>

        <ul className={cln("video__controls")}>
          <li
            className={cln("video__controls-item", {
              "is-mini": isMini,
            })}
            onClick={handleToggleZoom}
          >
            <If condition={isZoom}>
              <Then>
                <AiOutlineFullscreenExit size={iconSize} color={"#fff"} />
              </Then>

              <Else>
                <AiOutlineFullscreen size={iconSize} color={"#fff"} />
              </Else>
            </If>
          </li>

          <li
            className={cln("video__controls-item", { "is-mini": isMini })}
            onClick={handleToggleMic}
          >
            <If condition={enableMic}>
              <Then>
                <BsMic size={iconSize} color={"#fff"} />
              </Then>

              <Else>
                <BsMicMute size={iconSize} color={"#fff"} />
              </Else>
            </If>
          </li>

          <li
            className={cln("video__controls-item", "video__controls-item--off", {
              "is-mini": isMini,
            })}
            onClick={handleCloseCall}
          >
            <BsFillTelephoneFill size={iconSize} color={"#fff"} style={{ rotate: "135deg" }} />
          </li>

          <li
            className={cln("video__controls-item", { "is-mini": isMini })}
            onClick={handleToggleCamera}
          >
            <If condition={enableCamera}>
              <Then>
                <FiVideo size={iconSize} color={"#fff"} />
              </Then>

              <Else>
                <FiVideoOff size={iconSize} color={"#fff"} />
              </Else>
            </If>
          </li>
          <li className={cln("video__controls-item", { "is-mini": isMini })}>
            <MdIosShare size={iconSize} color={"#fff"} />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default VideoCall;
