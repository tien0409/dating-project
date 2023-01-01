import { memo } from "react";
import Image from "next/image";
import className from "classnames/bind";

import styles from "./PremiumPackageItem.module.scss";
import usePremiumPackageItem from "./PremiumPackageItemHook";
import Avatar from "@/assets/images/avatar.jpg";
import { PremiumPackageType } from "@/types";

const cln = className.bind(styles);

export type PremiumPackageItemProps = {
  premiumPackage: PremiumPackageType;
};

const PremiumPackageItem = (props: PremiumPackageItemProps) => {
  const { premiumPackage } = props;

  const { premiumPackageSelected, handleClick } = usePremiumPackageItem(props);

  return (
    <li
      className={cln("wrapper", { selected: premiumPackageSelected?.id === premiumPackage?.id })}
      onClick={handleClick}
    >
      <div className={cln("info")}>
        <Image src={Avatar} alt="avatar" width={30} height={30} objectFit="cover" />
        <div>
          <h6 className={cln("info-month")}>{premiumPackage.numberOfMonths} months</h6>
          <span className={cln("info-discount")}>Save -69%</span>
        </div>
      </div>

      <span className={cln("price")}>
        {new Intl.NumberFormat("de-DE").format(premiumPackage?.price)}
      </span>
    </li>
  );
};

export default memo(PremiumPackageItem);
