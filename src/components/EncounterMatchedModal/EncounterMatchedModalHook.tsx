import { useRouter } from "next/router";

import { MESSAGES_ROUTE } from "@/configs/routes";
import { EncounterMatchedModalProps } from ".";

const useEncounterMatchedModal = (props: EncounterMatchedModalProps) => {
  const { setOpen } = props;

  const router = useRouter();

  const handleGoToChat = () => {
    router.push(MESSAGES_ROUTE);
  };

  const handleBackToSwipe = () => {
    setOpen(false);
  };

  return {
    handleGoToChat,
    handleBackToSwipe,
  };
};

export default useEncounterMatchedModal;
