import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";
import { FaPhoneSlash } from "react-icons/fa";
import classNames from "classnames/bind";

import styles from "../CallModal.module.scss";
import { getAvatar } from "@/utils/urls";
import useUserCallUnavailableContent from "./UserCallUnavailableContentHook";
import { Tooltip } from "antd";

const cln = classNames.bind(styles);

const UserCallUnavailableContent = () => {
  const { receiver, handleCall } = useUserCallUnavailableContent();

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
        <span>is unavailable</span>
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

export default UserCallUnavailableContent;
