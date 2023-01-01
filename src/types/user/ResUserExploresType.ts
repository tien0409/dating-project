import { UserType } from "@/types";

type ResUserExploresType = {
  userExplores: UserType[];
  pagination: {
    currentPage: number;
    perPage: number;
    totalPage: number;
  };
};

export default ResUserExploresType;
