import Head from "next/head";

import { VerifyEmailView } from "@/views";
import { PageType } from "@/types";

const VerifyEmail: PageType = () => {
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
