import classNames from "classnames/bind";
import Image from "next/image";

import styles from "./NotificationsView.module.scss";
import SystemIcon from "@/assets/images/system-icon.svg";

const cln = classNames.bind(styles);

const NotificationsView = () => {
  return (
    <div className={cln("wrapper")}>
      <div className={cln("actions")}>
        <span>Delete all</span>
        <span>Mark read</span>
      </div>

      <ul className={cln("notification__list")}>
        <li className={cln("notification__item")}>
          <div className={cln("main__content")}>
            <div className={cln("image__wrapper")}>
              <Image src={SystemIcon} width={50} height={50} />
            </div>

            <div className={cln("info")}>
              <h3 className={cln("title")}>Mua 2 tặng 1</h3>
              <p className={cln("description")}>
                Mua 2 tặng 1 khi mua các Khóa học của thầy Nguyễn Văn Anh
              </p>
            </div>
          </div>

          <div className={cln("more__info")}>
            <span className={cln("time")}>01/12/2020 - 12:30:00</span>
            <span className={cln("unread")}>&nbsp;</span>
          </div>
        </li>

        <li className={cln("notification__item", "active")}>
          <div className={cln("main__content")}>
            <div className={cln("image__wrapper")}>
              <Image src={SystemIcon} width={50} height={50} />
            </div>

            <div className={cln("info")}>
              <h3 className={cln("title")}>Mua 2 tặng 1</h3>
              <p className={cln("description")}>
                Mua 2 tặng 1 khi mua các Khóa học của thầy Nguyễn Văn Anh
              </p>
            </div>
          </div>

          <div className={cln("more__info")}>
            <span className={cln("time")}>01/12/2020 - 12:30:00</span>
            <span className={cln("unread")}>&nbsp;</span>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default NotificationsView;
