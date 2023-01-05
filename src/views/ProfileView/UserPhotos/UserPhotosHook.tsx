import { useAuthStore } from "@/store";
import { useMemo } from "react";

const useUserPhotos = () => {
  const profile = useAuthStore((state) => state.profile);

  const primaryPhotos = useMemo(() => profile?.photos?.slice(0, 3), [profile?.photos]);

  const secondaryPhotos = useMemo(() => {
    if (profile?.photos) {
      const result = Array(3).fill(null);
      for (let i = 0; i < profile?.photos?.slice(3, 6).length; i++) {
        result[i] = profile?.photos?.slice(3, 6)[i];
      }
      return result;
    }
  }, [profile?.photos]);

  return { primaryPhotos, secondaryPhotos };
};

export default useUserPhotos;
