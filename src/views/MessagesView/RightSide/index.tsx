import { Avatar, Input } from "antd";
import classNames from "classnames/bind";
import { BsTelephoneFill } from "react-icons/bs";
import { FaVideo } from "react-icons/fa";
import _isEmpty from "lodash/isEmpty";

import styles from "./RightSide.module.scss";
import MessageList from "./MessageList";
import MessageForm from "./MessageForm";
import { useRouter } from "next/router";
import { If, Then } from "react-if";
import { useChatStore } from "@/store";

const cln = classNames.bind(styles);

const RightSide = () => {
  const router = useRouter();
  const receiverParticipant = useChatStore((state) => state.receiverParticipant);

  return (
    <If condition={!_isEmpty(router.query)}>
      <Then>
        <div className={cln("wrapper")}>
          <div className={cln("header")}>
            <div className={cln("info")}>
              <Avatar size={50} src={receiverParticipant?.user?.avatar} />
              <h3 className={cln("text-truncate", "full-name")}>{receiverParticipant?.user?.fullName}</h3>
            </div>

            <div className={cln("actions")}>
              <Input placeholder="Search message..." />
              <BsTelephoneFill size={24} cursor="pointer" />
              <FaVideo size={24} cursor="pointer" />
            </div>
          </div>

          <hr className={cln("divider")} />

          <div className={cln("message__list", "custom__scroll", "custom__scroll--tiny")}>
            <MessageList />
          </div>

          <div className={cln("form__input")}>
            <MessageForm />
          </div>
        </div>
      </Then>
    </If>
  );
};

export default RightSide;
