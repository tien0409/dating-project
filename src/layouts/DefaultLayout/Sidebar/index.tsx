import classNames from "classnames/bind";
import Image from "next/image";
import { Badge, Menu } from "antd";
import { AiFillHeart, AiFillMessage, AiFillSetting } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import Link from "next/link";
import { useMemo } from "react";
import { ItemType } from "antd/es/menu/hooks/useItems";
import { useRouter } from "next/router";

import styles from "./Sidebar.module.scss";
import {
  AUTH_ROUTE,
  DATING_ROUTE,
  MESSAGES_ROUTE,
  NOTIFICATIONS_ROUTE,
  PROFILE_ROUTE,
  SETTINGS_ROUTE,
} from "@/configs/routes";
import useSidebar from "./SidebarHook";
import { getAvatar } from "@/utils/urls";

const cln = classNames.bind(styles);

type Props = {
  border: boolean;
};

const Sidebar = (props: Props) => {
  const { border } = props;

  const router = useRouter();

  const { profile, countNotificationsUnread, handleLogout } = useSidebar();

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
            <Badge
              className={cln("menu-item__badge")}
              count={countNotificationsUnread}
              overflowCount={99}
            >
              <Link href={NOTIFICATIONS_ROUTE}>
                <div className={cln("menu-item")}>
                  <IoMdNotifications size={17} />
                  <span>Notifications</span>
                </div>
              </Link>
            </Badge>
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
            <div className={cln("menu-item")} onClick={handleLogout}>
              <MdLogout size={17} />
              <span>Logout</span>
            </div>
          </div>
        ),
        key: AUTH_ROUTE,
      },
    ],
    [countNotificationsUnread, handleLogout],
  );

  return (
    <aside className={cln("wrapper", { border })}>
      <div className={cln("avatar__wrapper")}>
        <Image
          src={getAvatar(profile?.avatar)}
          alt="avatar"
          objectFit="cover"
          width={200}
          height={200}
        />
      </div>

      <div className={cln("profile")}>
        <div className={cln("basic__info")}>
          <h3 className={cln("text-truncate", "fullName")}>{profile?.fullName}</h3>
        </div>
        <p className={cln("address")}>HaNoi, Viet Nam</p>
      </div>

      <div className={cln("special__info")}>
        <div className={cln("special__info-item")}>
          <span className={cln("number")}>{profile?.userMatches?.length}</span>
          <span className={cln("label")}>Matches</span>
        </div>
        <div className={cln("special__info-item")}>
          <span className={cln("number")}>{profile?.userLikes?.length}</span>
          <span className={cln("label")}>Likes</span>
        </div>
        <div className={cln("special__info-item")}>
          <span className={cln("number")}>{profile?.userDiscards?.length}</span>
          <span className={cln("label")}>Discards</span>
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
