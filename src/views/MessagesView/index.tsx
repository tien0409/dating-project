import classNames from "classnames/bind";
import { Else, If, Then } from "react-if";

import styles from "./MessagesView.module.scss";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import VideoCall from "./VideoCall";
import useMessageView from "./MessagesViewHook";

const cln = classNames.bind(styles);

const MessagesView = () => {
  const { isInCall } = useMessageView();

  return (
    <div className={cln("wrapper")}>
      <section
        className={cln("left-side", {
          "left-side--calling": isInCall,
        })}
      >
        <If condition={isInCall}>
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
        })}
      >
        <RightSide />
      </section>
    </div>
  );
};

export default MessagesView;
