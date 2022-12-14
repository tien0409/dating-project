import { memo, useMemo, useState } from "react";
import { Else, If, Then } from "react-if";
import classNames from "classnames/bind";

import styles from "./DatingView.module.scss";
import EncounterCard from "./EncounterCard";
import RecentConversations from "./RecentConversations";
import { DefaultLayout } from "@/layouts";
import { useGetUsersExploreData } from "@/hooks/useUsersData";
import { UserAuthType } from "@/types";

const cln = classNames.bind(styles);

const DatingView = () => {
  const { data: res } = useGetUsersExploreData();

  const usersExplore = useMemo<UserAuthType[]>(() => res?.data || [], [res?.data]);
  const [indexEncounter, setIndexEncounter] = useState(0);

  const handleSkip = () => {
    if (usersExplore.length >= indexEncounter + 1) setIndexEncounter(indexEncounter + 1);
  };

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
