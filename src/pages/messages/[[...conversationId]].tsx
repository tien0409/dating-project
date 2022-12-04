import Head from "next/head";

import { MessagesView } from "@/views";
import { PageType } from "@/types";

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
