import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";

import "../assets/scss/styles.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#DF4259",
        },
      }}
    >
      <Component {...pageProps} />
      <Suspense>
        <Toaster containerClassName="toast" />
      </Suspense>
    </ConfigProvider>
  );
}

export default MyApp;
