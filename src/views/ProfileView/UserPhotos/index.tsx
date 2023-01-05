import classNames from "classnames/bind";

import styles from "./UserPhotos.module.scss";
import UserPhotoInput from "./UserPhotoInput";
import useUserPhotos from "./UserPhotosHook";

const cln = classNames.bind(styles);

const UserPhotos = () => {
  const { primaryPhotos, secondaryPhotos } = useUserPhotos();

  return (
    <div className={cln("wrapper")}>
      <div className={cln("primary__row")}>
        {primaryPhotos?.map((photo) => (
          <UserPhotoInput key={photo.id} photo={photo} />
        ))}
      </div>
      <div className={cln("secondary__row")}>
        {secondaryPhotos?.map((photo, index) => (
          <UserPhotoInput key={photo?.id || index} photo={photo} />
        ))}
      </div>
    </div>
  );
};

export default UserPhotos;
