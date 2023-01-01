import { Else, If, Then } from "react-if";
import { memo } from "react";
import classNames from "classnames/bind";

import styles from "./ConversationList.module.scss";
import { ConversationItem, ConversationItemLoading } from "@/components";
import useConversationList from "./ConversationListHook";

const cln = classNames.bind(styles);

const ConversationList = () => {
  const { isConversationActive, conversations, loadingGetConversations } = useConversationList();

  return (
    <div className="custom__scroll custom__scroll--tiny">
      <If condition={loadingGetConversations}>
        <Then>
          <div className={cln("loading__wrapper")}>
            {Array(7)
              .fill(0)
              .map((_item, index) => (
                <ConversationItemLoading key={index} />
              ))}
          </div>
        </Then>

        <Else>
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={cln("conversation__item", {
                isActive: isConversationActive(conversation),
              })}
            >
              <ConversationItem conversation={conversation} hasControl imageSize={50} />
            </div>
          ))}
        </Else>
      </If>
    </div>
  );
};

export default memo(ConversationList);
