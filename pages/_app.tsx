import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

import "../assets/scss/styles.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#DF4259"
        }
      }}>
      <Component {...pageProps} />
      <Toaster containerClassName="toast" />
    </ConfigProvider>
  );
}

export default MyApp;
