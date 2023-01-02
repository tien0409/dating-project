import { ChangeEvent, MouseEvent, useRef, useState } from "react";

import Avatar from "@/assets/images/avatar.jpg";

const useUserPhotoInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [avatar, setAvatar] = useState<any>(Avatar);

  const handleInputClick = () => {
    inputRef.current?.click();
  };

  const handleInputFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const src = URL.createObjectURL(e.target.files[0]);
      setAvatar(src);
    }

    e.target.value = "";
  };

  const handleRemoveImage = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setAvatar(null);
  };

  return { inputRef, avatar, handleInputClick, handleInputFileChange, handleRemoveImage };
};

export default useUserPhotoInput;
