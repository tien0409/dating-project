import classNames from "classnames/bind";

import styles from "./UserPhotos.module.scss";
import UserPhotoInput from "./UserPhotoInput";

const cln = classNames.bind(styles);

const UserPhotos = () => {
  return (
    <div className={cln("wrapper")}>
      <div className={cln("primary__row")}>
        <UserPhotoInput />
        <UserPhotoInput />
        <UserPhotoInput />
      </div>
      <div className={cln("secondary__row")}>
        <UserPhotoInput />
        <UserPhotoInput />
        <UserPhotoInput />
      </div>
    </div>
  );
};

export default UserPhotos;
