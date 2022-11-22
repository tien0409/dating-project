import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";

import mailRepository from "@/repositories/mailRepository";
import { VerifyEmailView } from "@/views";

type Params = {
  token: string;
};

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const props: any = {};
  try {
    const { token } = params as Params;
    const configs = {
      headers: {
        Cookie: req.headers.cookie,
      },
      withCredentials: true,
    };
    const res = await mailRepository.verifyMail(configs, token);
    props.message = res.message;
  } catch (err: any) {
    const { statusCode, message } = err?.response?.data;
    if (statusCode === 400) props.message = message;
  }

  return {
    props,
  };
};

export type VerifyEmailPageProps = {
  message: string;
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
