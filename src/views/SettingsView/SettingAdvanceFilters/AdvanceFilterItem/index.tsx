import classNames from "classnames/bind";
import { MenuItemType } from "antd/es/menu/hooks/useItems";
import { Else, If, Then, When } from "react-if";
import { Dropdown, Slider } from "antd";
import { IconType } from "react-icons";
import { BsPlusLg } from "react-icons/bs";
import { MdClose } from "react-icons/md";

import styles from "./AdvanceFilterItem.module.scss";
import useAdvanceFilterItem from "./AdvanceFilterItemHook";

const cln = classNames.bind(styles);

type AdvanceFilterItemProps = {
  icon: IconType;
  title: string;
  isSwitch?: boolean;
  menuItems?: MenuItemType[];
};

const AdvanceFilterItem = (props: AdvanceFilterItemProps) => {
  const { icon: Icon, title, isSwitch, menuItems = [] } = props;

  const { open, setOpen } = useAdvanceFilterItem();

  return (
    <div className={cln("wrapper", { "is-open": open && isSwitch })} onClick={() => setOpen(true)}>
      <div className={cln("header")}>
        <div className={cln("title")}>
          <Icon />
          <span>{title}</span>
        </div>

        <If condition={!open || !isSwitch}>
          <Then>
            <If condition={isSwitch}>
              <Then>
                <BsPlusLg className={cln("icon")} />
              </Then>

              <Else>
                <Dropdown placement="bottom" menu={{ items: menuItems }} trigger={["click"]}>
                  <BsPlusLg className={cln("icon")} />
                </Dropdown>
              </Else>
            </If>
          </Then>

          <Else>
            <MdClose
              size={20}
              onClick={(e) => {
                e.stopPropagation();
                setOpen(!open);
              }}
            />
          </Else>
        </If>
      </div>

      <When condition={open && isSwitch}>
        <div className={cln("body")}>
          <Slider range defaultValue={[18, 30]} max={70} min={18} />
        </div>
      </When>
    </div>
  );
};

export default AdvanceFilterItem;
