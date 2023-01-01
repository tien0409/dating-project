import classNames from "classnames/bind";
import { MdOutlineAttachMoney, MdOutlineSettingsBackupRestore } from "react-icons/md";
import { BiTimeFive } from "react-icons/bi";

import styles from "./PremiumPackages.module.scss";
import usePremiumPackages from "./PremiumPackagesHook";
import PremiumPackageItem from "@/views/PaymentsView/PremiumPackages/PremiumPackageItem";

const cln = classNames.bind(styles);

const PremiumPackages = () => {
  const { premiumPackages } = usePremiumPackages();

  return (
    <div className={cln("wrapper")}>
      <h4 className={cln("title")}>Unlock Premium Package</h4>
      <div className={cln("content")}>
        <ul className={cln("benefits")}>
          <li className={cln("benefit__item")}>
            <div className={cln("benefit__item-icon")}>
              <MdOutlineSettingsBackupRestore size={16} />
            </div>
            <span>Get a second chance to chat to expired matches with Rematch</span>
          </li>

          <li className={cln("benefit__item")}>
            <div className={cln("benefit__item-icon")}>
              <BiTimeFive size={16} />
            </div>
            <span>Get more time to chat to your matches with Extend</span>
          </li>

          <li className={cln("benefit__item")}>
            <div className={cln("benefit__item-icon")}>
              <MdOutlineAttachMoney size={16} />
            </div>
            <span>You will be charged 249,000₫ every month. Cancel anytime</span>
          </li>
        </ul>

        <ul className={cln("packages")}>
          {premiumPackages.map((item) => (
            <PremiumPackageItem key={item.id} premiumPackage={item} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PremiumPackages;
