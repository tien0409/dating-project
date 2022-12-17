import classNames from "classnames/bind";
import { useRouter } from "next/router";
import { When } from "react-if";

import styles from "./VideoCallMini.module.scss";
import VideoCall from "@/views/MessagesView/VideoCall";
import { useCallStore, useConversationStore } from "@/store";

const cln = classNames.bind(styles);

const VideoCallMini = () => {
  const switchToMiniVideo = useCallStore((state) => state.switchToMiniVideo);

  return (
    <When condition={switchToMiniVideo}>
      <div className={cln("wrapper")}>
        <VideoCall isMini />
      </div>
    </When>
  );
};

export default VideoCallMini;
