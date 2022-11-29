import { SwiperSlide } from "swiper/react";
import Image from "next/image";
import classNames from "classnames/bind";

import styles from "./UserActiveList.module.scss";
import { SwiperCustom } from "@/components";
import Avatar from "@/assets/images/avatar.jpg";
import useUserActiveList from "./UserActiveListHook";

const cln = classNames.bind(styles);

const UserActiveList = () => {
  const { swiperConfigs } = useUserActiveList();

  return (
    <div>
      <h3 className={cln("title")}>Active Now</h3>

      <div className={cln("users__image")}>
        <SwiperCustom {...swiperConfigs}>
          {Array(6)
            .fill(0)
            .map((item, index) => (
              <SwiperSlide key={index}>
                <div className={cln("avatar--circle")}>
                  <Image src={Avatar} alt="avatar" objectFit="cover" />
                </div>
              </SwiperSlide>
            ))}
        </SwiperCustom>
      </div>
    </div>
  );
};

export default UserActiveList;
