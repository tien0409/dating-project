import { useContext } from "react";
import { Else, If, Then } from "react-if";

import { AUTH_ROUTE } from "@/configs/routes";
import { AuthContext } from "@/contexts/authContext";

type Props = {
  children: any;
};

const ProtectedRoute = (props: Props) => {
  const { children } = props;

  const { profile, isAuthenticated, isLoading } = useContext(AuthContext);

  if (isLoading || (!isAuthenticated && window.location.pathname !== AUTH_ROUTE)) {
    return <div>Loading</div>;
  }

  return (
    <If condition={isLoading}>
      <Then>loading...</Then>
      <Else>{children}</Else>
    </If>
  );
};

export default ProtectedRoute;
