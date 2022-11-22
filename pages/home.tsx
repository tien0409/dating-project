import { NextPage } from "next";
import Head from "next/head";

import { HomeView } from "@/views";

const HomePage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Swipe and Matching now.</title>
        <meta name="description" content="Dating app create by student." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HomeView />
    </div>
  );
};

export default HomePage;
