import classNames from "classnames/bind";
import { Form } from "antd";
import { RiRulerLine } from "react-icons/ri";
import { MdCastForEducation, MdOutlineSmokingRooms } from "react-icons/md";
import { TbMoodKid } from "react-icons/tb";
import { AiOutlineSearch } from "react-icons/ai";
import { BiDrink } from "react-icons/bi";

import styles from "./MoreInformation.module.scss";
import useMoreInformation from "./MoreInformationHook";
import ProfileContainer from "../ProfileContainer";
import AdvanceFilterItem from "@/views/SettingsView/SettingAdvanceFilters/AdvanceFilterItem";

const cln = classNames.bind(styles);

const MoreInformation = () => {
  const { form, profile } = useMoreInformation();

  return (
    <ProfileContainer title={"More Information"}>
      <div className={cln("wrapper")}>
        <Form>
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
    </ProfileContainer>
  );
};

export default MoreInformation;
