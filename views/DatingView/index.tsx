import { memo } from "react";
import classNames from "classnames/bind";

import styles from "./DatingView.module.scss";
import { DefaultLayout, SwiperCustom } from "@/components";

const cln = classNames.bind(styles);
import EncounterCard from "./EncounterCard";

const DatingView = () => {

  return (
    <DefaultLayout>
      <div className="grid grid-cols-12 gap-7">
        <section className={cln("cols-span-8")}>
          <EncounterCard />
        </section>

        <section className="cols-span-4">message</section>
      </div>
    </DefaultLayout>
  );
};

export default memo(DatingView);
