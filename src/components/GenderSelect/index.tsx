import { If, Then } from "react-if";
import { FormInstance } from "antd";
import classNames from "classnames/bind";
import { MdArrowForwardIos } from "react-icons/md";

import styles from "./GenderSelect.module.scss";
import SingleSelect from "./SingleSelect";
import ModalSelect from "./ModalSelect";
import useGenderSelect from "./GenderSelectHook";

const cln = classNames.bind(styles);

export type GenderSelectProps = {
  form: FormInstance;
  field: string;
  interestedInGender?: boolean;
};

const GenderSelect = (props: GenderSelectProps) => {
  const { interestedInGender, form, field } = props;

  const {
    visibleModal,
    genderSpecialSelected,
    setGenderSpecialSelected,
    selected,
    gendersNormal,
    gendersSpecial,
    handleSelectGender,
    handleCloseModal,
  } = useGenderSelect(props);

  return (
    <div className={cln("wrapper")}>
      {gendersNormal.map((gender) => (
        <SingleSelect
          key={gender.name}
          text={gender.name}
          value={gender}
          isActive={selected === gender.name || gender.id === form.getFieldValue(field)?.gender}
          onClick={handleSelectGender}
        />
      ))}
      <If condition={!!gendersSpecial?.length}>
        <Then>
          <SingleSelect
            text="More choices"
            value={undefined}
            iconSuffix
            icon={<MdArrowForwardIos />}
            isActive={selected === "More choices" || (!selected && form.getFieldValue(field))}
            onClick={handleSelectGender}
          />
        </Then>
      </If>

      <ModalSelect
        interestedInGender={interestedInGender}
        open={visibleModal}
        genderSpecialSelected={genderSpecialSelected}
        setGenderSpecialSelected={setGenderSpecialSelected}
        onCancel={handleCloseModal}
      />
    </div>
  );
};

export default GenderSelect;
