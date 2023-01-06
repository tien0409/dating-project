import { useMemo } from "react";

import { usePassionsData } from "@/hooks/usePassionsData";
import { PassionsSelectProps } from ".";
import { PassionType } from "@/types";

const usePassionsSelect = (props: PassionsSelectProps) => {
  const { form, field, setOpen } = props;

  const { isLoading: getPassionsLoading, data: res } = usePassionsData();

  const passions = useMemo<PassionType[]>(() => res?.data || [], [res]);

  const handleCancel = () => {
    setOpen(false);
    form.setFieldValue(field, []);
  };

  return {
    passions,
    getPassionsLoading,
    handleCancel,
  };
};

export default usePassionsSelect;
