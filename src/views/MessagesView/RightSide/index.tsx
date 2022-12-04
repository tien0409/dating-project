import { Avatar, Input } from "antd";
import classNames from "classnames/bind";
import { BsTelephoneFill } from "react-icons/bs";
import { FaVideo } from "react-icons/fa";
import _isEmpty from "lodash/isEmpty";
import { AiOutlineClose } from "react-icons/ai";

import styles from "./RightSide.module.scss";
import MessageList from "./MessageList";
import MessageForm from "./MessageForm";
import { useRouter } from "next/router";
import { If, Then } from "react-if";
import { useChatStore } from "@/store";
import { GoReply } from "react-icons/go";

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
              <h3 className={cln("text-truncate", "full-name")}>
                {receiverParticipant?.user?.fullName}
              </h3>
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

          <div
            className={cln("form__input", {
              replying: false,
            })}
          >
            <If condition={false}>
              <Then>
                <div className={cln("reply__wrapper")}>
                  <div className={cln("reply__icon")}>
                    <GoReply size={24} />
                  </div>

                  <div className={cln("message")}>
                    <h5 className={cln("text-truncate", "message__fullName")}>Le Anh Tien</h5>
                    <p className={cln("text-truncate", "message__content")}>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque, pariatur.
                    </p>
                  </div>

                  <button className={cln("close")}>
                    <AiOutlineClose size={20} />
                  </button>
                </div>
              </Then>
            </If>
            <MessageForm />
          </div>
        </div>
      </Then>
    </If>
  );
};

export default RightSide;
