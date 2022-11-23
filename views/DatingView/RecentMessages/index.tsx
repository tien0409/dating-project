import classNames from "classnames/bind";
import Link from "next/link";

import styles from "./RecentMessages.module.scss";
import { MESSAGES_ROUTE } from "@/configs/routes";
import RecentMessageItem from "@/views/DatingView/RecentMessages/RecentMessageItem";

const cln = classNames.bind(styles);

const RecentMessages = () => {
  return (
    <div className={cln("wrapper")}>
      <div className={cln("heading")}>
        <h3 className={cln("title")}>Messages</h3>
        <Link href={MESSAGES_ROUTE} className={cln("view-more")}>
          See all
        </Link>
      </div>

      <div className={cln("message-list")}>
        {[1, 2, 3, 4].map((item, index) => (
          <RecentMessageItem key={index} />
        ))}
      </div>
    </div>
  );
};

export default RecentMessages;
