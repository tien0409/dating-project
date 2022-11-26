import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";

import "../assets/scss/styles.scss";
import { AuthProvider } from "@/contexts/authContext";
import { ProtectedRoute } from "@/components";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ProtectedRoute>
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
      </ProtectedRoute>
    </AuthProvider>
  );
}

export default MyApp;
