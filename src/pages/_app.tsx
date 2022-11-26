import type { AppProps } from "next/app";
import { ReactNode } from "react";
import { ConfigProvider } from "antd";
import { ToastContainer } from "react-toastify";

import "../assets/scss/styles.scss";
import { DefaultLayout } from "@/src/layouts";
import { PageType } from "@/src/types/PageType";

type MyAppProps = AppProps & {
  Component: PageType;
};

function MyApp({ Component, pageProps }: MyAppProps) {
  const getLayout =
    Component.getLayout ?? ((page: ReactNode) => <DefaultLayout>{page}</DefaultLayout>);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#DF4259",
        },
      }}
    >
      {getLayout(<Component {...pageProps} />)}
      <ToastContainer bodyClassName="toast" />
    </ConfigProvider>
  );
}

export default MyApp;
