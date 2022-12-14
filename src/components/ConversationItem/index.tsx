import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import classNames from "classnames/bind";
import { SlOptionsVertical } from "react-icons/sl";
import { Dropdown } from "antd";

import styles from "./ConversationItem.module.scss";
import useConversationItem from "@/components/ConversationItem/ConversationItemHook";
import ConversationType from "@/types/chat/ConversationType";
import { MESSAGES_ROUTE } from "@/configs/routes";
import { formatDate } from "@/utils/date";
import { Else, If, Then } from "react-if";

const cln = classNames.bind(styles);

export type ConversationItemProps = {
  conversation: ConversationType | null;
  hasControl?: boolean;
  imageSize?: number;
};

const ConversationItem = (props: ConversationItemProps) => {
  const { conversation, hasControl = false, imageSize = 42 } = props;

  const { isReceiverTyping, receiverConversation, controlOptions } = useConversationItem(props);

  return (
    <Link href={`${MESSAGES_ROUTE}/${conversation?.id}`}>
      <div className={cln("wrapper")}>
        <div className={cln("info")}>
          <div className={cln("avatar")} style={{ width: imageSize, height: imageSize }}>
            <Image
              src={receiverConversation?.user?.avatar || ""}
              width={imageSize}
              height={imageSize}
              objectFit="cover"
              alt="avatar"
            />
          </div>
          <div className={cln("content")}>
            <h4 className={cln("text-truncate", "fullName")}>
              {receiverConversation?.user?.fullName}
            </h4>
            <If condition={isReceiverTyping}>
              <Then>
                <div className={cln("typing")}>
                  <div className={cln("typing__dot")}></div>
                  <div className={cln("typing__dot")}></div>
                  <div className={cln("typing__dot")}></div>
                </div>
              </Then>

              <Else>
                <p className={cln("text-truncate", "main-content")}>
                  {conversation?.lastMessage?.content}
                </p>
              </Else>
            </If>
          </div>
        </div>

        <div className={cln("more-info")}>
          <span className={cln("time")}>
            {formatDate(conversation?.lastMessage?.updatedAt, "HH:mm")}
          </span>
          <span className={cln("not-seen")}></span>
        </div>

        {hasControl && (
          <div className={cln("controls")}>
            <Dropdown menu={{ items: controlOptions }} placement="bottomLeft" trigger={["click"]}>
              <SlOptionsVertical size={13} />
            </Dropdown>
          </div>
        )}
      </div>
    </Link>
  );
};

export default memo(ConversationItem);
