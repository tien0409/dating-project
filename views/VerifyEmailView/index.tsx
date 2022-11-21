import classNames from "classnames/bind";
import Image from "next/image";
import { IoMdArrowBack } from "react-icons/io";
import { useRouter } from "next/router";

import styles from "./VerifyEmailView.module.scss";
import EmailVerified from "assets/images/email_verified.svg";
import { AUTH_ROUTE } from "@/configs/routes";
import { VerifyEmailPageProps } from "@/pages/verify-email/[token]";
import { Else, If, Then } from "react-if";

const cln = classNames.bind(styles);

const VerifyEmailView = (props: VerifyEmailPageProps) => {
  const { isVerified } = props;

  const router = useRouter();

  const handleRedirectLogin = () => {
    localStorage.setItem("redirect", "login");
    router.push(AUTH_ROUTE);
  };

  return (
    <main className="w-screen h-screen flex-center flex-col">
      <div className={cln("image")}>
        <Image src={EmailVerified} alt="Verify email" objectFit="contain" />
      </div>

      <h1 className={cln("mt-12", "title")}>
        <If condition={isVerified}>
          <Then>Verified email successfully!</Then>
          <Else>Verify email failure. Token expired or wrong.</Else>
        </If>
      </h1>
      <div className={cln("back")} onClick={handleRedirectLogin}>
        <IoMdArrowBack />
        <span>Back to Login</span>
      </div>
    </main>
  );
};

export default VerifyEmailView;
