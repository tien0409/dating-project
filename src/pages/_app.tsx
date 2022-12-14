import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { ConfigProvider } from "antd";
import { ToastContainer } from "react-toastify";
import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "../assets/scss/styles.scss";
import { PageType } from "@/types";
import { useSocketStore, useAuthStore, useWebRTCStore } from "@/store";
import { CallingModal } from "@/components";
import useChatSocket from "@/hooks/useChatSocket";

type MyAppProps = AppProps & {
  Component: PageType;
};

function MyApp({ Component, pageProps }: MyAppProps) {
  const profile = useAuthStore((state) => state.profile);
  const initSocket = useSocketStore((state) => state.initSocket);
  const initPeer = useWebRTCStore((state) => state.initPeer);

  useChatSocket();

  useEffect(() => {
    if (profile) {
      initSocket();
      initPeer();
    }
  }, [initPeer, initSocket, profile]);

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
        <Component {...pageProps} />
        <ToastContainer bodyClassName="toast" />
        <CallingModal />
      </ConfigProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
