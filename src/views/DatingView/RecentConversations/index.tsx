import classNames from "classnames/bind";
import Link from "next/link";

import styles from "./RecentConversations.module.scss";
import { MESSAGES_ROUTE } from "@/configs/routes";
import { ConversationItem } from "@/components";
import useRecentConversation from "./RecentConversationsHook";

const cln = classNames.bind(styles);

const RecentConversations = () => {
  const { loadingGetConversations, _conversationsInternal } = useRecentConversation();

  return (
    <div className={cln("wrapper")}>
      <div className={cln("heading")}>
        <h3 className={cln("title")}>Messages</h3>
        <Link href={MESSAGES_ROUTE} className={cln("view-more")}>
          See all
        </Link>
      </div>

      <div className={cln("message-list")}>
        {_conversationsInternal.map((conversation, index) => (
          <ConversationItem
            key={conversation.id || index}
            conversation={conversation}
            loading={loadingGetConversations}
          />
        ))}
      </div>
    </div>
  );
};

export default RecentConversations;
