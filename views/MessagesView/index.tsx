import { ReactNode } from "react";
import classNames from "classnames/bind";
import { Divider } from "antd";

import styles from "./MessagesView.module.scss";
import { DefaultLayout } from "@/components";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";

const cln = classNames.bind(styles);

type Props = {
  children: ReactNode;
};

const MessagesView = () => {
  return (
    <DefaultLayout>
      <div className={cln("wrapper")}>
        <section className={cln("left-side")}>
          <LeftSide />
        </section>

        <hr className={cln("divider")} />

        <section className={cln("right-side")}>
          <RightSide />
        </section>
      </div>
    </DefaultLayout>
  );
};

export default MessagesView;
