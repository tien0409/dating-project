import { Modal } from "antd";
import classNames from "classnames/bind";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";

import styles from "./GenderSelect.module.scss";
import SingleSelect from "./SingleSelect";
import { GenderType } from "@/types";
import { If, Then } from "react-if";

const cln = classNames.bind(styles);

type Props = {
  genders: GenderType[];
  genderSelected?: GenderType;
  setGenderSelected: Dispatch<SetStateAction<GenderType | undefined>>;
};

type _GendersInternal = {
  normal: GenderType[];
  special?: GenderType[];
};

const GenderSelect = (props: Props) => {
  const { genders, genderSelected, setGenderSelected } = props;

  const [visibleModal, setVisibleModal] = useState(false);

  const gendersInternal: _GendersInternal = useMemo(() => {
    if (genders.length > 2) {
      return {
        normal: genders.slice(0, 2),
        special: genders.slice(2),
      };
    }
    return { normal: genders };
  }, [genders]);

  const handleSelected = (value?: GenderType) => {
    if (!value) setVisibleModal(true);
    setGenderSelected(value);
  };

  const handleCloseModal = () => {
    setVisibleModal(false);
  };

  return (
    <div className={cln("wrapper")}>
      {gendersInternal.normal.map((gender) => (
        <SingleSelect
          key={gender.name}
          text={gender.name}
          value={gender}
          genderSelected={genderSelected}
          onClick={handleSelected}
        />
      ))}
      <If condition={!!gendersInternal.special}>
        <Then>
          <SingleSelect
            text="More choices"
            value={undefined}
            iconSuffix
            icon={<MdArrowForwardIos />}
            genderSelected={genderSelected}
            onClick={handleSelected}
          />
        </Then>
      </If>

      <Modal open={visibleModal} onCancel={handleCloseModal} footer={false}>
        abc
      </Modal>
    </div>
  );
};

export default GenderSelect;
