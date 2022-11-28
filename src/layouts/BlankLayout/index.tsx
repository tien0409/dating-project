import { ReactNode } from "react";
import { getCookie } from "cookies-next";

import { DATING_ROUTE } from "@/src/configs/routes";

type Props = {
  children: ReactNode;
};

const BlankLayout = (props: Props) => {
  const { children } = props;

  if (getCookie("Authentication") && getCookie("Refresh")) {
    window.location.pathname = DATING_ROUTE;
  }

  return children;
};

export default BlankLayout;
