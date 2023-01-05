import { format } from "date-fns";

export const formatDate = (date?: Date, formatStr = "dd/MM/yyyy") => {
  return date ? format(new Date(date), formatStr) : "";
};
