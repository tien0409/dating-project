import { NextPage } from "next";
import Head from "next/head";

import { MessagesView } from "@/views";

const MessagesPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Inbox</title>
        <meta name="description" content="Dating app create by student." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MessagesView />
    </div>
  );
};

export default MessagesPage;
