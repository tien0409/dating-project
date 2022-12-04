import classNames from "classnames/bind";
import { useRouter } from "next/router";

import styles from "./ConversationList.module.scss";
import { ConversationItem } from "@/components";
import useConversationList from "./ConversationListHook";

const cln = classNames.bind(styles);

const ConversationList = () => {
  const router = useRouter();

  const { _conversationsInternal, loadingGetConversations } = useConversationList();

  return (
    <div className={cln("custom__scroll", "custom__scroll--tiny")}>
      {_conversationsInternal.map((conversation, index) => (
        <div
          className={cln("conversation__item", {
            isActive:
              !loadingGetConversations && router.query?.conversationId?.[0] === conversation.id,
          })}
          key={conversation?.id || index}
        >
          <ConversationItem
            loading={loadingGetConversations}
            conversation={conversation}
            hasControl
            imageSize={50}
          />
        </div>
      ))}
    </div>
  );
};

export default ConversationList;
