import { memo } from "react";
import Image from "next/image";
import classNames from "classnames/bind";

import styles from "./MatchItem.module.scss";
import { UserMatchType } from "@/types";
import { getAvatar } from "@/utils/urls";
import { formatDate } from "@/utils/date";

const cln = classNames.bind(styles);

export type MatchItemProps = {
  userMatch: UserMatchType | null;
};

const MatchItem = (props: MatchItemProps) => {
  const { userMatch } = props;

  return (
    <div className={cln("wrapper")}>
      <div className={cln("info")}>
        <div className={cln("avatar")}>
          <Image
            src={getAvatar(userMatch?.userMatched?.avatar)}
            width={42}
            height={42}
            objectFit="cover"
            alt="avatar"
          />
        </div>
        <div className={cln("content")}>
          <h4 className={cln("text-truncate", "fullName")}>{userMatch?.userMatched?.fullName}</h4>
        </div>
      </div>

      <div className={cln("more-info")}>
        <span className={cln("time")}>{formatDate(userMatch?.createdAt, "HH:mm")}</span>
      </div>
    </div>
  );
};

export default memo(MatchItem);
