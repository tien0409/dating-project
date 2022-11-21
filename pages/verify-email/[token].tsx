import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";

import mailRepository from "@/repositories/mailRepository";
import { VerifyEmailView } from "@/views";
import axiosInstance from "@/configs/axios";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    /* await mailRepository.sendVerifyEmail(); */
    await axiosInstance.post("http://localhost:3001/api/mail/verify-mail");
  } catch (err) {
    console.log("err", err);
  }

  return {
    props: {},
  };
};

const VerifyEmail: NextPage = (props: any) => {
  return (
    <div>
      <Head>
        <title>Dating | Verify email</title>
        <meta name="description" content="Dating app create by student" />
      </Head>

      <VerifyEmailView />
    </div>
  );
};

export default VerifyEmail;
