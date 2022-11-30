import Head from "next/head";

import CreateAccountView from "@/views/CreateAccountView";
import { PageType } from "@/types";
import { BlankLayout } from "@/layouts";

const CreateAccount: PageType = () => {
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

CreateAccount.layout = (page) => <BlankLayout>{page}</BlankLayout>;

export default CreateAccount;
