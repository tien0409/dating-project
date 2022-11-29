import Head from "next/head";

import { DatingView } from "@/views";
import { PageType } from "@/types";

const DatingPage: PageType = () => {
  return (
    <div>
      <Head>
        <title>Swipe and Matching now.</title>
        <meta name="description" content="Dating app create by student." />
        <link rel="icon" href="/public/favicon.ico" />
      </Head>

      <DatingView />
    </div>
  );
};

export default DatingPage;
