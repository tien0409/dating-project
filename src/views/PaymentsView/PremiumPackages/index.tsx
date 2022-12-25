import classNames from "classnames/bind";
import Image from "next/image";
import { MdOutlineAttachMoney, MdOutlineSettingsBackupRestore } from "react-icons/md";
import { BiTimeFive } from "react-icons/bi";

import styles from "./PremiumPackages.module.scss";
import Avatar from "@/assets/images/avatar.jpg";

const cln = classNames.bind(styles);

const PremiumPackages = () => {
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
          <li className={cln("package__item")}>
            <div className={cln("package__item-info")}>
              <Image src={Avatar} alt="avatar" width={30} height={30} objectFit="cover" />
              <div>
                <h6 className={cln("package__item-info-month")}>6 months</h6>
                <span className={cln("package__item-info-discount")}>Save -69%</span>
              </div>
            </div>

            <span className={cln("package__item-price")}>990,000d</span>
          </li>

          <li className={cln("package__item", "selected")}>
            <div className={cln("package__item-info")}>
              <Image src={Avatar} alt="avatar" width={30} height={30} objectFit="cover" />
              <div>
                <h6 className={cln("package__item-info-month")}>6 months</h6>
                <span className={cln("package__item-info-discount")}>Save -69%</span>
              </div>
            </div>

            <span className={cln("package__item-price")}>990,000d</span>
          </li>

          <li className={cln("package__item")}>
            <div className={cln("package__item-info")}>
              <Image src={Avatar} alt="avatar" width={30} height={30} objectFit="cover" />
              <div>
                <h6 className={cln("package__item-info-month")}>6 months</h6>
                <span className={cln("package__item-info-discount")}>Save -69%</span>
              </div>
            </div>

            <span className={cln("package__item-price")}>990,000d</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PremiumPackages;
