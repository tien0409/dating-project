import axiosInstance from "@/configs/axios";
import { useMutation } from "@tanstack/react-query";

const _createCharge = async (body: any) =>
  (await axiosInstance.post("/payments/charge", body))?.data;
const _createOrder = async (body: any) =>
  (await axiosInstance.post("/user-premium-packages", body))?.data;

export const useCreateChargeData = () => {
  return useMutation(_createCharge);
};

export const useCreateOrderData = () => {
  return useMutation(_createOrder);
};
