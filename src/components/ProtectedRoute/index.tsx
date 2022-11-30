import { ReactNode } from "react";
import { Else, If, Then } from "react-if";

import useProtectedRoute from "./ProtectedRouteHook";

type Props = {
  children: ReactNode;
};

const ProtectedRoute = (props: Props) => {
  const { children } = props;

  const { isLoading } = useProtectedRoute();

  return (
    <If condition={isLoading}>
      <Then>loading...</Then>
      <Else>{children}</Else>
    </If>
  );
};

export default ProtectedRoute;
