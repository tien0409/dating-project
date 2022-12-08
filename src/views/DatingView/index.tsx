import { memo } from "react";
import classNames from "classnames/bind";

import styles from "./DatingView.module.scss";
import EncounterCard from "./EncounterCard";
import RecentMessages from "./RecentMessages";
import { DefaultLayout } from "@/layouts";

const cln = classNames.bind(styles);

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
