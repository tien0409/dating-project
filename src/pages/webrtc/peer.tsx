import { NextPage } from "next";
import Head from "next/head";

import { PeerPageView } from "@/views";

const PeerPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Swipe and Matching now.</title>
        <meta name="description" content="Dating app create by student." />
        <link rel="icon" href="/public/favicon.ico" />
      </Head>

      <PeerPageView />
    </>
  );
};

export default PeerPage;
