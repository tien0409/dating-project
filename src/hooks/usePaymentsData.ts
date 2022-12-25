import axiosInstance from "@/configs/axios";
import { useMutation } from "@tanstack/react-query";

const _createCharge = async (body: any) => (await axiosInstance.post("/stripe/charge", body))?.data;

export const useCreateChargeData = () => {
  return useMutation(_createCharge);
};
