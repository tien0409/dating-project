import { NextPage } from "next";
import Head from "next/head";

import { DefaultLayout } from "@/layouts";
import { ProfileView } from "@/views";

const ProfilePage: NextPage = () => {
  return (
    <DefaultLayout fullScreen title="Profile">
      <Head>
        <title>My Profile</title>
        <meta name="description" content="Dating app create by student." />
        <link rel="icon" href="/public/favicon.ico" />
      </Head>

      <ProfileView />
    </DefaultLayout>
  );
};

export default ProfilePage;
