import { memo } from "react";
import classNames from "classnames/bind";

import styles from "./DatingView.module.scss";
import { DefaultLayout, SwiperCustom } from "@/components";

const cln = classNames.bind(styles);
import EncounterCard from "./EncounterCard";
import RecentMessages from "./RecentMessages";

const DatingView = () => {
  return (
    <DefaultLayout>
      <div className="grid grid-cols-12 gap-7">
        <section className={cln("cols-span-7")}>
          <EncounterCard />
        </section>

        <section className="cols-span-5">
          <RecentMessages />
        </section>
      </div>
    </DefaultLayout>
  );
};

export default memo(DatingView);
