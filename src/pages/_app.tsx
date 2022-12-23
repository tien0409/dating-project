import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { useState } from "react";
import { ConfigProvider } from "antd";
import { ToastContainer } from "react-toastify";
import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "../assets/scss/styles.scss";
import { PageType } from "@/types";
import useChatSocket from "@/hooks/useChatSocket";
import useCallRTC from "@/hooks/useCallRTC";
import useUserMatchesSocket from "@/hooks/useUserMatchesSocket";

type MyAppProps = AppProps & {
  Component: PageType;
};

const CallModal = dynamic(() => import("@/components/CallModal"), { ssr: false });
const VideoCallMini = dynamic(() => import("@/components/VideoCallMini"), { ssr: false });

function MyApp({ Component, pageProps }: MyAppProps) {
  useChatSocket();
  useCallRTC();
  useUserMatchesSocket();

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
        <CallModal />
        <VideoCallMini />
      </ConfigProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
