import { useMemo } from "react";

const useUserActiveList = () => {
  const swiperConfigs = useMemo(
    () => ({
      slidesPerView: 2,
      spaceBetween: 20,
      breakpoints: {
        640: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      },
    }),
    [],
  );

  return {
    swiperConfigs,
  };
};

export default useUserActiveList;
