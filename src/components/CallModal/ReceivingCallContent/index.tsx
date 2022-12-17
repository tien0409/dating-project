import Image from "next/image";
import { AiFillPhone, AiOutlineClose } from "react-icons/ai";
import classNames from "classnames/bind";

import styles from "../CallModal.module.scss";
import { getAvatar } from "@/utils/urls";
import useReceivingCallContent from "./ReceivingCallContentHook";

const cln = classNames.bind(styles);

const ReceivingCallContent = () => {
  const { caller, handleCall } = useReceivingCallContent();

  return (
    <div className={cln("wrapper")}>
      <div className={cln("avatar")}>
        <Image
          src={getAvatar(caller?.avatar)}
          alt={caller?.fullName}
          layout="responsive"
          width={100}
          height={100}
        />
      </div>
      <p className={cln("text")}>
        <span className={cln("full-name")}>{caller?.fullName} </span>
        <span>muốn gọi cho bạn</span>
      </p>

      <ul className={cln("controls")}>
        <li
          className={cln("controls__item", "controls__item--accept")}
          onClick={handleCall("accept")}
        >
          <AiFillPhone color={"#fff"} />
        </li>

        <li
          className={cln("controls__item", "controls__item--cancel")}
          onClick={handleCall("reject")}
        >
          <AiOutlineClose color={"#fff"} />
        </li>
      </ul>
    </div>
  );
};

export default ReceivingCallContent;
