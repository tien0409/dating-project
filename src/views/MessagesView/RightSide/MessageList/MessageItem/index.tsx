import { memo } from "react";
import { Avatar } from "antd";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { GoReply } from "react-icons/go";
import classNames from "classnames/bind";

import styles from "./MessageItem.module.scss";

const cln = classNames.bind(styles);

const MessageItem = () => {
  return (
    <div className={cln("wrapper")}>
      <Avatar
        size={37}
        src="https://scontent.fhan14-1.fna.fbcdn.net/v/t1.6435-9/35855974_2046707952248442_6348017081451020288_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=e3f864&_nc_ohc=jBWT9YCfmRoAX-Sa9mk&_nc_ht=scontent.fhan14-1.fna&oh=00_AfCDThzM4h3LdZSrJpkRfqmn3kNAn1HoV7syg1s9f20IPQ&oe=63A711AA"
      />
      <div className={cln("content")}>Hello world 1234</div>
      <div className={cln("message__actions")}>
        <AiFillEdit size={17} cursor="pointer" />
        <AiFillDelete size={17} cursor="pointer" />
        <GoReply size={17} cursor="pointer" />
      </div>
    </div>
  );
};

export default memo(MessageItem);
