import { ReactNode } from "react";

import { AuthProvider } from "@/src/contexts/authContext";

type Props = {
  children: ReactNode;
};

const BlankLayout = (props: Props) => {
  const { children } = props;

  return <AuthProvider>{children}</AuthProvider>;
};

export default BlankLayout;
