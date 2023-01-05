import classNames from "classnames/bind";
import { Else, If, Then, When } from "react-if";
import Image from "next/image";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { ImSpinner6 } from "react-icons/im";

import styles from "./UserPhotoInput.module.scss";
import useUserPhotoInput from "./UserPhotoInputHook";
import { UserPhotoType } from "@/types";
import { getAvatar } from "@/utils/urls";

const cln = classNames.bind(styles);

export type UserPhotoInputProps = {
  photo?: UserPhotoType;
};

const UserPhotoInput = (props: UserPhotoInputProps) => {
  const {
    inputRef,
    avatar,
    loading,
    handleInputClick,
    handleInputFileChange,
    handleRemoveImage,
  } = useUserPhotoInput(props);

  return (
    <div
      className={cln("wrapper", {
        empty: !avatar,
        loading,
      })}
      onClick={handleInputClick}
    >
      <When condition={loading}>
        <div className={cln("spinner__wrapper")}>
          <ImSpinner6 size={30} />
        </div>
      </When>
      <input type="file" hidden ref={inputRef} onChange={handleInputFileChange} />
      <If condition={!!avatar}>
        <Then>
          <Image
            className={cln("image")}
            src={getAvatar(avatar)}
            alt="avatar"
            layout="responsive"
            width={300}
            height={300}
            objectFit="cover"
          />
          <div className={cln("icon__wrapper")} onClick={handleRemoveImage}>
            <AiOutlineClose size={16} />
          </div>
        </Then>

        <Else>
          <AiOutlinePlus size={23} />
        </Else>
      </If>
    </div>
  );
};

export default UserPhotoInput;
