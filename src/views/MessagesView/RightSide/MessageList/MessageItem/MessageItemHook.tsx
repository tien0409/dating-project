import { useMemo } from "react";
import { isThisWeek } from "date-fns";

import { MessageItemProps } from ".";
import { formatDate } from "@/utils/date";
import { useChatStore } from "@/store";

const useMessageItem = (props: MessageItemProps) => {
  const { message } = props;

  const senderParticipant = useChatStore((state) => state.senderParticipant);

  const createdAtStr = useMemo(() => {
    if (message && isThisWeek(new Date(message?.createdAt))) {
      return formatDate(new Date(message?.createdAt), "EEEE HH:mm");
    }
    return formatDate(message?.createdAt, "dd/MM/yyyy HH:mm");
  }, [message]);

  return { senderParticipant, createdAtStr };
};

export default useMessageItem;
