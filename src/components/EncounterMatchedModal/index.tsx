import { Button } from "antd";
import Image from "next/image";
import classNames from "classnames/bind";

import styles from "./EncounterMatchedModal.module.scss";
import useEncounterMatchedModal from "./EncounterMatchedModalHook";
import { getAvatar } from "@/utils/urls";

const cln = classNames.bind(styles);
const EncounterMatchedModal = () => {
  const {
    visible,
    profile,
    userCurrentMatched,
    handleBackToSwipe,
    handleGoToChat,
  } = useEncounterMatchedModal();

  return (
    <div className={cln("wrapper", {visible})}>
      <div className={cln("mask")}></div>
      <div className={cln("content")}>
        <h3 className={cln("title")}>BOOM!</h3>
        <div className={cln("users__matched")}>
          <div className={cln("yourself")}>
            <Image
              src={getAvatar(profile?.avatar)}
              alt={profile?.fullName}
              width={140}
              height={140}
              objectFit="cover"
            />
          </div>
          <div className={cln("heart")}></div>
          <div className={cln("enemy")}>
            <Image
              src={getAvatar(userCurrentMatched?.userMatched?.avatar)}
              alt={userCurrentMatched?.userMatched?.fullName}
              width={140}
              height={140}
              objectFit="cover"
            />
          </div>
        </div>
        <p className={cln("sub__title")}>
          It&rsquo;s a match! Now you and{" "}
          <strong>{userCurrentMatched?.userMatched?.fullName}</strong> has 24 hours to start
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
    </div>
  );
};

export default EncounterMatchedModal;
