import classNames from "classnames/bind";
import { ReactNode } from "react";

import styles from "./DefaultLayout.module.scss";
import Sidebar from "./Sidebar";
import { ProtectedRoute } from "@/components";
import { When } from "react-if";

const cln = classNames.bind(styles);

type Props = {
  title?: string;
  fullScreen?: boolean;
  children: ReactNode;
};

const DefaultLayout = (props: Props) => {
  const { fullScreen = false, title, children } = props;

  return (
    <ProtectedRoute>
      <main className={cln("wrapper")}>
        <Sidebar />

        <main
          className={cln("main-content", {
            full__screen: fullScreen,
          })}
        >
          <When condition={fullScreen}>
            <h2 className={cln("title")}>{title}</h2>
          </When>
          <div
            className={cln("h-full", "w-full", {
              container: !fullScreen,
            })}
          >
            {children}
          </div>
        </main>
      </main>
    </ProtectedRoute>
  );
};

export default DefaultLayout;
