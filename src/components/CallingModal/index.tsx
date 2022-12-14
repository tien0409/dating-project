import { Modal } from "antd";
import Image from "next/image";
import classNames from "classnames/bind";
import { AiFillPhone, AiOutlineClose } from "react-icons/ai";

import styles from "./CallingModal.module.scss";
import Avatar from "@/assets/images/avatar.jpg";

const cln = classNames.bind(styles);

const CallingModal = () => {
  return (
    <Modal open={false} footer={false}>
      <div className={cln("wrapper")}>
        <div className={cln("avatar")}>
          <Image src={Avatar} alt={"avatar"} />
        </div>
        <p className={cln("text")}>
          <span className={cln("full-name")}>Username </span>
          <span>muốn gọi cho bạn</span>
        </p>

        <ul className={cln("controls")}>
          <li className={cln("controls__item", "controls__item--accept")}>
            <AiFillPhone color={"#fff"} />
          </li>

          <li className={cln("controls__item", "controls__item--cancel")}>
            <AiOutlineClose color={"#fff"} />
          </li>
        </ul>
      </div>
    </Modal>
  );
};

export default CallingModal;
