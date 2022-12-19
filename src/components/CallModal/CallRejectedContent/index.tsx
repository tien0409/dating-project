import Image from "next/image";
import { Tooltip } from "antd";
import { AiOutlineClose } from "react-icons/ai";
import { FaPhoneSlash } from "react-icons/fa";
import classNames from "classnames/bind";

import styles from "../CallModal.module.scss";
import { getAvatar } from "@/utils/urls";
import useCallRejectedContent from "./CallRejectedContentHook";

const cln = classNames.bind(styles);

const CallRejectedContent = () => {
  const { receiver, handleCall } = useCallRejectedContent();

  return (
    <div className={cln("wrapper")}>
      <div className={cln("avatar")}>
        <Image
          src={getAvatar(receiver?.avatar)}
          alt={receiver?.fullName}
          layout="responsive"
          width={100}
          height={100}
        />
      </div>
      <p className={cln("text")}>
        <span className={cln("full-name")}>{receiver?.fullName} </span>
        <span>rejected call</span>
      </p>

      <ul className={cln("controls")}>
        <Tooltip title={"Call again"}>
          <li
            className={cln("controls__item", "controls__item--accept")}
            onClick={handleCall("re-call")}
          >
            <FaPhoneSlash color={"#fff"} />
          </li>
        </Tooltip>

        <Tooltip title={"Cancel"}>
          <li
            className={cln("controls__item", "controls__item--cancel")}
            onClick={handleCall("cancel")}
          >
            <AiOutlineClose color={"#fff"} />
          </li>
        </Tooltip>
      </ul>
    </div>
  );
};

export default CallRejectedContent;
