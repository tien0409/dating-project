import { useMemo } from "react";

const useEncounterCard = () => {
  const swiperConfigs = useMemo(
    () => ({
      slidesPerView: 1,
      centeredSlides: true,
      pagination: { clickable: true },
    }),
    [],
  );

  return { swiperConfigs };
}

export default useEncounterCard;
