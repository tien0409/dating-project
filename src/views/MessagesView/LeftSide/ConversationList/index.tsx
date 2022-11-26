import classNames from "classnames/bind";

import styles from "./ConvesationList.module.scss";
import { Conversation } from "@/src/components";

const cln = classNames.bind(styles);

const ConversationList = () => {
  return (
    <div className={cln("custom__scroll", "custom__scroll--tiny")}>
      {Array(4)
        .fill(0)
        .map((item, index) => (
          <div className={cln("conversation__item")} key={index}>
            <Conversation hasControl imageSize={50} />
          </div>
        ))}
    </div>
  );
};

export default ConversationList;
