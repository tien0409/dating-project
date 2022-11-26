import { useContext } from "react";
import { Else, If, Then } from "react-if";

import { AUTH_ROUTE } from "@/src/configs/routes";
import { AuthContext } from "@/src/contexts/authContext";

type Props = {
  children: any;
};

const ProtectedRoute = (props: Props) => {
  const { children } = props;

  const { profile, isAuthenticated, isLoading } = useContext(AuthContext);

  return (
    <If condition={isLoading}>
      <Then>loading...</Then>
      <Else>{children}</Else>
    </If>
  );
};

export default ProtectedRoute;
