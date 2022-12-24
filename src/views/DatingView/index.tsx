import { memo } from "react";
import classNames from "classnames/bind";

import styles from "./DatingView.module.scss";
import RecentConversations from "./RecentConversations";
import EncounterCards from "./EncounterCards";
import { DefaultLayout } from "@/layouts";
import { EncounterMatchedModal } from "@/components";

const cln = classNames.bind(styles);

const DatingView = () => {
  return (
    <DefaultLayout>
      <EncounterMatchedModal />
      <div className="grid grid-cols-12 gap-7">
        <section className={cln("cols-span-7")}>
          <EncounterCards />
        </section>

        <section className={cln("cols-span-5", "right__section")}>
          <RecentConversations />

          <RecentConversations />
        </section>
      </div>
    </DefaultLayout>
  );
};

export default memo(DatingView);
