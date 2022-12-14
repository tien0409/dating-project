import classNames from "classnames/bind";
import { useRef } from "react";
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

  const leftRef = useRef<HTMLElement>(null);
  const rightRef = useRef<HTMLElement>(null);

  const isCalling = useMessageStore((state) => state.isCalling);
  const setIsCalling = useMessageStore((state) => state.setIsCalling);

  const handleResize = () => {
    setIsCalling(!isCalling);
    if (!isCalling) {
      leftRef.current?.classList.add(cln("left-side--calling"));
      rightRef.current?.classList.add(cln("right-side--calling"));
    } else {
      leftRef.current?.classList.remove(cln("left-side--calling"));
      rightRef.current?.classList.remove(cln("right-side--calling"));
    }
  };

  return (
    <div className={cln("wrapper")}>
      <section className={cln("left-side")} ref={leftRef}>
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

      <section className={cln("right-side")} onClick={handleResize} ref={rightRef}>
        <RightSide />
      </section>
    </div>
  );
};

export default MessagesView;
