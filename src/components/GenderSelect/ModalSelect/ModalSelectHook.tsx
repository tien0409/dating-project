import { ChangeEvent, useMemo, useState } from "react";

import { useGenderStore } from "@/store";

const useModalSelect = () => {
  const [search, setSearch] = useState("");
  const [nextConfig, setNextConfig] = useState(false);

  const gendersSpecial = useGenderStore((state) => state.gendersSpecial);

  const gendersFiltered = useMemo(
    () =>
      gendersSpecial?.filter((gender) => gender.name.toLowerCase().includes(search.toLowerCase())),
    [gendersSpecial, search],
  );

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return {
    search,
    nextConfig,
    gendersFiltered,
    setNextConfig,
    handleChangeSearch,
  };
};

export default useModalSelect;
