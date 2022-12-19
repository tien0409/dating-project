import classNames from "classnames/bind";
import { Form } from "antd";
import { RiRulerLine } from "react-icons/ri";
import { MdOutlineSmokingRooms, MdCastForEducation } from "react-icons/md";
import { TbMoodKid } from "react-icons/tb";
import { AiOutlineSearch } from "react-icons/ai";
import { BiDrink } from "react-icons/bi";

import styles from "./SettingAdvanceFilters.module.scss";
import useSettingAdvanceFilters from "./SettingAdvanceFiltersHook";
import SettingContainer from "../SettingContainer";
import AdvanceFilterItem from "@/views/SettingsView/SettingAdvanceFilters/AdvanceFilterItem";

const cln = classNames.bind(styles);

const SettingAdvanceFilters = () => {
  const { form } = useSettingAdvanceFilters();

  return (
    <SettingContainer
      title={"Advance filters"}
      subTitle={"Add up to 2 filters you would like your potential Date matches to have"}
    >
      <div className={cln("wrapper")}>
        <Form>
          <h3 className={cln("title")}>Filter by:</h3>
          <div className={cln("filter__list")}>
            <AdvanceFilterItem icon={RiRulerLine} title={"Height"} isSwitch />
            <AdvanceFilterItem
              icon={MdCastForEducation}
              title={"Education level"}
              menuItems={[{ label: "High school", key: "1" }]}
            />
            <AdvanceFilterItem icon={AiOutlineSearch} title={"Looking for"} />
            <AdvanceFilterItem icon={BiDrink} title={"Drinking"} />
            <AdvanceFilterItem icon={MdOutlineSmokingRooms} title={"Smoking"} />
            <AdvanceFilterItem icon={TbMoodKid} title={"Children"} />
          </div>
        </Form>
      </div>
    </SettingContainer>
  );
};

export default SettingAdvanceFilters;
