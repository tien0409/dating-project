import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";

import mailRepository from "@/repositories/mailRepository";
import { VerifyEmailView } from "@/views";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  let isVerified = false;
  try {
    const configs = {
      headers: {
        Cookie: req.headers.cookie,
      },
      withCredentials: true,
    };
    await mailRepository.sendVerifyEmail(configs);
    isVerified = true;
  } catch (err) {
    console.log("err", err);
  }

  return {
    props: { isVerified },
  };
};

export type VerifyEmailPageProps = {
  isVerified: boolean;
};

const VerifyEmail: NextPage<VerifyEmailPageProps> = (props) => {
  return (
    <div>
      <Head>
        <title>Dating | Verify email</title>
        <meta name="description" content="Dating app create by student" />
      </Head>

      <VerifyEmailView {...props} />
    </div>
  );
};

export default VerifyEmail;
