import classNames from "classnames/bind";
import Image from "next/image";
import { Button, Modal } from "antd";
import { useState } from "react";
import { If, Then } from "react-if";

import styles from "./AuthView.module.scss";
import AuthImage from "@/assets/images/auth-bg.svg";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ForgotPasswordForm from "./ForgotPasswordForm";

const cln = classNames.bind(styles);

export type FormType = "LoginForm" | "RegistrationForm" | "ForgotPasswordForm";

const AuthView = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formType, setFormType] = useState<FormType>("LoginForm");

  const handleOpenForm = (formType: FormType) => () => {
    setIsModalOpen(true);
    setFormType(formType);
  };

  const handleCloseForm = () => {
    setIsModalOpen(false);
  };

  return (
    <main className={cln("wrapper")}>
      <div className={cln("container", "h-full", "grid", "grid-cols-12")}>
        <div className={cln("cols-span-5", "flex-center", "flex-col")}>
          <div className={cln("intro")}>
            <h1>Start Metting Up Today!</h1>
            <p>
              Connect with members near you and enjoy unlimited direct messages, and so much more!
            </p>
          </div>
          <div className={cln("auth__actions")}>
            <Button
              shape="round"
              size="large"
              className={cln("login__action")}
              onClick={handleOpenForm("LoginForm")}
            >
              <span className={cln("login__action-text")}>LOGIN</span>
            </Button>
            <Button
              type="primary"
              shape="round"
              size="large"
              className={cln("registration__action")}
              onClick={handleOpenForm("RegistrationForm")}
            >
              <span className={cln("registration__action-text")}>REGISTRATION</span>
            </Button>
          </div>
        </div>

        <div className={cln("cols-span-7", "flex-center")}>
          <Image src={AuthImage} alt="auth image" />
        </div>
      </div>
      <Modal open={isModalOpen} footer={false} onCancel={handleCloseForm}>
        <If condition={formType === "LoginForm"}>
          <Then>
            <LoginForm setFormType={setFormType} />
          </Then>
        </If>

        <If condition={formType === "RegistrationForm"}>
          <Then>
            <RegisterForm setFormType={setFormType} />
          </Then>
        </If>

        <If condition={formType === "ForgotPasswordForm"}>
          <Then>
            <ForgotPasswordForm setFormType={setFormType} />
          </Then>
        </If>
      </Modal>
    </main>
  );
};

export default AuthView;
