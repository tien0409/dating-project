import { ReactNode } from "react";

import useChatSocket from "@/hooks/useChatSocket";
import useCallRTC from "@/hooks/useCallRTC";
import useUserMatchesSocket from "@/hooks/useUserMatchesSocket";
import useNotificationsSocket from "@/store/useNotificationsSocket";

type Props = {
  children: ReactNode;
};

const WrapperHook = (props: Props) => {
  const { children } = props;

  useChatSocket();
  useCallRTC();
  useUserMatchesSocket();
  useNotificationsSocket();

  return <>{children}</>;
};

export default WrapperHook;
