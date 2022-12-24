import { useMemo, useState } from "react";

import { useSocketStore } from "@/store";
import { CreateUserDiscardType, CreateUserLikeType } from "@/types";
import { EncounterCardItemProps } from ".";
import { CREATE_USER_DISCARD, CREATE_USER_LIKE } from "@/configs/socket-events";

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
    const payload: CreateUserDiscardType = {
      userDiscardedId: user?.id,
    };

    socket?.emit(CREATE_USER_DISCARD, payload);
    handleNext();
  };

  const handleLike = () => {
    const payload: CreateUserLikeType = {
      userLikedId: user?.id,
    };

    socket?.emit(CREATE_USER_LIKE, payload);
    handleNext();
  };

  return { loadedPhotos, swiperConfigs, handleLoadedPhotos, handleDiscard, handleLike };
};

export default useEncounterCardItem;
