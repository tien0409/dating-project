import Head from "next/head";
import { NextPage } from "next";

import CreateAccountView from "@/views/CreateAccountView";

export const CreateAccount: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Create information help people know better</title>
        <meta name="description" content="Dating app create by student" />
      </Head>

      <CreateAccountView />
    </div>
  );
};

export default CreateAccount;
