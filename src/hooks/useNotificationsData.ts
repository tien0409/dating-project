import { useMutation, useQuery } from "@tanstack/react-query";

import axiosInstance from "@/configs/axios";
import { AxiosResponseType, NotificationType, RQConfigsType } from "@/types";

const _getNotifications = async () =>
  (await axiosInstance.get<AxiosResponseType<NotificationType[]>>("/notification-objects"))?.data;
const _readAllNotifications = async () =>
  (
    await axiosInstance.patch<AxiosResponseType<NotificationType[]>>(
      "/notification-objects/read-all",
    )
  )?.data;
const _readNotification = async (id: string) =>
  (
    await axiosInstance.patch<AxiosResponseType<NotificationType[]>>(
      "/notification-objects/read/" + id,
    )
  )?.data;
const _unreadNotification = async (id: string) =>
  (
    await axiosInstance.patch<AxiosResponseType<NotificationType[]>>(
      "/notification-objects/un-read/" + id,
    )
  )?.data;
const _deleteNotification = async (id: string) =>
  (
    await axiosInstance.delete<AxiosResponseType<NotificationType[]>>(
      "/notification-objects/delete/" + id,
    )
  )?.data;
const _deleteAllNotifications = async () =>
  (
    await axiosInstance.delete<AxiosResponseType<NotificationType[]>>(
      "/notification-objects/delete-all",
    )
  )?.data;

export const useNotificationsData = ({ onSuccess }: RQConfigsType) => {
  return useQuery(["notifications"], _getNotifications, { staleTime: Infinity, onSuccess });
};

export const useReadNotificationData = () => {
  return useMutation(_readNotification);
};

export const useUnreadNotificationData = () => {
  return useMutation(_unreadNotification);
};

export const useReadAllNotificationsData = () => {
  return useMutation(_readAllNotifications);
};

export const useDeleteNotificationData = () => {
  return useMutation(_deleteNotification);
};

export const useDeleteAllNotificationsData = () => {
  return useMutation(_deleteAllNotifications);
};
