import { useMutation } from "@tanstack/react-query";

import { CreateMatchType } from "@/types";
import axiosInstance from "@/configs/axios";

const _createMatch = async (payload: CreateMatchType) =>
  (await axiosInstance.post("/user-matches", payload)).data;

export const useCreateMatchData = () => {
  return useMutation(_createMatch);
};
