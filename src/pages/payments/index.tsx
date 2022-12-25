import Head from "next/head";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { NextPage } from "next";

import { BlankLayout } from "@/layouts";
import { PaymentsView } from "@/views";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

const PaymentsPage: NextPage = () => {
  return (
    <BlankLayout isAuth>
      <Head>
        <title>Payment Dating Package</title>
        <meta name="description" content="Dating app create by student." />
        <link rel="icon" href="/public/favicon.ico" />
      </Head>

      <Elements stripe={stripePromise}>
        <PaymentsView />
      </Elements>
    </BlankLayout>
  );
};

export default PaymentsPage;
