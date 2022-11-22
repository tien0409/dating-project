import classNames from "classnames/bind";
import { ReactNode } from "react";

import styles from "./DefaultLayout.module.scss";
import Sidebar from "./Sidebar";

const cln = classNames.bind(styles);

type Props = {
  children: ReactNode;
};

const DefaultLayout = () => {
  return (
    <main className={cln("wrapper")}>
      <div className="container w-full h-full grid grid-cols-12 gap-x-8">
        <div className="cols-span-3 relative">
          <Sidebar />
        </div>
        <div className="cols-span-5">content</div>

        <div className="cols-span-4">contetn2</div>
      </div>
    </main>
  );
};

export default DefaultLayout;
