import { Button, Modal } from "antd";
import Image from "next/image";
import classNames from "classnames/bind";

import styles from "./EncounterMatchedModal.module.scss";
import useEncounterMatchedModal from "./EncounterMatchedModalHook";
import Avatar from "@/assets/images/avatar.jpg";
import { Dispatch, SetStateAction } from "react";

const cln = classNames.bind(styles);

export type EncounterMatchedModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const EncounterMatchedModal = (props: EncounterMatchedModalProps) => {
  const { open } = props;

  const { handleBackToSwipe, handleGoToChat } = useEncounterMatchedModal(props);

  return (
    <Modal
      open={open}
      footer={false}
      closable={false}
      maskStyle={{ backgroundColor: "rgba(0,0,0, 0.7)", backdropFilter: "blur(10px)" }}
      modalRender={() => (
        <div className={cln("wrapper")}>
          <h3 className={cln("title")}>BOOM!</h3>
          <div className={cln("users__matched")}>
            <div className={cln("yourself")}>
              <Image src={Avatar} width={140} height={140} />
            </div>
            <div className={cln("heart")}></div>
            <div className={cln("enemy")}>
              <Image src={Avatar} width={140} height={140} />
            </div>
          </div>
          <p className={cln("sub__title")}>
            It&rsquo;s a match! You matched at Stone. Now you and Stone has 24 hours to start
            conversation.
          </p>

          <div className={cln("action__list")}>
            <Button size="large" shape="round" onClick={handleGoToChat}>
              <span>Go to the chat</span>
            </Button>
            <Button
              className={cln("back__action")}
              size="large"
              shape="round"
              type="link"
              onClick={handleBackToSwipe}
            >
              <span>Back to Dating</span>
            </Button>
          </div>
        </div>
      )}
    />
  );
};

export default EncounterMatchedModal;
