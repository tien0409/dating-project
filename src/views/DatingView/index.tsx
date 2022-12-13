import { memo } from "react";
import classNames from "classnames/bind";

import styles from "./DatingView.module.scss";
import EncounterCard from "./EncounterCard";
import RecentConversations from "./RecentConversations";
import { DefaultLayout } from "@/layouts";
import { useGetUsersExploreData } from "@/hooks/useUsersData";

const cln = classNames.bind(styles);

const DatingView = () => {
  const { data: res } = useGetUsersExploreData();

  return (
    <DefaultLayout>
      <div className="grid grid-cols-12 gap-7">
        <section className={cln("cols-span-7")}>
          {res?.data?.map((item) => (
            <EncounterCard user={item} key={item?.id} />
          ))}
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
