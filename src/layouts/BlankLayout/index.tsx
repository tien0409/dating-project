import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const BlankLayout = (props: Props) => {
  const { children } = props;

  return <>{children}</>;
};

export default BlankLayout;
