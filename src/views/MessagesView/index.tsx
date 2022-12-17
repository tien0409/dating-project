import classNames from "classnames/bind";
import { Else, If, Then } from "react-if";

import styles from "./MessagesView.module.scss";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import VideoCall from "./VideoCall";
import useMessageView from "./MessagesViewHook";

const cln = classNames.bind(styles);

const MessagesView = () => {
  const { isInCall, isZoom, switchToMiniVideo } = useMessageView();

  return (
    <div className={cln("wrapper")}>
      <section
        className={cln("left-side", {
          "left-side--calling": isInCall,
          "is-video-zoom": isZoom,
        })}
      >
        <If condition={isInCall && !switchToMiniVideo}>
          <Then>
            <VideoCall />
          </Then>

          <Else>
            <LeftSide />
          </Else>
        </If>
      </section>

      <hr className={cln("divider")} />

      <section
        className={cln("right-side", {
          "right-side--calling": isInCall,
          "is-video-zoom": isZoom,
        })}
      >
        <RightSide />
      </section>
    </div>
  );
};

export default MessagesView;
