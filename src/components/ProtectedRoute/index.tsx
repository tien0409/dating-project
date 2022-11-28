import { ReactNode, useContext } from "react";
import { Else, If, Then } from "react-if";

import { AuthContext } from "@/src/contexts/authContext";

type Props = {
  children: ReactNode;
};

const ProtectedRoute = (props: Props) => {
  const { children } = props;

  const { isLoading } = useContext(AuthContext);

  return (
    <If condition={isLoading}>
      <Then>loading...</Then>
      <Else>{children}</Else>
    </If>
  );
};

export default ProtectedRoute;
