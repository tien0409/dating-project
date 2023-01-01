import Image from "next/image";
import { Skeleton, Tooltip } from "antd";
import { memo } from "react";
import { Else, If, Then, When } from "react-if";
import classNames from "classnames/bind";
import { SwiperSlide } from "swiper/react";
import { ImCross } from "react-icons/im";
import { FaHeart } from "react-icons/fa";

import styles from "./EncounterCardItem.module.scss";
import { SwiperCustom } from "@/components";
import useEncounterCardItem from "./EncounterCardItemHook";
import { UserType } from "@/types";
import { getAvatar } from "@/utils/urls";

const cln = classNames.bind(styles);

export type EncounterCardItemProps = {
  user: UserType;
  isFront: boolean;
  handleNext: () => void;
};

const EncounterCardItem = (props: EncounterCardItemProps) => {
  const { user, isFront } = props;

  const {
    loadedPhotos,
    swiperConfigs,
    handleLoadedPhotos,
    handleLike,
    handleDiscard,
  } = useEncounterCardItem(props);

  return (
    <If condition={!!user}>
      <Then>
        <div className={cln("wrapper", { "is-front": isFront })}>
          <SwiperCustom configs={swiperConfigs}>
            {user?.photos?.map((photo) => (
              <SwiperSlide key={photo?.id}>
                <div className={cln("image__wrapper")}>
                  <Image
                    src={getAvatar(photo?.link)}
                    alt="description"
                    width={500}
                    height={500}
                    layout="responsive"
                    objectFit="cover"
                    objectPosition="center"
                    onLoad={handleLoadedPhotos}
                    hidden={!loadedPhotos}
                    priority={isFront}
                  />
                  <When condition={!loadedPhotos}>
                    <Skeleton.Image active className={cln("image__wrapper-loading")} />
                  </When>
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
                <div className={cln("action-item", "action-item--skip")} onClick={handleDiscard}>
                  <ImCross />
                </div>
                <div className={cln("action-item", "action-item--like")} onClick={handleLike}>
                  <FaHeart />
                </div>
              </div>
            </div>

            <p className={cln("bio")}>{user?.bio}</p>

            <div className={cln("passions")}>
              <h4 className={cln("passions__title")}>Passions</h4>

              <ul className={cln("passions__list")}>
                {user?.passions?.map((passion) => (
                  <Tooltip key={passion.id} title={passion.description}>
                    <li
                      style={{
                        backgroundColor: passion.bgColor,
                        color: passion.fgColor,
                        border: `1px solid ${passion.borderColor}`,
                      }}
                      className={cln("passions__item")}
                    >
                      # {passion.name}
                    </li>
                  </Tooltip>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Then>

      <Else>Skip abc</Else>
    </If>
  );
};
export default memo(EncounterCardItem);
