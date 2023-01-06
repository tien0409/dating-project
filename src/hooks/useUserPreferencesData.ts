import { useMutation } from "@tanstack/react-query";

import axiosInstance from "@/configs/axios";

const _updateUserPreferences = async (payload: any) =>
  (await axiosInstance.patch("/user-preferences", payload))?.data;

export const useUpdateUserPreferencesData = () => {
  return useMutation(_updateUserPreferences);
};
