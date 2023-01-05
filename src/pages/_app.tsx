import type { AppProps } from "next/app";
import { Else, If, Then } from "react-if";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { ConfigProvider } from "antd";
import { ToastContainer } from "react-toastify";
import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "../assets/scss/styles.scss";
import { PageType } from "@/types";
import { LoadingScreen, WrapperHook } from "@/components";

type MyAppProps = AppProps & {
  Component: PageType;
};

const CallModal = dynamic(() => import("@/components/CallModal"), { ssr: false });
const VideoCallMini = dynamic(() => import("@/components/VideoCallMini"), { ssr: false });

function MyApp({ Component, pageProps }: MyAppProps) {
  const router = useRouter();

  const [queryClient] = useState(() => new QueryClient());
  const [loading, setLoading] = useState(false);

  const handleRouteChangeStart = useCallback(() => {
    setLoading(true);
  }, []);

  const handleRouteChangeComplete = useCallback(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [handleRouteChangeComplete, handleRouteChangeStart, router.events]);

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
        <If condition={loading}>
          <Then>
            <LoadingScreen />
          </Then>

          <Else>
            <WrapperHook>
              <Component {...pageProps} />
              <ToastContainer bodyClassName="toast" />
              <CallModal />
              <VideoCallMini />
            </WrapperHook>
          </Else>
        </If>
      </ConfigProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
