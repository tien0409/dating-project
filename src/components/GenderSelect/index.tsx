import { Modal } from "antd";
import classNames from "classnames/bind";
import { Dispatch, SetStateAction, useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";

import styles from "./GenderSelect.module.scss";
import SingleSelect from "./SingleSelect";

const cln = classNames.bind(styles);

type Props = {
  genderSelected: string;
  setGenderSelected: Dispatch<SetStateAction<string>>;
};

const GenderSelect = (props: Props) => {
  const { genderSelected, setGenderSelected } = props;

  const [visibleModal, setVisibleModal] = useState(false);

  const handleSelected = (value: string) => {
    if (!value) setVisibleModal(true);
    setGenderSelected(value);
  };

  const handleCloseModal = () => {
    setVisibleModal(false);
  };

  return (
    <div className={cln("wrapper")}>
      <SingleSelect
        text="Male"
        value="male"
        genderSelected={genderSelected}
        onClick={handleSelected}
      />
      <SingleSelect
        text="Female"
        value="female"
        genderSelected={genderSelected}
        onClick={handleSelected}
      />
      <SingleSelect
        text="More choices"
        value=""
        iconSuffix
        icon={<MdArrowForwardIos />}
        genderSelected={genderSelected}
        onClick={handleSelected}
      />

      <Modal open={visibleModal} onCancel={handleCloseModal} footer={false}>
        abc
      </Modal>
    </div>
  );
};

export default GenderSelect;
