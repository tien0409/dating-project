import { memo } from "react";
import { Else, If, Then } from "react-if";
import classNames from "classnames/bind";

import styles from "./DatingView.module.scss";
import useDatingView from "./DatingViewHook";
import EncounterCard from "./EncounterCard";
import RecentConversations from "./RecentConversations";
import { DefaultLayout } from "@/layouts";

const cln = classNames.bind(styles);

const DatingView = () => {
  const { usersExplore, indexEncounter, handleSkip } = useDatingView();

  return (
    <DefaultLayout>
      <div className="grid grid-cols-12 gap-7">
        <section className={cln("cols-span-7")}>
          <If condition={!!usersExplore?.[indexEncounter]}>
            <Then>
              <EncounterCard user={usersExplore[indexEncounter]} onSkip={handleSkip} />
            </Then>

            <Else>Skip abc</Else>
          </If>
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
