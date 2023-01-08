import classNames from "classnames/bind";
import { Input } from "antd";
import { CiSearch } from "react-icons/ci";

import styles from "./LeftSide.module.scss";
import ConversationList from "./ConversationList";

const cln = classNames.bind(styles);

const LeftSide = () => {
  return (
    <div className={cln("wrapper")}>
      <div className={cln("search__btn")}>
        <Input suffix={<CiSearch />} placeholder="Search..." />
      </div>

      {/*<div className={cln("users__active")}>*/}
      {/*  <UserActiveList />*/}
      {/*</div>*/}

      <div className={cln("custom__scroll", "custom__scroll--tiny", "conversation__list")}>
        <ConversationList />
      </div>
    </div>
  );
};

export default LeftSide;
