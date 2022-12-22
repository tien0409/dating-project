import { useMemo, useState } from "react";

const useEncounterCardItem = () => {
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

  return { loadedPhotos, swiperConfigs, handleLoadedPhotos };
};

export default useEncounterCardItem;
