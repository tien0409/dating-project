import { useMemo, useState } from "react";

import { useSocketStore } from "@/store";
import { CreateMatchType } from "@/types";
import { DISCARD_ENUM, LIKE_ENUM } from "@/configs/consts";
import { EncounterCardItemProps } from ".";
import { CREATE_USER_MATCH } from "@/configs/socket-events";

const useEncounterCardItem = (props: EncounterCardItemProps) => {
  const { user, handleNext } = props;

  const socket = useSocketStore((state) => state.socket);

  const [loadedPhotos, setLoadedPhotos] = useState(false);

  const swiperConfigs = useMemo(
    () => ({
      slidesPerView: 1,
      centeredSlides: true,
      pagination: { clickable: true },
      loop: true,
    }),
    [],
  );

  const handleLoadedPhotos = () => {
    setLoadedPhotos(true);
  };

  const handleDiscard = () => {
    const payload: CreateMatchType = {
      userMatchId: user?.id,
      type: DISCARD_ENUM,
    };

    socket?.emit(CREATE_USER_MATCH, payload);
    handleNext();
  };

  const handleLike = () => {
    const payload: CreateMatchType = {
      userMatchId: user?.id,
      type: LIKE_ENUM,
    };

    socket?.emit(CREATE_USER_MATCH, payload);
    handleNext();
  };

  return { loadedPhotos, swiperConfigs, handleLoadedPhotos, handleDiscard, handleLike };
};

export default useEncounterCardItem;
