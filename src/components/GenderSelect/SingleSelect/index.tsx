import classNames from "classnames/bind";
import { memo, ReactNode } from "react";
import { If, Then } from "react-if";

import styles from "./SingleSelect.module.scss";
import { GenderType } from "@/types";

const cln = classNames.bind(styles);

type Props = {
  iconSuffix?: boolean;
  icon?: ReactNode;
  genderSelected?: GenderType;
  text: string;
  value?: GenderType;
  onClick?: (_value?: GenderType) => void;
};

const SingleSelect = (props: Props) => {
  const { text, value, genderSelected, icon, iconSuffix = false, onClick } = props;

  const handleClick = () => {
    if (onClick) onClick(value);
  };

  return (
    <div
      className={cln("wrapper", {
        isActive: genderSelected?.id === value?.id,
      })}
      onClick={handleClick}
    >
      <If condition={icon && !iconSuffix}>
        <Then>{icon}</Then>
      </If>
      <span>{text}</span>
      <If condition={icon && iconSuffix}>
        <Then>{icon}</Then>
      </If>
    </div>
  );
};

export default memo(SingleSelect);
