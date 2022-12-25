import { Fragment, ReactNode } from "react";
import { ProtectedRoute } from "@/components";

type Props = {
  isAuth?: boolean;
  children: ReactNode;
};

const BlankLayout = (props: Props) => {
  const { children, isAuth = false } = props;

  const Wrapper = isAuth ? ProtectedRoute : Fragment;

  return <Wrapper>{children}</Wrapper>;
};

export default BlankLayout;
