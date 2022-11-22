import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";

import "../assets/scss/styles.scss";
import { DefaultLayout } from "@/components";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#DF4259",
        },
      }}
    >
      <DefaultLayout></DefaultLayout>
      <Component {...pageProps} />

      <ToastContainer bodyClassName="toast" />
    </ConfigProvider>
  );
}

export default MyApp;
