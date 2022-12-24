import classNames from "classnames/bind";
import { Else, If, Then } from "react-if";
import Link from "next/link";

import styles from "./RecentConversations.module.scss";
import { MESSAGES_ROUTE } from "@/configs/routes";
import { ConversationItem, ConversationItemLoading } from "@/components";
import useRecentConversation from "./RecentConversationsHook";

const cln = classNames.bind(styles);

const RecentConversations = () => {
  const { loadingGetConversations, conversations } = useRecentConversation();

  return (
    <div className={cln("wrapper")}>
      <div className={cln("heading")}>
        <h3 className={cln("title")}>Messages</h3>
        <Link href={MESSAGES_ROUTE} className={cln("view-more")}>
          See all
        </Link>
      </div>

      <div className={cln("message__list")}>
        <If condition={loadingGetConversations}>
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
            {conversations.slice(0, 5).map((conversation) => (
              <div key={conversation.id} className={cln("message__item")}>
                <ConversationItem conversation={conversation} />
              </div>
            ))}
          </Else>
        </If>
      </div>
    </div>
  );
};

export default RecentConversations;
