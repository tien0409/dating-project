import { NextPage } from "next";
import Head from "next/head";

import { DatingView } from "@/views";

const DatingPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Swipe and Matching now.</title>
        <meta name="description" content="Dating app create by student." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <DatingView />
    </div>
  );
};

export default DatingPage;
