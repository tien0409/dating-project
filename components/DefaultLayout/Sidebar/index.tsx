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

  const menuItems = useMemo(
    () => [
      { label: "Dating", icon: AiFillHeart, route: DATING_ROUTE },
      { label: "Messages", icon: AiFillMessage, route: MESSAGES_ROUTE },
      { label: "Notifications", icon: IoMdNotifications, route: NOTIFICATIONS_ROUTE },
      { label: "Profile", icon: FaUserAlt, route: PROFILE_ROUTE },
      { label: "Settings", icon: AiFillSetting, route: SETTINGS_ROUTE },
      { label: "Logout", icon: MdLogout, route: AUTH_ROUTE },
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
        <Menu mode="vertical" selectedKeys={[router.pathname]} className={cln("menu")}>
          {menuItems.map((item) => (
            <Menu.Item key={item.route} className={cln("menu-item__wrapper")}>
              <Link href={item.route}>
                <div className={cln("menu-item")}>
                  <item.icon size={17} />
                  <span>{item.label}</span>
                </div>
              </Link>
            </Menu.Item>
          ))}
        </Menu>
      </div>
    </aside>
  );
};

export default Sidebar;
