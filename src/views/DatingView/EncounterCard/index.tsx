import Image from "next/image";
import classNames from "classnames/bind";
import { SwiperSlide } from "swiper/react";
import { ImCross } from "react-icons/im";
import { FaHeart } from "react-icons/fa";

import styles from "./EncounterCard.module.scss";
import { SwiperCustom } from "@/components";
import useEncounterCard from "./EncounterCardHook";
import { UserAuthType } from "@/types";
import { getAvatar } from "@/utils/urls";

const cln = classNames.bind(styles);

type EncounterCardProps = {
  user: UserAuthType;
  onSkip: () => void;
};

const EncounterCard = (props: EncounterCardProps) => {
  const { user, onSkip } = props;

  const { swiperConfigs } = useEncounterCard();

  return (
    <div className={cln("wrapper")}>
      <SwiperCustom configs={swiperConfigs}>
        {user?.photos?.map((photo) => (
          <SwiperSlide key={photo?.id}>
            <div className={cln("image__wrapper", "image__wrapper--first")}>
              <Image
                src={getAvatar(photo?.link)}
                alt="description"
                width={500}
                height={500}
                layout="responsive"
                objectFit="cover"
                objectPosition="center"
              />
            </div>
          </SwiperSlide>
        ))}
      </SwiperCustom>

      <div className={cln("summary")}>
        <div className={cln("primary")}>
          <div>
            <h3 className={cln("fullName", "online")}>
              {user?.fullName}, {user?.age}
            </h3>
            <p className={cln("location")}>Ha Noi, Viet Nam</p>
          </div>

          <div className={cln("actions")}>
            <div className={cln("action-item", "action-item--skip")} onClick={onSkip}>
              <ImCross />
            </div>
            <div className={cln("action-item", "action-item--like")}>
              <FaHeart />
            </div>
          </div>
        </div>

        <p className={cln("bio")}>{user?.bio}</p>

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
