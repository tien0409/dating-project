import { memo, useMemo } from "react";
import Image from "next/image";
import className from "classnames/bind";

import styles from "./PremiumPackageItem.module.scss";
import usePremiumPackageItem from "./PremiumPackageItemHook";
import Avatar0 from "@/assets/images/premium-package-0.png";
import Avatar1 from "@/assets/images/premium-package-1.png";
import Avatar2 from "@/assets/images/premium-package-2.png";
import Avatar3 from "@/assets/images/premium-package-3.png";
import { PremiumPackageType } from "@/types";

const cln = className.bind(styles);

export type PremiumPackageItemProps = {
  premiumPackage: PremiumPackageType;
  index: number;
};

const PremiumPackageItem = (props: PremiumPackageItemProps) => {
  const { premiumPackage, index } = props;

  const { premiumPackageSelected, handleClick } = usePremiumPackageItem(props);

  const Avatar = useMemo(() => {
    switch (index) {
      case 0:
        return Avatar0;
      case 1:
        return Avatar1;
      case 2:
        return Avatar2;
      case 3:
        return Avatar3;
      default:
        return Avatar0;
    }
  }, [index]);

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
