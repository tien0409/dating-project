import { useState } from "react";

import { useAuthStore } from "@/store";
import { useUpdateProfileData } from "@/hooks/useUsersData";
import { toast } from "react-toastify";

const useUserSettings = () => {
  const profile = useAuthStore((state) => state.profile);
  const setProfile = useAuthStore((state) => state.setProfile);

  const [open, setOpen] = useState(false);

  const { mutateAsync } = useUpdateProfileData();

  const handleChangeSnooze = async () => {
    try {
      const { data: res } = await mutateAsync({ snooze: !profile?.snooze });
      setProfile(res.data);
      toast.success("Snooze updated successfully");
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? "Something went wrong");
    }
  };

  return {
    profile,
    open,
    setOpen,
    handleChangeSnooze,
  };
};

export default useUserSettings;
