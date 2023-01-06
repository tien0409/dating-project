import { useCallback, useRef, useState } from "react";
import { toast } from "react-toastify";

import { useUpdateUserPreferencesData } from "@/hooks/useUserPreferencesData";
import _debounce from "lodash/debounce";

const useSettingAdvanceFilters = () => {
  const heightDebounce = useRef<any>();
  const [height, setHeight] = useState([150, 170]);
  const [heightValue, setHeightValue] = useState([150, 170]);

  const { mutateAsync } = useUpdateUserPreferencesData();

  const handleChangeHeight = useCallback(
    async (value: number[]) => {
      setHeight(value);
      if (heightDebounce.current) heightDebounce.current.cancel();

      heightDebounce.current = _debounce(async () => {
        try {
          await mutateAsync({ height: value });
        } catch (error: any) {
          toast.error(error?.response?.data?.message ?? "Something went wrong");
        }
      }, 1500);

      heightDebounce.current();
    },
    [mutateAsync],
  );

  return { height, handleChangeHeight };
};

export default useSettingAdvanceFilters;
