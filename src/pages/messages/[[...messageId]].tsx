import { NextPage } from "next";
import Head from "next/head";

import { MessagesView } from "@/src/views";
import { PageType } from "@/src/types/PageType";

const MessagesPage: PageType = () => {
  return (
    <>
      <Head>
        <title>Inbox</title>
        <meta name="description" content="Dating app create by student." />
        <link rel="icon" href="/public/favicon.ico" />
      </Head>

      <MessagesView />
    </>
  );
};

export default MessagesPage;
