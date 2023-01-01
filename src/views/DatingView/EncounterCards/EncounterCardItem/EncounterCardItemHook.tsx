import { useMemo, useState } from "react";

import { useAuthStore, useSocketStore } from "@/store";
import { CreateUserDiscardType, CreateUserLikeType } from "@/types";
import { EncounterCardItemProps } from ".";
import { CREATE_USER_DISCARD, CREATE_USER_LIKE } from "@/configs/socket-events";

const useEncounterCardItem = (props: EncounterCardItemProps) => {
  const { user, handleNext } = props;

  const profile = useAuthStore((state) => state.profile);
  const setProfile = useAuthStore((state) => state.setProfile);
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
    profile &&
      Array.isArray(profile?.userDiscards) &&
      user?.id &&
      setProfile({ ...profile, userDiscards: [...profile.userDiscards, user?.id] });
    handleNext();
  };

  const handleLike = () => {
    const payload: CreateUserLikeType = {
      userLikedId: user?.id,
    };

    socket?.emit(CREATE_USER_LIKE, payload);
    profile &&
      Array.isArray(profile?.userLikes) &&
      user?.id &&
      setProfile({ ...profile, userLikes: [...profile.userLikes, user?.id] });
    handleNext();
  };

  return { loadedPhotos, swiperConfigs, handleLoadedPhotos, handleDiscard, handleLike };
};

export default useEncounterCardItem;
