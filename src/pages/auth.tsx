import Head from "next/head";

import { AuthView } from "../views";
import { PageType } from "@/src/types/PageType";
import { BlankLayout } from "@/src/layouts";

const AuthPage: PageType = () => {
  return (
    <div>
      <Head>
        <title>Dating, metting up today with new friends</title>
        <meta name="description" content="Dating app create by student" />
      </Head>

      <AuthView />
    </div>
  );
};

AuthPage.getLayout = (page) => <BlankLayout>{page}</BlankLayout>;

export default AuthPage;
