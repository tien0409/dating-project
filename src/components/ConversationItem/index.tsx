import Image from "next/image";
import Link from "next/link";
import classNames from "classnames/bind";
import { SlOptionsVertical } from "react-icons/sl";
import { Dropdown, Skeleton } from "antd";

import styles from "./ConversationItem.module.scss";
import useConversationItem from "@/components/ConversationItem/ConversationItemHook";
import ConversationType from "@/types/chat/ConversationType";
import { MESSAGES_ROUTE } from "@/configs/routes";
import { formatDate } from "@/utils/date";
import { Else, If, Then } from "react-if";

const cln = classNames.bind(styles);

export type ConversationItemProps = {
  loading: boolean;
  conversation: ConversationType | null;
  hasControl?: boolean;
  imageSize?: number;
};

const ConversationItem = (props: ConversationItemProps) => {
  const { loading, conversation, hasControl = false, imageSize = 42 } = props;

  const { isReceiverTyping, controlOptions } = useConversationItem(props);

  return (
    <If condition={loading}>
      <Then>
        <div className={cln("skeleton__wrapper")}>
          <Skeleton.Avatar active />
          <Skeleton.Input block active />
        </div>
      </Then>
      <Else>
        <Link href={`${MESSAGES_ROUTE}/${conversation?.id}`}>
          <div className={cln("wrapper")}>
            <div className={cln("info")}>
              <div className={cln("avatar")} style={{ width: imageSize, height: imageSize }}>
                <Image
                  src={conversation?.participant?.user?.avatar || ""}
                  width={imageSize}
                  height={imageSize}
                  objectFit="cover"
                  alt="avatar"
                />
              </div>
              <div className={cln("content")}>
                <h4 className={cln("text-truncate", "fullName")}>
                  {conversation?.participant?.user?.fullName}
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
                <Dropdown menu={{ items: controlOptions }} placement="bottomLeft" trigger="click">
                  <SlOptionsVertical size={13} />
                </Dropdown>
              </div>
            )}
          </div>
        </Link>
      </Else>
    </If>
  );
};

export default ConversationItem;
