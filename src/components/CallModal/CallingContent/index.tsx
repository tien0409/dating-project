import Image from "next/image";
import { getAvatar } from "@/utils/urls";
import { AiOutlineClose } from "react-icons/ai";
import classNames from "classnames/bind";

import styles from "../CallModal.module.scss";
import useCallingContent from "./CallingContentHook";

const cln = classNames.bind(styles);

const CallingContent = () => {
  const { receiver, handleCancelCall } = useCallingContent();

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
      <p className={cln("text", "text--calling")}>
        <span>C</span>
        <span>a</span>
        <span>l</span>
        <span>l</span>
        <span>i</span>
        <span>n</span>
        <span>g</span>
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </p>

      <ul className={cln("controls")}>
        <li className={cln("controls__item", "controls__item--cancel")} onClick={handleCancelCall}>
          <AiOutlineClose color={"#fff"} />
        </li>
      </ul>
    </div>
  );
};

export default CallingContent;
