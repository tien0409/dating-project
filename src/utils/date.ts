import { format } from "date-fns";

export const formatDate = (date?: Date, formatStr = "DD/MM/YYYY") => {
  return date ? format(new Date(date), formatStr) : "";
};
