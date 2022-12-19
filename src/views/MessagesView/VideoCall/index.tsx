import classNames from "classnames/bind";
import { Else, If, Then, When } from "react-if";
import Image from "next/image";
import { BsFillTelephoneFill, BsMic, BsMicMute } from "react-icons/bs";
import { FiVideo, FiVideoOff } from "react-icons/fi";
import { AiOutlineFullscreenExit, AiOutlineFullscreen } from "react-icons/ai";
import { MdIosShare } from "react-icons/md";

import styles from "./VideoCall.module.scss";
import useVideoCall from "./VideoCallHook";
import { getAvatar } from "@/utils/urls";

const cln = classNames.bind(styles);

type VideoCallProps = {
  isMini?: boolean;
};

const VideoCall = (props: VideoCallProps) => {
  const { isMini } = props;

  const {
    profile,
    remoteVideoRef,
    localVideoRef,
    isZoom,
    enableCamera,
    enableMic,
    iconSize,
    receiver,
    remoteStream,
    localStream,
    caller,
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
        <div
          className={cln("remote__video", {
            "is-off": !remoteStream?.getVideoTracks()?.[0],
          })}
        >
          <video ref={remoteVideoRef} />

          <When condition={!remoteStream?.getVideoTracks()?.[0]}>
            <div className={cln("remote__video-placeholder")}>
              <Image
                src={getAvatar(receiver?.id === profile?.id ? caller?.avatar : receiver?.avatar)}
                width={100}
                height={100}
                className={cln("remote__video-placeholder--image")}
                alt={receiver?.id === profile?.id ? caller?.fullName : receiver?.fullName}
              />
            </div>
          </When>
        </div>

        <When condition={!isMini}>
          <div
            className={cln("local__video", {
              "is-off": !localStream?.getVideoTracks()?.[0],
            })}
          >
            <video ref={localVideoRef} />

            <When condition={!localStream?.getVideoTracks()?.[0]}>
              <div className={cln("local__video-placeholder")}>
                <Image
                  src={getAvatar(profile?.avatar)}
                  width={50}
                  height={50}
                  className={cln("local__video-placeholder--image")}
                  alt={profile?.fullName}
                />
              </div>
            </When>
          </div>
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
