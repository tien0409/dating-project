import classNames from "classnames/bind";

import styles from "./MessagesView.module.scss";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";

const cln = classNames.bind(styles);

const MessagesView = () => {
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
