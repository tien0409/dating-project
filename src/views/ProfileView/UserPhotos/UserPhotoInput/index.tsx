import classNames from "classnames/bind";
import Image from "next/image";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";

import styles from "./UserPhotoInput.module.scss";
import useUserPhotoInput from "./UserPhotoInputHook";
import { Else, If, Then } from "react-if";

const cln = classNames.bind(styles);

const UserPhotoInput = () => {
  const {
    inputRef,
    avatar,
    handleInputClick,
    handleInputFileChange,
    handleRemoveImage,
  } = useUserPhotoInput();

  return (
    <div
      className={cln("wrapper", {
        empty: !avatar,
      })}
      onClick={handleInputClick}
    >
      <input type="file" hidden ref={inputRef} onChange={handleInputFileChange} />
      <If condition={avatar}>
        <Then>
          <Image
            className={cln("image")}
            src={avatar}
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
