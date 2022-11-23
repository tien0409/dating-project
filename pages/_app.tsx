import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";

import "../assets/scss/styles.scss";

function MyApp({ Component, pageProps }: AppProps) {
  console.log("pageProps", pageProps)
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#DF4259",
        },
      }}
    >
      <Component {...pageProps} />

      <ToastContainer bodyClassName="toast" />
    </ConfigProvider>
  );
}

export default MyApp;
