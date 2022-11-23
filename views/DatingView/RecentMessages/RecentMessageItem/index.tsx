import Image from "next/image";
import classNames from "classnames/bind";

import styles from "./RecentMessageItem.module.scss";
import Avatar from "@/assets/images/avatar.jpg";

const cln = classNames.bind(styles);

const MessageItem = () => {
  return (
    <div className={cln("wrapper")}>
      <div className={cln("info")}>
        <div className={cln("avatar")}>
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
    </div>
  );
};

export default MessageItem;
