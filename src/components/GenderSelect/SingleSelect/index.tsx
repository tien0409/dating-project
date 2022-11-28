import classNames from "classnames/bind";
import { memo, ReactNode } from "react";
import { If, Then } from "react-if";

import styles from "./SingleSelect.module.scss";

const cln = classNames.bind(styles);

type Props = {
  iconSuffix?: boolean;
  icon?: ReactNode;
  genderSelected: string;
  text: string;
  value: string;
  onClick?: (_value: string) => void;
};

const SingleSelect = (props: Props) => {
  const { text, value, genderSelected, icon, iconSuffix = false, onClick } = props;

  const handleClick = () => {
    if (onClick) onClick(value);
  };

  return (
    <div
      className={cln("wrapper", {
        isActive: genderSelected === value,
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
