import { ReactNode } from "react";

import { Swiper } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";

type Props = {
  children: ReactNode;
  configs?: { [key: string]: any };
};

SwiperCore.use([Navigation, Pagination]);

const SwiperCustom = (props: Props) => {
  const { children, configs } = props;

  return <Swiper {...configs}>{children}</Swiper>;
};

export default SwiperCustom;
