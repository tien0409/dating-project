import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

// eslint-disable-next-line @typescript-eslint/ban-types
type PageType<P = {}, IP = P> = NextPage<P, IP> & {
  // eslint-disable-next-line no-unused-vars
  getLayout?: (page: ReactElement) => ReactNode;
};

export default PageType;
