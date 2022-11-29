import classNames from "classnames/bind";
import Image from "next/image";
import { IoMdArrowBack } from "react-icons/io";

import styles from "./VerifyEmailView.module.scss";
import EmailVerified from "@/assets/images/email_verified.svg";
import useVerifyEmailView from "./VerifyEmailViewHook";

const cln = classNames.bind(styles);

const VerifyEmailView = () => {
  const { message, handleRedirectLogin } = useVerifyEmailView();

  return (
    <main className="w-screen h-screen flex-center flex-col">
      <div className={cln("image")}></div>
      <Image src={EmailVerified} alt="Verify email" objectFit="contain" />

      <h1 className={cln("mt-12", "title")}>{message}</h1>
      <div className={cln("back")} onClick={handleRedirectLogin}>
        <IoMdArrowBack />
        <span>Back to Login</span>
      </div>
    </main>
  );
};

export default VerifyEmailView;
