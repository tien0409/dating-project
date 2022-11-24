import Image from "next/image";
import classNames from "classnames/bind";
import { SlOptionsVertical } from "react-icons/sl";
import { Dropdown } from "antd";

import styles from "./Conversation.module.scss";
import Avatar from "@/assets/images/avatar.jpg";
import useConversation from "@/components/Conversation/ConversationHook";

const cln = classNames.bind(styles);

type Props = {
  hasControl?: boolean;
  imageSize?: number;
};

const Conversation = (props: Props) => {
  const { hasControl = false, imageSize = 42 } = props;

  const { controlOptions } = useConversation();

  return (
    <div className={cln("wrapper")}>
      <div className={cln("info")}>
        <div className={cln("avatar")} style={{ width: imageSize, height: imageSize }}>
          <Image src={Avatar} alt="avatar" />
        </div>
        <div className={cln("content")}>
          <h4 className={cln("fullName")}>Jane Copper</h4>
          <p className={cln("main-content")}>Askbced</p>
        </div>
      </div>

      <div className={cln("more-info")}>
        <span className={cln("time")}>3:32</span>
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
  );
};

export default Conversation;
