import classNames from "classnames/bind";
import { ReactNode } from "react";

import styles from "./DefaultLayout.module.scss";
import Sidebar from "./Sidebar";
import { AuthProvider } from "@/src/contexts/authContext";
import { ProtectedRoute } from "@/src/components";

const cln = classNames.bind(styles);

type Props = {
  children: ReactNode;
};

const DefaultLayout = (props: Props) => {
  const { children } = props;

  return (
    <AuthProvider>
      <ProtectedRoute>
        <main className={cln("wrapper")}>
          <Sidebar />
          <main className={cln("main-content")}>
            <div className="container h-full w-full">{children}</div>
          </main>
        </main>
      </ProtectedRoute>
    </AuthProvider>
  );
};

export default DefaultLayout;
