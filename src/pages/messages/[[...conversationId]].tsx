import Head from "next/head";

import { MessagesView } from "@/views";
import { PageType } from "@/types";
import { DefaultLayout } from "@/layouts";

const MessagesPage: PageType = () => {
  return (
    <DefaultLayout>
      <Head>
        <title>Inbox</title>
        <meta name="description" content="Dating app create by student." />
        <link rel="icon" href="/public/favicon.ico" />
      </Head>

      <MessagesView />
    </DefaultLayout>
  );
};

export default MessagesPage;
