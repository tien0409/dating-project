import classNames from "classnames/bind";
import { Else, If, Then } from "react-if";
import Link from "next/link";

import styles from "./RecentMatches.module.scss";
import useRecentMatches from "./RecentMatchesHook";
import MatchItem from "./MatchItem";
import { MESSAGES_ROUTE } from "@/configs/routes";
import { ConversationItemLoading } from "@/components";

const cln = classNames.bind(styles);

const RecentMatches = () => {
  const { loadingGetUserMatches, userMatches } = useRecentMatches();

  return (
    <div className={cln("wrapper")}>
      <div className={cln("heading")}>
        <h3 className={cln("title")}>Matches</h3>
        <Link href={MESSAGES_ROUTE} className={cln("view-more")}>
          See all
        </Link>
      </div>

      <div className={cln("message__list")}>
        <If condition={loadingGetUserMatches}>
          <Then>
            {Array(5)
              .fill(0)
              .map((_item, index) => (
                <div key={index} className={cln("message__loading-item")}>
                  <ConversationItemLoading />
                </div>
              ))}
          </Then>

          <Else>
            {userMatches.slice(0, 5).map((userMatch) => (
              <div key={userMatch.id} className={cln("message__item")}>
                <MatchItem userMatch={userMatch} />
              </div>
            ))}
          </Else>
        </If>
      </div>
    </div>
  );
};

export default RecentMatches;
