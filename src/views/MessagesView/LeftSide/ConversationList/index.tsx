import classNames from "classnames/bind";

import styles from "./ConversationList.module.scss";
import { Conversation } from "@/components";
import useConversationList from "./ConversationListHook";

const cln = classNames.bind(styles);

const ConversationList = () => {
  const { conversations } = useConversationList();

  return (
    <div className={cln("custom__scroll", "custom__scroll--tiny")}>
      {conversations.map((conversation) => (
        <div className={cln("conversation__item")} key={conversation.id}>
          <Conversation conversation={conversation} hasControl imageSize={50} />
        </div>
      ))}
    </div>
  );
};

export default ConversationList;
