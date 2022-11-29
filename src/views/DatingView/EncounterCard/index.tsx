import Image from "next/image";
import classNames from "classnames/bind";
import { SwiperSlide } from "swiper/react";
import { ImCross } from "react-icons/im";
import { FaHeart } from "react-icons/fa";

import styles from "./EncounterCard.module.scss";
import { SwiperCustom } from "@/components";
import Avatar from "@/assets/images/avatar.jpg";
import useEncounterCard from "./EncounterCardHook";

const cln = classNames.bind(styles);

const EncounterCard = () => {
  const { swiperConfigs } = useEncounterCard();

  return (
    <div className={cln("wrapper")}>
      <SwiperCustom configs={swiperConfigs}>
        <SwiperSlide>
          <div className={cln("image__wrapper", "image__wrapper--first")}>
            <Image src={Avatar} alt="description" objectFit="contain" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={cln("image__wrapper")}>
            <Image src={Avatar} alt="description" objectFit="cover" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={cln("image__wrapper")}>
            <Image src={Avatar} alt="description" objectFit="cover" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={cln("image__wrapper", "image__wrapper--last")}>
            <Image src={Avatar} alt="description" objectFit="cover" />
          </div>
        </SwiperSlide>
      </SwiperCustom>

      <div className={cln("summary")}>
        <div className={cln("primary")}>
          <div>
            <h3 className={cln("fullName", "online")}>Mabelle Keller, 21</h3>
            <p className={cln("location")}>Ha Noi, Viet Nam</p>
          </div>

          <div className={cln("actions")}>
            <div className={cln("action-item", "action-item--skip")}>
              <ImCross />
            </div>
            <div className={cln("action-item", "action-item--like")}>
              <FaHeart />
            </div>
          </div>
        </div>

        <p className={cln("bio")}>
          An interesting implication of the 2007 study concerns the use of hand sanitizers by
          observant Muslims. Alcohol is forbiddien to Muslims.
        </p>

        <div className={cln("passions")}>
          <h4 className={cln("passions-title")}>Passions</h4>

          <ul className={cln("passions-list")}>
            <li className={cln("passions-item")}># Music</li>
            <li className={cln("passions-item")}># Music</li>
            <li className={cln("passions-item")}># Music</li>
            <li className={cln("passions-item")}># Music</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EncounterCard;
