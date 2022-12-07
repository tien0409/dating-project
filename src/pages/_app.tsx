import type { AppProps } from "next/app";
import { ReactNode, useEffect, useState } from "react";
import { ConfigProvider } from "antd";
import { ToastContainer } from "react-toastify";
import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "../assets/scss/styles.scss";
import { PageType } from "@/types";
import { DefaultLayout } from "@/layouts";
import { useSocketStore, useUserStore } from "@/store";

type MyAppProps = AppProps & {
  Component: PageType;
};

function MyApp({ Component, pageProps }: MyAppProps) {
  const profile = useUserStore((state) => state.profile);
  const initSocket = useSocketStore((state) => state.initSocket);

  useEffect(() => {
    if (profile) initSocket();
  }, [initSocket, profile]);

  const getLayout =
    Component.layout ?? ((page: ReactNode) => <DefaultLayout>{page}</DefaultLayout>);
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
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
    </QueryClientProvider>
  );
}

export default MyApp;
