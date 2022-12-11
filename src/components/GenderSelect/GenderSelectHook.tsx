import { useCallback, useState } from "react";

import { AxiosResponseType, GenderType } from "@/types";
import { GenderSelectProps } from ".";
import { useGendersData } from "@/hooks/useGendersData";
import { useGenderStore } from "@/store";

type _GendersInternal = {
  normal: GenderType[];
  special?: GenderType[];
};

const useGenderSelect = (props: GenderSelectProps) => {
  const { form, field, interestedInGender } = props;

  const [visibleModal, setVisibleModal] = useState(false);
  const [selected, setSelected] = useState("");
  const [genderSpecialSelected, setGenderSpecialSelected] = useState<GenderType>();

  const gendersNormal = useGenderStore((state) => state.gendersNormal);
  const gendersSpecial = useGenderStore((state) => state.gendersSpecial);
  const setGenders = useGenderStore((state) => state.setGenders);

  const handleSuccess = (res: AxiosResponseType<GenderType[]>) => {
    if (res.data) setGenders(res?.data);
  };

  useGendersData({ onSuccess: handleSuccess });

  const handleSelectGender = useCallback(
    (text: string, value?: GenderType) => {
      if (!value) setVisibleModal(true);
      form.setFieldValue(field, value);
      setSelected(text);
    },
    [field, form],
  );

  const handleCloseModal = (_genderSpecial?: GenderType) => {
    setVisibleModal(false);
    if (interestedInGender) {
      if (!_genderSpecial) {
        setSelected("");
      } else {
        form.setFieldValue(field, _genderSpecial);
      }
    } else {
      if (!_genderSpecial?.showMeInSearchesAs) {
        setSelected("");
      } else {
        form.setFieldValue(field, _genderSpecial);
      }
    }
  };

  return {
    selected,
    visibleModal,
    genderSpecialSelected,
    setGenderSpecialSelected,
    gendersNormal,
    gendersSpecial,
    handleSelectGender,
    handleCloseModal,
  };
};
export default useGenderSelect;
