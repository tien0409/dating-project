import { memo } from "react";
import classNames from "classnames/bind";

import styles from "./DatingView.module.scss";
import RecentConversations from "./RecentConversations";
import EncounterCards from "./EncounterCards";
import RecentMatches from "./RecentMatches";
import { DefaultLayout } from "@/layouts";
import { EncounterMatchedModal } from "@/components";

const cln = classNames.bind(styles);

const DatingView = () => {
  return (
    <DefaultLayout>
      <EncounterMatchedModal />
      <div className={cln("wrapper")}>
        <section className={cln("left__section")}>
          <EncounterCards />
        </section>

        <section className={cln("right__section")}>
          <RecentConversations />

          <RecentMatches />
        </section>
      </div>
    </DefaultLayout>
  );
};

export default memo(DatingView);
