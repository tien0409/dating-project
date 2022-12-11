import { SpecialGendersProps } from ".";
import { GenderType } from "@/types";

const useSpecialGenders = (props: SpecialGendersProps) => {
  const { interestedInGender, setGenderSpecialSelected, setNextConfig, onCancel } = props;

  const handleChooseGenderSpecial = (value: GenderType) => () => {
    setGenderSpecialSelected(value);
    if (interestedInGender) {
      onCancel(value);
    } else {
      setNextConfig(true);
    }
  };

  return {
    handleChooseGenderSpecial,
  };
};

export default useSpecialGenders;
