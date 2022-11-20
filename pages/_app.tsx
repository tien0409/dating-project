import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";
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
    </ConfigProvider>
  );
}

export default MyApp;
