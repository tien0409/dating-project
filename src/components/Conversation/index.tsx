import Image from "next/image";
import Link from "next/link";
import classNames from "classnames/bind";
import { SlOptionsVertical } from "react-icons/sl";
import { Dropdown } from "antd";

import styles from "./Conversation.module.scss";
import useConversation from "@/components/Conversation/ConversationHook";
import ConversationType from "@/types/chat/ConversationType";
import { MESSAGES_ROUTE } from "@/configs/routes";
import { formatDate } from "@/utils/date";

const cln = classNames.bind(styles);

export type ConversationProps = {
  conversation: ConversationType;
  hasControl?: boolean;
  imageSize?: number;
};

const Conversation = (props: ConversationProps) => {
  const { conversation, hasControl = false, imageSize = 42 } = props;

  const { controlOptions } = useConversation(props);

  return (
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
            <h4 className={cln("fullName")}>{conversation?.participant?.user?.fullName}</h4>
            <p className={cln("text-truncate", "main-content")}>
              {conversation?.lastMessage?.content}
            </p>
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
            <Dropdown menu={{ items: controlOptions }} placement="bottomLeft">
              <SlOptionsVertical size={13} />
            </Dropdown>
          </div>
        )}
      </div>
    </Link>
  );
};

export default Conversation;
