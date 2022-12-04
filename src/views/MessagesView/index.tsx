import classNames from "classnames/bind";

import styles from "./MessagesView.module.scss";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import useMessageView from "./MessagesViewHook";

const cln = classNames.bind(styles);

const MessagesView = () => {
  useMessageView();

  return (
    <div className={cln("wrapper")}>
      <section className={cln("left-side")}>
        <LeftSide />
      </section>

      <hr className={cln("divider")} />

      <section className={cln("right-side")}>
        <RightSide />
      </section>
    </div>
  );
};

export default MessagesView;
