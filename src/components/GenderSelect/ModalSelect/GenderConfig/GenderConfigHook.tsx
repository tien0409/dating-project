import { RadioChangeEvent } from "antd";
import { useState } from "react";
import { CheckboxChangeEvent } from "antd/es/checkbox";

import { GenderConfigProps } from ".";
import { GenderType } from "@/types";
import { useGenderStore } from "@/store";

const useGenderConfig = (props: GenderConfigProps) => {
  const { genderSpecialSelected, setNextConfig, setGenderSpecialSelected, onCancel } = props;

  const [showMeInSearchesAs, setShowMeInSearchesAs] = useState();
  const [isPrivacy, setIsPrivacy] = useState(true);

  const gendersNormal = useGenderStore((state) => state.gendersNormal);

  const handleGoBack = () => {
    setGenderSpecialSelected(undefined);
    setNextConfig(false);
  };

  const handleChangeSearchable = (e: RadioChangeEvent) => {
    setShowMeInSearchesAs(e.target.value);
  };

  const handleChangePrivacy = (e: CheckboxChangeEvent) => {
    setIsPrivacy(e.target.checked);
  };

  const handleFinish = () => {
    const genderSpecialSelectedUpdated = {
      ...genderSpecialSelected,
      isPrivacy,
      showMeInSearchesAs,
    } as GenderType;
    setNextConfig(false);
    onCancel(genderSpecialSelectedUpdated);
  };

  return {
    showMeInSearchesAs,
    isPrivacy,
    gendersNormal,
    handleGoBack,
    handleChangeSearchable,
    handleChangePrivacy,
    handleFinish,
  };
};

export default useGenderConfig;
