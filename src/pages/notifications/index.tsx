import { NextPage } from "next";
import Head from "next/head";

import { DefaultLayout } from "@/layouts";
import { NotificationsView } from "@/views";

const NotificationsPage: NextPage = () => {
  return (
    <DefaultLayout fullScreen title="Notifications">
      <Head>
        <title>Notifications</title>
        <meta name="description" content="Dating app create by student." />
        <link rel="icon" href="/public/favicon.ico" />
      </Head>

      <NotificationsView />
    </DefaultLayout>
  );
};

export default NotificationsPage;
