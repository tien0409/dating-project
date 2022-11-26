import { memo } from "react";
import classNames from "classnames/bind";

import styles from "./DatingView.module.scss";

const cln = classNames.bind(styles);
import EncounterCard from "./EncounterCard";
import RecentMessages from "./RecentMessages";

const DatingView = () => {
  return (
    <div className="grid grid-cols-12 gap-7">
      <section className={cln("cols-span-7")}>
        <EncounterCard />
      </section>

      <section className="cols-span-5">
        <RecentMessages />
      </section>
    </div>
  );
};

export default memo(DatingView);
