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
import { WrapperHook } from "@/components";

type MyAppProps = AppProps & {
  Component: PageType;
};

const CallModal = dynamic(() => import("@/components/CallModal"), { ssr: false });
const VideoCallMini = dynamic(() => import("@/components/VideoCallMini"), { ssr: false });

function MyApp({ Component, pageProps }: MyAppProps) {
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
        <WrapperHook>
          <Component {...pageProps} />
          <ToastContainer bodyClassName="toast" />
          <CallModal />
          <VideoCallMini />
        </WrapperHook>
      </ConfigProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
