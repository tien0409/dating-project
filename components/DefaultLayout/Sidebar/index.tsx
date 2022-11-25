import classNames from "classnames/bind";
import Image from "next/image";
import { Menu } from "antd";
import { AiFillHeart, AiFillMessage, AiFillSetting } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { ItemType } from "antd/es/menu/hooks/useItems";

import styles from "./Sidebar.module.scss";
import Avatar from "assets/images/avatar.jpg";
import {
  AUTH_ROUTE,
  MESSAGES_ROUTE,
  DATING_ROUTE,
  NOTIFICATIONS_ROUTE,
  PROFILE_ROUTE,
  SETTINGS_ROUTE,
} from "@/configs/routes";

const cln = classNames.bind(styles);

const Sidebar = () => {
  const router = useRouter();

  const menuItems = useMemo<ItemType[]>(
    () => [
      {
        label: (
          <div className={cln("menu-item__wrapper")}>
            <Link href={DATING_ROUTE}>
              <div className={cln("menu-item")}>
                <AiFillHeart size={17} />
                <span>Dating</span>
              </div>
            </Link>
          </div>
        ),
        key: DATING_ROUTE,
      },
      {
        label: (
          <div className={cln("menu-item__wrapper")}>
            <Link href={MESSAGES_ROUTE}>
              <div className={cln("menu-item")}>
                <AiFillMessage size={17} />
                <span>Messages</span>
              </div>
            </Link>
          </div>
        ),
        key: MESSAGES_ROUTE,
      },
      {
        label: (
          <div className={cln("menu-item__wrapper")}>
            <Link href={NOTIFICATIONS_ROUTE}>
              <div className={cln("menu-item")}>
                <IoMdNotifications size={17} />
                <span>Notifications</span>
              </div>
            </Link>
          </div>
        ),
        key: NOTIFICATIONS_ROUTE,
      },
      {
        label: (
          <div className={cln("menu-item__wrapper")}>
            <Link href={PROFILE_ROUTE}>
              <div className={cln("menu-item")}>
                <FaUserAlt size={17} />
                <span>Profile</span>
              </div>
            </Link>
          </div>
        ),
        key: PROFILE_ROUTE,
      },
      {
        label: (
          <div className={cln("menu-item__wrapper")}>
            <Link href={SETTINGS_ROUTE}>
              <div className={cln("menu-item")}>
                <AiFillSetting size={17} />
                <span>Settings</span>
              </div>
            </Link>
          </div>
        ),
        key: SETTINGS_ROUTE,
      },
      {
        label: (
          <div className={cln("menu-item__wrapper")}>
            <Link href={AUTH_ROUTE}>
              <div className={cln("menu-item")}>
                <MdLogout size={17} />
                <span>Logout</span>
              </div>
            </Link>
          </div>
        ),
        key: AUTH_ROUTE,
      },
    ],
    [],
  );

  return (
    <aside className={cln("wrapper")}>
      <div className={cln("avatar__wrapper")}>
        <Image src={Avatar} alt="avatar" objectFit="cover" />
      </div>

      <div className={cln("profile")}>
        <h3 className={cln("fullname")}>Floy Miles</h3>
        <p className={cln("address")}>HaNoi, Viet Nam</p>
      </div>

      <div className={cln("special__info")}>
        <div className={cln("special__info-item")}>
          <span className={cln("number")}>87</span>
          <span className={cln("label")}>Friends</span>
        </div>
        <div className={cln("special__info-item")}>
          <span className={cln("number")}>67</span>
          <span className={cln("label")}>Likes</span>
        </div>
        <div className={cln("special__info-item")}>
          <span className={cln("number")}>20</span>
          <span className={cln("label")}>Matches</span>
        </div>
      </div>

      <div className={cln("menu__wrapper")}>
        <Menu
          className={cln("menu")}
          mode="vertical"
          items={menuItems}
          selectedKeys={[router.asPath]}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
