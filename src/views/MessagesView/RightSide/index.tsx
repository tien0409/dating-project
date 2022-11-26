import { Avatar, Input } from "antd";
import classNames from "classnames/bind";
import { BsTelephoneFill } from "react-icons/bs";
import { FaVideo } from "react-icons/fa";

import styles from "./RightSide.module.scss";
import MessageList from "./MessageList";
import MessageForm from "./MessageForm";

const cln = classNames.bind(styles);

const RightSide = () => {
  return (
    <div className={cln("wrapper")}>
      <div className={cln("header")}>
        <div className={cln("info")}>
          <Avatar
            size={50}
            src="https://scontent.fhan14-1.fna.fbcdn.net/v/t1.6435-9/35855974_2046707952248442_6348017081451020288_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=e3f864&_nc_ohc=jBWT9YCfmRoAX-Sa9mk&_nc_ht=scontent.fhan14-1.fna&oh=00_AfCDThzM4h3LdZSrJpkRfqmn3kNAn1HoV7syg1s9f20IPQ&oe=63A711AA"
          />
          <h3 className={cln("full-name")}>Mr.Satan</h3>
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
  );
};

export default RightSide;
