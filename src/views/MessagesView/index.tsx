import classNames from "classnames/bind";
import { Else, If, Then } from "react-if";

import styles from "./MessagesView.module.scss";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import useMessageView from "./MessagesViewHook";
import VideoCall from "./VideoCall";
import { useMessageStore } from "@/store";

const cln = classNames.bind(styles);

const MessagesView = () => {
  useMessageView();

  const isCalling = useMessageStore((state) => state.isCalling);

  return (
    <div className={cln("wrapper")}>
      <section
        className={cln("left-side", {
          "left-side--calling": isCalling,
        })}
      >
        <If condition={isCalling}>
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
          "right-side--calling": isCalling,
        })}
      >
        <RightSide />
      </section>
    </div>
  );
};

export default MessagesView;
