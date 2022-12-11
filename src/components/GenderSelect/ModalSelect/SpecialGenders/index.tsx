import { Else, If, Then } from "react-if";
import { Dispatch, memo, SetStateAction } from "react";
import classNames from "classnames/bind";

import styles from "./SpecialGenders.module.scss";
import { GenderType } from "@/types";
import useSpecialGenders from "./SpecialGendersHook";

const cln = classNames.bind(styles);

export type SpecialGendersProps = {
  interestedInGender?: boolean;
  gendersFiltered?: GenderType[];
  setGenderSpecialSelected: Dispatch<SetStateAction<GenderType | undefined>>;
  setNextConfig: Dispatch<SetStateAction<boolean>>;
  onCancel: (_genderSpecialSelected?: GenderType) => void;
};

const SpecialGenders = (props: SpecialGendersProps) => {
  const { gendersFiltered } = props;

  const { handleChooseGenderSpecial } = useSpecialGenders(props);

  return (
    <ul className={cln("custom__scroll", "custom__scroll--tiny", "wrapper")}>
      <If condition={!!gendersFiltered?.length}>
        <Then>
          {gendersFiltered?.map((gender) => (
            <li
              key={gender.id}
              className={cln("gender__item")}
              onClick={handleChooseGenderSpecial(gender)}
            >
              {gender.name}
            </li>
          ))}
        </Then>

        <Else>
          <p className={cln("empty")}>We couldn’t find that option – please try typing again</p>
        </Else>
      </If>
    </ul>
  );
};

export default memo(SpecialGenders);
