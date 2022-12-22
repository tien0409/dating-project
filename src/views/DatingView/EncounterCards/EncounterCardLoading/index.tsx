import classNames from "classnames/bind";
import { Skeleton } from "antd";

import styles from "./EncounterCardLoading.module.scss";
import { SwiperCustom } from "@/components";
import { SwiperSlide } from "swiper/react";

const cln = classNames.bind(styles);

const EncounterCardLoading = () => {
  return (
    <>
      <div className={cln("wrapper")}>
        <SwiperCustom
          configs={{
            slidesPerView: 1,
            centeredSlides: true,
            pagination: { clickable: true },
            loop: true,
          }}
        >
          <SwiperSlide>
            <Skeleton.Image active className={cln("image")} />
          </SwiperSlide>
        </SwiperCustom>
        <div className={cln("summary")}>
          <Skeleton.Input active />
          <div className={cln("paragraph")}>
            <Skeleton active paragraph={{ rows: 4 }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default EncounterCardLoading;
