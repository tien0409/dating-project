import { ReactNode } from "react";
import classNames from "classnames/bind";

import styles from "./MessagesView.module.scss";
import { DefaultLayout } from "@/components";
import LeftSide from "./LeftSide";
import { Divider } from "antd";

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

        <section className={cln("right-side")}>Right side</section>
      </div>
    </DefaultLayout>
  );
};

export default MessagesView;
