import classNames from "classnames/bind";
import { memo, ReactNode } from "react";
import { If, Then } from "react-if";

import styles from "./SingleSelect.module.scss";
import { GenderType } from "@/types";

const cln = classNames.bind(styles);

type Props = {
  iconSuffix?: boolean;
  icon?: ReactNode;
  text: string;
  value?: GenderType;
  onClick?: (_text: string, _value?: GenderType) => void;
  isActive: boolean;
};

const SingleSelect = (props: Props) => {
  const { text, value, icon, iconSuffix = false, isActive = false, onClick } = props;

  const handleClick = () => {
    if (onClick) onClick(text, value);
  };

  return (
    <div
      className={cln("wrapper", {
        isActive,
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
