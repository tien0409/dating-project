import { UserAuthType } from "@/types";

type ResUserExploresType = {
  userExplores: UserAuthType[];
  pagination: {
    currentPage: number;
    perPage: number;
    totalPage: number;
  };
};

export default ResUserExploresType;
