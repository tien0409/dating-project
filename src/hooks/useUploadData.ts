import { useMutation } from "@tanstack/react-query";

import axiosInstance from "@/configs/axios";
import { RQConfigsType } from "@/types";

const _uploadSingleImage = async (payload: FormData) =>
  (
    await axiosInstance.post("/upload/single-image", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  )?.data;
const _uploadMultiImage = async (payload: FormData) =>
  (
    await axiosInstance.post("/upload/multi-image", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  )?.data;

export const useUploadSingleImageData = () => {
  return useMutation(_uploadSingleImage);
};

export const useUploadMultiImageData = (props?: RQConfigsType) => {
  const { onSuccess, onError } = props || {};
  return useMutation(_uploadMultiImage, { onSuccess, onError });
};
