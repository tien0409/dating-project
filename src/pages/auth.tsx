import { NextPage } from "next";
import Head from "next/head";
import { AuthView } from "../views";

const AuthPage: NextPage = () => {
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

export default AuthPage;
