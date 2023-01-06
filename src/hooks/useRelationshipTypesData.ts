import { useQuery } from "@tanstack/react-query";

import axiosInstance from "@/configs/axios";
import { AxiosResponseType, RelationshipType } from "@/types";

const _getRelationshipTypes = async () => {
  return (await axiosInstance.get<AxiosResponseType<RelationshipType[]>>("/relationship-types"))
    .data;
};

export const useRelationshipTypesData = () => {
  return useQuery(["relationship-types"], _getRelationshipTypes, { staleTime: Infinity });
};
