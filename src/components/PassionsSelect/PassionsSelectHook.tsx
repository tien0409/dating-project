import { useMemo } from "react";

import { usePassionsData } from "@/hooks/usePassionsData";
import { PassionsSelectProps } from ".";

const usePassionsSelect = (props: PassionsSelectProps) => {
  const { form, field, setOpen } = props;

  const { isLoading: getPassionsLoading, data: res } = usePassionsData();

  const passions = useMemo(() => res?.data || [], [res]);

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
